export default {
  slug: "down-payment-calculator",
  category: "mortgage",
  title: "Down Payment Calculator",
  h1: "Down Payment Calculator",
  metaTitle: "Down Payment Calculator — Savings Plan for Your Home",
  metaDescription:
    "Size your down payment, add estimated closing costs, and get a month-by-month savings runway to your target — plus the PMI threshold at 20%.",
  tagline:
    "Turn a home price and a percentage into a real cash target — down payment plus closing costs — and see exactly how many months of saving stand between you and it.",
  cardDescription: "Cash needed at closing and the savings timeline to reach it, at any down payment percent.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["house deposit", "down payment savings", "20 percent down"],
  keywords: ["down payment", "closing costs", "pmi threshold", "savings goal", "cash to close"],
  related: ["house-affordability-calculator", "mortgage-calculator", "savings-calculator", "rent-vs-buy-calculator", "monthly-investment-calculator"],
  sections: {
    howToHtml: `
      <p>Set the home price you're targeting and slide the down payment percentage. The cash target updates instantly, including an estimated 3% of the price for closing costs, which most first-time buyers forget to plan for.</p>
      <ul>
        <li><strong>Current savings</strong>: what you've already set aside for the purchase.</li>
        <li><strong>Monthly saving amount</strong>: what you can add each month from here on.</li>
        <li><strong>Interest on savings</strong>: the rate your money earns while parked (a high-yield savings account, for instance). It shortens the runway more than you'd think over multi-year horizons.</li>
      </ul>
      <p>The options table compares the standard down payment tiers from 3% to 25% at your price, marking where PMI applies, so you can weigh a faster purchase against a cheaper loan.</p>`,
    explanationHtml: `
      <h2>How much down is actually required</h2>
      <p>The 20% figure is a threshold, not a requirement. Conventional loans commonly go to 3–5% down, FHA to 3.5%, and VA/USDA to zero for eligible borrowers. What 20% buys you is freedom from <strong>private mortgage insurance</strong> and a smaller, cheaper loan, so the real decision is not "can I reach 20%?" but "what does each tier cost me in time, cash and monthly expense?"</p>
      <p>On the default <strong>$350,000</strong> home, 20% down is <strong>$70,000</strong>. Add roughly <strong>$10,500</strong> of closing costs (estimated at 3% of the price: lender fees, title, escrow, prepaid taxes) and the true cash target is <strong>$80,500</strong>. Starting from $20,000 in savings and adding $800/month at 4% interest, that target is about <strong>63 months</strong> away, or five and a quarter years. Without the 4% interest working alongside you it would take 76 months; the yield trims 13 months off the runway.</p>
      <p>Compare the tiers: 5% down needs only <strong>$28,000</strong> of cash (about 10 months away on the same plan) but leaves a $332,500 loan carrying PMI. The gap between buying at 5% and waiting for 20% is roughly four extra years of saving, years in which prices, rates and rents all move. There is no universally right answer; the table gives you the honest trade at your own numbers.</p>
      <p>One planning note: down payment money belongs in boring places. A savings target with a 2–5 year horizon shouldn't ride the stock market. A high-yield savings account or short CDs at today's ~4% keeps the target date reliable, which is exactly what this calculator assumes.</p>`,
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
        <p>The resulting mortgage is $280,000 with no PMI. At 10% down instead, the target drops to $45,500 (29 months away), but the $315,000 loan would carry PMI until 20% equity builds.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The percentage.</strong> Each 5% of a $350,000 price is $17,500 of cash: on an $800/month plan, roughly 16–19 months of saving per tier, slightly less at each step as interest compounds. The slider makes this trade visible immediately.</li>
        <li><strong>Closing costs.</strong> Typically 2–5% of the price; this tool assumes 3%. They're due in cash at the same moment as the down payment, which is why targets that ignore them get missed.</li>
        <li><strong>Savings yield.</strong> At 4% on multi-year horizons the interest contribution is material: 13 months faster on the default plan versus earning nothing.</li>
        <li><strong>PMI at under 20%.</strong> Not a reason to panic: PMI typically runs 0.3–1.5% of the loan yearly and drops off at 20% equity. Sometimes buying sooner with PMI beats renting for four more years, and the <a href="/rent-vs-buy-calculator/">rent vs buy calculator</a> quantifies that.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Closing costs are a flat 3% assumption; actual costs vary by state, lender and loan type (2–5% is the common range). Get a Loan Estimate for real figures.</li>
        <li>The home price is held constant over your saving runway. In rising markets the target moves as you approach it, so consider re-running with an inflated price for long horizons.</li>
        <li>Savings interest is treated as untaxed; in a taxable account your effective rate is somewhat lower.</li>
        <li>Program-specific minimums (FHA 3.5%, VA 0%) and first-time-buyer assistance are not modeled; the tiers table uses conventional-loan conventions.</li>
        <li>PMI cost itself isn't computed here; the <a href="/mortgage-calculator/">mortgage calculator</a> prices it into the monthly payment.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Do I really need 20% down to buy a house?",
      aHtml: `<p>No. Conventional programs accept 3–5% down, FHA takes 3.5%, and VA/USDA lend at 0% to eligible borrowers. 20% is the point where PMI disappears and rates improve slightly. The table on this page shows the cash and loan consequences of each tier at your price, so you can decide with numbers rather than folklore.</p>`,
    },
    {
      q: "What closing costs should I expect on top of the down payment?",
      aHtml: `<p>Lender origination, appraisal, title insurance, escrow deposits and prepaid taxes/insurance run typically 2–5% of the purchase price, due in cash at closing. This calculator assumes 3% ($10,500 on the default price). Sellers sometimes credit part of it in negotiation, and some lenders offer credits in exchange for a higher rate.</p>`,
    },
    {
      q: "Where should down payment savings live while I save?",
      aHtml: `<p>Somewhere boring and liquid: high-yield savings, money market funds or short CDs. Equities are a poor fit for a 2–5 year target with a fixed date, since a 20% drawdown the year you plan to buy would set the plan back years. The interest-rate field models the safe-asset yield precisely because that's the appropriate vehicle.</p>`,
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
