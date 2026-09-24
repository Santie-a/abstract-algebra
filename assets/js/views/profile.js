import { h } from '../dom.js';
import { fmtInline } from '../format.js';
import { COURSES, findCourse } from '../../../content/index.js';
import { logout, deleteUser } from '../auth.js';
import { statsFor, exportCode, parseCode, mergeProgress } from '../progress.js';
import { state, persist, refreshUser } from '../state.js';
import { read, write } from '../storage.js';
import { appBar, page, progressBar, initials, toast } from '../ui.js';

const dateFmt = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function applyTheme(value) {
  if (value === 'light' || value === 'dark') document.documentElement.dataset.theme = value;
  else delete document.documentElement.dataset.theme;
  write('theme', value);
}

export function profileView(navigate, rerender) {
  const { user, progress } = state;
  const records = Object.values(progress.answers);
  const attempts = records.reduce((a, r) => a + r.a, 0);
  const correct = records.reduce((a, r) => a + r.c, 0);
  const accuracy = attempts ? Math.round((100 * correct) / attempts) : 0;

  // ---- Exportar / importar ----
  const code = exportCode(user, progress);
  const importArea = h('textarea', {
    class: 'input code-input',
    rows: '3',
    placeholder: 'Pegue aquí un código de progreso',
    'aria-label': 'Código de progreso para importar',
    spellcheck: 'false',
  });
  const fileInput = h('input', {
    type: 'file',
    accept: '.json,.txt,application/json,text/plain',
    class: 'sr-only',
    id: 'import-file',
    onchange: async () => {
      const f = fileInput.files[0];
      if (!f) return;
      const text = await f.text();
      try {
        const data = JSON.parse(text);
        doImport(data.code || text);
      } catch {
        doImport(text);
      }
      fileInput.value = '';
    },
  });

  function doImport(text) {
    try {
      const payload = parseCode(text);
      const n = mergeProgress(progress, payload);
      persist();
      toast(n ? `Progreso importado: ${n} ${n === 1 ? 'pregunta actualizada' : 'preguntas actualizadas'}.` : 'No había nada nuevo que importar.');
      rerender();
    } catch (err) {
      toast(err.message);
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      toast('Código copiado. Péguelo en Importar desde otro dispositivo.');
    } catch {
      importArea.value = code;
      importArea.select();
      toast('No se pudo copiar automáticamente; el código quedó seleccionado en el cuadro.');
    }
  }

  function downloadCode() {
    const blob = new Blob([JSON.stringify({ app: 'algebra-abstracta', name: user.name, code }, null, 2)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: `progreso-${user.key.replace(/\s+/g, '-')}.json` });
    document.body.append(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000);
  }

  // ---- Tema ----
  const theme = read('theme', 'auto');
  const themeSelect = h(
    'select',
    { class: 'input', id: 'theme', onchange: (e) => applyTheme(e.target.value) },
    [
      ['auto', 'Automático (según el sistema)'],
      ['light', 'Claro'],
      ['dark', 'Oscuro'],
    ].map(([v, label]) => h('option', { value: v, selected: v === theme }, label)),
  );

  return h(
    'div',
    {},
    appBar({ title: 'Perfil', back: '#/', showProfile: false }),
    page(
      h(
        'section',
        { class: 'card profile-head' },
        h('span', { class: 'avatar avatar-lg', 'aria-hidden': 'true' }, initials(user.name)),
        h(
          'div',
          {},
          h('h2', { class: 'card-title' }, user.name),
          h('p', { class: 'muted' }, 'Perfil guardado en este dispositivo'),
        ),
      ),
      h(
        'section',
        { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('span', { class: 'stat-num' }, String(records.filter((r) => r.last).length)), h('span', { class: 'stat-label' }, 'dominadas')),
        h('div', { class: 'stat' }, h('span', { class: 'stat-num' }, `${accuracy}%`), h('span', { class: 'stat-label' }, 'de aciertos')),
        h('div', { class: 'stat' }, h('span', { class: 'stat-num' }, String(progress.history.length)), h('span', { class: 'stat-label' }, 'sesiones')),
      ),
      COURSES.map((course) =>
        h(
          'section',
          { class: 'card' },
          h('h2', { class: 'card-title' }, `Progreso por tema · ${course.title}`),
          h(
            'ul',
            { class: 'topic-progress' },
            course.units.map((u) => {
              const st = statsFor(progress, u.questions);
              return h(
                'li',
                {},
                h('a', { href: `#/curso/${course.id}/tema/${u.id}` }, h('span', { html: fmtInline(u.title) }), h('span', { class: 'muted' }, `${st.dominated}/${st.total}`)),
                progressBar(st.pct, `Progreso en ${u.title}`),
              );
            }),
          ),
        ),
      ),
      h(
        'section',
        { class: 'card' },
        h('h2', { class: 'card-title' }, 'Sesiones recientes'),
        progress.history.length
          ? h(
              'ul',
              { class: 'history' },
              progress.history.slice(0, 10).map((e) =>
                h(
                  'li',
                  {},
                  h(
                    'span',
                    {},
                    h('span', { class: 'history-title', html: fmtInline(e.title) }),
                    COURSES.length > 1 ? h('span', { class: 'muted' }, ` · ${(findCourse(e.courseId) || {}).title || ''}`) : null,
                  ),
                  h('span', { class: 'history-meta' }, `${e.correct}/${e.total} · ${dateFmt.format(e.at)}`),
                ),
              ),
            )
          : h('p', { class: 'muted' }, 'Aún no ha terminado ninguna sesión.'),
      ),
      h(
        'section',
        { class: 'card' },
        h('h2', { class: 'card-title' }, 'Llevar su progreso a otro dispositivo'),
        h('p', { class: 'muted' }, 'El progreso vive en este navegador. Exporte un código y luego impórtelo en otro dispositivo (con su perfil creado allí). También sirve para compartir su avance con quien le haga seguimiento.'),
        h(
          'div',
          { class: 'actions-row' },
          h('button', { type: 'button', class: 'btn btn-secondary', onclick: copyCode }, 'Copiar código'),
          h('button', { type: 'button', class: 'btn btn-secondary', onclick: downloadCode }, 'Descargar archivo'),
        ),
        importArea,
        h(
          'div',
          { class: 'actions-row' },
          h('button', { type: 'button', class: 'btn btn-primary', onclick: () => doImport(importArea.value) }, 'Importar código'),
          h('label', { class: 'btn btn-secondary', for: 'import-file' }, 'Importar archivo'),
          fileInput,
        ),
      ),
      h(
        'section',
        { class: 'card' },
        h('h2', { class: 'card-title' }, 'Apariencia'),
        h('label', { class: 'field', for: 'theme' }, h('span', { class: 'field-label' }, 'Tema'), themeSelect),
      ),
      h(
        'section',
        { class: 'card danger-zone' },
        h('h2', { class: 'card-title' }, 'Cuenta'),
        h(
          'div',
          { class: 'actions-col' },
          h(
            'button',
            {
              type: 'button',
              class: 'btn btn-secondary',
              onclick: () => {
                logout();
                refreshUser();
                navigate('#/entrar');
              },
            },
            'Cerrar sesión',
          ),
          h(
            'button',
            {
              type: 'button',
              class: 'btn btn-danger-ghost',
              onclick: () => {
                if (!confirm('¿Borrar todo su progreso? Esta acción no se puede deshacer.')) return;
                progress.answers = {};
                progress.history = [];
                progress.active = null;
                progress.lastSummary = null;
                persist();
                toast('Progreso reiniciado.');
                rerender();
              },
            },
            'Reiniciar progreso',
          ),
          h(
            'button',
            {
              type: 'button',
              class: 'btn btn-danger-ghost',
              onclick: async () => {
                const pin = prompt('Para eliminar el perfil y su progreso, escriba su PIN:');
                if (pin === null) return;
                try {
                  await deleteUser(user.key, pin);
                  refreshUser();
                  toast('Perfil eliminado.');
                  navigate('#/entrar');
                } catch (err) {
                  toast(err.message);
                }
              },
            },
            'Eliminar perfil',
          ),
        ),
      ),
    ),
  );
}

