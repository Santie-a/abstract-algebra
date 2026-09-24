import { h, icon } from '../dom.js';
import { fmt, fmtInline } from '../format.js';
import { statsFor, statusOf } from '../progress.js';
import { state, startSession } from '../state.js';
import { appBar, page, progressBar, statPills, STATUS_LABEL } from '../ui.js';
import { typeLabel } from '../questions/index.js';

export function unitView(navigate, course, unit) {
  const stats = statsFor(state.progress, unit.questions);
  const notDominated = stats.total - stats.dominated;

  function start(mode, startAt = null) {
    if (state.progress.active && !confirm('Tiene una sesión sin terminar. ¿Desea descartarla y empezar otra?')) return;
    if (startSession(course.id, mode, unit.id, startAt)) navigate('#/practica');
  }

  const ideasOpen = stats.seen === 0;

  return h(
    'div',
    {},
    appBar({ title: unit.section, back: `#/curso/${course.id}` }),
    page(
      h(
        'section',
        { class: 'unit-head' },
        h('p', { class: 'eyebrow' }, unit.section),
        h('h2', { class: 'unit-head-title', html: fmtInline(unit.title) }),
        progressBar(stats.pct, `Progreso en ${unit.title}`),
        statPills(stats),
        h(
          'div',
          { class: 'actions-row' },
          h(
            'button',
            { type: 'button', class: 'btn btn-primary', onclick: () => start('unit') },
            icon('play'),
            `Practicar el tema (${stats.total})`,
          ),
          notDominated > 0 && notDominated < stats.total
            ? h(
                'button',
                { type: 'button', class: 'btn btn-secondary', onclick: () => start('unit-pending') },
                icon('redo'),
                `Sólo no dominadas (${notDominated})`,
              )
            : null,
        ),
      ),
      h(
        'details',
        { class: 'card ideas', open: ideasOpen },
        h('summary', {}, icon('book'), h('span', {}, 'Ideas clave'), h('span', { class: 'summary-hint' }, 'Resumen de las notas')),
        h('ul', { class: 'ideas-list' }, unit.keyIdeas.map((t) => h('li', { html: fmt(t) }))),
      ),
      h('h2', { class: 'section-title' }, 'Preguntas'),
      h(
        'ol',
        { class: 'q-list' },
        unit.questions.map((q, i) => {
          const st = statusOf(state.progress, q.id);
          return h(
            'li',
            {},
            h(
              'button',
              {
                type: 'button',
                class: 'q-row',
                onclick: () => start('unit', q.id),
                'aria-label': `Pregunta ${i + 1}, ${typeLabel(q)}, ${STATUS_LABEL[st]}. Practicar desde aquí.`,
              },
              h('span', { class: `dot dot-${st}`, title: STATUS_LABEL[st] }),
              h(
                'span',
                { class: 'q-row-body' },
                h('span', { class: 'q-row-type' }, `${i + 1}. ${typeLabel(q)}`),
                h('span', { class: 'q-row-prompt', html: fmtInline(q.prompt) }),
              ),
              h('span', { class: 'chevron', 'aria-hidden': 'true' }, icon('chevron')),
            ),
          );
        }),
      ),
      h('p', { class: 'source-note' }, 'Toque una pregunta para practicar el tema desde ese punto.'),
    ),
  );
}
