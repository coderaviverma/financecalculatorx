export default {
  slug: "budget-calculator",
  category: "personal",
  title: "Budget Calculator",
  h1: "Budget Calculator",
  metaTitle: "Budget Calculator — 50/30/20 Rule with Custom Splits",
  metaDescription:
    "Split monthly take-home pay into needs, wants and savings with the 50/30/20 rule or your own percentages — monthly, weekly and yearly amounts included.",
  tagline:
    "Turn take-home pay into three concrete numbers — needs, wants, and savings & debt repayment — using the classic 50/30/20 split or percentages tuned to your situation.",
  cardDescription: "50/30/20 budget split with adjustable percentages and weekly amounts.",
  scenarioHint: "Save your current split as Scenario A, adjust the percentages (say, needs down to 45% and savings up to 25%), then save Scenario B to see what the shift is worth per month and per year.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: true,
  jumpExplainLabel: "The 50/30/20 rule, warts and all",
  aliases: ["50/30/20", "budget planner", "spending plan"],
  keywords: ["budget calculator", "50/30/20 rule", "needs wants savings", "monthly budget", "budget percentages"],
  related: ["savings-calculator", "debt-payoff-calculator", "monthly-investment-calculator", "house-affordability-calculator", "loan-payoff-calculator"],
  sections: {
    howToHtml: `
      <p>Enter your monthly <strong>take-home</strong> income: the amount that lands in your account after tax and payroll deductions. Then set the three percentages:</p>
      <ul>
        <li><strong>Needs</strong> — housing, groceries, utilities, transport, insurance, minimum debt payments.</li>
        <li><strong>Wants</strong> — dining out, travel, subscriptions, hobbies, upgrades.</li>
        <li><strong>Savings & debt repayment</strong> — emergency fund, investing, and payments beyond the minimums.</li>
      </ul>
      <p>The three must total 100%, and the calculator tells you the actual sum if they don't. Toggle <em>Show weekly amounts</em> if you budget by the week, and use the breakdown table for monthly, weekly and yearly figures for each bucket.</p>`,
    explanationHtml: `
      <h2>The 50/30/20 rule, warts and all</h2>
      <p>The 50/30/20 split (50% of take-home pay to needs, 30% to wants, 20% to savings and debt repayment) was popularized by Elizabeth Warren and Amelia Warren Tyagi in their 2005 book <em>All Your Worth</em>. Its virtue is bluntness: three buckets you can check in a minute, instead of forty spreadsheet categories you'll abandon by March. On the default <strong>$4,500</strong> take-home, it allocates <strong>$2,250</strong> to needs, <strong>$1,350</strong> to wants, and <strong>$900</strong> a month, or <strong>$10,800</strong> a year, to savings and debt.</p>
      <p>It is a starting scaffold, not a law, and it breaks in predictable places. In high-rent cities, housing alone can swallow 40% of take-home pay, making a 50% needs cap unrealistic. The candid response is to acknowledge it (say 60/20/20) while treating the gap as a signal about the housing, not a personal failing. At the other end, high earners hiding behind the rule are under-saving: someone clearing $8,000 a month can live well within $4,000 of needs, and $1,600 of savings is likely too timid. Past a comfortable floor, each extra dollar of income should push the savings share well beyond 20%, because needs don't scale with income.</p>
      <p>The rule's hardest edge is the needs/wants boundary. Groceries are a need; the same calories from delivery apps are mostly want. A car to get to work is a need; the upgrade from a functional car is a want. The gym is a real toss-up. A workable decision test: <em>would you cut it if your income dropped 20% next month?</em> On the default budget that's $4,500 falling to $3,600. Anything you'd keep paying at $3,600 is a need; anything you'd cancel is a want. Classify by that test, not by what feels virtuous.</p>
      <p>Whatever split you choose, the savings bucket works best paid <strong>first</strong>: an automatic transfer on payday moves the $900 before spending decisions see it. Budgets that rely on saving "what's left over" reliably find nothing left over.</p>`,
    formulaHtml: `
      <p>The arithmetic is deliberately simple. Each bucket is a straight share of take-home income:</p>
      <div class="formula-block"><span class="fx">Bucket = Income × Percentage ⁄ 100</span>
        <ul class="formula-vars">
          <li><code>Income</code> monthly take-home pay (after tax)</li>
          <li><code>Percentage</code> the bucket's share; the three shares must total 100</li>
          <li>Weekly = Monthly × 12 ⁄ 52 &nbsp;·&nbsp; Yearly = Monthly × 12</li>
        </ul>
      </div>
      <p>The savings-rate check divides a six-month cushion of needs by the monthly savings amount: months = (Needs × 6) ⁄ Savings. A useful property falls out. With fixed percentages the answer depends only on the ratio, not the income, so at 50/20 it is always 15 months, whether you earn $3,000 or $8,000. Building the cushion faster requires changing the split, not just earning more.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $4,500 take-home on the classic split</div><div class="ex-body">
        <p>Needs: 4,500 × 0.50 = <strong>$2,250</strong> · Wants: 4,500 × 0.30 = <strong>$1,350</strong> · Savings & debt: 4,500 × 0.20 = <strong>$900</strong>.</p>
        <p>Weekly, those are $519.23, $311.54 and $207.69 (monthly × 12 ⁄ 52). Over a year the savings bucket alone accumulates <strong>$10,800</strong>.</p>
        <p>The emergency-fund check: six months of needs is 2,250 × 6 = <strong>$13,500</strong>, and at $900 a month that cushion takes 13,500 ⁄ 900 = <strong>15 months</strong> to build, a concrete answer to "how long until I'm covered?"</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Income level changes the right split.</strong> At $3,000 take-home the buckets are $1,500/$900/$600 and the 50% needs cap is truly hard; at $8,000 they're $4,000/$2,400/$1,600 and the 20% savings floor is far too soft. Adjust the percentages to the income, not the other way round.</li>
        <li><strong>Fixed costs move slowly.</strong> Rent, insurance and car payments reset yearly at best; cutting needs is a project, cutting wants is a decision.</li>
        <li><strong>Debt belongs in two buckets.</strong> Minimum payments are needs (missing them has consequences); everything beyond the minimum is the savings & debt bucket doing its job.</li>
        <li><strong>Automation beats willpower.</strong> A payday transfer makes the savings rate structural; a mental commitment makes it seasonal.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The split is a <strong>guideline for take-home pay</strong>. It says nothing about whether your income itself covers a reasonable cost of living in your area.</li>
        <li>Irregular income (freelance, commission) needs a smoothing step first: budget from a conservative baseline month, not your best one.</li>
        <li>The buckets don't rank what's <em>inside</em> them — a maxed-out savings bucket aimed at low-priority goals while card debt compounds is still a bad budget; see the <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> for ordering debts.</li>
        <li>Employer retirement contributions deducted before take-home pay don't appear here, so your true savings rate may be higher than the bucket shows.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Where does the 50/30/20 rule come from?",
      aHtml: `<p>From <em>All Your Worth: The Ultimate Lifetime Money Plan</em> (2005) by Elizabeth Warren, then a Harvard bankruptcy-law professor, and her daughter Amelia Warren Tyagi. Their argument was that people fail at 40-line budgets but can hold a three-way balance in their heads, and that keeping must-pay costs near half of take-home pay is what makes a budget survivable through bad months.</p>`,
    },
    {
      q: "Is a gym membership a need or a want?",
      aHtml: `<p>Apply the income-drop test: if your pay fell 20% next month, would you keep it? For some people the gym is core health infrastructure they'd protect before restaurants; for others it's the first cancellation. The same test settles most boundary cases, whether the upgraded phone plan, the second car, or premium groceries. The point of the test is that <em>you</em> answer it honestly, not that a category list decides for you.</p>`,
    },
    {
      q: "My rent alone is 40% of my income. Is the rule useless for me?",
      aHtml: `<p>No, and it's telling you something real: your housing market (or your current home) is expensive relative to your income, so the slack has to come from somewhere. Practical adjustments are a 60/20/20 or even 65/20/15 split while protecting some savings rate, since dropping savings to zero leaves you one repair bill away from card debt. Revisit the split when income rises or the lease is renegotiated.</p>`,
    },
    {
      q: "Does the 20% include my employer retirement plan?",
      aHtml: `<p>If contributions come out before your pay lands, your take-home figure already excludes them, so the 20% here is savings on top of that, and your true overall rate is higher. That's fine, and arguably ideal for high earners. Just be consistent: either budget from gross pay and count everything, or from take-home pay and treat payroll savings as a bonus.</p>`,
    },
    {
      q: "What should the savings & debt bucket actually pay for, in what order?",
      aHtml: `<p>A common ordering: first a starter emergency cushion, then high-interest debt beyond the minimums (card APRs beat any guaranteed savings return), then the full three-to-six-month emergency fund, then goals and investing. On the default budget's $900 a month, the six-month cushion of $13,500 takes 15 months, after which the entire bucket is free for wealth-building.</p>`,
    },
  ],
};
