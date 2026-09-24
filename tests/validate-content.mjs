// Valida el banco de preguntas: esquema, coherencia de respuestas y que toda
// la notación matemática compile en KaTeX. Uso: npm test
import katex from '../vendor/katex/katex.mjs';
import { MACROS } from '../assets/js/format.js';
import { COURSES } from '../content/index.js';

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

const MATH_RE = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

function checkText(where, text) {
  if (typeof text !== 'string' || !text.trim()) return fail(where, 'texto vacío');
  if (((text.match(/\$/g) || []).length) % 2 !== 0) fail(where, 'número impar de signos $');
  for (const m of text.matchAll(MATH_RE)) {
    const src = (m[1] ?? m[2]).trim();
    if (/\[\[\d+\]\]/.test(src)) fail(where, `espacio [[n]] dentro de una fórmula: ${src}`);
    try {
      katex.renderToString(src, { throwOnError: true, strict: 'ignore', macros: { ...MACROS }, displayMode: !!m[1] });
    } catch (e) {
      fail(where, `KaTeX: ${e.message}`);
    }
  }
}

const TYPES = new Set(['mcq', 'multi', 'numeric', 'fill', 'match', 'order']);
let total = 0;

for (const course of COURSES) {
  const ids = new Set();
  const unitIds = new Set();
  for (const k of ['id', 'title', 'subtitle', 'source']) if (!course[k]) fail(course.id, `falta ${k}`);
  for (const unit of course.units) {
    const uw = `${course.id}/${unit.id}`;
    if (unitIds.has(unit.id)) fail(uw, 'id de unidad repetido');
    unitIds.add(unit.id);
    checkText(`${uw}.title`, unit.title);
    if (!unit.section) fail(uw, 'falta section');
    if (!Array.isArray(unit.keyIdeas) || !unit.keyIdeas.length) fail(uw, 'faltan keyIdeas');
    unit.keyIdeas.forEach((t, i) => checkText(`${uw}.keyIdeas[${i}]`, t));
    if (!unit.questions.length) fail(uw, 'unidad sin preguntas');

    for (const q of unit.questions) {
      total++;
      const w = `${uw}/${q.id}`;
      if (!q.id) fail(uw, 'pregunta sin id');
      if (ids.has(q.id)) fail(w, 'id repetido');
      ids.add(q.id);
      if (!TYPES.has(q.type)) fail(w, `tipo desconocido ${q.type}`);
      checkText(`${w}.prompt`, q.prompt);
      checkText(`${w}.explanation`, q.explanation);
      if (q.intuition) checkText(`${w}.intuition`, q.intuition);
      if (q.hint) checkText(`${w}.hint`, q.hint);
      if (!q.ref) fail(w, 'falta ref');

      if (q.type === 'mcq' || q.type === 'multi') {
        if (!Array.isArray(q.options) || q.options.length < 3) fail(w, 'se requieren al menos 3 opciones');
        const nCorrect = q.options.filter((o) => o.correct).length;
        if (q.type === 'mcq' && nCorrect !== 1) fail(w, `mcq con ${nCorrect} respuestas correctas`);
        if (q.type === 'multi' && (nCorrect < 1 || nCorrect === q.options.length)) fail(w, 'multi debe tener correctas e incorrectas');
        const seen = new Set();
        q.options.forEach((o, i) => {
          checkText(`${w}.options[${i}]`, o.text);
          if (o.why) checkText(`${w}.options[${i}].why`, o.why);
          if (seen.has(o.text)) fail(w, `opción repetida ${o.text}`);
          seen.add(o.text);
        });
      }

      if (q.type === 'numeric') {
        const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
        if (!answers.length || answers.some((a) => !/^-?\d+(\/\d+)?$/.test(String(a)))) fail(w, 'respuesta numérica inválida');
      }

      if (q.type === 'fill' || q.type === 'match') {
        let blanks;
        if (q.type === 'fill') {
          checkText(`${w}.template`, q.template.replace(/\[\[\d+\]\]/g, 'X'));
          for (const m of q.template.matchAll(MATH_RE)) {
            if (/\[\[\d+\]\]/.test(m[0])) fail(w, 'espacio dentro de una fórmula en template');
          }
          const found = [...q.template.matchAll(/\[\[(\d+)\]\]/g)].map((m) => Number(m[1]));
          blanks = q.blanks;
          const expected = blanks.map((_, i) => i);
          if (JSON.stringify([...found].sort((a, b) => a - b)) !== JSON.stringify(expected)) {
            fail(w, `los espacios del template (${found}) no coinciden con blanks (${blanks.length})`);
          }
        } else {
          if (!Array.isArray(q.rows) || q.rows.length < 2) fail(w, 'match requiere al menos 2 filas');
          q.rows.forEach((row, i) => checkText(`${w}.rows[${i}].left`, row.left));
          blanks = q.rows.map((row) => row.answer);
        }
        const accepted = new Set(blanks.flatMap((b) => (Array.isArray(b) ? b : [b])));
        for (const a of accepted) checkText(`${w}.blank`, a);
        for (const d of q.distractors || []) {
          checkText(`${w}.distractor`, d);
          if (accepted.has(d)) fail(w, `distractor que también es respuesta: ${d}`);
        }
        const chips = [...blanks.map((b) => (Array.isArray(b) ? b[0] : b)), ...(q.distractors || [])];
        if (new Set(chips).size !== chips.length && q.type === 'fill') {
          // Fichas repetidas están permitidas, pero avisamos para revisar ambigüedades.
          console.warn(`aviso ${w}: fichas repetidas`);
        }
      }

      if (q.type === 'order') {
        if (!Array.isArray(q.steps) || q.steps.length < 3) fail(w, 'order requiere al menos 3 pasos');
        const all = [...q.steps, ...(q.distractors || [])];
        if (new Set(all).size !== all.length) fail(w, 'pasos repetidos');
        all.forEach((s, i) => checkText(`${w}.step[${i}]`, s));
      }
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s) en el contenido:\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ Contenido válido: ${COURSES.length} curso(s), ${total} preguntas.`);
