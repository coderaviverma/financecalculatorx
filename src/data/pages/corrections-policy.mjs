export default {
  slug: "corrections-policy",
  title: "Corrections Policy",
  metaTitle: "Corrections Policy",
  metaDescription:
    "How Finance Calculator X handles error reports: verification against the test suite, fixes, version bumps and transparent notes for material corrections.",
  lede: "A calculator site lives or dies on accuracy. Here's exactly what happens when something is wrong.",
  lastUpdated: "2026-07-12",
  bodyHtml: `
    <h2>Reporting an error</h2>
    <p>Email <a href="mailto:coderaviverma@gmail.com">coderaviverma@gmail.com</a> with the calculator's address and — ideally — the shareable link produced by the <em>Copy link</em> button, which captures your exact inputs. Error reports are prioritized ahead of all other work; we aim to investigate within 7 days and usually much sooner.</p>

    <h2>How reports are verified</h2>
    <ol>
      <li><strong>Reproduce.</strong> We run your exact inputs and confirm the reported output.</li>
      <li><strong>Check against references.</strong> The result is compared with the documented formula computed independently, our automated test suite, and — where applicable — authoritative references such as textbook examples or lender amortization statements.</li>
      <li><strong>Classify.</strong> Discrepancies split into three kinds: genuine calculation errors (a bug in formula or code), assumption mismatches (the calculator's documented convention differs from your lender's — e.g. daily vs monthly accrual), and expectation gaps (the math is right but the page explained it poorly).</li>
    </ol>

    <h2>What happens for each</h2>
    <ul>
      <li><strong>Calculation error:</strong> fixed immediately, a regression test is added so it cannot recur, the formula version increments, and the page's last-reviewed date updates. For material errors — anything that could meaningfully change a decision — a correction note is added to the affected page.</li>
      <li><strong>Assumption mismatch:</strong> the page's assumptions section is clarified so the next reader isn't surprised.</li>
      <li><strong>Unclear explanation:</strong> the copy is rewritten.</li>
    </ul>

    <h2>Scope</h2>
    <p>This policy covers calculator results, formulas, worked examples and factual statements in guides. It does not extend to differences of opinion about financial strategy, third-party sites we link to, or outcomes of decisions made using the tools — see the <a href="/disclaimer/">disclaimer</a> for that boundary.</p>
  `,
};
