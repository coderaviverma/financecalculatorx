export default {
  slug: "apr-vs-interest-rate",
  title: "APR vs Interest Rate: What's the Difference?",
  metaTitle: "APR vs Interest Rate — What the Difference Costs You",
  metaDescription:
    "The interest rate sets your payment; APR folds in mandatory fees. A worked example where the lower-rate loan is the more expensive one, computed step by step.",
  description:
    "Interest rate and APR answer different questions — one sets your payment, the other measures true cost. Here's how each is computed and when they disagree.",
  cardDescription: "What APR includes that the interest rate doesn't, and a computed case where the lower rate loses.",
  lastReviewed: "2026-07-12",
  published: "2026-07-12",
  categories: ["loans", "mortgage"],
  aliases: [],
  keywords: ["apr vs interest rate", "annual percentage rate", "loan fees apr", "apr meaning", "apy vs apr", "compare loan offers"],
  relatedCalculators: ["loan-comparison-calculator", "loan-calculator", "mortgage-calculator", "personal-loan-calculator"],
  bodyHtml: `
<p>A loan offer shows two percentages, and they answer different questions. The <strong>interest rate</strong> answers "what will my monthly payment be?" The <strong>APR</strong> answers "what does this loan really cost per year, fees included?" On a loan with no fees they're identical. On a loan with fees they diverge, and occasionally they diverge enough that the offer with the lower interest rate is the more expensive loan. This guide defines both precisely and then computes exactly such a case.</p>

<h2>Two numbers, two jobs</h2>
<p>The <strong>interest rate</strong> (the "nominal" or "note" rate) is the rate applied to your outstanding balance to accrue interest. Divide it by 12 and you have the monthly rate that drives the payment formula and the amortization schedule — the mechanics covered in <a href="/guides/how-loan-interest-works/">how loan interest works</a>. It says nothing about fees.</p>
<p>The <strong>APR (annual percentage rate)</strong> is a disclosure figure, not a rate the lender charges. It restates the loan's total mandatory cost, interest <em>plus required fees</em>, as a single yearly rate computed on the money you walked away with. The logic: if you're charged an $800 origination fee on a $20,000 loan, you effectively borrowed $19,200 but repay as if you borrowed $20,000. The APR is the interest rate that would produce your exact payments on that smaller, real amount. Fees make APR higher than the note rate; no fees make them equal. APR can never be lower. The CFPB's <a href="https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" rel="noopener">explainer on mortgage rates versus APR</a> makes the same point in the home-loan context.</p>

<h2>What APR includes — and what it doesn't</h2>
<ul>
<li><strong>Included:</strong> origination and processing fees, mandatory administration charges, discount points on a mortgage, and any insurance the lender <em>requires</em> as a condition of the loan.</li>
<li><strong>Not included:</strong> optional add-ons (payment protection insurance you chose), penalties that depend on your behavior (late fees, prepayment charges), and typically some third-party costs such as appraisal or notary fees, though the exact list varies.</li>
</ul>
<div class="callout note"><span class="c-title">Definitions differ by country</span>
<p>The US (<a href="https://www.consumerfinance.gov/rules-policy/regulations/1026/" rel="noopener">Regulation Z</a>, the Truth in Lending rule), the EU (APRC under the Consumer Credit Directive), the UK, and India each draw the included-fees line slightly differently, and the EU convention compounds the rate where the US convention doesn't. The numbers below use the US-style monthly convention. The principle is universal (APR = payments measured against what you received), but only compare APRs computed under the same country's rules.</p></div>

<h2>A computed example: when the lower rate is the worse deal</h2>
<p>Two offers for $20,000 over 60 months:</p>
<div class="example-block"><div class="ex-head">Loan A: 6.4% with no fees, versus Loan B: 5.9% with an $800 origination fee</div><div class="ex-body">
<p><strong>Loan A</strong>: payment on $20,000 at 6.4% for 60 months is <strong>$390.39</strong>. Total repaid: $23,423.21. No fees, so APR = 6.4%.</p>
<p><strong>Loan B</strong>: payment on $20,000 at 5.9% is <strong>$385.73</strong>, about $4.66 less per month. But the $800 fee means you only received $19,200. Total cost: $23,143.60 in payments + $800 = <strong>$23,943.60</strong>, a full <strong>$520.39 more than Loan A</strong>.</p>
<p>Loan B's APR is the rate at which 60 payments of $385.73 are worth exactly $19,200 today. Solving for that rate gives <strong>7.61%</strong>. So the true comparison is 6.4% vs 7.61%, and Loan A wins despite the higher sticker rate.</p>
</div></div>
<div class="table-scroll"><table>
<thead><tr><th></th><th>Loan A</th><th>Loan B</th></tr></thead>
<tbody>
<tr><td>Interest rate</td><td>6.4%</td><td><strong>5.9%</strong> (lower)</td></tr>
<tr><td>Fees</td><td>$0</td><td>$800</td></tr>
<tr><td>Monthly payment</td><td>$390.39</td><td><strong>$385.73</strong> (lower)</td></tr>
<tr><td>Total cost (payments + fees)</td><td><strong>$23,423.21</strong> (lower)</td><td>$23,943.60</td></tr>
<tr><td>APR</td><td><strong>6.4%</strong> (lower)</td><td>7.61%</td></tr>
</tbody>
</table></div>
<p>Loan B wins on the two numbers an advertisement shows (rate and payment) and loses on the two that matter. This is precisely the situation APR exists to expose. Another way to see it: B's rate advantage saves $4.66 per month, so recouping the $800 fee would take about <strong>172 months, yet the loan only runs 60</strong>. B can never catch up. Whenever a fee buys a rate discount, that break-even division (fee ÷ monthly saving) is the fastest sanity check available, and it's exactly the calculation behind whether mortgage discount points are worth paying. The <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> runs this computation for any pair of offers, and the broader checklist lives in <a href="/guides/how-to-compare-loan-offers/">how to compare loan offers</a>.</p>

<h2>Where APR misleads</h2>
<p>APR is calibrated to one scenario: you keep the loan for its full term. Break that assumption and the ranking can flip back.</p>
<p><strong>Short holding periods.</strong> An upfront fee is paid once, but APR spreads it across the whole term. Repay early and the fee is concentrated into fewer years, so the true annual cost rises above the disclosed APR. Take Loan B again: if you repay it after 24 months (remaining balance $12,698.13), the effective annual cost of those two years — 24 payments plus the payoff, measured against the $19,200 received — works out to <strong>8.52%</strong>, well above the 7.61% full-term APR. This is why <a href="https://www.consumerfinance.gov/ask-cfpb/what-are-discount-points-and-lender-credits-and-how-do-they-work-en-136/" rel="noopener">mortgage discount points</a> are usually poor value if you might sell or refinance within a few years: the fee is sunk on day one, the rate saving needs years to repay it.</p>

<h2>Comparing across terms, and the mortgage case</h2>
<p>APR is an annualized <em>rate</em>, not a total. A 36-month loan and a 72-month loan at the same APR are radically different commitments — the longer one accrues that rate over twice as many years and costs far more in total interest. APR ranks loans of the <em>same</em> amount and term; across different terms, compare total cost and monthly payment side by side instead.</p>
<p>Mortgages deserve special care. Home loans carry the largest fee stacks (origination, points, and various closing costs), so the rate-to-APR gap is usually widest there, and the short-holding-period problem bites hardest because few 30-year mortgages live for 30 years. For adjustable-rate mortgages, the disclosed APR also embeds an assumption about where the rate goes after the fixed period, which makes it closer to a forecast than a fact. Use the <a href="/mortgage-calculator/">Mortgage Calculator</a> to see the payment mechanics, but evaluate fees against the years you realistically expect to keep the loan.</p>
<div class="callout warn"><span class="c-title">A 0% headline is not free money</span>
<p>Promotional rates with mandatory fees have a positive APR by definition. And a "0% for 12 months" card or loan that jumps afterward needs to be evaluated over your realistic payoff horizon, not the promo window.</p></div>

<h2>The savings-side mirror: APY and AER</h2>
<p>Savings products have the same two-number structure, mirrored. The nominal rate understates what a savings account pays, because it ignores intra-year compounding; <strong>APY</strong> (annual percentage yield, called <strong>AER</strong> in the UK) states the true yearly growth with compounding included. A 5% nominal rate compounded monthly is a 5.12% APY.</p>
<p>Notice the symmetry: on loans, the headline number (note rate) understates the true cost, and APR corrects it upward. On savings, the headline number (nominal rate) understates the true yield, and APY corrects it upward. That mirror image is why banks quote APR reluctantly on loans and APY enthusiastically on deposits. In both cases the corrected figure is the comparable one. The compounding mechanics behind APY are worked through in <a href="/guides/how-compound-interest-works/">how compound interest works</a>.</p>

<h2>How to use each number</h2>
<ul>
<li><strong>Budgeting?</strong> Use the interest rate: together with the term, it determines your monthly payment. The <a href="/loan-calculator/">Loan Calculator</a> gives you payment and schedule from it.</li>
<li><strong>Comparing offers with the same amount and term?</strong> Use APR. It's the single number designed for exactly this.</li>
<li><strong>Comparing different terms, or planning early payoff?</strong> Use total cost over your realistic horizon. APR's full-term assumption breaks here.</li>
<li><strong>Reading any offer?</strong> If APR is well above the quoted rate, that gap is fees. Ask for the itemized list before signing.</li>
<li><strong>Refinancing?</strong> The new loan's fees are a fresh upfront cost against a rate saving that accrues slowly. The same break-even division as above, measured against how long you'll keep the new loan, decides it.</li>
</ul>
<p>Disclosure rules require lenders in most countries to state APR before you commit. It's a good number, honest by construction and hard to game, as long as you remember the one thing it assumes: that you'll still be paying this loan in its final month.</p>
`,
};
