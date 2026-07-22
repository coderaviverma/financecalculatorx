export default {
  slug: "authors/avinash-verma",
  title: "Avinash Verma",
  metaTitle: "Avinash Verma — Author at Finance Calculator X",
  metaDescription:
    "Avinash Verma builds and maintains Finance Calculator X: a software developer focused on transparent, tested browser-based financial calculators.",
  lede: "Builder and maintainer of Finance Calculator X.",
  lastUpdated: "2026-07-22",
  extraJsonld: [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Avinash Verma",
      url: "https://financecalculatorx.com/authors/avinash-verma/",
      jobTitle: "Software Developer",
      worksFor: { "@type": "Organization", name: "Finance Calculator X", url: "https://financecalculatorx.com/" },
      sameAs: ["https://github.com/coderaviverma", "https://gitlab.com/coderaviverma", "https://www.linkedin.com/in/avinashverma89/"],
      knowsAbout: ["financial calculators", "amortization", "compound interest", "web development"],
    },
  ],
  bodyHtml: `
    <h2>Who I am</h2>
    <p>I'm a software developer based in Gurgaon, India, and I build browser-based utilities that do not require an account. Finance Calculator X began from a simple frustration: many calculator pages show a result without showing enough of the working to check it. Here, the formula, assumptions and limits sit on the same page as the answer.</p>
    <p>You can verify my work directly: my open-source profiles are on <a href="https://github.com/coderaviverma" rel="noopener">GitHub</a> and <a href="https://gitlab.com/coderaviverma" rel="noopener">GitLab</a>, where I maintain several other browser-tool projects, and my professional profile is on <a href="https://www.linkedin.com/in/avinashverma89/" rel="noopener">LinkedIn</a>.</p>

    <h2>What I am — and what I'm not</h2>
    <p><strong>I am not a licensed financial adviser, accountant or planner, and nothing on this site is personal financial advice.</strong> My role is technical author and software maintainer. What I bring is engineering discipline applied to published financial mathematics: the amortization, compounding, discounting and simulation formulas documented in standard finance references. Every calculator states its formula and conventions, and the <a href="/methodology/#verification">methodology page</a> explains exactly how results are computed and tested.</p>
    <p>That boundary is deliberate. A loan payment can be checked once the rate, term and accrual convention are fixed, and the automated tests cover reference cases for the models used on this site. Whether a particular loan or investment is right <em>for you</em> is a different question, and one this site does not try to answer.</p>

    <h2>How I work on this site</h2>
    <ul>
      <li>Calculation logic lives in a single tested library, separate from page content, so the numbers in worked examples come from the same code that powers the calculators.</li>
      <li>Calculator pages carry a last-reviewed date and formula version; guides and policy pages carry a review or update date.</li>
      <li>Guides cite primary sources — regulators such as the <a href="https://www.consumerfinance.gov/" rel="noopener">CFPB</a>, the <a href="https://www.rbi.org.in/" rel="noopener">RBI</a> and the SEC's <a href="https://www.investor.gov/" rel="noopener">Investor.gov</a> — rather than other calculator sites.</li>
      <li>Error reports outrank all other work: the <a href="/corrections-policy/">corrections policy</a> describes how reported discrepancies are reproduced, classified and fixed.</li>
    </ul>

    <h2>Pages I author and maintain</h2>
    <p>All 30 calculators, the <a href="/guides/">finance guides</a> and the site's policy pages are written and maintained by me, with automated verification tooling. If independent professional reviewers join the project, their real names and verifiable credentials will appear on the pages they review — the <a href="/editorial-policy/">editorial policy</a> commits to never inventing experts.</p>

    <h2>Contact</h2>
    <p>Corrections, questions and suggestions: <a href="mailto:contact@financecalculatorx.com">contact@financecalculatorx.com</a> — or see the <a href="/contact/">contact page</a> for what to include with an error report.</p>
  `,
};
