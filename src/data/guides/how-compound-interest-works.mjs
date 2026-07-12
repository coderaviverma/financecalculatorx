export default {
  slug: "how-compound-interest-works",
  title: "How Compound Interest Works",
  metaTitle: "How Compound Interest Works — Frequency, Time & Rule of 72",
  metaDescription:
    "The mechanism behind compounding: how frequency, rate and time interact, what the Rule of 72 gets right, and how the same math works against borrowers.",
  description:
    "Why interest that earns interest bends growth into a curve — the mechanism, the real effect of compounding frequency, and the asymmetry that makes starting early decisive.",
  cardDescription: "The mechanism of interest-on-interest: frequency effects, the Rule of 72 tested, and time asymmetry.",
  lastReviewed: "2026-07-12",
  published: "2026-07-12",
  categories: ["investment", "savings"],
  aliases: [],
  keywords: ["how compound interest works", "compounding frequency", "rule of 72", "effective annual rate", "interest on interest", "start investing early"],
  relatedCalculators: ["compound-interest-calculator", "investment-calculator", "savings-calculator", "simple-interest-calculator"],
  bodyHtml: `
<p>Compound interest is a bookkeeping rule with outsized consequences: whenever interest is credited, it stops being "interest" and becomes part of the balance — so the next interest calculation runs on a slightly bigger number. That's the entire mechanism. Everything remarkable about compounding (and everything painful about compounding debt) follows from that one rule repeating dozens or hundreds of times. This guide examines the machinery itself: how often the rule fires, how to sanity-check its output in your head, and why <em>when</em> you start matters more than almost anything else.</p>

<h2>The mechanism: interest joins the base</h2>
<p>Under simple interest, the base never changes — $10,000 at 6% earns $600 every year, forever, a straight line. Under compound interest, the base absorbs each credit and grows. Watch the first three years of $10,000 at 6%, compounded yearly:</p>
<div class="table-scroll"><table>
<thead><tr><th>Year</th><th>Base at start</th><th>Interest earned (6%)</th><th>Balance at end</th></tr></thead>
<tbody>
<tr><td>1</td><td>$10,000.00</td><td>$600.00</td><td>$10,600.00</td></tr>
<tr><td>2</td><td>$10,600.00</td><td>$636.00</td><td>$11,236.00</td></tr>
<tr><td>3</td><td>$11,236.00</td><td>$674.16</td><td>$11,910.16</td></tr>
</tbody>
</table></div>
<p>Year two's extra $36 is 6% earned on year one's $600 — interest on interest, the defining move. Each year's growth is a fixed <em>percentage</em> but a growing <em>amount</em>: the yearly interest itself grows 6% per year. Plotted, simple interest is a line; compound interest is a curve that pulls away from it — slowly at first, then unmistakably.</p>
<p>Notice what this means: the gains come from crediting events. Between credits, nothing compounds. That's why the crediting <em>frequency</em> — how often interest is folded into the base — is a genuine variable in the outcome, and it's the first thing worth quantifying.</p>
<p>It's also worth being precise about what actually compounds. Bank deposits compound by contract: credited interest joins the balance automatically. Bonds mostly don't — a coupon paid to your account earns nothing further unless you reinvest it, which is why the same yield can produce very different outcomes depending on what happens to the payouts. Equity returns compound structurally (this year's growth builds on last year's prices, and reinvested dividends buy shares that generate their own dividends), but at a rate that's an average over volatile years rather than a promise. The arithmetic below applies to all three; only the certainty of the rate differs.</p>

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
<p>Two honest readings of this table. First, frequency is real money: daily beats yearly by $311.81 on this example. Second, it saturates fast — the entire gap between monthly and daily compounding is $26.32 over ten years. Moving from yearly to quarterly captures most of the available benefit; beyond monthly, the differences are rounding-error territory. The saturation has a hard ceiling: push the frequency toward compounding every instant (the "continuous" limit) and this example tops out near $18,221.19 — about <strong>90 cents</strong> above daily compounding, after ten years. A bank advertising "daily compounding" is describing something worth about 0.015% per year over monthly; a 0.25% higher rate at a competitor beats it easily. Frequency is the least important of the three levers — rate and time do the actual work.</p>
<div class="callout note"><span class="c-title">APY already contains the frequency</span>
<p>The effective annual rate in the right-hand column is what banks publish as APY (or AER in the UK). It states the true one-year growth with compounding folded in — which makes it the correct number for comparing accounts, regardless of how often each one credits interest.</p></div>

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
<p>Between roughly 4% and 12% — the range where most savings and investment questions live — the rule is accurate to within a few weeks. Use it to sanity-check any calculator output: if a tool claims your money triples in 10 years at 6%, the rule (doubling alone takes ~12 years) tells you something's off before you check a single formula. For exact figures at any rate and frequency, the <a href="/compound-interest-calculator/">Compound Interest Calculator</a> shows the year-by-year path.</p>

<h2>Compounding against you</h2>
<p>The same mechanism runs in reverse on debt, and credit cards run it at high frequency: most compound <strong>daily</strong>. Carry $5,000 on a card at 24% APR with no payments, and after twelve months the balance is <strong>$6,355.74</strong> — the 24% nominal rate compounds daily into an effective 27.11% per year. (At monthly compounding it would be 26.82% — frequency again worth a little, rate worth a lot.)</p>
<p>The asymmetry with savings is stark: the same dollar compounds at perhaps 4–5% in your savings account and 25%+ on your card balance. Run the Rule of 72 on both directions: money saved at 4% doubles in about 18 years; a card balance at 27% effective doubles in under 3. That gap is why paying down high-rate debt is, mathematically, an investment with a guaranteed return equal to the card's rate — a comparison worked through in <a href="/guides/debt-snowball-vs-debt-avalanche/">debt snowball vs debt avalanche</a>.</p>

<h2>Time asymmetry: the decade you can't buy back</h2>
<p>Because the curve steepens with time, the early years of compounding are worth far more than they appear — and the cost of delay is larger than intuition suggests.</p>
<div class="example-block"><div class="ex-head">Starting at 25 vs 35: $300/month at 7%, until age 65</div><div class="ex-body">
<p><strong>Start at 25</strong> (40 years): $144,000 contributed grows to <strong>$787,444</strong> — $643,444 of it is growth.</p>
<p><strong>Start at 35</strong> (30 years): $108,000 contributed grows to <strong>$365,991</strong> — $257,991 of it is growth.</p>
<p>The ten-year delay cost $421,453 of outcome while saving only $36,000 of contributions. Sharper still: someone who contributes $300/month <em>only from 25 to 35</em> and then stops — $36,000 total — reaches about <strong>$421,453</strong> at 65, beating the person who contributes $108,000 from 35 to 65. A third of the money, started ten years sooner, wins.</p>
</div></div>
<p>Read the 40-year run once more, from the other end: the same figures show the balance gaining $421,453 in its final ten years — more than everything it accumulated in the first thirty combined. The late years do the spectacular work, but only for money that was already in the machine; that's the sense in which the early decade is the one you can't buy back.</p>
<p>This is not a claim that markets return a smooth 7% — they don't, and real sequences of returns will land above or below. It's a statement about the shape of exponential growth: contributions made early sit on the steep part of the curve for decades. The trade-offs between investing early in a lump sum versus spreading contributions are examined in <a href="/guides/lump-sum-vs-monthly-investing/">lump sum vs monthly investing</a>.</p>

<h2>Effective annual rate: the universal comparator</h2>
<p>Every compounding arrangement — any rate, any frequency — reduces to one comparable number: the effective annual rate, the percentage the balance actually grows in a year. This settles otherwise-confusing comparisons. Is 5.9% compounded monthly better than 6.0% compounded yearly? Convert both: 5.9% monthly is an effective 6.06%, so yes — the lower headline number wins. Between accounts, funds, or loans quoted with different frequencies, convert to effective rates and the ranking is unambiguous.</p>
<p>Three practical closing notes. Taxes and fees interrupt compounding: interest taxed each year compounds only its after-tax portion, and a 1% annual fee compounds against you just as relentlessly as returns compound for you. Inflation compounds too — 3% inflation halves purchasing power in about 24 years (the Rule of 72 again), which is why <a href="/guides/how-inflation-affects-savings/">how inflation affects savings</a> deserves its own reading. And compounding assumes reinvestment: interest you withdraw and spend earns nothing. The curve only bends for money that stays.</p>
`,
};
