export default {
  slug: "how-emi-is-calculated",
  title: "How EMI Is Calculated",
  metaTitle: "How EMI Is Calculated — Formula, Worked Example",
  metaDescription:
    "The EMI formula dissected term by term, a ₹25 lakh home loan computed by hand, flat vs reducing rate equivalence, and how rate and tenure move the number.",
  description:
    "Break the EMI formula into its parts, follow a ₹25 lakh example, and compare monthly reducing-balance pricing with a flat-rate quote.",
  cardDescription: "The EMI formula dissected, a ₹25 lakh loan computed by hand, and a flat-vs-reducing rate comparison.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["loans"],
  aliases: [],
  keywords: ["emi formula", "emi calculation", "reducing balance", "flat rate vs reducing rate", "home loan emi"],
  relatedCalculators: ["emi-calculator", "loan-calculator", "loan-amortization-calculator", "personal-loan-calculator"],
  bodyHtml: `
<p>EMI means equated monthly instalment: the scheduled payment intended to repay principal and interest over a stated tenure. For the monthly reducing-balance model below, the formula reproduces that payment. Fees, flat-rate pricing, rate resets and different rounding conventions are separate inputs that can make a quoted schedule differ from the example.</p>

<h2>The formula, term by term</h2>
<div class="formula-block"><span class="fx">EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
<ul class="formula-vars">
<li><code>P</code> — principal: the amount disbursed to you</li>
<li><code>r</code> — monthly interest rate: the annual rate ÷ 12, as a decimal</li>
<li><code>n</code> — tenure in months</li>
</ul>
</div>
<p>Each piece has a job. <strong>P × r</strong> is the interest the first modeled month charges on the full principal. <strong>(1 + r)<sup>n</sup></strong> is the compounding factor: what one rupee becomes after <em>n</em> months at rate <em>r</em>. Dividing the two expressions produces the level payment that clears this modeled balance after exactly <em>n</em> months. Holding every other assumption constant, a lower payment leaves a balance at month <em>n</em>, while a higher payment clears it earlier when the excess is applied to principal.</p>
<p>Two properties follow directly. Because <em>r</em> sits inside an exponent, EMI responds <em>non-linearly</em> to rate, and long tenures amplify small rate changes. And because early balances are large, early EMIs are mostly interest: the split between interest and principal inside each fixed instalment shifts month by month, which is the subject of our guide on <a href="/guides/how-loan-amortization-works/">how loan amortization works</a>.</p>

<h2>Computing one example EMI by hand</h2>
<div class="example-block"><div class="ex-head">Example: ₹25,00,000 home loan at 8.5% for 20 years (240 months)</div><div class="ex-body">
<p><strong>Step 1 (monthly rate):</strong> r = 8.5 ÷ 100 ÷ 12 = 0.0070833.</p>
<p><strong>Step 2 (compounding factor):</strong> (1.0070833)<sup>240</sup> = 5.441243. (Twenty years of monthly compounding multiplies a rupee about 5.4 times.)</p>
<p><strong>Step 3 (numerator):</strong> P × r × factor = 25,00,000 × 0.0070833 × 5.441243 ≈ 96,355.</p>
<p><strong>Step 4 (denominator):</strong> factor − 1 = 4.441243.</p>
<p><strong>Step 5 (divide):</strong> 96,355 ÷ 4.441243 = <strong>₹21,695.58 per month</strong>.</p>
<p>Over 240 months that is ₹52,06,939 paid in total: the ₹25,00,000 borrowed plus <strong>₹27,06,939 of modeled interest</strong>, more than the principal in this scenario. The <a href="/emi-calculator/">EMI calculator</a> shows the month-by-month split for other inputs under the same assumptions.</p>
</div></div>

<h2>Reducing-balance vs flat-rate quotes</h2>
<p>The formula above charges interest only on the <strong>outstanding balance</strong>. A different quotation model, the <strong>flat rate</strong>, computes interest on the original principal for the entire tenure. The same numeric rate does not create the same cash flows under these two models, so the worked example compares their payments and total interest without assuming a fixed conversion factor.</p>
<p>On a ₹5,00,000 loan over 5 years at a 10% reducing rate, the modeled EMI is ₹10,624 and total interest is ₹1,37,411. A flat calculation producing that same interest would be 1,37,411 ÷ (5,00,000 × 5) = <strong>5.50% flat</strong>. That equivalence is specific to these inputs.</p>

<div class="table-scroll"><table>
<thead><tr><th>Reducing-balance rate</th><th>EMI (₹5,00,000, 60 months)</th><th>Total interest</th><th>Equivalent flat-rate calculation</th></tr></thead>
<tbody>
<tr><td>8%</td><td>₹10,138</td><td>₹1,08,292</td><td>4.33% flat</td></tr>
<tr><td>10%</td><td>₹10,624</td><td>₹1,37,411</td><td>5.50% flat</td></tr>
<tr><td>12%</td><td>₹11,122</td><td>₹1,67,333</td><td>6.69% flat</td></tr>
</tbody>
</table></div>

<div class="callout warn"><span class="c-title">The same 10% label can describe different cash flows</span>
<p>For the five-year example, 10% flat means ₹2,50,000 of interest and an instalment of ₹12,500. Those cash flows correspond to a reducing-balance rate of about <strong>17.3%</strong>. The 17.3-to-10 relationship is specific to this rate and tenure, not a reusable conversion factor. The guide on <a href="/guides/how-to-compare-loan-offers/">how to compare loan offers</a> shows the two total-repayment models side by side.</p>
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
<p>An illustrative affordability model can compare the EMI with a user-selected income ratio. Under that model, a longer tenure lowers the EMI and raises the principal that fits within the selected ratio, while also increasing total interest. This is scenario arithmetic, not an approval estimate; an institution defines its own income measure, limits and underwriting adjustments.</p>

<h2>Floating rates: a reset can change your tenure or your EMI</h2>
<p>A floating-rate reset changes at least one input in the amortization schedule. If the rate on the example loan rose from 8.5% to 9.5% at the outset while its payment stayed ₹21,695.58, modeled repayment would take about <strong>309 months instead of 240</strong>. Holding the 20-year tenure instead would produce a modeled EMI of ₹23,303.</p>
<p>For Indian commercial-bank loans within its scope, the RBI's current <a href="https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=13140" rel="noopener">Responsible Business Conduct Directions</a> require communication of changes caused by a floating-rate reset and provide choices involving EMI, tenure and prepayment; any fixed-rate switch is subject to the bank's policy. Entity-specific RBI directions and the loan agreement govern other lenders and products.</p>

<h2>Fees, moratoriums and step-up products</h2>
<p><strong>Fees change the cash flows.</strong> As an illustration, if a 1% fee on ₹25,00,000 is deducted from the proceeds while the EMI remains based on the full principal, the borrower receives ₹24,75,000 and the modeled annualized cost is about <strong>8.64% rather than 8.5%</strong>. The one-percent input is hypothetical, not a typical market fee. The calculation method is explained in <a href="/guides/apr-vs-interest-rate/">APR vs interest rate</a>.</p>
<p><strong>Moratorium and step-up schedules</strong> require their own cash-flow assumptions. If a contract accrues and capitalizes interest during a payment pause, the modeled balance rises; a different contract treatment produces a different result. A hypothetical step-up schedule uses lower initial instalments and specified higher later instalments, without assuming that income will rise. The level-payment formula on this page does not represent either feature unless those cash flows are modeled separately.</p>
`,
};
