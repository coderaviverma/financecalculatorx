export default {
  slug: "roi-calculator",
  category: "investment",
  title: "ROI Calculator",
  h1: "ROI Calculator",
  metaTitle: "ROI Calculator — Total & Annualized Return on Investment",
  metaDescription:
    "Measure total ROI and annualized return (CAGR) after fees and costs, with a comparison across different holding periods.",
  tagline:
    "Calculate total and annualized return after including the costs attached to an investment.",
  cardDescription: "Total and annualized return on a completed or current investment.",
  scenarioHint: "Save one investment's numbers as Scenario A, enter a second investment (or the same one with fees included), then save Scenario B to compare total and annualized returns side by side.",
  lastReviewed: "2026-09-24",
  version: "1.0",
  popular: false,
  featured: false,
  jumpExplainLabel: "ROI vs annualized return",
  aliases: ["return on investment", "CAGR", "investment return"],
  keywords: ["roi", "return on investment", "annualized return", "cagr", "net profit"],
  related: ["lump-sum-investment-calculator", "investment-calculator", "compound-interest-calculator", "present-value-calculator", "savings-calculator"],
  sections: {
    howToHtml: `
      <p>Unlike the projection tools on this site, this one looks <strong>backward</strong>: you already know what went in and what came out, and the job is to measure it properly.</p>
      <ul>
        <li><strong>Amount invested</strong>: the purchase price or capital committed.</li>
        <li><strong>Amount received / current value</strong>: sale proceeds for a closed position, or today's value for an open one.</li>
        <li><strong>Additional costs</strong>: entered fees, commissions and transaction taxes. The calculator adds them to the invested amount.</li>
        <li><strong>Holding period</strong>: how long the money was committed; this converts the raw percentage into an annualized rate.</li>
      </ul>
      <p>The table re-annualizes the same total return over 1, 2, 3, 5 and 10 years. It's worth a look once, because it shows how completely the holding period changes what a "40% gain" means.</p>`,
    explanationHtml: `
      <h2>ROI vs annualized return</h2>
      <p>Return on investment is net profit divided by the amount invested. The default example ($10,000 in and $14,000 back) is a <strong>40% ROI</strong>, but that figure says nothing about <em>time</em>. Earned over three years it is <strong>11.87% per year</strong>; over ten years the same total gain is 3.42% per year. State the holding period whenever you quote ROI.</p>
      <p>The per-year figure is the <strong>annualized return</strong>, or CAGR: the steady compound rate that links the start and end values over the holding period. Dividing 40% by 3 gives 13.33%, while the geometric calculation (14,000 ⁄ 10,000)<sup>1⁄3</sup> − 1 gives 11.87%. An arithmetic average of +50% and −50% is zero even though the two-period balance falls 25%, illustrating why a geometric measure is needed for compounded wealth.</p>
      <p>Annualizing puts results from different holding periods on a common time basis. A 25% ROI over two years annualizes to 11.80%, while a 60% ROI over five years annualizes to 9.86%. That still does not make the investments equally risky or account for cash added and withdrawn along the way, so compare like with like.</p>
      <p>The calculator also shows the effect of <strong>entered costs</strong>. Adding $500 to the default example changes ROI from 40% to 33.33% and the annualized rate from 11.87% to 10.06%. It does not discover omitted fees or determine which taxes apply.</p>`,
    formulaHtml: `
      <p>Total return counts everything committed, including costs:</p>
      <div class="formula-block"><span class="fx">ROI = (R − I − C) ⁄ (I + C)</span>
        <ul class="formula-vars">
          <li><code>R</code> amount received or current value</li>
          <li><code>I</code> amount invested; <code>C</code> additional costs (fees, taxes, commissions)</li>
        </ul>
      </div>
      <p>Annualizing converts the total into a compound yearly rate:</p>
      <div class="formula-block"><span class="fx">CAGR = (R ⁄ (I + C))<sup>1 ⁄ t</sup> − 1</span>
        <ul class="formula-vars">
          <li><code>t</code> holding period in years (36 months = 3)</li>
          <li>the exponent 1⁄t is what makes the mean geometric rather than arithmetic</li>
        </ul>
      </div>
      <p>The two agree only at exactly one year. Shorter than a year, annualizing <em>extrapolates</em> (a 20% gain in 6 months annualizes to 44%); longer than a year, it <em>compresses</em>. Both formulas assume a single outlay and a single ending value; for drip-fed investing, an XIRR-style calculation is the right tool instead.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $10,000 → $14,000 over 3 years</div><div class="ex-body">
        <p>Net profit = 14,000 − 10,000 = <strong>$4,000</strong>. ROI = 4,000 ⁄ 10,000 = <strong>40%</strong>.</p>
        <p>Annualized: (14,000 ⁄ 10,000)<sup>1⁄3</sup> − 1 = 1.4<sup>0.3333</sup> − 1 = <strong>11.87% per year</strong>, not the 13.33% the ÷3 shortcut suggests.</p>
        <p>Now include $500 of buying and selling costs: the base becomes $10,500, profit falls to $3,500, ROI to <strong>33.33%</strong> and the annualized rate to <strong>10.06%</strong>. One overlooked line item moved the result by nearly two points a year, which is the whole argument for gross-to-net rigor.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The holding period changes annualization.</strong> The same 40% total is 40%/yr over one year, 18.32% over two, 11.87% over three, 6.96% over five and 3.42% over ten.</li>
        <li><strong>Costs compound in reverse.</strong> Every dollar of fees both shrinks the profit and grows the base it's measured against: the $500 in the example cut the annualized rate by 1.8 points.</li>
        <li><strong>Open positions use an estimated exit value.</strong> Actual proceeds can differ because of market movement, liquidity and selling costs.</li>
        <li><strong>Risk is outside ROI.</strong> Equal annualized results can come from positions with different volatility, liquidity, concentration and loss exposure.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The model assumes <strong>one payment in, one value out</strong>. If you added or withdrew money along the way, CAGR misattributes the result; money-weighted measures (XIRR) handle dated cash flows.</li>
        <li>Annualizing a sub-year holding extrapolates a partial-year rate. The engine computes and labels it, but the result does not imply repeatability.</li>
        <li>The chart holds total ROI constant and changes only the holding period. It is a time-sensitivity illustration, not an asset-class benchmark or forecast.</li>
        <li>Inflation isn't deducted; a 3.42%/yr result during 3% inflation barely broke even in real terms.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What's the difference between ROI and CAGR?",
      aHtml: `<p>ROI is the total percentage gained or lost over the holding period; CAGR is the equivalent steady yearly compound rate. The default example is 40% ROI and 11.87% CAGR over 3 years. CAGR places different durations on a common time basis but still does not equalize risk, liquidity, taxes, fees or cash-flow timing.</p>`,
    },
    {
      q: "Why is annualized return not just ROI divided by years?",
      aHtml: `<p>Because growth compounds: an investment earning 11.87% yearly gains more dollars in year three than in year one, so the per-year rate that produces 40% in total is lower than 40 ÷ 3 = 13.33%. For this positive three-year example, dividing overstates CAGR. With a 20% loss over three years, dividing gives −6.67% while CAGR is −7.17%. The formula links the starting and ending values; it cannot describe the intervening volatility.</p>`,
    },
    {
      q: "Which costs should I include?",
      aHtml: `<p>Enter costs included in the comparison, such as disclosed brokerage, platform, entry or exit charges and transaction taxes. A property scenario may also include registration, maintenance and selling costs. Tax treatment varies, so an after-tax ROI needs current, jurisdiction-specific inputs. The example shows $500 of entered costs moving the annualized result from 11.87% to 10.06%.</p>`,
    },
    {
      q: "When should I not annualize a return?",
      aHtml: `<p>For a period shorter than a year, an annualized result is an extrapolation: a 20% gain over six months becomes 44% annualized. Both figures are mathematically defined, but the annualized number does not show a year of observed performance or imply the gain can be repeated. This tool displays the entered holding period alongside the result.</p>`,
    },
    {
      q: "Is a negative ROI calculated the same way?",
      aHtml: `<p>Yes. Receive back less than you committed and both numbers go negative: $10,000 in, $8,000 out over 3 years is a −20% ROI and about −7.17% annualized. The break-even metric on this page shows the value you'd have needed just to escape flat, which for a position with costs is <em>above</em> the purchase price, another quiet argument for counting fees.</p>`,
    },
  ],
};
