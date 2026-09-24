// Prueba de extremo a extremo: crea un perfil, responde todas las preguntas
// de cada tema por la interfaz (tocando fichas, opciones y pasos) y verifica
// la calificación y que no haya desborde horizontal en un celular de 360 px.
// Requiere un servidor local en BASE_URL (por defecto http://localhost:8080):
//   python3 -m http.server 8080 &  npm run test:e2e
// Use CHROMIUM_PATH si Playwright no encuentra el navegador.
import { chromium, devices } from 'playwright-core';
import { COURSES } from '../content/index.js';

const BASE = process.env.BASE_URL || 'http://localhost:8080';
const WIDTH = 360;
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await (await browser.newContext({ ...devices['Galaxy S8'] })).newPage();
const problems = [];
page.on('pageerror', (e) => problems.push(`error de página: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && problems.push(`consola: ${m.text()}`));

const overflow = () => page.evaluate((w) => document.documentElement.scrollWidth - w, WIDTH);
const clickData = (sel, attr, val) =>
  page.evaluate(([sel, attr, val]) => {
    const el = [...document.querySelectorAll(sel)].find((e) => e.dataset[attr] === val && !e.disabled);
    if (!el) throw new Error(`no se encontró ${sel}[${attr}=${val}]`);
    el.click();
  }, [sel, attr, val]);

async function answer(q, wrong) {
  if (q.type === 'mcq' || q.type === 'multi') {
    const idx = q.options.flatMap((o, i) => ((wrong ? !o.correct : o.correct) ? [i] : []));
    for (const i of q.type === 'mcq' ? idx.slice(0, 1) : idx) await clickData('.option', 'i', String(i));
  } else if (q.type === 'numeric') {
    const a = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    await page.fill('.numeric-input', String(wrong ? Number(a) + 1 : a));
  } else if (q.type === 'fill' || q.type === 'match') {
    const vals = (q.type === 'match' ? q.rows.map((r) => r.answer) : q.blanks).map((b) => (Array.isArray(b) ? b[0] : b));
    for (const v of wrong ? vals.reverse() : vals) await clickData('.chip', 'value', v);
  } else if (q.type === 'order') {
    const ids = q.steps.map((_, i) => `s${i}`);
    for (const id of wrong ? ids.reverse() : ids) await clickData('.order-item', 'id', id);
  }
}

await page.goto(`${BASE}/`);
await page.fill('#f-name', `e2e ${Date.now()}`);
await page.fill('#f-pin', '4321');
await page.click('button[type=submit]');
await page.waitForSelector('.overview');
if ((await overflow()) > 0) problems.push('desborde en la página del curso');

for (const course of COURSES) {
  const byId = new Map(course.units.flatMap((u) => u.questions.map((q) => [q.id, q])));
  for (const [ui, unit] of course.units.entries()) {
    await page.goto(`${BASE}/#/curso/${course.id}/tema/${unit.id}`);
    await page.waitForSelector('.unit-head');
    if ((await overflow()) > 0) problems.push(`${unit.id}: desborde en la página del tema`);
    await page.click('button:has-text("Practicar el tema")');
    for (let k = 0; k < unit.questions.length; k++) {
      await page.waitForSelector('.question');
      const id = await page.evaluate(() => {
        const key = Object.keys(localStorage).find((k) => k.startsWith('aa:progress:'));
        const a = JSON.parse(localStorage.getItem(key)).active;
        return a.queue[a.index];
      });
      const q = byId.get(id);
      const wrong = ui === 1 && k === 0;
      await answer(q, wrong);
      if (await page.locator('.action-bar .btn-primary').isDisabled()) {
        problems.push(`${id}: no se habilitó Comprobar`);
        break;
      }
      await page.click('.action-bar .btn-primary');
      await page.waitForSelector('.feedback:not([hidden])');
      const ok = (await page.locator('.feedback-head.is-ok').count()) > 0;
      if (ok === wrong) problems.push(`${id}: calificación inesperada (${ok ? 'correcta' : 'incorrecta'})`);
      if ((await overflow()) > 0) problems.push(`${id}: desborde horizontal`);
      await page.click('.action-bar .btn-primary');
    }
    await page.waitForSelector('.score');
  }
}
await page.goto(`${BASE}/#/perfil`);
await page.waitForSelector('.stat-grid');
if ((await overflow()) > 0) problems.push('desborde en el perfil');
await browser.close();

if (problems.length) {
  console.error('✗ Problemas:\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
console.log('✓ Recorrido completo sin problemas.');
