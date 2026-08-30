export default {
  slug: "debt-payoff-calculator",
  category: "personal",
  title: "Debt Payoff Calculator",
  h1: "Debt Payoff Calculator",
  metaTitle: "Debt Payoff Calculator — Snowball vs Avalanche, With Real Numbers",
  metaDescription:
    "List debts and see a modeled payoff date. Compares snowball and avalanche month by month, including interest totals and a timeline chart.",
  tagline:
    "Compare snowball and avalanche repayment using your balances, rates, minimum payments and available monthly budget.",
  cardDescription: "Multi-debt payoff plan comparing snowball vs avalanche month by month.",
  scenarioHint: "Save your plan as Scenario A, then change the extra monthly amount or switch strategy and save Scenario B — the table shows the difference in debt-free date and total interest.",
  lastReviewed: "2026-08-30",
  version: "1.1",
  popular: true,
  featured: true,
  jumpExplainLabel: "Snowball vs avalanche",
  aliases: ["debt free", "pay off credit cards", "debt strategy"],
  keywords: ["debt payoff", "snowball", "avalanche", "credit card debt", "debt free date"],
  related: ["loan-payoff-calculator", "extra-payment-calculator", "budget-calculator", "loan-calculator", "early-loan-payoff-calculator"],
  sections: {
    howToHtml: `
      <p>The calculator accepts each debt's current balance, APR and required minimum payment, plus an extra monthly amount beyond the minimums. An extra amount of zero produces the fixed-minimum baseline.</p>
      <ul>
        <li><strong>Strategy toggle.</strong> Avalanche sends every spare unit to the highest-rate debt; Snowball sends it to the smallest balance. The results panel reports the other strategy for comparison.</li>
        <li><strong>Rolling minimums.</strong> When a debt is cleared, its minimum payment automatically joins your extra budget (that's the "snowball" effect, and the calculator applies it to both strategies).</li>
        <li>The <strong>Payoff order</strong> table shows the month and date each debt is cleared; the <strong>Monthly timeline</strong> view tracks total balance, interest accrued and amount paid every month, and exports to CSV.</li>
      </ul>
      <p>If an entered minimum does not cover modeled monthly interest, the calculator flags the schedule as non-amortizing under those inputs.</p>`,
    explanationHtml: `
      <h2>How snowball and avalanche differ</h2>
      <p>Both strategies pay every minimum every month, and both throw all spare budget at one target debt at a time. The only difference is targeting: <strong>avalanche</strong> attacks the highest interest rate first, <strong>snowball</strong> attacks the smallest balance first.</p>
      <p>With fixed rates, no new borrowing and the same monthly budget, avalanche minimizes modeled interest because extra money reaches the highest-rate balance first. In the default example (three debts totaling $25,000 with $300/month extra), avalanche costs <strong>$4,773 in interest</strong> versus snowball's <strong>$5,308</strong>: a $534 difference, with both finishing in 33 months.</p>
      <p>Snowball front-loads account completion. In the default case, targeting the $5,000 balance first clears one account earlier, while each cleared minimum is then redirected under both strategies. The calculator reports that timing difference but does not infer motivation or likelihood of maintaining a plan.</p>
      <p>The interest gap depends on the entered balances and rate spread. It is $534 in the default profile and can be smaller or larger in another profile. The tool quantifies total interest, payoff dates and first-account timing without selecting a strategy.</p>`,
    formulaHtml: `
      <p>There is no closed-form formula for this multi-debt payoff model, so the calculator runs the following fixed-rate monthly simulation:</p>
      <div class="formula-block"><span class="fx">each month: interest<sub>d</sub> = balance<sub>d</sub> × APR<sub>d</sub> ⁄ 12 → pay minimums → extra + freed minimums → target debt</span></div>
      <ol>
        <li>Interest accrues on every open balance at its own monthly rate (APR ÷ 12).</li>
        <li>Every debt receives its minimum payment.</li>
        <li>The extra budget, plus the minimums of any already-cleared debts, goes entirely to the target: highest APR (avalanche) or smallest starting balance (snowball).</li>
        <li>When the target dies, the next debt in order becomes the target.</li>
      </ol>
      <p>The simulation runs until every balance reaches zero, capping at 100 years. Interest totals are the sum of all monthly accruals, rounded to the cent. Both strategies are simulated on every calculation, so the comparison is internally consistent with the stated inputs and assumptions; a minimums-only baseline is computed the same way.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: three debts, $25,000 total, $300/month extra</div><div class="ex-body">
        <p>Credit card $8,000 at 22.9% (min $200) · Car loan $12,000 at 9.5% (min $280) · Personal loan $5,000 at 14% (min $150). Total minimums $630, so the monthly debt budget is $930.</p>
        <p><strong>Avalanche</strong> order: credit card → personal loan → car loan. Debt-free in <strong>33 months</strong> with <strong>$4,773.44</strong> interest.</p>
        <p><strong>Snowball</strong> order: personal loan → credit card → car loan. Also 33 months, but <strong>$5,307.68</strong> interest, which is $534.24 more; the first account is cleared sooner.</p>
        <p><strong>Minimums only</strong>: 57 months and <strong>$10,331.53</strong> of interest. Compared with that scenario, the $300 extra reduces modeled interest by more than $5,500 and payoff time by 24 months; this comparison is specific to the displayed profile.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>The extra amount has the larger effect here.</strong> Going from $0 to $300 extra in the example saves about $5,558; choosing avalanche over snowball saves $534. The available budget matters more than the ordering choice in this particular case.</li>
        <li><strong>Rate spread.</strong> A wider gap between entered APRs generally increases avalanche's modeled interest advantage; clustered rates can produce similar totals.</li>
        <li><strong>Balance distribution.</strong> When a small balance has a low rate, snowball can clear it early while leaving a higher-rate balance outstanding longer.</li>
        <li><strong>New debt.</strong> The simulation assumes no new borrowing. Future charges or balance transfers require a new scenario.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>APRs are treated as <strong>fixed</strong>. Variable or promotional rates require separate scenarios for the applicable periods.</li>
        <li>Minimum payments are modeled as <strong>constant amounts</strong>. An account whose minimum is recalculated from the balance will follow a different schedule.</li>
        <li>Fees (annual fees, late fees, balance-transfer costs) are not included.</li>
        <li>Interest accrues monthly in this model. An account using daily accrual or a recalculated minimum will follow a different schedule.</li>
        <li>This tool shows the arithmetic of repayment strategies. It does not determine eligibility for hardship programs or replace a lender's current account terms.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Snowball and avalanche finish the same month for my debts. Why?",
      aHtml: `<p>With the same debts and scheduled monthly budget, the two modeled payoff dates can be close because both strategies apply that budget until the final partial payment. Rates and payment allocation still affect how quickly principal falls, so the dates need not match. The example on this page produces the same 33-month payoff date under both orders, with a $534 difference in interest.</p>`,
    },
    {
      q: "Should I include my mortgage or car loan here?",
      aHtml: `<p>The model accepts any entered debt, including a mortgage or car loan. A secured loan introduces collateral, liquidity and contract terms that are not valued by the ordering simulation. Separate scenarios with and without the loan show its effect on the modeled schedule.</p>`,
    },
    {
      q: "What if I can't pay more than the minimums?",
      aHtml: `<p>Set extra to zero to compute the fixed-minimum baseline. A separate scenario can add a temporary or recurring extra and show its schedule effect. If an entered minimum does not cover modeled interest, the calculator flags that the balance will not amortize under those inputs; it does not prescribe a remedy.</p>`,
    },
    {
      q: "Is consolidating these debts into one loan better?",
      aHtml: `<p>Consolidation replaces the current balances with a new amount, rate, term and fees. Model the existing debts here and the written consolidation offer in the <a href="/loan-calculator/">Loan Calculator</a>, then compare payments and total cost over the same assumed period. This calculator does not determine whether an offer is available or suitable.</p>`,
    },
    {
      q: "Does the calculator account for the minimums freeing up as debts die?",
      aHtml: `<p>Yes. That rollover is applied automatically under both strategies. When the personal loan in the example is cleared, its $150 minimum joins the extra budget from the following month, so the attack on the next target grows over time. This is the compounding engine that makes the later debts fall much faster than the first.</p>`,
    },
  ],
};
