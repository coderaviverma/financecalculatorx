export default {
  slug: "debt-payoff-calculator",
  category: "personal",
  title: "Debt Payoff Calculator",
  h1: "Debt Payoff Calculator",
  metaTitle: "Debt Payoff Calculator — Snowball vs Avalanche, With Real Numbers",
  metaDescription:
    "List your actual debts and see when you'll be debt-free. Compares snowball vs avalanche strategies month by month — payoff dates, interest totals and timeline chart.",
  tagline:
    "Compare snowball and avalanche repayment using your balances, rates, minimum payments and available monthly budget.",
  cardDescription: "Multi-debt payoff plan comparing snowball vs avalanche month by month.",
  scenarioHint: "Save your plan as Scenario A, then change the extra monthly amount or switch strategy and save Scenario B — the table shows the difference in debt-free date and total interest.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: true,
  featured: true,
  jumpExplainLabel: "Snowball vs avalanche",
  aliases: ["debt free", "pay off credit cards", "debt strategy"],
  keywords: ["debt payoff", "snowball", "avalanche", "credit card debt", "debt free date"],
  related: ["loan-payoff-calculator", "extra-payment-calculator", "budget-calculator", "loan-calculator", "early-loan-payoff-calculator"],
  sections: {
    howToHtml: `
      <p>Add each debt with three numbers you can read straight off its latest statement: the current balance, the APR, and the required minimum payment. Then enter the extra amount you can put toward debt each month beyond the minimums — even zero works, which shows your baseline.</p>
      <ul>
        <li><strong>Strategy toggle.</strong> Avalanche sends every spare unit to the highest-rate debt; Snowball sends it to the smallest balance. The results panel always shows what the other strategy would have cost, so you're never choosing blind.</li>
        <li><strong>Rolling minimums.</strong> When a debt is cleared, its minimum payment automatically joins your extra budget (that's the "snowball" effect, and the calculator applies it to both strategies).</li>
        <li>The <strong>Payoff order</strong> table shows the month and date each debt dies; the <strong>Monthly timeline</strong> view tracks total balance, interest accrued and amount paid every month, and exports to CSV.</li>
      </ul>
      <p>If a debt's minimum doesn't even cover its monthly interest, the calculator will tell you rather than pretend: that debt needs a bigger payment or a lower rate before any plan works.</p>`,
    explanationHtml: `
      <h2>How snowball and avalanche differ</h2>
      <p>Both strategies pay every minimum every month, and both throw all spare budget at one target debt at a time. The only difference is targeting: <strong>avalanche</strong> attacks the highest interest rate first, <strong>snowball</strong> attacks the smallest balance first.</p>
      <p>With fixed rates, no new borrowing and the same monthly budget, avalanche minimizes modeled interest because extra money reaches the highest-rate balance first. In the default example (three debts totaling $25,000 with $300/month extra), avalanche costs <strong>$4,773 in interest</strong> versus snowball's <strong>$5,308</strong>: a $534 difference, with both finishing in 33 months.</p>
      <p>So why does snowball exist? Because it front-loads wins. Killing the $5,000 personal loan first (snowball's order) produces a paid-off account months earlier than avalanche's order does, and each cleared debt frees a minimum payment that makes the next one fall faster, a visible feedback loop that people stick with. Behavioral-finance literature on debt repayment suggests that sticking with a plan matters more than optimizing it: the best strategy is worth nothing abandoned in month six.</p>
      <p>The honest takeaway from running real numbers: for many debt profiles the strategies differ by tens of dollars per month of effort, not thousands. When the gap is small, pick the one that keeps you motivated. When one debt's rate towers over the rest, as payday loans and many credit cards do, avalanche's advantage grows and is usually worth taking. This calculator's job is to show you the actual size of the gap for <em>your</em> debts, so the choice is informed rather than ideological.</p>`,
    formulaHtml: `
      <p>There's no closed-form formula for multi-debt payoff, so the calculator runs a month-by-month simulation, the same way your statements will unfold:</p>
      <div class="formula-block"><span class="fx">each month: interest<sub>d</sub> = balance<sub>d</sub> × APR<sub>d</sub> ⁄ 12 → pay minimums → extra + freed minimums → target debt</span></div>
      <ol>
        <li>Interest accrues on every open balance at its own monthly rate (APR ÷ 12).</li>
        <li>Every debt receives its minimum payment.</li>
        <li>The extra budget, plus the minimums of any already-cleared debts, goes entirely to the target: highest APR (avalanche) or smallest starting balance (snowball).</li>
        <li>When the target dies, the next debt in order becomes the target.</li>
      </ol>
      <p>The simulation runs until every balance reaches zero, capping at 100 years. Interest totals are the sum of all monthly accruals, rounded to the cent. Both strategies are simulated on every calculation so the comparison is always exact for your inputs, and a minimums-only baseline is computed the same way.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: three debts, $25,000 total, $300/month extra</div><div class="ex-body">
        <p>Credit card $8,000 at 22.9% (min $200) · Car loan $12,000 at 9.5% (min $280) · Personal loan $5,000 at 14% (min $150). Total minimums $630, so the monthly debt budget is $930.</p>
        <p><strong>Avalanche</strong> order: credit card → personal loan → car loan. Debt-free in <strong>33 months</strong> with <strong>$4,773.44</strong> interest.</p>
        <p><strong>Snowball</strong> order: personal loan → credit card → car loan. Also 33 months, but <strong>$5,307.68</strong> interest, which is $534.24 more, in exchange for the first paid-off account arriving sooner.</p>
        <p><strong>Minimums only</strong>: 57 months and <strong>$10,331.53</strong> of interest. The $300 extra saves over $5,500 and two full years. The biggest win isn't the strategy, it's the extra payment itself.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The extra amount has the larger effect here.</strong> Going from $0 to $300 extra in the example saves about $5,558; choosing avalanche over snowball saves $534. The available budget matters more than the ordering choice in this particular case.</li>
        <li><strong>Rate spread.</strong> The wider the gap between your highest and lowest APR, the more avalanche wins. Debts clustered around similar rates make the strategies nearly identical.</li>
        <li><strong>Balance distribution.</strong> A tiny debt at a low rate is snowball's best case: clearing it quickly frees its minimum for the real fight at little interest cost.</li>
        <li><strong>New debt.</strong> The simulation assumes no new borrowing. A plan that's technically perfect fails if the cleared credit card gets reloaded. Closing or freezing paid-off revolving accounts is a behavioral, not mathematical, decision.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>APRs are treated as <strong>fixed</strong>; credit-card rates are typically variable and can change with the market or a missed payment. Promotional 0% periods that later jump aren't modeled, so enter the post-promo rate for a conservative plan.</li>
        <li>Minimum payments are modeled as <strong>constant amounts</strong>. Real card minimums are often a percentage of the balance and shrink as you pay down, which stretches minimum-only payoff even longer than shown, so the fixed-minimum assumption is the conservative, planning-friendly choice.</li>
        <li>Fees (annual fees, late fees, balance-transfer costs) are not included.</li>
        <li>Interest compounds monthly here; many cards accrue daily. The difference over a payoff horizon is small but real.</li>
        <li>This tool shows the arithmetic of repayment strategies. It is not credit counseling or personalized advice. If minimums themselves are unaffordable, a nonprofit credit counselor or your lenders' hardship programs are the right next step.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Snowball and avalanche finish the same month for my debts. Why?",
      aHtml: `<p>Payoff time is driven almost entirely by total budget versus total debt — both strategies spend exactly the same amount every month, so the debt-free date often matches to the month. What differs is how much of that spending was interest, which is why the interest totals diverge even when the dates don't. The example on this page shows precisely this pattern: same 33 months, $534 apart in interest.</p>`,
    },
    {
      q: "Should I include my mortgage or car loan here?",
      aHtml: `<p>Include the debts you are considering for accelerated repayment. Comparing a high-rate card with a lower-rate secured loan can show why the rate order matters, but liquidity, collateral and penalty terms still belong in the decision. You can include the car loan to see the full schedule, then compare a second scenario without it.</p>`,
    },
    {
      q: "What if I can't pay more than the minimums?",
      aHtml: `<p>Set extra to zero — the calculator still shows your payoff date and total interest, which is worth knowing. Then look for one-off wins: the freed-minimum effect means even a temporary extra payment permanently accelerates the plan. If minimums themselves don't cover interest (the calculator will flag this), contact the lender about hardship options or a rate reduction before anything else.</p>`,
    },
    {
      q: "Is consolidating these debts into one loan better?",
      aHtml: `<p>Consolidation replaces several rates with one. It wins if that rate is genuinely lower than the weighted average you're paying now <em>and</em> the fees don't eat the savings, and it loses if the longer term stealthily adds interest back. Run this calculator on your current debts, then model the consolidation offer in the <a href="/loan-calculator/">Loan Calculator</a> and compare total interest over the actual payoff period, not the monthly payment.</p>`,
    },
    {
      q: "Does the calculator account for the minimums freeing up as debts die?",
      aHtml: `<p>Yes. That rollover is applied automatically under both strategies. When the personal loan in the example is cleared, its $150 minimum joins the extra budget from the following month, so the attack on the next target grows over time. This is the compounding engine that makes the later debts fall much faster than the first.</p>`,
    },
  ],
};
