export default {
  slug: "investment-calculator",
  category: "investment",
  title: "Investment Calculator",
  h1: "Investment Calculator",
  metaTitle: "Investment Calculator — Growth Projection with Inflation Adjustment",
  metaDescription:
    "Project an investment's growth from an initial amount and monthly contributions — in both future currency and today's purchasing power, with a year-by-year table.",
  tagline:
    "Project what an initial amount plus monthly investing could grow into — and what that number is really worth once inflation is taken into account.",
  cardDescription: "Growth projection with monthly contributions and inflation-adjusted results.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: true,
  featured: true,
  jumpExplainLabel: "Nominal vs real",
  aliases: ["invest", "portfolio growth", "wealth"],
  keywords: ["investment growth", "inflation adjusted", "real return", "monthly investing", "projection"],
  related: ["compound-interest-calculator", "sip-calculator", "monthly-investment-calculator", "lump-sum-investment-calculator", "roi-calculator", "future-value-calculator"],
  sections: {
    howToHtml: `
      <p>Enter what you're starting with, what you'll add monthly, the average annual return you want to model, and your time horizon. The inflation field is what makes this calculator different from a plain growth tool: it converts the headline result into today's purchasing power, so a goal like "enough for a house deposit in 10 years" stays honest.</p>
      <ul>
        <li><strong>Expected annual return</strong> — an assumption, not a promise. A practical approach is to run the calculation three times (for example 5%, 7% and 9%) and check your plan works at the lowest one. The scenario tool below the results is built for exactly this comparison.</li>
        <li><strong>Expected inflation</strong> — many central banks target about 2–3%; the long-run historical average in the US is a little over 3%.</li>
      </ul>
      <p>The chart shows three lines: the projected balance, the amount you actually contributed, and the balance restated in today's money. The gap between the first and last line is what inflation quietly takes.</p>`,
    explanationHtml: `
      <h2>Nominal growth vs real growth</h2>
      <p>Most investment projections show <strong>nominal</strong> values — the number that would appear on your statement. But a statement balance decades from now buys less per unit than money does today. The <strong>real</strong> value answers the question you actually care about: what is this worth in today's prices?</p>
      <p>The difference is large over long horizons. In the default example — $10,000 up front plus $500/month at 8% for 25 years — the nominal projection is <strong>$548,915</strong>. At 3% inflation, that balance buys what <strong>$262,165</strong> buys today: less than half the headline figure. Neither number is wrong; they answer different questions. Use nominal values to compare against future account statements, and real values to decide whether the plan actually meets your goal.</p>
      <p>The connection between the two is the <strong>real rate of return</strong>: approximately the nominal return minus inflation, precisely (1 + nominal) ÷ (1 + inflation) − 1. An 8% return during 3% inflation is a 4.85% real return — and that 4.85% is what genuinely grows your wealth. This is also why keeping long-term money in accounts paying below inflation loses purchasing power even while the balance rises.</p>
      <p>One more honest framing this page enforces: the return you enter is an <em>average</em>. Markets don't deliver their average smoothly — they overshoot and undershoot it year by year. A projection like this is a planning centerline, not a path your balance will actually trace.</p>`,
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
      <p>Returns compound monthly in this model, matching how most people contribute. Entering an annually-compounded return figure changes the result by well under 1% — far less than the uncertainty in the return assumption itself.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $10,000 + $500/month at 8% for 25 years, 3% inflation</div><div class="ex-body">
        <p>Monthly rate i = 0.08 ÷ 12 = 0.006667; n = 300 months.</p>
        <p>Lump sum part: 10,000 × (1.006667)<sup>300</sup> ≈ $73,402. Contribution part: 500 × [(1.006667)<sup>300</sup> − 1] ÷ 0.006667 ≈ $475,513.</p>
        <p>Nominal total ≈ <strong>$548,915</strong>, of which $160,000 is money you put in and <strong>$388,915 is growth</strong>.</p>
        <p>Real value: 548,915 ÷ (1.03)<sup>25</sup> = 548,915 ÷ 2.0938 ≈ <strong>$262,165 in today's money</strong>. Inflation consumed more than the entire amount you contributed — which is exactly why long-horizon planning should use real numbers.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The return assumption dominates everything.</strong> The same inputs at 6% instead of 8% project $412k nominal — a 25% smaller outcome from a 2-point change. Treat the return as the uncertainty, not the answer.</li>
        <li><strong>Time horizon.</strong> Growth is back-loaded: in the example, the final 5 years add more than the first 12 combined. Delaying the start is the most expensive change you can make.</li>
        <li><strong>Contribution level.</strong> Doubling the monthly amount roughly doubles the annuity part of the result — and unlike returns, contributions are fully under your control.</li>
        <li><strong>Inflation.</strong> Doesn't change the statement balance, but changes what it's worth: at 4% instead of 3%, the example's real value drops from $262k to about $206k.</li>
        <li><strong>Fees and taxes</strong> act as a direct reduction of the return: a 1% annual fee turns 8% into 7% with all the compounding consequences above.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Uses a <strong>constant average return</strong> — real portfolios experience variable returns, and the order of good and bad years matters when you're adding or withdrawing money (sequence risk). The projection is a planning estimate, not a forecast.</li>
        <li>Results are <strong>before investment fees and taxes</strong> unless you net them out of the return you enter.</li>
        <li>Contributions are modeled as fixed monthly amounts; rising contributions (say, with salary) will outperform this projection — the <a href="/sip-calculator/">SIP Calculator</a> supports annual step-ups.</li>
        <li>Inflation is applied as a constant; actual inflation varies year to year.</li>
        <li>Nothing here is investment advice or a recommendation of any product — it's arithmetic on assumptions you choose.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What return should I enter?",
      aHtml: `<p>That's a judgement, not a fact — which is why the field is yours to set. Commonly cited reference points: long-run diversified stock-market returns of roughly 7–10% nominal before fees, bonds meaningfully lower, savings accounts around or below inflation. Whatever you choose, test the downside: if the plan only works at 10%, it isn't much of a plan.</p>`,
    },
    {
      q: "Why is the 'in today's money' number so much smaller?",
      aHtml: `<p>Because inflation compounds too. At 3% a year, prices roughly double every 24 years, so a 25-year projection is haircut by half. The real-value line isn't pessimism — it's the same number expressed in units that mean something to you now. If the real value meets your goal, the plan works regardless of what prices do to the nominal figure.</p>`,
    },
    {
      q: "Should I invest a lump sum immediately or spread it monthly?",
      aHtml: `<p>Mathematically, money invested earlier compounds longer, so a lump sum invested now beats drip-feeding it <em>on average</em>. Spreading purchases (dollar-cost averaging) reduces the regret of investing right before a fall and suits money that arrives monthly anyway. See the <a href="/lump-sum-investment-calculator/">Lump Sum Calculator</a> and our guide on <a href="/guides/lump-sum-vs-monthly-investing/">lump sum vs monthly investing</a> to compare both with your numbers.</p>`,
    },
    {
      q: "How do fees change the projection?",
      aHtml: `<p>Subtract them from the return before entering it. A fund charging 1% annually turns an 8% gross return into 7% net — which on the default example costs about $84,000 of the 25-year result. Percentage fees are the quietest large number in investing; always model them.</p>`,
    },
    {
      q: "Can I model retirement withdrawals with this?",
      aHtml: `<p>Not directly — this calculator only models the accumulation phase. A withdrawal plan involves the opposite math (drawing down while the remainder grows) plus sequence-of-returns risk, which needs different treatment. Set a realistic accumulation target here first; retirement-specific tools are on our roadmap.</p>`,
    },
  ],
};
