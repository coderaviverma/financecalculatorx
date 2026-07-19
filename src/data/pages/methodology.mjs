export default {
  slug: "methodology",
  title: "Calculation Methodology",
  metaTitle: "Calculation Methodology — How Our Calculators Work",
  metaDescription:
    "How Finance Calculator X computes results: standard financial formulas, documented assumptions, cent-level rounding rules, automated tests and versioning.",
  lede: "Every result on this site comes from documented, tested, standard financial mathematics. Here's exactly how.",
  lastUpdated: "2026-07-19",
  bodyHtml: `
    <h2>Standard formulas, shown on every page</h2>
    <p>Every calculator uses published, industry-standard financial mathematics: level-payment amortization for loans and mortgages, compound growth and annuity formulas for savings and investing, discounting for present value, and month-by-month simulation where no closed form exists (multi-debt payoff, rent-vs-buy). Each calculator page has a <strong>Formula and methodology</strong> section that states the formula it uses, defines every variable, and explains the calculation order — so you can reproduce any result by hand or in a spreadsheet.</p>

    <h2>Core conventions</h2>
    <ul>
      <li><strong>Loan interest</strong> is modeled as accruing monthly on the reducing (remaining) balance: monthly rate = annual rate ÷ 12, with payments at the end of each period. This is a common convention for fixed-payment examples, but it is not universal. Daily accrual, fees, compounding rules, day-count conventions and payment rounding can produce different lender figures.</li>
      <li><strong>Compound growth</strong> supports daily, monthly, quarterly, half-yearly and yearly compounding. When contribution frequency differs from compounding frequency, the periodic rate is converted exactly: i = (1 + r/m)<sup>m/p</sup> − 1.</li>
      <li><strong>Rounding:</strong> calculations run in full floating-point precision; displayed currency values are rounded to the smallest unit (cent/paisa). In amortization schedules the final payment is adjusted by the leftover cents so the balance closes at exactly zero — the same practice lenders use.</li>
      <li><strong>Dates</strong> (payoff dates, goal dates) assume the first period begins one month from today and no payments are missed.</li>
      <li><strong>Currency selection changes formatting only.</strong> Choosing ₹ or € does not convert amounts at an exchange rate; the mathematics of rates and periods is currency-independent.</li>
    </ul>

    <h2>Automated testing</h2>
    <p>The calculation library is separated from the interface and covered by an automated test suite that runs before any release. Tests check results against independently known reference values (for example, a $250,000 loan at 6.5% over 30 years must produce a $1,580.17 monthly payment), verify edge cases (zero interest rates, very small and very large amounts, payments that fail to cover interest), and confirm that schedules internally reconcile — principal portions must sum to the loan, balances must close at zero.</p>

    <h2 id="verification">Current verification evidence</h2>
    <p>The release dated above passes 50 automated calculation checks covering the shared financial-math library and all 30 calculator configurations. Representative checks include:</p>
    <ul>
      <li>The $250,000, 6.5%, 360-month payment reference resolves to $1,580.17 within a one-cent tolerance.</li>
      <li>Zero-rate loans resolve to principal divided by payment count without dividing by zero.</li>
      <li>Amortization schedules reconcile principal, interest and remaining balance, and close at zero after final-payment rounding.</li>
      <li>Extra-payment cases shorten the schedule and reduce total interest, while non-amortizing payments are rejected.</li>
      <li>Investment, savings, mortgage, affordability, refinance, debt-payoff and rent-versus-buy outputs are cross-checked against independent formulas or accounting identities in the test code.</li>
    </ul>
    <p>These are repeatable software checks, not an independent professional certification. The site's <a href="/editorial-policy/">editorial policy</a> states the current review boundary.</p>

    <h2>Simulation-based tools</h2>
    <p>Three calculators use explicit month-by-month or year-by-year simulation rather than a single formula, because their questions have no closed-form answer: the <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> (multiple debts with rolling minimums), the <a href="/rent-vs-buy-calculator/">Rent vs Buy Calculator</a> (interacting growth rates and transaction costs), and goal-timing calculations in the savings tools. Their pages document each simulation step in order, and the same honesty applies: assumptions you can see, defaults you can change.</p>

    <h2>Reference sources</h2>
    <p>The formulas here are not ours — they are the standard results of financial mathematics, and you can check them against independent sources:</p>
    <ul>
      <li><strong>Time-value-of-money and annuity formulas</strong> (payment, future value, present value) follow the closed forms published in standard corporate-finance texts such as Ross, Westerfield &amp; Jordan, <em>Fundamentals of Corporate Finance</em>, and Brealey, Myers &amp; Allen, <em>Principles of Corporate Finance</em>.</li>
      <li><strong>Amortization and APR concepts</strong> match the definitions used by the U.S. Consumer Financial Protection Bureau — for example its explainer on <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" rel="noopener">interest rate vs APR</a>.</li>
      <li><strong>Compound-interest results</strong> can be cross-checked against the U.S. SEC's <a href="https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" rel="noopener">Investor.gov compound interest calculator</a>.</li>
      <li><strong>Reducing-balance (EMI) conventions</strong> for Indian lending follow the practices of banks regulated by the <a href="https://www.rbi.org.in/" rel="noopener">Reserve Bank of India</a>.</li>
    </ul>
    <p>Where a guide or calculator page relies on a specific external rule or definition, that page links its own source in context.</p>

    <h2>Versioning and review</h2>
    <p>Every calculator page shows a <strong>formula version</strong> and a <strong>last reviewed</strong> date. If a formula, assumption or default changes materially, the version increments and the review date updates. Corrections follow the <a href="/corrections-policy/">corrections policy</a>.</p>

    <h2>What methodology cannot fix</h2>
    <p>A correct formula applied to an assumption about the future is still an assumption. Projections at an "expected return" are planning centerlines, not predictions; lender quotes include fees and underwriting judgments no public calculator can know. Treat every output here as a well-computed estimate — the <a href="/disclaimer/">disclaimer</a> spells out the boundary between education and advice.</p>
  `,
};
