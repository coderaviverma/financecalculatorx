export default {
  slug: "corrections-policy",
  title: "Corrections Policy",
  metaTitle: "Corrections Policy",
  metaDescription:
    "How Finance Calculator X handles error reports: verification against the test suite, fixes, version bumps and transparent notes for material corrections.",
  lede: "How I reproduce, classify and correct a reported problem.",
  lastUpdated: "2026-07-22",
  bodyHtml: `
    <h2>Reporting an error</h2>
    <p>Email <a href="mailto:contact@financecalculatorx.com">contact@financecalculatorx.com</a> with the calculator's address and, ideally, the shareable link produced by the <em>Copy link</em> button. That link preserves the inputs needed to reproduce the result. I prioritize calculation-error reports, but I do not promise a fixed response time.</p>

    <h2>How reports are verified</h2>
    <ol>
      <li><strong>Reproduce.</strong> I run the supplied inputs and confirm the reported output.</li>
      <li><strong>Check against references.</strong> I compare the result with the documented formula, the automated tests and, where applicable, a relevant primary reference or lender schedule.</li>
      <li><strong>Classify.</strong> Discrepancies split into three kinds: genuine calculation errors (a bug in formula or code), assumption mismatches (the calculator's documented convention differs from your lender's — e.g. daily vs monthly accrual), and expectation gaps (the math is right but the page explained it poorly).</li>
    </ol>

    <h2>What happens for each</h2>
    <ul>
      <li><strong>Calculation error:</strong> the code is corrected, a regression test is added where practical, the formula version increments, and the page's review date updates. A material correction also receives a note on the affected page.</li>
      <li><strong>Assumption mismatch:</strong> the page's assumptions section is clarified so the next reader isn't surprised.</li>
      <li><strong>Unclear explanation:</strong> the copy is rewritten.</li>
    </ul>

    <h2>Scope</h2>
    <p>This policy covers calculator results, formulas, worked examples and factual statements in guides. It does not extend to differences of opinion about financial strategy, third-party sites we link to, or outcomes of decisions made using the tools — see the <a href="/disclaimer/">disclaimer</a> for that boundary.</p>
  `,
};
