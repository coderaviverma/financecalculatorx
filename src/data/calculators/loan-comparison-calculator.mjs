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
  lastReviewed: "2026-09-24",
  version: "1.2",
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
        <li><strong>Compare early payoff after</strong>: choose a month, then open the exit table to see payments made, remaining principal and upfront fees at that same date.</li>
      </ul>
      <p>Results show each offer's payment, total interest, full-term interest plus fees and fee-adjusted APR. When the lower-cost full-term offer has higher upfront fees, the result also reports the first month its accrued interest savings recover the fee difference. Early-payoff comparisons include remaining principal and exclude settlement charges.</p>`,
    explanationHtml: `
      <h2>How to put two loan offers on equal footing</h2>
      <p>Loan offers may lead with different numbers: a lower rate, a smaller payment or no upfront fee. Start by putting both offers on the <strong>same amount</strong>, which this calculator does by design. Then compare the modeled <strong>total cost</strong> and <strong>effective APR</strong> alongside the payment. A longer term may lower the monthly amount while increasing the total interest.</p>
      <p>The defaults compare $20,000 over 60 months. Offer A at 8.9% with no fee costs $414.20 monthly and $4,851.83 in interest. Offer B at 7.4% with a $500 fee costs $399.81 monthly and $4,488.56 in interest plus fees. B costs <strong>$363.27</strong> less over the full schedule. If both loans are settled after a scheduled payment, B first has the lower payment-plus-payoff outlay at <strong>month 24</strong>, assuming no settlement charges. The remaining principal matters because the two offers repay it at different speeds.</p>
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
      <p>The effective APR uses the fees-deducted-from-proceeds convention: you repay a payment sized for the full amount but effectively receive only <code>amount − fees</code>, so the APR is the rate that makes those two sides balance. With zero fees it equals the nominal rate. For an exit immediately after payment <code>m</code>, <code>exit outlay = payments already made + remaining principal + upfront fees + settlement charges</code>. Both offers start with the same principal, so comparing this outlay with zero settlement charges is equivalent to comparing <code>upfront fees + cumulative interest</code>. The reported break-even is the first month the higher-fee, lower-full-term-cost offer has the lower modeled outlay. Once an offer is paid off, its remaining principal is zero and no further payments accrue.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $20,000 at 8.9% with no fees vs 7.4% with a $500 fee, both 60 months</div><div class="ex-body">
        <p>Offer A pays <strong>$414.20</strong>/month; interest totals $4,851.83, and with no fees that is its total cost.</p>
        <p>Offer B pays <strong>$399.81</strong>/month; interest totals $3,988.56, plus the $500 fee → <strong>$4,488.56</strong> all-in. Effective APR: 8.9% for A vs <strong>8.47%</strong> for B.</p>
        <p>Over the full term, B costs <strong>$363.27</strong> less. Immediately after payment 23, payments plus remaining principal and upfront fees total $22,885.91 for A and $22,886.11 for B: A is lower by $0.20. After payment 24, the totals are $22,984.99 and $22,967.45: B is lower by $17.54. The first early-payoff crossover is therefore <strong>month 24</strong>, with no settlement charges.</p>
        <p>Early-payoff model and example corrected on 24 September 2026; amounts use full-precision calculations rounded for display.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Fee size against the rate gap.</strong> Early-payoff fee recovery depends on accrued interest savings. Payment differences also include principal repayment and cannot establish the cost of settling a loan.</li>
        <li><strong>Holding period.</strong> The selected exit month applies to both offers. The exit table separates payments already made, remaining principal and fees, including when one loan has already ended.</li>
        <li><strong>Term equality.</strong> When terms differ, the longer offer's total cost accrues over more months — check both the totals and how long each payment stays in your budget.</li>
        <li><strong>Rate permanence.</strong> Teaser or variable rates require period-by-period modeling that this calculator does not perform.</li>
        <li><strong>Prepayment terms.</strong> Settlement charges, prepayment penalties and interest between payment dates are excluded and can change the comparison.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Fees are paid separately upfront for the cost comparison and deducted from proceeds for the fee-adjusted APR. Financed fees or different starting balances require a separate model; this calculator uses one original loan amount for both offers.</li>
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
      aHtml: `<p>Enter charges shown as required for the modeled offer, such as disclosed origination, processing, documentation or broker fees. Optional products and fee treatment depend on the offer and disclosure. The calculator's effective APR includes only the single total entered here.</p>`,
    },
    {
      q: "I might repay the loan early. How does that change the comparison?",
      aHtml: `<p>Compare payments already made plus remaining principal, upfront fees and any settlement charges at the same exit date. The calculator assumes settlement charges are zero and reports the first fee-recovery crossover when applicable. In the default example, A is lower by $0.20 after payment 23 and B is lower by $17.54 after payment 24. Different terms or settlement charges can change this pattern; a payment-only comparison omits the balance still owed.</p>`,
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
