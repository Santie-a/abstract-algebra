import { h, icon } from '../dom.js';
import { fmtInline } from '../format.js';
import { findCourse, allQuestions } from '../../../content/index.js';
import { state, startCustomSession } from '../state.js';
import { appBar, page } from '../ui.js';
import { typeLabel } from '../questions/index.js';

function message(pct) {
  if (pct === 100) return 'Sesión perfecta.';
  if (pct >= 80) return 'Muy bien. Revise las que falló y vuelva a intentarlas.';
  if (pct >= 50) return 'Va por buen camino. Repase las ideas clave y repita las falladas.';
  return 'Conviene repasar las ideas clave del tema antes de repetir.';
}

export function summaryView(navigate) {
  const sum = state.progress.lastSummary;
  if (!sum) {
    navigate('#/', { replace: true });
    return h('div');
  }
  const course = findCourse(sum.courseId);
  const byId = new Map(allQuestions(course).map((q) => [q.id, q]));
  const answered = sum.queue.filter((id) => id in sum.results && byId.has(id));
  const wrong = answered.filter((id) => !sum.results[id]);
  const pct = sum.total ? Math.round((100 * sum.correct) / sum.total) : 0;
  const backHref = sum.unitId ? `#/curso/${course.id}/tema/${sum.unitId}` : `#/curso/${course.id}`;

  return h(
    'div',
    {},
    appBar({ title: 'Resultados', back: backHref }),
    page(
      h(
        'section',
        { class: 'card score' },
        h('p', { class: 'eyebrow' }, sum.title),
        h('p', { class: 'score-big' }, h('span', {}, String(sum.correct)), h('span', { class: 'score-of' }, ` / ${sum.total}`)),
        h('p', { class: 'score-pct' }, `${pct}% de aciertos`),
        h('p', { class: 'muted' }, message(pct)),
        h(
          'div',
          { class: 'actions-row' },
          wrong.length
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'btn btn-primary',
                  onclick: () => {
                    if (startCustomSession(course.id, 'Repetir falladas', wrong, sum.unitId)) navigate('#/practica');
                  },
                },
                icon('redo'),
                `Repetir las falladas (${wrong.length})`,
              )
            : null,
          h('a', { class: wrong.length ? 'btn btn-secondary' : 'btn btn-primary', href: backHref }, 'Volver'),
        ),
      ),
      h('h2', { class: 'section-title' }, 'Detalle'),
      h(
        'ol',
        { class: 'result-list' },
        answered.map((id) => {
          const q = byId.get(id);
          const ok = sum.results[id];
          return h(
            'li',
            { class: `result-row ${ok ? 'is-ok' : 'is-bad'}` },
            h('span', { class: 'result-icon', 'aria-label': ok ? 'Correcta' : 'Incorrecta' }, icon(ok ? 'check' : 'x')),
            h(
              'span',
              { class: 'q-row-body' },
              h('span', { class: 'q-row-type' }, typeLabel(q)),
              h('span', { class: 'q-row-prompt', html: fmtInline(q.prompt) }),
            ),
          );
        }),
      ),
    ),
  );
}
