export default {
  slug: "mortgage-payoff-calculator",
  category: "mortgage",
  title: "Mortgage Payoff Calculator",
  h1: "Mortgage Payoff Calculator",
  metaTitle: "Mortgage Payoff Calculator — Pay Off Your Home Loan Early",
  metaDescription:
    "See how much interest an extra monthly payment or lump sum saves on your existing mortgage, and how many months it cuts from your payoff date.",
  tagline:
    "See how an extra monthly amount or one-time payment could change a current mortgage's interest and payoff date.",
  cardDescription: "Interest saved and time cut by extra payments or a lump sum on an existing mortgage.",
  lastReviewed: "2026-08-30",
  version: "1.1",
  popular: false,
  featured: false,
  aliases: ["early mortgage payoff", "prepay mortgage", "extra mortgage payment"],
  keywords: ["mortgage payoff", "extra payment", "lump sum", "prepayment", "interest saved"],
  related: ["mortgage-amortization-calculator", "extra-payment-calculator", "early-loan-payoff-calculator", "refinance-calculator", "mortgage-calculator"],
  sections: {
    howToHtml: `
      <p>Pull three numbers from your latest mortgage statement: the current balance, the interest rate, and how long is left. Then describe the acceleration you're considering:</p>
      <ul>
        <li>An <strong>extra monthly payment</strong> is a recurring amount on top of the required payment, applied straight to principal.</li>
        <li>A <strong>one-time lump sum</strong> is a bonus or windfall, with a field for when you'd pay it (savings are larger the sooner it lands).</li>
        <li>You can combine both; the schedule recomputes with each keystroke.</li>
      </ul>
      <p>The headline is the modeled interest saving, and the chart compares the two balance paths. The calculation assumes every extra is applied immediately to principal; check the loan agreement and servicer instructions to see whether that assumption matches the actual account.</p>`,
    explanationHtml: `
      <h2>The mathematics of a mid-life mortgage</h2>
      <p>In this fixed-rate model, principal removed today no longer accrues interest in later months. On the default inputs, a <strong>$240,000 balance at 6% with 22 years left</strong>, the required payment is $1,639.38 and the remaining schedule contains <strong>$192,796</strong> of interest. Adding <strong>$200/month</strong> reduces that to $149,701: a modeled saving of <strong>$43,095</strong>, with the loan finishing <strong>4 years 4 months</strong> earlier.</p>
      <p>Time remaining changes the result substantially. The same $240,000 balance and 6% rate with only <strong>8 years left</strong> saves <strong>$4,985</strong> from the same $200 monthly extra, because fewer interest-bearing months remain. This does not make a late prepayment wrong; it shows why the interest-saving effect is smaller.</p>
      <p>Compare that saving with the alternatives available to you. Taxes, deductions, investment risk, emergency cash needs and the cost of borrowing the money back can all change the decision. The calculator only measures the mortgage schedule; it does not determine the best use of the cash.</p>
      <p>Three tools exist for killing a mortgage faster: <strong>prepay</strong> (what this calculator models: flexible, stop any time), <strong>recast</strong> (a lump sum plus a servicer re-amortization that lowers the required payment), and <strong>refinance</strong> (a new loan entirely; see the <a href="/refinance-calculator/">refinance calculator</a> when the issue is your rate rather than your balance).</p>`,
    formulaHtml: `
      <p>Both plans run the same declining-balance schedule; only the payment differs:</p>
      <div class="formula-block"><span class="fx">B<sub>k</sub> = B<sub>k−1</sub> × (1 + r) − (M + E<sub>k</sub>)</span>
        <ul class="formula-vars">
          <li><code>B<sub>k</sub></code> balance after month k (B₀ = current balance)</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>M</code> required payment for the remaining term</li>
          <li><code>E<sub>k</sub></code> your extra that month (recurring, lump sum, or both)</li>
        </ul>
      </div>
      <p>Interest saved = (interest under the current plan) − (interest under the accelerated plan), where each plan's interest is the sum of B<sub>k−1</sub> × r over its own schedule. Months saved is the difference in schedule lengths. The lump sum enters at the month you choose; the final payment of each plan is trimmed so the balance ends at exactly zero.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $240,000 at 6%, 22 years left, +$200/month</div><div class="ex-body">
        <p>Required payment on the remaining term: <strong>$1,639.38</strong>. Staying the course, the remaining 264 payments carry <strong>$192,796</strong> of interest.</p>
        <p>Paying $1,839.38 instead clears the loan in <strong>212 months</strong> (17 yr 8 mo), 52 months early, with total interest of <strong>$149,701</strong>. Interest saved: <strong>$43,095</strong>.</p>
        <p>Alternative: a single <strong>$10,000</strong> lump sum next month (no recurring extra) saves <strong>$25,257</strong> and 21 months in this schedule. Its timing differs from gradual monthly extras, so comparisons should use the same total amount and payment dates.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Years remaining.</strong> The dominant factor: $200/month saves $43,095 with 22 years left, but only $4,985 with 8 years left on the same balance and rate. In the model, earlier prepayments avoid the most interest because the balance, and therefore each month's interest charge, is largest at the start.</li>
        <li><strong>Rate.</strong> A higher note rate increases the modeled interest avoided by reducing principal. Compare that result with the after-tax return, risk and liquidity of other uses for the money.</li>
        <li><strong>Lump timing.</strong> Moving a lump sum earlier adds interest-bearing months. The month field lets you compare paying now versus after your next bonus.</li>
        <li><strong>Liquidity.</strong> Prepaid principal is hard to access again without borrowing or selling, so cash-reserve needs such as an emergency fund are part of the trade-off the calculator doesn't measure.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Assumes extras are applied to principal immediately and the required payment stays fixed. A servicer recast, which lowers the required payment after a lump sum, is a different transaction.</li>
        <li>No prepayment charge is modeled. Check the note and current servicer instructions before making an extra payment.</li>
        <li>Taxes and deductions are not modeled. Their treatment and effect vary by jurisdiction and taxpayer.</li>
        <li>Interest saved is not discounted to present value: a dollar of interest avoided in 2044 is treated the same as one avoided next year.</li>
        <li>Refinancing changes the rate, term and fees rather than only the balance. The <a href="/refinance-calculator/">refinance calculator</a> models that separate scenario.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Is paying extra on the mortgage better than investing the money?",
      aHtml: `<p>This calculator measures interest avoided under the mortgage's current rate and payment rules. Investing has an uncertain return, while prepaying reduces liquidity and may interact with taxes or deductions. Compare both on an after-tax basis and keep cash needs in view; the mortgage result alone cannot choose between them.</p>`,
    },
    {
      q: "How do prepayment, recasting and refinancing differ?",
      aHtml: `<p>This calculator models prepayment: additional principal with the scheduled payment otherwise unchanged. A recast is a separate servicer transaction that re-amortizes a lower balance and may involve eligibility rules or a fee. A refinance replaces the loan and introduces a new rate, term and closing costs; its break-even math is available in the <a href="/refinance-calculator/">refinance calculator</a>. The tool does not select among those transactions.</p>`,
    },
    {
      q: "Why does the same extra payment save so little on an older loan?",
      aHtml: `<p>Because savings come from removing future interest-bearing months, and an older loan has few left. With 22 years remaining, a prepaid dollar avoids interest for up to 264 months; with 8 years left, at most 96. That's why the identical $200/month saves $43,095 in the first case and $4,985 in the second.</p>`,
    },
    {
      q: "How can I model one extra payment each year?",
      aHtml: `<p>Divide the annual extra by 12 and enter that amount as a recurring monthly extra to create an approximate comparison. An annual payment and twelve monthly increments do not have identical timing, so the approximation can differ slightly from the actual schedule. For the default loan, an extra equal to one scheduled payment is roughly $137 per month.</p>`,
    },
    {
      q: "Does the calculator know how my servicer applies extras?",
      aHtml: `<p>No. It assumes the entered extra reduces principal in the selected month. Actual posting rules can depend on the loan agreement, account status and payment instructions. Compare the calculator's balance change with the next statement or ask the servicer how an unscheduled amount will be allocated.</p>`,
    },
  ],
};
