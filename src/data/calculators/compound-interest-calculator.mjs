export default {
  slug: "compound-interest-calculator",
  category: "investment",
  title: "Compound Interest Calculator",
  h1: "Compound Interest Calculator",
  metaTitle: "Compound Interest Calculator — Daily, Monthly & Yearly Compounding",
  metaDescription:
    "See how money grows with compound interest: starting amount plus regular contributions, any compounding frequency, year-by-year table and growth chart.",
  tagline:
    "See how a starting balance and regular contributions grow, and separate what you deposit from the interest earned over time.",
  cardDescription: "Growth of a lump sum plus contributions, with any compounding frequency.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: true,
  featured: true,
  jumpExplainLabel: "How compounding works",
  aliases: ["compounding", "interest on interest", "growth"],
  keywords: ["compound interest", "future value", "compounding frequency", "apy", "savings growth"],
  related: ["investment-calculator", "savings-calculator", "future-value-calculator", "sip-calculator", "simple-interest-calculator", "lump-sum-investment-calculator"],
  sections: {
    howToHtml: `
      <p>Enter any combination of a starting amount and a regular contribution (either can be zero). Set the annual rate, how long the money grows, and how often interest compounds:</p>
      <ul>
        <li><strong>Starting amount</strong>: money invested today (a lump sum, an existing balance).</li>
        <li><strong>Regular contribution</strong>: added at the end of each period; switch between monthly, quarterly and yearly.</li>
        <li><strong>Compounding frequency</strong>: how often earned interest is credited and starts earning itself. Savings accounts commonly compound daily or monthly; bonds and some deposits yearly or half-yearly.</li>
      </ul>
      <p>The chart stacks your starting amount, your contributions and the interest earned, so you can see the moment compounding overtakes your own deposits. The year-by-year table breaks down every year and exports to CSV. To compare two rates or contribution levels, save Scenario A, change the input, and save Scenario B.</p>`,
    explanationHtml: `
      <h2>How compound interest works</h2>
      <p>Compound interest means interest is calculated on the <em>current</em> balance, including all interest already earned, rather than only on the amount you originally deposited. Each time interest is credited, the base for the next calculation gets larger, so growth accelerates over time. That's the difference from <a href="/simple-interest-calculator/">simple interest</a>, where the base never changes.</p>
      <p>The effect is unremarkable over short periods and dramatic over long ones. At 7% compounded monthly, $10,000 grows to about $14,176 in five years (42% up), but to $40,387 in twenty years (over 300% up). The pattern is exponential: in the final five years of that twenty-year run, the balance gains more than it did in the first ten combined.</p>
      <p>When you add regular contributions, each contribution starts its own compounding clock. Early contributions do far more work than late ones. In the default example on this page ($10,000 start, $200/month, 7%, 20 years), the final balance is $144,572.72, and $86,572.72 of it (60%) is interest rather than deposits.</p>
      <p><strong>Compounding frequency</strong> matters less than people expect, but it isn't nothing. The same nominal 7% over 20 years on the default example produces $140,204.12 compounded yearly versus $144,572.72 compounded monthly. That gap is captured by the <em>effective annual rate</em> (shown in the results): 7% nominal compounded monthly is really 7.229% per year. When comparing real accounts, use the advertised APY/AER with yearly frequency here, since that figure already includes compounding.</p>`,
    formulaHtml: `
      <p>For a lump sum, the future value after <code>t</code> years is:</p>
      <div class="formula-block"><span class="fx">FV = P × (1 + r ⁄ m)<sup>m·t</sup></span>
        <ul class="formula-vars">
          <li><code>P</code> starting principal</li>
          <li><code>r</code> annual nominal rate as a decimal (7% → 0.07)</li>
          <li><code>m</code> compounding periods per year (monthly = 12, daily = 365)</li>
          <li><code>t</code> years</li>
        </ul>
      </div>
      <p>Regular end-of-period contributions <code>C</code> grow as an annuity:</p>
      <div class="formula-block"><span class="fx">FV<sub>C</sub> = C × [(1 + i)<sup>n</sup> − 1] ⁄ i</span>
        <ul class="formula-vars">
          <li><code>i</code> rate per contribution period, converted from the compounding rate: i = (1 + r⁄m)<sup>m⁄p</sup> − 1</li>
          <li><code>n</code> total number of contributions (p per year × t years)</li>
        </ul>
      </div>
      <p>The calculator computes both parts and simulates period by period, which is why the year table's balances agree with the closed-form result to the cent. Contributions are assumed at the <em>end</em> of each period; contributing at the start would earn one extra period of interest per contribution.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $5,000 at 6%, compounded monthly, for 10 years</div><div class="ex-body">
        <p>Here r ⁄ m = 0.06 ⁄ 12 = 0.005 and m·t = 120 periods.</p>
        <p>FV = 5,000 × (1.005)<sup>120</sup> = 5,000 × 1.81940 = <strong>$9,096.98</strong>.</p>
        <p>The money nearly doubles: $4,096.98 of interest on $5,000 invested. A quick sanity check with the Rule of 72: 72 ÷ 6 = 12, so at 6% money doubles in roughly 12 years — consistent with being <em>almost</em> doubled at year 10.</p>
        <p>Adding just $50/month to the same account would push the 10-year result to $17,289: the contributions add $6,000 of deposits but $2,192 of extra interest on top.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Time is the dominant variable.</strong> Growth compounds on itself, so doubling the time far more than doubles the interest. $200/month at 7% earns ≈ $19k interest over 10 years, but ≈ $86k over 20 (with a $10k start).</li>
        <li><strong>Rate.</strong> Small rate differences compound into large outcome differences: 6% vs 8% on the default example is roughly $128k vs $164k after 20 years.</li>
        <li><strong>Contribution timing and regularity.</strong> Contributions made earlier compound longer. Skipping early years costs more than the same gap later.</li>
        <li><strong>Compounding frequency.</strong> Worth checking but rarely decisive: daily vs monthly on typical savings rates changes the outcome by well under 1%. Fees and taxes usually matter more.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The rate is applied <strong>uniformly for the whole period</strong>. Real savings rates change and investment returns vary year to year — the smooth curve here is a planning approximation, not a prediction.</li>
        <li>Results are <strong>before tax and fees</strong>. Interest is typically taxable outside sheltered accounts, and investment products carry costs that reduce the effective rate.</li>
        <li>Inflation is not deducted — for purchasing-power results, use the <a href="/investment-calculator/">Investment Calculator</a>, which has an inflation adjustment built in.</li>
        <li>Contributions are modeled as perfectly regular and end-of-period.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What's the difference between APY/AER and the nominal rate?",
      aHtml: `<p>The nominal rate (APR-style) ignores compounding frequency; APY/AER states the true yearly growth including it. 7% nominal compounded monthly equals 7.229% APY. Savings products are usually advertised with a compounded yearly figure (APY in the US, AER in the UK), so if you enter one of those, set compounding to yearly — entering an APY with monthly compounding would double-count the effect.</p>`,
    },
    {
      q: "How often do real accounts compound?",
      aHtml: `<p>Compounding conventions vary by product and country: many savings accounts compound daily or monthly and credit interest monthly, while fixed deposits and CDs often compound quarterly or at maturity. Bonds typically pay simple coupons rather than compounding, unless you reinvest them. When in doubt, the account's terms state the frequency — or just use the advertised APY with yearly compounding, which is exact by construction.</p>`,
    },
    {
      q: "Does the Rule of 72 actually work?",
      aHtml: `<p>It's a good approximation for mental math: years to double ≈ 72 ÷ rate. At 8% that predicts 9 years; the exact answer with annual compounding is 9.006 years. It drifts at extreme rates (very accurate between 4% and 12%) but is reliable for sanity-checking any result this calculator gives you.</p>`,
    },
    {
      q: "Why is my bank interest lower than the calculator shows?",
      aHtml: `<p>Usual suspects: tax withheld on interest, a promotional rate that ended, interest calculated on a minimum or average balance rather than the closing balance, or fees netted against interest. The calculator shows gross growth at a constant rate — compare against your account's gross credited interest to reconcile.</p>`,
    },
    {
      q: "Is compound interest good or bad for me?",
      aHtml: `<p>Both, depending on which side you're on. It grows savings and investments, but it's also why credit-card balances balloon — card interest typically accrues daily, and card APRs are generally far higher than savings rates; your own statement shows the actual figure. The same math that builds $86k of growth in the default example is what makes minimum-payment debt so expensive; the <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> shows the borrowing side of it.</p>`,
    },
  ],
};
