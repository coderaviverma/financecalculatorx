export default {
  slug: "house-affordability-calculator",
  category: "mortgage",
  title: "House Affordability Calculator",
  h1: "House Affordability Calculator",
  metaTitle: "House Affordability Calculator — How Much Home Can I Buy?",
  metaDescription:
    "Work backward from your income to a realistic home price using the 28/36 rule lenders apply, and see which constraint caps your budget.",
  tagline:
    "Start from your income and debts — the way a lender does — and get the home price the 28/36 debt-to-income rules support, plus what stricter or looser standards would allow.",
  cardDescription: "Home price your income supports under 28/36 DTI rules, with the binding constraint named.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["how much house can i afford", "home affordability", "dti calculator"],
  keywords: ["affordability", "dti", "28/36 rule", "front-end ratio", "back-end ratio", "home price"],
  related: ["mortgage-calculator", "down-payment-calculator", "mortgage-payment-calculator", "rent-vs-buy-calculator", "budget-calculator"],
  jurisdiction: "The 28/36-style debt-to-income limits are US lending guidelines. Other countries use different affordability tests (for example loan-to-income caps or stress tests), so treat the result as a general guide and confirm with a local lender.",
  jumpExplainLabel: "How lenders size loans",
  sections: {
    howToHtml: `
      <p>Fill in your household's gross annual income and the monthly payments on existing debts: car loans, student loans, card minimums. Add the down payment you have available and the rate you expect, then choose a lending standard:</p>
      <ul>
        <li><strong>Conservative (25/33)</strong> is a self-imposed margin many planners recommend.</li>
        <li><strong>Standard (28/36)</strong> uses the classic qualifying ratios for conventional loans.</li>
        <li><strong>Aggressive (31/43)</strong> sits closer to FHA-style ceilings; approval territory, comfort not included.</li>
      </ul>
      <p>The tax + insurance estimate matters more than it looks: every dollar of it comes directly out of the payment available for the loan. The result names which constraint binds you, income share or existing debts, because the fix is different for each.</p>`,
    explanationHtml: `
      <h2>How lenders turn income into a price ceiling</h2>
      <p>Lenders don't start from house prices; they start from two payment caps computed off your gross monthly income. The <strong>front-end ratio</strong> caps total housing costs (loan payment plus tax and insurance) at a share of income: 28% in the standard rule. The <strong>back-end ratio</strong> caps housing costs <em>plus all other debt payments</em> at a larger share, 36%. Your maximum loan payment is whatever survives both caps, and the smaller one wins.</p>
      <p>Worked through the defaults: <strong>$96,000/year</strong> is $8,000/month gross. The front-end cap allows 28% = $2,240 for housing; subtracting the $350 tax/insurance estimate leaves <strong>$1,890</strong> for principal and interest. The back-end cap allows 36% = $2,880, minus $400 of debts and $350 of tax/insurance = $2,130. The front-end cap is smaller, so it binds: <strong>$1,890/month</strong> is the payment a lender will size your loan on. At 6.5% over 30 years that supports a <strong>$299,018</strong> loan; with $40,000 down, a price around <strong>$339,018</strong>.</p>
      <p>Which cap binds tells you what would change your budget. When the front end binds (modest debts), only more income or lower housing costs move the ceiling. When the back end binds (heavier debts), paying off a car loan converts directly into house: each $100/month of debt cleared frees about $15,800 of loan at these terms. Raise the debts field to $1,200 in the calculator and watch the constraint flip and the price drop to $250,420.</p>
      <p>Finally, remember the ceiling is an approval limit, not advice. Lenders qualify you on gross income; you live on net income. The gap between the standard and conservative results, about <strong>$37,971</strong> here, is a reasonable margin for maintenance, retirement savings and life generally.</p>`,
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
        <p>Under the conservative 25/33 standard the same inputs support <strong>$301,048</strong>; under the aggressive 31/43, <strong>$376,989</strong>. The spread between prudent and permissive is about $76,000 on the same income.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate.</strong> The payment cap is fixed by income, so rate changes hit the price directly: at 5.5% the default inputs afford $372,870; at 7.5%, $310,303. A 2% rate swing moves the budget by about $62,600 with nothing else changing.</li>
        <li><strong>Existing debts.</strong> Only matter when the back end binds — but then they matter enormously. Clearing $100/month of minimum payments frees roughly $15,800 of loan at 6.5%/30y.</li>
        <li><strong>Down payment.</strong> Plays two roles: it adds to the price dollar-for-dollar, and at 20%+ it removes PMI, which otherwise consumes part of your housing allowance. Size it with the <a href="/down-payment-calculator/">down payment calculator</a>.</li>
        <li><strong>Term.</strong> A 15-year term supports a smaller loan for the same payment ($256,965 versus $339,018 on the defaults), trading purchase power for a faster payoff.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Real underwriting looks beyond ratios: credit score, employment history, reserves, and property type all move actual approval amounts in both directions.</li>
        <li>The tax + insurance figure is your estimate; lenders use actual property taxes for the specific home, which vary widely by location.</li>
        <li>PMI is not added when the implied down payment is under 20%. It would reduce the affordable price slightly, so treat sub-20%-down results as a touch optimistic.</li>
        <li>Ratios describe approval, not comfort. The <a href="/budget-calculator/">budget calculator</a> starts from your actual spending instead of gross-income rules.</li>
        <li>Assumes a fixed-rate, fully amortizing loan for the present-value step.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What do 28/36 and the other ratio pairs really mean?",
      aHtml: `<p>They're percentage caps on your gross monthly income: the first number limits housing costs (payment, tax, insurance), the second limits housing plus every other debt payment. 28/36 is the long-standing conventional benchmark; 25/33 leaves margin; 31/43 approximates FHA ceilings. Lenders may stretch further with strong credit; the calculator's standards bracket the realistic range.</p>`,
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
      q: "Should I actually buy at the maximum the calculator shows?",
      aHtml: `<p>Usually not. The maximum is what ratios permit on gross income, before maintenance (often 1–2% of home value yearly), childcare, retirement contributions and income volatility. The conservative standard's result is a better default target, and the gap between the two, about $38,000 on the defaults, is your margin of safety.</p>`,
    },
    {
      q: "Does a bigger down payment let me afford a more expensive house?",
      aHtml: `<p>Dollar-for-dollar, yes: the loan the payment supports stays the same, and your cash adds on top. It can also help indirectly: reaching 20% down removes PMI from housing costs, and lower loan-to-value can earn a slightly better rate, both of which expand the loan side too.</p>`,
    },
  ],
};
