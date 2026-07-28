export default {
  slug: "loan-calculator",
  category: "loans",
  title: "Loan Calculator",
  h1: "Loan Calculator",
  metaTitle: "Loan Calculator — Monthly Payment, Total Interest & Schedule",
  metaDescription:
    "Calculate any loan's monthly payment, total interest and full amortization schedule. Add extra payments to see interest saved and a faster payoff date.",
  tagline:
    "Check a fixed-rate loan's monthly payment and total interest, then see how extra payments change the schedule.",
  cardDescription: "Monthly payment, total interest and full amortization for any fixed-rate loan.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: true,
  featured: true,
  aliases: ["borrow", "installment loan", "monthly payment"],
  keywords: ["loan payment", "loan interest", "amortization", "extra payment", "payoff"],
  related: ["loan-amortization-calculator", "extra-payment-calculator", "loan-payoff-calculator", "loan-comparison-calculator", "personal-loan-calculator", "emi-calculator"],
  sections: {
    howToHtml: `
      <p>Enter the amount you plan to borrow, the annual interest rate and the repayment term. The results show the modeled monthly payment, total interest and month-by-month schedule.</p>
      <ul>
        <li><strong>Loan amount</strong> is the principal you receive, before any fees are deducted.</li>
        <li><strong>Interest rate</strong> is the annual nominal rate. If your lender charges origination fees, the true cost (APR) is higher than the nominal rate — by how much depends on the fee; the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> handles fees explicitly.</li>
        <li><strong>Term</strong> switches between years and months with the toggle. Typical term ranges vary by lender and market: car loans are often in the 36–72 month range and personal loans 12–84 months, but use the term from your own offer.</li>
        <li><strong>Extra monthly payment</strong> is optional. Anything you add is applied directly to principal, and the schedule, payoff date and interest figures update to show the effect.</li>
      </ul>
      <p>Use <em>Copy link</em> to share a calculation (the link reproduces your exact inputs), and the schedule can be exported to CSV or printed as a report.</p>`,
    explanationHtml: `
      <h2>How loan payments actually work</h2>
      <p>Many fixed-rate personal, car, education and home loans are <strong>amortizing loans</strong>: you repay them in scheduled installments, and each installment is split between interest and principal. The split is not fixed. In the monthly reducing-balance model used here, interest is charged on the balance you still owe, so in month one, when the balance is highest, the interest share is at its peak. As the balance falls, the interest portion of each payment shrinks and the principal portion grows until the final modeled payment clears the balance.</p>
      <p>This is why the early years of a loan feel unproductive: on a 5-year, ${"$"}20,000 loan at 7.5%, about ${"$"}125 of the first ${"$"}400.76 payment is interest. By the final year, interest is only a few dollars per payment. The amortization table below the calculator shows this crossover explicitly for your numbers.</p>
      <p>A longer term lowers the required payment but adds more months of interest. An extra principal payment has a larger modeled effect earlier in the schedule because the reduced balance affects more future periods. Compare both the payment and the total interest before choosing a term.</p>
      <p>The calculator assumes a reducing balance with the annual rate divided into monthly periods. This is a common fixed-payment convention, but lenders may instead use daily accrual, different day-count rules, fees or payment-rounding methods. If you've seen "flat rate" loans advertised (interest charged on the original balance for the whole term), compare the total repayment or legally disclosed APR rather than comparing the headline percentages directly.</p>`,
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
      <p>Each month the schedule is computed as: interest = balance × <code>r</code>; principal = payment − interest; new balance = balance − principal − any extra payment. When the rate is 0%, the payment is simply <code>P ÷ n</code>. Figures are rounded to the cent for display, and the final payment is adjusted by a few cents where needed so the balance closes at exactly zero. Payments are assumed to be made at the end of each month, a common lender convention.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $20,000 over 5 years at 7.5%</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.075 ÷ 12 = 0.00625, term <code>n</code> = 60 payments.</p>
        <p>(1 + 0.00625)<sup>60</sup> = 1.45329, so M = 20,000 × 0.00625 × 1.45329 ÷ 0.45329 = <strong>$400.76 per month</strong>.</p>
        <p>Over 60 payments the total repaid is $24,045.54, of which <strong>$4,045.54 is interest</strong>, about 20% on top of the amount borrowed.</p>
        <p>Adding a $100 extra payment each month clears the loan in <strong>47 months instead of 60</strong> and cuts interest to $3,080.99, a saving of <strong>$964.55</strong> for a modest monthly top-up.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Interest rate.</strong> The payment moves less than you might think (on the example above, 1% more rate adds about $9/month), but total interest moves a lot: each extra point on the rate adds roughly $550 of interest per $20,000 borrowed over 5 years.</li>
        <li><strong>Term length.</strong> In this example, the same $20,000 at 7.5% costs $4,046 in interest over 5 years and $6,842 over 8 years, a 69% increase in cost for a $105 lower payment.</li>
        <li><strong>Extra payments.</strong> Every unit of currency paid early is removed from the balance for all remaining months. Earlier is better; even irregular extra payments help.</li>
        <li><strong>Fees.</strong> Origination or processing fees don't change the payment math but raise the true cost of borrowing. Compare loans on APR, not the nominal rate, when fees differ.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Results assume a <strong>fixed rate for the whole term</strong> and equal monthly payments. Variable-rate loans will deviate as their rate changes.</li>
        <li>Interest is compounded <strong>monthly on the reducing balance</strong>. A few lenders use daily accrual, which produces totals a fraction of a percent different.</li>
        <li>Fees, insurance add-ons, taxes and late-payment charges are <strong>not included</strong>.</li>
        <li>The payoff date assumes the first payment is one month from today and no payments are missed.</li>
        <li>Figures are estimates for planning and education. Your lender's official quote and amortization statement govern the actual loan.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why is my quoted payment slightly different from this calculator?",
      aHtml: `<p>Possible reasons include fees or insurance in the payment, a first period that is longer or shorter than one month, daily rather than monthly accrual, or a different rounding method. Compare the calculator assumptions with the lender's itemized quote and payment schedule instead of inferring the cause from the size of the difference.</p>`,
    },
    {
      q: "Should I choose a longer term for the lower payment?",
      aHtml: `<p>A longer term lowers the required payment and adds more months of interest. A shorter term does the reverse. You can model a longer term with voluntary extra payments, but that result assumes the extras continue and the lender applies them to principal. Compare the contractual obligation separately from the optional-payment scenario.</p>`,
    },
    {
      q: "Does this work for car and education loans?",
      aHtml: `<p>Yes — any fixed-rate loan repaid in equal monthly installments follows this math. For car loans, remember the loan often covers taxes and add-ons, not just the vehicle price. For education loans that defer payments while studying, interest that accrues during the deferment is often capitalized (added to the balance) when repayment begins — rules differ by loan program and jurisdiction, so check your terms and enter the balance at the point repayment begins.</p>`,
    },
    {
      q: "Is the interest rate here the same as APR?",
      aHtml: `<p>Only when the loan has no fees. The nominal rate determines the payment; APR (annual percentage rate) also folds in mandatory fees to express the true yearly cost. If you're comparing two offers with different fees, use the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a>, which accounts for fees directly.</p>`,
    },
    {
      q: "How do extra payments interact with the required payment?",
      aHtml: `<p>In this model the required payment stays the same and extra amounts reduce principal immediately, lowering later interest and shortening the schedule. Check how your lender applies excess payments and whether the agreement includes a prepayment charge before relying on that result.</p>`,
    },
  ],
};
