// Ordenar los pasos de una demostración: se tocan los pasos en orden y se
// van agregando a la demostración. Puede haber pasos que sobran.
import { h, shuffle, icon } from '../dom.js';
import { fmtInline } from '../format.js';

export function renderOrder(q, { rand, onChange }) {
  const items = [
    ...q.steps.map((text, i) => ({ id: `s${i}`, text, pos: i })),
    ...(q.distractors || []).map((text, i) => ({ id: `d${i}`, text, pos: null })),
  ];
  const pool = shuffle(items, rand);
  const seq = [];
  let locked = false;

  const seqEl = h('ol', { class: 'order-seq', 'aria-label': 'Su demostración' });
  const poolEl = h('div', { class: 'order-pool', role: 'group', 'aria-label': 'Pasos disponibles' });
  const undoBtn = h('button', { type: 'button', class: 'btn-text', onclick: undo }, icon('undo'), 'Quitar último');

  const poolBtns = new Map();
  for (const item of pool) {
    const b = h('button', {
      type: 'button',
      class: 'order-item',
      dataset: { id: item.id },
      html: fmtInline(item.text),
      onclick: () => add(item.id),
    });
    poolBtns.set(item.id, b);
    poolEl.append(b);
  }

  const extra = (q.distractors || []).length;
  const el = h(
    'div',
    { class: 'q-order' },
    h(
      'p',
      { class: 'q-instruction' },
      'Toque los pasos en el orden correcto. Toque un paso de su demostración para quitarlo.',
      extra === 1 ? ' Atención: sobra 1 paso que no pertenece a la demostración.' : '',
      extra > 1 ? ` Atención: sobran ${extra} pasos que no pertenecen a la demostración.` : '',
    ),
    h('div', { class: 'order-head' }, h('span', { class: 'bank-title' }, 'Su demostración'), undoBtn),
    seqEl,
    h('div', { class: 'order-head' }, h('span', { class: 'bank-title' }, 'Pasos disponibles')),
    poolEl,
  );

  const byId = (id) => items.find((it) => it.id === id);

  function add(id) {
    if (locked || seq.includes(id) || seq.length >= q.steps.length) return;
    seq.push(id);
    update();
    onChange();
  }

  function removeAt(i) {
    if (locked) return;
    seq.splice(i, 1);
    update();
    onChange();
  }

  function undo() {
    if (locked || !seq.length) return;
    seq.pop();
    update();
    onChange();
  }

  function update() {
    seqEl.replaceChildren();
    for (let i = 0; i < q.steps.length; i++) {
      const id = seq[i];
      if (id) {
        seqEl.append(
          h(
            'li',
            { class: 'order-slot is-filled' },
            h('button', {
              type: 'button',
              class: 'order-placed',
              html: fmtInline(byId(id).text),
              disabled: locked,
              'aria-label': `Paso ${i + 1}. Toque para quitar.`,
              onclick: () => removeAt(i),
            }),
          ),
        );
      } else {
        seqEl.append(h('li', { class: 'order-slot' }, h('span', { class: 'order-empty' }, `Paso ${i + 1}`)));
      }
    }
    for (const [id, b] of poolBtns) {
      const used = seq.includes(id);
      b.classList.toggle('is-used', used);
      b.disabled = used || locked || seq.length >= q.steps.length;
      if (used) b.setAttribute('aria-hidden', 'true');
      else b.removeAttribute('aria-hidden');
    }
    undoBtn.hidden = locked || seq.length === 0;
  }

  update();

  return {
    el,
    isComplete: () => seq.length === q.steps.length,
    grade() {
      const parts = seq.map((id, i) => byId(id).pos === i);
      const solution =
        '<ol class="solution-steps">' + q.steps.map((s) => `<li>${fmtInline(s)}</li>`).join('') + '</ol>';
      return { correct: parts.length === q.steps.length && parts.every(Boolean), parts, solution };
    },
    reveal(result) {
      locked = true;
      update();
      poolEl.hidden = true;
      poolEl.previousElementSibling.hidden = true;
      [...seqEl.children].forEach((li, i) => li.classList.add(result.parts[i] ? 'is-correct' : 'is-wrong'));
    },
  };
}
