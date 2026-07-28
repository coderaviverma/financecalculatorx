export default {
  slug: "how-loan-interest-works",
  title: "How Loan Interest Works",
  metaTitle: "How Loan Interest Works — Reducing Balance Explained",
  metaDescription:
    "Where each loan payment goes: reducing-balance interest month by month, nominal rate vs APR, and why flat-rate quotes cost nearly twice as much.",
  description:
    "What a loan's interest rate actually does each month — how interest accrues on the balance, why early payments are interest-heavy, and how to read a rate quote.",
  cardDescription: "How interest accrues on a reducing balance, why early payments favor interest, and the flat-rate trap.",
  lastReviewed: "2026-07-22",
  published: "2026-07-12",
  categories: ["loans"],
  aliases: [],
  keywords: ["how loan interest works", "reducing balance interest", "flat rate vs reducing rate", "loan interest calculation", "daily accrual loan"],
  relatedCalculators: ["loan-calculator", "loan-interest-calculator", "loan-amortization-calculator"],
  bodyHtml: `
<p>Loan interest is the charge for using money that has not yet been repaid. On a reducing-balance loan, the charge changes as the balance changes. The worked month below shows that calculation, followed by the effect of term length, fees and flat-rate pricing.</p>

<h2>Interest accrues on the balance, not the original loan</h2>
<p>Many amortizing consumer loans use a <strong>reducing-balance method</strong> (also called declining balance), but the accrual interval and rate convention vary. In the monthly model used here, the lender multiplies the current balance by the annual rate divided by 12, so a 9% rate produces a 0.75% monthly rate on what remains. Daily-accrual products and flat-rate quotes follow different rules.</p>
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
<p>This is a mechanical consequence of the reducing-balance rule, not a trick. But it has a practical implication: money you pay toward principal <em>early</em> in a loan removes a balance that would have been charged interest for every remaining month. The same extra $500 does more good in month 3 than in month 40. The guide on <a href="/guides/how-extra-payments-reduce-interest/">how extra payments reduce interest</a> quantifies this, and <a href="/guides/how-loan-amortization-works/">how loan amortization works</a> shows how the whole schedule is constructed.</p>

<h2>One loan, three rate numbers</h2>
<p>Lenders and regulators express the cost of the same loan in several ways, and confusing them is expensive:</p>
<ul>
<li><strong>Nominal annual rate</strong>: the quoted rate, e.g. 9%. Divided by 12, it produces the monthly rate used in the payment math above. It ignores fees and ignores compounding across the year.</li>
<li><strong>APR (annual percentage rate)</strong>: the nominal rate <em>plus mandatory fees</em>, restated as a yearly cost of the money you received in hand. A 9% loan with an origination fee has an APR above 9%. When fees are zero, APR equals the nominal rate. The CFPB publishes a short <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-an-interest-rate-and-the-annual-percentage-rate-apr-in-an-auto-loan-en-733/" rel="noopener">explainer on the interest rate versus the APR</a> that draws the same line; the full mechanics are in <a href="/guides/apr-vs-interest-rate/">APR vs interest rate</a>.</li>
<li><strong>Effective annual rate</strong>: what the rate compounds to over a year. A 9% nominal rate charged monthly compounds to 9.38% per year; charged daily, 9.42%. Consumer-loan accrual conventions vary, while credit cards commonly use a daily periodic rate. The difference is small on an installment loan but real.</li>
</ul>
<div class="callout note"><span class="c-title">Daily accrual and your due date</span>
<p>With daily-accrual loans, paying a few days early genuinely reduces interest, because the balance drops before more days of interest are charged. With monthly-accrual loans it usually doesn't, since the charge is computed once per cycle. Credit cards are the everyday case: the CFPB explains <a href="https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-issuer-calculate-the-amount-of-interest-i-owe-en-51/" rel="noopener">how card issuers compute interest from a daily rate</a>. Your loan agreement states which method applies.</p></div>

<h2>The flat-rate trap</h2>
<p>Some lenders quote a <strong>flat rate</strong> instead, a practice common in car finance, small personal loans, and informal lending in many countries. Here interest is computed on the <em>original</em> amount for the whole term, ignoring the fact that you repay as you go. A flat quote looks similar to a reducing-balance quote but describes a much more expensive loan.</p>
<div class="table-scroll"><table>
<thead><tr><th>$15,000 over 48 months</th><th>9% reducing balance</th><th>9% flat rate</th></tr></thead>
<tbody>
<tr><td>Interest computed on</td><td>Remaining balance each month</td><td>$15,000 for all 4 years</td></tr>
<tr><td>Total interest</td><td>$2,917.23</td><td>$5,400.00 ($15,000 × 9% × 4)</td></tr>
<tr><td>Monthly payment</td><td>$373.28</td><td>$425.00</td></tr>
<tr><td>Equivalent reducing-balance rate</td><td>9%</td><td><strong>≈ 15.99%</strong></td></tr>
</tbody>
</table></div>
<p>The 9% flat loan charges the same interest as a <strong>15.99% reducing-balance loan</strong> — nearly 1.8 times the quoted figure. The ratio isn't fixed, but for typical 3–5 year terms a flat rate corresponds to a reducing-balance rate roughly 1.8–2 times higher. The intuition: across an amortizing loan's life your average outstanding balance is only a bit more than half the original amount, yet a flat quote charges interest on the full amount for every month of the term. Doubling the effective rate on half the balance is roughly a wash, which is where the near-2× relationship comes from; it softens slightly because early balances run above the average. Whenever a quote seems suspiciously low, ask whether it's flat or reducing, or compute the true payment yourself with the <a href="/loan-interest-calculator/">Loan Interest Calculator</a>.</p>

<h2>How lenders apply your payment</h2>
<p>Payment-application rules are contractual and jurisdiction-specific. A common order applies accrued interest and eligible charges before principal, so a partial payment may reduce principal less than expected. If you overpay, ask how the excess is handled: it may reduce principal immediately, sit as a credit toward the next installment, or be treated as an early future payment. The same overpayment can produce very different savings depending on this policy, so check the agreement or ask the servicer before setting up extra payments.</p>

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
<p>Stretching the term from 4 to 6 years lowers the payment by about $103 but raises total interest by 53%: the balance stays higher for longer, and there are more months of accrual. Raising the rate from 9% to 12% adds about $22 to the payment but over $1,000 to the total. Term is easy to overlook because it lowers the required payment while adding more months of interest.</p>
<div class="callout warn"><span class="c-title">Compare totals, not payments</span>
<p>A lower monthly payment is not a cheaper loan. When comparing offers, hold the amount constant and compare total interest (or APR when fees differ) over the actual term. The <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> does this side by side.</p></div>
<p>Everything above describes a fixed-rate, monthly-accrual model commonly used for installment-loan examples. It does not cover every lender or jurisdiction: some products accrue daily, apply different day-count rules, capitalize fees, or round each payment differently. Variable-rate products also recalculate after rate changes, and rules on fees, prepayment and disclosure vary by country. Your loan agreement and lender statement, not any calculator, are the authoritative sources for how your specific loan charges interest.</p>

<section class="guide-faq faq" aria-labelledby="loan-interest-questions">
<h2 id="loan-interest-questions">Beginner questions about loan interest</h2>
<details><summary>Does the interest charge fall every month?</summary><div class="faq-a"><p>On a fixed-rate reducing-balance loan with on-time payments, the interest portion generally falls as principal is repaid. It may not move in a perfectly smooth line on a daily-accrual loan because months have different lengths and payment dates can shift. Fees, missed payments and rate changes can also interrupt the pattern.</p></div></details>
<details><summary>Why did my extra payment not reduce the next interest charge?</summary><div class="faq-a"><p>The servicer may have treated the money as an early future instalment instead of an immediate principal reduction. Check the transaction description and the new principal balance. If the balance did not fall by the expected amount, ask how to mark an overpayment as “principal only” under that lender's process.</p></div></details>
<details><summary>Is paying early the same as paying extra?</summary><div class="faq-a"><p>Not necessarily. Paying the normal amount a few days early can reduce interest on a daily-accrual loan, but it usually does not change principal beyond the scheduled amount. Paying extra toward principal lowers the balance itself. The contract and servicer's payment-allocation rules decide how either action is recorded.</p></div></details>
</section>
`,
};
