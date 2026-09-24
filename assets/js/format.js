// Convierte el texto de las preguntas (con matemáticas entre $...$) en HTML.
// Soporta: párrafos (línea en blanco), listas ("- " al inicio de línea),
// **negrita**, $...$ en línea y $$...$$ en bloque.
import katex from '../../vendor/katex/katex.mjs';

// Macros para respetar la notación de las notas del curso.
export const MACROS = {
  '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}',
  '\\R': '\\mathbb{R}',
  '\\C': '\\mathbb{C}',
  '\\N': '\\mathbb{N}',
  '\\nor': '\\trianglelefteq',
  '\\md': '\\ \\text{mód}\\ ',
  '\\Syl': 'Syl',
  '\\Orb': '\\mathscr{O}',
  '\\sgn': '\\operatorname{sgn}',
  '\\Aut': '\\operatorname{Aut}',
  '\\Inn': '\\operatorname{Inn}',
  '\\Img': '\\operatorname{Im}',
  '\\gen': '\\langle #1 \\rangle',
  '\\acts': '\\curvearrowright',
};

const cache = new Map();

export function tex(src, displayMode = false) {
  const key = (displayMode ? 'D' : 'I') + src;
  let html = cache.get(key);
  if (html === undefined) {
    html = katex.renderToString(src, {
      displayMode,
      throwOnError: false,
      strict: 'ignore',
      macros: { ...MACROS },
      output: 'html',
    });
    cache.set(key, html);
  }
  return html;
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const MATH_RE = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

// Puntuación que no debe quedar sola al inicio de una línea tras una fórmula.
const TRAILING_PUNCT = /^[.,;:)?!]+/;

function inline(text) {
  let out = '';
  let last = 0;
  for (const m of text.matchAll(MATH_RE)) {
    out += plain(text.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1] !== undefined) {
      out += `<span class="math-display">${tex(m[1].trim(), true)}</span>`;
      continue;
    }
    const punct = (text.slice(last).match(TRAILING_PUNCT) || [''])[0];
    const math = tex(m[2].trim(), false);
    // U+2060 (word joiner) impide el corte sin bloquear los cortes internos de KaTeX.
    out += punct ? `${math}\u2060${escapeHtml(punct)}` : math;
    last += punct.length;
  }
  return out + plain(text.slice(last));
}

function plain(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, ' ');
}

function dedent(src) {
  return String(src)
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .trim();
}

// Formato de bloque: devuelve párrafos y listas.
export function fmt(src) {
  let html = '';
  for (const block of dedent(src).split(/\n\s*\n/)) {
    let para = [];
    let items = [];
    const flushPara = () => {
      if (para.length) html += `<p>${inline(para.join('\n'))}</p>`;
      para = [];
    };
    const flushList = () => {
      if (items.length) html += `<ul>${items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`;
      items = [];
    };
    for (const line of block.split('\n')) {
      if (line.startsWith('- ')) {
        flushPara();
        items.push(line.slice(2));
      } else {
        flushList();
        para.push(line);
      }
    }
    flushPara();
    flushList();
  }
  return html;
}

// Formato en línea: sin envolver en <p>. Útil para opciones y fichas.
export function fmtInline(src) {
  return inline(dedent(src));
}
