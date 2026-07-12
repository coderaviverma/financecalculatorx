export default {
  slug: "how-emi-is-calculated",
  title: "How EMI Is Calculated",
  metaTitle: "How EMI Is Calculated — Formula, Worked Example",
  metaDescription:
    "The EMI formula dissected term by term, a ₹25 lakh home loan computed by hand, flat vs reducing rate equivalence, and how rate and tenure move the number.",
  description:
    "The EMI formula looks intimidating and is actually three moving parts. A term-by-term dissection, a hand-computed ₹25 lakh example, and the flat-rate trap.",
  cardDescription: "The EMI formula dissected, a ₹25 lakh loan computed by hand, and the flat-vs-reducing rate trap.",
  lastReviewed: "2026-07-12",
  published: "2026-07-12",
  categories: ["loans"],
  aliases: [],
  keywords: ["emi formula", "emi calculation", "reducing balance", "flat rate vs reducing rate", "home loan emi"],
  relatedCalculators: ["emi-calculator", "loan-calculator", "loan-amortization-calculator", "personal-loan-calculator"],
  bodyHtml: `
<p>Every loan quote in India leads to the same number: the EMI, or equated monthly instalment — the fixed amount that repays the loan, interest and all, in equal monthly steps. Banks compute it with one standard formula, and because the formula is standard, you can verify any quote yourself in a minute. This guide dissects the formula term by term, computes a real home-loan EMI by hand, and covers the places where quotes mislead — flat-rate pricing, processing fees, and what actually happens to your EMI when floating rates move.</p>

<h2>The formula, term by term</h2>
<div class="formula-block"><span class="fx">EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
<ul class="formula-vars">
<li><code>P</code> — principal: the amount actually disbursed to you</li>
<li><code>r</code> — monthly interest rate: the annual rate ÷ 12, as a decimal</li>
<li><code>n</code> — tenure in months</li>
</ul>
</div>
<p>Each piece has a job. <strong>P × r</strong> is the interest the very first month charges on the full principal — the minimum the instalment must beat, or the loan would never shrink. <strong>(1 + r)<sup>n</sup></strong> is the compounding factor: what one rupee becomes after <em>n</em> months at rate <em>r</em>. Dividing the two expressions balances a precise trade: the EMI is the unique payment where the value of everything you pay, month by month, exactly matches the loan plus the interest the declining balance generates. Pay any less and a residue survives the tenure; pay any more and you overpay. (The same formula runs Western mortgage payments — only the labels differ.)</p>
<p>Two properties follow directly. Because <em>r</em> sits inside an exponent, EMI responds <em>non-linearly</em> to rate — long tenures amplify small rate changes. And because early balances are large, early EMIs are mostly interest: the split between interest and principal inside each fixed instalment shifts month by month, which is the subject of our guide on <a href="/guides/how-loan-amortization-works/">how loan amortization works</a>.</p>

<h2>Computing one real EMI by hand</h2>
<div class="example-block"><div class="ex-head">Example: ₹25,00,000 home loan at 8.5% for 20 years (240 months)</div><div class="ex-body">
<p><strong>Step 1 — monthly rate:</strong> r = 8.5 ÷ 100 ÷ 12 = 0.0070833.</p>
<p><strong>Step 2 — compounding factor:</strong> (1.0070833)<sup>240</sup> = 5.441243. (Twenty years of monthly compounding multiplies a rupee about 5.4 times.)</p>
<p><strong>Step 3 — numerator:</strong> P × r × factor = 25,00,000 × 0.0070833 × 5.441243 ≈ 96,355.</p>
<p><strong>Step 4 — denominator:</strong> factor − 1 = 4.441243.</p>
<p><strong>Step 5 — divide:</strong> 96,355 ÷ 4.441243 = <strong>₹21,695.58 per month</strong>.</p>
<p>Over 240 months that is ₹52,06,939 paid in total — the ₹25,00,000 borrowed plus <strong>₹27,06,939 of interest</strong>, more than the principal itself. Long tenures at meaningful rates routinely cost more in interest than the loan; the <a href="/emi-calculator/">EMI calculator</a> shows the full month-by-month split for any inputs.</p>
</div></div>

<h2>Reducing-balance vs flat-rate quotes</h2>
<p>The formula above charges interest only on the <strong>outstanding balance</strong> — the reducing-balance method, used for home loans and most bank lending. But some personal, vehicle and informal loans are quoted at a <strong>flat rate</strong>: interest computed on the <em>original</em> principal for the entire tenure, ignoring the fact that you repay as you go. A flat rate is therefore not comparable to a reducing rate, and the gap is roughly a factor of 1.8 on a five-year loan.</p>
<p>The honest way to compare is to compute total interest both ways. On a ₹5,00,000 loan over 5 years at a 10% reducing rate, the EMI is ₹10,624 and total interest is ₹1,37,411. A flat rate producing the same interest would be 1,37,411 ÷ (5,00,000 × 5) = <strong>5.50% flat</strong> — the flat number is barely half the true rate.</p>

<div class="table-scroll"><table>
<thead><tr><th>True reducing rate</th><th>EMI (₹5,00,000, 60 months)</th><th>Total interest</th><th>Equivalent flat-rate quote</th></tr></thead>
<tbody>
<tr><td>8%</td><td>₹10,138</td><td>₹1,08,292</td><td>4.33% flat</td></tr>
<tr><td>10%</td><td>₹10,624</td><td>₹1,37,411</td><td>5.50% flat</td></tr>
<tr><td>12%</td><td>₹11,122</td><td>₹1,67,333</td><td>6.69% flat</td></tr>
</tbody>
</table></div>

<div class="callout warn"><span class="c-title">A "10% flat" loan is not a 10% loan</span>
<p>Run the arithmetic in reverse: 10% flat on ₹5,00,000 for 5 years means ₹2,50,000 of interest and an instalment of ₹12,500 — which corresponds to a reducing-balance rate of about <strong>17.3%</strong>. Whenever a quote sounds surprisingly cheap, ask one question: "flat or reducing?" If the answer is flat, mentally multiply by roughly 1.7–1.8 before comparing it with bank offers, or verify with our guide on <a href="/guides/how-to-compare-loan-offers/">how to compare loan offers</a>.</p>
</div>

<h2>How tenure and rate move the EMI</h2>
<p>The two levers pull very differently. Stretching tenure lowers the EMI but raises total interest — you rent the money longer. Rate moves both in the same direction. Computed on the ₹25,00,000 loan:</p>

<div class="table-scroll"><table>
<thead><tr><th>Scenario (₹25,00,000)</th><th>EMI</th><th>Total interest</th></tr></thead>
<tbody>
<tr><td>8.5% — 15 years</td><td>₹24,618</td><td>₹19,31,328</td></tr>
<tr><td>8.5% — 20 years</td><td>₹21,696</td><td>₹27,06,939</td></tr>
<tr><td>8.5% — 25 years</td><td>₹20,131</td><td>₹35,39,203</td></tr>
<tr><td>8.0% — 20 years</td><td>₹20,911</td><td>₹25,18,640</td></tr>
<tr><td>9.0% — 20 years</td><td>₹22,493</td><td>₹28,98,356</td></tr>
<tr><td>9.5% — 20 years</td><td>₹23,303</td><td>₹30,92,787</td></tr>
</tbody>
</table></div>

<p>Read the tenure rows first: going from 15 to 25 years cuts the EMI by ₹4,487 a month but adds <strong>₹16,07,875</strong> of interest. Tenure is the most expensive comfort a borrower can buy. The rate rows show the exponent at work: each 0.5% adds roughly ₹800 to this EMI and about ₹1.9–2 lakh to lifetime interest — which is why negotiating even a small rate concession, or refinancing to one, is worth real money on long loans.</p>
<p>The EMI also decides how much you can borrow in the first place. Lenders size loans so that all your EMIs together stay within roughly 40–50% of net monthly income (the FOIR, or fixed-obligation-to-income ratio). Since a longer tenure lowers the EMI, it raises the loan amount you qualify for — which is exactly how borrowers end up in the expensive bottom rows of the table above without ever choosing them deliberately.</p>

<h2>Floating rates: banks usually stretch your tenure, not your EMI</h2>
<p>Most Indian home loans float against a benchmark (typically repo-linked since 2019). When the benchmark rises, the bank must recover more interest — and the default at most lenders is to <strong>keep your EMI unchanged and extend the tenure</strong>, because it avoids disturbing your monthly budget. The cost of that convenience is large: if the rate on the example loan rose from 8.5% to 9.5% at the outset with the EMI held at ₹21,695.58, full repayment would take about <strong>309 months instead of 240</strong> — 5 years and 9 months longer, all of it interest. Keeping the 20-year tenure instead would raise the EMI to ₹23,303, about ₹1,607 more per month.</p>
<p>RBI rules require lenders to offer you the choice — higher EMI, longer tenure, a mix, or prepayment — when rates reset. If you can absorb the higher EMI, taking it is almost always cheaper; and note that the RBI bars foreclosure charges on floating-rate loans to individuals, so partial prepayment is a free lever here (see <a href="/guides/how-extra-payments-reduce-interest/">how extra payments reduce interest</a>).</p>

<h2>Fees, moratoriums and step-up products</h2>
<p><strong>Processing fees raise your true cost above the quoted rate.</strong> A typical 1% fee on the ₹25,00,000 loan is ₹25,000 taken off the amount you effectively receive, while your EMI is computed on the full principal. Solving for the rate that matches what you actually got, the loan's effective cost is about <strong>8.64%, not 8.5%</strong>. Small on a 20-year loan; on short loans the same fee distorts far more, which is why fee-inclusive comparison matters (see <a href="/guides/apr-vs-interest-rate/">APR vs interest rate</a>).</p>
<p><strong>Moratorium and step-up EMIs</strong> deserve one honest paragraph. A moratorium (EMI holiday) pauses payments but not interest — the unpaid interest is added to your balance, so you exit owing more than you entered. Step-up EMIs start low and rise with your expected salary; they genuinely help early affordability, but the low early instalments repay little principal, so total interest is higher than a level EMI, and the plan assumes the salary growth actually arrives. Both are cash-flow tools, not discounts. Whenever a product makes the early months feel lighter, compute the total interest across the options with a <a href="/loan-amortization-calculator/">loan amortization calculator</a> before signing — that single number is where the difference always shows up.</p>
`,
};
