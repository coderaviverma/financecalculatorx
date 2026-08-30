export default {
  slug: "how-loan-amortization-works",
  title: "How Loan Amortization Works",
  metaTitle: "How Loan Amortization Works — Schedules Explained",
  metaDescription:
    "How a fixed payment splits into interest and principal month by month, with a worked schedule you can rebuild and compare with a loan statement.",
  description:
    "Where the fixed payment comes from, how each month's interest/principal split is computed, and how to rebuild — and audit — an amortization schedule yourself.",
  cardDescription: "The payment formula read in plain words, a schedule built by hand, and the principal crossover located.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["loans", "mortgage"],
  aliases: [],
  keywords: ["loan amortization", "amortization schedule", "principal vs interest", "amortization formula", "negative amortization", "mortgage schedule"],
  relatedCalculators: ["loan-amortization-calculator", "loan-calculator", "mortgage-calculator", "extra-payment-calculator"],
  bodyHtml: `
<p>An amortizing loan uses scheduled payments to reduce a balance over time. Each row of the schedule shows the payment, the interest charged, the principal repaid and the balance left. Once you know those steps, you can recreate a simple schedule in a spreadsheet and compare it with a lender's figures.</p>

<h2>Where the fixed payment comes from</h2>
<p>The payment must satisfy one condition: applied every month against a balance that accrues interest, it kills the loan in exactly <em>n</em> payments. Solving that condition gives the standard formula:</p>
<div class="formula-block"><span class="fx">M = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span></div>
<p>Read it in words. <strong>P × r</strong> is the interest the very first month charges; in this monthly model, the payment must exceed this amount for the balance to fall. <strong>(1 + r)<sup>n</sup></strong> is the growth factor: what one unit of debt would compound to over the full term if never repaid. The ratio of that factor to itself-minus-one is the markup that converts "just covering first-month interest" into "clearing the whole balance on schedule." When the rate is high or the term long, the growth factor is large and the ratio approaches 1: the modeled payment approaches P × r. When the rate is near zero, the formula approaches P ÷ n: equal installments of principal with no interest.</p>
<p>For a $250,000 mortgage at 6.5% over 30 years: r = 0.065 ÷ 12 = 0.0054167, n = 360, and the formula yields <strong>$1,580.17 per month</strong>. (This is the same formula behind EMI quotes; <a href="/guides/how-emi-is-calculated/">how EMI is calculated</a> covers that framing.)</p>

<h2>Building the schedule by hand</h2>
<p>The schedule needs no new math, just the reducing-balance rule applied repeatedly:</p>
<div class="example-block"><div class="ex-head">Months 1 and 2 of $250,000 at 6.5%, 30 years ($1,580.17/month)</div><div class="ex-body">
<p><strong>Month 1.</strong> Interest = $250,000 × 0.065 ÷ 12 = <strong>$1,354.17</strong>. Principal = $1,580.17 − $1,354.17 = <strong>$226.00</strong>. New balance = $250,000 − $226.00 = <strong>$249,774.00</strong>.</p>
<p><strong>Month 2.</strong> Interest = $249,774.00 × 0.065 ÷ 12 = <strong>$1,352.94</strong>. Principal = $1,580.17 − $1,352.94 = <strong>$227.23</strong>. New balance = <strong>$249,546.77</strong>.</p>
<p>That's the entire algorithm. Each month, interest is the current balance times the monthly rate; principal is whatever's left of the payment; the balance drops by the principal. Repeat 360 times and the balance reaches zero, with <strong>$318,861.22 of total interest</strong> along the way. In this 30-year scenario, the modeled interest exceeds the amount borrowed.</p>
</div></div>
<p>Notice how slowly it starts: only $226 of the first $1,580.17 payment touches the principal, and each month shifts barely more than a dollar from the interest column to the principal column (the <a href="https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/" rel="noopener">CFPB walks through this same interest-to-principal shift</a> for mortgages). The <a href="/loan-amortization-calculator/">Loan Amortization Calculator</a> generates all 360 rows from the same three inputs and lets you export them.</p>

<h2>The crossover, and why it comes so late</h2>
<p>A natural question: when does the principal share of the payment finally exceed the interest share? For this loan, not until <strong>month 233, over 19 years in</strong>, when interest is $788.75 and principal edges ahead at $791.42. The milestones tell the story:</p>
<div class="table-scroll"><table>
<thead><tr><th>Point in the loan</th><th>Interest portion</th><th>Principal portion</th><th>Balance after</th></tr></thead>
<tbody>
<tr><td>Month 1</td><td>$1,354.17</td><td>$226.00</td><td>$249,774.00</td></tr>
<tr><td>Year 1 total</td><td>$16,167.73</td><td>$2,794.31</td><td>$247,205.69</td></tr>
<tr><td>Year 5 (month 60)</td><td colspan="2">$94,810.20 paid in total</td><td>$234,027.44</td></tr>
<tr><td>Month 233 (crossover)</td><td>$788.75</td><td>$791.42</td><td>$144,824.47</td></tr>
<tr><td>Month 360</td><td colspan="2">$568,861.22 paid in total</td><td>$0.00</td></tr>
</tbody>
</table></div>
<p>After five full years ($94,810 of payments) the balance has fallen less than $16,000. The crossover point depends on rate and term, and comparing terms makes the mechanics vivid. The same $250,000 at 6.5% over <strong>15 years</strong> requires $2,177.77 per month ($597.60 more), but month one's interest is identical ($1,354.17, since the starting balance and rate are unchanged), so the payment allocates $823.60 to principal in month one instead of $226.00. The crossover arrives at <strong>month 53</strong> instead of month 233, and modeled total interest falls from $318,861.22 to <strong>$141,998.31</strong> because the higher payment reduces the balance over fewer periods. The related ownership-horizon variables are laid out in <a href="/guides/rent-vs-buy-what-to-compare/">rent vs buy: what to compare</a>.</p>

<h2>Extra principal in the calculator's schedule</h2>
<p>The calculator's extra-payment scenario holds the scheduled payment at $1,580.17 and applies each extra amount to principal immediately. The lower modeled balance produces less interest in later months, so the calculated schedule ends sooner. A contract that allocates extra money differently will produce a different schedule.</p>
<p>Adding <strong>$200/month</strong> to this mortgage pays it off in <strong>265 months instead of 360</strong> (7 years 11 months early) and cuts modeled total interest from $318,861.22 to $221,243.10, a difference of <strong>$97,618.12</strong>. The reduction comes from fewer periods of interest accrual on the lower balance. The mechanics and edge cases are covered in <a href="/guides/how-extra-payments-reduce-interest/">how extra payments reduce interest</a>, and the <a href="/extra-payment-calculator/">Extra Payment Calculator</a> computes other inputs.</p>
<div class="callout note"><span class="c-title">Assumption behind the extra-payment result</span>
<p>The $97,618.12 result requires every extra amount to reduce principal on its payment date while the scheduled payment remains unchanged. The model does not predict how a lender or servicer will record an overpayment; the agreement's allocation method determines whether a statement will match this schedule.</p></div>
<p>A <strong>recast</strong> can be represented mathematically by running the payment formula again with the smaller remaining balance and the months left. In that model, re-amortizing lowers the scheduled payment, while holding the original payment constant ends repayment sooner and produces less interest. Availability, eligibility, fees and allocation rules are outside this guide's model.</p>

<h2>Negative amortization: the schedule in reverse</h2>
<div class="callout warn"><span class="c-title">When the payment doesn't cover interest</span>
<p>If the agreement adds unpaid interest to principal, a payment smaller than the month's interest makes the balance grow. The CFPB calls this <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-negative-amortization-en-103/" rel="noopener">negative amortization</a> in its U.S. mortgage explainer. In this example, month-one interest is $1,354.17; a modeled $1,300 payment would leave the balance $54.17 higher than it started.</p></div>

<h2>Comparing a statement with the monthly model</h2>
<p>The <a href="/loan-amortization-calculator/">amortization calculator</a> exports its modeled balance, interest and principal columns as CSV. When an agreement uses the same fixed-rate monthly assumptions, the following identities provide a row-by-row comparison:</p>
<ul>
<li><strong>Modeled interest:</strong> each row uses previous balance × annual rate ÷ 12, subject to cent-level display rounding.</li>
<li><strong>Modeled split:</strong> interest plus principal equals the scheduled payment, and the balance falls by the principal amount.</li>
<li><strong>Different contract assumptions:</strong> a long or short first period, daily accrual, another day-count rule, payment dates and per-row rounding can all produce figures that differ from this monthly model.</li>
<li><strong>Items outside the model:</strong> flat-rate pricing, fees and an agreement's treatment of extra payments require separate cash-flow entries. For U.S. mortgages, the CFPB explains that an <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-140/" rel="noopener">escrow account</a> can hold property-tax and homeowners-insurance amounts; those items are not part of this calculator's principal-and-interest schedule.</li>
</ul>
<p>Accrual intervals, day-count rules, payment dates and rounding methods vary by product and jurisdiction. A difference between a statement and this monthly model does not by itself identify an error; the agreement's method and the model assumptions may differ.</p>
`,
};
