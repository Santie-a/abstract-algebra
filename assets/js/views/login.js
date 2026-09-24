import { h } from '../dom.js';
import { listUsers, login, register } from '../auth.js';
import { refreshUser } from '../state.js';
import { storageAvailable } from '../storage.js';
import { initials } from '../ui.js';

export function loginView(navigate) {
  const users = listUsers();
  let mode = users.length ? 'login' : 'register';

  const nameInput = h('input', {
    id: 'f-name',
    class: 'input',
    type: 'text',
    autocomplete: 'username',
    autocapitalize: 'words',
    maxlength: '32',
    required: true,
  });
  const pinInput = h('input', {
    id: 'f-pin',
    class: 'input',
    type: 'password',
    inputmode: 'numeric',
    autocomplete: 'current-password',
    pattern: '[0-9]*',
    maxlength: '8',
    required: true,
  });
  const error = h('p', { class: 'form-error', role: 'alert' });
  const submit = h('button', { class: 'btn btn-primary btn-block', type: 'submit' });
  const pinHelp = h('p', { class: 'field-help', id: 'pin-help' });
  pinInput.setAttribute('aria-describedby', 'pin-help');

  const tabLogin = h('button', { type: 'button', role: 'tab', class: 'tab', onclick: () => setMode('login') }, 'Entrar');
  const tabRegister = h('button', { type: 'button', role: 'tab', class: 'tab', onclick: () => setMode('register') }, 'Crear perfil');

  function setMode(m) {
    mode = m;
    tabLogin.setAttribute('aria-selected', String(m === 'login'));
    tabRegister.setAttribute('aria-selected', String(m === 'register'));
    submit.textContent = m === 'login' ? 'Entrar' : 'Crear perfil y empezar';
    pinInput.autocomplete = m === 'login' ? 'current-password' : 'new-password';
    pinHelp.textContent = m === 'login' ? '' : 'Entre 4 y 8 dígitos. Lo necesitará para volver a entrar.';
    error.textContent = '';
  }

  const form = h(
    'form',
    {
      class: 'card form',
      novalidate: true,
      onsubmit: async (e) => {
        e.preventDefault();
        error.textContent = '';
        submit.disabled = true;
        try {
          if (mode === 'login') await login(nameInput.value, pinInput.value);
          else await register(nameInput.value, pinInput.value);
          refreshUser();
          navigate('#/');
        } catch (err) {
          error.textContent = err.message;
          submit.disabled = false;
        }
      },
    },
    h('div', { class: 'tabs', role: 'tablist' }, tabLogin, tabRegister),
    h('label', { class: 'field', for: 'f-name' }, h('span', { class: 'field-label' }, 'Nombre'), nameInput),
    h('label', { class: 'field', for: 'f-pin' }, h('span', { class: 'field-label' }, 'PIN'), pinInput, pinHelp),
    error,
    submit,
  );

  const quick = users.length
    ? h(
        'section',
        { class: 'quick-users' },
        h('h2', { class: 'section-title' }, 'Perfiles en este dispositivo'),
        h(
          'div',
          { class: 'quick-list' },
          users.map((u) =>
            h(
              'button',
              {
                type: 'button',
                class: 'quick-user',
                onclick: () => {
                  setMode('login');
                  nameInput.value = u.name;
                  pinInput.focus();
                },
              },
              h('span', { class: 'avatar avatar-sm', 'aria-hidden': 'true' }, initials(u.name)),
              u.name,
            ),
          ),
        ),
      )
    : null;

  setMode(mode);

  return h(
    'main',
    { id: 'main', class: 'shell login', tabindex: '-1' },
    h(
      'div',
      { class: 'login-hero' },
      h('div', { class: 'login-mark', 'aria-hidden': 'true' }, 'G/N'),
      h('h1', { class: 'login-title' }, 'Álgebra Abstracta'),
      h('p', { class: 'login-sub' }, 'Practique grupos cocientes, teoremas de isomorfismo, acciones y Sylow con preguntas que se califican al instante.'),
    ),
    quick,
    form,
    h(
      'p',
      { class: 'login-note' },
      storageAvailable()
        ? 'Su perfil y su progreso se guardan en este dispositivo. Para continuar en otro, use Exportar e Importar progreso en su perfil.'
        : 'Este navegador no permite guardar datos (¿modo privado?). Podrá practicar, pero el progreso se perderá al cerrar la página.',
    ),
  );
}
