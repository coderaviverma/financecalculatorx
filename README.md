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

# deploy (Cloudflare account: coderaviverma@gmail.com / ae10d42d8c86347b750cdc91a1b828ae)
CLOUDFLARE_ACCOUNT_ID=ae10d42d8c86347b750cdc91a1b828ae CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy
```

## Content quality gates (enforced by build)

- Unique meta titles/descriptions; per-section minimum substance; no duplicated section openers between calculators
- Banned filler-phrase list (AI-slop guard)
- Every calculator: formula + worked example + factors + limitations + 3–7 genuine FAQs + 3–6 related tools
- All cited numbers must come from the tested `finance.js` library

## AdSense

The `<head>` template ([src/templates.mjs](src/templates.mjs)) contains a marked comment where the AdSense verification/loader snippet goes. After approval: add the snippet there, create `ads.txt` in `src/assets/` root copy step with your `pub-` ID, rebuild, redeploy. Privacy policy already discloses AdSense cookies; ad placements should respect the spec: never inside calculator controls or adjacent to buttons.
