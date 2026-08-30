export default {
  slug: "loan-interest-calculator",
  category: "loans",
  title: "Loan Interest Calculator",
  h1: "Loan Interest Calculator",
  metaTitle: "Loan Interest Calculator — Total Cost of Borrowing",
  metaDescription:
    "Model a fixed-rate loan's scheduled interest: lifetime total, first-year amount, share of principal and year-by-year accrual.",
  tagline:
    "Focus on the interest cost of a loan, including when that interest is paid and how term length changes the total.",
  cardDescription: "Scheduled interest and year-by-year accrual for a fixed-rate equal-payment loan.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["interest cost", "cost of borrowing", "total interest", "finance charge"],
  keywords: ["loan interest", "interest cost", "front-loaded", "cost multiple", "borrowing cost"],
  related: ["loan-calculator", "simple-interest-calculator", "loan-payment-calculator", "loan-comparison-calculator", "early-loan-payoff-calculator"],
  jumpExplainLabel: "Why interest front-loads",
  sections: {
    howToHtml: `
      <p>Enter the amount, fixed rate and term to focus on the modeled interest schedule. For the payment plus a full monthly amortization table, use the <a href="/loan-calculator/">Loan Calculator</a>.</p>
      <ul>
        <li><strong>Amount borrowed</strong> is the principal on which interest accrues.</li>
        <li><strong>Interest rate</strong> is the annual reducing-balance rate from your offer.</li>
        <li><strong>Term</strong>: compare multiple month counts and read both the payment and total interest.</li>
      </ul>
      <p>The chart splits every unit you pay into principal returned versus interest surrendered, year by year, and the table shows what fraction of the lifetime interest you have already handed over at each anniversary.</p>`,
    explanationHtml: `
      <h2>Where the interest on an amortized loan comes from</h2>
      <p>In this monthly model, interest equals the outstanding balance times one-twelfth of the annual rate and the remaining payment reduces principal. On $30,000 at 8% over 72 months, month one includes <strong>$200</strong> of interest in the $526.00 payment; the modeled interest portion falls as the balance falls.</p>
      <p>Because the balance is largest at the start, interest accrual is <strong>front-loaded</strong> even though the rate never changes. On the default loan, the first year alone generates $2,253.33 of interest — 28.6% of the lifetime bill in 16.7% of the term. By the end of year three, the halfway mark, <strong>72.7% of all the interest has already been paid</strong>. This is why refinancing or prepaying late in a loan feels underwhelming: most of the cost is already sunk, and only the thin tail of remaining interest can still be rescued.</p>
      <p>Under this convention, a row's interest equals the prior balance times the monthly rate and principal equals payment minus interest. An actual statement can differ because of daily accrual, payment timing, fees, insurance, escrow, rate changes or rounding. The calculator can expose the difference but cannot diagnose it.</p>
      <p>Two summary numbers make loans comparable at a glance. <strong>Interest as a share of the amount borrowed</strong> (26.2% on the default loan) tells you the surcharge on every unit of principal. The <strong>cost multiple</strong>, total paid ÷ borrowed, 1.26× here, is the bluntest test of all: would you take this loan if the price tag simply read "repay 1.26 times what you get"?</p>`,
    formulaHtml: `
      <p>Total interest is the payment stream minus the principal returned:</p>
      <div class="formula-block"><span class="fx">Total interest = M × n − P&nbsp;&nbsp;where&nbsp;&nbsp;M = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly payment; <code>n</code> number of payments</li>
          <li><code>P</code> amount borrowed</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li>month k interest = balance<sub>k−1</sub> × <code>r</code></li>
        </ul>
      </div>
      <p>The year-by-year figures come from running the actual schedule: each month's interest is the prior balance times <code>r</code>, and the yearly rows sum twelve of those charges. Because the balance declines geometrically rather than linearly, the yearly interest column falls slowly at first and steeply at the end, the signature of reducing-balance lending. At 0% the total interest is zero regardless of term.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: the same $30,000 at 8% — 60 vs 72 vs 84 months</div><div class="ex-body">
        <p>At the default 72 months: payment $526.00, total interest <strong>$7,871.80</strong>, which is 26.2% of the amount borrowed, averaging $109.33 per month of the term.</p>
        <p>Shorten to 60 months: payment rises to $608.29, but interest drops to <strong>$6,497.51</strong>.</p>
        <p>Stretch to 84 months: payment eases to $467.59, and interest swells to <strong>$9,277.26</strong>.</p>
        <p>The spread between the 60- and 84-month versions is <strong>$2,779.75 of extra interest for a payment just $140.70 lower</strong>. The loan is 43% more expensive in exchange for a 23% smaller monthly obligation. If the shorter payment strains the budget, a middle path is taking the longer term and overpaying voluntarily.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Term, before anything else.</strong> Interest scales roughly with how long a balance exists. The example above shows one loan varying from $6,497.51 to $9,277.26 purely on months chosen.</li>
        <li><strong>Rate.</strong> Each point of rate on the default loan adds about $1,000 of lifetime interest, which is significant yet often smaller than the term effect borrowers accept casually.</li>
        <li><strong>Timing of extra payments.</strong> Since 72.7% of interest is paid by the halfway point, principal reductions only save meaningfully when made early.</li>
        <li><strong>Accrual method.</strong> Daily accrual and payment timing produce a different result from the monthly-period convention used here.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Models <strong>monthly reducing-balance accrual at a fixed rate</strong>; variable rates and daily-accrual loans will drift from these totals.</li>
        <li>Shows the cost of the scheduled loan only; <strong>no extra payments</strong> are modeled here. The early payoff calculator handles that question.</li>
        <li>Fees and charges are excluded, so a fee-laden loan costs more than its interest column suggests.</li>
        <li>Interest figures are nominal and pre-tax. Applicable deductions or tax treatment vary by borrower, purpose and jurisdiction.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why is most of my payment going to interest right now?",
      aHtml: `<p>Because interest is charged on the balance, and your balance is at its peak early in the loan. On the default example the first payment is 38% interest ($200 of $526.00); by the last year interest is a rounding error. Nothing is wrong with your loan, but it does mean the early years are when extra principal payments do their best work.</p>`,
    },
    {
      q: "How can I check the interest on my loan statement?",
      aHtml: `<p>Multiply the previous modeled balance by the annual rate divided by 12 to reproduce this calculator's interest row. A statement can use a different balance date, daily accrual, fees or another convention, so a mismatch does not identify its cause. Compare with the contract's interest-calculation clause.</p>`,
    },
    {
      q: "Is a loan with under 30% total interest 'cheap'?",
      aHtml: `<p>There is no universal threshold — the share scales with both rate and term, so a 26% interest share can reflect a modest rate held for years (the default here) or a high rate held briefly. Use the share to compare structures of the same loan (different terms, different rates), and use the effective cost multiple as a gut check: 1.26× means repaying $1.26 per dollar borrowed. Whether that is worth it depends on what the money buys.</p>`,
    },
    {
      q: "Does making payments early in the month reduce my interest?",
      aHtml: `<p>The effect depends on the contract's accrual and posting rules. This calculator uses one monthly period and does not change interest for a payment made earlier within that period. A daily-accrual schedule can produce a different result; use the agreement and statement to identify the method.</p>`,
    },
  ],
};
