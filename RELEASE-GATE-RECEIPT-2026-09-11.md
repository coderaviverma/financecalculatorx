# Release-gate receipt — 2026-09-11

## Candidate

- Branch: `codex/seo-lump-sum-decision-map`
- Content commit: `dc1601c3eac7e08665e76a472e5dd438a269d8b7`
- Content tree: `9350957264feeaf180f2bcaa195bd0223a7e5319`
- Base: `0465a15e5e76d90c247f75094bc3059c773ff6ae` (`origin/main` at review time)
- Product scope: one file, `src/data/guides/lump-sum-vs-monthly-investing.mjs`

The content change preserves the base title, `Lump Sum vs Monthly Investing: How to Decide`, and replaces the generic scenario list with a four-row, cash-flow-to-calculator decision table. The table's claims match the corresponding existing calculator inputs: one-time amount, recurring SIP contribution, optional initial-plus-monthly investment inputs, and a separate emergency-fund cash-runway guide.

## Acceptance evidence

- `git diff --check HEAD^ HEAD`: passed; only the stated content file changed.
- `node build.mjs --strict`: passed, built 60 pages (`v=22d3030c83`).
- `node --test tests/*.test.mjs`: passed, 67 tests and 0 failures.
- Generated page check: expected title and canonical URL; 2 JSON-LD blocks; all 4 new internal paths exist; no `adsbygoogle` or `googletagmanager` marker.
- Consent and AdSense fail-closed tests remain covered by the passing suite.
- Local browser rendering: desktop table has 3 native `<th>` headers and 4 body rows. At 360 px and 390 px, document scroll width equals viewport width; the 480 px table is contained in its 320 px/350 px `.table-scroll` wrapper for horizontal access.

## Release boundary

This receipt records local acceptance only. It does not authorize or record a push, deployment, cache purge, credential access, provider configuration change, advertising activation, spend, or outreach. Any release must first reconcile this local branch with the intended private and public remotes, deploy via `sh scripts/deploy.sh` using the verified FinanceCalculatorX Cloudflare account, then verify the production marker and purge the intended canonical page URL only if the release owner approves that provider action.
