export default {
  slug: "mortgage-calculator",
  category: "mortgage",
  title: "Mortgage Calculator",
  h1: "Mortgage Calculator",
  metaTitle: "Mortgage Calculator — Monthly Payment with Taxes, Insurance & PMI",
  metaDescription:
    "Estimate your true monthly mortgage payment: principal and interest plus property tax, home insurance, PMI and HOA — with a full amortization schedule.",
  tagline:
    "Add principal, interest, property tax, insurance, PMI and HOA costs into one monthly home-payment estimate.",
  cardDescription: "True monthly payment including tax, insurance, PMI and HOA, plus amortization.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["home loan", "house payment", "piti"],
  keywords: ["mortgage payment", "home loan", "property tax", "pmi", "piti", "house"],
  related: ["mortgage-payment-calculator", "house-affordability-calculator", "mortgage-amortization-calculator", "down-payment-calculator", "mortgage-payoff-calculator", "refinance-calculator"],
  jurisdiction: "Property tax, home insurance, PMI and HOA fees here follow US mortgage conventions. The principal-and-interest math is universal, but PMI (private mortgage insurance) is specifically a US concept — elsewhere the equivalent is a lender's high loan-to-value premium or a higher rate. Set any line that doesn't apply where you live to 0.",
  sections: {
    howToHtml: `
      <p>Start with the home price and your planned down payment; the difference between them is the loan amount. Add the interest rate you've been quoted and the term (30 years is the default; try 15 to see the trade-off). Then refine the estimate with the costs lenders add to your escrow:</p>
      <ul>
        <li><strong>Property tax</strong>: enter the annual amount. Rates vary widely by location; recent listings or the local assessor's site will show the current figure for a specific property.</li>
        <li><strong>Home insurance</strong>: the annual premium for the dwelling policy.</li>
        <li><strong>PMI</strong> is included in this model when the down payment is below 20%. Enter the rate from a quote if it applies; the calculator estimates when the charge ends under its balance rule.</li>
        <li><strong>HOA / society fees</strong>: monthly dues, if the property has them.</li>
      </ul>
      <p>The donut chart splits the monthly payment into its parts, and the amortization table shows every payment to the last cent. Use the scenario tool to compare, say, a 30-year against a 15-year term with your real numbers.</p>`,
    explanationHtml: `
      <h2>The payment is more than the loan</h2>
      <p>A principal-and-interest quote leaves out costs such as property tax, home insurance, mortgage insurance and association dues. Depending on the loan and location, some of those amounts may be collected through an escrow account and some may be paid separately. This calculator places them in one monthly planning figure so they are not lost beside the loan payment.</p>
      <p>The P&amp;I portion follows standard amortization: interest accrues monthly on the remaining balance, so early payments are interest-heavy and the balance falls slowly at first. On a $280,000 loan at 6.5% over 30 years, the first payment of $1,769.79 includes $1,516.67 of interest and only $253.12 of principal. It takes until roughly year 19 before more than half of each payment goes to principal. That lag is why extra payments and shorter terms make such a dramatic difference to total cost.</p>
      <p><strong>PMI (private mortgage insurance)</strong> protects the lender rather than the borrower. This calculator uses your PMI input while the modeled balance is above 80% of the purchase price, then removes it from the estimate. Real cancellation rules depend on the loan type, payment history, property value and jurisdiction, so check the servicer's requirements instead of treating the modeled end month as a promise.</p>
      <p>Tax and insurance behave differently from the loan itself: they continue after the mortgage is paid off, and they generally rise over time. Treat them as permanent operating costs of the home rather than part of the debt.</p>`,
    formulaHtml: `
      <p>The principal-and-interest payment uses the standard amortization formula:</p>
      <div class="formula-block"><span class="fx">P&amp;I = L × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>L</code> loan amount = home price − down payment</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>n</code> number of monthly payments (30 years = 360)</li>
        </ul>
      </div>
      <p>The complete monthly payment is then assembled as:</p>
      <div class="formula-block"><span class="fx">Total = P&amp;I + Tax⁄12 + Insurance⁄12 + PMI + HOA</span></div>
      <p>PMI per month = loan × PMI rate ÷ 12, applied while the scheduled balance exceeds 80% of the purchase price. The schedule uses monthly compounding on the reducing balance, end-of-month payments, and cent rounding with a final-payment adjustment so the balance closes at zero.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $350,000 home, 20% down, 6.5%, 30 years</div><div class="ex-body">
        <p>Down payment = $70,000, so the loan is <strong>$280,000</strong>. Monthly rate = 0.065 ÷ 12 = 0.0054167; n = 360.</p>
        <p>P&amp;I = 280,000 × 0.0054167 × (1.0054167)<sup>360</sup> ÷ [(1.0054167)<sup>360</sup> − 1] = <strong>$1,769.79</strong>.</p>
        <p>With $3,600/year property tax ($300/mo) and $1,500/year insurance ($125/mo), the full monthly payment is <strong>$2,194.79</strong>. No PMI applies at 20% down.</p>
        <p>Total interest over 30 years: <strong>$357,124.57</strong>, more than the original loan. The same loan over 15 years costs $2,439.10/month in P&amp;I but only $159,038.11 in interest, a saving of about $198,000.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate.</strong> On the $280,000, 30-year example, each 0.5 percentage-point change is roughly $90–95 a month and $33,000–34,000 of modeled lifetime interest.</li>
        <li><strong>Term.</strong> A shorter term raises the required payment and reduces the number of interest-bearing months. Compare that contractual payment with a longer term and a separate voluntary-extra-payment scenario.</li>
        <li><strong>Down payment.</strong> More money down creates a smaller loan. Whether mortgage insurance applies, how it is priced and when it ends depend on the product and lender.</li>
        <li><strong>Location-driven costs.</strong> In the US, effective property tax rates range from under 0.3% to over 2% of home value per year depending on state and county, and insurance varies with local risk. These often matter more than small rate differences when comparing homes in different areas.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Models a <strong>fixed-rate, fully amortizing mortgage</strong>. Adjustable-rate (ARM), interest-only and offset products behave differently and are out of scope.</li>
        <li>PMI is approximated as a constant monthly amount that ends when the scheduled balance reaches 80% of the <em>purchase price</em>; lenders may use appraised value, and actual PMI pricing depends on credit score and loan type.</li>
        <li>Property tax and insurance are entered as flat annual amounts. In reality both tend to rise over time, and reassessments can be significant.</li>
        <li>Closing costs, points, and maintenance are not included here; the <a href="/rent-vs-buy-calculator/">Rent vs Buy Calculator</a> models the broader cost of ownership.</li>
        <li>All figures are planning estimates. The lender's Loan Estimate and closing disclosure are the authoritative numbers for any real offer.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" rel="noopener">CFPB: When can I remove private mortgage insurance (PMI)?</a> — basis for the 80% request / 78% automatic cancellation convention modeled here.</li>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" rel="noopener">CFPB: Interest rate vs APR</a> — why the quoted rate differs from the loan's true annual cost when fees exist.</li>
        <li><a href="https://taxfoundation.org/data/all/state/property-taxes-by-state-county/" rel="noopener">Tax Foundation: Property Taxes by State and County</a> — source for the range of US effective property tax rates noted above.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What credit and income do lenders check against this payment?",
      aHtml: `<p>Underwriting may consider income, existing debts, credit history, cash reserves, property type and the full housing payment. The thresholds and income definitions vary by lender and program. This calculator estimates the payment for a given home; the <a href="/house-affordability-calculator/">House Affordability Calculator</a> lets you test adjustable debt-to-income limits.</p>`,
    },
    {
      q: "How accurate is the PMI estimate?",
      aHtml: `<p>It is a planning input, not a quote. Pricing and cancellation depend on the loan type, credit profile, loan-to-value calculation, insurer and applicable rules. Use the amount from the lender or insurer when available. The modeled end month follows scheduled principal only and may not match the servicer's process.</p>`,
    },
    {
      q: "Why does so little of my early payment reduce the balance?",
      aHtml: `<p>Interest is charged on the outstanding balance, which is at its maximum at the start. At 6.5% on $280,000, the first month accrues about $1,517 of interest, so only ~$253 of a $1,770 payment can go to principal. As the balance falls the split improves; the amortization table shows the exact crossover for your inputs. This is also why extra payments made early save the most.</p>`,
    },
    {
      q: "Should I escrow taxes and insurance or pay them myself?",
      aHtml: `<p>Whether escrow is optional depends on the loan and lender. Escrow spreads estimated tax and insurance amounts across monthly collections, while direct payment leaves you responsible for the bills when due. Estimates can create a later shortage or surplus, so compare the servicer's terms and your ability to manage irregular payments.</p>`,
    },
    {
      q: "Does the calculator work outside the US?",
      aHtml: `<p>The fixed-rate monthly model can be useful outside the US when the loan follows the same convention, and the display currency can be changed in the header. Local accrual rules, insurance, taxes and fees differ. Set non-applicable inputs to zero and compare the assumptions with the lender's schedule.</p>`,
    },
  ],
};
