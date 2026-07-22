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
  lastReviewed: "2026-07-22",
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
        <li><strong>Discount rate</strong>: the return your money could realistically earn elsewhere at similar risk. This is the one input that's a judgement call; the chart shows how the answer moves across 2–12% so you can see what your choice is doing.</li>
        <li>For a future amount, set the <strong>compounding</strong> to match how you'd invest in the meantime; payment streams are discounted monthly to match their monthly cadence.</li>
      </ul>
      <p>Read the "PV as % of nominal" metric first; it's the cleanest summary of how much the waiting costs.</p>`,
    explanationHtml: `
      <h2>What discounting means</h2>
      <p>A promise of money later is worth less than the same money in hand, not as a feeling but as a measurable quantity. If your money can earn 6% compounded monthly, then $54,963.27 invested today becomes $100,000 in ten years. So a rock-solid promise of $100,000 ten years out is worth precisely <strong>$54,963.27</strong> right now: about 55% of its face value. The other $45,036.73 isn't lost; it's the earning power you'd give up by waiting. That's discounting: running compound growth backwards.</p>
      <p>Everything hinges on the <strong>discount rate</strong>, and being realistic here is the whole game. The right rate is your <em>opportunity cost</em>, meaning what money of similar risk could earn over the same period, not what you wish you could earn. Discount a promise at 12% when your realistic alternative is a 6% return and you'll conclude the promise is worth only $30,299 instead of $54,963, and possibly reject a deal you should take. The rate-sensitivity chart exists precisely because this input moves the answer more than any other: the same $100,000 promise is worth $81,887 today at 2% but $30,299 at 12%.</p>
      <p>The payment-stream mode answers the "cash now or payments" question that shows up in pensions, settlements and lottery winnings. A stream of $1,000 a month for 10 years is nominally $120,000, but its present value at 6% is <strong>$90,073.45</strong>, because the later payments are worth progressively less today. If someone offers you more than $90,073 in cash to surrender that stream, the cash wins <em>at that discount rate</em>; below it, keep the payments. The nominal $120,000 is the one number that should play no role in the decision.</p>
      <p>This same arithmetic is how bonds are priced. A bond is just a bundle of promises (a coupon stream plus a face value at maturity), and its fair price is the present value of that bundle at the market's required yield. When yields rise, the discounting bites harder and existing bonds' prices fall; when yields drop, prices rise. If you've followed the logic this far, you understand bond pricing; the rest is conventions.</p>`,
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
        <p>Decision rule: a lump-sum buyout offer above $90,073 beats the payments if 6% genuinely reflects what you'd earn on the money; an offer of, say, $80,000 might sound generous against "$120,000 over time", yet it is actually about $10,000 short.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The discount rate dominates.</strong> Across the chart's 2–12% span, the default lump's value ranges from $81,887 down to $30,299, a 2.7× spread from one assumption. Pick the rate from your real alternatives, then stress it ±2%.</li>
        <li><strong>Time until receipt.</strong> At 6% monthly, each year of waiting removes about 5.8% of value: the default $100,000 is worth $94,191 if it arrives in one year, $54,963 in ten, $30,210 in twenty.</li>
        <li><strong>Risk belongs in the rate.</strong> A shaky promise should be discounted harder than a government-backed one. If a payer might default, 6% is too kind.</li>
        <li><strong>Taxes can differ by form.</strong> Lump sums and payment streams are sometimes taxed differently (pensions especially); compare after-tax to after-tax.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The discount rate is <strong>constant</strong> over the whole horizon; real opportunity costs drift with markets. For long horizons, treat the output as a band (re-run at two or three rates), not a point.</li>
        <li>Payment streams are modeled as level and monthly. Inflation-indexed pensions or growing annuities are worth more than this page shows — the level-payment PV is a floor.</li>
        <li>No default risk, taxes, or fees are modeled; they all reduce what a promise is really worth.</li>
        <li>Bond pricing here is conceptual — real bond quotes involve day counts, accrued interest and settlement conventions this tool doesn't implement.</li>
      </ul>`,
  },
  faq: [
    {
      q: "How do I choose the discount rate honestly?",
      aHtml: `<p>Ask: if I had this money today, where would it really go? Paying off 9% debt → discount at 9%. Sitting in savings at 4% → use 4%. A diversified portfolio you maintain in practice → a long-run equity assumption, with the risk caveat that entails. The wrong answers are aspirational rates you don't earn in practice, and 0%, which amounts to claiming that timing doesn't matter at all.</p>`,
    },
    {
      q: "Should I take the pension/settlement lump sum or the monthly payments?",
      aHtml: `<p>Compute the stream's present value at a realistic discount rate and compare it to the lump offered. This page's example shows $1,000/month for 10 years is worth $90,073 at 6%, so the nominal "$120,000" is not the benchmark. Then layer on what math can't capture: longevity guarantees, inflation indexing, payer credit risk, and your own spending discipline. The PV tells you which side is mathematically richer; those factors decide how much premium either side deserves.</p>`,
    },
    {
      q: "Why is present value so sensitive to the rate?",
      aHtml: `<p>Because the discount factor compounds over every period of waiting. A 10-year discount at 6% monthly divides by 1.8194, while 12% divides by 3.3004 — nearly twice the shrinkage from doubling the rate. The longer the horizon, the more the exponent amplifies rate differences, which is also why long-dated bonds swing harder than short ones when yields move.</p>`,
    },
    {
      q: "What discount rate do courts and insurers use for settlements?",
      aHtml: `<p>It varies by jurisdiction and instrument — statutory discount rates exist in some places, while structured-settlement buyout firms often apply effective rates far above any fair opportunity cost, which is exactly how they profit. Before signing any buyout, compute the PV of your payments at a rate you could really earn and compare it to the offer; the gap is the price of the transaction.</p>`,
    },
    {
      q: "Is present value the same as inflation-adjusted value?",
      aHtml: `<p>No; they answer different questions. Inflation adjustment restates money in constant purchasing power using the inflation rate; present value prices a future claim using your opportunity cost, which is normally higher than inflation. $100,000 in ten years at 3% inflation buys what $74,409 buys today, but as a claim it's worth only $54,963 at a 6% discount rate. Use inflation for "what will it buy", PV for "what is it worth now".</p>`,
    },
  ],
};
