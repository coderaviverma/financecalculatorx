#!/usr/bin/env node
/* Finance Calculator X — static site generator.
   Usage: node build.mjs [--strict]
   Loads data modules, validates content quality gates, renders pages to dist/. */
import { readdirSync, mkdirSync, writeFileSync, cpSync, existsSync, readFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { site, categories } from "./src/data/site.mjs";
import * as T from "./src/templates.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "src");
const DIST = join(ROOT, "dist");
const STRICT = process.argv.includes("--strict");
const errors = [];
const warnings = [];

const BANNED = [
  "in today's fast-paced world", "in today’s fast-paced world", "fast-paced world",
  "navigating the complex world", "whether you're a seasoned investor", "whether you’re a seasoned investor",
  "unlock your financial", "in conclusion", "this comprehensive guide", "look no further",
  "game-changer", "delve into", "it's important to note that", "it’s important to note that",
];

async function loadDir(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".mjs")).sort()) {
    const mod = await import(pathToFileURL(join(dir, f)).href + "?t=" + Date.now());
    out.push({ file: f, data: mod.default });
  }
  return out;
}

function checkBanned(where, html) {
  const lower = String(html || "").toLowerCase();
  for (const b of BANNED) if (lower.includes(b)) errors.push(`${where}: banned filler phrase "${b}"`);
}

function textLen(html) {
  return String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

function validateCalc(c, file, allSlugs) {
  const w = `calculators/${file}`;
  const req = ["slug", "category", "title", "metaTitle", "metaDescription", "tagline", "cardDescription", "lastReviewed", "related", "faq", "sections"];
  for (const k of req) if (!c?.[k]) errors.push(`${w}: missing "${k}"`);
  if (!c || !c.sections) return;
  if (!categories.find((x) => x.id === c.category)) errors.push(`${w}: unknown category "${c.category}"`);
  if (`${file}` !== `${c.slug}.mjs`) errors.push(`${w}: filename must match slug "${c.slug}"`);
  const sec = ["howToHtml", "explanationHtml", "formulaHtml", "exampleHtml", "factorsHtml", "limitationsHtml"];
  for (const s of sec) {
    if (!c.sections[s]) { errors.push(`${w}: missing sections.${s}`); continue; }
    const len = textLen(c.sections[s]);
    const min = s === "explanationHtml" ? 700 : s === "formulaHtml" ? 300 : s === "exampleHtml" ? 300 : 150;
    if (len < min) errors.push(`${w}: sections.${s} too thin (${len} chars of text, need ${min}+)`);
  }
  if (!/^<h2/.test((c.sections.explanationHtml || "").trim())) errors.push(`${w}: explanationHtml must start with an <h2> heading`);
  if (!Array.isArray(c.faq) || c.faq.length < 3 || c.faq.length > 7) errors.push(`${w}: faq needs 3–7 entries (has ${c.faq?.length})`);
  (c.faq || []).forEach((f, i) => { if (!f.q || textLen(f.aHtml) < 80) errors.push(`${w}: faq[${i}] answer too thin`); });
  if (!Array.isArray(c.related) || c.related.length < 3 || c.related.length > 6) errors.push(`${w}: related needs 3–6 slugs`);
  (c.related || []).forEach((r) => { if (!allSlugs.has(r)) (STRICT ? errors : warnings).push(`${w}: related slug "${r}" does not exist${STRICT ? "" : " yet"}`); });
  if (c.related?.includes(c.slug)) errors.push(`${w}: related must not include itself`);
  const md = c.metaDescription || "";
  if (md.length < 80 || md.length > 175) warnings.push(`${w}: metaDescription length ${md.length} (aim 110–160)`);
  const jsPath = join(SRC, "assets/js/calc", `${c.slug}.js`);
  if (!existsSync(jsPath)) errors.push(`${w}: missing calc script src/assets/js/calc/${c.slug}.js`);
  else {
    const js = readFileSync(jsPath, "utf8");
    if (!js.includes("FCX.define")) errors.push(`${w}: calc script does not call FCX.define`);
    if (!js.includes(`"${c.slug}"`) && !js.includes(`'${c.slug}'`)) warnings.push(`${w}: calc script does not reference slug`);
  }
  checkBanned(w, JSON.stringify(c.sections) + JSON.stringify(c.faq));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(c.lastReviewed || "")) errors.push(`${w}: lastReviewed must be YYYY-MM-DD`);
}

function validateGuide(g, file, calcSlugs) {
  const w = `guides/${file}`;
  for (const k of ["slug", "title", "metaTitle", "metaDescription", "description", "cardDescription", "lastReviewed", "bodyHtml", "relatedCalculators"])
    if (!g?.[k]) errors.push(`${w}: missing "${k}"`);
  if (!g) return;
  if (`${file}` !== `${g.slug}.mjs`) errors.push(`${w}: filename must match slug`);
  const len = textLen(g.bodyHtml);
  if (len < 3500) errors.push(`${w}: bodyHtml too thin (${len} chars, need 3500+)`);
  (g.relatedCalculators || []).forEach((r) => { if (!calcSlugs.has(r)) (STRICT ? errors : warnings).push(`${w}: related calculator "${r}" does not exist${STRICT ? "" : " yet"}`); });
  checkBanned(w, g.bodyHtml);
}

function dedupe(items, key, kind) {
  const seen = new Map();
  for (const it of items) {
    const v = (it.data[key] || "").trim().toLowerCase();
    if (!v) continue;
    if (seen.has(v)) errors.push(`${kind}: duplicate ${key} between ${seen.get(v)} and ${it.file}`);
    seen.set(v, it.file);
  }
}

function out(path, html) {
  const full = join(DIST, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

const today = new Date().toISOString().slice(0, 10);

async function main() {
  /* ---- load ---- */
  const calcMods = await loadDir(join(SRC, "data/calculators"));
  const guideMods = await loadDir(join(SRC, "data/guides"));
  const pageMods = await loadDir(join(SRC, "data/pages"));
  const calcs = calcMods.map((m) => m.data);
  const guides = guideMods.map((m) => m.data);
  const pages = pageMods.map((m) => m.data);
  const calcSlugs = new Set(calcs.map((c) => c.slug));

  /* ---- validate ---- */
  calcMods.forEach((m) => validateCalc(m.data, m.file, calcSlugs));
  guideMods.forEach((m) => validateGuide(m.data, m.file, calcSlugs));
  dedupe(calcMods, "metaTitle", "calculators");
  dedupe(calcMods, "metaDescription", "calculators");
  dedupe(guideMods, "metaTitle", "guides");
  // duplicate content openers across calculators (first 90 chars of each section)
  const openers = new Map();
  for (const m of calcMods) {
    for (const s of Object.keys(m.data.sections || {})) {
      const t = String(m.data.sections[s]).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 90).toLowerCase();
      if (t.length < 60) continue;
      const k = s + "::" + t;
      if (openers.has(k)) errors.push(`calculators: ${m.file} ${s} opens identically to ${openers.get(k)} — content must be unique per calculator`);
      openers.set(k, m.file);
    }
  }

  if (errors.length) {
    console.error(`\n✗ BUILD FAILED — ${errors.length} error(s):\n`);
    errors.forEach((e) => console.error("  • " + e));
    if (warnings.length) { console.error(`\n  warnings:`); warnings.forEach((e) => console.error("  – " + e)); }
    process.exit(1);
  }

  if (process.argv.includes("--check")) {
    console.log(`✓ CHECK PASSED — ${calcs.length} calculators, ${guides.length} guides, ${pages.length} static pages validated (no files written)`);
    if (warnings.length) { console.log(`  ${warnings.length} warning(s):`); warnings.forEach((e) => console.log("  – " + e)); }
    return;
  }

  /* ---- prepare dist ---- */
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  cpSync(join(SRC, "assets"), join(DIST, "assets"), { recursive: true });

  // version hash from css+js content
  const h = createHash("md5");
  for (const f of ["css/site.css", "js/app.js", "js/engine.js", "js/charts.js", "js/finance.js"])
    h.update(readFileSync(join(SRC, "assets", f)));
  const v = h.digest("hex").slice(0, 10);

  /* ---- pages ---- */
  out("index.html", T.homePage(calcs, guides, v));
  out("calculators/index.html", T.calculatorsIndex(calcs, v));
  out("guides/index.html", T.guidesIndex(guides, v));
  for (const cat of categories) out(cat.path.slice(1) + "index.html", T.categoryPage(cat, calcs, guides, v));
  for (const c of calcs) out(`${c.slug}/index.html`, T.calculatorPage(c, calcs, v));
  for (const g of guides) out(`guides/${g.slug}/index.html`, T.guidePage(g, guides, calcs, v));
  for (const p of pages) out(`${p.slug}/index.html`, T.staticPage(p, v));
  out("404.html", T.notFound(calcs, v));

  /* ---- search index ---- */
  const idx = [
    ...calcs.map((c) => ({ t: c.title, d: c.cardDescription, u: `/${c.slug}/`, c: categories.find((x) => x.id === c.category)?.short || "", a: c.aliases || [], k: c.keywords || [], p: !!c.popular })),
    ...guides.map((g) => ({ t: g.title, d: g.cardDescription, u: `/guides/${g.slug}/`, c: "Guide", a: g.aliases || [], k: g.keywords || [], p: false })),
  ];
  out("assets/search-index.json", JSON.stringify(idx));

  /* ---- sitemap / robots / headers / llms ---- */
  const urls = [
    { loc: "/", pri: "1.0", mod: today },
    { loc: "/calculators/", pri: "0.8", mod: today },
    { loc: "/guides/", pri: "0.7", mod: today },
    ...categories.map((c) => ({ loc: c.path, pri: "0.8", mod: today })),
    ...calcs.map((c) => ({ loc: `/${c.slug}/`, pri: "0.9", mod: c.lastReviewed })),
    ...guides.map((g) => ({ loc: `/guides/${g.slug}/`, pri: "0.7", mod: g.lastReviewed })),
    ...pages.map((p) => ({ loc: `/${p.slug}/`, pri: "0.4", mod: p.lastUpdated || today })),
  ];
  out("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${site.origin}${u.loc}</loc><lastmod>${u.mod}</lastmod><priority>${u.pri}</priority></url>`)
    .join("\n")}\n</urlset>\n`);
  out("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
  out("_headers", `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/assets/*\n  Cache-Control: public, max-age=604800, stale-while-revalidate=86400\n\n/assets/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
  out("llms.txt", `# ${site.name}\n\n> ${site.description}\n\nAll calculators run client-side, document their formulas and assumptions, and include worked examples.\n\n## Calculators\n\n${calcs.map((c) => `- [${c.title}](${site.origin}/${c.slug}/): ${c.cardDescription}`).join("\n")}\n\n## Guides\n\n${guides.map((g) => `- [${g.title}](${site.origin}/guides/${g.slug}/): ${g.cardDescription}`).join("\n")}\n\n## Policies\n\n- [Methodology](${site.origin}/methodology/)\n- [Editorial policy](${site.origin}/editorial-policy/)\n- [Disclaimer](${site.origin}/disclaimer/)\n`);

  // favicons at root
  if (existsSync(join(SRC, "assets/img/favicon.svg"))) cpSync(join(SRC, "assets/img/favicon.svg"), join(DIST, "favicon.svg"));
  if (existsSync(join(SRC, "assets/img/favicon.ico"))) cpSync(join(SRC, "assets/img/favicon.ico"), join(DIST, "favicon.ico"));

  const pageCount = urls.length + 1;
  console.log(`✓ Built ${pageCount} pages (${calcs.length} calculators, ${guides.length} guides, ${pages.length} static) → dist/  [v=${v}]`);
  if (warnings.length) { console.log(`\n  ${warnings.length} warning(s):`); warnings.forEach((e) => console.log("  – " + e)); if (STRICT) process.exit(1); }
}

main().catch((e) => { console.error("BUILD CRASHED:", e); process.exit(1); });
