# FinanceCalculatorX AdSense readiness audit — 11 November 2026

## Verdict

The public site has a strong technical and editorial foundation: 59 indexable
URLs are live, canonical and present in the sitemap; all 30 calculators work in
the automated reference suite; trust, methodology, authorship and policy pages
are present; and the AdSense verification meta tag plus `ads.txt` are publicly
reachable. No verified publisher-policy violation, broken calculator, thin
calculator page, copied-content page or indexing-control defect was found.

This is **not an AdSense approval claim**. The current AdSense decision, Policy
Center, payments/identity checks, invalid-traffic state, Search Console indexing
and real-user Core Web Vitals are account-only and were not accessed. The last
historical account evidence in the repository is an owner-supplied “Low value
content” rejection dated 24 September 2026; it does not establish today’s state.

Three reproducible front-end defects were found and repaired locally. They are
not deployed because the repository is under a controlled release freeze.

## Official gates used

| Gate | Current verified state | Result |
| --- | --- | --- |
| Eligibility and ownership | Public HTML contains the correct `google-adsense-account` meta tag; root `ads.txt` contains the matching publisher ID. Google accepts ad code, `ads.txt` or the meta tag for ownership verification. | Pass on public evidence; dashboard state unverified |
| Publisher content policies | No prohibited-content or replicated-content pattern found. Ads are not served on any page. | Pass on sampled and generated content |
| Inventory value | Every calculator page includes a working tool, formula, assumptions, limitations, worked example, FAQs and related paths. | Pass |
| Original, people-first YMYL content | Named author, honest credential boundary, methodology, corrections policy, source links and reproducible calculations are visible. | Pass, with no claim of professional review |
| Navigation and site completeness | Header, footer, calculator and guide hubs reach all site families; 404 is useful and noindexed. | Pass |
| Crawl/index controls | 59 sitemap URLs returned 200 with exact self-canonicals, one H1 and valid JSON-LD; `robots.txt` allows crawling and declares the sitemap. | Pass; Google-selected canonicals/indexing unverified |
| Privacy and consent | GA4 is consent-gated. Ad serving is fail-closed. Privacy policy describes browser storage, sharing, Cloudflare, analytics and future advertising. | Pass for current behavior |
| EEA/UK/Switzerland ad consent | No Google-certified CMP is integrated; `certifiedCmp` and `adsEnabled` remain false. | Correctly blocked; required before serving covered traffic |
| Ad placement | No AdSense loader or ad unit is emitted, including on the 404 page. | Not yet testable; review after an approved CMP and ad configuration exist |

Primary references:

- [AdSense eligibility requirements](https://support.google.com/adsense/answer/9724/eligibility-requirements-for-adsense)
- [Make sure pages are ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938)
- [AdSense site management and ownership verification](https://support.google.com/adsense/answer/12131223)
- [Connect a site to AdSense](https://support.google.com/adsense/answer/7584263)
- [Certified CMP requirement](https://support.google.com/adsense/answer/13554116)
- [People-first content and YMYL trust](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

## Severity-ranked verified defects

### Moderate — scenario comparison overflow on narrow phones

Affected pages: the 29 scenario-enabled calculator pages listed below. The Loan
Comparison Calculator deliberately has no A/B scenario card and was not affected.

Reproduction on the deployed Loan Calculator:

1. Open `/loan-calculator/` at 390 × 844.
2. Save the defaults as Scenario A.
3. Change the amount and save Scenario B.
4. Inspect the document width: the 390 px viewport becomes 412 px wide.
5. The results and scenario card extend 22 px beyond the viewport; the comparison
   and schedule tables should scroll inside their own containers instead.

Fix:

- Permit grid result children to shrink with `min-width: 0`.
- Constrain the scenario card to the results column.
- Put the scenario comparison table in an internal horizontal scroll region.

Acceptance criteria:

- At 390 px with both scenarios saved, document `scrollWidth` equals 390 px.
- Scenario comparison remains readable through its internal scroll region.
- The 520 px amortization table remains internally scrollable.
- No console error is emitted.

Verified locally after the fix: document overflow `0`; scenario card width
350 px; comparison viewport 306 px with a 382 px internal table; schedule table
viewport 304 px with a 520 px internal table.

### Moderate — saved scenarios retained the previous currency symbol

Affected pages: the same 29 scenario-enabled calculators.

Reproduction:

1. Save Scenario A and B while the display currency is USD.
2. Change the display currency to INR.
3. Before the fix, the current result and comparison cells changed to `₹`, but
   the saved scenario summaries continued to show `$`.

Fix: recompute each saved scenario’s display summary and comparison metrics from
its stored raw inputs whenever scenarios render. Currency remains formatting
only; no exchange-rate conversion is introduced.

Acceptance criteria:

- Both saved summaries, all comparison cells and the current result use the
  selected display currency.
- Saved raw values and term units do not change.
- Switching currency never sends calculator inputs to a server.

Verified locally: both summaries changed from `$20,000` / `$25,000` to
`₹20,000` / `₹25,000`, and all comparison values used `₹` with no console error.

### Low — two Lighthouse accessibility failures

Affected pages: the currency selector appears sitewide; the low-contrast rate
suffix appears on calculator pages that use the `% / yr` affix.

Reproduction:

1. Run mobile Lighthouse on the deployed `/loan-calculator/`.
2. Observe 97 Accessibility.
3. The `% / yr` suffix measures 4.42:1 against its background, below the 4.5:1
   WCAG AA target for normal text.
4. The visible currency text `INR` is absent from the control’s accessible name
   `Choose currency`, triggering label-in-name failure.

Fix:

- Use the stronger secondary text token for field affixes.
- Keep the current currency code in the button’s accessible name, for example
  `INR — choose currency`, and update it when the currency changes.

Acceptance criteria:

- Lighthouse reports neither `color-contrast` nor
  `label-content-name-mismatch` on the calculator page.
- The visible currency code is contained in the accessible name at page load and
  after a currency change.

Verified locally: Lighthouse Accessibility increased from 97 to 100 and both
named failures disappeared.

## Page-by-page inventory

### Home, hubs and categories

| URL | Severity | Finding |
| --- | --- | --- |
| `/` | None | Clear purpose, discovery paths, trust summary, canonical and Organization/WebSite data |
| `/calculators/` | None | Complete calculator directory; not an empty navigation screen |
| `/guides/` | None | Twelve coherent finance guides with specific descriptions |
| `/loan-calculators/` | None | Specific tool-selection guidance and fixed-rate model boundary |
| `/mortgage-calculators/` | None | Explains included costs, product scope and owner/use cases |
| `/investment-calculators/` | None | Separates projection questions and states returns are not forecasts |
| `/savings-calculators/` | None | Distinguishes forward, inverse-goal and simple-interest tools |
| `/personal-finance-calculators/` | None | Distinguishes budgeting, multi-debt and single-loan workflows |

### Calculator pages

All rows passed the 430-case boundary audit, have unique titles and descriptions,
valid JSON-LD, a byline, formula, assumptions, worked example and FAQs. `M` marks
the two moderate scenario defects fixed locally; `L` marks the shared
accessibility fixes.

| URL | Severity before local fix | Page-specific value |
| --- | --- | --- |
| `/budget-calculator/` | M/L | Editable allocation model and weekly/monthly handling |
| `/compound-interest-calculator/` | M/L | Deposits versus growth with frequency effects |
| `/debt-payoff-calculator/` | M/L | Multi-row snowball/avalanche simulation |
| `/down-payment-calculator/` | M/L | Cash target, closing costs and savings runway |
| `/early-loan-payoff-calculator/` | M/L | Solves required payment for a target payoff date |
| `/emi-calculator/` | M/L | Reducing-balance EMI and prepayment scenario |
| `/extra-payment-calculator/` | M/L | Baseline versus extra-payment payoff comparison |
| `/future-value-calculator/` | M/L | Lump sum plus timed cash-flow projection |
| `/house-affordability-calculator/` | M/L | Front/back DTI constraints and binding limit |
| `/investment-calculator/` | M/L | Nominal and inflation-adjusted results |
| `/loan-amortization-calculator/` | M/L | Dated schedule with reconciliation |
| `/loan-calculator/` | M/L | Payment, totals, chart, schedule and extra payment |
| `/loan-comparison-calculator/` | L only | Fees, effective APR and early-exit comparison; scenarios intentionally disabled |
| `/loan-interest-calculator/` | M/L | Total-interest and rate/term sensitivity |
| `/loan-payment-calculator/` | M/L | Focused payment-frequency question |
| `/loan-payoff-calculator/` | M/L | Remaining-time solver for an existing balance |
| `/lump-sum-investment-calculator/` | M/L | Nominal and real lump-sum growth |
| `/monthly-investment-calculator/` | M/L | Inverse contribution-for-goal solver |
| `/mortgage-amortization-calculator/` | M/L | Dated schedule, crossover and extra payment |
| `/mortgage-calculator/` | M/L | Principal, interest, tax, insurance, PMI and HOA inputs |
| `/mortgage-payment-calculator/` | M/L | Payment plus rate/term sensitivity |
| `/mortgage-payoff-calculator/` | M/L | Lump-sum and recurring-extra payoff scenarios |
| `/personal-loan-calculator/` | M/L | Origination fee and effective APR treatment |
| `/present-value-calculator/` | M/L | Lump-sum and stream discounting |
| `/refinance-calculator/` | M/L | Break-even and term-reset warning |
| `/rent-vs-buy-calculator/` | M/L | Multi-year cash-flow and opportunity-cost simulation |
| `/roi-calculator/` | M/L | Costs, loss cases and annualized return |
| `/savings-calculator/` | M/L | Deposits, compounding and goal month |
| `/simple-interest-calculator/` | M/L | Simple versus reinvested interest comparison |
| `/sip-calculator/` | M/L | Monthly contribution with optional annual step-up |

### Guides

All guide URLs returned 200, have Article data with a named author and dates, and
their 48 unique external links returned 200 except LinkedIn’s automated 429.
The LinkedIn result is a rate-limit response, not evidence that the profile is
broken.

| URL | Severity | Finding |
| --- | --- | --- |
| `/guides/apr-vs-interest-rate/` | None | Distinguishes rate from total annual cost with a worked comparison |
| `/guides/debt-snowball-vs-debt-avalanche/` | None | Interest versus behavioral trade-off without an absolute directive |
| `/guides/how-compound-interest-works/` | None | Formula, frequency and Rule-of-72 limitations |
| `/guides/how-emi-is-calculated/` | None | Formula walkthrough and rounding caveats |
| `/guides/how-extra-payments-reduce-interest/` | None | Timing mechanics and limitations |
| `/guides/how-inflation-affects-savings/` | None | Nominal versus real value |
| `/guides/how-loan-amortization-works/` | None | Declining balance and schedule interpretation |
| `/guides/how-loan-interest-works/` | None | Reducing-balance mechanics and product differences |
| `/guides/how-much-emergency-fund/` | None | Scenario sizing rather than a universal prescription |
| `/guides/how-to-compare-loan-offers/` | None | Amount, APR, term and fee comparison process |
| `/guides/lump-sum-vs-monthly-investing/` | None | Expected-value, timing and risk boundaries |
| `/guides/rent-vs-buy-what-to-compare/` | None | Horizon, transaction costs and opportunity cost |

### Trust and legal pages

| URL | Severity | Finding |
| --- | --- | --- |
| `/about/` | None | Names the operator, independence and browser-only calculation model |
| `/authors/avinash-verma/` | None | Real author; explicitly disclaims credentials not held |
| `/methodology/` | None | 52 calculation checks, formula conventions, source and review boundary |
| `/editorial-policy/` | None | Authorship, sourcing, corrections and monetization independence |
| `/corrections-policy/` | None | Public correction path and dated material corrections |
| `/contact/` | None | Purpose-appropriate contact page; end-to-end inbox delivery unverified |
| `/privacy-policy/` | None | Matches current analytics, localStorage, sharing, hosting and ads-off behavior |
| `/disclaimer/` | None | Clear estimate and provider-document boundary |
| `/terms-of-use/` | None | Operator jurisdiction, use limits and third-party boundary |
| `/404.html` | None | Noindex, no canonical, no AdSense loader, useful exits |

## Functional and technical verification

- Strict production build: 60 pages generated.
- Isolated production release suite: 70 passed, 0 failed. The two additional
  staging-only tests in the preserved primary checkout are outside this release.
- Calculator boundary audit: 30 calculators, 430 cases, 0 failures; 27 invalid
  boundary cases were correctly rejected.
- Live sitemap crawl: 59 URLs, all HTTP 200, exact self-canonical, one H1, valid
  JSON-LD, and no AdSense loader.
- Live endpoint checks: canonical HTTPS and apex redirects work; `robots.txt`,
  `sitemap.xml`, `ads.txt`, trust pages and a real 404 respond as intended.
- Live calculator interaction: default calculation renders; zero-rate handling,
  invalid text feedback and mobile table scrolling work without console errors.
- Production mobile Lighthouse on `/loan-calculator/`: Performance 96,
  Accessibility 97, Best Practices 100, SEO 100; FCP 1.5 s, LCP 1.5 s,
  TBT 10 ms, CLS 0. These are one lab run, not real-user field data.
- Local post-fix Lighthouse: Performance 100, Accessibility 100, SEO 100;
  FCP/LCP/Speed Index 1.4 s, TBT 10 ms, CLS 0. Local scores are acceptance
  evidence only and must not be presented as production results.

The production Lighthouse opportunities were small: about 5 KiB of possible
JavaScript minification with zero estimated FCP/LCP saving, a 210 ms stylesheet
render-blocking estimate, and cache suggestions dominated by Cloudflare’s
injected beacon plus seven-day first-party asset caching. With LCP at 1.5 s and
CLS 0, these are not release-priority defects.

## Competitor-practice benchmark

- Large commercial publishers such as NerdWallet expose named writers/editors,
  formal product-rating methods and commercial relationships. Those assets
  cannot be imitated honestly by a one-person calculator site.
- Government calculator pages such as Moneysmart make assumptions, model scope,
  non-guarantee language and professional-advice boundaries prominent.
- Broad calculator sites such as Calculator.net compete on domain history and
  breadth. FinanceCalculatorX’s defensible practice is narrower: transparent
  formulas, reproducible tests, editable assumptions, privacy-preserving local
  calculations and no lead-generation pressure.

The correct response is to preserve and deepen real evidence, not invent a
review board, add generic articles, copy competitor disclosures or create
near-duplicate keyword pages.

## Unverified account-only items

| Item | Why it is unverified | Required owner check |
| --- | --- | --- |
| Current AdSense site status | No AdSense account access was used | Read Sites card and exact rejection/review message |
| Policy Center issues | Account-only | Export or record the current issue text and affected URLs |
| Identity, address and payment readiness | Account-only | Complete only in AdSense; do not share credentials |
| `ads.txt` dashboard state | Public file is correct, crawler dashboard can lag | Check last-crawled time and Authorized/Not found state |
| Search Console indexing | Public crawlability does not prove indexing | Inspect sitemap, Page Indexing and representative URL Inspection results |
| Google-selected canonicals | Self-canonicals are hints | Check representative URL Inspection results |
| Field Core Web Vitals/INP | Lighthouse is lab data | Check CrUX/Search Console when enough traffic exists |
| Invalid-traffic signals | Cannot be inferred from public pages | Review AdSense/GA4/Cloudflare account data without labeling Direct traffic as invalid |
| Contact delivery | A mailto link and DNS do not prove inbox delivery | Send and receive one real test email |

## Prioritized implementation and release plan

1. Keep the four local front-end changes together. Do not mix them with the
   pre-existing staging/recovery work when staging or committing.
2. Re-run the strict build, all tests, the 430-case boundary audit, local mobile
   scenario steps and Lighthouse. All currently pass.
3. Prepare a release packet identifying the production asset version before
   change (`371d15788b`) and local candidate (`122fbbd515`), exact affected URLs,
   rollback commit and cache-busted production checks.
4. Obtain action-specific owner approval because the controlled freeze prohibits
   deployment without it.
5. Deploy only through `sh scripts/deploy.sh` with the intended Cloudflare
   account credentials. Do not use a global Wrangler login.
6. Verify production at 390 px with two scenarios, USD-to-INR switching, the two
   Lighthouse accessibility audits, all 59 sitemap URLs and the new asset hash.
7. Inspect the current AdSense account message before deciding whether to request
   another review. Do not cancel or duplicate a pending review.
8. Do not set `certifiedCmp` or `adsEnabled` until a real Google-certified CMP is
   configured and tested for EEA/UK/Switzerland traffic. Review real placements
   on phone and desktop before serving ads.

## Changed files in this audit

| File | Change |
| --- | --- |
| `src/assets/css/site.css` | Contain scenario/table overflow; improve field-affix contrast |
| `src/assets/js/engine.js` | Recompute saved scenario display data from raw inputs |
| `src/assets/js/app.js` | Keep current currency code in the control’s accessible name |
| `src/templates.mjs` | Give the initial currency control a label containing `USD` |
| `docs/adsense-readiness-2026-11-11/README.md` | This audit, evidence, defects and release plan |

At audit completion, no deployment, commit, push, AdSense submission, Search
Console action or ad activation had been performed. The owner subsequently
authorized publishing this exact `122fbbd515` candidate; release evidence is
recorded separately after the guarded deployment completes.
