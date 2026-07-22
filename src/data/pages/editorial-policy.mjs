export default {
  slug: "editorial-policy",
  title: "Editorial Policy",
  metaTitle: "Editorial Policy",
  metaDescription:
    "How Finance Calculator X content is written, reviewed and kept honest: accuracy standards, attribution, independence from advertisers, and YMYL commitments.",
  lede: "Who writes this site, how the work is checked, and where the review boundary sits.",
  lastUpdated: "2026-07-22",
  bodyHtml: `
    <h2>Who writes the content</h2>
    <p>Calculator documentation, guides and examples are written and maintained by <a href="/authors/avinash-verma/">Avinash Verma</a>, the site's operator and technical author. There is no unnamed editorial team and, as of the date above, no independent financial professional reviews the site. Automated tests verify calculation behavior, but they are not a substitute for professional editorial review. If a qualified independent reviewer joins the project, the pages they actually review will show their real name, role, review date and verifiable qualifications.</p>

    <h2>Standards every page must meet</h2>
    <ul>
      <li><strong>Worked numbers are checkable.</strong> Numeric examples are checked against the same formulas and calculation code used by the interactive tools. Automated tests cover the calculation behavior; they do not replace a line-by-line professional editorial review.</li>
      <li><strong>Specific to its subject.</strong> Each calculator's explanation, worked example, FAQ and limitations are written for that calculator. We do not publish near-duplicate pages targeting keyword variations.</li>
      <li><strong>Assumptions visible.</strong> Any simplification, convention or rule of thumb is stated on the page where it's used.</li>
      <li><strong>Plain language.</strong> Jargon is defined at first use; formulas are explained in words alongside the notation.</li>
      <li><strong>Dated and versioned.</strong> Pages display a last-reviewed date and formula version, updated whenever anything material changes.</li>
    </ul>

    <h2>Advertising independence</h2>
    <p>The site may display advertising (such as Google AdSense) to fund its operation. Advertising never influences formulas, defaults, results, rankings or editorial content — and ads are visually distinct from calculator functionality and content. We do not currently publish sponsored content or affiliate recommendations; if that ever changes, such content will be clearly labeled.</p>

    <h2>Because money is a YMYL topic</h2>
    <p>Financial content can affect people's wellbeing, so we hold it to a higher bar: no guaranteed-outcome claims, no predictions dressed as facts, no product recommendations, no urgency tactics, and explicit boundaries between mathematical results, educational context and anything resembling advice (which we don't provide — see the <a href="/disclaimer/">disclaimer</a>). Where rules differ by country — tax treatment, prepayment rights, deposit insurance — we say so rather than assuming one jurisdiction.</p>

    <h2>Mistakes</h2>
    <p>When I can reproduce an error, I correct the calculation or clarify the assumption and add a regression test where appropriate. The <a href="/corrections-policy/">corrections policy</a> describes the process, and the <a href="/contact/">contact page</a> explains what to include in a report.</p>
  `,
};
