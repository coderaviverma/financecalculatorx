export default {
  slug: "how-loan-interest-works",
  title: "How Loan Interest Works",
  metaTitle: "How Loan Interest Works — Reducing Balance Explained",
  metaDescription:
    "Where each modeled loan payment goes: reducing-balance interest month by month, nominal rate vs APR, and a worked flat-rate comparison.",
  description:
    "What a loan's interest rate actually does each month — how interest accrues on the balance, why early payments are interest-heavy, and how to read a rate quote.",
  cardDescription: "How interest accrues on a reducing balance, why early payments favor interest, and a flat-rate comparison.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["loans"],
  aliases: [],
  keywords: ["how loan interest works", "reducing balance interest", "flat rate vs reducing rate", "loan interest calculation", "daily accrual loan"],
  relatedCalculators: ["loan-calculator", "loan-interest-calculator", "loan-amortization-calculator"],
  bodyHtml: `
<p>Loan interest is the charge for using money that has not yet been repaid. On a reducing-balance loan, the charge changes as the balance changes. The worked month below shows that calculation, followed by the effect of term length, fees and flat-rate pricing.</p>

<h2>Interest accrues on the balance, not the original loan</h2>
<p>This guide uses a monthly <strong>reducing-balance method</strong> (also called declining balance). The model multiplies the current balance by the annual rate divided by 12, so a 9% rate produces a 0.75% monthly rate on what remains. A contract using daily accrual, a different day-count convention or flat-rate pricing will not match this calculation.</p>
<figure class="article-figure">
<img src="/assets/img/guides/loan-payment-flow.svg" width="760" height="360" loading="lazy" decoding="async" alt="Flow of a $373.28 loan payment: $112.50 covers interest, $260.78 reduces principal, and the $15,000 balance falls to $14,739.22.">
<figcaption>Follow one payment from the opening balance to the next month's smaller balance. The payment stays fixed; the two pieces inside it change.</figcaption>
</figure>
<div class="example-block"><div class="ex-head">Everyday worked example (hypothetical): $15,000 at 9% over 48 months</div><div class="ex-body">
<p>The fixed monthly payment on this loan is <strong>$373.28</strong>. Here is exactly what happens in month one:</p>
<ul>
<li>Interest charged: $15,000 × (9% ÷ 12) = $15,000 × 0.0075 = <strong>$112.50</strong></li>
<li>Principal repaid: $373.28 − $112.50 = <strong>$260.78</strong></li>
<li>New balance: $15,000 − $260.78 = <strong>$14,739.22</strong></li>
</ul>
<p>Month two repeats the same arithmetic on the smaller balance: interest is $14,739.22 × 0.0075 = <strong>$110.54</strong>, so principal rises to $262.73 and the balance falls to $14,476.49. Every month, the interest share shrinks by a couple of dollars and the principal share grows by the same amount, while the payment itself never changes.</p>
</div></div>
<p>Run that loop 48 times and the loan closes at exactly zero, having cost <strong>$2,917.23 in total interest</strong> on $17,917.23 of total payments. You can reproduce every row of this with the <a href="/loan-calculator/">Loan Calculator</a>, which builds the full schedule from the same three inputs.</p>
<div class="callout note"><span class="c-title">How I check the calculator</span>
<p>When I test a loan result, I rebuild the first schedule row by hand: opening balance × periodic rate, then payment − interest. It is less glamorous than staring at the final total, but it catches a wrong rate convention immediately. A polished 48-row table cannot rescue a bad first row.</p></div>
<p>Because interest is proportional to the balance, and the balance is highest at the start, the interest share of each payment peaks in month one and declines from there. On the example loan, interest takes $112.50 of the first payment but only <strong>$2.78 of the last one</strong>. By the final month, the balance is so small that almost the entire payment is principal.</p>
<p>The lopsidedness is easy to quantify. On the example loan, <strong>half of all the interest has been paid by month 15</strong> of 48, less than a third of the way through, while the balance doesn't fall to half of the original $15,000 until month 27. By the loan's midpoint at month 24, $2,129.30 of the $2,917.23 total interest (73%) is already paid. Interest is front-loaded because balances are front-loaded; the two statements are the same fact.</p>
<p>This is a mechanical consequence of the reducing-balance rule. In this model, a $500 principal reduction in month 3 avoids more later interest than the same reduction in month 40 because more accrual periods remain. The guide on <a href="/guides/how-extra-payments-reduce-interest/">how extra payments reduce interest</a> quantifies that model, and <a href="/guides/how-loan-amortization-works/">how loan amortization works</a> shows how the whole schedule is constructed.</p>

<h2>One loan, three rate numbers</h2>
<p>A loan quote can contain several rate measures that answer different questions:</p>
<ul>
<li><strong>Nominal annual rate</strong>: the quoted rate, e.g. 9%. Divided by 12, it produces the monthly rate used in the payment math above. It ignores fees and ignores compounding across the year.</li>
<li><strong>APR (annual percentage rate)</strong>: a disclosure measure whose included charges and calculation depend on the governing rules. The CFPB's U.S. auto-loan <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-an-interest-rate-and-the-annual-percentage-rate-apr-in-an-auto-loan-en-733/" rel="noopener">interest-rate versus APR explainer</a> describes APR as including the interest rate plus additional loan fees. The full model used on this site is in <a href="/guides/apr-vs-interest-rate/">APR vs interest rate</a>.</li>
<li><strong>Effective annual rate</strong>: what a stated periodic rate compounds to over a year. In pure rate-conversion math, a 9% nominal rate divided monthly compounds to 9.38%; dividing it daily compounds to 9.42%. These are calculated conventions, not a claim about a particular contract.</li>
</ul>
<div class="callout note"><span class="c-title">Daily accrual and your due date</span>
<p>In a daily-accrual model, moving a principal payment earlier reduces the number of days for which that balance accrues interest. In this guide's monthly model, changing the date within one modeled cycle has no effect. Actual posting and crediting follow the contract. The CFPB explains <a href="https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/" rel="noopener">daily-rate interest for U.S. credit cards</a>.</p></div>

<h2>A flat-rate comparison</h2>
<p>A <strong>flat-rate model</strong> computes interest on the original amount for the full term rather than on each period's remaining balance. The same numeric rate therefore does not describe the same cash flows under the two methods. The table compares them at an identical 9% label, principal and term.</p>
<div class="table-scroll"><table>
<thead><tr><th>$15,000 over 48 months</th><th>9% reducing balance</th><th>9% flat rate</th></tr></thead>
<tbody>
<tr><td>Interest computed on</td><td>Remaining balance each month</td><td>$15,000 for all 4 years</td></tr>
<tr><td>Total interest</td><td>$2,917.23</td><td>$5,400.00 ($15,000 × 9% × 4)</td></tr>
<tr><td>Monthly payment</td><td>$373.28</td><td>$425.00</td></tr>
<tr><td>Equivalent reducing-balance rate</td><td>9%</td><td><strong>≈ 15.99%</strong></td></tr>
</tbody>
</table></div>
<p>For these exact inputs, the 9% flat calculation has the same payment as a <strong>15.99% reducing-balance calculation</strong>. Dividing 15.99 by 9 gives about 1.78, but that ratio belongs only to this rate and 48-month term; it is not a conversion rule. The <a href="/loan-interest-calculator/">Loan Interest Calculator</a> compares the complete payment and interest cash flows for other inputs.</p>

<h2>Payment allocation is a model assumption</h2>
<p>The schedule above allocates each modeled payment first to that month's calculated interest and then to principal; any modeled extra amount reduces principal immediately. It does not infer a lender's or servicer's allocation rules. Contract terms, fees, posting dates or another allocation method can produce a different balance path.</p>

<h2>What makes total interest rise</h2>
<p>Total interest is the sum of (balance × monthly rate) across every month of the loan, so it grows with anything that raises balances or adds months:</p>
<div class="table-scroll"><table>
<thead><tr><th>Scenario ($15,000 borrowed)</th><th>Monthly payment</th><th>Total interest</th></tr></thead>
<tbody>
<tr><td>9%, 48 months (base case)</td><td>$373.28</td><td>$2,917.23</td></tr>
<tr><td>9%, 72 months (longer term)</td><td>$270.38</td><td>$4,467.58</td></tr>
<tr><td>12%, 48 months (higher rate)</td><td>$395.01</td><td>$3,960.36</td></tr>
</tbody>
</table></div>
<p>In this table, stretching the term from 4 to 6 years lowers the payment by about $103 but raises modeled total interest by 53% because the balance accrues interest for more months. Raising the rate from 9% to 12% adds about $22 to the payment and over $1,000 to the modeled total.</p>
<div class="callout warn"><span class="c-title">Payment and total cost answer different questions</span>
<p>In the table, the 72-month scenario has a lower monthly payment and higher modeled total interest than the 48-month scenario. The <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> displays both measures side by side while holding the borrowed amount constant.</p></div>
<p>Everything above describes a fixed-rate, monthly-accrual model. A contract may instead use daily accrual, another day-count rule, fees, per-payment rounding or variable rates. This calculator cannot determine those terms; the agreement and statement define the cash flows for a specific loan.</p>

<section class="guide-faq faq" aria-labelledby="loan-interest-questions">
<h2 id="loan-interest-questions">Beginner questions about loan interest</h2>
<details><summary>Does the interest charge fall every month?</summary><div class="faq-a"><p>In this fixed-rate monthly model, yes: each scheduled payment reduces principal, so the next interest calculation uses a smaller balance. A statement can follow a different pattern when its rate, accrual interval, payment timing, fees or rounding differ from the model.</p></div></details>
<details><summary>Why did my extra payment not reduce the next interest charge?</summary><div class="faq-a"><p>The calculator predicts a reduction only when the extra amount lowers principal immediately. It cannot diagnose a statement that differs. The contract's allocation method, transaction record and resulting principal balance provide the relevant comparison.</p></div></details>
<details><summary>Is paying early the same as paying extra?</summary><div class="faq-a"><p>They are separate inputs. Moving a scheduled payment date changes interest only in a model that accrues by date; adding principal lowers the modeled balance. How either transaction is recorded is outside this calculator and depends on the contract.</p></div></details>
</section>
`,
};
