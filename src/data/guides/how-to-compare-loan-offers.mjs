export default {
  slug: "how-to-compare-loan-offers",
  title: "How to Compare Loan Offers",
  metaTitle: "How to Compare Loan Offers on the Same Basis",
  metaDescription:
    "A step-by-step process for comparing loans: normalize quotes, weigh rate against fees with a computed case study, find the break-even, read the fine print.",
  description:
    "Two loan offers rarely differ on one number alone. A repeatable process: normalize the quotes, weigh rate against fees, find the break-even, read the fine print.",
  cardDescription: "A repeatable process for choosing between loans: normalize, compute totals, break-even, fine print.",
  lastReviewed: "2026-09-24",
  published: "2026-07-12",
  categories: ["loans", "personal"],
  aliases: [],
  keywords: ["compare loan offers", "loan comparison", "apr comparison", "loan fees", "best loan offer"],
  relatedCalculators: ["loan-comparison-calculator", "personal-loan-calculator", "loan-calculator", "loan-interest-calculator"],
  bodyHtml: `
<p>Loan offers often emphasize different numbers. One may lead with a low rate, another with no fee, and another with the smallest monthly payment over a longer term. Put them on the same amount and term before comparing the payment, fees, APR and total cost. The steps below provide a repeatable way to do that.</p>

<h2>Step 1: Normalize before you compare</h2>
<p>A comparison is only valid if the offers describe the same loan. Before any math:</p>
<ul>
<li><strong>Same amount, same purpose.</strong> Quotes for $18,000 and $20,000 are not comparable, because rates and fees both shift with size.</li>
<li><strong>Quote date.</strong> Offers from different dates may reflect changed rates or terms, so record the date and expiration shown on each one.</li>
<li><strong>Disclosure format.</strong> Use the formal written fields available for the product, such as a Loan Estimate for a US mortgage, rather than comparing an itemized offer with an unitemized headline.</li>
<li><strong>Same term where possible.</strong> As shown below, differing terms can make a worse loan look better on every easy metric. If a lender only offers 48 months against another's 60, note it, because that difference needs special handling.</li>
</ul>
<p>For US mortgages, the <a href="https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/" rel="noopener">CFPB explains how rate-shopping inquiries may be treated by scoring models</a> and why the applicable window can vary. That source is product- and country-specific; it should not be generalized to every loan or scoring system. The <a href="https://www.consumerfinance.gov/consumer-tools/auto-loans/" rel="noopener">CFPB's auto-loan tools</a> provide a separate US vehicle-finance worksheet.</p>

<h2>Step 2: Four core fields, plus the disclosures around them</h2>
<p>Four fields drive this calculator comparison, while insurance, variable-rate terms, late charges and other conditions remain in the disclosure:</p>
<ul>
<li><strong>Interest rate</strong>: the engine of the cost, but never sufficient alone.</li>
<li><strong>Term</strong>: at the same amount and rate, more scheduled months generally increase total interest while lowering the payment.</li>
<li><strong>Included fees</strong>: origination, processing, documentation and other charges identified by the applicable disclosure. A fee is a separate borrowing cost, not literally interest.</li>
<li><strong>Prepayment terms</strong>: any charge or restriction triggered by early payoff changes cash flows when the modeled holding period is shorter than the term.</li>
</ul>
<p>Promotional credits, temporary rates and other incentives can be entered as cash flows rather than treated as a separate measure of value. A monthly payment alone cannot identify total cost because changing the term also changes the number of payments. How the rate turns into scheduled interest is covered in <a href="/guides/how-loan-interest-works/">how loan interest works</a>.</p>

<h2>Step 3: Use APR, and know its blind spot</h2>
<p>APR expresses borrowing cost under the charges and conventions required by the applicable disclosure rule. The <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-an-interest-rate-and-the-annual-percentage-rate-apr-in-an-auto-loan-en-733/" rel="noopener">CFPB explains the distinction for US auto loans</a>. APRs are most directly comparable when amount, term, timing and disclosure rules align; confirm the itemized fees rather than assuming every charge is included. The mechanics live in <a href="/guides/apr-vs-interest-rate/">APR vs interest rate</a>.</p>
<p>APR has two blind spots worth respecting. First, <strong>it cannot rank loans of different terms.</strong> A 36-month loan and a 60-month loan at identical APRs cost very different total interest, because one rents the money longer; APR measures price per year, not total cost. (A $20,000 loan at 7.9% over 36 months incurs $2,529 of interest; the 60-month offers below incur $4,000–4,900, yet the 36-month loan's <em>payment</em> is far higher. Different terms are a budget decision first, a price comparison second.) Second, <strong>APR assumes you keep the loan to maturity.</strong> Pay it off early and the fee you paid up front was spread over fewer months than APR assumed, which can flip the ranking. That is what break-even analysis is for.</p>

<h2>Step 4: A computed case study</h2>
<div class="example-block"><div class="ex-head">$20,000 over 60 months: Offer A at 8.9%, no fee vs Offer B at 7.4%, $500 origination fee</div><div class="ex-body">
<p><strong>Offer A:</strong> payment $414.20/month; total paid $24,852; total interest $4,852. APR = 8.9% (no fees).</p>
<p><strong>Offer B:</strong> payment $399.81/month; total paid $23,989 plus the $500 fee = <strong>$24,489</strong>; total interest $3,989. Folding the fee in, the APR is about <strong>8.5%</strong>.</p>
<p><strong>Verdict held to term:</strong> B wins by $363 despite the fee, because the rate advantage of $14.39/month outlasts the $500 head start A gets.</p>
<p><strong>Early-payoff comparison:</strong> after payment 23, payments already made plus remaining principal and upfront fees total $22,885.91 for A and $22,886.11 for B. After payment 24, those totals are $22,984.99 and $22,967.45, so B is lower by $17.54. The first crossover is <strong>month 24</strong>, assuming no settlement charges. Dividing the fee by the monthly payment difference omits the different balances still owed.</p>
<p><strong>Model boundary:</strong> compare <code>payments already made + remaining principal + upfront fees + settlement charges</code> at the same exit date. This example settles immediately after a scheduled payment and excludes settlement penalties and interest between payment dates. Those costs can change the result. Early-payoff case corrected on 24 September 2026.</p>
</div></div>

<div class="table-scroll"><table>
<thead><tr><th></th><th>Offer A</th><th>Offer B</th></tr></thead>
<tbody>
<tr><td>Rate / term</td><td>8.9% / 60 mo</td><td>7.4% / 60 mo</td></tr>
<tr><td>Mandatory fee</td><td>$0</td><td>$500</td></tr>
<tr><td>Monthly payment</td><td>$414.20</td><td>$399.81</td></tr>
<tr><td>Total cost (incl. fee)</td><td>$24,852</td><td>$24,489</td></tr>
<tr><td>APR</td><td>8.9%</td><td>≈8.5%</td></tr>
<tr><td>Exit outlay after payment 23, no settlement charges</td><td>$22,885.91</td><td>$22,886.11</td></tr>
<tr><td>Exit outlay after payment 24, no settlement charges</td><td>$22,984.99</td><td>$22,967.45</td></tr>
</tbody>
</table></div>

<p>The default example changes order between payments 23 and 24 because interest savings then exceed the upfront fee difference. Other inputs can produce another crossover or none; unequal terms can change the later comparison. The <a href="/loan-comparison-calculator/">loan comparison calculator</a> reports full-term costs and the first fee-recovery month when applicable. A single offer's remaining balance and paid interest are shown in the <a href="/loan-calculator/">loan calculator</a> schedule.</p>

<h2>Step 5: Record any revised offer on the same fields</h2>
<p>If a lender provides revised terms, enter the new amount, rate, term, fees and total payment as a separate offer. Comparing a written revision with the earlier disclosure prevents one changed field from obscuring another. The guide makes no assumption that a particular lender or product permits negotiation.</p>

<h2>Step 6: The fine-print checklist</h2>
<div class="callout warn"><span class="c-title">Read for these before signing</span>
<ul>
<li><strong>Origination/processing fees:</strong> confirm whether deducted from proceeds (you receive less) or added to the balance (you finance the fee at interest).</li>
<li><strong>Prepayment penalties or precomputed interest:</strong> either one limits your ability to save by paying early.</li>
<li><strong>Late-fee schedule and grace period:</strong> the terms you hope never to use, priced anyway.</li>
<li><strong>Insurance add-ons:</strong> check whether each policy is optional, what it covers, its cancellation terms and whether its cost is financed. A required charge belongs in the offer comparison.</li>
<li><strong>Autopay discounts:</strong> some lenders quote rates that assume an autopay discount; confirm the rate without it, and what happens if a payment method fails.</li>
<li><strong>Variable-rate triggers:</strong> if the rate is not fixed, what index it follows, how often it resets, and any caps.</li>
</ul>
</div>

<h2>The worksheet</h2>
<p>The full process, compressed to something you can run in an evening:</p>
<ol>
<li>Fix the loan amount and preferred term; collect comparable written quotes close enough together that market changes do not distort the comparison.</li>
<li>For each offer, extract the four numbers: rate, term, mandatory fees, prepayment terms.</li>
<li>Compute each offer's monthly payment and <strong>total cost including fees</strong>; rank same-term offers by APR and confirm with totals.</li>
<li>Estimate your realistic horizon; compute the break-even month for any fee-versus-rate trade-off and check which offer wins <em>your</em> horizon.</li>
<li>If negotiation is available, ask whether another lender can improve the all-in terms and request any revision in writing.</li>
<li>Compare the preferred modeled result with the final disclosure and note any field that changed before signing.</li>
</ol>
<p>Keep the written offers and compare the same fields in the same order. Total cost over your expected holding period is often more informative than the most prominent number in an advertisement. Before accepting an offer, confirm the figures against the lender's final disclosure and contract.</p>
`,
};
