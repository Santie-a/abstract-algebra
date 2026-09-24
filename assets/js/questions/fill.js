// Completar espacios con fichas ("fill") y emparejar ("match").
// Interacción principal: tocar una ficha la coloca en el espacio activo.
// También se puede arrastrar: con ratón directamente y en pantallas táctiles
// manteniendo pulsada la ficha un instante.
import { h, shuffle, icon } from '../dom.js';
import { fmt, fmtInline } from '../format.js';

const LONG_PRESS_MS = 200;

export function renderFill(q, { rand, onChange }) {
  const isMatch = q.type === 'match';
  const blanks = (isMatch ? q.rows.map((r) => r.answer) : q.blanks).map((b) => (Array.isArray(b) ? b : [b]));
  const chips = shuffle(
    [...blanks.map((b) => b[0]), ...(q.distractors || [])].map((value, id) => ({ id, value })),
    rand,
  );
  const filled = blanks.map(() => null);
  let active = 0;
  let locked = false;
  let suppressClick = false;

  const blankEls = blanks.map((_, i) =>
    h('button', {
      type: 'button',
      class: 'blank',
      dataset: { index: String(i) },
      onclick: () => onBlank(i),
    }),
  );

  let body;
  if (isMatch) {
    body = h(
      'div',
      { class: 'match-rows' },
      q.rows.map((row, i) =>
        h('div', { class: 'match-row' }, h('div', { class: 'match-left', html: fmtInline(row.left) }), blankEls[i]),
      ),
    );
  } else {
    const html = fmt(q.template.replace(/\[\[(\d+)\]\]/g, '⟦$1⟧')).replace(
      /⟦(\d+)⟧/g,
      (_, i) => `<span data-slot="${i}"></span>`,
    );
    body = h('div', { class: 'fill-text', html });
    body.querySelectorAll('[data-slot]').forEach((slot) => slot.replaceWith(blankEls[Number(slot.dataset.slot)]));
  }

  const chipEls = new Map();
  const bank = h(
    'div',
    { class: 'bank', role: 'group', 'aria-label': 'Fichas disponibles' },
    chips.map((chip) => {
      const el = h('button', {
        type: 'button',
        class: 'chip',
        dataset: { value: chip.value },
        html: fmtInline(chip.value),
        onclick: () => onChip(chip.id),
        oncontextmenu: (e) => e.preventDefault(),
      });
      attachDrag(el, chip.id);
      chipEls.set(chip.id, el);
      return el;
    }),
  );

  const resetBtn = h(
    'button',
    { type: 'button', class: 'btn-text', onclick: reset },
    icon('undo'),
    'Vaciar espacios',
  );

  const el = h(
    'div',
    { class: isMatch ? 'q-fill q-match' : 'q-fill' },
    body,
    h(
      'div',
      { class: 'bank-wrap' },
      h(
        'div',
        { class: 'bank-head' },
        h('span', { class: 'bank-title' }, 'Fichas'),
        resetBtn,
      ),
      bank,
      h('p', { class: 'bank-help' }, 'Toque una ficha para ponerla en el espacio resaltado, o arrástrela. Toque un espacio lleno para vaciarlo.'),
    ),
  );

  function chipById(id) {
    return chips.find((c) => c.id === id);
  }

  function nextEmpty(from) {
    const n = blanks.length;
    for (let k = 1; k <= n; k++) {
      const idx = (from + k + n) % n;
      if (filled[idx] === null) return idx;
    }
    return null;
  }

  function place(chipId, idx) {
    if (locked) return;
    const already = filled.indexOf(chipId);
    if (already !== -1) filled[already] = null;
    filled[idx] = chipId;
    active = nextEmpty(idx);
    update();
    onChange();
  }

  function onChip(chipId) {
    if (suppressClick || locked || filled.includes(chipId)) return;
    const target = active !== null ? active : nextEmpty(-1);
    if (target === null) return;
    place(chipId, target);
  }

  function onBlank(i) {
    if (locked) return;
    if (filled[i] !== null) filled[i] = null;
    active = i;
    update();
    onChange();
  }

  function reset() {
    if (locked) return;
    filled.fill(null);
    active = 0;
    update();
    onChange();
  }

  function update() {
    blankEls.forEach((b, i) => {
      const chipId = filled[i];
      b.classList.toggle('is-filled', chipId !== null);
      b.classList.toggle('is-active', !locked && active === i);
      if (chipId === null) {
        b.innerHTML = '<span class="blank-empty" aria-hidden="true"></span>';
        b.setAttribute('aria-label', `Espacio ${i + 1}: vacío`);
      } else {
        b.innerHTML = fmtInline(chipById(chipId).value);
        b.setAttribute('aria-label', `Espacio ${i + 1}: ${chipById(chipId).value}. Toque para vaciar.`);
      }
    });
    for (const [id, cel] of chipEls) {
      const used = filled.includes(id);
      cel.classList.toggle('is-used', used);
      cel.disabled = used || locked;
      cel.setAttribute('aria-hidden', String(used));
    }
    resetBtn.hidden = locked || filled.every((f) => f === null);
  }

  // ---- Arrastrar ----------------------------------------------------------
  function attachDrag(chipEl, chipId) {
    let dragging = false;
    let ghost = null;
    let over = null;
    let timer = null;
    let start = null;

    function begin(x, y) {
      if (locked || filled.includes(chipId)) return;
      dragging = true;
      ghost = chipEl.cloneNode(true);
      ghost.classList.add('chip-ghost');
      document.body.append(ghost);
      chipEl.classList.add('is-dragging');
      if (navigator.vibrate) navigator.vibrate(8);
      moveTo(x, y);
    }

    function moveTo(x, y) {
      ghost.style.left = `${x}px`;
      ghost.style.top = `${y}px`;
      const hit = document.elementFromPoint(x, y);
      const blank = hit && hit.closest ? hit.closest('.blank') : null;
      const idx = blank && el.contains(blank) ? Number(blank.dataset.index) : null;
      if (idx !== over) {
        if (over !== null) blankEls[over].classList.remove('is-over');
        over = idx;
        if (over !== null) blankEls[over].classList.add('is-over');
      }
    }

    function finish() {
      clearTimeout(timer);
      timer = null;
      if (dragging) {
        ghost.remove();
        chipEl.classList.remove('is-dragging');
        suppressClick = true;
        setTimeout(() => (suppressClick = false), 0);
        if (over !== null) {
          blankEls[over].classList.remove('is-over');
          place(chipId, over);
        }
      }
      dragging = false;
      ghost = null;
      over = null;
    }

    // Ratón / lápiz
    chipEl.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY };
      const move = (ev) => {
        if (!dragging && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 5) begin(ev.clientX, ev.clientY);
        if (dragging) moveTo(ev.clientX, ev.clientY);
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        finish();
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });

    // Táctil: mantener pulsado para arrastrar; deslizar sin esperar hace scroll.
    chipEl.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        start = { x: t.clientX, y: t.clientY };
        timer = setTimeout(() => begin(start.x, start.y), LONG_PRESS_MS);
      },
      { passive: true },
    );
    chipEl.addEventListener(
      'touchmove',
      (e) => {
        const t = e.touches[0];
        if (dragging) {
          e.preventDefault();
          moveTo(t.clientX, t.clientY);
        } else if (timer && Math.hypot(t.clientX - start.x, t.clientY - start.y) > 8) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { passive: false },
    );
    chipEl.addEventListener('touchend', (e) => {
      if (dragging) e.preventDefault();
      finish();
    });
    chipEl.addEventListener('touchcancel', finish);
  }

  update();

  return {
    el,
    isComplete: () => filled.every((f) => f !== null),
    grade() {
      const ok = filled.map((chipId, i) => chipId !== null && blanks[i].includes(chipById(chipId).value));
      return { correct: ok.every(Boolean), parts: ok };
    },
    reveal(result) {
      locked = true;
      active = null;
      update();
      blankEls.forEach((b, i) => {
        b.disabled = true;
        const good = result.parts[i];
        b.classList.add(good ? 'is-correct' : 'is-wrong');
        if (!good) {
          b.innerHTML =
            `<span class="blank-given">${b.innerHTML}</span>` +
            `<span class="blank-fix">${fmtInline(blanks[i][0])}</span>`;
          b.setAttribute('aria-label', `Espacio ${i + 1}: incorrecto. La respuesta es ${blanks[i][0]}`);
        }
      });
    },
  };
}
