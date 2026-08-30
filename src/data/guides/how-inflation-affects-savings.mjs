export default {
  slug: "how-inflation-affects-savings",
  title: "How Inflation Affects Your Savings",
  metaTitle: "How Inflation Affects Savings — Real Returns",
  metaDescription:
    "Why a growing balance can still lose purchasing power: the real-return formula, computed examples at 3% inflation, and scenarios at different rates.",
  description:
    "Inflation changes the purchasing power of a future balance. Here is the real-return formula and the effect of alternative rate assumptions.",
  cardDescription: "The arithmetic of purchasing power: real returns, computed examples, and honest options for savers.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["savings", "investment"],
  aliases: [],
  keywords: ["inflation and savings", "real return", "purchasing power", "real vs nominal", "inflation calculator"],
  relatedCalculators: ["investment-calculator", "savings-calculator", "compound-interest-calculator"],
  bodyHtml: `
<p>A savings balance can rise while its purchasing power falls. Your statement shows the account balance, not what that money will buy after prices change. The examples below convert future amounts into today's money, compare nominal and real returns, and show how an inflation assumption changes a long-term goal.</p>

<h2>What inflation does to a fixed sum</h2>
<p>Purchasing power is what a unit of money can buy, and inflation is the rate at which that shrinks. At an illustrative 3% annual inflation rate (above the Federal Reserve's stated <a href="https://www.federalreserve.gov/faqs/economy_14400.htm" rel="noopener">2% target</a>), prices rise by a factor of 1.03 each year, compounding just like interest does. Divide any future balance by that factor, once per year, and you get its value in today's money.</p>

<div class="table-scroll"><table>
<thead><tr><th>Horizon</th><th>Nominal balance</th><th>Worth in today's money (3% inflation)</th><th>Purchasing power lost</th></tr></thead>
<tbody>
<tr><td>10 years</td><td>$10,000</td><td>$7,441</td><td>25.6%</td></tr>
<tr><td>20 years</td><td>$10,000</td><td>$5,537</td><td>44.6%</td></tr>
<tr><td>30 years</td><td>$10,000</td><td>$4,120</td><td>58.8%</td></tr>
</tbody>
</table></div>

<p>Read the 30-year row again: cash held idle for three decades of 3% inflation loses almost 59% of what it can buy. Nothing dramatic happened in any single year. A 3% rate is mild, barely noticeable month to month. The damage is entirely in the compounding, which is the subject of our companion guide on <a href="/guides/how-compound-interest-works/">how compound interest works</a>. Inflation is that same exponential machine pointed at you instead of for you. It varies over time — positive in most years, occasionally unusually high, close to zero or even negative — but over multi-decade horizons the compounding of whatever rate prevails is what does the damage.</p>

<h2>The real-return formula</h2>
<p>The number that decides whether your savings are growing or shrinking is not the rate on the account. It is the rate after inflation, called the <strong>real return</strong>:</p>
<div class="formula-block"><span class="fx">real return = (1 + nominal) ÷ (1 + inflation) − 1</span></div>
<p>The quick approximation "nominal minus inflation" is close but slightly flatters the result. Precisely, a 4% savings rate during 3% inflation gives 1.04 ÷ 1.03 − 1 = <strong>0.97% real</strong>, not the 1.00% the subtraction suggests. The difference is small in one year; over decades the exact formula is worth the extra keystroke.</p>

<div class="example-block"><div class="ex-head">Example: $10,000 at 4% interest, 3% inflation, 10 years</div><div class="ex-body">
<p>Nominal balance after 10 years at 4% (annual compounding): 10,000 × (1.04)<sup>10</sup> = <strong>$14,802</strong>. Your statement shows 48% growth.</p>
<p>Deflate by ten years of 3% inflation: 14,802 ÷ (1.03)<sup>10</sup> = <strong>$11,014</strong> in today's money.</p>
<p>Your true gain in purchasing power is 10.1% over the decade, matching (1.0097)<sup>10</sup> − 1. The statement's 48% was mostly inflation handing your own losses back to you as bigger numbers.</p>
</div></div>

<h2>"My balance grew" can still mean "I got poorer"</h2>
<p>A positive nominal rate can still produce a negative real return: the balance rises while its purchasing power falls. Take an account paying 0.5% during 3% inflation. The real return is 1.005 ÷ 1.03 − 1 = <strong>−2.43% per year</strong>.</p>
<p>Over a decade, $10,000 in that example grows to $10,513 on paper. Deflated, it is worth <strong>$7,822</strong> in today's money. The account added $513 while purchasing power fell by roughly $2,178 overall. Run your own rate and horizon through the <a href="/savings-calculator/">savings calculator</a> and compare it with an inflation assumption relevant to your currency and goal.</p>

<div class="callout warn"><span class="c-title">The illusion is strongest when inflation is highest</span>
<p>A higher nominal deposit rate can still produce a negative real return. A 6% deposit rate during 8% inflation is a −1.85% real return, while 2% interest during 3% inflation is −0.97%. Comparing both the nominal rate and inflation assumption reveals the modeled purchasing-power change.</p>
</div>

<h2>Expressing a goal in today's money</h2>
<p>A long-horizon target can be shown both as a future nominal amount and as estimated purchasing power today. The adjustment can be large: a $1,000,000 balance 30 years from now is worth, in today's purchasing power:</p>
<ul>
<li><strong>$552,071</strong> if inflation averages 2%</li>
<li><strong>$411,987</strong> if inflation averages 3%</li>
<li><strong>$308,319</strong> if inflation averages 4%</li>
</ul>
<p>The same headline number spans nearly a factor of two in real value depending on the inflation assumption. If a model uses 2% but the realized average is 3%, the resulting purchasing power is about 25% below that projection. The <a href="/investment-calculator/">investment calculator</a> reports both nominal balance and an inflation-adjusted scenario so the assumption remains visible.</p>
<p>The calculation also applies to a specific future cost. Something priced at $10,000 today becomes about <strong>$18,061</strong> after 20 years under a constant 3% increase. A broad inflation index may not match a particular education, healthcare or housing cost, so the result is only as relevant as the rate chosen for that goal.</p>

<h2>Variables to compare</h2>
<p>The future inflation path is unknown, but the model can make each assumption visible and compare more than one case.</p>
<ul>
<li><strong>Deposit-rate scenario.</strong> The FDIC's <a href="https://www.fdic.gov/national-rates-and-rate-caps" rel="noopener">national deposit-rate data</a> listed the US national savings rate as 0.38% on August 17, 2026. That is a national data point, not a quote for a particular account. Compare it with the disclosed rate, fees, access terms and <a href="https://www.fdic.gov/resources/deposit-insurance/" rel="noopener">deposit-insurance status</a> of any account being modeled.</li>
<li><strong>Horizon and access.</strong> A short fixed horizon and a long flexible horizon expose money to different liquidity and loss constraints. The <a href="/guides/how-much-emergency-fund/">emergency-fund guide</a> shows how access time and principal volatility affect a cash-runway example.</li>
<li><strong>Volatility scenario.</strong> A constant positive return cannot represent market losses or their timing. For any investment case, include a lower-return or loss scenario and keep it separate from the deposit-rate case; this guide does not select an asset allocation.</li>
<li><strong>Inflation-linked instruments.</strong> The US Treasury explains how <a href="https://www.treasurydirect.gov/marketable-securities/tips/" rel="noopener">Treasury Inflation-Protected Securities (TIPS)</a> adjust principal using the Consumer Price Index. Market value, yield, tax and access characteristics still differ from a savings account, and other countries have different instruments.</li>
<li><strong>Review date.</strong> Inflation and account rates change. Updating both inputs at the same time prevents a current nominal rate from being compared with an obsolete inflation assumption.</li>
</ul>

<div class="callout note"><span class="c-title">A useful rule of thumb</span>
<p>Dividing 72 by an annual inflation rate gives a rough doubling-time estimate. At 3%, the shortcut gives 24 years; the exact price factor after 24 years is about 2.03×. It is an approximation for understanding compounding, not a forecast of future inflation.</p>
</div>

<p>Keep both versions of a long-term target: the amount that may appear on a future statement and its estimated value in today's money. Revisit the inflation assumption as the goal gets closer, especially when its main cost—such as housing, education or healthcare—has moved differently from a broad consumer-price index.</p>
`,
};
