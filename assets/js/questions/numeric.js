// Respuesta numérica: enteros o fracciones (a/b). Se compara el valor exacto.
import { h } from '../dom.js';
import { fmtInline } from '../format.js';

function parseRational(text) {
  const s = String(text).trim().replace(/\s+/g, '').replace(/−/g, '-');
  const m = /^(-?\d+)(?:\/(\d+))?$/.exec(s);
  if (!m) return null;
  const num = BigInt(m[1]);
  const den = m[2] ? BigInt(m[2]) : 1n;
  if (den === 0n) return null;
  return { num, den };
}

function equal(a, b) {
  return a.num * b.den === b.num * a.den;
}

export function renderNumeric(q, { onChange, onSubmit }) {
  const answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => parseRational(a));
  const input = h('input', {
    class: 'numeric-input',
    type: 'text',
    inputmode: q.allowFraction ? 'text' : 'numeric',
    autocomplete: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    enterkeyhint: 'done',
    'aria-label': 'Su respuesta',
    placeholder: q.allowFraction ? 'p. ej. 3 o 3/4' : 'Escriba un número',
    oninput: onChange,
    onkeydown: (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit();
      }
    },
  });
  const feedback = h('div', { class: 'numeric-feedback', 'aria-live': 'polite' });

  const el = h(
    'div',
    { class: 'q-numeric' },
    h(
      'label',
      { class: 'numeric-row' },
      q.label ? h('span', { class: 'numeric-label', html: fmtInline(q.label) }) : null,
      input,
    ),
    feedback,
  );

  return {
    el,
    focus: () => input.focus({ preventScroll: true }),
    isComplete: () => parseRational(input.value) !== null,
    grade() {
      const v = parseRational(input.value);
      return { correct: v !== null && answers.some((a) => a && equal(a, v)) };
    },
    reveal(result) {
      input.disabled = true;
      input.classList.add(result.correct ? 'is-correct' : 'is-wrong');
      if (!result.correct) {
        const shown = Array.isArray(q.answer) ? q.answer[0] : q.answer;
        feedback.innerHTML = `Respuesta correcta: <strong>${fmtInline(String(shown))}</strong>`;
      }
    },
  };
}
