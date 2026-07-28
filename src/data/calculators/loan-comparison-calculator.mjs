export default {
  slug: "loan-comparison-calculator",
  category: "loans",
  title: "Loan Comparison Calculator",
  h1: "Loan Comparison Calculator",
  metaTitle: "Loan Comparison Calculator — Two Offers Side by Side",
  metaDescription:
    "Compare two loan offers on the same amount: monthly payment, fees, total cost, effective APR with fees included, and the break-even month between them.",
  tagline:
    "Compare two loan offers on the same amount, including their rates, terms, payments and upfront fees.",
  cardDescription: "Two loan offers compared on payment, total cost, fees and effective APR.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: false,
  featured: true,
  aliases: ["compare loans", "which loan is cheaper", "loan offer comparison"],
  keywords: ["loan comparison", "compare offers", "effective apr", "loan fees", "total cost"],
  related: ["loan-calculator", "refinance-calculator", "personal-loan-calculator", "loan-interest-calculator", "emi-calculator"],
  jumpExplainLabel: "Comparing offers fairly",
  sections: {
    howToHtml: `
      <p>Enter one loan amount. Both offers are priced on it, so every difference in the results comes from the offers themselves. Then fill in each offer's terms:</p>
      <ul>
        <li><strong>Interest rate</strong>: the nominal annual rate each lender quotes.</li>
        <li><strong>Term</strong>: the offers don't have to match, and the verdict flags what a term gap means.</li>
        <li><strong>Upfront fees</strong>: origination, processing, documentation, or any mandatory charge to open the loan.</li>
      </ul>
      <p>You get each offer's payment, total interest, total cost (interest plus fees), an effective APR that folds the fees in, and a verdict naming the cheaper offer — plus the break-even month when a higher-fee offer only wins if you keep the loan long enough.</p>`,
    explanationHtml: `
      <h2>How to put two loan offers on equal footing</h2>
      <p>Loan offers may lead with different numbers: a lower rate, a smaller payment or no upfront fee. Start by putting both offers on the <strong>same amount</strong>, which this calculator does by design. Then compare the modeled <strong>total cost</strong> and <strong>effective APR</strong> alongside the payment. A longer term may lower the monthly amount while increasing the total interest.</p>
      <p>Fees versus rate is the classic trap, and the defaults here show why it needs actual arithmetic. Offer A: 8.9% over 60 months with no fees costs $414.20 a month, $4,851.83 of interest. Offer B: 7.4% with a $500 fee costs $399.81 a month, $3,988.56 of interest, $4,488.56 all-in. B wins by <strong>$363.27</strong> despite the fee, and its effective APR (8.47%) prices the fee into a single comparable number. But the win is conditional: B starts $500 behind on day one and claws it back at $14.39 a month, drawing level only at <strong>month 35</strong>. Repay or refinance before then and the "more expensive" no-fee offer would have been the cheaper choice. A fee is, in effect, prepaid interest, worth paying only if you keep the loan past break-even.</p>
      <p>This tool assumes each entered rate holds for the whole term, so it is not suitable for a teaser or variable-rate offer without additional modeling. Ask each lender for the amount financed, rate type, term, mandatory fees, prepayment terms and applicable cost disclosure in writing. Use those documents to confirm the inputs and any final choice.</p>`,
    formulaHtml: `
      <p>Each offer is amortized normally; the comparison adds two derived figures. Total cost and effective APR are:</p>
      <div class="formula-block"><span class="fx">Total cost = total interest + upfront fees&nbsp;&nbsp;·&nbsp;&nbsp;PV(A, r<sub>eff</sub>, n) = amount − fees</span>
        <ul class="formula-vars">
          <li><code>A</code> the offer's monthly payment, <code>n</code> its term in months</li>
          <li><code>PV</code> present value of the payment stream at monthly rate r<sub>eff</sub> ÷ 12</li>
          <li><code>r<sub>eff</sub></code> effective APR, solved numerically (bisection) since it has no closed form</li>
        </ul>
      </div>
      <p>The effective APR uses the fees-deducted-from-proceeds convention: you repay a payment sized for the full amount but effectively receive only <code>amount − fees</code>, so the APR is the rate that makes those two sides balance. With zero fees it equals the nominal rate. The break-even month is the first <code>m</code> where <code>fees<sub>B</sub> + A<sub>B</sub>·m &lt; fees<sub>A</sub> + A<sub>A</sub>·m</code>: cumulative outlay, with fees counted upfront.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $20,000 at 8.9% with no fees vs 7.4% with a $500 fee, both 60 months</div><div class="ex-body">
        <p>Offer A pays <strong>$414.20</strong>/month; interest totals $4,851.83, and with no fees that is its total cost.</p>
        <p>Offer B pays <strong>$399.81</strong>/month; interest totals $3,988.56, plus the $500 fee → <strong>$4,488.56</strong> all-in. Effective APR: 8.9% for A vs <strong>8.47%</strong> for B.</p>
        <p>Verdict: B is cheaper by <strong>$363.27</strong> — but only after <strong>month 35</strong>, when its $14.39/month payment advantage has repaid the upfront $500. Exit the loan earlier and A wins.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Fee size against the rate gap.</strong> A fee is recovered at the pace of the monthly payment difference; a big fee with a thin rate advantage may never break even inside the term.</li>
        <li><strong>How long you'll really keep the loan.</strong> Planning to sell the car, repay from a bonus, or refinance shifts the verdict toward the low-fee offer regardless of headline rates.</li>
        <li><strong>Term equality.</strong> When terms differ, the longer offer's total cost accrues over more months — check both the totals and how long each payment stays in your budget.</li>
        <li><strong>Rate permanence.</strong> Teaser or variable rates invalidate a fixed-rate comparison; enter the reverting rate, not the promotional one.</li>
        <li><strong>Prepayment terms.</strong> An offer that permits free early repayment is worth more than the same numbers with a penalty attached.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Fees are modeled as paid upfront and, for the effective APR, deducted from proceeds. A lender that finances fees into the balance produces slightly different figures; add financed fees to the amount instead.</li>
        <li>Both rates are assumed fixed for their full terms; teaser periods and variable resets are not modeled.</li>
        <li>Optional add-ons (payment insurance, service plans) are excluded. Include them in fees if they're mandatory to get the rate.</li>
        <li>Exactly two offers are compared; for three or more, run the tool pairwise against the current leader.</li>
        <li>The regulated APR your lender must disclose may use a slightly different convention than the one documented here.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why not just pick the offer with the lower monthly payment?",
      aHtml: `<p>A payment mixes price with time. Stretching the term can reduce the payment while adding months of interest, so the lower-payment offer may cost more overall. The result flags cases where the payment and total-cost comparisons point to different offers.</p>`,
    },
    {
      q: "What does the effective APR in the results mean?",
      aHtml: `<p>It's the rate that makes the payment stream equal what you effectively received — the loan amount minus upfront fees. It converts "7.4% plus $500" into one comparable number (8.47% on the defaults), which is why fee-laden offers can carry a higher effective APR than their advertised rate. With no fees, effective APR and nominal rate coincide.</p>`,
    },
    {
      q: "Which fees should I type in, and which should I ignore?",
      aHtml: `<p>Include every charge you must pay to get the loan: origination, processing, documentation, mandatory broker fees. Exclude genuinely optional extras, but be skeptical: if declining the "optional" insurance changes the offered rate, it isn't optional and belongs in the fee box for that offer.</p>`,
    },
    {
      q: "I might repay the loan early. How does that change the comparison?",
      aHtml: `<p>Early exit favors the low-fee offer. Fees are sunk on day one, while a rate advantage pays out month by month — the break-even month in the verdict marks the crossover. If your likely exit is before it, the low-fee offer comes out cheaper in this model even at a higher rate; after it, the low-rate offer wins and keeps winning.</p>`,
    },
    {
      q: "What should I collect from each lender before comparing?",
      aHtml: `<p>Six things, in writing: the amount financed, the nominal rate and whether it is fixed for the full term, the term in months, every mandatory fee, any prepayment penalty, and the official APR disclosure. Quotes that omit fees or quote "from" rates aren't comparable until pinned down to these numbers.</p>`,
    },
    {
      q: "Can I compare two offers with different terms, like 48 and 72 months?",
      aHtml: `<p>Yes, the math handles it, and the verdict adds a caveat when terms differ. Just read the result in two parts: total cost tells you which loan is cheaper in absolute money, while the payoff-time row reminds you the longer offer occupies your budget for extra years. A shorter, slightly costlier-per-month offer often costs less in total; whether its higher payment fits your budget is a separate question.</p>`,
    },
  ],
};
