export default {
  slug: "savings-calculator",
  category: "savings",
  title: "Savings Calculator",
  h1: "Savings Calculator",
  metaTitle: "Savings Calculator — Balance, Interest & Goal Date",
  metaDescription:
    "Project a savings account balance from your deposits and APY, see interest earned year by year, and find out exactly when you'll reach your savings goal.",
  tagline:
    "Project a savings balance from regular deposits and APY, with an optional goal and estimated target date.",
  cardDescription: "Savings account growth from deposits and APY, with an optional goal date.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: false,
  featured: true,
  jumpExplainLabel: "APY, rates and how banks pay you",
  aliases: ["savings account", "savings goal", "bank interest"],
  keywords: ["savings calculator", "savings account interest", "apy", "high-yield savings", "savings goal"],
  related: ["compound-interest-calculator", "monthly-investment-calculator", "simple-interest-calculator", "investment-calculator", "budget-calculator", "future-value-calculator"],
  sections: {
    howToHtml: `
      <p>Fill in what your savings look like today and what you add each month:</p>
      <ul>
        <li><strong>Current balance</strong>: what's in the account now (zero is fine if you're starting fresh).</li>
        <li><strong>Annual interest rate</strong>: if you're copying the bank's advertised <strong>APY</strong>, set compounding to <em>Yearly</em>, because APY already includes the compounding effect. If you have the nominal rate, pick the frequency the account uses.</li>
        <li><strong>Savings goal</strong>: optional. Set a target and the results show how long it takes to get there and mark the crossing year in the table.</li>
      </ul>
      <p>The chart separates what you deposited from what the bank paid you, and the year table exports to CSV. Save a scenario, change the deposit or rate, and save another to compare accounts side by side.</p>`,
    explanationHtml: `
      <h2>What a savings account actually pays you</h2>
      <p>A savings balance grows from two streams: the deposits you make and the interest credited on whatever is sitting in the account. With the defaults here (<strong>$5,000</strong> already saved, <strong>$400</strong> added monthly at <strong>4.2%</strong> compounded monthly) the balance reaches <strong>$67,129.48</strong> after ten years. You supplied $53,000 of that; the bank paid <strong>$14,129.48</strong>. Interest is real money, but notice the proportions: for savers making regular deposits over a decade, roughly three-quarters of the result is still their own money. The deposit amount is the lever that matters most.</p>
      <p><strong>APY versus the nominal rate.</strong> Banks advertise APY (annual percentage yield) precisely because it already folds in compounding; it is the true one-year growth figure. A nominal 4.2% compounded monthly works out to an APY of about <strong>4.282%</strong>. If you type an advertised APY into this calculator and also select monthly compounding, you double-count that effect and overstate the result. The fix is simple: APY in, compounding set to <em>Yearly</em>.</p>
      <p><strong>The account you choose matters more than it looks.</strong> Run the defaults at a low 0.5% rate instead of 4.2%: the ten-year balance drops from $67,129.48 to <strong>$54,466.04</strong>. Same deposits, same decade: $12,663 less, because the high-yield account earned $14,129.48 of interest against $1,466.04, nearly ten times as much. For cash you plan to keep in savings, the rate you accept is one of the few inputs you can change without changing your habits, though compare access terms, fees, introductory-rate periods and deposit protection before switching.</p>
      <p>One caveat that cuts the other way: savings rates float. Your bank can reprice the account whenever central-bank rates move, so a ten-year projection at today's rate is a scenario, not a promise. If the default account paid 4.2% for five years and then dropped to 3%, the final balance would be about <strong>$63,984</strong> — roughly $3,146 shy of the constant-rate projection. Re-run the numbers when your rate changes.</p>`,
    formulaHtml: `
      <p>Each compounding period, the balance earns the periodic rate; monthly deposits are added at month-end. For monthly compounding the closed form is:</p>
      <div class="formula-block"><span class="fx">FV = B × (1 + r ⁄ 12)<sup>12t</sup> + D × [(1 + r ⁄ 12)<sup>12t</sup> − 1] ⁄ (r ⁄ 12)</span>
        <ul class="formula-vars">
          <li><code>B</code> current balance</li>
          <li><code>D</code> monthly deposit (end of month)</li>
          <li><code>r</code> annual nominal rate as a decimal</li>
          <li><code>t</code> years</li>
        </ul>
      </div>
      <p>For daily or yearly compounding the calculator converts the rate to an equivalent monthly figure, i = (1 + r⁄m)<sup>m⁄12</sup> − 1, then simulates month by month, which is also how the goal date is found: the goal is reached in the first month the running balance meets the target. The effective annual yield shown in the results is (1 + r⁄m)<sup>m</sup> − 1.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: reaching $50,000 with $400 a month</div><div class="ex-body">
        <p>Take the default account ($5,000 saved, $400 deposited monthly at 4.2%) and set a <strong>$50,000</strong> goal.</p>
        <p>The simulation crosses $50,000 in month <strong>92</strong>: the goal arrives in <strong>7 years 8 months</strong>, comfortably inside the 10-year window, and the table highlights year 8 as the crossing year.</p>
        <p>Deposits do most of the pulling: by month 92 you've put in $5,000 + 92 × $400 = $41,800, and interest contributes the remaining ~$8,200. That's why nudging the deposit to $450 moves the goal date months closer, while chasing an extra 0.1% of APY barely moves it.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Deposit size.</strong> Over one year at 4.2%, the default account earns just $307.58 of interest — early on, nearly all progress is deposits. Consistency beats rate-shopping in the first years.</li>
        <li><strong>The rate, over long horizons.</strong> The 4.2%-vs-0.5% comparison above is a $12,663 difference in a decade. Small rate gaps compound into real money once balances are large.</li>
        <li><strong>Rate changes.</strong> Savings rates tend to move with central-bank policy rates, though banks reprice on their own schedules. Treat long projections as scenarios and refresh them when your bank reprices.</li>
        <li><strong>Compounding frequency, barely.</strong> Daily instead of monthly compounding on the defaults adds $27.80 over ten years. Never pick an account for its compounding frequency; pick it for its APY.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The rate is held <strong>constant for the whole projection</strong>. Real savings rates float with the market, so distant years are indicative only.</li>
        <li>Interest is shown <strong>gross</strong>. Outside tax-sheltered wrappers, savings interest is usually taxable income, which lowers your effective yield.</li>
        <li>Inflation isn't deducted, so a decade of rising prices means the final balance buys less than the same figure today.</li>
        <li>The goal date assumes monthly crediting of interest; accounts that credit quarterly may land a few weeks later.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Should I enter the APY or the nominal rate?",
      aHtml: `<p>Either works if you match the compounding setting. Advertised APY already includes compounding, so enter it with compounding set to <em>Yearly</em>. If your paperwork quotes a nominal rate ("4.2% compounded daily"), enter that rate and pick the matching frequency. Mixing them (an APY with daily compounding selected) slightly overstates growth.</p>`,
    },
    {
      q: "Is a savings account better than investing?",
      aHtml: `<p>They solve different problems. A savings account offers a stated rate and easier access to cash, while an investment can fluctuate and may lose value when the money is needed. Compare the goal's deadline, your tolerance for a short-term loss, access requirements, fees, tax treatment and deposit-protection rules. This calculator models the savings-account path only.</p>`,
    },
    {
      q: "How big should my emergency fund be before I save for other goals?",
      aHtml: `<p>Three to six months of essential expenses is a common starting range, not a universal target. Income stability, insurance, dependants and access to other cash can move it up or down. The <a href="/guides/how-much-emergency-fund/">emergency-fund guide</a> works through those inputs; this calculator can then estimate the funding date.</p>`,
    },
    {
      q: "Is my money safe in a savings account?",
      aHtml: `<p>Protection depends on the institution, account type, ownership category and country. In the US, FDIC insurance covers deposits to at least $250,000 per depositor, per insured bank, per ownership category (<a href="https://www.fdic.gov/deposit-insurance" rel="noopener">fdic.gov</a>); in India, bank deposits are insured by the DICGC (<a href="https://www.dicgc.org.in/" rel="noopener">dicgc.org.in</a>). Check the current limit and eligibility directly with the applicable authority; a familiar brand or savings label alone does not establish coverage.</p>`,
    },
    {
      q: "Why does the goal date barely move when I raise the rate?",
      aHtml: `<p>Because early on, your balance is small, and interest is a percentage of that small balance — the default account earns only $307.58 of interest in its first year. Deposits dominate the first years of any savings plan, so a bigger monthly deposit shortens the path to a goal far more than a slightly better rate. Rate matters most late, when the balance is large.</p>`,
    },
  ],
};
