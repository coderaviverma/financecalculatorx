export default {
  slug: "refinance-calculator",
  category: "mortgage",
  title: "Refinance Calculator",
  h1: "Refinance Calculator",
  metaTitle: "Refinance Calculator — Break-Even & Lifetime Savings",
  metaDescription:
    "Check whether refinancing pays off: monthly savings, honest break-even on closing costs, and the lifetime cost of resetting your loan term.",
  tagline:
    "Compare your current mortgage against a new rate and term — monthly saving, the months until closing costs pay for themselves, and the lifetime cost including the term-reset effect most quick quotes hide.",
  cardDescription: "Monthly saving, break-even on fees, and lifetime cost of a refinance — term reset included.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["refi calculator", "mortgage refinance", "rate and term refinance"],
  keywords: ["refinance", "break-even", "closing costs", "term reset", "monthly savings", "lifetime cost"],
  related: ["mortgage-payoff-calculator", "mortgage-payment-calculator", "mortgage-calculator", "loan-comparison-calculator", "mortgage-amortization-calculator"],
  jurisdiction: "The break-even and lifetime-cost math is universal. Closing costs, prepayment penalties and refinancing norms vary by country — US home loans rarely carry prepayment penalties, whereas many fixed-rate mortgages elsewhere do, which can change whether refinancing pays off.",
  jumpExplainLabel: "The two refinance wins",
  sections: {
    howToHtml: `
      <p>Describe your existing loan from the latest statement (balance, rate, and time left), then the offer on the table: new rate, new term, and the closing costs quoted on the Loan Estimate.</p>
      <ul>
        <li><strong>New term</strong>: try matching your remaining time first (the cleanest comparison), then the shorter and longer options. The lifetime row in the table is where term choices show their teeth.</li>
        <li><strong>Closing costs.</strong> Include everything you'd pay or roll in: origination, appraisal, title. For a "no-cost" refi, enter 0 but use the (higher) no-cost rate you were quoted.</li>
        <li>Watch both headline numbers: the monthly change <em>and</em> the lifetime difference. A refinance can improve one while worsening the other.</li>
      </ul>
      <p>The comparison table puts the two loans side by side with a difference column, so nothing hides in the averages.</p>`,
    explanationHtml: `
      <h2>The two ways a refinance wins — and the trap between them</h2>
      <p>A refinance can pay off through the <strong>rate</strong> (same debt, cheaper money) or through the <strong>term</strong> (same debt, different schedule), and the two interact in ways that quick quotes gloss over. On the defaults, a <strong>$260,000</strong> balance at <strong>7.25%</strong> with 25 years left costs $1,879.30/month; refinancing to <strong>6.25%</strong> over a fresh 25 years drops the payment to $1,715.14, <strong>$164.16/month saved</strong>. The $5,000 of closing costs is earned back in <strong>31 months</strong>, and lifetime cost falls by about <strong>$44,247</strong> including fees. That's the clean rate win: term unchanged, every number improves.</p>
      <p>Now the trap. Take the same 6.25% but stretch to a <strong>30-year</strong> term: the payment falls further, to $1,600.86 (saving $278.44/month), and the break-even shortens to 18 months; everything looks better on the monthly view. But you'd be paying interest for 60 extra months, and lifetime cost <em>rises</em> by about <strong>$17,522</strong> despite the full point of rate improvement. This is the term-reset trap: the payment drop is real, but part of it is just your old loan's principal repayment being deferred and re-billed with interest.</p>
      <p>The opposite move, shortening to 15 years, raises the payment by $350.00/month, so there's no payment break-even at all. Yet lifetime cost plunges by roughly <strong>$157,515</strong>. Neither headline number decides alone: a refinance is a trade across time, and the sound evaluation reads the monthly change, the break-even <em>and</em> the lifetime difference together, which is exactly what the results panel shows.</p>
      <p>One more reality check: break-even assumes you keep the loan. If you're likely to sell or refinance again before the break-even month, the fees are a loss no matter how good the rate looks.</p>`,
    formulaHtml: `
      <p>Both loans are amortized in full and compared on three axes:</p>
      <div class="formula-block"><span class="fx">Saving = M<sub>old</sub> − M<sub>new</sub> &nbsp;·&nbsp; BreakEven = Fees ÷ Saving &nbsp;·&nbsp; Lifetime Δ = T<sub>old</sub> − (T<sub>new</sub> + Fees)</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly payment from the amortization formula on each loan's rate and term</li>
          <li><code>Fees</code> closing costs of the refinance</li>
          <li><code>T</code> total of all payments over each loan's remaining schedule</li>
        </ul>
      </div>
      <p>Break-even only exists when the payment falls (Saving &gt; 0); a term-shortening refinance with a higher payment is evaluated on the lifetime axis instead. The lifetime figure charges the fees to the new loan, which slightly understates the case for refinancing if you'd otherwise invest the fee money (a deliberate, conservative choice). When the new term exceeds your remaining time, the calculator flags the term reset explicitly.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $260,000 at 7.25% (25 years left) → 6.25%, $5,000 fees</div><div class="ex-body">
        <p><strong>Same 25-year term:</strong> payment falls from $1,879.30 to $1,715.14 (−$164.16/mo). Break-even = 5,000 ÷ 164.16 ≈ <strong>31 months</strong>. Lifetime: $514,542 + $5,000 vs $563,789 → saves <strong>$44,247</strong>.</p>
        <p><strong>Reset to 30 years:</strong> payment $1,600.86 (−$278.44/mo), break-even just 18 months, but total cost including fees becomes $581,311 vs $563,789: <strong>$17,522 more</strong> despite the lower rate.</p>
        <p><strong>Shorten to 15 years:</strong> payment rises to $2,229.30 (+$350.00/mo), no payment break-even, but lifetime cost drops to $406,274, a saving of <strong>$157,515</strong>.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate gap.</strong> The old rule of thumb ("refinance at 1% below your rate") is a rough proxy for break-even; the real test is fees ÷ monthly saving against how long you'll keep the loan. Smaller gaps can still work with low fees or large balances.</li>
        <li><strong>Term choice.</strong> The quiet decision that dominates lifetime cost. Matching your remaining term isolates the pure rate win; stretching lowers payments at lifetime expense; shortening does the reverse.</li>
        <li><strong>Fees and how they're paid.</strong> Rolling fees into the balance means financing them at the mortgage rate for decades; paying cash keeps the loan clean. "No-cost" refis are neither — the fees live in the rate, permanently.</li>
        <li><strong>Time you'll keep the loan.</strong> Every benefit accrues monthly, but fees are paid once. A 31-month break-even is irrelevant if you're moving in two years, and a bargain if you're staying ten.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Rate-and-term refinances only: cash-out refinancing changes the balance and mixes borrowing with repricing, which needs a different comparison.</li>
        <li>The lifetime figure is nominal: interest avoided in 2045 counts the same as interest avoided next year. Discounting would slightly weaken long-term savings claims.</li>
        <li>Escrow items (tax, insurance) are unaffected by refinancing and excluded; PMI changes from a new appraisal are not modeled.</li>
        <li>Assumes both loans run to schedule. If you prepay aggressively, the term-reset penalty shrinks; model that with the <a href="/mortgage-payoff-calculator/">mortgage payoff calculator</a>.</li>
        <li>Your quoted rate depends on credit, loan-to-value and points; this tool compares offers, it doesn't predict them.</li>
      </ul>`,
  },
  faq: [
    {
      q: "When is refinancing worth it?",
      aHtml: `<p>When you'll keep the loan past the break-even month and the lifetime difference is positive at a term you're comfortable with. On the defaults that's 31 months to recover $5,000 of fees, then $164/month of pure saving. If either the break-even exceeds your expected stay or the lifetime row goes negative, the refinance is cosmetic.</p>`,
    },
    {
      q: "What is the term-reset trap exactly?",
      aHtml: `<p>Refinancing 25 remaining years into a fresh 30-year loan restarts amortization: more months of payments, each front-loaded with interest. On this page's example it turns a genuine 1% rate improvement into $17,522 of extra lifetime cost, even while cutting the monthly payment by $278. If you want the lower payment anyway, consider taking the matching term and simply prepaying the difference: flexibility without the reset.</p>`,
    },
    {
      q: "My new payment would be higher — can the refinance still make sense?",
      aHtml: `<p>Yes, as a term-shortening move. Dropping to 15 years raises the example payment by $350/month but saves $157,515 over the loan's life. There's no fee break-even in the monthly sense, so judge it on the lifetime row and on whether the higher payment is sustainable in your budget through bad months as well as good.</p>`,
    },
    {
      q: "Are no-cost refinances really free?",
      aHtml: `<p>No. The lender recovers the fees through a higher rate (typically 0.25–0.5% above the par rate), so you pay them monthly forever instead of once upfront. That trade actually favors you for short holding periods and works against you for long ones. To compare fairly here: enter 0 fees with the no-cost rate, then your quoted fees with the par rate, and compare lifetime rows.</p>`,
    },
    {
      q: "Should I roll the closing costs into the new loan?",
      aHtml: `<p>Rolling $5,000 into a 6.25% 25-year loan costs about $33/month and roughly $4,895 of interest on top of the fees themselves over the full term. It preserves your cash, which matters if reserves are thin, so just include the rolled amount mentally when reading the lifetime comparison, since financed fees compound unnoticed.</p>`,
    },
  ],
};
