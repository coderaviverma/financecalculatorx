export default {
  slug: "lump-sum-investment-calculator",
  category: "investment",
  title: "Lump Sum Investment Calculator",
  h1: "Lump Sum Investment Calculator",
  metaTitle: "Lump Sum Investment Calculator — One-Time Investment",
  metaDescription:
    "Project a one-time investment's growth at any rate and compounding, with doubling time, inflation-adjusted value and ±2% context lines on the chart.",
  tagline:
    "Model a one-time investment, including its projected growth, estimated doubling time and inflation-adjusted value.",
  cardDescription: "One-time investment growth with doubling time and ±2% rate context.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: false,
  featured: false,
  jumpExplainLabel: "Deploying a lump sum",
  aliases: ["windfall", "one-time investment", "one shot investment"],
  keywords: ["lump sum investment", "windfall investing", "growth multiple", "rule of 72", "doubling time"],
  related: ["sip-calculator", "investment-calculator", "compound-interest-calculator", "roi-calculator", "present-value-calculator"],
  sections: {
    howToHtml: `
      <p>A single deposit drives this tool: set the one-time amount, the annual return you want to assume, and the holding period. Two options refine the result:</p>
      <ul>
        <li><strong>Compounding</strong>: monthly and yearly apply the selected compounding interval; the scenario or product disclosure defines which interval belongs in the model.</li>
        <li><strong>Expected inflation</strong>: optional. Set it and the fourth metric switches from modeled doubling time to the maturity value in today's purchasing power.</li>
      </ul>
      <p>The chart draws the entered rate and dashed lines two points lower and higher. They are sensitivity cases, not confidence bounds or forecasts. The table tracks modeled value, yearly growth and the running multiple. The <a href="/investment-calculator/">Investment Calculator</a> can also model a one-time amount with contributions set to zero; this page additionally reports modeled doubling time and the ±2-point sensitivity band.</p>`,
    explanationHtml: `
      <h2>Deploying a lump sum</h2>
      <p>A lump sum might come from a bonus, inheritance, maturing deposit, property sale or vested stock. This calculator does not decide whether it should be invested; it shows what one deposit becomes under a return and horizon you choose. At an assumed 10% annual return compounded monthly, $100,000 becomes about <strong>$445,392 in 15 years, a 4.45× multiple</strong> ($417,725, or 4.18×, with yearly compounding).</p>
      <p>The multiple's intuition is doubling. Money at 10% annual return compounded monthly doubles roughly every 7 years, so a 15-year horizon fits a little over two doublings. The default investment gains about $64,500 over its first five years and $174,700 over its last five at the same constant rate because later growth starts from a larger modeled balance. In this example, changing the horizon from 15 to 10 years reduces ending value by about $174,700.</p>
      <p>A market investment made all at once is fully exposed to the next move in prices. A staged purchase exposes the money gradually but leaves part of it waiting, so its result depends on both the market path and the return earned before each purchase. The <a href="/sip-calculator/">SIP Calculator</a> models regular contributions, and the <a href="/guides/lump-sum-vs-monthly-investing/">lump sum vs monthly investing guide</a> explains the trade-off without assuming one path will occur.</p>
      <p>At an assumed 3% inflation rate, the default $445,392 nominal result has modeled present purchasing power of <strong>$285,880</strong>. That result depends on both constant assumptions and is not a forecast or recommendation.</p>`,
    formulaHtml: `
      <p>One deposit and no additions make this the purest compounding case:</p>
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
      <p>Against exact annual-compounding doubling times computed by this library, the Rule of 72 gives 12.0 years at 6% (exact 11.90), 9.0 at 8% (exact 9.01), 7.2 at 10% (exact 7.27), and 6.0 at 12% (exact 6.12). The displayed errors are small through single digits, and the shortcut becomes slightly more optimistic above 10% in these examples.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: a $100,000 windfall at 10% for 15 years</div><div class="ex-body">
        <p>Monthly rate = 0.10 ⁄ 12 = 0.008333; periods = 180. Growth factor: (1.008333)<sup>180</sup> = 4.45392.</p>
        <p>FV = 100,000 × 4.45392 = <strong>$445,392</strong>, including $345,392 of modeled growth.</p>
        <p>Milestones from the table are $164,531 at year 5, $270,704 at year 10 and $445,392 at year 15. The sensitivity band shows $330,692 at 8% and $599,580 at 12%; the chart plots those three scenario results.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Horizon sets the multiple.</strong> At the assumed 10% annual rate, compounded monthly, the default doubles about every 7 years and reaches 4.45× at 15 years. The calculator does not rank withdrawal, market or liquidity risks.</li>
        <li><strong>Rate sensitivity.</strong> The ±2-point cases span $330,692 to $599,580 at 15 years, a $268,888 range on identical money. They show sensitivity only and do not assign probabilities.</li>
        <li><strong>Entry timing.</strong> All-at-once and staged investing have different exposure paths; each can be represented by a defined schedule. Neither constant-return path is evidence about next month's market.</li>
        <li><strong>Inflation and fees.</strong> At 3% inflation, the default 4.45× nominal result becomes 2.86× in today's purchasing power. A simplified fee sensitivity can reduce the entered rate by an assumed annual percentage cost; actual fee timing and tax treatment are not modeled.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>A <strong>constant return</strong> is assumed. A market investment can follow paths far outside the ±2-point sensitivity lines, including losses.</li>
        <li>Results are <strong>pre-tax and pre-fee</strong>. A simplified fee sensitivity can reduce the entered rate by an assumed annual percentage cost; a quoted return may already be net of some fees, and actual fee timing is not modeled.</li>
        <li>No withdrawals or top-ups are modeled. The <a href="/compound-interest-calculator/">Compound Interest Calculator</a> models a lump sum plus ongoing contributions.</li>
        <li>Doubling times assume the entered rate remains constant. Actual rates can vary over time, so the doubling result is not a schedule commitment.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Should I invest a windfall all at once or spread it out?",
      aHtml: `<p>This calculator cannot answer that from a constant return. Investing at once creates full market exposure immediately; a defined staged schedule produces a different exposure path and leaves some money uninvested for longer. Liquidity needs, transaction costs and responses to early losses are outside the calculation. The <a href="/guides/lump-sum-vs-monthly-investing/">companion guide</a> shows both modeled paths.</p>`,
    },
    {
      q: "How accurate is the Rule of 72?",
      aHtml: `<p>In the displayed 6–12% annual-compounding examples, the shortcut is close: 11.90 years at 6% versus 12.0, 9.01 at 8% versus 9.0, 7.27 at 10% versus 7.2, and 6.12 at 12% versus 6.0. Accuracy varies outside that range and the estimate still assumes the rate remains constant.</p>`,
    },
    {
      q: "What does the growth multiple actually tell me?",
      aHtml: `<p>It is the ending value per unit invested under the entered horizon and rate. A 4.45× result means every $1,000 becomes a modeled $4,454. In the 15-year sensitivity examples, 8% produces 3.31× and 10% produces 4.45×, so the latter modeled ending value is about one-third larger from the same deposit.</p>`,
    },
    {
      q: "Why show the result at rate ±2% instead of just my rate?",
      aHtml: `<p>The three lines expose sensitivity to the assumed rate: 15-year results at 8%, 10% and 12% span $330,692 to $599,580 on the default input. They are not confidence bounds and do not describe the probability or full range of market outcomes.</p>`,
    },
    {
      q: "Does this calculator work for fixed deposits and bonds too?",
      aHtml: `<p>The model can represent a fixed deposit when the entered annual rate and compounding frequency match its disclosure. A bond whose coupons are paid rather than reinvested has different cash flows; the <a href="/simple-interest-calculator/">Simple Interest Calculator</a> models a non-reinvested linear case.</p>`,
    },
  ],
};
