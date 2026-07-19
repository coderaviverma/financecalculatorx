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

test("calculator pages scrub shared state before optional third-party code", () => {
  const html = base({
    path: "/privacy-test/",
    title: "Privacy test",
    description: "Privacy regression fixture",
    content: "<p>Fixture</p>",
    captureShare: true,
    noindex: true,
    v: "test",
  });
  const capture = html.indexOf("__FCX_SHARE_PARAMS");
  const app = html.indexOf("/assets/js/app.js");
  assert.ok(capture > 0 && capture < app);
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
  assert.doesNotMatch(html, /adsbygoogle\.js/);
});

test("analytics is consent-gated and strips sensitive URL components", () => {
  const app = source("src/assets/js/app.js");
  assert.match(app, /analyticsConsent !== "granted"/);
  assert.match(app, /return location\.origin \+ location\.pathname/);
  assert.match(app, /return u\.origin \+ u\.pathname/);
  assert.match(app, /page_location: cleanPageLocation\(\)/);
  assert.match(app, /page_referrer: cleanReferrer\(\)/);
  assert.match(app, /else \{[\s\S]*removeAnalyticsCookies\(\);[\s\S]*if \(!analyticsConsent\) showConsent\(false\);/);
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
