# AdSense readiness repair audit — 24 September 2026

## Release state

Deployed on 24 September 2026 at 05:19 UTC from `codex/adsense-readiness-20260924`, based on remote main `3434a18`, using the required guarded deployment script. Worker version: `a69fc2b5-963f-44f4-89e4-10e6a33e17c6`, serving 100% of traffic. Prior version retained by Cloudflare: `5154671c-ff76-43a0-80a7-1785a5460a50`. Build asset version: `371d15788b`. This report is engineering evidence, not AdSense approval or an independent financial certification.

The owner supplied a current AdSense rejection for **Low value content** and requested detailed repairs, deployment, and subsequent commit/merge/push to main. Existing staging work in the primary checkout was preserved outside this candidate. This release retains all 30 calculator URLs, 12 guides and existing trust pages. The remote main guide improvements are included.

## Reproduced defects and repairs

| Finding | Repair and evidence |
| --- | --- |
| Loan-offer fee recovery mixed payment savings and borrowing costs in the deployed version; summing rounded interest could also shift a crossover. | Interest-plus-fee comparison carries full precision. Default crossover is month 24; a $517.54 fee regression crosses at month 25. New selected-month settlement table includes payments already made, remaining principal and upfront fees. |
| Refinance content implied financed fees were modeled; payment-only recovery was presented too broadly. | Explicit cash-fee model, payment-only recovery label, no recovery reported beyond both active schedules, and same-date exit cost including remaining balances. Default month-60 saving is $7,969.71; financed-fee examples explain their exclusion. |
| Investment real annual return used an effective-rate formula on a nominal monthly-compounded assumption. | Effective annual growth is derived first, then deflated. Default display corrected from 4.85% to 5.15%; projected balances retain monthly compounding. |
| Optional numeric fields accepted nonempty invalid text as zero. | Blank optional fields may use defaults; invalid text displays an error. Stale results and share/export actions are disabled. Browser checked across all 30 calculators. |
| Tiny positive rates produced infinite payments or required contributions through cancellation. | Stable log1p/expm1 formulas in the shared library and doubling-time calculation. Continuity checks compare with zero-rate limits. |
| Debt repaid exactly in month 1,200 was rejected as exceeding the simulation cap. | Reject only if a balance remains. Tests distinguish payoff at 1,200 months from 1,201 months. |
| Extra-payment example claimed about $49 interest avoided per $100 extra principal. | Recomputed ratio is $58,859.88 / $30,300 × 100 = $194.26 over the loan term; explicitly not an annual return. |
| Monthly contribution example implied a cent-rounded payment hits the target exactly. | Distinguishes $519.6973 unrounded from $519.70 displayed; the latter reaches $100,000.48. |
| Savings example understated the actual final-month overshoot and overstated generic rate/contribution lessons. | Corrected month-92 balance to $50,222.32 and interest to $8,422.32; sensitivity statements are tied to specific inputs. APY requires the documented annual-rate convention. |
| Unsupported generalizations and usage claims reduced trust. | Neutralized account, lender, return and behavioral claims where no primary evidence was supplied. “Most used calculators” becomes “Featured calculators.” Published a dated corrections log. |

Previously committed privacy, accessibility, citation and financial fixes that were absent from production are included in the candidate and covered by the release tests.

## Validation

- `node build.mjs --strict`: 60 generated pages; title/description uniqueness, content structure, internal references, JSON-LD, 404 noindex and advertising gates pass.
- `node --test tests/*.test.mjs`: 70 passed, 0 failed. Methodology correctly publishes 52 calculation checks; remaining tests cover privacy/platform behavior.
- `node scripts/audit-calculators.mjs`: 430 cases across all 30 tools; 403 finite successful results and 27 intentional invalid-combination rejections, 0 failures. Full synthetic results are in [calculator-boundaries.json](calculator-boundaries.json). These are one-input boundary checks, not exhaustive combinations or financial accuracy certification.
- Chrome at 390 × 844: all 59 content pages checked for a single H1 and horizontal overflow; all 30 calculator defaults render results, charts and tables without NaN/Infinity. Invalid text clears stale outputs and disables actions on all tools.
- Chrome targeted loan-comparison and refinance scenarios match independently checked exit amounts. Downloaded loan-comparison CSV contains the selected-month settlement rows and numeric amounts. Synthetic shared-fragment navigation restores input state and scrubs the address. Clipboard contents could not be verified through the browser clipboard bridge, so copying to an external application is not claimed as tested.
- Chrome consent flow: no analytics script before consent/after refusal; script loads after explicit opt-in and on reload with stored consent; after withdrawal and reload, no analytics or ad-serving script loads. Event sanitization and CSV formula-injection protection pass automated tests.
- Fresh production audit before changes: all 59 sitemap content URLs returned HTTP 200; robots.txt and ads.txt returned 200; an unknown route returned 404. No broken internal paths or fragments found. Titles, descriptions, H1s and canonical tags present.
- Candidate external references: 47 of 48 unique external URLs verified HTTP 200. The remaining LinkedIn author-profile URL returned its automated-access status 999; it is not a financial citation. Previously blocked investor.gov citations are replaced with verified primary-source alternatives already present in main.
- Ad serving remains disabled; publisher verification and ads.txt remain available. No invented reviewer credentials, runtime dependencies or bulk generated pages were added.

## Google review boundary

Google asks for useful original content, clear navigation and a good user experience, not a fixed word count or a guaranteed number of pages. The repairs add inspectable model outputs and correct inaccurate explanations; they do not prove sustained user interest or guarantee approval.

Sources consulted: [AdSense site readiness](https://support.google.com/adsense/answer/7299563?hl=en), [AdSense eligibility](https://support.google.com/adsense/answer/9724?hl=en), and [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

Before requesting another review: confirm the current rejection status in the account and obtain the owner's specific instruction to submit the review. Ad activation requires an actually integrated and tested certified CMP plus approval; it is separate from this release.

## Calculator audit register

Every listed tool received a default result/chart/table check, an invalid-text check, and the boundary cases below. “Rejected” means the model returned a documented validation message for incompatible inputs.

| Calculator | Cases | Successful | Rejected |
| --- | ---: | ---: | ---: |
| budget-calculator | 12 | 3 | 9 |
| compound-interest-calculator | 18 | 18 | 0 |
| debt-payoff-calculator | 5 | 5 | 0 |
| down-payment-calculator | 16 | 16 | 0 |
| early-loan-payoff-calculator | 10 | 10 | 0 |
| emi-calculator | 12 | 12 | 0 |
| extra-payment-calculator | 16 | 16 | 0 |
| future-value-calculator | 15 | 15 | 0 |
| house-affordability-calculator | 17 | 14 | 3 |
| investment-calculator | 13 | 13 | 0 |
| loan-amortization-calculator | 22 | 22 | 0 |
| loan-calculator | 10 | 10 | 0 |
| loan-comparison-calculator | 19 | 16 | 3 |
| loan-interest-calculator | 8 | 8 | 0 |
| loan-payment-calculator | 11 | 11 | 0 |
| loan-payoff-calculator | 10 | 7 | 3 |
| lump-sum-investment-calculator | 13 | 12 | 1 |
| monthly-investment-calculator | 10 | 10 | 0 |
| mortgage-amortization-calculator | 24 | 24 | 0 |
| mortgage-calculator | 19 | 17 | 2 |
| mortgage-payment-calculator | 9 | 9 | 0 |
| mortgage-payoff-calculator | 14 | 14 | 0 |
| personal-loan-calculator | 11 | 11 | 0 |
| present-value-calculator | 16 | 15 | 1 |
| refinance-calculator | 20 | 20 | 0 |
| rent-vs-buy-calculator | 35 | 33 | 2 |
| roi-calculator | 9 | 8 | 1 |
| savings-calculator | 15 | 15 | 0 |
| simple-interest-calculator | 8 | 7 | 1 |
| sip-calculator | 13 | 12 | 1 |

## Production verification after deployment

- All 59 sitemap content pages return 200 and match the tested build byte-for-byte. Robots and ads.txt return 200; a deliberately missing URL returns 404. All page metadata checks pass.
- All 34 shared and calculator JavaScript assets match the tested build byte-for-byte.
- Chrome confirms the new loan settlement table (month 24 difference 17.54), invalid optional text disables sharing and export and clears stale results, and refinancing at month 60 shows 7,969.71 lower modeled exit cost. Currency auto-detection changes display symbols only.
- Production analytics stays absent after refusal, loads after explicit opt-in, and is absent again after withdrawal and navigation. No ad-serving script is enabled.
- GitLab project controls checked in Chrome: 0 webhooks, no active integrations, blank custom CI config path, Auto DevOps unchecked, 0 trigger tokens and 0 repository mirrors. Cloudflare has no connected Git repository or builds. GitHub reported no workflows, hooks or deployments. No external workflow was disabled.
- The guarded deployment exited 0 after its strict build and full test run. No credentials are included in this repository or audit.
