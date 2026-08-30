export default {
  slug: "house-affordability-calculator",
  category: "mortgage",
  title: "House Affordability Calculator",
  h1: "House Affordability Calculator",
  metaTitle: "House Affordability Calculator — How Much Home Can I Buy?",
  metaDescription:
    "Work backward from income to a modelled home price using selectable 25/33, 28/36 or 31/43 debt-to-income limits, and see which limit binds.",
  tagline:
    "Start with income, existing debts and a down payment to model a home-price range under adjustable debt-to-income limits.",
  cardDescription: "Home-price scenarios under selectable DTI limits, with the binding calculation named.",
  scenarioHint: "Save your situation as Scenario A, then change income, monthly debts or the lending standard and save Scenario B to see how much house the difference buys.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["how much house can i afford", "home affordability", "dti calculator"],
  keywords: ["affordability", "dti", "28/36 rule", "front-end ratio", "back-end ratio", "home price"],
  related: ["mortgage-calculator", "down-payment-calculator", "mortgage-payment-calculator", "rent-vs-buy-calculator", "budget-calculator"],
  jurisdiction: "The selectable ratio pairs are illustrative US-style model limits, not approval standards. Actual underwriting rules vary by lender, loan program and jurisdiction; this calculator does not predict approval or household comfort.",
  jumpExplainLabel: "How the model converts income to price",
  sections: {
    howToHtml: `
      <p>Fill in gross annual income and the monthly payments on existing debts, then add a down payment and interest-rate assumption. Choose one of three ratio pairs to test:</p>
      <ul>
        <li><strong>Conservative (25/33)</strong> is the label for the lowest pair available in this tool. It creates a smaller modeled payment cap.</li>
        <li><strong>Standard (28/36)</strong> is a commonly discussed US budgeting heuristic, not a universal underwriting rule or approval threshold.</li>
        <li><strong>Aggressive (31/43)</strong> is the label for the highest pair available in this tool. It illustrates sensitivity to larger limits; it does not represent an FHA approval ceiling.</li>
      </ul>
      <p>The tax-and-insurance estimate is subtracted from both modeled payment caps. The result names which calculation binds, housing share or housing plus existing debts, so you can see why the output changed.</p>`,
    explanationHtml: `
      <h2>How the model turns income into a price limit</h2>
      <p>The calculator starts with two hypothetical payment caps based on gross monthly income. The <strong>front-end ratio</strong> limits modeled housing costs (loan payment plus the entered tax and insurance estimate). The <strong>back-end ratio</strong> limits housing costs plus the entered debt payments. The smaller result becomes the principal-and-interest amount used in the home-price calculation.</p>
      <p>Worked through the defaults: <strong>$96,000/year</strong> is $8,000/month gross. The front-end cap allows 28% = $2,240 for housing; subtracting the $350 tax/insurance estimate leaves <strong>$1,890</strong> for principal and interest. The back-end cap allows 36% = $2,880, minus $400 of debts and $350 of tax/insurance = $2,130. The front-end cap is smaller, so it binds: <strong>$1,890/month</strong> is the payment this rule of thumb sizes your loan on. At 6.5% over 30 years that supports a <strong>$299,018</strong> loan; with $40,000 down, a price around <strong>$339,018</strong>.</p>
      <p>The binding cap also identifies which entered quantity controls the scenario. When the front-end calculation binds, changing existing debts alone has no effect until the back-end result becomes smaller. When the back end binds, reducing entered monthly debt raises the modeled room for principal and interest. At the default rate and term, a $100 change in that payment room changes the supported loan by about $15,800.</p>
      <p>The output is a scenario under user-selected ratios, not an approval estimate or spending recommendation. It uses gross income and omits take-home pay, maintenance, utilities, closing costs, future income changes and many underwriting criteria. The difference between two presets measures sensitivity to the ratio assumption only.</p>`,
    formulaHtml: `
      <p>Two caps are computed and the binding (smaller) one sizes the loan:</p>
      <div class="formula-block"><span class="fx">P&amp;I<sub>max</sub> = min( G × f − TI , G × b − D − TI )</span>
        <ul class="formula-vars">
          <li><code>G</code> gross monthly income (annual ÷ 12)</li>
          <li><code>f</code>, <code>b</code> front-end and back-end ratios (e.g. 28%, 36%)</li>
          <li><code>TI</code> monthly property tax + insurance estimate</li>
          <li><code>D</code> monthly payments on existing debts</li>
        </ul>
      </div>
      <p>The loan is then the present value of that payment stream at your rate, which is the amortization formula solved for the principal:</p>
      <div class="formula-block"><span class="fx">Loan = P&amp;I<sub>max</sub> × [1 − (1 + r)<sup>−n</sup>] ÷ r</span></div>
      <p>where <code>r</code> is the monthly rate and <code>n</code> the number of payments. Affordable price = loan + down payment. Note the down payment adds to price dollar-for-dollar but does not change the supportable loan.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $96,000 income, $400 debts, $40,000 down, 6.5%, 30 years</div><div class="ex-body">
        <p>Gross monthly = $8,000. Front-end: 8,000 × 28% − 350 = <strong>$1,890</strong>. Back-end: 8,000 × 36% − 400 − 350 = <strong>$2,130</strong>. Binding cap: front-end, $1,890.</p>
        <p>Loan = 1,890 × [1 − 1.0054167<sup>−360</sup>] ÷ 0.0054167 = <strong>$299,018</strong>. Price = 299,018 + 40,000 = <strong>$339,018</strong>.</p>
        <p>Under the 25/33 preset the same inputs support <strong>$301,048</strong>; under the 31/43 preset, <strong>$376,989</strong>. The roughly $76,000 spread is caused by changing the illustrative ratio limits, not by a change in income or an underwriting decision.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate.</strong> The payment cap is fixed by income, so rate changes hit the price directly: at 5.5% the default inputs afford $372,870; at 7.5%, $310,303. A 2% rate swing moves the budget by about $62,600 with nothing else changing.</li>
        <li><strong>Existing debts.</strong> These change the result only when the back-end calculation binds. A $100 reduction in the entered monthly amount raises the modelled loan by roughly $15,800 at 6.5% over 30 years.</li>
        <li><strong>Down payment.</strong> The entered cash adds to the modelled price dollar-for-dollar. PMI is not calculated here, even if the implied down-payment percentage is below a lender's applicable threshold; use the <a href="/down-payment-calculator/">down payment calculator</a> for a separate PMI scenario.</li>
        <li><strong>Term.</strong> A 15-year term supports a smaller loan for the same payment ($256,965 versus $339,018 on the defaults), trading purchase power for a faster payoff.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Actual underwriting can include credit history, documented income, reserves, loan-program rules and property details that this calculator does not accept as inputs.</li>
        <li>The tax-and-insurance figure is a user estimate. Actual amounts vary by property and location.</li>
        <li>PMI is not added at any down-payment percentage, so the result omits a possible cost in lower-down-payment scenarios.</li>
        <li>The presets are mathematical limits, not approval or comfort ranges. The <a href="/budget-calculator/">budget calculator</a> provides a separate view based on entered spending.</li>
        <li>Assumes a fixed-rate, fully amortizing loan for the present-value step.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" rel="noopener">CFPB: What is a debt-to-income ratio?</a> — the DTI concept behind the front-end/back-end limits this calculator applies.</li>
        <li><a href="https://files.consumerfinance.gov/f/documents/cfpb_ymyg_a-financial-empowerment-toolkit_large-print.pdf" rel="noopener">CFPB: Your Money, Your Goals toolkit</a> — examples of housing and total-debt ratios in US consumer financial education; these do not establish the calculator's three presets as approval standards.</li>
        <li><a href="https://www.consumerfinance.gov/owning-a-home/" rel="noopener">CFPB: Owning a Home</a> — official homebuyer preparation and loan-comparison resources.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What do 28/36 and the other ratio pairs really mean?",
      aHtml: `<p>They are selectable model inputs expressed as percentages of gross monthly income. The first limits housing costs in the calculation; the second limits housing plus entered debt payments. The names distinguish lower, middle and higher presets within this tool. They neither reproduce every loan program nor bracket an applicant's likely approval range.</p>`,
    },
    {
      q: "Front-end vs back-end — which one usually binds?",
      aHtml: `<p>With light debts the front-end (housing share) binds, as in the defaults where $400 of debts still leaves back-end headroom. Once monthly debts exceed the gap between the two ratios times your gross income (8% × $8,000 = $640 here), the back-end takes over. The calculator names the binding cap so you know whether paying off debts would raise your budget.</p>`,
    },
    {
      q: "Why is the affordable price so sensitive to interest rates?",
      aHtml: `<p>Because your payment cap is fixed by income, the rate only changes how much principal that payment can service. At the default inputs the same $1,890/month supports $332,870 of loan at 5.5% but $270,303 at 7.5%. This is the mechanical reason housing budgets shrink when rates rise — no lender discretion involved.</p>`,
    },
    {
      q: "Is the displayed price an approval or spending recommendation?",
      aHtml: `<p>No. It is the price produced by the selected ratio pair, rate, term, down payment and tax-and-insurance estimate. The model excludes maintenance, utilities, closing costs, childcare, savings goals, income volatility and loan-program underwriting. Compare presets to understand sensitivity, then treat the result only as an input to a broader budget and lender review.</p>`,
    },
    {
      q: "Does a bigger down payment let me afford a more expensive house?",
      aHtml: `<p>Within this model, yes: the supported loan remains the same and entered cash adds to the price dollar-for-dollar. The calculator does not adjust its rate or add PMI based on loan-to-value, so any lender-specific pricing or insurance effect must be modeled separately.</p>`,
    },
  ],
};
