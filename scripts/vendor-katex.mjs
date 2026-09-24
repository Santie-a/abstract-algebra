// Copia KaTeX desde node_modules a vendor/katex para que el sitio
// funcione en GitHub Pages sin depender de un CDN.
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const src = 'node_modules/katex/dist';
const dst = 'vendor/katex';

rmSync(dst, { recursive: true, force: true });
mkdirSync(join(dst, 'fonts'), { recursive: true });
for (const f of ['katex.min.css', 'katex.mjs']) cpSync(join(src, f), join(dst, f));
for (const f of readdirSync(join(src, 'fonts'))) {
  if (f.endsWith('.woff2')) cpSync(join(src, 'fonts', f), join(dst, 'fonts', f));
}
console.log('KaTeX copiado en', dst);
