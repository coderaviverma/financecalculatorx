import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { runInNewContext } from "node:vm";
import { base, ldOrg, notFound, SHARE_CAPTURE } from "../src/templates.mjs";
import { site } from "../src/data/site.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = (path) => readFileSync(join(root, path), "utf8");
const runShareCapture = (href) => {
  const url = new URL(href);
  const captured = {};
  let replacedWith = "";
  runInNewContext(SHARE_CAPTURE, {
    URLSearchParams,
    decodeURIComponent,
    window: captured,
    location: {
      origin: url.origin,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
    },
    history: { replaceState(_state, _title, next) { replacedWith = next; } },
  });
  return { captured, replacedWith };
};

test("calculator share links use a fragment instead of a query string", () => {
  const engine = source("src/assets/js/engine.js");
  assert.match(engine, /location\.pathname \+ "#calc="/);
  assert.doesNotMatch(engine, /location\.pathname \+ "\?"/);
  assert.match(engine, /window\.__FCX_SHARE_PARAMS/);
});

test("every page scrubs shared state before optional third-party code", () => {
  // No captureShare flag: the capture script must be unconditional in base(),
  // so a share link landing on any URL is scrubbed.
  const html = base({
    path: "/privacy-test/",
    title: "Privacy test",
    description: "Privacy regression fixture",
    content: "<p>Fixture</p>",
    noindex: true,
    v: "test",
  });
  const capture = html.indexOf("__FCX_SHARE_PARAMS");
  const app = html.indexOf("/assets/js/app.js");
  assert.ok(capture > 0 && capture < app);
  assert.doesNotMatch(source("src/templates.mjs"), /captureShare/);
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
  assert.doesNotMatch(html, /adsbygoogle\.js/);
});

test("share-state handling survives malformed input and same-document navigation", () => {
  const engine = source("src/assets/js/engine.js");
  // decodeURIComponent must never throw out of boot: guarded per-name decode
  // plus a guarded readShareParams call.
  assert.match(engine, /const safeDecode = \(s\) => \{ try \{ return decodeURIComponent\(s\); \} catch \{ return s; \} \};/);
  assert.doesNotMatch(engine, /name: decodeURIComponent\(/);
  assert.match(engine, /try \{ readShareParams\(\); \} catch \{\}/);
  // Fragment-only navigation to an already-open calculator must apply + scrub.
  assert.match(engine, /addEventListener\("hashchange"/);
});

test("query strings are scrubbed without entering analytics or shared calculator state", () => {
  const { captured, replacedWith } = runShareCapture(
    "https://financecalculatorx.com/loan-calculator/?utm_source=newsletter&utm_campaign=july&price=999999#calc=price%3D250000%26rate%3D6.5",
  );
  assert.equal(captured.__FCX_ATTRIBUTION_PARAMS, undefined);
  assert.equal(captured.__FCX_SHARE_PARAMS, "price=250000&rate=6.5");
  assert.equal(replacedWith, "/loan-calculator/");
});

test("directory deep links survive query scrubbing without entering analytics", () => {
  const { captured, replacedWith } = runShareCapture(
    "https://financecalculatorx.com/calculators/?q=mortgage&utm_source=email&utm_content=header#search",
  );
  assert.equal(captured.__FCX_DIRECTORY_SEARCH, "mortgage");
  assert.equal(captured.__FCX_ATTRIBUTION_PARAMS, undefined);
  assert.equal(captured.__FCX_SHARE_PARAMS, undefined);
  assert.equal(replacedWith, "/calculators/#search");
  assert.match(source("src/templates.mjs"), /window\.__FCX_DIRECTORY_SEARCH/);
});

test("legacy calculator queries are captured and removed before optional scripts", () => {
  const { captured, replacedWith } = runShareCapture(
    "https://financecalculatorx.com/loan-calculator/?price=250000&rate=6.5",
  );
  assert.equal(captured.__FCX_SHARE_PARAMS, "price=250000&rate=6.5");
  assert.equal(captured.__FCX_ATTRIBUTION_PARAMS, undefined);
  assert.equal(replacedWith, "/loan-calculator/");
});

test("stored consent loads analytics before calculator boot events fire", () => {
  const app = source("src/assets/js/app.js");
  // The eager call must sit at the IIFE top level (2-space indent), not only
  // inside the DOMContentLoaded-driven initConsent, or boot-time events from
  // deferred engine.js are dropped for visitors who already granted consent.
  assert.match(app, /^  if \(analyticsConsent === "granted"\) loadAnalytics\(\);/m);
});

test("analytics is consent-gated and strips sensitive URL components", () => {
  const app = source("src/assets/js/app.js");
  assert.match(app, /analyticsConsent !== "granted"/);
  assert.doesNotMatch(app, /window\.__FCX_ATTRIBUTION_PARAMS/);
  assert.doesNotMatch(app, /utm_source|gclid|fbclid/);
  assert.match(app, /return u\.origin \+ u\.pathname/);
  assert.match(app, /return location\.origin \+ location\.pathname/);
  assert.match(app, /page_location: cleanPageLocation\(\)/);
  assert.match(app, /page_referrer: cleanReferrer\(\)/);
  assert.match(app, /if \(analyticsConsent !== "granted"\) \{[\s\S]*?removeAnalyticsCookies\(\);[\s\S]*?if \(!analyticsConsent\) showConsent\(false\);/);
  assert.doesNotMatch(app, /calculator_search_used", \{[^}]*\bq\b/);
});

test("author profiles belong to the named founder in organization schema", () => {
  const organization = ldOrg();
  assert.equal(organization.founder.name, "Avinash Verma");
  assert.deepEqual(organization.founder.sameAs, [
    "https://github.com/coderaviverma",
    "https://gitlab.com/coderaviverma",
    "https://www.linkedin.com/in/avinashverma89/",
  ]);
  assert.equal(organization.sameAs, undefined);
});

test("AdSense configuration is fail-closed", () => {
  const config = source("src/data/site.mjs");
  const build = source("build.mjs");
  // publisherId may be blank (pre-signup) or a real pub- ID (verification),
  // but ad serving stays off until a certified CMP is actually integrated.
  assert.match(config, /publisherId: "(?:pub-\d{16})?"/);
  assert.match(config, /certifiedCmp: false/);
  assert.match(config, /adsEnabled: false/);
  assert.match(build, /adsEnabled requires a real publisherId/);
  assert.match(build, /adsEnabled requires certifiedCmp=true/);
});

test("AdSense can never load on the generated 404 page", () => {
  const prior = { ...site.adsense };
  try {
    site.adsense.adsEnabled = true;
    site.adsense.certifiedCmp = true;
    const content = base({
      path: "/content-test/",
      title: "Content test",
      description: "Content test fixture",
      content: "<p>Useful content</p>",
      adsAllowed: true,
      v: "test",
    });
    assert.match(content, /adsbygoogle\.js/);
    const missing = notFound([], "test");
    assert.doesNotMatch(missing, /adsbygoogle\.js/);
    assert.doesNotMatch(missing, /rel="canonical"/);
  } finally {
    Object.assign(site.adsense, prior);
  }
});

test("shared option values and result actions fail closed", () => {
  const engine = source("src/assets/js/engine.js");
  const templates = source("src/templates.mjs");
  const css = source("src/assets/css/site.css");
  assert.match(engine, /return \(fallback \|\| def\.options\[0\]\)\.v/);
  assert.doesNotMatch(engine, /return opt \? opt\.v : v/);
  assert.match(engine, /const v = coerceOption\(def, values\[def\.id\]\)/);
  assert.match(engine, /metric\.append\(label, value\)/);
  assert.doesNotMatch(engine, /ph\.innerHTML/);
  assert.match(engine, /values\.debts\.slice\(0, MAX_DEBTS\)\.map\(normalizeDebt\)/);
  assert.match(engine, /F\.esc\(d\.balance\)/);
  assert.match(engine, /F\.esc\(val == null \? "—" : val\)/);
  assert.match(engine, /values\[def\.id\] = parseSharedNumber\(p\.get\(def\.id\)\)/);
  assert.doesNotMatch(engine, /values\[def\.id\] = parseFloat/);
  assert.match(engine, /state\.result = \{ invalid: "Updating results…" \}/);
  assert.match(engine, /button\.disabled = !valid/);
  assert.match(engine, /if \(!state\.result \|\| state\.result\.invalid\) \{ FCX\.toast\("Enter valid inputs first"\); return; \}/);
  assert.match(templates, /bodyClass: "calc-booting"/);
  assert.match(css, /body\.calc-booting \.calc-layout/);
  assert.match(css, /animation: calc-boot-fallback 0s 3s forwards/);
  assert.match(engine, /document\.body\.classList\.remove\("calc-booting"\)/);
});

test("calculator share links preserve exact term units and delimiter-safe debt names", () => {
  const engine = source("src/assets/js/engine.js");
  assert.match(engine, /p\.set\("debts", JSON\.stringify\(state\.debts\)\)/);
  assert.match(engine, /JSON\.parse\(rawDebts\)/);
  assert.match(engine, /p\.set\(def\.id \+ "Unit", state\.termUnits\[def\.id\]\)/);
  assert.match(engine, /coerceTermUnit\(p\.get\(def\.id \+ "Unit"\)/);
});

test("numeric parsing rejects arbitrary text and understands the active locale", () => {
  const engine = source("src/assets/js/engine.js");
  const app = source("src/assets/js/app.js");
  assert.match(engine, /FCX\.fmt\.parse\(str\)/);
  assert.doesNotMatch(engine, /replace\(\/\[\^\\d\.\\-\]\//);
  assert.match(app, /formatToParts\(12345\.6\)/);
  assert.match(app, /!\/\^\[\+\-\]\?\[\\d\.,\]\+\$\//);
});

test("geo responses canonicalize first and receive the full security-header set", async () => {
  const workerSource = source("src/worker.js");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(workerSource).toString("base64")}`;
  const worker = (await import(moduleUrl)).default;
  const redirected = await worker.fetch({ url: "https://www.financecalculatorx.com/geo?x=1", cf: { country: "IN" } }, {});
  assert.equal(redirected.status, 301);
  assert.equal(redirected.headers.get("location"), "https://financecalculatorx.com/geo?x=1");

  const geo = await worker.fetch({ url: "https://financecalculatorx.com/geo", cf: { country: "IN" } }, {});
  assert.equal(geo.status, 200);
  assert.deepEqual(await geo.json(), { country: "IN" });
  assert.equal(geo.headers.get("cache-control"), "no-store");
  assert.equal(geo.headers.get("x-robots-tag"), "noindex");
  assert.equal(geo.headers.get("x-content-type-options"), "nosniff");
  assert.match(geo.headers.get("strict-transport-security"), /max-age=/);

  const asset = await worker.fetch(
    { url: "https://financecalculatorx.com/test" },
    { ASSETS: { fetch: async () => new Response("ok", { headers: { "x-existing": "yes" } }) } },
  );
  assert.equal(await asset.text(), "ok");
  assert.equal(asset.headers.get("x-existing"), "yes");
  assert.equal(asset.headers.get("x-frame-options"), "SAMEORIGIN");
});

test("the asset version covers calculator scripts and fonts are revalidated", () => {
  const build = source("build.mjs");
  assert.match(build, /filesUnder\(assetRoot\)/);
  assert.match(build, /\/\\\.\(\?:css\|js\)\$\//);
  assert.doesNotMatch(build, /assets\/fonts\/\*[^`]*immutable/s);
});

test("future AdSense disclosures contain Google's required concepts", () => {
  const privacy = source("src/data/pages/privacy-policy.mjs");
  assert.match(privacy, /third-party vendors, including Google, may use cookies/i);
  assert.match(privacy, /previous visits to this site or other sites/i);
  assert.match(privacy, /advertising cookies enable Google and its partners/i);
  assert.match(privacy, /web beacons, IP addresses or other identifiers/i);
  assert.match(privacy, /https:\/\/adssettings\.google\.com/);
  assert.match(privacy, /https:\/\/policies\.google\.com\/technologies\/partner-sites/);
});
