export default {
  slug: "refinance-calculator",
  category: "mortgage",
  title: "Refinance Calculator",
  h1: "Refinance Calculator",
  metaTitle: "Refinance Calculator — Break-Even & Lifetime Savings",
  metaDescription:
    "Compare refinancing scenarios: monthly payment change, break-even on entered closing costs, and the modeled lifetime effect of resetting the term.",
  tagline:
    "Compare a current mortgage with a refinance offer, including monthly savings, closing-cost break-even and the effect of a new term.",
  cardDescription: "Monthly saving, break-even on fees, and lifetime cost of a refinance — term reset included.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["refi calculator", "mortgage refinance", "rate and term refinance"],
  keywords: ["refinance", "break-even", "closing costs", "term reset", "monthly savings", "lifetime cost"],
  related: ["mortgage-payoff-calculator", "mortgage-payment-calculator", "mortgage-calculator", "loan-comparison-calculator", "mortgage-amortization-calculator"],
  jurisdiction: "The amortization comparison is jurisdiction-neutral. Closing costs, prepayment charges, disclosures, taxes and refinancing rules are not supplied by the calculator; enter quoted costs and check the existing and proposed loan documents.",
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
      <h2>Rate changes, term changes and their trade-off</h2>
      <p>A refinance can pay off through the <strong>rate</strong> (same debt, cheaper money) or through the <strong>term</strong> (same debt, different schedule), and the two interact in ways that quick quotes gloss over. On the defaults, a <strong>$260,000</strong> balance at <strong>7.25%</strong> with 25 years left costs $1,879.30/month; refinancing to <strong>6.25%</strong> over a fresh 25 years drops the payment to $1,715.14, <strong>$164.16/month saved</strong>. The $5,000 of closing costs is earned back in <strong>31 months</strong>, and lifetime cost falls by about <strong>$44,247</strong> including fees. That's the clean rate win: term unchanged, every number improves.</p>
      <p>Now the trap. Take the same 6.25% but stretch to a <strong>30-year</strong> term: the payment falls further, to $1,600.86 (saving $278.44/month), and the break-even shortens to 18 months; everything looks better on the monthly view. But you'd be paying interest for 60 extra months, and lifetime cost <em>rises</em> by about <strong>$17,522</strong> despite the full point of rate improvement. This is the term-reset trap: the payment drop is real, but part of it is just your old loan's principal repayment being deferred and re-billed with interest.</p>
      <p>The opposite move, shortening to 15 years, raises the payment by $350.00/month, so there is no payment break-even. In the modeled full schedules, total payments plus entered fees fall by roughly <strong>$157,515</strong>. The monthly change, fee break-even and full-schedule difference answer different questions and should be read together.</p>
      <p>Break-even assumes the loan remains in place long enough for accumulated monthly savings to offset the entered fees. Selling, prepaying or refinancing again earlier changes the realized comparison.</p>`,
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
        <li><strong>Rate gap.</strong> The calculator replaces rate-gap rules of thumb with an explicit comparison of entered fees, monthly payment change and expected holding period.</li>
        <li><strong>Term choice.</strong> Matching the remaining term isolates the rate change in this model. A longer term can lower the payment while increasing total scheduled payments; a shorter term can do the reverse.</li>
        <li><strong>Fees and how they're paid.</strong> Fees added to principal accrue interest under the new schedule. A quote marketed as “no cost” may use lender credits or different pricing, so compare its disclosed rate, fees and cash due rather than assuming zero economic cost.</li>
        <li><strong>Time the loan remains open.</strong> Entered fees occur at the start while payment differences accumulate monthly. The break-even result can be compared with an expected sale, payoff or later refinance date.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Rate-and-term refinances only: cash-out refinancing changes the balance and mixes borrowing with repricing, which needs a different comparison.</li>
        <li>The lifetime figure is nominal: interest avoided in 2045 counts the same as interest avoided next year. Discounting would slightly weaken long-term savings claims.</li>
        <li>Escrow items (tax, insurance) are unaffected by refinancing and excluded; PMI changes from a new appraisal are not modeled.</li>
        <li>Assumes both loans run to schedule. If you prepay aggressively, the term-reset penalty shrinks; model that with the <a href="/mortgage-payoff-calculator/">mortgage payoff calculator</a>.</li>
        <li>Your quoted rate depends on credit, loan-to-value and points; this tool compares offers, it doesn't predict them.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/" rel="noopener">CFPB: What is a prepayment penalty?</a> — background for the regional note on penalties that can change refinancing economics.</li>
        <li><a href="https://www.consumerfinance.gov/owning-a-home/" rel="noopener">CFPB: Owning a Home</a> — official loan-comparison and closing-cost resources.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What does the refinance break-even result mean?",
      aHtml: `<p>It is the number of monthly payment differences required to equal the entered closing costs when the new payment is lower. On the defaults, $5,000 divided by $164.16 is about 31 months. It does not include opportunity cost, taxes, future rate changes, selling costs or another refinance, and it is not a recommendation to accept the offer.</p>`,
    },
    {
      q: "What is the term-reset trap exactly?",
      aHtml: `<p>Refinancing 25 remaining years into a fresh 30-year loan creates 60 additional scheduled payments. In this example, the modeled total payments plus fees are $17,522 higher even though the monthly payment is $278 lower. A matching-term scenario isolates the rate change and makes the effect of those extra months visible.</p>`,
    },
    {
      q: "Why can a higher-payment refinance show a lower total?",
      aHtml: `<p>A shorter term can concentrate principal repayment into fewer months. In the example, a 15-year schedule raises the payment by $350 but lowers modeled total payments plus fees by $157,515 relative to the remaining 25-year schedule. Because there is no monthly-saving break-even, the result panel reports the full-schedule comparison instead.</p>`,
    },
    {
      q: "How can I compare a quote advertised as no-cost?",
      aHtml: `<p>Use the rate and cash-to-close figures from that quote as one scenario, then compare them with the disclosed rate and fees of the alternative. Lender credits and pricing structures vary, so the label alone does not show where the cost sits. The calculator compares only the rate, term and fee amounts entered.</p>`,
    },
    {
      q: "Should I roll the closing costs into the new loan?",
      aHtml: `<p>Rolling $5,000 into a 6.25% 25-year loan costs about $33/month and roughly $4,895 of interest on top of the fees themselves over the full term. It preserves your cash, which matters if reserves are thin, so just include the rolled amount mentally when reading the lifetime comparison, since financed fees compound unnoticed.</p>`,
    },
  ],
};
