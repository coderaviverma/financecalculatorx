export default {
  slug: "how-much-emergency-fund",
  title: "How Much Emergency Fund Do You Need?",
  metaTitle: "Emergency Fund Scenarios Based on Essential Expenses",
  metaDescription:
    "Model emergency-fund targets from essential expenses. Includes several coverage scenarios and a worked funding timeline at $400 per month.",
  description:
    "How essential expenses and a chosen number of months create an emergency-fund target, with a worked timeline and account characteristics to compare.",
  cardDescription: "Essential-expense targets, alternative months of cover, and a computed funding timeline.",
  lastReviewed: "2026-08-30",
  published: "2026-07-12",
  categories: ["savings", "personal"],
  aliases: [],
  keywords: ["emergency fund", "how much emergency fund", "3 to 6 months expenses", "emergency savings", "where to keep emergency fund"],
  relatedCalculators: ["savings-calculator", "monthly-investment-calculator", "budget-calculator"],
  bodyHtml: `
<p>An emergency fund is cash set aside for an unplanned expense or a break in income. This guide treats the target as a user-chosen scenario: essential monthly spending multiplied by selected months of coverage. Income stability, contractual benefits, accessible support and one-off risks can be entered or compared without implying a universal target. The example below works through the arithmetic and funding time. The <a href="https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" rel="noopener">CFPB's emergency-fund guide</a> uses the same basic definition.</p>

<h2>What the fund is really for</h2>
<p>Emergency scenarios can affect household cash flow in two broad ways:</p>
<ul>
<li><strong>Income shocks</strong>: job loss, a contract ending, illness that stops work, a business's bad quarter. These are measured in <em>months of expenses</em>, and they're the reason the target is expressed that way.</li>
<li><strong>Expense shocks</strong>: the transmission, the roof, the emergency room, the flight home. These are one-off amounts whose size depends on the event, location, insurance and household, and they can occur while income continues.</li>
</ul>
<p>The distinction separates modeled emergencies from planned irregular costs such as annual insurance, holidays or known maintenance. Those predictable items can be represented as separate savings targets so the emergency-fund balance is not assumed to cover both categories at once.</p>

<h2>Compare several months-of-cover scenarios</h2>
<p>Three and six months are commonly discussed heuristics, not evidence that a particular household needs either amount. The table presents illustrative scenarios for testing how income concentration, variable earnings and contractual support change the target. It is not a recommendation table:</p>
<div class="table-scroll"><table>
<thead><tr><th>Example situation</th><th>Scenario to calculate</th><th>Modeling reason</th></tr></thead>
<tbody>
<tr><td>Two incomes and relatively low fixed costs</td><td>3 months</td><td>Illustrates a shorter income-interruption assumption</td></tr>
<tr><td>One household income</td><td>6 months</td><td>Illustrates a longer interruption of the sole income stream</td></tr>
<tr><td>Variable or seasonal income</td><td>6 and 12 months</td><td>Shows how a wider runway changes the cash target</td></tr>
<tr><td>Specialized role or known health-related costs</td><td>6+ months</td><td>Tests a longer recovery or replacement-income period</td></tr>
<tr><td>Documented severance, benefits or accessible family support</td><td>3 and 6 months</td><td>Shows the result both before and after counting other resources</td></tr>
</tbody>
</table></div>
<p>Country and contract details affect the scenario because unemployment benefits, healthcare costs, notice periods, severance and visa conditions differ. Enter those resources and costs explicitly rather than assuming a country-wide safety-net level. A useful model question is how many months of essential outflow remain after accessible benefits or contractual payments, not which universal multiple is “correct.”</p>

<h2>Compute your number from essential expenses, not income</h2>
<p>This method multiplies a chosen coverage period by essential monthly expenses: housing, utilities, groceries, insurance, transport, minimum debt payments and other obligations entered as unavoidable. It excludes expenses assumed to pause during the modeled interruption. An income-based target answers a different question and can be higher or lower depending on the gap between income and essential spending.</p>
<div class="example-block"><div class="ex-head">Worked example: essential expenses of $3,200/month</div><div class="ex-body">
<p>Rent $1,400 + groceries $450 + utilities and phone $280 + insurance $320 + transport $250 + minimum debt payments $400 + other essentials $100 = <strong>$3,200/month</strong>.</p>
<p><strong>3-month target: $9,600.</strong> <strong>6-month target: $19,200.</strong></p>
<p>If this hypothetical household instead multiplied take-home pay of $4,800 by the same three- and six-month periods, the results would be $14,400 and $28,800, each 50% above the expense-based target. Neither basis is universally required; they answer different modeling questions.</p>
</div></div>
<p>If the essential-expense figure is unknown, the <a href="/budget-calculator/">Budget Calculator</a> can total the categories entered. Review irregular obligations as well as one ordinary month before using that total.</p>

<h2>How long it takes to build</h2>
<p>Suppose this household can direct $400/month to the fund, held in a savings account earning 4% APY. Simulating month by month:</p>
<ul>
<li><strong>One-month buffer ($3,200):</strong> reached in <strong>8 months</strong>.</li>
<li><strong>3-month target ($9,600):</strong> reached in <strong>24 months</strong>.</li>
<li><strong>6-month target ($19,200):</strong> reached in <strong>45 months</strong>, versus 48 in a zero-interest account. By then, deposits total $18,000 and interest has contributed about $1,385.</li>
</ul>
<p>In this scenario, deposits contribute much more to the ending balance than interest. Raising the monthly contribution from $400 to $600 reaches the 3-month target in <strong>16 months</strong> and the 6-month target in <strong>31</strong>, compared with 24 and 45 months at $400. Changing the assumed rate produces a different but smaller timing effect for these inputs. A balance below the selected target still represents a measurable number of months of entered expenses. The <a href="/savings-calculator/">Savings Calculator</a> runs the same timeline for other inputs.</p>

<h2>Account characteristics the model does not capture</h2>
<p>An emergency balance is usually evaluated for <strong>access time</strong>, <strong>principal risk</strong>, <strong>fees or withdrawal restrictions</strong>, and any applicable deposit protection. In the US, the <a href="https://www.fdic.gov/resources/deposit-insurance/" rel="noopener">FDIC</a> explains coverage for eligible deposits at insured banks. Other countries have their own rules and limits. A savings account, notice account, deposit or market investment can differ on each dimension; this calculator models only a constant rate and immediate contributions, not access delays or loss of principal.</p>
<div class="callout warn"><span class="c-title">Volatility and withdrawal timing</span>
<p>A volatile asset introduces sequence risk if money is withdrawn after a decline. A $9,600 balance after an illustrative 20% drawdown is $7,680, equal to 2.4 months of a $3,200 expense assumption rather than 3 months. The example quantifies the trade-off; it does not predict that a decline and an emergency will coincide.</p></div>
<p>Inflation can also change the target. At an illustrative 3% annual inflation rate, $19,200 of expenses becomes about $20,980 in three years. Updating the expense inputs periodically keeps the scenario aligned with current costs. The mechanics are covered in <a href="/guides/how-inflation-affects-savings/">how inflation affects savings</a>.</p>

<h2>Modeling the fund alongside debt payments</h2>
<p>Debt repayment and cash reserves create different modeled outputs. In an illustrative comparison, an amount applied to debt at 22% changes loan interest, while an amount held at an assumed 4% changes the accessible balance and deposit interest. Two scenarios are the full monthly surplus directed to debt and part directed to a one-month cash target ($3,200 here, reached in 8 months at $400/month). The comparison can show payoff interest and cash runway, but it cannot determine tolerance for liquidity risk. Debt ordering is covered separately in <a href="/guides/debt-snowball-vs-debt-avalanche/">debt snowball vs debt avalanche</a>.</p>
<p>After a withdrawal, the same timeline calculation can be rerun from the new balance. How quickly to rebuild it depends on the entered debt rates, contractual benefits, available credit and expected expenses; this guide does not prescribe an order among them.</p>
`,
};
