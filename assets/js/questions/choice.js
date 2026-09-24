// Selección única ("mcq") y selección múltiple ("multi").
import { h, shuffle, icon } from '../dom.js';
import { fmt, fmtInline } from '../format.js';

const LETTERS = 'ABCDEFGHIJ';

export function renderChoice(q, { rand, onChange }) {
  const multi = q.type === 'multi';
  const options = q.fixedOrder ? q.options.slice() : shuffle(q.options, rand);
  const selected = new Set();
  let locked = false;

  const list = h('div', {
    class: 'options',
    role: multi ? 'group' : 'radiogroup',
    'aria-label': multi ? 'Opciones (puede elegir varias)' : 'Opciones',
  });

  const buttons = options.map((opt, i) => {
    const btn = h(
      'button',
      {
        type: 'button',
        class: 'option',
        dataset: { i: String(q.options.indexOf(opt)) },
        role: multi ? 'checkbox' : 'radio',
        'aria-checked': 'false',
        onclick: () => toggle(i),
      },
      h('span', { class: 'option-mark', 'aria-hidden': 'true' }, multi ? '' : LETTERS[i]),
      h('span', { class: 'option-text', html: fmtInline(opt.text) }),
    );
    list.append(btn);
    return btn;
  });

  function toggle(i) {
    if (locked) return;
    if (multi) {
      selected.has(i) ? selected.delete(i) : selected.add(i);
    } else {
      selected.clear();
      selected.add(i);
    }
    buttons.forEach((b, j) => {
      b.classList.toggle('is-selected', selected.has(j));
      b.setAttribute('aria-checked', String(selected.has(j)));
    });
    onChange();
  }

  const el = h(
    'div',
    { class: 'q-choice' },
    multi ? h('p', { class: 'q-instruction' }, 'Seleccione todas las opciones correctas.') : null,
    list,
  );

  return {
    el,
    isComplete: () => selected.size > 0,
    grade() {
      const correct = options.every((opt, i) => Boolean(opt.correct) === selected.has(i));
      return { correct };
    },
    reveal() {
      locked = true;
      options.forEach((opt, i) => {
        const b = buttons[i];
        b.disabled = true;
        const picked = selected.has(i);
        if (opt.correct) b.classList.add(picked ? 'is-correct' : 'is-missed');
        else if (picked) b.classList.add('is-wrong');
        if (opt.correct || picked) {
          b.querySelector('.option-mark').replaceChildren(icon(opt.correct ? 'check' : 'x'));
        }
        if (opt.why && (picked || opt.correct)) {
          b.append(h('span', { class: 'option-why', html: fmt(opt.why) }));
        }
      });
    },
  };
}
