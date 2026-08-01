export default {
  slug: "how-emi-is-calculated",
  title: "How EMI Is Calculated",
  metaTitle: "How EMI Is Calculated — Formula, Worked Example",
  metaDescription:
    "The EMI formula dissected term by term, a ₹25 lakh home loan computed by hand, flat vs reducing rate equivalence, and how rate and tenure move the number.",
  description:
    "Break the EMI formula into its parts, follow a ₹25 lakh example, and compare monthly reducing-balance pricing with a flat-rate quote.",
  cardDescription: "The EMI formula dissected, a ₹25 lakh loan computed by hand, and the flat-vs-reducing rate trap.",
  lastReviewed: "2026-07-22",
  published: "2026-07-12",
  categories: ["loans"],
  aliases: [],
  keywords: ["emi formula", "emi calculation", "reducing balance", "flat rate vs reducing rate", "home loan emi"],
  relatedCalculators: ["emi-calculator", "loan-calculator", "loan-amortization-calculator", "personal-loan-calculator"],
  bodyHtml: `
<p>EMI means equated monthly instalment: the scheduled payment intended to repay principal and interest over a stated tenure. For a monthly reducing-balance loan, you can reproduce that payment with the formula below. The worked example also shows why fees, flat-rate pricing, rate resets and lender rounding can make a real quote differ from the clean calculation.</p>

<h2>The formula, term by term</h2>
<div class="formula-block"><span class="fx">EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
<ul class="formula-vars">
<li><code>P</code> — principal: the amount disbursed to you</li>
<li><code>r</code> — monthly interest rate: the annual rate ÷ 12, as a decimal</li>
<li><code>n</code> — tenure in months</li>
</ul>
</div>
<p>Each piece has a job. <strong>P × r</strong> is the interest the very first month charges on the full principal: the minimum the instalment must beat, or the loan would never shrink. <strong>(1 + r)<sup>n</sup></strong> is the compounding factor: what one rupee becomes after <em>n</em> months at rate <em>r</em>. Dividing the two expressions balances a precise trade: the EMI is the unique payment where the value of everything you pay, month by month, exactly matches the loan plus the interest the declining balance generates. Pay any less and a residue survives the tenure; pay any more and you overpay. (The same formula runs Western mortgage payments; only the labels differ.)</p>
<p>Two properties follow directly. Because <em>r</em> sits inside an exponent, EMI responds <em>non-linearly</em> to rate, and long tenures amplify small rate changes. And because early balances are large, early EMIs are mostly interest: the split between interest and principal inside each fixed instalment shifts month by month, which is the subject of our guide on <a href="/guides/how-loan-amortization-works/">how loan amortization works</a>.</p>

<h2>Computing one real EMI by hand</h2>
<div class="example-block"><div class="ex-head">Example: ₹25,00,000 home loan at 8.5% for 20 years (240 months)</div><div class="ex-body">
<p><strong>Step 1 (monthly rate):</strong> r = 8.5 ÷ 100 ÷ 12 = 0.0070833.</p>
<p><strong>Step 2 (compounding factor):</strong> (1.0070833)<sup>240</sup> = 5.441243. (Twenty years of monthly compounding multiplies a rupee about 5.4 times.)</p>
<p><strong>Step 3 (numerator):</strong> P × r × factor = 25,00,000 × 0.0070833 × 5.441243 ≈ 96,355.</p>
<p><strong>Step 4 (denominator):</strong> factor − 1 = 4.441243.</p>
<p><strong>Step 5 (divide):</strong> 96,355 ÷ 4.441243 = <strong>₹21,695.58 per month</strong>.</p>
<p>Over 240 months that is ₹52,06,939 paid in total: the ₹25,00,000 borrowed plus <strong>₹27,06,939 of interest</strong>, more than the principal itself. Long tenures at meaningful rates routinely cost more in interest than the loan; the <a href="/emi-calculator/">EMI calculator</a> shows the full month-by-month split for any inputs.</p>
</div></div>

<h2>Reducing-balance vs flat-rate quotes</h2>
<p>The formula above charges interest only on the <strong>outstanding balance</strong>. It applies when an offer uses this monthly reducing-balance convention. Some personal, vehicle and informal loans are instead quoted at a <strong>flat rate</strong>: interest computed on the original principal for the entire tenure. A flat rate is therefore not directly comparable with a reducing rate; the worked five-year example below shows the difference without assuming one fixed conversion factor.</p>
<p>The reliable way to compare is to compute total interest both ways. On a ₹5,00,000 loan over 5 years at a 10% reducing rate, the EMI is ₹10,624 and total interest is ₹1,37,411. A flat rate producing the same interest would be 1,37,411 ÷ (5,00,000 × 5) = <strong>5.50% flat</strong>: the flat number is barely half the true rate.</p>

<div class="table-scroll"><table>
<thead><tr><th>True reducing rate</th><th>EMI (₹5,00,000, 60 months)</th><th>Total interest</th><th>Equivalent flat-rate quote</th></tr></thead>
<tbody>
<tr><td>8%</td><td>₹10,138</td><td>₹1,08,292</td><td>4.33% flat</td></tr>
<tr><td>10%</td><td>₹10,624</td><td>₹1,37,411</td><td>5.50% flat</td></tr>
<tr><td>12%</td><td>₹11,122</td><td>₹1,67,333</td><td>6.69% flat</td></tr>
</tbody>
</table></div>

<div class="callout warn"><span class="c-title">A "10% flat" loan is not a 10% loan</span>
<p>Run the arithmetic in reverse: 10% flat on ₹5,00,000 for 5 years means ₹2,50,000 of interest and an instalment of ₹12,500, which corresponds to a reducing-balance rate of about <strong>17.3%</strong>. Whenever a quote sounds surprisingly cheap, ask one question: "flat or reducing?" There is no universal conversion factor between the two — the gap depends on the tenure, widening toward double for long loans — so convert the complete cash flows as this example does, or compare total repayment amounts directly using our guide on <a href="/guides/how-to-compare-loan-offers/">how to compare loan offers</a>.</p>
</div>

<h2>How tenure and rate move the EMI</h2>
<p>The two levers pull very differently. Stretching tenure lowers the EMI but raises total interest: you rent the money longer. Rate moves both in the same direction. Computed on the ₹25,00,000 loan:</p>

<div class="table-scroll"><table>
<thead><tr><th>Scenario (₹25,00,000)</th><th>EMI</th><th>Total interest</th></tr></thead>
<tbody>
<tr><td>8.5%, 15 years</td><td>₹24,618</td><td>₹19,31,328</td></tr>
<tr><td>8.5%, 20 years</td><td>₹21,696</td><td>₹27,06,939</td></tr>
<tr><td>8.5%, 25 years</td><td>₹20,131</td><td>₹35,39,203</td></tr>
<tr><td>8.0%, 20 years</td><td>₹20,911</td><td>₹25,18,640</td></tr>
<tr><td>9.0%, 20 years</td><td>₹22,493</td><td>₹28,98,356</td></tr>
<tr><td>9.5%, 20 years</td><td>₹23,303</td><td>₹30,92,787</td></tr>
</tbody>
</table></div>

<p>Read the tenure rows together: moving from 15 to 25 years cuts the EMI by ₹4,487 a month but adds <strong>₹16,07,875</strong> of interest in this example. The rate rows show a second trade-off: each 0.5 percentage-point increase adds roughly ₹800 to the EMI and about ₹1.9–2 lakh to the modeled lifetime interest.</p>
<p>The EMI also affects how much a lender may offer. Some lenders use a fixed-obligation-to-income ratio (FOIR), but the income definition, threshold and underwriting adjustments vary by institution and borrower. A longer tenure lowers the modeled EMI and may raise the amount supportable under such a ratio, while also increasing total interest. Only a lender can determine an approval amount.</p>

<h2>Floating rates: a reset can change your tenure or your EMI</h2>
<p>Many Indian home loans use floating benchmark-linked rates. When the rate changes, the lender may alter the EMI, extend or shorten the tenure, or use a combination permitted by the agreement and applicable rules. The effect can be large: if the rate on the example loan rose from 8.5% to 9.5% at the outset while the EMI stayed ₹21,695.58, modeled repayment would take about <strong>309 months instead of 240</strong>. Keeping the 20-year tenure instead would raise the modeled EMI to ₹23,303.</p>
<p>The RBI's <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12529" rel="noopener">reset-of-floating-rate direction</a> describes options lenders must communicate, and its <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12878" rel="noopener">directions on pre-payment charges</a> define the products and borrowers within scope. Read those sources together with the current sanction letter; do not assume every floating-rate product receives identical treatment.</p>

<h2>Fees, moratoriums and step-up products</h2>
<p><strong>Processing fees raise your true cost above the quoted rate.</strong> A typical 1% fee on the ₹25,00,000 loan is ₹25,000 taken off the amount you effectively receive, while your EMI is computed on the full principal. Solving for the rate that matches what you really got, the loan's effective cost is about <strong>8.64%, not 8.5%</strong>. Small on a 20-year loan; on short loans the same fee distorts far more, which is why fee-inclusive comparison matters (see <a href="/guides/apr-vs-interest-rate/">APR vs interest rate</a>).</p>
<p><strong>Moratorium and step-up EMIs</strong> change the timing rather than removing the cost. During a moratorium, interest may continue to accrue and may be added to the balance under the agreement. A step-up plan begins with lower instalments and relies on later increases, so it also relies on the expected income growth arriving. Ask for the full payment schedule and compare its total interest with a level-EMI option using the <a href="/loan-amortization-calculator/">loan amortization calculator</a>.</p>
`,
};
