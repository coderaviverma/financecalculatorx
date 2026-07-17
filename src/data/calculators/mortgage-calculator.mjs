export default {
  slug: "mortgage-calculator",
  category: "mortgage",
  title: "Mortgage Calculator",
  h1: "Mortgage Calculator",
  metaTitle: "Mortgage Calculator — Monthly Payment with Taxes, Insurance & PMI",
  metaDescription:
    "Estimate your true monthly mortgage payment: principal and interest plus property tax, home insurance, PMI and HOA — with a full amortization schedule.",
  tagline:
    "Estimate the complete monthly cost of a home loan — principal, interest, property tax, insurance, PMI and HOA — not just the payment lenders advertise.",
  cardDescription: "True monthly payment including tax, insurance, PMI and HOA, plus amortization.",
  lastReviewed: "2026-07-12",
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
        <li><strong>PMI</strong> appears automatically when your down payment is below 20%. Typical private mortgage insurance runs 0.3%–1.5% of the loan per year; the calculator also estimates when it drops off.</li>
        <li><strong>HOA / society fees</strong>: monthly dues, if the property has them.</li>
      </ul>
      <p>The donut chart splits the monthly payment into its parts, and the amortization table shows every payment to the last cent. Use the scenario tool to compare, say, a 30-year against a 15-year term with your real numbers.</p>`,
    explanationHtml: `
      <h2>The payment is more than the loan</h2>
      <p>Advertised mortgage payments are usually just <strong>principal and interest (P&amp;I)</strong> — the amount that actually repays the loan. What you'll transfer to the lender each month is often 20–40% higher, because most lenders collect property tax and insurance into an escrow account alongside the loan payment, plus PMI if your equity is under 20%. This calculator estimates that complete figure, sometimes called <strong>PITI</strong> (principal, interest, taxes, insurance).</p>
      <p>The P&amp;I portion follows standard amortization: interest accrues monthly on the remaining balance, so early payments are interest-heavy and the balance falls slowly at first. On a $280,000 loan at 6.5% over 30 years, the first payment of $1,769.79 includes $1,516.67 of interest and only $253.12 of principal. It takes until roughly year 19 before more than half of each payment goes to principal. That lag is why extra payments and shorter terms make such a dramatic difference to total cost.</p>
      <p><strong>PMI (private mortgage insurance)</strong> deserves special attention. It protects the lender, not you, and is charged when the loan exceeds 80% of the home's value. On this calculator, PMI is estimated from your entered rate and automatically ends at the month the scheduled balance reaches 80% of the purchase price. With most US lenders you can request cancellation at that point, and it must end automatically at 78%.</p>
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
        <li><strong>Rate.</strong> On a $280,000 30-year loan, each 0.5% of rate is roughly $90–95/month and about $33,000–34,000 of lifetime interest. Rate-shopping between lenders is usually worth more than any other single negotiation.</li>
        <li><strong>Term.</strong> 15-year loans carry lower rates and less than half the total interest of a 30-year, at the cost of a much higher required payment. A 30-year loan with voluntary extra payments is the flexible middle ground: $200/month extra on the example above saves about $101,283 and finishes 7¼ years early.</li>
        <li><strong>Down payment.</strong> More down means a smaller loan, a lower payment and, once you reach 20%, no PMI. Below 20%, PMI adds a recurring cost that buys you nothing as a borrower.</li>
        <li><strong>Location-driven costs.</strong> Property tax ranges from under 0.3% to over 2% of home value per year depending on region, and insurance varies with local risk. These often matter more than small rate differences when comparing homes in different areas.</li>
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
      </ul>`,
  },
  faq: [
    {
      q: "What credit and income do lenders check against this payment?",
      aHtml: `<p>Lenders compare the full payment (including tax, insurance and PMI) to your gross monthly income, commonly capping it near 28%, and your total debt obligations near 36–43%. This calculator tells you the payment for a given house; the <a href="/house-affordability-calculator/">House Affordability Calculator</a> works the other way, from your income to a price range.</p>`,
    },
    {
      q: "How accurate is the PMI estimate?",
      aHtml: `<p>It's a reasonable planning figure, not a quote. Actual PMI rates depend on credit score, loan-to-value, loan term and insurer, typically landing between 0.3% and 1.5% of the loan annually. The drop-off month here follows the scheduled balance; paying extra principal or a rising home value can end PMI sooner (some lenders require a new appraisal for value-based removal).</p>`,
    },
    {
      q: "Why does so little of my early payment reduce the balance?",
      aHtml: `<p>Interest is charged on the outstanding balance, which is at its maximum at the start. At 6.5% on $280,000, the first month accrues about $1,517 of interest, so only ~$253 of a $1,770 payment can go to principal. As the balance falls the split improves; the amortization table shows the exact crossover for your inputs. This is also why extra payments made early save the most.</p>`,
    },
    {
      q: "Should I escrow taxes and insurance or pay them myself?",
      aHtml: `<p>Escrow spreads the cost into your monthly payment and most lenders require it above 80% LTV. Paying directly gives you control of the cash until bills are due but requires discipline for large lump sums. Either way the annual cost is identical. The choice is about cash-flow management, and it doesn't change anything this calculator computes.</p>`,
    },
    {
      q: "Does the calculator work outside the US?",
      aHtml: `<p>The amortization math is universal for fixed-rate repayment mortgages, and you can switch the display currency in the header. PMI is a US concept; in other markets the equivalent is a lender's insurance premium or simply a higher rate above certain LTVs. Set the PMI field to 0 there and add any local recurring charges under HOA/society fees.</p>`,
    },
  ],
};
