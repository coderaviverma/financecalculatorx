import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { base } from "../src/templates.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = (path) => readFileSync(join(root, path), "utf8");

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
  assert.match(app, /return location\.origin \+ location\.pathname/);
  assert.match(app, /return u\.origin \+ u\.pathname/);
  assert.match(app, /page_location: cleanPageLocation\(\)/);
  assert.match(app, /page_referrer: cleanReferrer\(\)/);
  assert.match(app, /if \(analyticsConsent !== "granted"\) \{[\s\S]*?removeAnalyticsCookies\(\);[\s\S]*?if \(!analyticsConsent\) showConsent\(false\);/);
  assert.doesNotMatch(app, /calculator_search_used", \{[^}]*\bq\b/);
});

test("AdSense configuration is fail-closed", () => {
  const config = source("src/data/site.mjs");
  const build = source("build.mjs");
  assert.match(config, /publisherId: ""/);
  assert.match(config, /certifiedCmp: false/);
  assert.match(config, /adsEnabled: false/);
  assert.match(build, /adsEnabled requires a real publisherId/);
  assert.match(build, /adsEnabled requires certifiedCmp=true/);
});
