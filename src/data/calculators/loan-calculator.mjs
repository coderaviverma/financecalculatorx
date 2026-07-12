export default {
  slug: "loan-calculator",
  category: "loans",
  title: "Loan Calculator",
  h1: "Loan Calculator",
  metaTitle: "Loan Calculator — Monthly Payment, Total Interest & Schedule",
  metaDescription:
    "Calculate any loan's monthly payment, total interest and full amortization schedule. Add extra payments to see interest saved and a faster payoff date.",
  tagline:
    "Work out the monthly payment for any fixed-rate loan, see exactly how much interest it costs, and test how extra payments change the schedule.",
  cardDescription: "Monthly payment, total interest and full amortization for any fixed-rate loan.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["borrow", "installment loan", "monthly payment"],
  keywords: ["loan payment", "loan interest", "amortization", "extra payment", "payoff"],
  related: ["loan-amortization-calculator", "extra-payment-calculator", "loan-payoff-calculator", "loan-comparison-calculator", "personal-loan-calculator", "emi-calculator"],
  sections: {
    howToHtml: `
      <p>Enter three things: how much you want to borrow, the annual interest rate your lender quotes, and the repayment term. The calculator immediately shows the required monthly payment, the total interest over the life of the loan, and a full month-by-month amortization schedule.</p>
      <ul>
        <li><strong>Loan amount</strong> — the principal you receive, before any fees are deducted.</li>
        <li><strong>Interest rate</strong> — the annual nominal rate. If your lender charges origination fees, the true cost (APR) is slightly higher; the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> handles fees explicitly.</li>
        <li><strong>Term</strong> — switch between years and months with the toggle. Car loans commonly run 36–72 months, personal loans 12–84 months.</li>
        <li><strong>Extra monthly payment</strong> — optional. Anything you add is applied directly to principal, and the schedule, payoff date and interest figures update to show the effect.</li>
      </ul>
      <p>Use <em>Copy link</em> to share a calculation — the link reproduces your exact inputs — and the schedule can be exported to CSV or printed as a report.</p>`,
    explanationHtml: `
      <h2>How loan payments actually work</h2>
      <p>Almost every mainstream loan — personal, car, education, home — is an <strong>amortizing loan</strong>: you repay it in equal monthly installments, and each installment is split between interest and principal. The split is not fixed. Interest is charged only on the balance you still owe, so in month one, when the balance is highest, the interest share is at its peak. As the balance falls, the interest portion of each payment shrinks and the principal portion grows, month after month, until the final payment clears the balance exactly.</p>
      <p>This is why the early years of a loan feel unproductive: on a 5-year, ${"$"}20,000 loan at 7.5%, about ${"$"}125 of the first ${"$"}400.76 payment is interest. By the final year, interest is only a few dollars per payment. The amortization table below the calculator shows this crossover explicitly for your numbers.</p>
      <p>Two consequences follow from this structure. First, <strong>the term drives total cost more than most people expect</strong> — stretching the same amount and rate over a longer term lowers the payment but raises the number of months on which interest accrues, so the total interest climbs sharply. Second, <strong>extra principal payments are disproportionately powerful early on</strong>, because money paid against principal in month 6 stops accruing interest for the entire remaining term.</p>
      <p>The calculator assumes the reducing-balance method with monthly compounding, which is how virtually all regulated consumer lenders in the US, UK, EU and India charge interest. If you've seen "flat rate" loans advertised (interest charged on the original balance for the whole term), be careful: a 7.5% flat rate is roughly equivalent to a 13–14% reducing-balance rate on a 5-year loan.</p>`,
    formulaHtml: `
      <p>The monthly payment on a fixed-rate amortizing loan is:</p>
      <div class="formula-block"><span class="fx">M = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly payment</li>
          <li><code>P</code> loan principal (amount borrowed)</li>
          <li><code>r</code> monthly interest rate = annual rate ÷ 12 (7.5% → 0.075 ÷ 12 = 0.00625)</li>
          <li><code>n</code> number of monthly payments</li>
        </ul>
      </div>
      <p>Each month the schedule is computed as: interest = balance × <code>r</code>; principal = payment − interest; new balance = balance − principal − any extra payment. When the rate is 0%, the payment is simply <code>P ÷ n</code>. Figures are rounded to the cent for display, and the final payment is adjusted by a few cents where needed so the balance closes at exactly zero. Payments are assumed to be made at the end of each month, matching standard lender convention.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $20,000 over 5 years at 7.5%</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.075 ÷ 12 = 0.00625, term <code>n</code> = 60 payments.</p>
        <p>(1 + 0.00625)<sup>60</sup> = 1.45329, so M = 20,000 × 0.00625 × 1.45329 ÷ 0.45329 = <strong>$400.76 per month</strong>.</p>
        <p>Over 60 payments the total repaid is $24,045.54, of which <strong>$4,045.54 is interest</strong> — about 20% on top of the amount borrowed.</p>
        <p>Adding a $100 extra payment each month clears the loan in <strong>47 months instead of 60</strong> and cuts interest to $3,080.99 — a saving of <strong>$964.55</strong> for a modest monthly top-up.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Interest rate.</strong> The payment moves less than you might think (on the example above, 1% more rate adds about $9/month), but total interest moves a lot — each extra point on the rate adds roughly $550 of interest per $20,000 borrowed over 5 years.</li>
        <li><strong>Term length.</strong> The single biggest lever on total cost. The same $20,000 at 7.5% costs $4,046 in interest over 5 years but $6,842 over 8 years — a 69% increase in cost for a $105 lower payment.</li>
        <li><strong>Extra payments.</strong> Every unit of currency paid early is removed from the balance for all remaining months. Earlier is better; even irregular extra payments help.</li>
        <li><strong>Fees.</strong> Origination or processing fees don't change the payment math but raise the true cost of borrowing. Compare loans on APR, not the nominal rate, when fees differ.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Results assume a <strong>fixed rate for the whole term</strong> and equal monthly payments. Variable-rate loans will deviate as their rate changes.</li>
        <li>Interest is compounded <strong>monthly on the reducing balance</strong>. A few lenders use daily accrual, which produces totals a fraction of a percent different.</li>
        <li>Fees, insurance add-ons, taxes and late-payment charges are <strong>not included</strong>.</li>
        <li>The payoff date assumes the first payment is one month from today and no payments are missed.</li>
        <li>Figures are estimates for planning and education — your lender's official quote and amortization statement govern the actual loan.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why is my quoted payment slightly different from this calculator?",
      aHtml: `<p>Three common reasons: your lender includes a fee or insurance premium in the payment, the first period is longer or shorter than one month (interest accrues for the extra days), or the lender uses daily rather than monthly accrual. Differences from rounding conventions are typically under a dollar; anything larger usually means a fee is embedded — ask for the loan's APR to see the true cost.</p>`,
    },
    {
      q: "Should I choose a longer term for the lower payment?",
      aHtml: `<p>A longer term reduces the required payment but increases the number of months on which interest is charged, so the total cost rises. A practical middle path: take the longer term for safety, then pay the difference as a voluntary extra payment. You get the lower obligation if money gets tight, and nearly the same interest savings as the shorter term while you keep paying extra — the calculator's extra-payment field shows exactly what that's worth.</p>`,
    },
    {
      q: "Does this work for car and education loans?",
      aHtml: `<p>Yes — any fixed-rate loan repaid in equal monthly installments follows this math. For car loans, remember the loan often covers taxes and add-ons, not just the vehicle price. For education loans that defer payments while studying, interest that accrues during the deferment is typically added to the balance before amortization starts, so enter the balance at the point repayment begins.</p>`,
    },
    {
      q: "Is the interest rate here the same as APR?",
      aHtml: `<p>Only when the loan has no fees. The nominal rate determines the payment; APR (annual percentage rate) also folds in mandatory fees to express the true yearly cost. If you're comparing two offers with different fees, use the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a>, which accounts for fees directly.</p>`,
    },
    {
      q: "How do extra payments interact with the required payment?",
      aHtml: `<p>The required payment stays the same; extra amounts reduce the principal immediately, which reduces the interest accrued in every later month and shortens the schedule from the end. Check that your lender applies extra amounts to principal (not as a prepayment of next month's installment) and whether any prepayment penalty applies — most personal and car loans have none, but it varies.</p>`,
    },
  ],
};
