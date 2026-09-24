export default {
  slug: "investment-calculator",
  category: "investment",
  title: "Investment Calculator",
  h1: "Investment Calculator",
  metaTitle: "Investment Calculator — Growth Projection with Inflation Adjustment",
  metaDescription:
    "Project an investment's growth from an initial amount and monthly contributions — in both future currency and today's purchasing power, with a year-by-year table.",
  tagline:
    "Project an initial investment and monthly contributions, then view the result before and after an inflation adjustment.",
  cardDescription: "Growth projection with monthly contributions and inflation-adjusted results.",
  lastReviewed: "2026-09-24",
  version: "1.1",
  popular: true,
  featured: true,
  jumpExplainLabel: "Nominal vs real",
  aliases: ["invest", "portfolio growth", "wealth"],
  keywords: ["investment growth", "inflation adjusted", "real return", "monthly investing", "projection"],
  related: ["compound-interest-calculator", "sip-calculator", "monthly-investment-calculator", "lump-sum-investment-calculator", "roi-calculator", "future-value-calculator"],
  sections: {
    howToHtml: `
      <p>Give the calculator what you're starting with, what you'll add monthly, the average annual return you want to model, and your time horizon. The inflation field is what makes this calculator different from a plain growth tool: it converts the headline result into today's purchasing power, so a goal like "enough for a house deposit in 10 years" stays honest.</p>
      <ul>
        <li><strong>Expected annual return</strong>: an assumption, not a promise. The scenario tool can compare, for example, 5%, 7% and 9% without assigning a probability to any of them.</li>
        <li><strong>Expected inflation</strong>: use a planning assumption appropriate to the currency, horizon and goal, then test a higher rate to see how sensitive the real value is.</li>
      </ul>
      <p>The chart shows three lines: the projected balance, the amount you put in yourself, and the balance restated in today's money. The gap between the first and last line is what inflation costs you.</p>`,
    explanationHtml: `
      <h2>Nominal growth vs real growth</h2>
      <p>Most investment projections show <strong>nominal</strong> values, the number that would appear on your statement. But a statement balance decades from now buys less per unit than money does today. The <strong>real</strong> value answers the question that matters: what is this worth in today's prices?</p>
      <p>The difference is large over long horizons. In the default example ($10,000 up front plus $500/month at 8% for 25 years), the nominal projection is <strong>$548,915</strong>. At 3% inflation, that balance buys what <strong>$262,165</strong> buys today: less than half the headline figure. Neither number is wrong; they answer different questions. Use nominal values to compare against future account statements, and real values to judge whether the plan meets your goal.</p>
      <p>The <strong>real annual return</strong> uses the effective annual growth rate from the same monthly compounding as the balance projection: (1 + r/12)<sup>12</sup> ÷ (1 + inflation) − 1. The default 8% nominal rate compounds to 8.300% effective annual growth; with 3% inflation, the real annual rate is <strong>5.15%</strong>. An 8% effective annual return would instead imply 4.85%, but that is a different rate convention. The rate display was corrected on 24 September 2026; projected balances use the same monthly-compounding model as before.</p>
      <p>One more framing this page enforces: the return you enter is an <em>average</em>. Markets don't deliver their average smoothly; they overshoot and undershoot it year by year. A projection like this is a planning centerline, not a path your balance will actually trace.</p>`,
    formulaHtml: `
      <p>The nominal projection combines lump-sum growth and an ordinary annuity of monthly contributions:</p>
      <div class="formula-block"><span class="fx">FV = P(1 + i)<sup>n</sup> + C × [(1 + i)<sup>n</sup> − 1] ⁄ i</span>
        <ul class="formula-vars">
          <li><code>P</code> initial investment; <code>C</code> monthly contribution (end of month)</li>
          <li><code>i</code> monthly rate = annual return ÷ 12; <code>n</code> months</li>
        </ul>
      </div>
      <p>The real (inflation-adjusted) value deflates the nominal result by cumulative inflation:</p>
      <div class="formula-block"><span class="fx">Real FV = FV ÷ (1 + f)<sup>t</sup></span>
        <ul class="formula-vars">
          <li><code>f</code> annual inflation rate; <code>t</code> years</li>
        </ul>
      </div>
      <p>Returns compound monthly in this model, matching how most people contribute. Entering an annually-compounded return figure changes the result by well under 1%, far less than the uncertainty in the return assumption itself.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $10,000 + $500/month at 8% for 25 years, 3% inflation</div><div class="ex-body">
        <p>Monthly rate i = 0.08 ÷ 12 = 0.006667; n = 300 months.</p>
        <p>Lump sum part: 10,000 × (1.006667)<sup>300</sup> ≈ $73,402. Contribution part: 500 × [(1.006667)<sup>300</sup> − 1] ÷ 0.006667 ≈ $475,513.</p>
        <p>Nominal total ≈ <strong>$548,915</strong>, of which $160,000 is money you put in and <strong>$388,915 is growth</strong>.</p>
        <p>Real value: 548,915 ÷ (1.03)<sup>25</sup> = 548,915 ÷ 2.0938 ≈ <strong>$262,165 in today's money</strong>. The real balance discounts the final value into today's purchasing power. It does not subtract inflation as a cash fee or compare all contributions as though they were made today.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Return assumption.</strong> The same inputs at 6% instead of 8% project $412k nominal, a 25% smaller result from a two-point change.</li>
        <li><strong>Time horizon.</strong> Growth is back-loaded in the constant-return example: the final 5 years add more than the first 12 combined.</li>
        <li><strong>Contribution level.</strong> Doubling the monthly amount roughly doubles the annuity part of the result — and unlike returns, contributions are fully under your control.</li>
        <li><strong>Inflation.</strong> Doesn't change the statement balance, but changes what it's worth: at 4% instead of 3%, the example's real value drops from $262k to about $206k.</li>
        <li><strong>Fees and taxes</strong> act as a direct reduction of the return: a 1% annual fee turns 8% into 7% with all the compounding consequences above.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Uses a <strong>constant average return</strong>. Real portfolios experience variable returns, and the order of good and bad years matters when you're adding or withdrawing money (sequence risk). The projection is a planning estimate, not a forecast.</li>
        <li>Results are <strong>before investment fees and taxes</strong> unless you net them out of the return you enter.</li>
        <li>Contributions are modeled as fixed monthly amounts; rising contributions (say, with salary) will outperform this projection — the <a href="/sip-calculator/">SIP Calculator</a> supports annual step-ups.</li>
        <li>Inflation is applied as a constant; actual inflation varies year to year.</li>
        <li>Nothing here is investment advice or a recommendation of any product — it's arithmetic on assumptions you choose.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What return should I enter?",
      aHtml: `<p>The calculator does not supply an expected return. Enter a documented assumption for the asset or account being modeled and compare it with lower and 0% cases. Historical performance and a constant-rate projection do not establish what a future holding period will deliver.</p>`,
    },
    {
      q: "Why is the 'in today's money' number so much smaller?",
      aHtml: `<p>Because the price-level assumption compounds too. At 3% annual inflation, dividing the default 25-year balance by 1.03<sup>25</sup> changes $548,915 into about $262,165 in today's purchasing power. That result depends on both the constant return and inflation assumptions; it does not establish whether a real plan will meet a future goal.</p>`,
    },
    {
      q: "Should I invest a lump sum immediately or spread it monthly?",
      aHtml: `<p>At any positive assumed return, money invested earlier compounds longer, so this model always scores an immediate lump sum higher than drip-feeding it, though a real market can fall right after you invest. Money available today and money received monthly are different cash-flow scenarios. The constant-return model does not estimate regret, market timing or the probability of a loss. See the <a href="/lump-sum-investment-calculator/">Lump Sum Calculator</a> and our guide on <a href="/guides/lump-sum-vs-monthly-investing/">lump sum vs monthly investing</a> to compare both with your numbers.</p>`,
    },
    {
      q: "How do fees change the projection?",
      aHtml: `<p>The tool has no separate fee field, so a net-return scenario can subtract an entered recurring percentage cost from the gross assumption. Changing 8% to 7% lowers the default 25-year projection by about $84,000. Transaction fees and taxes may not be equivalent to a constant annual reduction and need separate treatment.</p>`,
    },
    {
      q: "Can I model retirement withdrawals with this?",
      aHtml: `<p>Not directly: this calculator only models the accumulation phase. A withdrawal plan involves the opposite math (drawing down while the remainder grows) plus sequence-of-returns risk, which needs different treatment. Set a realistic accumulation target here first; retirement-specific tools are on our roadmap.</p>`,
    },
  ],
};
