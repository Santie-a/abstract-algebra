import { h, icon, seededRandom, announce } from '../dom.js';
import { fmt } from '../format.js';
import { findCourse, findUnit, allQuestions } from '../../../content/index.js';
import { recordAnswer } from '../progress.js';
import { state, persist, finishSession } from '../state.js';
import { renderQuestion, typeLabel } from '../questions/index.js';
import { progressBar } from '../ui.js';

export function practiceView(navigate, rerender) {
  const s = state.progress.active;
  if (!s) {
    navigate('#/', { replace: true });
    return h('div');
  }
  const course = findCourse(s.courseId);
  const byId = new Map(allQuestions(course).map((q) => [q.id, q]));

  // Salta preguntas ya respondidas o que ya no existen en el banco.
  while (s.index < s.queue.length && (s.queue[s.index] in s.results || !byId.has(s.queue[s.index]))) s.index++;
  if (s.index >= s.queue.length) {
    finishSession();
    navigate('#/resumen', { replace: true });
    return h('div');
  }

  const q = byId.get(s.queue[s.index]);
  const unit = findUnit(course, q.unitId);
  const exitHref = s.unitId ? `#/curso/${course.id}/tema/${s.unitId}` : `#/curso/${course.id}`;
  const isLast = s.index === s.queue.length - 1;
  let checked = false;

  const primary = h('button', { type: 'button', class: 'btn btn-primary btn-block', disabled: true }, 'Comprobar');
  const verdict = h('div', { class: 'verdict', 'aria-hidden': 'true' });
  const bar = h('div', { class: 'action-bar' }, h('div', { class: 'action-inner' }, verdict, primary));
  const feedback = h('section', { class: 'feedback', hidden: true, 'aria-label': 'Retroalimentación' });

  const ctrl = renderQuestion(q, {
    rand: seededRandom(s.seed + q.id),
    onChange: () => {
      if (!checked) primary.disabled = !ctrl.isComplete();
    },
    onSubmit: () => check(),
  });

  primary.addEventListener('click', () => (checked ? next() : check()));

  function check() {
    if (checked || !ctrl.isComplete()) return;
    checked = true;
    const result = ctrl.grade();
    ctrl.reveal(result);
    recordAnswer(state.progress, q.id, result.correct);
    s.results[q.id] = result.correct;
    persist();
    showFeedback(result);
  }

  function next() {
    s.index++;
    persist();
    if (s.index >= s.queue.length) {
      finishSession();
      navigate('#/resumen');
    } else {
      rerender();
    }
  }

  function showFeedback(result) {
    const ok = result.correct;
    bar.classList.add(ok ? 'is-ok' : 'is-bad');
    verdict.replaceChildren(icon(ok ? 'check' : 'x'), h('span', {}, ok ? '¡Correcto!' : 'Incorrecto'));
    primary.textContent = isLast ? 'Ver resultados' : 'Continuar';
    primary.disabled = false;

    feedback.replaceChildren(
      ...[
      h(
        'div',
        { class: `feedback-head ${ok ? 'is-ok' : 'is-bad'}` },
        icon(ok ? 'check' : 'x'),
        h('span', {}, ok ? '¡Correcto!' : 'Respuesta incorrecta'),
      ),
      result.solution ? h('div', { class: 'feedback-block' }, h('h3', {}, 'Orden correcto'), h('div', { html: result.solution })) : null,
      h('div', { class: 'feedback-block' }, h('h3', {}, 'Justificación'), h('div', { class: 'prose', html: fmt(q.explanation) })),
      q.intuition
        ? h(
            'div',
            { class: 'feedback-block intuition' },
            h('h3', {}, icon('bulb'), 'Intuición'),
            h('div', { class: 'prose', html: fmt(q.intuition) }),
          )
        : null,
      q.ref ? h('p', { class: 'feedback-ref' }, 'En las notas: ', h('strong', {}, q.ref)) : null,
      ].filter(Boolean),
    );
    feedback.hidden = false;
    announce(ok ? 'Correcto.' : 'Incorrecto. Revise la justificación.');
    requestAnimationFrame(() => feedback.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    primary.focus({ preventScroll: true });
  }

  const hintBox = q.hint
    ? h('details', { class: 'hint' }, h('summary', {}, icon('bulb'), 'Ver pista'), h('div', { class: 'prose', html: fmt(q.hint) }))
    : null;

  const pct = Math.round((100 * s.index) / s.queue.length);

  const view = h(
    'div',
    { class: 'practice' },
    h(
      'header',
      { class: 'practice-top' },
      h(
        'div',
        { class: 'practice-top-inner' },
        h('a', { class: 'icon-btn', href: exitHref, 'aria-label': 'Salir (su avance queda guardado)' }, icon('x')),
        progressBar(pct, 'Avance de la sesión'),
        h('span', { class: 'practice-count' }, `${s.index + 1}/${s.queue.length}`),
      ),
    ),
    h(
      'main',
      { id: 'main', class: 'shell practice-main', tabindex: '-1' },
      h(
        'article',
        { class: 'card question' },
        h('p', { class: 'eyebrow' }, `${unit.section} · ${typeLabel(q)}`),
        h('div', { class: 'prompt prose', html: fmt(q.prompt) }),
        ctrl.el,
        hintBox,
      ),
      feedback,
    ),
    bar,
  );

  if (ctrl.focus && window.matchMedia('(pointer: fine)').matches) requestAnimationFrame(() => ctrl.focus());
  return view;
}
