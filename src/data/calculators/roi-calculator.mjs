export default {
  slug: "roi-calculator",
  category: "investment",
  title: "ROI Calculator",
  h1: "ROI Calculator",
  metaTitle: "ROI Calculator — Total & Annualized Return on Investment",
  metaDescription:
    "Measure total ROI and the annualized return (CAGR) on any investment, including fees and costs, plus honest context for comparing the result.",
  tagline:
    "Measure what an investment actually returned — total ROI, the annualized rate that makes it comparable, and the costs people forget to count.",
  cardDescription: "Total and annualized return on a completed or current investment.",
  lastReviewed: "2026-07-12",
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
        <li><strong>Additional costs</strong>: fees, commissions, transaction taxes. These join the invested amount in the denominator, which is where most DIY ROI figures go wrong.</li>
        <li><strong>Holding period</strong>: how long the money was committed; this converts the raw percentage into an annualized rate.</li>
      </ul>
      <p>The table re-annualizes the same total return over 1, 2, 3, 5 and 10 years. It's worth a look once, because it shows how completely the holding period changes what a "40% gain" means.</p>`,
    explanationHtml: `
      <h2>ROI vs annualized return — the trap in the headline number</h2>
      <p>Return on investment is the simplest metric in finance: net profit divided by what you put in. The default example ($10,000 in, $14,000 back) is a <strong>40% ROI</strong>. Clean, intuitive, and dangerously incomplete, because it says nothing about <em>time</em>. A 40% gain in one year is exceptional; the same 40% spread over three years works out to <strong>11.87% per year</strong>, and over ten years to just 3.42% — savings-account territory. Same ROI, radically different investments.</p>
      <p>The per-year figure is the <strong>annualized return</strong>, or CAGR: the steady compound rate that would turn the start amount into the end amount over the holding period. The naive shortcut (40% ÷ 3 years ≈ 13.33%/yr) overstates the truth, because compounding means each year's growth builds on the last; the true geometric answer is (14,000 ⁄ 10,000)<sup>1⁄3</sup> − 1 = 11.87%. The gap between 13.33% and 11.87% is small here and grows with the numbers: averaging yearly gains always flatters volatile results. A portfolio that gains 50% then loses 50% has an "average return" of zero yet has lost 13.4% a year in reality; geometric math is the only version that matches your account balance.</p>
      <p>Annualized return matters because it's the <strong>only number that transfers</strong> across investments of different sizes and durations. You can't rank a 25% ROI over two years against a 60% ROI over five until both become annual rates (11.80% and 9.86%, the smaller headline wins). It also lets you weigh a result against reference points: long-run historical averages are commonly quoted around 4% for savings, 5% for bonds, 8% for broad equities — history, not prophecy, but useful for judging whether a result compensated its risk.</p>
      <p>The other discipline this calculator enforces is <strong>counting every cost</strong>. Fees, commissions, stamp duty and taxes paid belong in the denominator: they were capital you committed. Add $500 of costs to the default example and ROI drops from 40% to 33.33%, and the annualized rate from 11.87% to 10.06%. On thin-margin investments, ignored costs routinely turn paper profits into real losses.</p>`,
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
        <li><strong>The holding period transforms the verdict.</strong> The same 40% total is 40%/yr over one year, 18.32% over two, 11.87% over three, 6.96% over five, 3.42% over ten. Never quote an ROI without its duration.</li>
        <li><strong>Costs compound in reverse.</strong> Every dollar of fees both shrinks the profit and grows the base it's measured against: the $500 in the example cut the annualized rate by 1.8 points.</li>
        <li><strong>Open positions flatter themselves.</strong> Using today's value assumes you could exit at it; illiquid assets (property, private stakes) often can't be sold at the marked price, net of selling costs.</li>
        <li><strong>Risk is invisible in ROI.</strong> An 11.87%/yr result from a diversified fund and the same from a single speculative bet are not equivalent outcomes — one of them was luck-weighted.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The model assumes <strong>one payment in, one value out</strong>. If you added or withdrew money along the way, CAGR misattributes the result; money-weighted measures (XIRR) handle dated cash flows.</li>
        <li><strong>Don't annualize sub-year holdings</strong> for decision-making: a lucky 6-month trade annualized to 44% implies a repeatability nothing guarantees. The engine computes it; treat it as extrapolation, clearly labeled.</li>
        <li>The context bars (savings ~4%, bonds ~5%, equities ~8%) are <strong>rough historical long-run averages</strong>, shown only for scale: they are not predictions, offers, or targets, and any given decade lands well away from them.</li>
        <li>Inflation isn't deducted; a 3.42%/yr result during 3% inflation barely broke even in real terms.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What's the difference between ROI and CAGR?",
      aHtml: `<p>ROI is the total percentage gained or lost over the whole holding period; CAGR is the equivalent steady yearly compound rate. ROI answers "how much did I make?", CAGR answers "how good was it?". The default example holds both: 40% ROI, 11.87% CAGR over 3 years. Only the CAGR can be compared against other investments, benchmarks, or your mortgage rate.</p>`,
    },
    {
      q: "Why is annualized return not just ROI divided by years?",
      aHtml: `<p>Because growth compounds: an investment earning 11.87% yearly gains more dollars in year three than in year one, so the per-year rate that produces 40% in total is lower than 40 ÷ 3 = 13.33%. The division shortcut always overstates multi-year performance, and the error grows with time and volatility; geometric averaging is the version your account balance obeys.</p>`,
    },
    {
      q: "Which costs should I include?",
      aHtml: `<p>Everything you paid because of the investment: brokerage and platform fees, entry/exit loads, stamp duty and transaction taxes, advisory fees, and taxes paid on the gain if you want an after-tax view. For property, include registration, maintenance and selling costs. The test is simple: if the money left your pocket for this position, it belongs in the base. The example shows $500 of costs moving the annualized result from 11.87% to 10.06%.</p>`,
    },
    {
      q: "When should I not annualize a return?",
      aHtml: `<p>For holdings under a year. Annualizing a short window assumes the pace continues — a 20% gain in 6 months becomes "44% annualized", a number describing a year that never happened. Quote sub-year results as the raw ROI with the period attached ("20% in 6 months"), and only annualize once at least a full year has passed.</p>`,
    },
    {
      q: "Is a negative ROI calculated the same way?",
      aHtml: `<p>Yes. Receive back less than you committed and both numbers go negative: $10,000 in, $8,000 out over 3 years is a −20% ROI and about −7.17% annualized. The break-even metric on this page shows the value you'd have needed just to escape flat, which for a position with costs is <em>above</em> the purchase price, another quiet argument for counting fees.</p>`,
    },
  ],
};
