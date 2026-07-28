export default {
  slug: "rent-vs-buy-calculator",
  category: "mortgage",
  title: "Rent vs Buy Calculator",
  h1: "Rent vs Buy Calculator",
  metaTitle: "Rent vs Buy Calculator — True Cost Comparison by Year",
  metaDescription:
    "Compare the full 10-year cost of buying against renting — mortgage, taxes, maintenance and selling costs versus rent and invested savings.",
  tagline:
    "Compare the longer-term costs of renting and buying, including ownership costs, home equity and the renter's invested savings.",
  cardDescription: "Net cost of buying vs renting year by year, with break-even and equity at your horizon.",
  scenarioHint: "Save your assumptions as Scenario A, then change one driver — rent growth, appreciation or how long you'll stay — and save Scenario B to see which path wins under each view.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["rent or buy", "should i buy a house", "renting vs owning"],
  keywords: ["rent vs buy", "break-even", "opportunity cost", "home equity", "net cost", "horizon"],
  related: ["house-affordability-calculator", "mortgage-calculator", "down-payment-calculator", "investment-calculator", "refinance-calculator"],
  jurisdiction: "The default property-tax, insurance and transaction-cost assumptions follow US norms. The comparison logic is universal — adjust the tax, closing-cost and selling-cost percentages to match your market for a locally accurate answer.",
  jumpExplainLabel: "The model, step by step",
  sections: {
    howToHtml: `
      <p>Enter the home you'd buy (price, down payment, mortgage rate) and the alternative you'd rent (today's monthly rent). Then set the one input that changes verdicts more than any other: <strong>how long you'll stay</strong>.</p>
      <ul>
        <li>The assumption fields (rent growth, appreciation, property tax, insurance, maintenance, transaction costs and investment return) ship with sensible defaults, so the comparison works immediately; refine them for your market.</li>
        <li><strong>Selling costs</strong> apply when you leave: the model assumes you sell at the horizon, which is what makes short stays expensive for buyers.</li>
        <li><strong>Return on invested cash</strong> is what your down payment would earn if you rented instead, the opportunity cost naive comparisons skip.</li>
      </ul>
      <p>Watch the chart: where the two lines cross is your break-even year. Then stress-test the verdict by nudging appreciation and rent growth a point in each direction.</p>`,
    explanationHtml: `
      <h2>What a fair comparison must include</h2>
      <p>Comparing a mortgage payment to a rent payment tells you almost nothing: the two purchases are different products. The buyer is paying for shelter <em>plus</em> a leveraged asset with heavy transaction costs; the renter is paying for shelter while keeping their capital free to earn elsewhere. A fair comparison must count four things naive ones skip: the <strong>opportunity cost of the down payment</strong> (here $92,000 of upfront cash that could earn 6% invested), <strong>selling costs</strong> when you leave (6% of an appreciated price is a big number), <strong>maintenance and property tax</strong> that scale with the home's value, and <strong>equity recovered</strong> when the buyer sells.</p>
      <p>On the defaults (a <strong>$400,000 home</strong> versus <strong>$1,900/month rent</strong>, staying <strong>10 years</strong>) buying's net cost after selling is <strong>$193,606</strong> and renting's is <strong>$194,718</strong>: buying wins by a slim <strong>$1,112</strong>, with break-even arriving only in <strong>year 10</strong> itself. That's the plain headline: under the default rate and cost assumptions, buying is a long-horizon play in this model.</p>
      <p>The year-by-year table shows why. After one year the buyer is <strong>$36,549 behind</strong> ($53,829 net cost versus $17,280 renting): closing costs are sunk, selling costs would apply to a barely-appreciated home, and almost none of the mortgage payments have touched principal. The gap narrows every year as equity compounds through appreciation and amortization while rent keeps rising 3.5% annually. Stay three years and the buyer is still about $35,029 behind; stay ten and the positions have converged.</p>
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
        <li><strong>Appreciation vs rent growth.</strong> These two rates race each other: appreciation builds the buyer's equity while rent growth punishes the renter. A point of difference either way flips most close verdicts.</li>
        <li><strong>Investment return.</strong> The higher the return your cash could earn elsewhere, the better renting looks. At 6% the renter's $92,000 earns $5,520 in year one alone, and omitting this (as casual comparisons do) systematically flatters buying.</li>
        <li><strong>Rate and price-to-rent.</strong> This home costs 17.5 years of today's rent ($400,000 ÷ $22,800). Markets with lower price-to-rent ratios shift the verdict toward buying at the same mortgage rate.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Tax effects are not modeled: no mortgage-interest deduction for the buyer, no tax on the renter's investment gains. These partially offset, but your bracket and filing status could tilt a close result.</li>
        <li>Rent control, lease renewals and moving costs within the rental world are not modeled; nor are renovations, HOA fees or special assessments for the owner.</li>
        <li>The buyer is assumed to sell at the horizon and pay selling costs then — if you'd keep the home as a rental, the comparison changes fundamentally.</li>
        <li>Fixed 30-year mortgage only, and all growth rates are constant; real markets deliver lumpy years in both directions.</li>
        <li>Lifestyle value (stability, customization, mobility) is deliberately unpriced. The model answers the money question only.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/owning-a-home/" rel="noopener">CFPB: Owning a Home</a> — official guidance on preparation, loan comparison and closing costs referenced by this model's cost assumptions.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why does buying look so bad in the first few years?",
      aHtml: `<p>Three costs land on the buyer immediately: closing costs are sunk on day one, hypothetical selling costs (6% of value) would apply from day one, and early mortgage payments are nearly all interest. On the defaults the buyer's net cost after year one is $53,829 versus $17,280 renting. It takes years of equity growth and rent increases to work off that head start.</p>`,
    },
    {
      q: "What exactly does the break-even year mean?",
      aHtml: `<p>It's the first year in which the cumulative net cost of buying drops to or below the cumulative net cost of renting, including the assumption that the buyer sells that year and pays selling costs. On the defaults it's year 10. If you'd move before it, renting was the cheaper path; after it, buying pulls further ahead each year.</p>`,
    },
    {
      q: "Is the down payment's opportunity cost really that important?",
      aHtml: `<p>Yes. It's the most commonly omitted term. The default buyer parts with $92,000 upfront; invested at 6% that compounds to roughly $164,800 over ten years, so about $72,800 of forgone growth is credited to the renter's side. Comparisons that skip it overstate buying's advantage by exactly that amount.</p>`,
    },
    {
      q: "Does the model assume I sell the house at the end?",
      aHtml: `<p>Yes. Equity is recovered net of selling costs at the horizon, which is what makes the comparison fair, since the renter's investment account is also counted at the horizon. If you'd stay indefinitely, extend the horizon to 30 years: the verdict then reflects a full mortgage payoff and decades of appreciation against ever-rising rent.</p>`,
    },
    {
      q: "Rent here is much cheaper than a mortgage — doesn't that settle it?",
      aHtml: `<p>Not by itself. The mortgage payment builds equity you get back on sale, while rent is pure consumption — but the renter's invested cash earns returns the buyer forgoes. That's why the model compares net costs rather than payments. A $1,900 rent against a $2,023 P&amp;I payment can favor either side depending on horizon, appreciation and returns.</p>`,
    },
  ],
};
