export default {
  slug: "budget-calculator",
  category: "personal",
  title: "Budget Calculator",
  h1: "Budget Calculator",
  metaTitle: "Budget Calculator — 50/30/20 Rule with Custom Splits",
  metaDescription:
    "Split monthly take-home pay into needs, wants and savings with the 50/30/20 rule or your own percentages — monthly, weekly and yearly amounts included.",
  tagline:
    "Split take-home pay between needs, wants, and savings or extra debt payments, using 50/30/20 or percentages that fit your budget.",
  cardDescription: "50/30/20 budget split with adjustable percentages and weekly amounts.",
  scenarioHint: "Save your current split as Scenario A, adjust the percentages (say, needs down to 45% and savings up to 25%), then save Scenario B to see what the shift is worth per month and per year.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: false,
  featured: true,
  jumpExplainLabel: "Where the 50/30/20 rule helps — and where it doesn't",
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
      <h2>Where the 50/30/20 rule helps — and where it doesn't</h2>
      <p>The 50/30/20 split (50% of take-home pay to needs, 30% to wants, 20% to savings and extra debt repayment) was popularized by Elizabeth Warren and Amelia Warren Tyagi in their 2005 book <em>All Your Worth</em>. Its appeal is that three broad buckets are easy to remember. On the default <strong>$4,500</strong> take-home, it allocates <strong>$2,250</strong> to needs, <strong>$1,350</strong> to wants, and <strong>$900</strong> a month, or <strong>$10,800</strong> a year, to savings and debt.</p>
      <p>Treat that split as a starting point. Housing, childcare, healthcare, income level and location can make 50% for needs unrealistic or unnecessarily high. If your current result is 60/20/20, the calculator is describing the budget you have; it is not grading it. You can then test what a small percentage change would mean in monthly cash.</p>
      <p>The needs-and-wants boundary is personal. Groceries are usually a need, while delivery fees may be easier to cut. A car may be necessary for work, but the cost above a reliable option is more flexible. One useful question is: <em>would I keep this if income dropped for a few months?</em> It will not settle every category, but it makes the trade-off more concrete.</p>
      <p>If you choose a savings target, an automatic transfer can make the planned amount easier to follow. Keep the transfer low enough that it does not force essential spending back onto expensive debt.</p>`,
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
        <li><strong>Income changes what a percentage means.</strong> The default split produces $600 for savings at $3,000 take-home and $1,600 at $8,000. Review the dollar amounts as well as the percentages.</li>
        <li><strong>Fixed costs move slowly.</strong> Rent, insurance and loan payments may be hard to change quickly, while some discretionary costs can change this month.</li>
        <li><strong>Debt appears in two places.</strong> Minimum payments fit under needs in this model; payments beyond the minimum use the savings-and-debt bucket.</li>
        <li><strong>Automation can help.</strong> A scheduled transfer turns the chosen savings amount into a recurring action, but it still needs to leave enough cash for bills.</li>
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
      aHtml: `<p>There is no single order that fits every household. A small emergency cushion can keep an unexpected bill off a credit card, while high-rate debt may deserve priority over longer-term goals. On the default budget, directing the full $900 monthly bucket to a $13,500 emergency target would take 15 months before interest. Adjust that sequence for employer matches, debt rates, income stability and cash you may need soon.</p>`,
    },
  ],
};
