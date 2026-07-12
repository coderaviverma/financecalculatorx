export default {
  slug: "how-loan-amortization-works",
  title: "How Loan Amortization Works",
  metaTitle: "How Loan Amortization Works — Schedules Explained",
  metaDescription:
    "How a fixed payment splits into interest and principal month by month — with a real schedule you can rebuild by hand and audit against your lender's.",
  description:
    "Where the fixed payment comes from, how each month's interest/principal split is computed, and how to rebuild — and audit — an amortization schedule yourself.",
  cardDescription: "The payment formula read in plain words, a schedule built by hand, and the principal crossover located.",
  lastReviewed: "2026-07-12",
  published: "2026-07-12",
  categories: ["loans", "mortgage"],
  aliases: [],
  keywords: ["loan amortization", "amortization schedule", "principal vs interest", "amortization formula", "negative amortization", "mortgage schedule"],
  relatedCalculators: ["loan-amortization-calculator", "loan-calculator", "mortgage-calculator", "extra-payment-calculator"],
  bodyHtml: `
<p>"Amortize" comes from the Latin for "to kill off" — an amortizing loan is one you kill gradually, with a level payment that's calibrated so the last installment lands exactly as the balance hits zero. The schedule that documents this — every month's interest, principal, and remaining balance — looks like something only software could produce. It isn't. Two lines of arithmetic, repeated, generate the whole thing, and this guide builds one by hand so you can verify any lender's schedule yourself.</p>

<h2>Where the fixed payment comes from</h2>
<p>The payment must satisfy one condition: applied every month against a balance that accrues interest, it kills the loan in exactly <em>n</em> payments. Solving that condition gives the standard formula:</p>
<div class="formula-block"><span class="fx">M = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span></div>
<p>Read it in words. <strong>P × r</strong> is the interest the very first month charges — the payment must exceed this or the balance never falls. <strong>(1 + r)<sup>n</sup></strong> is the growth factor: what one unit of debt would compound to over the full term if never repaid. The ratio of that factor to itself-minus-one is the markup that converts "just covering first-month interest" into "clearing the whole balance on schedule." When the rate is high or the term long, the growth factor is large and the ratio approaches 1 — the payment approaches pure interest, P × r. When the rate is near zero, the formula collapses toward P ÷ n: equal installments of principal, no interest. Every fixed-rate loan payment lives between those poles.</p>
<p>For a $250,000 mortgage at 6.5% over 30 years: r = 0.065 ÷ 12 = 0.0054167, n = 360, and the formula yields <strong>$1,580.17 per month</strong>. (This is the same formula behind EMI quotes — <a href="/guides/how-emi-is-calculated/">how EMI is calculated</a> covers that framing.)</p>

<h2>Building the schedule by hand</h2>
<p>The schedule needs no new math — just the reducing-balance rule applied repeatedly:</p>
<div class="example-block"><div class="ex-head">Months 1 and 2 of $250,000 at 6.5%, 30 years ($1,580.17/month)</div><div class="ex-body">
<p><strong>Month 1.</strong> Interest = $250,000 × 0.065 ÷ 12 = <strong>$1,354.17</strong>. Principal = $1,580.17 − $1,354.17 = <strong>$226.00</strong>. New balance = $250,000 − $226.00 = <strong>$249,774.00</strong>.</p>
<p><strong>Month 2.</strong> Interest = $249,774.00 × 0.065 ÷ 12 = <strong>$1,352.94</strong>. Principal = $1,580.17 − $1,352.94 = <strong>$227.23</strong>. New balance = <strong>$249,546.77</strong>.</p>
<p>That's the entire algorithm. Each month, interest is the current balance times the monthly rate; principal is whatever's left of the payment; the balance drops by the principal. Repeat 360 times and the balance reaches zero, with <strong>$318,861.22 of total interest</strong> along the way — the interest exceeds the amount borrowed, which is normal for a 30-year term at this rate.</p>
</div></div>
<p>Notice how slowly it starts: only $226 of the first $1,580.17 payment touches the principal, and each month shifts barely more than a dollar from the interest column to the principal column. The <a href="/loan-amortization-calculator/">Loan Amortization Calculator</a> generates all 360 rows from the same three inputs and lets you export them.</p>

<h2>The crossover — and why it comes so late</h2>
<p>A natural question: when does the principal share of the payment finally exceed the interest share? For this loan, not until <strong>month 233 — over 19 years in</strong> — when interest is $788.75 and principal edges ahead at $791.42. The milestones tell the story:</p>
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
<p>After five full years — $94,810 of payments — the balance has fallen less than $16,000. The crossover point depends on rate and term, and comparing terms makes the mechanics vivid. The same $250,000 at 6.5% over <strong>15 years</strong> requires $2,177.77 per month — $597.60 more — but month one's interest is identical ($1,354.17, since the starting balance and rate are unchanged), so every extra dollar of payment is pure principal: $823.60 in month one instead of $226.00. The crossover arrives at <strong>month 53</strong> instead of month 233, and total interest falls from $318,861.22 to <strong>$141,998.31</strong>. Shorter terms aren't cheaper because the rate is different; they're cheaper because high balances spend far less time on the books. This is also why the early-sale math on a mortgage is unforgiving; the considerations are laid out in <a href="/guides/rent-vs-buy-what-to-compare/">rent vs buy: what to compare</a>.</p>

<h2>Extra payments warp the schedule — from the end</h2>
<p>An extra principal payment doesn't reduce next month's required payment; it deletes months from the far end of the schedule. The payment stays $1,580.17, but the balance is lower than the schedule expects, so every subsequent month charges less interest and repays more principal, compounding the head start until the loan dies early.</p>
<p>Adding <strong>$200/month</strong> to this mortgage pays it off in <strong>265 months instead of 360</strong> — 7 years 11 months early — and cuts total interest from $318,861.22 to $221,243.10, a saving of <strong>$97,618.12</strong>. The months removed are the final ones, which were nearly all principal anyway; what you actually bought is the elimination of years of interest accrual on a stubbornly high balance. The mechanics and edge cases are covered in <a href="/guides/how-extra-payments-reduce-interest/">how extra payments reduce interest</a>, and the <a href="/extra-payment-calculator/">Extra Payment Calculator</a> computes your own numbers.</p>
<div class="callout note"><span class="c-title">Check how your lender applies extras</span>
<p>The savings above assume extra amounts reduce principal immediately. Some lenders instead hold them as prepaid installments, which saves nothing. Confirm "apply to principal" — usually a checkbox or a phone call — before relying on these figures.</p></div>
<p>A related option some lenders offer after a large lump-sum payment is a <strong>recast</strong>: the remaining balance is re-amortized over the remaining term, which lowers the required payment instead of shortening the schedule. Same formula, re-run with a smaller P and the months left as n. Recasting buys monthly breathing room; leaving the payment unchanged buys interest savings — the schedule math above lets you price both choices before deciding.</p>

<h2>Negative amortization: the schedule in reverse</h2>
<div class="callout warn"><span class="c-title">When the payment doesn't cover interest</span>
<p>If a payment is smaller than the month's interest, the shortfall is added to the balance — the loan grows while you pay. On this example, month one's interest is $1,354.17; paying $1,300 would leave the balance $54.17 <em>higher</em> than it started. This shows up in real life with payment-option mortgages, some deferred student loans (accrued interest capitalizes into the balance), and minimum payments set below accrual. If your balance isn't falling, this is the first thing to check.</p></div>

<h2>Auditing your lender's schedule</h2>
<p>Because the algorithm is two lines of arithmetic, a lender's schedule is fully checkable. Export your schedule (the <a href="/loan-amortization-calculator/">amortization calculator</a> produces a CSV with the same columns most lenders use) and verify:</p>
<ul>
<li><strong>Any single row:</strong> interest should equal the previous balance × annual rate ÷ 12, to within a cent of rounding. Spot-check three rows and you've effectively verified the method.</li>
<li><strong>The split:</strong> interest + principal should equal the payment on every row; the balance should fall by exactly the principal amount.</li>
<li><strong>Known discrepancies that are benign:</strong> a first period longer or shorter than one month (interest adjusts for the actual days), cent-level rounding that the final payment absorbs, and daily-accrual lenders whose monthly interest varies slightly with the number of days in the month.</li>
<li><strong>Discrepancies that aren't:</strong> interest computed on the original balance rather than the reducing one (see <a href="/guides/how-loan-interest-works/">how loan interest works</a> on flat-rate loans), extra payments not reducing the balance, or fees appearing inside the payment without disclosure. Escrow items on a mortgage — taxes, insurance — should be listed separately from principal and interest, not blended into them.</li>
</ul>
<p>Conventions vary a little by country — daily versus monthly accrual, how leap years are counted, when the first payment falls — but the reducing-balance core is universal. A schedule you can rebuild yourself is a schedule no one can quietly get wrong.</p>
`,
};
