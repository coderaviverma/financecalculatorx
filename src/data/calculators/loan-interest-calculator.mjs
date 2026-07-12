export default {
  slug: "loan-interest-calculator",
  category: "loans",
  title: "Loan Interest Calculator",
  h1: "Loan Interest Calculator",
  metaTitle: "Loan Interest Calculator — Total Cost of Borrowing",
  metaDescription:
    "See exactly what a loan costs in interest: the lifetime total, first-year cost, interest as a share of the amount borrowed, and year-by-year accrual.",
  tagline:
    "Ignore the payment for a moment and look at the cost: total interest, how it front-loads into the early years, and what the loan really multiplies your borrowing by.",
  cardDescription: "Lifetime interest, first-year cost and the front-loaded accrual curve of any fixed loan.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["interest cost", "cost of borrowing", "total interest", "finance charge"],
  keywords: ["loan interest", "interest cost", "front-loaded", "cost multiple", "borrowing cost"],
  related: ["loan-calculator", "simple-interest-calculator", "loan-payment-calculator", "loan-comparison-calculator", "early-loan-payoff-calculator"],
  jumpExplainLabel: "Why interest front-loads",
  sections: {
    howToHtml: `
      <p>Three inputs — amount, rate, term — and the output leads with what most calculators bury: the interest bill. Use it when you already know a payment fits your budget and want to judge whether the loan is worth its cost.</p>
      <ul>
        <li><strong>Amount borrowed</strong> — the principal on which interest accrues.</li>
        <li><strong>Interest rate</strong> — the annual reducing-balance rate from your offer.</li>
        <li><strong>Term</strong> — try your intended term, then try it 12–24 months shorter and watch the interest metric, not the payment, to see what the extra months buy the lender.</li>
      </ul>
      <p>The chart splits every unit you pay into principal returned versus interest surrendered, year by year, and the table shows what fraction of the lifetime interest you have already handed over at each anniversary.</p>`,
    explanationHtml: `
      <h2>Where the interest on an amortized loan comes from</h2>
      <p>Each month, your lender multiplies the outstanding balance by one-twelfth of the annual rate — that product is the month's interest, and it is collected out of your payment before a single unit reduces the principal. On $30,000 at 8% over 72 months, month one charges 30,000 × 0.006667 = <strong>$200</strong> of interest out of the $526.00 payment; by the final month the balance is so small that the interest charge is barely three dollars, and the last full year of the loan costs only $265.20 in total.</p>
      <p>Because the balance is largest at the start, interest accrual is <strong>front-loaded</strong> even though the rate never changes. On the default loan, the first year alone generates $2,253.33 of interest — 28.6% of the lifetime bill in 16.7% of the term. By the end of year three, the halfway mark, <strong>72.7% of all the interest has already been paid</strong>. This is why refinancing or prepaying late in a loan feels underwhelming: most of the cost is already sunk, and only the thin tail of remaining interest can still be rescued.</p>
      <p>Your monthly statement shows this machinery directly. The "interest charged" (or "finance charge") column is always the previous balance times the periodic rate — if your statement's figure differs from this calculator's for the same month, the usual causes are daily rather than monthly accrual, a payment posted off-cycle, or escrowed amounts mixed into the payment line. The "principal" column should always equal payment minus interest; if it doesn't, something else (a fee, escrow) is being deducted first and is worth a phone call.</p>
      <p>Two summary numbers make loans comparable at a glance. <strong>Interest as a share of the amount borrowed</strong> — 26.2% on the default loan — tells you the surcharge on every unit of principal. The <strong>cost multiple</strong> — total paid ÷ borrowed, 1.26× here — is the bluntest test of all: would you take this loan if the price tag simply read "repay 1.26 times what you get"?</p>`,
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
      <p>The year-by-year figures come from running the actual schedule: each month's interest is the prior balance times <code>r</code>, and the yearly rows sum twelve of those charges. Because the balance declines geometrically rather than linearly, the yearly interest column falls slowly at first and steeply at the end — the signature of reducing-balance lending. At 0% the total interest is zero regardless of term.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: the same $30,000 at 8% — 60 vs 72 vs 84 months</div><div class="ex-body">
        <p>At the default 72 months: payment $526.00, total interest <strong>$7,871.80</strong> — 26.2% of the amount borrowed, averaging $109.33 per month of the term.</p>
        <p>Shorten to 60 months: payment rises to $608.29, but interest drops to <strong>$6,497.51</strong>.</p>
        <p>Stretch to 84 months: payment eases to $467.59, and interest swells to <strong>$9,277.26</strong>.</p>
        <p>The spread between the 60- and 84-month versions is <strong>$2,779.75 of extra interest for a payment just $140.70 lower</strong> — the loan is 43% more expensive in exchange for a 23% smaller monthly obligation. If the shorter payment strains the budget, a middle path is taking the longer term and overpaying voluntarily.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Term, before anything else.</strong> Interest scales roughly with how long a balance exists. The example above shows one loan varying from $6,497.51 to $9,277.26 purely on months chosen.</li>
        <li><strong>Rate.</strong> Each point of rate on the default loan adds about $1,000 of lifetime interest — significant, yet often smaller than the term effect borrowers accept casually.</li>
        <li><strong>Timing of extra payments.</strong> Since 72.7% of interest is paid by the halfway point, principal reductions only save meaningfully when made early.</li>
        <li><strong>Accrual method.</strong> Daily-accrual lenders charge slightly more when you pay late in the cycle and slightly less when early; over years this drifts totals by a fraction of a percent.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Models <strong>monthly reducing-balance accrual at a fixed rate</strong>; variable rates and daily-accrual loans will drift from these totals.</li>
        <li>Shows the cost of the scheduled loan only — <strong>no extra payments</strong> are modeled here; the early payoff calculator handles that question.</li>
        <li>Fees and charges are excluded, so a fee-laden loan costs more than its interest column suggests.</li>
        <li>Interest figures are not adjusted for inflation or tax deductibility (relevant for some mortgage and business borrowing).</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why is most of my payment going to interest right now?",
      aHtml: `<p>Because interest is charged on the balance, and your balance is at its peak early in the loan. On the default example the first payment is 38% interest ($200 of $526.00); by the last year interest is a rounding error. Nothing is wrong with your loan — but it does mean the early years are when extra principal payments do their best work.</p>`,
    },
    {
      q: "How can I check the interest on my loan statement?",
      aHtml: `<p>Multiply your previous statement's balance by your annual rate divided by 12 — the result should match the interest line, give or take pennies of rounding. A larger mismatch usually means the lender accrues daily (multiply the daily rate by the actual days in the cycle instead), a payment posted early or late, or escrow/fee amounts are mixed into the same line. The monthly view of this calculator's table gives you the reference column to compare against.</p>`,
    },
    {
      q: "Is a loan with under 30% total interest 'cheap'?",
      aHtml: `<p>There is no universal threshold — the share scales with both rate and term, so a 26% interest share can reflect a modest rate held for years (the default here) or a high rate held briefly. Use the share to compare structures of the same loan (different terms, different rates), and use the effective cost multiple as a gut check: 1.26× means repaying $1.26 per dollar borrowed. Whether that is worth it depends on what the money buys.</p>`,
    },
    {
      q: "Does making payments early in the month reduce my interest?",
      aHtml: `<p>Only on daily-accrual loans (many student loans, some autos): there, interest builds every day, so a payment ten days early stops ten days of accrual on the amount paid. On standard monthly-accrual loans, the month's interest is fixed by the balance at the cycle start, and paying early changes nothing except your float. Your loan agreement's "how interest is calculated" clause says which type you have.</p>`,
    },
  ],
};
