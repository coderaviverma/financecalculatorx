export default {
  slug: "down-payment-calculator",
  category: "mortgage",
  title: "Down Payment Calculator",
  h1: "Down Payment Calculator",
  metaTitle: "Down Payment Calculator — Savings Plan for Your Home",
  metaDescription:
    "Size a down payment, add estimated closing costs, and model a monthly savings runway, including an illustrative US conventional-loan PMI marker.",
  tagline:
    "Work out the down payment and closing-cost cash you may need, then see how long your current saving pace could take.",
  cardDescription: "Cash needed at closing and the savings timeline to reach it, at any down payment percent.",
  scenarioHint: "Save your plan as Scenario A, then try a different down-payment percentage or monthly saving amount and save Scenario B — the comparison shows the change in cash needed and time to ready.",
  lastReviewed: "2026-08-30",
  version: "1.1",
  popular: false,
  featured: false,
  aliases: ["house deposit", "down payment savings", "20 percent down"],
  keywords: ["down payment", "closing costs", "pmi threshold", "savings goal", "cash to close"],
  related: ["house-affordability-calculator", "mortgage-calculator", "savings-calculator", "rent-vs-buy-calculator", "monthly-investment-calculator"],
  jurisdiction: "The 20%-to-avoid-PMI threshold and the default closing-cost estimate follow US conventions. The down-payment and savings-timeline math is universal; adjust the closing-cost percentage to match your market.",
  sections: {
    howToHtml: `
      <p>Set the home price you're targeting and slide the down payment percentage. The cash target updates instantly, including an estimated 3% of the price for closing costs, which is easy to overlook when planning.</p>
      <ul>
        <li><strong>Current savings</strong>: what you've already set aside for the purchase.</li>
        <li><strong>Monthly saving amount</strong>: what you can add each month from here on.</li>
        <li><strong>Interest on savings</strong>: a constant rate assumption for the account holding the funds. The result shows how that assumption changes the runway.</li>
      </ul>
      <p>The options table compares illustrative down-payment tiers from 3% to 25% at your price and marks where PMI may apply under the page's US conventional-loan convention.</p>`,
    explanationHtml: `
      <h2>How much down is actually required</h2>
      <p>For US mortgages, 20% is not a universal minimum down payment. Program rules and eligibility differ, and some conventional and government-backed options permit lower percentages. On many conventional loans, 20% down avoids borrower-paid <strong>private mortgage insurance</strong>; this calculator uses that threshold only as a marker and does not determine program eligibility.</p>
      <p>On the default <strong>$350,000</strong> home, 20% down is <strong>$70,000</strong>. Add roughly <strong>$10,500</strong> of closing costs (estimated at 3% of the price: lender fees, title, escrow, prepaid taxes) and the modeled cash target is <strong>$80,500</strong>. Starting from $20,000 in savings and adding $800/month at 4% interest, that target is about <strong>63 months</strong> away, or five and a quarter years. Without the 4% interest assumption it would take 76 months; the modeled yield trims 13 months off the runway.</p>
      <p>Compare the tiers: 5% down needs <strong>$28,000</strong> of modeled cash (about 10 months away on the same plan) but leaves a $332,500 loan and may involve mortgage insurance. Waiting for 20% takes roughly four additional years under these inputs, while prices, rates and rents may change during that time. Use the table to compare the timing and loan size rather than treating one percentage as the right answer for everyone.</p>
      <p>For a down payment needed on a fixed date, consider how much short-term loss you could tolerate. This calculator models steady interest, not market volatility, so use a rate that matches the savings or deposit product you plan to hold.</p>`,
    formulaHtml: `
      <p>The cash target is assembled first, then the runway is solved from compound growth with monthly deposits:</p>
      <div class="formula-block"><span class="fx">Cash = Price × d% + Price × 3% &nbsp;·&nbsp; S₀(1+r)<sup>n</sup> + A × [(1+r)<sup>n</sup> − 1] ÷ r ≥ Cash</span>
        <ul class="formula-vars">
          <li><code>d%</code> down payment percentage; 3% is the closing-cost assumption</li>
          <li><code>S₀</code> current savings, <code>A</code> monthly saving amount</li>
          <li><code>r</code> monthly interest = savings rate ÷ 12</li>
          <li><code>n</code> months to target — the smallest n satisfying the inequality</li>
        </ul>
      </div>
      <p>The calculator simulates month by month (deposit after interest) and reports the first month the balance reaches the target, then converts it to a calendar date. If your savings already cover the target, the runway is zero and the result reads "Ready now". The loan that results is simply Price − Down.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $350,000 home, 20% down, saving $800/month at 4%</div><div class="ex-body">
        <p>Down payment = 350,000 × 20% = <strong>$70,000</strong>. Closing costs ≈ 350,000 × 3% = <strong>$10,500</strong>. Total cash target = <strong>$80,500</strong>.</p>
        <p>Starting from $20,000: each month the balance grows by 4%/12 and $800 is added. The balance first reaches $80,500 in month <strong>63</strong>, about 5 years 3 months, landing around October 2031 from a July 2026 start.</p>
        <p>The resulting loan is $280,000. At 10% down instead, the target drops to $45,500 (29 months away) and the loan rises to $315,000. A US conventional loan at that percentage may include PMI, which this calculator does not price.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The percentage.</strong> Each 5% of a $350,000 price is $17,500 of cash: on an $800/month plan, roughly 16–19 months of saving per tier, slightly less at each step as interest compounds. The slider makes this trade visible immediately.</li>
        <li><strong>Closing costs.</strong> The CFPB describes US closing costs as typically 2–5% of the purchase price; this tool uses an editable 3% planning assumption. Actual cash due comes from the transaction's disclosures.</li>
        <li><strong>Savings yield.</strong> At 4% on multi-year horizons the interest contribution is material: 13 months faster on the default plan versus earning nothing.</li>
        <li><strong>PMI at under 20%.</strong> This page marks where PMI may apply to a US conventional loan but does not estimate its premium. The CFPB source below explains federal request and automatic-termination rules for covered loans; actual premiums and eligibility come from the loan offer.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Closing costs are a flat 3% planning assumption. Actual costs vary by location, lender, property and loan type; replace the estimate with the itemized figure supplied for your transaction.</li>
        <li>The home price is held constant over the saving runway. A future purchase price may be higher or lower.</li>
        <li>Savings interest is treated as untaxed; applicable taxes vary by account and jurisdiction.</li>
        <li>Program-specific minimums (FHA 3.5%, VA 0%) and first-time-buyer assistance are not modeled; the tiers table uses conventional-loan conventions.</li>
        <li>PMI cost itself isn't computed here; the <a href="/mortgage-calculator/">mortgage calculator</a> prices it into the monthly payment.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/owning-a-home/loan-options/" rel="noopener">CFPB: Loan options</a> — official overview of conventional, FHA, VA and USDA programs and their down-payment characteristics.</li>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/what-kind-of-down-payment-do-i-need-how-does-the-amount-of-down-payment-i-make-affect-the-terms-of-my-mortgage-loan-en-120/" rel="noopener">CFPB: What kind of down payment do I need?</a> — how the down-payment amount affects loan terms and program minimums.</li>
        <li><a href="https://www.va.gov/housing-assistance/home-loans/" rel="noopener">VA: Home loan programs</a> — eligibility for zero-down VA-backed loans.</li>
        <li><a href="https://www.consumerfinance.gov/owning-a-home/prepare/determine-your-down-payment/" rel="noopener">CFPB: Determine your down payment</a> — primary source for the US 2–5% closing-cost planning range used here.</li>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" rel="noopener">CFPB: When can I remove PMI?</a> — the request-at-20%-equity and automatic-termination rules referenced on this page.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Do I really need 20% down to buy a house?",
      aHtml: `<p>No. US loan programs have different minimums and eligibility conditions, as the CFPB and VA sources on this page explain. For many conventional loans, 20% down avoids borrower-paid PMI. The table compares cash and loan amounts at several percentages but does not determine which program or pricing is available to a borrower.</p>`,
    },
    {
      q: "What closing costs should I expect on top of the down payment?",
      aHtml: `<p>The CFPB says US closing costs typically total 2–5% of the purchase price and can include origination, appraisal, title, prepaid tax and insurance items. This calculator uses 3% ($10,500 on the default price) as an editable estimate. Use the itemized Loan Estimate and Closing Disclosure for an actual transaction.</p>`,
    },
    {
      q: "What kind of return does the savings field model?",
      aHtml: `<p>It models a constant monthly-compounded rate with no losses, taxes, fees, rate changes or withdrawal restrictions. That resembles a simplified deposit projection rather than a volatile investment path. Enter a rate from the account being modeled and use 0% as a no-growth comparison.</p>`,
    },
    {
      q: "Is it better to buy sooner with 5% down or wait until I have 20%?",
      aHtml: `<p>On the default plan the difference is about four years of saving. Buying sooner means PMI and a bigger loan, but also starting equity and locking a price; waiting means cheaper financing but four more years of rent and market risk in both directions. Run the <a href="/rent-vs-buy-calculator/">rent vs buy calculator</a> for the waiting years; it's the same trade viewed from the other side.</p>`,
    },
    {
      q: "Does the calculator account for my savings earning interest?",
      aHtml: `<p>Yes. The runway is computed with monthly compounding at the rate you enter, deposits added each month. On the defaults this shortens the path to the $80,500 target from 76 months (no interest) to 63. Set the rate to zero if you'd rather plan without counting on yield.</p>`,
    },
  ],
};
