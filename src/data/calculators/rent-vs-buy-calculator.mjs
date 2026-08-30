export default {
  slug: "rent-vs-buy-calculator",
  category: "mortgage",
  title: "Rent vs Buy Calculator",
  h1: "Rent vs Buy Calculator",
  metaTitle: "Rent vs Buy Calculator — Cost Scenarios by Year",
  metaDescription:
    "Compare a 10-year buying scenario with renting — mortgage, taxes, maintenance and selling costs versus rent and assumed investment growth.",
  tagline:
    "Compare the longer-term costs of renting and buying, including ownership costs, home equity and the renter's invested savings.",
  cardDescription: "Net cost of buying vs renting year by year, with break-even and equity at your horizon.",
  scenarioHint: "Save your assumptions as Scenario A, then change one driver — rent growth, appreciation or how long you'll stay — and save Scenario B to see which path wins under each view.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["rent or buy", "should i buy a house", "renting vs owning"],
  keywords: ["rent vs buy", "break-even", "opportunity cost", "home equity", "net cost", "horizon"],
  related: ["house-affordability-calculator", "mortgage-calculator", "down-payment-calculator", "investment-calculator", "refinance-calculator"],
  jurisdiction: "The defaults are illustrative US-dollar inputs, not published market averages. Tax, insurance, transaction costs and financing rules vary by location, so replace every default with figures for the property and market being compared.",
  jumpExplainLabel: "The model, step by step",
  sections: {
    howToHtml: `
      <p>Enter the home price, down payment and mortgage rate for the buying scenario, plus today's rent for the renting scenario. Then set <strong>how long you expect to stay</strong>, because transaction costs are spread across that modeled period.</p>
      <ul>
        <li>The assumption fields contain illustrative placeholders for rent growth, appreciation, property tax, insurance, maintenance, transaction costs and investment return. They are not forecasts or local benchmarks; replace them before relying on the comparison.</li>
        <li><strong>Selling costs</strong> apply when you leave: the model assumes you sell at the horizon, which is what makes short stays expensive for buyers.</li>
        <li><strong>Return on invested cash</strong> is the assumed growth on upfront cash retained by the renter. It is uncertain and can be negative.</li>
      </ul>
      <p>The chart reports the first modeled year in which buying's cumulative net cost is no greater than renting's. Test several appreciation, rent-growth and investment-return assumptions rather than reading that crossing as a forecast.</p>`,
    explanationHtml: `
      <h2>What a fair comparison must include</h2>
      <p>A payment-only comparison omits important cash flows. This model includes the <strong>assumed growth of upfront cash retained by the renter</strong>, <strong>selling costs</strong> if the home is sold at the horizon, <strong>maintenance and property tax</strong>, and <strong>equity recovered</strong> after repaying the mortgage balance. Each percentage is a user-controlled assumption.</p>
      <p>On the illustrative defaults (a <strong>$400,000 home</strong> versus <strong>$1,900/month rent</strong>, staying <strong>10 years</strong>) buying's net cost after selling is <strong>$193,606</strong> and renting's is <strong>$194,718</strong>. The modeled difference is only <strong>$1,112</strong>, with the first crossing in <strong>year 10</strong>. That narrow result is especially sensitive to the return and growth assumptions.</p>
      <p>After one year in the default scenario, buying's modeled net cost is <strong>$36,549 higher</strong> ($53,829 versus $17,280) because the calculation recognizes closing costs and a hypothetical sale while little principal has yet been repaid. Under the fixed default assumptions, the gap narrows over time as the modeled home value, loan balance and rent change. Different paths can narrow, widen or reverse the gap.</p>
      <p>Two honest caveats. First, the verdict is highly sensitive to appreciation and investment-return assumptions, neither of which anyone can predict; treat the result as a scenario, not a forecast. Second, money is not the whole decision: stability, the freedom to renovate, and the option to relocate all have value this model doesn't price.</p>`,
    formulaHtml: `
      <p>Each year the model advances both worlds and computes a net cost for each; this section documents the exact accounting used:</p>
      <div class="formula-block"><span class="fx">BuyNet(Y) = Upfront + Σ Owning − [ Value<sub>Y</sub> × (1 − s%) − Balance<sub>Y</sub> ]</span>
        <ul class="formula-vars">
          <li><code>Upfront</code> = down payment + closing % × price</li>
          <li><code>Owning</code> per year = mortgage payments + tax % × value + insurance + maintenance % × value</li>
          <li><code>Value<sub>Y</sub></code> = price grown at appreciation %; <code>s%</code> = selling costs</li>
          <li><code>Balance<sub>Y</sub></code> = remaining loan from the 30-year amortization schedule</li>
        </ul>
      </div>
      <div class="formula-block"><span class="fx">RentNet(Y) = Σ Rent − [ Upfront × (1 + i%)<sup>Y</sup> − Upfront ]</span>
        <ul class="formula-vars">
          <li><code>Rent</code> grows at the rent-increase rate each year</li>
          <li><code>i%</code> = return the renter earns on the upfront cash they didn't spend</li>
        </ul>
      </div>
      <p>The bracketed term in BuyNet is the equity recovered if you sold in year Y, net of selling costs. Break-even is the first year BuyNet ≤ RentNet. Both sides are nominal (not inflation-adjusted), which is consistent since they're compared against each other in the same year.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $400,000 home vs $1,900 rent, 10-year stay (defaults)</div><div class="ex-body">
        <p>Buyer's upfront: $80,000 down + 3% closing = <strong>$92,000</strong>. Mortgage: $320,000 at 6.5% → <strong>$2,022.62</strong>/month P&amp;I.</p>
        <p>Renter's year 1: 1,900 × 12 = $22,800 of rent, minus $5,520 earned on the $92,000 kept invested at 6% → net <strong>$17,280</strong>. Buyer's year 1 net: <strong>$53,829</strong> — the transaction costs dominate early.</p>
        <p>By year 10 the home is worth $564,240, equity is <strong>$292,956</strong>, and the cumulative nets are $193,606 (buy) vs $194,718 (rent). Break-even lands in <strong>year 10</strong>; buying finishes about <strong>$1,112</strong> ahead.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>How long you stay.</strong> Transaction costs (modeled here as 3% in and 6% out) are spread over the ownership period, so they weigh more heavily on a short stay. With the default inputs, the modeled break-even occurs around year 10.</li>
        <li><strong>Appreciation vs rent growth.</strong> Appreciation increases modeled sale proceeds while rent growth increases cumulative rent. Moving either assumption by one percentage point can change a close result.</li>
        <li><strong>Investment return.</strong> A higher assumed return increases the credit given to the renter's retained upfront cash. At 6%, the model assigns $5,520 of first-year growth to $92,000; that return is an assumption, not guaranteed income.</li>
        <li><strong>Rate and price-to-rent.</strong> The default home price equals 17.5 years of today's rent ($400,000 ÷ $22,800). Changing either the price or rent can materially change the comparison.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Tax effects are not modeled: the calculation includes neither a mortgage-interest deduction nor tax on assumed investment gains. Applicable treatment varies by jurisdiction and taxpayer.</li>
        <li>Rent control, lease renewals and moving costs within the rental world are not modeled; nor are renovations, HOA fees or special assessments for the owner.</li>
        <li>The buyer is assumed to sell at the horizon and pay selling costs then — if you'd keep the home as a rental, the comparison changes fundamentally.</li>
        <li>Fixed 30-year mortgage only, and all growth rates are constant; real markets deliver lumpy years in both directions.</li>
        <li>Lifestyle value (stability, customization, mobility) is deliberately unpriced. The model answers the money question only.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/owning-a-home/" rel="noopener">CFPB: Owning a Home</a> — US homebuyer preparation and loan-comparison resources. The calculator's editable percentages remain illustrative inputs rather than CFPB defaults.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why does buying look so bad in the first few years?",
      aHtml: `<p>The model recognizes closing costs immediately and assumes a sale, including the entered selling-cost percentage, at every displayed horizon. Early scheduled payments also allocate more to interest than later payments. With the defaults, buying's modeled net cost after year one is $53,829 versus $17,280 for renting; changing the sale or growth assumptions changes that gap.</p>`,
    },
    {
      q: "What exactly does the break-even year mean?",
      aHtml: `<p>It is the first displayed year in which the modeled cumulative net cost of buying is no greater than renting, including an assumed sale and selling costs that year. On the defaults it is year 10. The lines can change direction or cross differently when growth, return, financing or cost assumptions change, so the crossing is scenario-specific.</p>`,
    },
    {
      q: "Is the down payment's opportunity cost really that important?",
      aHtml: `<p>Yes. It's the most commonly omitted term. The default buyer parts with $92,000 upfront; invested at 6% that compounds to roughly $164,800 over ten years, so about $72,800 of forgone growth is credited to the renter's side. Comparisons that skip it overstate buying's advantage by exactly that amount.</p>`,
    },
    {
      q: "Does the model assume I sell the house at the end?",
      aHtml: `<p>Yes. The model recovers equity net of the entered selling-cost percentage at the horizon, while also counting the renter's assumed investment balance. Extending the horizon changes the number of mortgage and rent periods, but constant appreciation, rent growth and investment return become less reliable assumptions over longer spans.</p>`,
    },
    {
      q: "Rent here is much cheaper than a mortgage — doesn't that settle it?",
      aHtml: `<p>Not by itself. The mortgage payment builds equity you get back on sale, while rent is pure consumption — but the renter's invested cash earns returns the buyer forgoes. That's why the model compares net costs rather than payments. A $1,900 rent against a $2,023 P&amp;I payment can favor either side depending on horizon, appreciation and returns.</p>`,
    },
  ],
};
