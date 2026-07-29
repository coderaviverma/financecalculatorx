# Finance Calculator X — AdSense Reviewer Audit

Audit date: 29 July 2026  
Website: https://financecalculatorx.com/  
Audit branch: `codex/adsense-final-audit-2026-07-29`

This report separates observations from policy requirements. Google does not publish a minimum article count, minimum traffic requirement, or preferred word count for AdSense approval. The relevant standards are useful original content, a usable site, policy compliance, and a site Google can review. Google also does not prohibit content merely because AI assisted its production; the risk is scaled, unoriginal, or low-value output.

Primary guidance consulted:

- [Google Search: creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search: generative AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [AdSense: make sure your site has unique and relevant content](https://support.google.com/adsense/answer/23921?hl=en)
- [AdSense site review and connection](https://support.google.com/adsense/answer/7584263?hl=en)
- [Publisher policy: more ads or paid promotional material than publisher content](https://support.google.com/publisherpolicies/answer/11169917?hl=en)
- [AdSense ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en)
- [AdSense privacy-related policies](https://support.google.com/adsense/answer/10502938?hl=en)
- [Google-certified CMP requirement for EEA, UK and Switzerland](https://support.google.com/adsense/answer/13554020?hl=en-GB)

## 1. Executive verdict

**Approval-risk level: Moderate, mainly because this is a new finance/tool site with limited organic history—not because the current content is thin.**

**Final readiness decision: READY TO APPLY.**

Operationally, the site has already been submitted. The AdSense account shows:

- Site: `financecalculatorx.com`
- Approval status: **Getting ready**
- Site ownership: **verified**
- Review: **requested**

Do not cancel or submit a duplicate review. Deploy the narrow verified fixes in this branch and allow the existing review to continue.

Estimated first-review approval probability: **about 82%**. This is an informed readiness estimate, not a Google-published probability or guarantee. Confidence is medium because Google’s review logic is private, the domain is new, and traffic quality cannot be conclusively established from aggregate dashboards.

Top five remaining risks, none of which is a confirmed rejection blocker:

1. Four obsolete CFPB source aliases are still on production until this patch is deployed.
2. GA4 reports 93 Direct sessions and one Organic Search session in the last 28 days; the Direct concentration needs owner-side validation.
3. The domain has only a short search history: 608 impressions and one click in Search Console’s available three-month view.
4. The same AdSense account contains several other sites still “Getting ready” and one different site with a recent “Low value content” decision. Google does not state that one site’s decision automatically penalizes another, but repeatedly submitting incomplete tool sites is poor account hygiene.
5. A Google-certified CMP is not yet integrated. That is correctly blocking ad delivery in code, but it must be completed before ads are enabled for EEA, UK or Swiss visitors.

Strongest five positive signals:

1. Thirty working calculators provide calculations, charts or schedules, worked examples, methodology, limitations, related tools and four to six FAQs.
2. Twelve guides contain calculator-linked explanations, arithmetic examples, trade-offs and primary-source citations rather than generic finance summaries.
3. Ownership is transparent: one named publisher, a candid editorial-policy boundary, an author page, corrections policy, methodology and reproducible public tests.
4. Search and crawl fundamentals are strong: a successful 59-URL sitemap, 58 indexed pages, correct canonicals, valid JSON-LD, a noindexed 404, and no manual action or security issue.
5. Monetization and analytics are fail-closed: no AdSense loader is emitted, GA4 requires consent, calculator state stays in URL fragments, and the build rejects unsafe configuration.

If Google rejects the site, the most plausible category is **low-value content**, because a young calculator site with a repeated functional template can be misclassified that way. The detailed, calculator-specific explanations and tests materially reduce that risk.

## 2. What the reviewer will see

### First impression

The homepage communicates one purpose immediately: calculators for loans, mortgages, investing, savings and debt. It offers task-based entry points, popular tools, category navigation, guide links, methodology and ownership/legal links without ad clutter. The design is restrained and consistent on mobile and desktop. There are no “coming soon” tools, fake download buttons, pop-under flows, forced redirects, empty categories, affiliate blocks or advertisements.

### Deeper impression

A reviewer opening a representative calculator sees an actual interactive tool above substantial supporting material. Results update, invalid inputs produce explicit errors, tables and charts appear where useful, reset works, share links round-trip without leaking values through query strings, and CSV export is implemented. The loan calculator and the more complex debt-payoff calculator were tested interactively on a 390 × 844 mobile viewport.

The content does not depend on article count for value. Each calculator explains what it calculates, the assumptions, formula or simulation method, a worked example, factors that change the result, limitations, FAQs and related next steps. The guide set forms a coherent cluster around borrowing, compounding, inflation, emergency savings, repayment methods and comparing offers.

The trust pages are unusually candid for a one-person site. The editorial policy explicitly says there is no editorial team or independent professional reviewer. The author page does not invent finance credentials. The methodology distinguishes repeatable software checks from professional certification.

Competitor benchmark:

- [Bankrate’s loan calculator](https://www.bankrate.com/loans/loan-calculator/) benefits from a long-established brand, professional editorial operation and commercial rate ecosystem.
- [Calculator.net’s loan calculator](https://www.calculator.net/loan-calculator.html) benefits from very broad calculator coverage and domain history.
- [NerdWallet’s personal-loan calculator hub](https://www.nerdwallet.com/personal-loans/calculators) benefits from expert review, brand authority and lender-market context.

Finance Calculator X cannot honestly imitate those trust assets yet. Its defensible advantages are transparent formulas, reproducible tests, privacy-preserving share links, focused examples and the absence of lead-generation pressure. That is a credible position for a smaller publisher.

## 3. Critical issues

No unresolved content or functionality issue found in this audit rises to a realistic approval-blocking level.

Two boundaries still matter:

- **Deploy the verified patch:** production still contains four obsolete source aliases and two category heading skips.
- **Do not enable ads yet:** `certifiedCmp` is intentionally false and `adsEnabled` is false. Preserve that state until a real Google-certified CMP is integrated and tested.

The Direct-traffic concentration is a manual risk review, not proof of invalid traffic. There are currently no Finance Calculator X ad clicks because the site does not load ads.

## 4. Complete issue register

| ID | Severity | URL | Issue | Evidence | Reviewer impact | Exact fix | Status |
| -- | -------- | --- | ----- | -------- | --------------- | --------- | ------ |
| A01 | Moderate | Three guide URLs | Four CFPB links used obsolete aliases | Direct validation found replacement CFPB URLs returning 200 | Broken primary-source links weaken finance-content trust | Replace all four aliases with current canonical CFPB pages | Fixed locally; deploy pending |
| A02 | Low | `/savings-calculators/`, `/personal-finance-calculators/` | Heading sequence jumped from H1 to H3 | Static audit reported two H1→H3 skips | Accessibility/structure quality signal | Change the introductory H3 headings to H2 and build-enforce no future heading skips | Fixed locally; deploy pending |
| A03 | Moderate | Traffic/account-wide | 93 of 94 GA4 sessions in the last 28 days were Direct | Read-only GA4 inspection; Search Console recorded one organic click | Could be owner testing, unattributed visits or bots; not enough evidence to label invalid | Exclude owner traffic, inspect referrers/countries/user agents where available, and avoid purchased/exchange traffic | Needs manual review |
| A04 | Low | `/investment-calculator/` | Discovered but not currently indexed | Search Console: first detected 25 July; last crawled N/A | One useful page is absent from search, not a sitewide indexing failure | Request indexing after the patch deployment; keep it in the sitemap and internal links | Manual |
| A05 | Low | `/ads.txt` | AdSense dashboard says “Not found,” last updated 20 July | Live file returns the correct authorized line today | Stale dashboard state can delay authorization display but is not a content defect | Do not change the valid file; allow Google to recrawl it | Waiting on Google |
| A06 | High if ads are enabled | Sitewide | No certified CMP is integrated | Source sets `certifiedCmp: false`; the build blocks ad delivery | Serving ads in the covered European region without the required CMP would create policy risk | Integrate and verify a Google-certified CMP before setting both monetization flags true | Correctly guarded |
| A07 | Low | Sitewide | No field Core Web Vitals data | Search Console says insufficient usage data for mobile and desktop | Performance cannot be proven from CrUX yet | Run PageSpeed Insights after deployment and monitor Search Console when enough traffic exists | Needs manual review |
| A08 | Low | Search snippets | Some Google snippets still reflect older wording | Search results showed copy predating the current deployment | A reviewer arriving through stale snippets may see inconsistent summaries | Request recrawl of homepage and key trust pages after deployment; do not fake freshness dates | Manual |
| A09 | Low | AdSense account | Several unrelated sites are unfinished; another domain recently received “Low value content” | Read-only AdSense Sites list | Not a published cross-site penalty, but repeated incomplete submissions are avoidable account noise | Do not submit more incomplete sites; resolve each domain independently | Manual account hygiene |

## 5. AI-footprint report

### Measured patterns

- Exact repeated long sentences across the 30 calculator documents, 12 guides and nine static trust pages: **none found**.
- Repeated paragraph openings across three or more documents: **none found**.
- Missing calculator content sections: **none**.
- Banned filler such as “in today’s fast-paced world,” “look no further,” “delve into,” “game-changer” and “in conclusion”: **none**.
- One automated phrase scan matched “in today’s” on four pages. Manual inspection showed each use was the legitimate phrase **“in today’s money,”** not generic AI filler.

### Remaining template pattern

Calculator pages share the same functional order: tool, explanation, methodology, example, factors, limitations and FAQs. That consistency is appropriate for a calculator product. It becomes a scaled-content problem only if the prose and utility are interchangeable. Here the formulas, limitations, examples, controls and outputs differ by calculator, and the audit found no exact repeated long sentences.

### Human-quality signals already present

- Concrete arithmetic rather than motivational filler.
- Explicit trade-offs, such as low fees favoring short holding periods while low rates favor long ones.
- Product-specific limitations and failure cases.
- Plain-language explanations for beginners followed by the actual formula or simulation.
- Primary-source links where jurisdictional or regulatory claims matter.
- Honest uncertainty around rates, tax, insurance, lender rules and market returns.

### Corrections made

No prose was rewritten merely to “sound human.” Four stale source URLs were corrected and their three affected guides received genuine 29 July review dates. No fake anecdotes, humour, first-hand financial experiences, expert quotes or credentials were added. Inventing personal experience would reduce trust, not improve it.

## 6. Existing-content improvement plan

### Calculator and tool pages

Every tool below should be **kept and not expanded for quota purposes**. “Next review” means normal accuracy maintenance, not an approval prerequisite.

| Tool | Decision | Page-specific reason / next review |
| --- | --- | --- |
| Budget Calculator | Keep | Editable 50/30/20 split, weekly/monthly handling and emergency-fund interpretation make it more than a ratio widget |
| Compound Interest Calculator | Keep | Separates contributions from growth and explains frequency effects; retain the visual/yearly breakdown |
| Debt Payoff Calculator | Keep | Multi-row interaction and snowball/avalanche simulation are distinctive; retest dynamic row controls after major JS changes |
| Down Payment Calculator | Keep | Connects cash target, closing costs and savings runway; keep jurisdictional ranges sourced |
| Early Loan Payoff Calculator | Keep | Solves for a target-date payment rather than duplicating the standard payment tool |
| EMI Calculator | Keep | India-oriented terminology and sourced prepayment caveats give it a distinct user job |
| Extra Payment Calculator | Keep | Quantifies time and interest saved; keep the baseline-versus-extra comparison |
| Future Value Calculator | Keep | Handles lump sum plus cash-flow timing and explains sign conventions for beginners |
| House Affordability Calculator | Keep | Front/back DTI constraints and binding-limit explanation provide decision value; keep lender caveats visible |
| Investment Calculator | Keep | Adds contributions and inflation-adjusted results; request indexing after deployment |
| Loan Amortization Calculator | Keep | Dated schedule and reconciliation explain where each payment goes |
| Loan Calculator | Keep | Strong general entry tool with validated payment, totals, chart, full schedule and extra-payment option |
| Loan Comparison Calculator | Keep | Same-amount comparison, fee handling, effective APR and break-even address a distinct task |
| Loan Interest Calculator | Keep | Focuses on total interest and rate/term sensitivity without pretending payment alone measures cost |
| Loan Payment Calculator | Keep | Supports payment frequency and a deliberately narrower payment question |
| Loan Payoff Calculator | Keep | Uses current balance/payment to solve remaining time; distinct from new-loan amortization |
| Lump Sum Investment Calculator | Keep | Separates nominal growth from inflation-adjusted purchasing power |
| Monthly Investment Calculator | Keep | Inverse goal-solving makes it distinct from forward-growth calculators |
| Mortgage Amortization Calculator | Keep | Dated mortgage schedule, interest/principal crossover and extra payment are substantive |
| Mortgage Calculator | Keep | Combines principal, interest, tax, insurance, PMI and HOA while exposing each assumption |
| Mortgage Payment Calculator | Keep | Rate/term sensitivity and housing-cost context make it a useful focused variant |
| Mortgage Payoff Calculator | Keep | Existing-loan payoff and lump-sum/recurring-extra scenarios solve a separate owner task |
| Personal Loan Calculator | Keep | Fee and effective-APR treatment addresses the main personal-loan comparison trap |
| Present Value Calculator | Keep | Clear discounting use case with lump-sum and stream cross-checks |
| Refinance Calculator | Keep | Break-even and term-reset warning prevent the usual “lower payment equals savings” error |
| Rent vs Buy Calculator | Keep | Multi-year simulation includes equity, selling costs and opportunity cost; keep assumptions editable |
| ROI Calculator | Keep | Includes costs, loss cases and annualized return instead of a bare percentage |
| Savings Calculator | Keep | Models deposits, compounding and goal date; category heading structure was corrected |
| Simple Interest Calculator | Keep | Explains when simple interest differs from compounding and quantifies the difference |
| SIP Calculator | Keep | Monthly investing and optional step-up behavior are distinct from a fixed lump sum |

### Guide pages

| Guide | Decision | Page-specific action |
| --- | --- | --- |
| APR vs Interest Rate | Improve, then keep | Canonical CFPB mortgage APR source corrected; no expansion needed |
| Debt Snowball vs Debt Avalanche | Keep | Computed strategy comparison and behavior-versus-interest trade-off are specific and useful |
| How Compound Interest Works | Keep | Strong beginner explanation, frequency table, Rule of 72 limits and explanatory diagram |
| How EMI Is Calculated | Keep | Formula walk-through, example and lender-rounding caveats support the EMI tool cluster |
| How Extra Loan Payments Reduce Interest | Keep | Shows timing mechanics and when prepayment may not help |
| How Inflation Affects Your Savings | Keep | Distinguishes nominal from real value with worked examples and official inflation context |
| How Loan Amortization Works | Keep | Explains declining balance, early interest share and schedule reading |
| How Loan Interest Works | Improve, then keep | Canonical CFPB credit-card interest source corrected; no prose padding needed |
| How Much Emergency Fund Do You Need? | Keep | Uses expense tiers and access/liquidity trade-offs instead of a universal rule |
| How to Compare Loan Offers | Improve, then keep | Two obsolete CFPB aliases corrected; case study and break-even worksheet retained |
| Lump Sum vs Monthly Investing | Keep | Separates expected-value math from risk and behavior without forecasting returns |
| Rent vs Buy: What Costs Should You Compare? | Keep | Covers unrecoverable costs, horizon and opportunity cost; complements the simulator |

## 7. Pages to keep, improve, merge, noindex or remove

| Decision | Pages | Reason |
| --- | --- | --- |
| Keep | Homepage, `/calculators/`, `/guides/` | Clear discovery hubs with genuine navigation value |
| Keep | Five category pages | Each explains when to choose tools and their shared assumptions; none is empty |
| Keep | All 30 calculator pages | Each has working, distinct functionality and calculator-specific support content |
| Keep | All 12 guides | Each supports the site’s finance-calculator purpose; no doorway or off-topic article found |
| Keep | About, author, contact, editorial policy, corrections policy, methodology, privacy, disclaimer and terms | Ownership, review boundary, reproducibility, contact and legal transparency |
| Improve | Three source-linked guides and two category pages | Exact fixes are already implemented locally |
| Merge | None | No pair is interchangeable enough that merging would improve the user journey |
| Noindex | Generated 404 only | Correctly uses `noindex, follow`; it is not in the sitemap |
| Remove | None | No placeholder, “coming soon,” scraped, broken or empty page was found |

## 8. Changes implemented

| File changed | URL affected | What changed | Why | Verification |
| --- | --- | --- | --- | --- |
| `src/data/guides/apr-vs-interest-rate.mjs` | `/guides/apr-vs-interest-rate/` | Replaced obsolete CFPB APR alias; set genuine review date to 29 July | Restore primary-source trust | Replacement returns HTTP 200; strict build passes |
| `src/data/guides/how-loan-interest-works.mjs` | `/guides/how-loan-interest-works/` | Replaced obsolete credit-card-interest alias; set review date | Restore the cited explainer | Replacement returns HTTP 200; strict build passes |
| `src/data/guides/how-to-compare-loan-offers.mjs` | `/guides/how-to-compare-loan-offers/` | Replaced two obsolete CFPB aliases; set review date | Repair rate-shopping and APR sources | Both replacements return HTTP 200; strict build passes |
| `src/data/site.mjs` | `/savings-calculators/`, `/personal-finance-calculators/` | Changed two introductory H3 headings to H2 and updated only those pages’ modification dates | Remove H1→H3 structural skips | Static accessibility audit: zero findings across 60 generated HTML files |
| `build.mjs` | All generated HTML | Added a build failure for heading-level jumps | Prevent the same accessibility regression | `node build.mjs --check --strict` passes after fixes |

The Methodology page was deliberately not changed. Its claim of **50 automated calculation checks** is accurate: 50 tests cover financial math and calculator configurations, while the full 60-test run also contains 10 privacy, sharing, analytics, authorship and monetization checks. The build independently enforces the calculation-check count.

Post-change verification:

- `node build.mjs --check --strict`: pass
- `node --test tests/*.test.mjs`: 60 passed, 0 failed
- `node build.mjs --strict`: 60 HTML pages generated
- Static accessibility audit: 60 pages, 0 findings
- Local link audit: 2,816 internal link occurrences, 242 fragment links and 723 internal asset references, 0 failures
- Content-pattern audit: no exact repeated sentences, no repeated paragraph openings, no missing calculator sections

## 9. Remaining manual actions

1. Deploy this branch without enabling the AdSense loader. The repository’s deploy guard requires the owner’s explicit Cloudflare account credentials.
2. Do not cancel or duplicate the existing AdSense review. Monitor the current “Getting ready” status.
3. In GA4, mark or filter owner/developer traffic and inspect the source of the 93 Direct sessions. In Cloudflare, review countries, referrers, user agents and bot/security data if available. Do not purchase traffic or use exchanges.
4. After deployment, use Search Console URL Inspection for `/investment-calculator/` and request indexing. Request recrawl for the homepage and the three updated guides.
5. Confirm that `ads.txt` changes from “Not found” to “Authorized” after Google’s next crawl; the live file itself is already correct.
6. Send one real email to `contact@financecalculatorx.com` and verify inbox receipt/reply handling. DNS routing and SPF exist, but end-to-end delivery was not tested.
7. Run mobile and desktop PageSpeed Insights after deployment. Search Console currently has insufficient CrUX data.
8. Before enabling ads after approval, integrate a real Google-certified CMP, test consent choices in EEA/UK/Switzerland, review actual ad placement on mobile, and only then set `certifiedCmp` and `adsEnabled` to true.

## 10. Final pre-application checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Website has a clear purpose | PASS | Finance calculators and supporting education only |
| Homepage communicates value | PASS | Task, category, popular-tool and trust entry points are visible |
| Navigation works | PASS | Full crawl reached all 59 indexable URLs; mobile menu tested |
| Mobile experience works | PASS | 390 × 844 interaction tests; no horizontal overflow |
| Tools work | PASS | Representative simple and complex tools tested; all 30 configurations covered by automated tests |
| Existing articles provide substantial value | PASS | Worked examples, formulas, limitations, sources and internal next steps |
| No obvious mass-produced-content patterns | PASS | No repeated long sentences or paragraph openings; tools differ in math and function |
| No fabricated trust signals | PASS | One named owner; no fictional team, credentials or professional review |
| No unsupported claims | PASS | Jurisdictional claims hedged and sourced; stale aliases corrected |
| No broken links | PASS | Local link/fragment/asset audit has zero failures after patch |
| No placeholder pages | PASS | No “coming soon” or empty tool found |
| No empty category pages | PASS | Five categories contain navigation and decision guidance |
| No indexable internal-search pages | PASS | No internal search route exists |
| Legal pages match implementation | PASS | Ads off, analytics consent-gated, fragment sharing disclosed |
| Privacy disclosures cover actual services | PASS | GA4, Cloudflare, consent, legacy query handling and future ads disclosed |
| Contact method works | NEEDS MANUAL REVIEW | MX/SPF exist; inbox delivery not tested |
| Author information is accurate | PASS | Named owner and honest review boundary |
| Dates are genuine | PASS | Only materially reviewed pages received 29 July dates |
| Sitemap is accurate | PASS | Search Console: success, 59 discovered URLs |
| robots.txt is correct | PASS | Live file reachable; sitemap declared |
| Canonical tags are correct | PASS | All 59 live indexable pages matched expected canonicals |
| Important pages are indexable | PASS | 58 indexed; one new calculator is indexable but not yet crawled |
| Duplicate pages are controlled | PASS | Canonical redirects work; title/description dedupe build checks pass |
| Structured data is valid | PASS | JSON-LD parses on every generated indexable page |
| Core functionality works without errors | PASS | 60 tests pass; no console errors on tested pages |
| Planned ads do not interfere with content | NEEDS MANUAL REVIEW | No ads load now; actual placements must be reviewed after approval |
| Content-to-ad balance is appropriate | NOT APPLICABLE | No ads or affiliate promotions are currently served |
| Site does not contain prohibited content | PASS | Finance education/calculation content only; no prohibited content found |
| Site does not contain misleading navigation | PASS | Controls, links and CSV/share actions are clearly labeled |
| Site does not appear built primarily for advertisements | PASS | No ad loader; primary value is working tools and explanations |

## 11. Final decision

**READY TO APPLY**

The site already has an active review request, so the practical instruction is: **deploy the narrow fixes, do not withdraw the review, and do not enable ads while the review is pending.**

This decision is based on demonstrated utility, not page count. The tool suite works; the finance explanations are calculator-specific; trust boundaries are honest; navigation, indexability and structured data are sound; no prohibited or deceptive behavior was found; and monetization is fail-closed. The remaining traffic, inbox, CrUX and CMP checks are genuine manual tasks, but they do not justify adding filler articles or inventing authority.

## 12. Approval-readiness score

| Category | Score | Reason |
| --- | ---: | --- |
| Content originality and usefulness | 23/25 | Specific formulas, examples, limitations and source-backed guides; mild template optics remain inherent to a tool suite |
| Trust and transparency | 14/15 | Candid single-owner model, public tests and policies; no independent professional reviewer, honestly disclosed |
| Tool or feature value | 15/15 | Thirty working calculators with meaningful outputs and tested edge cases |
| Navigation and UX | 9/10 | Clear hubs and mobile behavior; two heading skips fixed locally |
| Technical quality | 9/10 | Strong crawl/index/schema/security baseline; insufficient field CWV data |
| Policy safety | 13/15 | Ads off and consent guarded; traffic concentration and future CMP require manual control |
| Site completeness | 10/10 | No placeholders, empty categories, missing legal pages or dead internal routes |
| **Total** | **93/100** | High readiness, with a narrow deployment and manual monitoring boundary |

## 13. Prioritised action plan

### P0 — Must fix before applying

There is no remaining P0 content blocker, and the site is already under review.

| Page or file | Exact change | Expected impact | Verification |
| --- | --- | --- | --- |
| Current branch | Deploy the five-file patch without changing monetization flags | Puts repaired sources and heading structure in front of the active reviewer | Re-run live crawl and compare deployed commit |
| `src/data/site.mjs` before any future ad launch | Keep `certifiedCmp: false` and `adsEnabled: false` until a certified CMP exists | Prevents premature ad serving and consent-policy exposure | Build must fail if ads are enabled without CMP confirmation |

### P1 — Strongly recommended before or during the current review

| Page or file | Exact change | Expected impact | Verification |
| --- | --- | --- | --- |
| GA4 / Cloudflare dashboards | Identify owner/testing traffic and investigate Direct concentration | Reduces invalid-traffic uncertainty before ads ever load | Seven-day source/country/referrer review with internal traffic excluded |
| `/investment-calculator/` | Request indexing after deployment | Closes the only discovered-not-indexed useful page | Search Console URL Inspection changes from N/A to crawled/indexed |
| `/ads.txt` | Wait for recrawl; do not alter the correct publisher line | Aligns AdSense dashboard with the live authorized file | AdSense Sites shows Authorized |
| `/contact/` | Send and reply to one real test message | Confirms the published contact channel works end to end | Message received and reply delivered |

### P2 — Can improve after approval

| Page or file | Exact change | Expected impact | Verification |
| --- | --- | --- | --- |
| Representative homepage, calculator and guide | Run PageSpeed Insights mobile and desktop | Establishes lab performance baseline while CrUX is unavailable | Save PSI results and fix only reproducible regressions |
| Search Console | Monitor query/page CTR after several weeks of impressions | Reveals title/snippet opportunities based on real searches | Compare 28-day periods; avoid broad title churn |
| Guides with complex processes | Add a diagram only when it clarifies a multi-step concept better than text | Improves comprehension without decorative stock imagery | Beginner usability test; image has alt text and dimensions |
| Approved ad layout | Add conservative placements away from inputs, results, navigation and download controls | Avoids accidental clicks and preserves content prominence | Mobile/desktop manual review plus content-to-ad check |

