# Plataforma de práctica: Álgebra Abstracta

Sitio web estático para estudiar Álgebra Abstracta con preguntas que se califican
al instante en el navegador, sin servidores ni servicios externos. Está pensado
sobre todo para el celular.

El primer curso sigue las notas de clase de J. C. Arias (Universidad del Rosario),
secciones 1 a 6, con énfasis desde **grupos cocientes** en adelante: clases
laterales, fibras, subgrupos normales y cocientes, Lagrange, teoremas de
isomorfismo, acciones, grupo alternante y Cayley, ecuación de clases y Sylow.
Se respeta la notación de las notas ($D_{2n}$, $N \trianglelefteq G$, $|G:H|$,
$Z_n$, $\mathscr{O}_x$, $Syl_p(G)$, productos de permutaciones de derecha a
izquierda, etc.).

## Qué incluye

- **76 preguntas** en 10 temas (70 desde la Sección 5.1), cada una con
  justificación rigurosa, una idea intuitiva cuando ayuda, y la referencia al
  resultado de las notas (p. ej. "Teorema 5.46").
- **Seis tipos de pregunta**, todos calificables automáticamente:
  - selección única y selección múltiple (con explicación de cada opción);
  - respuesta numérica (enteros o fracciones);
  - **completar demostraciones** con fichas: se toca una ficha para ponerla en
    el espacio resaltado, o se arrastra (en pantallas táctiles, manteniéndola
    pulsada un instante);
  - **emparejar** (por ejemplo, cocientes con el grupo al que son isomorfos);
  - **ordenar los pasos** de una demostración, a veces con pasos que sobran.
- **Ideas clave** por tema: un resumen breve de definiciones y teoremas.
- **Progreso por perfil**: cada pregunta queda como *nueva*, *dominada* (último
  intento correcto) o *pendiente* (último intento incorrecto). Hay práctica por
  tema, práctica mixta, repaso de pendientes, repetición de falladas y
  reanudación de la sesión interrumpida.
- Modo claro/oscuro automático (o elegido en el perfil) y se puede instalar en la
  pantalla de inicio del celular.

## Inicio de sesión y progreso: cómo funciona (y sus límites)

GitHub Pages sólo sirve archivos estáticos, así que **no hay servidor**:

- Cada persona crea un perfil con **nombre + PIN** en su navegador. El PIN se
  guarda como hash con sal; sirve para separar perfiles en un mismo dispositivo,
  **no** es seguridad fuerte.
- El progreso se guarda en el navegador (`localStorage`) de ese dispositivo.
- Para pasar el progreso a otro dispositivo, o enviárselo a quien haga
  seguimiento, se usa **Perfil → Copiar código / Descargar archivo** y luego
  **Importar** en el otro dispositivo. La importación combina, no sobrescribe.

Si más adelante se quiere ver el progreso de varias personas en un solo lugar,
o sincronizar automáticamente entre dispositivos, hará falta un servicio con base
de datos (por ejemplo Supabase o Firebase). El código aísla el almacenamiento en
`assets/js/storage.js`, `auth.js` y `progress.js` para facilitar ese cambio.

## Publicar en GitHub Pages

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Haga push a la rama por defecto. La acción `.github/workflows/pages.yml`
   valida el banco de preguntas y publica el sitio.
3. La URL aparece en la pestaña **Actions** (en el trabajo *desplegar*) y en
   **Settings → Pages**.

En pull requests y otras ramas la acción sólo valida, no publica.

## Desarrollo local

No hay paso de compilación: son módulos ES servidos tal cual.

```bash
python3 -m http.server 8080   # luego abra http://localhost:8080
npm test                      # valida el contenido (Node 18+)
npm install && npm run test:e2e   # recorre todas las preguntas en un navegador (con el servidor encendido)
```

`npm test` revisa que cada pregunta tenga una estructura válida, que las
respuestas sean coherentes (una sola correcta en selección única, espacios del
texto iguales a las respuestas, distractores que no son respuestas, etc.) y que
**toda la notación compile en KaTeX**.

KaTeX está copiado en `vendor/katex` para no depender de un CDN. Para
actualizarlo: `npm install && npm run vendor`.

## Agregar preguntas o cursos

Las preguntas viven en `content/<curso>/*.js`, un archivo por tema. Se escriben
con `String.raw` para poder usar LaTeX sin escapar barras. Ejemplos de cada tipo:

```js
const r = String.raw;

// Selección única (type: 'multi' para selección múltiple: varias correct: true)
{
  id: 'co-02', type: 'mcq',
  prompt: r`En $D_6$, calcule $rsr^{-1}$.`,
  options: [
    { text: r`$sr$`, correct: true },
    { text: r`$s$`, why: r`Sería cierto si $r$ y $s$ conmutaran.` },
    { text: r`$sr^2$` },
  ],
  explanation: r`$rsr^{-1} = sr^{-2} = sr$ ...`,
  intuition: r`(opcional)`, hint: r`(opcional)`, ref: 'Teorema 5.35',
}

// Numérica
{ id: '...', type: 'numeric', prompt: r`...`, answer: 4, explanation: r`...`, ref: '...' }

// Completar: [[0]], [[1]], ... marcan los espacios (fuera de las fórmulas $...$)
{ id: '...', type: 'fill', prompt: r`...`,
  template: r`Entonces $g_1h_1 =$ [[0]] y ...`,
  blanks: [r`$g_2h_2$`],              // un espacio puede aceptar varias: [[r`$a$`, r`$b$`]]
  distractors: [r`$h_2g_2$`], explanation: r`...`, ref: '...' }

// Emparejar
{ id: '...', type: 'match', prompt: r`...`,
  rows: [{ left: r`$A_4/N$`, answer: r`$Z_3$` }], distractors: [r`$V_4$`], ... }

// Ordenar
{ id: '...', type: 'order', prompt: r`...`, steps: [r`Paso 1`, r`Paso 2`, r`Paso 3`],
  distractors: [r`Paso que sobra`], ... }
```

Macros disponibles en las fórmulas: `\Z`, `\Q`, `\R`, `\C`, `\nor` (⊴), `\md`
(mód), `\Syl`, `\Orb` (𝒪), `\sgn`, `\Aut`, `\acts` (↷).

Para un curso nuevo, cree `content/<nuevo-curso>/index.js` con
`{ id, title, subtitle, source, units }` y agréguelo a `content/index.js`.
Con más de un curso, la página de inicio muestra la lista de cursos.

## Estructura

```
index.html               Entrada de la aplicación
assets/css/app.css       Estilos (mobile-first, claro/oscuro)
assets/js/main.js        Enrutador (#/...) y arranque
assets/js/views/         Pantallas: entrar, curso, tema, práctica, resultados, perfil
assets/js/questions/     Componentes y calificación de cada tipo de pregunta
assets/js/auth.js        Perfiles locales con PIN
assets/js/progress.js    Progreso, exportar/importar
content/                 Cursos y preguntas
tests/validate-content.mjs  Validación del banco de preguntas
vendor/katex/            KaTeX (renderizado de matemáticas)
```
