# Finance Calculator X

Premium financial calculator platform — **financecalculatorx.com**. 30 fully-functional calculators (loans, mortgage, investment, savings, personal finance), 12 educational guides, full trust/policy pages. Static site, zero runtime dependencies, built for Core Web Vitals and AdSense/YMYL review quality.

## Stack

- **Zero-dependency static site generator**: `node build.mjs` → `dist/`
- Vanilla JS calculator engine (no frameworks), custom SVG charts, self-hosted fonts
- Light/dark themes, 8-currency display preference (incl. INR lakh/crore formatting)
- Deployed on Cloudflare Workers (static assets)

## Layout

```
build.mjs                 # generator + content-quality validation gates
src/templates.mjs         # all page templates (SEO meta, JSON-LD, breadcrumbs)
src/data/site.mjs         # site config, categories, homepage sections
src/data/calculators/*.mjs# one content module per calculator
src/data/guides/*.mjs     # guide articles
src/data/pages/*.mjs      # trust/policy pages
src/assets/js/finance.js  # pure financial math library (tested)
src/assets/js/engine.js   # calculator page runtime (forms, charts, tables, scenarios, share, CSV, print)
src/assets/js/calc/*.js   # per-calculator config (inputs + compute)
tests/                    # node:test suites — formulas verified against known reference values
```

## Commands

```sh
node build.mjs            # full build → dist/
node build.mjs --check    # validate content only (no writes)
node build.mjs --strict   # final build: cross-reference errors are fatal
node --test tests/*.test.mjs

# deploy after authenticating Wrangler for the intended Cloudflare account
npx wrangler deploy
```

## Content quality gates (enforced by build)

- Unique meta titles/descriptions; per-section minimum substance; no duplicated section openers between calculators
- Banned filler-phrase list (AI-slop guard)
- Every calculator: formula + worked example + factors + limitations + 3–7 genuine FAQs + 3–6 related tools
- All cited numbers must come from the tested `finance.js` library

## AdSense

Monetization is fail-closed in `src/data/site.mjs`:

- Leave `publisherId` blank, `certifiedCmp: false` and `adsEnabled: false` during AdSense review unless Google gives you a publisher ID.
- After receiving the real 16-digit `pub-...` ID, add it to `publisherId`. The build will generate the verification meta tag and `ads.txt` entry.
- Do not set `certifiedCmp: true` until a Google-certified consent management platform is actually integrated and tested for the EEA, UK and Switzerland.
- Enable ad serving only after both prerequisites are real. A build with ads enabled but no publisher ID or certified-CMP confirmation fails.
- Keep placements outside calculator inputs, result controls, navigation and copy/download buttons. Do not ask users to support the site by clicking ads.

## Privacy architecture

- Calculations and saved scenarios stay in the browser.
- Shared calculations use a `#calc=` URL fragment, which browsers do not send in HTTP requests or referrer headers. The fragment is captured once and removed before optional third-party code can load.
- Legacy query-string share links are accepted only for compatibility and scrubbed immediately; new links never use query strings.
- Google Analytics loads only after an explicit “Allow analytics” choice. Sent page locations and referrers exclude query strings and fragments; custom events exclude calculator values and raw search terms.
- The footer's **Privacy choices** control lets visitors withdraw or change that choice.
