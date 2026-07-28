export default {
  slug: "future-value-calculator",
  category: "investment",
  title: "Future Value Calculator",
  h1: "Future Value Calculator",
  metaTitle: "Future Value Calculator — Time Value of Money (TVM)",
  metaDescription:
    "Compute the future value of a lump sum plus regular contributions, with end-or-beginning timing and monthly, quarterly or yearly compounding.",
  tagline:
    "Put today's money and regular contributions on a future date, with beginning- or end-of-period deposits.",
  cardDescription: "Textbook TVM future value with annuity-due timing and compounding options.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: false,
  featured: false,
  jumpExplainLabel: "What future value means",
  aliases: ["FV", "time value of money", "TVM"],
  keywords: ["future value", "time value of money", "annuity due", "ordinary annuity", "FV formula"],
  related: ["present-value-calculator", "compound-interest-calculator", "investment-calculator", "savings-calculator", "monthly-investment-calculator"],
  sections: {
    howToHtml: `
      <p>Fill in whichever pieces your problem has (a present amount, a monthly contribution, or both), then the rate, the horizon, and how often interest compounds:</p>
      <ul>
        <li><strong>Contribution timing</strong>: "End of month" is the textbook <em>ordinary annuity</em>; "Beginning of month" is an <em>annuity due</em>, where every deposit earns one extra month. Payroll-style saving is usually end-of-period; rent-like flows are beginning.</li>
        <li><strong>Compounding</strong>: match the account. Many savings accounts compound monthly; use yearly for rates quoted as APY or AER, which already include compounding.</li>
      </ul>
      <p>The results split the future value into what the lump sum becomes and what the contribution stream becomes, the two halves of every TVM problem. The bar chart re-runs your inputs at 5, 10, 15, 20 and 25 years so you can see how the answer scales with time.</p>`,
    explanationHtml: `
      <h2>Future value and the time value of money</h2>
      <p>The <strong>time value of money</strong> is the principle that a sum of money has different values at different dates, because money you hold now can be put to work earning a return. "Future value" makes that precise: FV is the amount a present sum will have become by a chosen date, at a stated rate of growth. It's the fundamental primitive of finance — pensions, bond math, loan payments and business valuations are all future-value and present-value calculations wearing different clothes.</p>
      <p>Every FV problem decomposes into at most two parts, and this calculator reports them separately. With the defaults of $5,000 today plus $250 a month at 7% for 15 years, the lump sum alone grows to $14,244.73, and the contribution stream alone grows to $79,240.57, for a combined future value of <strong>$93,485.31</strong>. You'd have deposited $50,000 in total; the remaining $43,485.31 is interest. Notice the asymmetry: the contributions total nine times the starting lump, but their FV is only about 5.6 times bigger, because the average contribution has far less time in the market than the day-one dollar.</p>
      <p><strong>Timing</strong> is the detail textbooks drill because it changes real answers. Switch the defaults from end-of-month to beginning-of-month and the future value rises from $93,485.31 to $93,947.54: that's $462.23 more, from nothing but paying yourself one month earlier each cycle. The two conventions differ by exactly one period's growth on the contribution stream, which is why the annuity-due formula is the ordinary-annuity formula multiplied by (1 + i).</p>
      <p>Future value also runs in reverse. Discount $14,244.73 back 15 years at the same 7% monthly compounding and you land on exactly $5,000; FV and <a href="/present-value-calculator/">present value</a> are the same equation solved for different unknowns. That inverse relationship is what lets you compare unlike options: money offered at different dates, an account you'd leave alone versus one you'd move to, a bonus today versus a raise next year. Convert everything to the same date, either all-future or all-present, and the comparison is just two numbers side by side.</p>`,
    formulaHtml: `
      <p>A lump sum grows by the compounding factor; a contribution stream grows as an annuity:</p>
      <div class="formula-block"><span class="fx">FV = P(1 + i)<sup>n</sup> + C × [(1 + i)<sup>n</sup> − 1] ⁄ i × (1 + i·T)</span>
        <ul class="formula-vars">
          <li><code>P</code> present amount; <code>C</code> contribution per period</li>
          <li><code>i</code> periodic rate; <code>n</code> number of periods</li>
          <li><code>T</code> timing: 0 for end-of-period (ordinary annuity), 1 for beginning (annuity due)</li>
        </ul>
      </div>
      <p>When compounding and contribution frequencies differ (say quarterly compounding with monthly deposits), the calculator first converts the nominal rate to an equivalent per-contribution rate, i = (1 + r⁄m)<sup>m⁄12</sup> − 1, then applies the same structure. With the defaults, moving from monthly to yearly compounding trims the result from $93,485.31 to $91,571.35, because the nominal 7% is effectively 7.229% per year when compounded monthly.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: the default inputs, by hand</div><div class="ex-body">
        <p>$5,000 now, $250 at each month-end, 7% compounded monthly, 15 years. The monthly rate is i = 0.07 ⁄ 12 = 0.005833; n = 180 months, so (1 + i)<sup>180</sup> = 2.84895.</p>
        <p>Lump part: 5,000 × 2.84895 = <strong>$14,244.73</strong>. Annuity part: 250 × (2.84895 − 1) ⁄ 0.005833 = <strong>$79,240.57</strong>.</p>
        <p>Total FV = <strong>$93,485.31</strong>. Switching the same stream to beginning-of-month multiplies the annuity part by 1.005833 — raising it to $79,702.81 and the total to $93,947.54.</p>
        <p>Time scaling from the bar chart: the identical plan reaches $24,986 at 5 years, $53,320 at 10, $150,425 at 20 and $231,145 at 25; the last decade adds more than the first fifteen years combined.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Horizon compounds harder than anything else.</strong> In the default plan, years 20→25 alone add $80,720 — more than the entire value at year 10. When comparing options, always compare them at the same date.</li>
        <li><strong>The split matters for decisions.</strong> If most of your FV comes from the lump part, the rate you earn dominates; if it comes from contributions, the amount you save dominates. The two metrics on this page tell you which lever you're actually holding.</li>
        <li><strong>Timing is a free half-percent.</strong> Beginning-of-period contributions raise the annuity part by exactly (1 + i) — about 0.58% at 7% monthly. Free, but small; don't let it decide anything big.</li>
        <li><strong>Compounding frequency</strong> shifts results by fractions of a percent at typical rates. If you're quoted an APY, use yearly compounding here to avoid double-counting.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The rate is held <strong>constant</strong> for the whole horizon. Real returns vary; treat the output as a planning figure, and re-run at a lower rate to test the plan.</li>
        <li>Results are nominal and <strong>pre-tax</strong>. For purchasing-power answers, the <a href="/investment-calculator/">Investment Calculator</a> applies an inflation adjustment.</li>
        <li>Contributions are level; if yours will grow each year, the <a href="/sip-calculator/">SIP Calculator</a> models annual step-ups.</li>
        <li>No withdrawals or pauses are modeled — the money is assumed to stay put for the full term.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What's the difference between an ordinary annuity and an annuity due?",
      aHtml: `<p>Only the payment date within each period: end (ordinary) versus beginning (due). Every payment in an annuity due compounds for one extra period, so its FV is the ordinary result times (1 + i). On this page's defaults that's $462.23 of extra future value — real, but modest. Savings from salary is naturally end-of-period; insurance premiums and rent are due-style.</p>`,
    },
    {
      q: "How are future value and present value related?",
      aHtml: `<p>They're the same equation read in opposite directions: FV = PV × (1 + i)<sup>n</sup>, so PV = FV ⁄ (1 + i)<sup>n</sup>. Discounting this page's lump-sum result ($14,244.73) back 15 years at 7% monthly returns exactly the $5,000 you started with. Use FV to project forward, and the <a href="/present-value-calculator/">Present Value Calculator</a> to drag future promises back to today.</p>`,
    },
    {
      q: "Can I use this to compare two accounts or offers?",
      aHtml: `<p>Yes — that's the classic TVM use case. Compute the FV of leaving money where it is, then the FV of moving it (net of any exit fees or taxes, which you can subtract from the present amount), both at the same horizon. The scenario tool below the results holds one version while you compute the other. Whichever future value is higher wins, provided the risk is genuinely comparable.</p>`,
    },
    {
      q: "Which compounding option should I pick?",
      aHtml: `<p>Match the product's stated terms: savings accounts often compound monthly, and bonds and deposits often yearly or half-yearly; the paperwork is authoritative. If the rate you have is an APY or AER, it already includes compounding — enter it with yearly frequency. The difference is small (defaults: $93,485 monthly vs $91,571 yearly) but there's no reason to accept avoidable error.</p>`,
    },
    {
      q: "Why does the lump sum punch above its weight in the result?",
      aHtml: `<p>Because it's invested for the entire horizon, while the average contribution is invested for only about half of it. In the defaults, $5,000 up front becomes $14,244.73 (2.85×), but each mid-stream $250 has less time to grow — the whole $45,000 of contributions becomes $79,240.57 (1.76×). This is the arithmetic behind "start early": early money is simply worth more per unit.</p>`,
    },
  ],
};
