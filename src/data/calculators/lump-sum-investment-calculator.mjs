export default {
  slug: "lump-sum-investment-calculator",
  category: "investment",
  title: "Lump Sum Investment Calculator",
  h1: "Lump Sum Investment Calculator",
  metaTitle: "Lump Sum Investment Calculator — One-Time Investment",
  metaDescription:
    "Project a one-time investment's growth at any rate and compounding, with doubling time, inflation-adjusted value and ±2% context lines on the chart.",
  tagline:
    "Model deploying a windfall in one go: the growth multiple, how long money takes to double, and what the result is worth after inflation.",
  cardDescription: "One-time investment growth with doubling time and ±2% rate context.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  jumpExplainLabel: "Deploying a lump sum",
  aliases: ["windfall", "one-time investment", "one shot investment"],
  keywords: ["lump sum investment", "windfall investing", "growth multiple", "rule of 72", "doubling time"],
  related: ["sip-calculator", "investment-calculator", "compound-interest-calculator", "roi-calculator", "present-value-calculator"],
  sections: {
    howToHtml: `
      <p>Enter the one-time amount, the annual return you want to assume, and the holding period. Two options refine the result:</p>
      <ul>
        <li><strong>Compounding</strong> — monthly suits funds and most accounts; yearly suits products quoted as annual effective rates.</li>
        <li><strong>Expected inflation</strong> — optional. Set it and the fourth metric switches from exact doubling time to the maturity value in today's purchasing power.</li>
      </ul>
      <p>The chart deliberately draws three lines: your rate, plus dashed lines two points lower and higher. A single smooth curve looks like a promise; the band is a more truthful picture of a return assumption. The table tracks value, yearly growth and the running multiple — watch how the "growth that year" column accelerates even though the rate never changes.</p>`,
    explanationHtml: `
      <h2>Deploying a lump sum</h2>
      <p>Lump sums arrive in lumps: a bonus, an inheritance, maturing deposit proceeds, a property sale, vested stock. The question is never "should this money be invested" so much as "what does time do to it once it is" — and the answer is a multiple, not a percentage. At an assumed 10% compounded monthly, $100,000 becomes about <strong>$445,392 in 15 years — a 4.45× multiple</strong> ($417,725, or 4.18×, with yearly compounding). The rate feels like the headline, but the multiple is what you retire on.</p>
      <p>The multiple's intuition is doubling. Money at 10% compounded monthly doubles roughly every 7 years — so a 15-year horizon fits a little over two doublings, and 2 × 2 × a bit ≈ 4.45 falls right out. This is also why the year-by-year table looks back-loaded: the default investment gains about $64,500 over its first five years but $174,700 over its last five, at the same unchanging rate, because each doubling operates on a bigger base. Cutting a 15-year plan to 10 doesn't cost a third of the outcome; it costs $174,700 of the ending value.</p>
      <p>The honest complication with lump sums is <strong>sequence risk at the point of entry</strong>. Invested all at once, your entire amount is exposed to whatever the market does next month; staggered in over a year (a SIP-style deployment), a bad first quarter only hits the slice already invested. The math is clear that investing immediately wins on average — the market spends more time rising than falling, and money on the sidelines earns less — but averages are cold comfort in the bad draws. Staggering is best understood as paying a small expected cost to cut regret risk, not as a return strategy. The <a href="/sip-calculator/">SIP Calculator</a> models the staggered pattern, and our <a href="/guides/lump-sum-vs-monthly-investing/">lump sum vs monthly investing guide</a> works through the trade-off properly.</p>
      <p>Finally, mind inflation on long holds. At 3% inflation, the default's $445,392 buys what <strong>$285,880</strong> buys today — still a strong real outcome, but a third smaller than the nominal headline. For a windfall meant to fund something specific years from now, the real figure is the one to plan with.</p>`,
    formulaHtml: `
      <p>One deposit, no additions — the purest compounding case:</p>
      <div class="formula-block"><span class="fx">FV = P × (1 + r ⁄ m)<sup>m·t</sup></span>
        <ul class="formula-vars">
          <li><code>P</code> the one-time investment; <code>t</code> years held</li>
          <li><code>r</code> annual return as a decimal; <code>m</code> compounding periods per year</li>
        </ul>
      </div>
      <p>Doubling time follows directly by solving FV = 2P:</p>
      <div class="formula-block"><span class="fx">t<sub>double</sub> = ln 2 ⁄ [m · ln(1 + r ⁄ m)]</span>
        <ul class="formula-vars">
          <li>with yearly compounding this reduces to ln 2 ⁄ ln(1 + r)</li>
          <li>the Rule of 72 approximates it as 72 ⁄ rate</li>
        </ul>
      </div>
      <p>How good is the Rule of 72? Against exact annual-compounding doubling times computed by this library: at 6% it says 12.0 years (exact 11.90), at 8% both say 9.0 (exact 9.01), at 10% it says 7.2 (exact 7.27), at 12% it says 6.0 (exact 6.12). Tight through the single digits, drifting slightly optimistic above 10%.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: a $100,000 windfall at 10% for 15 years</div><div class="ex-body">
        <p>Monthly rate = 0.10 ⁄ 12 = 0.008333; periods = 180. Growth factor: (1.008333)<sup>180</sup> = 4.45392.</p>
        <p>FV = 100,000 × 4.45392 = <strong>$445,392</strong> — $345,392 of growth on money touched exactly once.</p>
        <p>Milestones from the table: $164,531 at year 5, $270,704 at year 10, $445,392 at year 15 — each five-year block adds more than the one before. And the assumption band matters: the same windfall at 8% ends at $330,692, at 12% it ends at $599,580. The two dashed lines on the chart are that sentence, drawn.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Horizon sets the multiple.</strong> At 10% monthly the default doubles about every 7 years: 4.45× at 15 years came from the time, not from cleverness. The biggest risk to a lump sum plan is usually withdrawing it early.</li>
        <li><strong>The rate assumption is a band.</strong> ±2 points around 10% spans $330,692 to $599,580 at 15 years — a $268,888 range on identical money. Plan against the low line.</li>
        <li><strong>Entry timing.</strong> All-at-once maximizes expected value; staggering over 6–12 months trades a little expected return for less regret in a bad first year. Pick deliberately, then stop second-guessing.</li>
        <li><strong>Inflation and fees</strong> both compound against you: 3% inflation converts the default's 4.45× nominal into 2.86× real, and every 1% of annual fees costs multiples of itself over 15 years.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>A <strong>constant return</strong> is assumed; real markets deliver the average through wild detours, and a lump sum feels every one of them from day one. The ±2% band understates how wide real outcomes can range.</li>
        <li>Results are <strong>pre-tax and pre-fee</strong>; net your expected costs out of the return before entering it.</li>
        <li>No withdrawals or top-ups are modeled — for a lump sum <em>plus</em> ongoing contributions, use the <a href="/compound-interest-calculator/">Compound Interest Calculator</a>.</li>
        <li>Doubling times assume the entered rate holds indefinitely, which no rate does. Treat them as intuition-builders, not schedule commitments.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Should I invest a windfall all at once or spread it out?",
      aHtml: `<p>The evidence says immediate investment wins more often than not — markets rise more than they fall, and staggered money waits in low-yield cash meanwhile. But "wins on average" includes painful losing draws, and abandoning a plan after a bad start costs more than staggering ever would. If a big early loss would make you sell, spread the deployment over 6–12 months via the <a href="/sip-calculator/">SIP Calculator</a>'s pattern and accept the small expected cost as an insurance premium.</p>`,
    },
    {
      q: "How accurate is the Rule of 72?",
      aHtml: `<p>Very, in the range that matters. Library-computed exact doubling times with annual compounding: 11.90 years at 6% (rule says 12.0), 9.01 at 8% (rule: 9.0), 7.27 at 10% (rule: 7.2), 6.12 at 12% (rule: 6.0). With monthly compounding money doubles slightly faster — 6.96 years at 10%. For mental math on any investment pitch, 72 ÷ rate is reliable to within a few months.</p>`,
    },
    {
      q: "What does the growth multiple actually tell me?",
      aHtml: `<p>It's the ending value per unit invested — a horizon-and-rate summary that's easier to compare than either input alone. 4.45× means every $1,000 of the windfall became $4,454. Multiples also expose long-horizon stakes clearly: the difference between 8% and 10% for 15 years reads as "just two points" but is 3.31× versus 4.45× — about a third more money from the same deposit.</p>`,
    },
    {
      q: "Why show the result at rate ±2% instead of just my rate?",
      aHtml: `<p>Because a single projected curve manufactures false confidence. Expected returns are estimates with wide error bars, and 15-year outcomes at 8%, 10% and 12% span $330,692 to $599,580 on the default input. Seeing the band tells you what your plan risks and what it might deliver — if the goal only works on the top line, the plan needs more money or more time, not more optimism.</p>`,
    },
    {
      q: "Does this calculator work for fixed deposits and bonds too?",
      aHtml: `<p>Yes, with the right settings: use the deposit's rate with its actual compounding frequency (yearly or quarterly for many FDs; use yearly if you're given an effective annual yield). For bonds where coupons are paid out rather than reinvested, growth is linear, not compound — the <a href="/simple-interest-calculator/">Simple Interest Calculator</a> models that case and shows the reinvestment gap explicitly.</p>`,
    },
  ],
};
