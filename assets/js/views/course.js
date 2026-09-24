import { h, icon } from '../dom.js';
import { fmtInline } from '../format.js';
import { COURSES, allQuestions } from '../../../content/index.js';
import { statsFor } from '../progress.js';
import { state, startSession } from '../state.js';
import { appBar, page, progressBar, statPills, toast } from '../ui.js';
import { resumeCard } from './home.js';

export function courseView(navigate, course) {
  const stats = statsFor(state.progress, allQuestions(course));

  function start(mode) {
    if (state.progress.active && !confirm('Tiene una sesión sin terminar. ¿Desea descartarla y empezar otra?')) return;
    if (startSession(course.id, mode)) navigate('#/practica');
    else toast(mode === 'review' ? 'No tiene preguntas pendientes. ¡Bien!' : 'No hay preguntas disponibles.');
  }

  return h(
    'div',
    {},
    appBar({ title: course.title, back: COURSES.length > 1 ? '#/' : null }),
    page(
      h(
        'section',
        { class: 'card overview' },
        h('div', { class: 'overview-top' }, h('span', { class: 'overview-pct' }, `${stats.pct}%`), h('span', { class: 'muted' }, 'del curso dominado')),
        progressBar(stats.pct, 'Progreso del curso'),
        statPills(stats),
        h(
          'div',
          { class: 'actions-row' },
          h('button', { type: 'button', class: 'btn btn-primary', onclick: () => start('mixed') }, icon('shuffle'), 'Práctica mixta'),
          h(
            'button',
            { type: 'button', class: 'btn btn-secondary', onclick: () => start('review'), disabled: stats.pending === 0 },
            icon('redo'),
            `Repasar pendientes${stats.pending ? ` (${stats.pending})` : ''}`,
          ),
        ),
      ),
      resumeCard(navigate),
      h('h2', { class: 'section-title' }, 'Temas'),
      h(
        'ol',
        { class: 'unit-list' },
        course.units.map((unit, i) => {
          const us = statsFor(state.progress, unit.questions);
          return h(
            'li',
            {},
            h(
              'a',
              { class: 'card unit-card', href: `#/curso/${course.id}/tema/${unit.id}` },
              h('span', { class: 'unit-num', 'aria-hidden': 'true' }, String(i)),
              h(
                'span',
                { class: 'unit-body' },
                h('span', { class: 'eyebrow' }, unit.section),
                h('span', { class: 'unit-title', html: fmtInline(unit.title) }),
                progressBar(us.pct, `Progreso en ${unit.title}`),
                h('span', { class: 'unit-meta' }, `${us.dominated}/${us.total} dominadas`, us.pending ? ` · ${us.pending} pendientes` : ''),
              ),
              h('span', { class: 'chevron', 'aria-hidden': 'true' }, icon('chevron')),
            ),
          );
        }),
      ),
      h('p', { class: 'source-note' }, course.source),
    ),
  );
}
