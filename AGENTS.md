# AGENTS.md — Finance Calculator X

Instructions for AI agents (and new contributors) working in this repository.
This is a **zero-dependency static site generator** for financecalculatorx.com:
30 financial calculators + 12 guides + trust pages, deployed as Cloudflare
Workers static assets. It is a **YMYL (finance) site prepared for AdSense
review** — content accuracy and privacy invariants are enforced by the build
and the test suite, and several rules below exist because violating them has
real monetization or compliance consequences.

## Commands

```sh
node build.mjs             # build → dist/ (60 pages), runs all quality gates
node build.mjs --check     # validate content only, writes nothing (safe for concurrent agents)
node build.mjs --strict    # final build: cross-reference errors are fatal
node --test tests/*.test.mjs   # 60 tests; must be 100% green before any release
sh scripts/deploy.sh       # THE ONLY way to deploy (see Deployment)
python3 -m http.server 4173 -d dist   # local preview
```

There is no package.json, no npm install, no framework. Node built-ins only.
Never add a runtime dependency; the zero-dependency property is load-bearing
(it is cited on the public methodology page as part of the trust story).

## Architecture

```
build.mjs                 SSG + all content-quality gates (the quality defense)
src/templates.mjs         all HTML templates, inline SVG icons, JSON-LD builders
src/data/site.mjs         site config, categories, nav, AdSense/GA4 gates
src/data/calculators/     one .mjs per calculator — CONTENT ONLY (copy, FAQ, meta)
src/assets/js/calc/       one .js per calculator — LOGIC ONLY (FCX.define({slug, inputs, compute}))
src/assets/js/finance.js  shared math library (window.FIN) — the only place formulas live
src/assets/js/engine.js   renders every calculator UI from its definition; share/CSV/print/scenarios
src/assets/js/app.js      site chrome: consent, prefs, currency/geo, search, FCX.track
src/assets/js/charts.js   donut/line/area/bar charts (niceTicks must COVER the data range)
src/data/guides/          guide content modules
src/data/pages/           static trust pages (about, methodology, policies, author)
tests/                    node:test suite; harness.mjs evals browser JS into Node
```

**Every calculator = exactly two files** (content .mjs + logic .js, same slug).
Math goes in finance.js if shared, in the calc .js `compute` if unique. Content
worked examples MUST match what the code computes — tests pin reference values.

## Build gates (build.mjs enforces; do not fight them)

- Banned AI-filler phrases (list at top of build.mjs), min section lengths,
  3–7 FAQs per calculator, unique first-90-chars section openers across ALL
  calculators, metaTitle ≤70 chars rendered, metaDescription ≤175, site-wide
  title/description dedupe, JSON-LD must parse, 404 page must be noindex.
- `googletagmanager` or `adsbygoogle.js` appearing in built HTML while consent
  /ads gates are off is a **build error** — this is the fail-closed design.
- The methodology page's published test/calculator counts are verified against
  tests/ and src/data/calculators/ — adding a calculation test or calculator
  requires updating /methodology/ copy, or the build fails.
- De-uniforming budgets (informal but audited): em dashes ≤ ~8 per 1000 words
  per file; "actually"/"honest"/"genuinely"/"arithmetic" ≤1 per file; "quietly"
  never. These exist to avoid scaled-content signatures.

## Content rules (YMYL — the most important section)

1. **No unsourced factual claims** about lenders, markets, regulation, taxes,
   typical rates or returns. Either cite a **primary source** (CFPB, RBI, SEC/
   Investor.gov, FDIC, DICGC, Freddie Mac, US Census — never blogs/aggregators)
   or write neutral model-bounded language ("this calculator models X; actual
   products vary by lender and jurisdiction").
2. **Verify every cited URL is live (HTTP 200) before citing it.** A dead
   citation is worse than none. Several plausible URLs (HUD, Fannie Mae, BLS)
   403 automated fetches — substitute or soften rather than cite unverified.
3. **Jurisdiction-scope everything**: any statement about lender practice or
   regulation names its country/system. The site supports 8 display currencies;
   currency formatting is display-only and implies nothing about local rules.
4. **No advice-directives or absolutes.** Guides end with what the model shows,
   never with what the reader should do. No "the right loan", "always wins",
   "the single biggest lever". The calculator quantifies; it does not predict
   behavior or recommend products.
5. **No invented experts, reviewers, or credentials — ever.** The editorial
   policy publicly commits to this. There is one named human author; changes to
   authorship claims must stay literally true.
6. Every calculator documents formula, assumptions, limitations, and a worked
   example whose numbers come from the same math the calculator runs.

## Privacy invariants (pinned by tests/privacy-controls.test.mjs)

- **GA4 loads only after explicit consent.** For stored-consent visitors it
  must load eagerly at app.js parse time (deferred scripts run in order;
  engine.js fires boot events before DOMContentLoaded — moving the load later
  silently drops `calculator_view`).
- **Share links use `#calc=` fragments**, never query strings. The inline
  SHARE_CAPTURE head script (emitted on EVERY page, unconditionally) captures
  and scrubs shared state before any third-party code could observe it. A
  hashchange listener in engine.js handles same-document share navigation.
- Page locations/referrers sent to analytics are stripped of query strings and
  fragments. Custom events must never contain calculator input values or raw
  search terms.
- CSV export guards spreadsheet formula injection (user text starting with
  `= + - @` or tab gets an apostrophe prefix). Keep this when touching export.
- **Monetization is fail-closed** in site.mjs: `adsEnabled` requires a
  regex-valid `publisherId` AND `certifiedCmp: true`, enforced by build errors.
  Do not flip `certifiedCmp` until a Google-certified CMP is actually
  integrated and tested for EEA/UK/CH. The `google-adsense-account` meta and
  ads.txt emit from `publisherId` alone (verification without serving ads).
- The privacy policy's technical claims are treated as a contract: if you
  change behavior, change the policy in the same commit, and vice versa.

## Deployment

- **Only via `sh scripts/deploy.sh`.** It refuses to run unless
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are exported, then runs
  the strict build + full test suite before uploading. This guard exists
  because wrangler silently falls back to any globally stored OAuth login —
  which on this machine belongs to a DIFFERENT Cloudflare account, and has
  twice created a stray duplicate worker there. Never run `wrangler login`;
  never deploy with bare `npx wrangler deploy`.
- Custom domain + www + workers.dev canonicalization and HSTS live in
  src/worker.js (also serves `/geo` for currency auto-detection).
- **Push to BOTH remotes** after committing: `origin` (GitLab, private) and
  `github` (public mirror). The public repo is cited on the methodology and
  author pages as verification evidence — never commit secrets; full history
  is public. Reproduce tests with `node --test tests/*.test.mjs` (no setup).

## Verification standard

- After any deploy, verify on production with cache-busted curl requests for a
  content marker of the change; edge propagation can lag ~20–60s.
- **External audit reports arrive days-stale** (they read crawler caches;
  their citations often carry `utm_source` params). Before implementing any
  audit finding: fetch production with a unique cache-buster, grep for the
  exact quoted passage case-insensitively, and fix only what reproduces.
- After editing anything previewable, verify behavior in a real browser (DOM
  assertions beat screenshots), including the consent flows if touched.

## Standing decisions (do not re-litigate without new data)

- Overlapping calculators (e.g. Mortgage Payment vs Mortgage) stay separate
  pages with explicit "use this instead of X when…" differentiation; merges
  wait for real Search Console query data.
- The consistent calculator page template is intentional UX, offset by
  page-specific scenario hints, differentiation notes, and varied prose.
- AdSense application is submitted and pending; while under review avoid URL,
  navigation, or template churn. On approval: certified CMP + flip the two
  site.mjs gates + ad placements away from calculator controls, one release.
