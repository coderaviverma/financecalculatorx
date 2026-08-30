export default {
  slug: "apr-vs-interest-rate",
  title: "APR vs Interest Rate: What's the Difference?",
  metaTitle: "APR vs Interest Rate — What the Difference Costs You",
  metaDescription:
    "The interest rate sets your payment; APR folds in mandatory fees. A worked example where the lower-rate loan is the more expensive one, computed step by step.",
  description:
    "Learn what the interest rate and APR each measure, how fees create a gap between them, and when total cost is the better comparison.",
  cardDescription: "What APR includes that the interest rate doesn't, and a computed case where the lower rate loses.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["loans", "mortgage"],
  aliases: [],
  keywords: ["apr vs interest rate", "annual percentage rate", "loan fees apr", "apr meaning", "apy vs apr", "compare loan offers"],
  relatedCalculators: ["loan-comparison-calculator", "loan-calculator", "mortgage-calculator", "personal-loan-calculator"],
  bodyHtml: `
<p>Seeing two percentages on a loan offer is confusing until you separate their jobs. The <strong>interest rate</strong> helps determine the scheduled payment. The <strong>APR</strong> is meant to express the yearly borrowing cost after qualifying fees are included. When an offer has fees, the loan with the lower interest rate can still cost more. The worked comparison below shows how that happens.</p>

<h2>Two numbers, two jobs</h2>
<p>The <strong>interest rate</strong> (the "nominal" or "note" rate) is the rate applied to your outstanding balance to accrue interest. Divide it by 12 and you have the monthly rate that drives the payment formula and the amortization schedule — the mechanics covered in <a href="/guides/how-loan-interest-works/">how loan interest works</a>. It says nothing about fees.</p>
<p>The <strong>APR (annual percentage rate)</strong> is a disclosure figure, not a separate rate charged to the balance. It converts interest and the fees included by the applicable disclosure rules into a yearly rate. If an $800 origination fee is deducted from a $20,000 loan, you receive $19,200 but make payments calculated on $20,000. The APR is the rate that matches those payments to the smaller amount received. The CFPB's <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" rel="noopener">explainer on mortgage rates versus APR</a> covers this distinction for US mortgages. Which charges belong in APR depends on the product and jurisdiction, so read the itemized disclosure as well as the percentage.</p>
<figure class="article-figure">
<img src="/assets/img/guides/apr-comparison-flow.svg" width="760" height="360" loading="lazy" decoding="async" alt="APR flow: a 5.9% interest rate sets a $385.73 payment, an $800 fee reduces cash received to $19,200, and APR combines both effects into 7.61%.">
<figcaption>The interest rate describes the payment calculation. APR also accounts for qualifying fees by measuring those payments against the money actually received.</figcaption>
</figure>

<h2>What APR includes — and what it doesn't</h2>
<ul>
<li><strong>Potentially included:</strong> charges such as origination fees or mortgage discount points when the applicable disclosure rule classifies them as finance charges.</li>
<li><strong>Potentially excluded:</strong> some optional products, event-triggered charges and third-party services. The exact treatment depends on product, jurisdiction and transaction details.</li>
</ul>
<div class="callout note"><span class="c-title">Definitions differ by country</span>
<p>In the US, <a href="https://www.consumerfinance.gov/rules-policy/regulations/1026/" rel="noopener">Regulation Z</a> defines APR and finance-charge disclosures for covered consumer credit. Other jurisdictions can use different names, included charges and calculation conventions. The numbers below use the page's stated monthly cash-flow method and should not be substituted for a regulated disclosure.</p></div>

<h2>A computed example: when the lower rate is the worse deal</h2>
<p>Imagine Meera needs $20,000 for a used car and a repair buffer. She has two 60-month offers. Loan B looks friendlier in the advertisement, but its fee is withheld before the money reaches her:</p>
<div class="example-block"><div class="ex-head">Loan A: 6.4% with no fees, versus Loan B: 5.9% with an $800 origination fee</div><div class="ex-body">
<p><strong>Loan A</strong>: payment on $20,000 at 6.4% for 60 months is <strong>$390.39</strong>. Total repaid: $23,423.21. No fees, so APR = 6.4%.</p>
<p><strong>Loan B</strong>: payment on $20,000 at 5.9% is <strong>$385.73</strong>, about $4.66 less per month. But the $800 fee means you only received $19,200. Total cost: $23,143.60 in payments + $800 = <strong>$23,943.60</strong>, a full <strong>$520.39 more than Loan A</strong>.</p>
<p>Loan B's modeled APR is the rate at which 60 payments of $385.73 have a present value of $19,200. Solving gives <strong>7.61%</strong>. In this equal-amount, equal-term example, Loan A has the lower modeled APR and lower total cost despite the higher note rate.</p>
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
<p>Loan B has the lower note rate and payment but the higher modeled APR and total cost. Its $4.66 monthly payment difference would take about <strong>172 months</strong> to offset the $800 fee, longer than the 60-month term. Fee divided by monthly payment difference is a simple break-even approximation; the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> also compares full cash flows.</p>

<h2>Where APR misleads</h2>
<p>APR is calibrated to one scenario: you keep the loan for its full term. Break that assumption and the ranking can flip back.</p>
<p><strong>Short holding periods.</strong> An upfront fee is paid once, while the disclosed APR generally reflects the contractual cash-flow assumptions. In this example, repaying after 24 months (remaining balance $12,698.13) produces a modeled annualized cost of <strong>8.52%</strong>, above the 7.61% full-term figure. The CFPB explains that <a href="https://www.consumerfinance.gov/ask-cfpb/what-are-discount-points-and-lender-credits-and-how-do-they-work-en-136/" rel="noopener">mortgage points exchange upfront cost for a rate change</a>; whether the fee is recovered depends on the actual holding period and quoted terms.</p>

<h2>Comparing across terms, and the mortgage case</h2>
<p>APR is an annualized <em>rate</em>, not a total. A 36-month and a 72-month loan can have the same APR but different payments and total interest because the borrowing periods differ. APR is most directly comparable when amount, term, fee treatment and calculation rules align; otherwise show payment and total cash flows alongside it.</p>
<p>Mortgage disclosures can contain origination charges, points and other closing costs, so the itemized figures matter alongside the APR. Adjustable-rate mortgage disclosures can also depend on contractual assumptions about future resets. The <a href="/mortgage-calculator/">Mortgage Calculator</a> shows a fixed-rate payment scenario but does not reproduce a regulated APR disclosure.</p>
<div class="callout warn"><span class="c-title">A 0% headline is not free money</span>
<p>Promotional rates with mandatory fees have a positive APR by definition. And a "0% for 12 months" card or loan that jumps afterward needs to be evaluated over your realistic payoff horizon, not the promo window.</p></div>

<h2>The savings-side mirror: APY and AER</h2>
<p>Savings products use a related but separate yield measure. A nominal rate ignores intra-year compounding; <strong>APY</strong> states one-year growth with compounding included under its assumptions. A 5% nominal rate compounded monthly is a 5.12% APY.</p>
<p>The labels are similar but they should not be used interchangeably. APR helps compare borrowing costs under the relevant disclosure rules; APY helps compare deposit growth after compounding. The compounding mechanics behind APY are worked through in <a href="/guides/how-compound-interest-works/">how compound interest works</a>.</p>

<h2>What each number can compare</h2>
<ul>
<li><strong>Scheduled payment:</strong> the note rate, amount and term feed the payment formula used by the <a href="/loan-calculator/">Loan Calculator</a>.</li>
<li><strong>Comparable regulated offers:</strong> APR combines the charges required by the applicable disclosure rule, but the itemized disclosure shows what was included.</li>
<li><strong>Different terms or early payoff:</strong> payment and total cash flows over the same assumed holding period reveal differences that one annualized rate may not.</li>
<li><strong>Rate-to-APR gap:</strong> an included finance charge can create a gap, but the disclosure rather than the gap itself identifies the charge.</li>
<li><strong>Refinancing:</strong> entered fees and monthly payment difference create a break-even scenario; a later sale, payoff or refinance changes it.</li>
</ul>
<p>Use the regulated cost disclosure supplied with the offer, but do not stop at one percentage. Confirm which fees it includes and compare the total amount paid over the period you realistically expect to keep the loan. APR is most useful when the loan amount, term and expected holding period are alike.</p>

<section class="guide-faq faq" aria-labelledby="apr-questions">
<h2 id="apr-questions">Beginner questions about APR</h2>
<details><summary>Is the loan with the lowest APR always the cheapest?</summary><div class="faq-a"><p>It is usually the best starting point only when the loan amount, term and expected payoff date are comparable. A longer loan can show a similar APR while costing much more in total interest, and a fee-heavy loan can be poor value if you repay early. Compare the payment, upfront cash, total cost and your realistic holding period together.</p></div></details>
<details><summary>Can APR equal the interest rate?</summary><div class="faq-a"><p>Yes. If the calculation includes no qualifying fees and uses the same rate convention, APR can match the stated interest rate. A visible gap between the two usually signals included fees or another financed cost, but the disclosure should show the actual items rather than leaving you to infer them.</p></div></details>
<details><summary>Does APR include every fee I will pay?</summary><div class="faq-a"><p>No. The included charges depend on the product and the disclosure rules in the relevant country. Optional products, behavior-based charges and some third-party costs may sit outside APR. Read the itemized fee list and ask for the total amount payable; one percentage cannot describe every cash outflow.</p></div></details>
</section>
`,
};
