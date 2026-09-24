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
  lastReviewed: "2026-09-24",
  version: "1.1",
  popular: false,
  featured: false,
  aliases: ["refi calculator", "mortgage refinance", "rate and term refinance"],
  keywords: ["refinance", "break-even", "closing costs", "term reset", "monthly savings", "lifetime cost"],
  related: ["mortgage-payoff-calculator", "mortgage-payment-calculator", "mortgage-calculator", "loan-comparison-calculator", "mortgage-amortization-calculator"],
  jurisdiction: "The amortization comparison is jurisdiction-neutral. Closing costs, prepayment charges, disclosures, taxes and refinancing rules are not supplied by the calculator; enter quoted costs and check the existing and proposed loan documents.",
  jumpExplainLabel: "The two refinance wins",
  sections: {
    howToHtml: `
      <p>Describe your existing loan from the latest statement (balance, rate, and time left), then the offer on the table: new rate, new term, and the cash closing costs from the offer (for a US mortgage, the Loan Estimate).</p>
      <ul>
        <li><strong>New term</strong>: try matching your remaining time first (the cleanest comparison), then the shorter and longer options. The lifetime row in the table is where term choices show their teeth.</li>
        <li><strong>Closing costs.</strong> Enter fees paid separately in cash. This model keeps the new principal equal to the current balance, so it does not model costs rolled into the loan. For a quote with lender credits, use the disclosed net fees and the quoted rate.</li>
        <li>Watch both headline numbers: the monthly change <em>and</em> the lifetime difference. A refinance can improve one while worsening the other.</li>
      </ul>
      <p>Set the sale or payoff month and open the exit table to compare payments already made, remaining principal and cash fees at the same date. The full-term table remains available for loans held until maturity.</p>`,
    explanationHtml: `
      <h2>Rate changes, term changes and their trade-off</h2>
      <p>A refinance can pay off through the <strong>rate</strong> (same debt, cheaper money) or through the <strong>term</strong> (same debt, different schedule), and the two interact in ways that quick quotes gloss over. On the defaults, a <strong>$260,000</strong> balance at <strong>7.25%</strong> with 25 years left costs $1,879.30/month; refinancing to <strong>6.25%</strong> over a fresh 25 years drops the payment to $1,715.14, <strong>$164.16/month saved</strong>. The payment-only recovery of the $5,000 cash fee takes <strong>31 months</strong>, and lifetime cost falls by about <strong>$44,247</strong> including fees. That's the clean rate win: term unchanged, every number improves.</p>
      <p>Now the trap. Take the same 6.25% but stretch to a <strong>30-year</strong> term: the payment falls further, to $1,600.86 (saving $278.44/month), and the break-even shortens to 18 months; everything looks better on the monthly view. But you'd be paying interest for 60 extra months, and lifetime cost <em>rises</em> by about <strong>$17,522</strong> despite the full point of rate improvement. This is the term-reset trap: the payment drop is real, but part of it is just your old loan's principal repayment being deferred and re-billed with interest.</p>
      <p>The opposite move, shortening to 15 years, raises the payment by $350.00/month, so there is no payment break-even. In the modeled full schedules, total payments plus entered fees fall by roughly <strong>$157,515</strong>. The monthly change, fee break-even and full-schedule difference answer different questions and should be read together.</p>
      <p>Payment-only break-even excludes the difference in principal still owed. For a sale, payoff or another refinance, the selected-exit comparison adds that balance back to payments already made and cash fees. It excludes settlement penalties and interest between payment dates.</p>`,
    formulaHtml: `
      <p>Both loans are amortized in full and compared on three axes:</p>
      <div class="formula-block"><span class="fx">Saving = M<sub>old</sub> − M<sub>new</sub> &nbsp;·&nbsp; BreakEven = Fees ÷ Saving &nbsp;·&nbsp; Lifetime Δ = T<sub>old</sub> − (T<sub>new</sub> + Fees)</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly payment from the amortization formula on each loan's rate and term</li>
          <li><code>Fees</code> closing costs of the refinance</li>
          <li><code>T</code> total of all payments over each loan's remaining schedule</li>
        </ul>
      </div>
      <p>Payment-only break-even is rounded up to a whole month and reported only if lower payments recover the cash fee while both schedules are active. A zero fee needs no recovery. It is not an economic break-even: at the selected exit month, compare payments made + remaining principal + cash fees. With the same starting principal, the difference is also the difference in accrued interest plus fees. Investing the upfront fee money, discounting future cash flows and tax effects are outside both comparisons.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $260,000 at 7.25% (25 years left) → 6.25%, $5,000 fees</div><div class="ex-body">
        <p>Payment-only recovery below excludes balances still owed; the exit table accounts for them.</p>
        <p><strong>Same 25-year term:</strong> payment falls from $1,879.30 to $1,715.14 (−$164.16/mo). Break-even = 5,000 ÷ 164.16 ≈ <strong>31 months</strong>. Lifetime: $514,542 + $5,000 vs $563,789 → saves <strong>$44,247</strong>.</p>
        <p><strong>Reset to 30 years:</strong> payment $1,600.86 (−$278.44/mo), break-even just 18 months, but total cost including fees becomes $581,311 vs $563,789: <strong>$17,522 more</strong> despite the lower rate.</p>
        <p><strong>Shorten to 15 years:</strong> payment rises to $2,229.30 (+$350.00/mo), no payment break-even, but lifetime cost drops to $406,274, a saving of <strong>$157,515</strong>.</p>
        <p><strong>Exit after month 60, same 25-year term:</strong> payments plus remaining principal total $350,530.51 on the current loan. The refinance totals $342,560.80 including the $5,000 cash fee, so its modeled exit cost is <strong>$7,969.71 lower</strong>. The payment-only and exit-cost comparisons were clarified on 24 September 2026.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate gap.</strong> The calculator replaces rate-gap rules of thumb with an explicit comparison of entered fees, monthly payment change and expected holding period.</li>
        <li><strong>Term choice.</strong> Matching the remaining term isolates the rate change in this model. A longer term can lower the payment while increasing total scheduled payments; a shorter term can do the reverse.</li>
        <li><strong>Fees and how they're paid.</strong> Fees added to principal accrue interest under the new schedule. A quote marketed as “no cost” may use lender credits or different pricing, so compare its disclosed rate, fees and cash due rather than assuming zero economic cost.</li>
        <li><strong>Time the loan remains open.</strong> Entered fees occur at the start while payment differences accumulate monthly. The selected-exit table includes the remaining principal, which a fee divided by payment-saving calculation omits.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Fees are paid in cash. Financed closing costs, lender credits beyond the entered net fee, opportunity cost and settlement penalties are not calculated.</li>
        <li>Rate-and-term refinances only: cash-out refinancing changes the balance and mixes borrowing with repricing, which needs a different comparison.</li>
        <li>The lifetime figure is nominal: interest avoided in 2045 counts the same as interest avoided next year. Discounting would slightly weaken long-term savings claims.</li>
        <li>Property tax, insurance, escrow movements and mortgage-insurance changes are excluded. Their actual treatment depends on the transaction and jurisdiction.</li>
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
      aHtml: `<p>It is the number of monthly payment differences required to equal the entered closing costs when the new payment is lower. On the defaults, $5,000 divided by $164.16 is about 31 months. It does not compare the balances still owed; the separate exit table does that. It also excludes opportunity cost, taxes, future rate changes and settlement charges, and it is not a recommendation to accept the offer.</p>`,
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
      aHtml: `<p>This calculator does not finance fees: it models the same principal for both loans and adds closing costs as a cash outlay. As a separate illustration, borrowing an extra $5,000 at 6.25% for 25 years adds about $32.98 per month and $4,895.04 in interest. A financed-fee quote needs its actual larger balance and a separate cash-flow comparison; adding the fee only to the cash-cost field does not model it.</p>`,
    },
  ],
};
