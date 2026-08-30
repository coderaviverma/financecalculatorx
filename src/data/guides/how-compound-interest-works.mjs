export default {
  slug: "how-compound-interest-works",
  title: "How Compound Interest Works",
  metaTitle: "How Compound Interest Works — Frequency, Time & Rule of 72",
  metaDescription:
    "The mechanism behind compounding: how frequency, rate and time interact, what the Rule of 72 gets right, and how the same math works against borrowers.",
  description:
    "See how interest joins the balance, how compounding frequency affects growth, and why time changes the result more than it first appears.",
  cardDescription: "The mechanism of interest-on-interest: frequency effects, the Rule of 72 tested, and time asymmetry.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["investment", "savings"],
  aliases: [],
  keywords: ["how compound interest works", "compounding frequency", "rule of 72", "effective annual rate", "interest on interest", "start investing early"],
  relatedCalculators: ["compound-interest-calculator", "investment-calculator", "savings-calculator", "simple-interest-calculator"],
  bodyHtml: `
<p>Compound interest begins with a simple change: once interest is added to the balance, later interest is calculated on that larger amount. Repeating the step turns steady percentage growth into a curve. The sections below show the calculation, compare compounding frequencies and explain why the starting date can matter so much.</p>

<h2>The mechanism: interest joins the base</h2>
<p>Under simple interest, the base never changes: $10,000 at 6% earns $600 every year, forever, a straight line. Under compound interest, the base absorbs each credit and grows. Watch the first three years of $10,000 at 6%, compounded yearly:</p>
<div class="table-scroll"><table>
<thead><tr><th>Year</th><th>Base at start</th><th>Interest earned (6%)</th><th>Balance at end</th></tr></thead>
<tbody>
<tr><td>1</td><td>$10,000.00</td><td>$600.00</td><td>$10,600.00</td></tr>
<tr><td>2</td><td>$10,600.00</td><td>$636.00</td><td>$11,236.00</td></tr>
<tr><td>3</td><td>$11,236.00</td><td>$674.16</td><td>$11,910.16</td></tr>
</tbody>
</table></div>
<figure class="article-figure">
<img src="/assets/img/guides/compound-interest-loop.svg" width="760" height="360" loading="lazy" decoding="async" alt="Compound interest loop: $10,000 earns $600 at 6%, the new $10,600 base then earns $636 in year two.">
<figcaption>Compounding is the same percentage applied again after interest has joined the balance. In year two, the original money and year one's interest both earn a return.</figcaption>
</figure>
<p>Year two's extra $36 is 6% earned on year one's $600: interest on interest, the defining move. Each year's growth is a fixed <em>percentage</em> but a growing <em>amount</em>: the yearly interest itself grows 6% per year. Plotted, simple interest is a line; compound interest is a curve that pulls away from it, slowly at first, then unmistakably.</p>
<div class="callout note"><span class="c-title">My first check is deliberately boring</span>
<p>When I build or review a compounding example, I calculate the first two periods separately before trusting a 30- or 40-year result. If the new balance does not become the next period's base, the model is not compounding. A precise wrong answer is still wrong; it has merely dressed up as a spreadsheet.</p></div>
<p>Notice what this means: the gains come from crediting events. Between credits, nothing compounds. That's why the crediting <em>frequency</em>, how often interest is folded into the base, is a genuine variable in the outcome, and it's the first thing worth quantifying.</p>
<p>It is also important to distinguish the modeled cash flows. Credited deposit interest joins the balance when the account terms say it does. A coupon paid out does not earn further return inside the bond, while a reinvested distribution creates a separate return path. A market-value series can rise or fall. The same compounding formula applies only after the timing and reinvestment assumptions are made explicit.</p>

<h2>Frequency: measurable, but smaller than the marketing implies</h2>
<p>Here is the same 6% nominal rate applied to $10,000 for 10 years, with the only change being how often interest is credited:</p>
<div class="table-scroll"><table>
<thead><tr><th>Compounding</th><th>Value after 10 years</th><th>Effective annual rate</th></tr></thead>
<tbody>
<tr><td>Yearly</td><td>$17,908.48</td><td>6.000%</td></tr>
<tr><td>Quarterly</td><td>$18,140.18</td><td>6.136%</td></tr>
<tr><td>Monthly</td><td>$18,193.97</td><td>6.168%</td></tr>
<tr><td>Daily</td><td>$18,220.29</td><td>6.183%</td></tr>
</tbody>
</table></div>
<p>In this example, daily exceeds yearly by $311.81, while monthly-to-daily differs by $26.32 over ten years. Continuous compounding produces about $18,221.19, roughly <strong>90 cents</strong> above daily. Those figures isolate frequency while holding the nominal rate fixed; account fees, access rules and APY can matter separately.</p>
<div class="callout note"><span class="c-title">APY already contains the frequency</span>
<p>The effective annual rate in the right-hand column incorporates the stated compounding frequency. In the US, an advertised APY is intended to express annual yield under its disclosure assumptions; fees, eligibility and rate changes can still affect an account comparison.</p></div>

<h2>The Rule of 72, tested against exact math</h2>
<p>The Rule of 72 estimates doubling time: <strong>years to double ≈ 72 ÷ annual rate</strong>. It's worth knowing exactly how good this approximation is, so here it is against the exact answer (annual compounding):</p>
<div class="table-scroll"><table>
<thead><tr><th>Rate</th><th>Rule of 72 says</th><th>Exact doubling time</th><th>Error</th></tr></thead>
<tbody>
<tr><td>2%</td><td>36.0 years</td><td>35.00 years</td><td>+1.0 year</td></tr>
<tr><td>4%</td><td>18.0 years</td><td>17.67 years</td><td>+0.3 years</td></tr>
<tr><td>6%</td><td>12.0 years</td><td>11.90 years</td><td>+0.1 years</td></tr>
<tr><td>8%</td><td>9.0 years</td><td>9.01 years</td><td>−0.01 years</td></tr>
<tr><td>12%</td><td>6.0 years</td><td>6.12 years</td><td>−0.1 years</td></tr>
</tbody>
</table></div>
<p>In the displayed 4–12% annual-compounding cases, the shortcut stays close to the exact calculation. It can flag an implausible result, but exact figures still require the stated formula and frequency. The <a href="/compound-interest-calculator/">Compound Interest Calculator</a> shows that path, and the <a href="https://www.fdic.gov/consumer-resource-center/chapter-5-compound-interest" rel="noopener">FDIC's compound-interest chapter</a> provides an independent primary-source explanation.</p>

<h2>Compounding against you</h2>
<p>The same mechanism runs in reverse on debt, and credit cards run it at high frequency: <a href="https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/" rel="noopener">most compound <strong>daily</strong></a>. Carry $5,000 on a card at 24% APR with no payments, and after twelve months the balance is <strong>$6,355.74</strong>: the 24% nominal rate compounds daily into an effective 27.11% per year. (At monthly compounding it would be 26.82%, frequency again worth a little, rate worth a lot.)</p>
<p>Using purely illustrative rates, 4% growth doubles in about 18 years under the shortcut, while 27% effective growth doubles in under 3. A debt payment changes future interest under the contract's balance and accrual rules, but the economic comparison can also involve fees, taxes and liquidity. The <a href="/guides/debt-snowball-vs-debt-avalanche/">debt-ordering guide</a> models fixed-rate schedules without assigning a universal decision rule.</p>

<h2>Time asymmetry under a constant return</h2>
<p>Because the modeled curve steepens with time, an earlier contribution receives more growth periods than a later one.</p>
<div class="example-block"><div class="ex-head">Starting at 25 vs 35: $300/month at 7%, until age 65</div><div class="ex-body">
<p><strong>Start at 25</strong> (40 years): $144,000 contributed grows to <strong>$787,444</strong>; $643,444 of it is growth.</p>
<p><strong>Start at 35</strong> (30 years): $108,000 contributed grows to <strong>$365,991</strong>; $257,991 of it is growth.</p>
<p>The ten-year delay cost $421,453 of outcome while saving only $36,000 of contributions. Sharper still: someone who contributes $300/month <em>only from 25 to 35</em> and then stops (just $36,000 total) reaches about <strong>$421,453</strong> at 65, beating the person who contributes $108,000 from 35 to 65. A third of the money, started ten years sooner, wins.</p>
</div></div>
<p>Read the 40-year run once more, from the other end: the same figures show the balance gaining $421,453 in its final ten years, more than everything it accumulated in the first thirty combined. The late years do the spectacular work, but only for money that was already in the machine; that's the sense in which the early decade is the one you can't buy back.</p>
<p>This does not claim that a market returns a smooth 7%. It shows the shape of exponential growth under one rate assumption. The CFPB's <a href="https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/teach/activities/saving-post-secondary-education/" rel="noopener">saving-for-education activity</a> provides a primary-source classroom example of time and regular saving. The separate <a href="/guides/lump-sum-vs-monthly-investing/">lump-sum versus monthly guide</a> keeps market-path uncertainty explicit.</p>

<h2>Use an effective annual rate to compare frequencies</h2>
<p>An effective annual rate converts a stated rate and compounding frequency into the percentage change over one year. For example, 5.9% compounded monthly produces an effective rate of about 6.06%, slightly above 6.0% compounded yearly. Make sure the figures use the same fee and tax basis before treating that conversion as a complete product comparison.</p>
<p>Taxes and fees reduce the amount left to compound, while inflation reduces what the future balance can buy. Compounding also assumes reinvestment: interest that is withdrawn no longer earns a return. Those details are easy to miss in a clean projection, so include them whenever they apply to the account or investment you are modeling.</p>

<section class="guide-faq faq" aria-labelledby="compound-interest-questions">
<h2 id="compound-interest-questions">Beginner questions about compounding</h2>
<details><summary>Do monthly contributions start compounding immediately?</summary><div class="faq-a"><p>Each contribution begins earning only after it is deposited, and the exact first period depends on whether the calculator models deposits at the start or end of a month. A contribution made today therefore has more time than one made next year. Check the tool's deposit-timing assumption before comparing its result with an account statement.</p></div></details>
<details><summary>Does a 7% assumption mean I will earn 7% every year?</summary><div class="faq-a"><p>No. A calculator applies the rate smoothly because it needs one input, while real investment returns can be positive or negative and arrive in an uneven sequence. Use several plausible rates as scenarios, not a single rate as a promise. Guaranteed deposit rates are different, but their term, compounding and withdrawal conditions still matter.</p></div></details>
<details><summary>Can compound interest work against me?</summary><div class="faq-a"><p>Yes. Unpaid borrowing costs can join a debt balance and generate further interest, which is the same loop with the direction reversed. Credit-card balances are a common example. Fees, taxes and inflation can also reduce the useful growth of savings even when the displayed balance rises.</p></div></details>
</section>
`,
};
