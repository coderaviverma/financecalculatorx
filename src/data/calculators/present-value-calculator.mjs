export default {
  slug: "present-value-calculator",
  category: "investment",
  title: "Present Value Calculator",
  h1: "Present Value Calculator",
  metaTitle: "Present Value Calculator — Discount Future Money",
  metaDescription:
    "Find what a future amount or a stream of payments is worth today at your discount rate — with rate sensitivity and a year-by-year discount table.",
  tagline:
    "Bring a future lump sum or payment stream back to today's value using a discount rate you choose.",
  cardDescription: "Discount a future amount or payment stream to its value in today's money.",
  scenarioHint: "Save your valuation as Scenario A, change the discount rate or the years until payment, then save Scenario B — useful for testing how sensitive a buyout or settlement offer is to the rate you assume.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: false,
  featured: false,
  jumpExplainLabel: "What discounting means",
  aliases: ["PV", "discounting", "discounted value"],
  keywords: ["present value", "discount rate", "annuity present value", "pension lump sum", "cash now or payments"],
  related: ["future-value-calculator", "compound-interest-calculator", "roi-calculator", "investment-calculator"],
  sections: {
    howToHtml: `
      <p>Choose what you're valuing. <strong>A future amount</strong> is a single sum arriving later: an inheritance tranche, a bond's face value, a deferred payment. <strong>A stream of payments</strong> is a series of monthly amounts: a pension option, a structured settlement, lottery installments.</p>
      <ul>
        <li><strong>Discount rate</strong>: an annual comparison rate you choose. It may represent an opportunity-cost assumption, but the calculator does not determine which alternative has comparable risk. The chart shows how the answer moves across 2–12%.</li>
        <li>For a future amount, set the <strong>compounding</strong> to match how you'd invest in the meantime; payment streams are discounted monthly to match their monthly cadence.</li>
      </ul>
      <p>Read the "PV as % of nominal" metric first; it's the cleanest summary of how much the waiting costs.</p>`,
    explanationHtml: `
      <h2>What discounting means</h2>
      <p>Money received later can be expressed as an equivalent amount today under a stated rate assumption. If $54,963.27 grows at 6% compounded monthly, it becomes $100,000 in ten years. Reversing that calculation gives a present value of <strong>$54,963.27</strong>, about 55% of the future face amount. The $45,036.73 difference is the growth implied by the assumed rate and waiting period.</p>
      <p>The <strong>discount rate</strong> is an assumption, not a fact supplied by the payment promise. It can represent a comparison return for an alternative with similar timing and risk, but different alternatives may justify different rates. The sensitivity chart makes that dependence visible: the same $100,000 future amount has a modeled present value of $81,887 at 2% and $30,299 at 12%.</p>
      <p>Payment-stream mode applies the same calculation to a series of installments. A stream of $1,000 a month for 10 years is nominally $120,000, but its present value at 6% is <strong>$90,073.45</strong>. A lump-sum offer can be compared with that figure under the same 6% assumption; changing the rate changes the comparison. Contract guarantees, inflation adjustments, taxes, fees, liquidity and payer risk remain outside the calculation.</p>
      <p>Bond valuation also discounts promised coupons and principal, but this page is only a simplified illustration. Traded bond prices additionally reflect market yields, credit risk, accrued interest, day-count rules, tax treatment and settlement conventions.</p>`,
    formulaHtml: `
      <p>A single future amount is discounted by the compounding factor, inverted:</p>
      <div class="formula-block"><span class="fx">PV = F ⁄ (1 + r ⁄ m)<sup>m·t</sup></span>
        <ul class="formula-vars">
          <li><code>F</code> the future amount; <code>t</code> years until it arrives</li>
          <li><code>r</code> annual discount rate; <code>m</code> compounding periods per year</li>
        </ul>
      </div>
      <p>A level monthly payment stream discounts as an ordinary annuity:</p>
      <div class="formula-block"><span class="fx">PV = C × [1 − (1 + i)<sup>−n</sup>] ⁄ i</span>
        <ul class="formula-vars">
          <li><code>C</code> payment per month; <code>i</code> monthly rate = r ⁄ 12; <code>n</code> number of payments</li>
        </ul>
      </div>
      <p>Both are exact inverses of the future-value formulas: computing PV and then growing it forward at the same rate reproduces the original amounts to the cent. At a 0% discount rate the formulas collapse to face value: no earning power forgone, no discount.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $1,000/month for 10 years vs $120,000 on paper</div><div class="ex-body">
        <p>Monthly rate i = 0.06 ⁄ 12 = 0.005; n = 120 payments. The annuity factor is [1 − (1.005)<sup>−120</sup>] ⁄ 0.005 = 90.0735.</p>
        <p>PV = 1,000 × 90.0735 = <strong>$90,073.45</strong>, or 75.1% of the $120,000 nominal total. Discounting removes $29,926.55.</p>
        <p>Under the 6% assumption, a lump-sum offer can be compared with $90,073 rather than the undiscounted $120,000 total. For example, an $80,000 offer is about $10,000 below the modeled present value; a different rate produces a different benchmark.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The discount rate dominates.</strong> Across the chart's 2–12% span, the default lump's value ranges from $81,887 down to $30,299, a 2.7× spread from one assumption. Compare several plausible rates rather than treating one output as definitive.</li>
        <li><strong>Time until receipt.</strong> At 6% monthly, each year of waiting removes about 5.8% of value: the default $100,000 is worth $94,191 if it arrives in one year, $54,963 in ten, $30,210 in twenty.</li>
        <li><strong>Risk is not modeled directly.</strong> Two promises with the same dates can have different credit risk. The rate-sensitivity chart can illustrate alternative assumptions, but it does not price default probability.</li>
        <li><strong>Taxes are excluded.</strong> Treatment can vary by payment type and jurisdiction, so the calculator compares pre-tax cash flows only.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The discount rate is <strong>constant</strong> over the whole horizon; real opportunity costs drift with markets. For long horizons, treat the output as a band (re-run at two or three rates), not a point.</li>
        <li>Payment streams are modeled as level and monthly. Inflation-indexed or growing payments require a different cash-flow model, so this output should not be treated as a floor or ceiling for them.</li>
        <li>No default risk, taxes, or fees are modeled; they all reduce what a promise is really worth.</li>
        <li>Bond pricing here is conceptual — real bond quotes involve day counts, accrued interest and settlement conventions this tool doesn't implement.</li>
      </ul>`,
  },
  faq: [
    {
      q: "How should I test the discount-rate assumption?",
      aHtml: `<p>Run several rates that correspond to clearly identified comparison cases, then read the sensitivity chart as a range. A savings rate, borrowing rate and investment-return assumption do not carry the same risk, tax treatment or liquidity, so they are not interchangeable. A 0% case is also useful: it shows the undiscounted total and isolates the effect of waiting.</p>`,
    },
    {
      q: "What does present value contribute to a lump-sum comparison?",
      aHtml: `<p>It puts the stream and lump sum on the same date under a stated rate. In this page's example, $1,000/month for 10 years has a present value of $90,073 at 6%, rather than the $120,000 undiscounted total. The calculation does not evaluate longevity guarantees, inflation indexing, payer credit risk, taxes, fees or liquidity, all of which can be material to an actual pension or settlement.</p>`,
    },
    {
      q: "Why is present value so sensitive to the rate?",
      aHtml: `<p>Because the discount factor compounds over every period of waiting. A 10-year discount at 6% monthly divides by 1.8194, while 12% divides by 3.3004 — nearly twice the shrinkage from doubling the rate. The longer the horizon, the more the exponent amplifies rate differences, which is also why long-dated bonds swing harder than short ones when yields move.</p>`,
    },
    {
      q: "Does this calculator reproduce a court or insurer settlement rate?",
      aHtml: `<p>No. Legal and contractual valuation rules vary by jurisdiction and instrument, and a quoted buyout may embed fees or risk assumptions this tool does not identify. Entering a rate here creates a mathematical scenario only; it does not verify that the rate is the one required by a court, regulator, pension plan or insurer.</p>`,
    },
    {
      q: "Is present value the same as inflation-adjusted value?",
      aHtml: `<p>No; they answer different questions. Inflation adjustment restates money in constant purchasing power using the inflation rate; present value prices a future claim using your opportunity cost, which is normally higher than inflation. $100,000 in ten years at 3% inflation buys what $74,409 buys today, but as a claim it's worth only $54,963 at a 6% discount rate. Use inflation for "what will it buy", PV for "what is it worth now".</p>`,
    },
  ],
};
