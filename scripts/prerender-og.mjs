// Post-build: generate per-product HTML with product-specific Open Graph tags.
//
// The site is a client-rendered SPA, so social crawlers (WhatsApp, Facebook,
// Telegram, …) only ever see the static index.html – every shared link would
// otherwise show the same generic title and no image. For each product we write
// dist/angebote/<id>/index.html: a copy of the built index.html with the <title>,
// description and the OG/Twitter block (between the OG_START/OG_END markers)
// replaced by that product's name, text and image. Vercel serves this static file
// at /angebote/<id> (filesystem match wins over the SPA rewrite); the browser then
// boots the SPA exactly as before, so nothing changes for real visitors.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { transformSync } from 'esbuild';

const ORIGIN = 'https://astroversity.academy';
const DIST = 'dist/index.html';

// Load the product catalog (plain data file, no imports) via esbuild → import.
const tsSource = readFileSync('src/app/data/products.ts', 'utf8');
const js = transformSync(tsSource, { loader: 'ts', format: 'esm' }).code;
const { products } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const template = readFileSync(DIST, 'utf8');

let count = 0;
for (const p of products) {
  if (p.hidden) continue;
  const title = `${p.name} – Robert Wagner Astrologie`;
  const desc = p.shortDescription || p.description || '';
  const url = `${ORIGIN}/angebote/${p.id}`;
  const image = ORIGIN + encodeURI(p.image || '/robert2.png');

  const ogBlock = `<!-- OG (product ${p.id}) -->
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="Robert Wagner Astrologie" />
    <meta property="og:locale" content="de_DE" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="twitter:image" content="${esc(image)}" />`;

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(desc)}" />`)
    .replace(/<!-- OG_START[\s\S]*?OG_END -->/, ogBlock);

  if (!html.includes(`og:url" content="${esc(url)}"`)) {
    throw new Error(`prerender-og: OG injection failed for product ${p.id} – markers missing in ${DIST}?`);
  }

  mkdirSync(`dist/angebote/${p.id}`, { recursive: true });
  writeFileSync(`dist/angebote/${p.id}/index.html`, html);
  count++;
}

console.log(`prerender-og: wrote ${count} product pages with per-product Open Graph tags.`);
