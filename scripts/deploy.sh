#!/bin/sh
# Deploy guard: this project must deploy with an explicit API token for the
# intended Cloudflare account. Without these env vars, wrangler silently falls
# back to whatever OAuth login is stored globally — which on shared machines
# can be a DIFFERENT account, creating a stray duplicate worker there.
set -eu
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  echo "REFUSING TO DEPLOY: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are not set." >&2
  echo "Source the token env file for the intended account, then re-run." >&2
  exit 1
fi
node build.mjs --strict
node --test tests/*.test.mjs >/dev/null
exec npx wrangler deploy "$@"
