export default {
  slug: "sip-calculator",
  category: "investment",
  title: "SIP Calculator",
  h1: "SIP Calculator",
  metaTitle: "SIP Calculator — Monthly SIP Returns with Step-Up",
  metaDescription:
    "Project your SIP maturity value from monthly investments, expected return and annual step-up — with the invested vs gains split shown year by year.",
  tagline:
    "Estimate what a monthly SIP could grow into — with annual step-ups, an optional lump sum alongside, and an honest split between what you invested and what compounding added.",
  cardDescription: "SIP maturity value with annual step-up and invested-vs-gains breakdown.",
  scenarioHint: "Save your SIP as Scenario A, then change the monthly amount, expected return or step-up percentage and save Scenario B to see the difference at maturity.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: true,
  featured: true,
  suggestCurrency: "INR",
  jumpExplainLabel: "How SIPs work",
  aliases: ["systematic investment plan", "mutual fund sip", "sip returns"],
  keywords: ["sip calculator", "sip returns", "step-up sip", "rupee cost averaging", "mutual fund calculator"],
  related: ["lump-sum-investment-calculator", "investment-calculator", "compound-interest-calculator", "monthly-investment-calculator", "future-value-calculator"],
  sections: {
    howToHtml: `
      <p>Start with your monthly SIP amount, the annual return you want to assume, and how long you'll stay invested. Two optional fields change the picture meaningfully:</p>
      <ul>
        <li><strong>Annual step-up</strong>: raises the SIP by a fixed percentage every year, the way most fund houses' step-up/top-up facilities work. Matching it to your expected salary growth (commonly 5–10%) keeps your investing rate constant as a share of income.</li>
        <li><strong>Initial lump sum</strong>: money invested on day one alongside the SIP, useful when you're deploying a bonus and starting a SIP at the same time.</li>
      </ul>
      <p>The chart stacks what you invested against what compounding added, and the table tracks both year by year. The fourth metric always shows the step-up counterfactual (with a 10% step-up if you left it at zero, without one if you set it), so the comparison is one glance away.</p>`,
    explanationHtml: `
      <h2>How SIPs actually work</h2>
      <p>A SIP, short for systematic investment plan, is a standing instruction to buy mutual fund units for a fixed amount on a fixed date each month. The amount is constant; the number of units varies with that day's NAV. When the market falls your ₹10,000 buys more units, when it rises it buys fewer, so your average purchase cost per unit sits below the average NAV over the period. That's rupee-cost averaging, and it's worth stating plainly: it is not a return-enhancing trick. A rising market means your early cheap units were the best buys you'll get, and a lump sum invested at the start would have caught them all. The real benefit of a SIP is <strong>discipline</strong>: it automates investing before spending can happen, removes the "is now a good time?" decision entirely, and keeps you buying through downturns, which is precisely when most investors stop.</p>
      <p>The default projection shows the shape of the outcome: ₹10,000 a month for 15 years at an assumed 12% grows to about <strong>₹49.96 lakh</strong>, of which ₹18 lakh is your money and ₹31.96 lakh is growth, a 2.78× multiple on what you put in. Stretch the same SIP to 20 years and it reaches roughly ₹98.93 lakh: the last five years contribute nearly as much as the first fifteen, which is the compounding argument for starting early and not interrupting.</p>
      <p><strong>Step-up SIPs</strong> are the practical upgrade most plans miss. A SIP that stays at ₹10,000 for 15 years shrinks year after year relative to a growing salary. Adding a 10% annual step-up to the default plan lifts the maturity value from ₹49.96 lakh to about <strong>₹85.98 lakh</strong>, a ₹36 lakh improvement, of which ₹20.13 lakh is extra money you invested and the rest is growth on it. You invest more in total (₹38.13 lakh vs ₹18 lakh), but the increases arrive gradually, in step with income.</p>
      <p>One distinction worth knowing before you compare this projection with a fund factsheet: this calculator assumes a constant return every year, while real SIP returns are reported as <strong>XIRR</strong>, the internal rate of return across your actual dated purchases, which can differ noticeably from the fund's headline point-to-point return. Both are legitimate numbers; they're just answers to different questions.</p>`,
    formulaHtml: `
      <p>A level SIP with end-of-month installments is a future-value annuity:</p>
      <div class="formula-block"><span class="fx">FV = C × [(1 + i)<sup>n</sup> − 1] ⁄ i</span>
        <ul class="formula-vars">
          <li><code>C</code> monthly SIP amount; <code>i</code> monthly rate = annual return ÷ 12</li>
          <li><code>n</code> number of installments (months)</li>
        </ul>
      </div>
      <p>With an annual step-up of <code>s</code>, each year's installments are (1 + s) times the previous year's, so the calculator simulates month by month rather than using a single closed form. The same engine produces the year-by-year table. An initial lump sum adds a P(1 + i)<sup>n</sup> term on top.</p>
      <p>For the defaults: i = 0.12 ⁄ 12 = 0.01 and n = 180, giving (1.01)<sup>180</sup> = 5.9958 and FV = 10,000 × (5.9958 − 1) ⁄ 0.01 ≈ ₹49,95,802, matching the headline result to the rupee.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: ₹10,000/month for 15 years at 12%, with and without step-up</div><div class="ex-body">
        <p><strong>Flat SIP:</strong> 180 installments totalling ₹18,00,000 grow to <strong>₹49,95,802</strong>, for gains of ₹31,95,802.</p>
        <p><strong>10% annual step-up:</strong> the SIP becomes ₹11,000/month in year two, ₹12,100 in year three, and so on. Total invested rises to ₹38,12,698, and the maturity value to <strong>₹85,97,871</strong>.</p>
        <p>The step-up lifts the outcome by almost three-quarters while never demanding a jump your salary growth wouldn't cover. Return sensitivity matters just as much: the same flat SIP projects to ₹41.45 lakh at 10% and ₹60.58 lakh at 14%; the spread between those is wider than most people's step-up decision.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Duration beats everything.</strong> The flat default SIP reaches ₹23 lakh in 10 years, ₹49.96 lakh in 15, ₹98.93 lakh in 20. Each extra five years roughly doubles the outcome at 12%, so stopping early is the most expensive choice available.</li>
        <li><strong>The return assumption is a range, not a fact.</strong> At 10% instead of 12%, the default lands at ₹41.45 lakh; at 14%, ₹60.58 lakh. Plan against the lower bound, treat the upper as upside.</li>
        <li><strong>Step-up percentage.</strong> Linking it to real salary growth keeps the plan sustainable; setting 10% when raises run 5% eventually forces a downgrade, which breaks the discipline that makes SIPs work.</li>
        <li><strong>Expense ratios</strong> come straight out of returns — a fund charging 1.5% more than another needs to outperform by that much every year just to tie.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Real equity-fund returns are <strong>volatile</strong>, not a smooth 12% — actual SIP outcomes depend on the sequence of good and bad years, and reported fund returns use XIRR over actual dates. This projection is a planning centerline.</li>
        <li>Results are <strong>pre-tax</strong>. Indian mutual fund taxation (LTCG/STCG rates, holding-period rules) has changed several times; check the current rules before assuming a net figure.</li>
        <li>Installments are modeled on time every month; skipped or paused months reduce the outcome below the projection.</li>
        <li>No exit loads, expense ratios, or advisory fees are modeled — net them out of the return you enter.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Is a SIP better than investing a lump sum?",
      aHtml: `<p>If the money already exists, a lump sum invested today has more time in the market and wins on average: ₹18 lakh invested once at 12% for 15 years projects to about ₹1.08 crore, versus ₹49.96 lakh for the same ₹18 lakh drip-fed monthly. But the SIP's ₹18 lakh mostly doesn't exist yet — it's future salary. SIPs are for investing income as it arrives; the <a href="/lump-sum-investment-calculator/">Lump Sum Calculator</a> is for capital you already hold. When you have both, do both.</p>`,
    },
    {
      q: "What return should I assume for an equity SIP?",
      aHtml: `<p>Long-run Indian equity fund averages are commonly quoted in the 10–14% range, which is why 12% is this page's default. But past averages are not guarantees, and multi-year stretches below that range happen regularly. A sturdy plan is one that still meets the goal at 10%; anything the market delivers above your assumption is cushion, not entitlement.</p>`,
    },
    {
      q: "Does rupee-cost averaging increase my returns?",
      aHtml: `<p>Not reliably, and it's healthier to know that upfront. Averaging lowers your cost per unit relative to the average NAV, but in a generally rising market, money invested later simply buys less. What averaging genuinely does is reduce the impact of any single badly-timed purchase and make investing automatic. The discipline is the product; the averaging is a side effect.</p>`,
    },
    {
      q: "What is XIRR and why does my fund app show a different return?",
      aHtml: `<p>XIRR is the annualized rate that reconciles all your dated installments with the current value — the correct measure for SIP-style investing, since every installment has a different holding period. A fund's advertised 12% point-to-point return can coexist with a SIP XIRR of 9% or 15% in the same fund, depending on when your installments landed. Compare your XIRR against this calculator's assumed rate, not against the factsheet headline.</p>`,
    },
    {
      q: "How are SIP gains taxed?",
      aHtml: `<p>Each installment is a separate purchase with its own holding period, so units sold are matched first-in-first-out and taxed by how long that specific installment was held. Rates and thresholds for equity LTCG/STCG have been revised repeatedly in recent years, so check the current rules (or a tax adviser) before netting the projection. This calculator deliberately shows pre-tax figures.</p>`,
    },
    {
      q: "Should I pause my SIP when markets fall?",
      aHtml: `<p>Falling markets are when your fixed installment buys the most units — pausing then defeats the one mechanism that makes averaging useful and usually stems from treating the SIP as a market call rather than a savings habit. If cash flow really does tighten, reducing the amount beats stopping: the year-by-year table shows how much of the final value each year's installments carry.</p>`,
    },
  ],
};
