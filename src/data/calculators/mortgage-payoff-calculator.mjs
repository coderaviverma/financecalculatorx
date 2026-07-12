export default {
  slug: "mortgage-payoff-calculator",
  category: "mortgage",
  title: "Mortgage Payoff Calculator",
  h1: "Mortgage Payoff Calculator",
  metaTitle: "Mortgage Payoff Calculator — Pay Off Your Home Loan Early",
  metaDescription:
    "See how much interest an extra monthly payment or lump sum saves on your existing mortgage, and how many months it cuts from your payoff date.",
  tagline:
    "For a mortgage you already have: put an extra monthly amount or a one-time lump sum against the balance and see the interest saved, the months cut, and your new payoff date.",
  cardDescription: "Interest saved and time cut by extra payments or a lump sum on an existing mortgage.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["early mortgage payoff", "prepay mortgage", "extra mortgage payment"],
  keywords: ["mortgage payoff", "extra payment", "lump sum", "prepayment", "interest saved"],
  related: ["mortgage-amortization-calculator", "extra-payment-calculator", "early-loan-payoff-calculator", "refinance-calculator", "mortgage-calculator"],
  sections: {
    howToHtml: `
      <p>Pull three numbers from your latest mortgage statement: the current balance, the interest rate, and how long is left. Then describe the acceleration you're considering:</p>
      <ul>
        <li>An <strong>extra monthly payment</strong> is a recurring amount on top of the required payment, applied straight to principal.</li>
        <li>A <strong>one-time lump sum</strong> is a bonus or windfall, with a field for when you'd pay it (savings are larger the sooner it lands).</li>
        <li>You can combine both; the schedule recomputes with each keystroke.</li>
      </ul>
      <p>The headline is the interest you'd save; the chart shows both balance curves so you can see the gap open up. Note that most US mortgages have no prepayment penalty, but confirm yours before committing, and make sure the servicer applies extras to <em>principal</em>, not to next month's payment.</p>`,
    explanationHtml: `
      <h2>The mathematics of a mid-life mortgage</h2>
      <p>Prepaying a mortgage is one of the few financial moves with a guaranteed outcome: every dollar of principal you remove stops accruing interest at your note rate, immediately and for the rest of the loan. On the default inputs, a <strong>$240,000 balance at 6% with 22 years left</strong>, the required payment is $1,639.38 and the remaining schedule holds <strong>$192,796</strong> of future interest. Adding <strong>$200/month</strong> cuts that to $149,701: a saving of <strong>$43,095</strong>, with the loan gone <strong>4 years 4 months</strong> early.</p>
      <p>What most people miss is how strongly the payoff math depends on <em>time remaining</em>, not just rate and balance. The same $240,000 at the same 6% with only <strong>8 years left</strong> saves just <strong>$4,985</strong> from the identical $200/month — barely a ninth of the saving, because each prepaid dollar has far fewer interest-bearing months ahead of it. Early and mid-loan, prepayment is powerful; late in the loan it's mostly just forced saving.</p>
      <p>The honest comparison for any prepayment is opportunity cost. Paying down a 6% mortgage is economically equivalent to earning a guaranteed, risk-free 6% on that money, a return you cannot get from any savings account, though a diversified portfolio may beat it on average with risk attached. If you itemize deductions in the US, the effective mortgage rate is somewhat lower than the note rate, which softens (but rarely reverses) the case for prepaying.</p>
      <p>Three tools exist for killing a mortgage faster: <strong>prepay</strong> (what this calculator models: flexible, stop any time), <strong>recast</strong> (a lump sum plus a servicer re-amortization that lowers the required payment), and <strong>refinance</strong> (a new loan entirely; see the <a href="/refinance-calculator/">refinance calculator</a> when the issue is your rate rather than your balance).</p>`,
    formulaHtml: `
      <p>Both plans run the same declining-balance schedule; only the payment differs:</p>
      <div class="formula-block"><span class="fx">B<sub>k</sub> = B<sub>k−1</sub> × (1 + r) − (M + E<sub>k</sub>)</span>
        <ul class="formula-vars">
          <li><code>B<sub>k</sub></code> balance after month k (B₀ = current balance)</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>M</code> required payment for the remaining term</li>
          <li><code>E<sub>k</sub></code> your extra that month (recurring, lump sum, or both)</li>
        </ul>
      </div>
      <p>Interest saved = (interest under the current plan) − (interest under the accelerated plan), where each plan's interest is the sum of B<sub>k−1</sub> × r over its own schedule. Months saved is the difference in schedule lengths. The lump sum enters at the month you choose; the final payment of each plan is trimmed so the balance ends at exactly zero.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $240,000 at 6%, 22 years left, +$200/month</div><div class="ex-body">
        <p>Required payment on the remaining term: <strong>$1,639.38</strong>. Staying the course, the remaining 264 payments carry <strong>$192,796</strong> of interest.</p>
        <p>Paying $1,839.38 instead clears the loan in <strong>212 months</strong> (17 yr 8 mo), 52 months early, with total interest of <strong>$149,701</strong>. Interest saved: <strong>$43,095</strong>.</p>
        <p>Alternative: a single <strong>$10,000</strong> lump sum next month (no recurring extra) saves <strong>$25,257</strong> and 21 months. The lump sum wins per dollar committed because all of it starts working immediately.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Years remaining.</strong> The dominant factor: $200/month saves $43,095 with 22 years left, but only $4,985 with 8 years left on the same balance and rate. Prepay early if you're going to prepay at all.</li>
        <li><strong>Rate.</strong> Your note rate is the known interest saving on every prepaid dollar — certain in a way market returns are not. At 6–7% prepaying competes well with bonds; at 3% it competes poorly with most alternatives, including high-yield savings.</li>
        <li><strong>Lump timing.</strong> Moving a lump sum earlier adds interest-bearing months. The month field lets you compare paying now versus after your next bonus.</li>
        <li><strong>Liquidity.</strong> Money in the house is hard to get back out without borrowing. Keep the emergency fund funded first — a prepaid mortgage doesn't pay medical bills.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Assumes extras are applied to principal immediately and the required payment stays fixed. A servicer recast, which lowers the required payment after a lump sum, is a different transaction.</li>
        <li>No prepayment penalties are modeled; most US home loans no longer have them, but check your note.</li>
        <li>The tax deduction for mortgage interest (where itemized) slightly reduces the effective saving from prepaying; this is not modeled.</li>
        <li>Interest saved is not discounted to present value: a dollar of interest avoided in 2044 is treated the same as one avoided next year.</li>
        <li>If the rate is your real problem, compare against the <a href="/refinance-calculator/">refinance calculator</a>; prepaying an expensive loan is sometimes second-best.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Is paying extra on the mortgage better than investing the money?",
      aHtml: `<p>Prepaying earns your note rate (here 6%), guaranteed and tax-free in effect. Investing might earn more on average but with risk and, outside sheltered accounts, taxes. A common middle path: prepay when your rate is above what safe assets yield, invest when it's below. The calculator gives the guaranteed side of that comparison precisely.</p>`,
    },
    {
      q: "Should I prepay, recast, or refinance?",
      aHtml: `<p>Prepay when you want flexibility and your rate is acceptable. Recast when you have a lump sum and want a lower required payment without new-loan costs; the term stays put, but cash flow eases. Refinance when today's rates are meaningfully below yours; the fee/break-even math lives in the <a href="/refinance-calculator/">refinance calculator</a>. Many owners combine them: refinance the rate, then prepay the new loan.</p>`,
    },
    {
      q: "Why does the same extra payment save so little on an older loan?",
      aHtml: `<p>Because savings come from removing future interest-bearing months, and an older loan has few left. With 22 years remaining, a prepaid dollar avoids interest for up to 264 months; with 8 years left, at most 96. That's why the identical $200/month saves $43,095 in the first case and $4,985 in the second.</p>`,
    },
    {
      q: "Does one extra payment a year really shorten a mortgage by years?",
      aHtml: `<p>Usually, yes. An annual extra equal to one payment is roughly a $137/month equivalent on the default loan, and recurring extras of that size cut multiple years from a long schedule. Enter your own figure in the extra-monthly field (annual amount ÷ 12) to see the exact months saved rather than relying on the rule of thumb.</p>`,
    },
    {
      q: "Will my servicer automatically apply extras to principal?",
      aHtml: `<p>Not always. Some apply surplus to next month's payment or to escrow unless told otherwise, which earns you nothing. Mark extra amounts explicitly as "principal only" (most online portals have the option), and check the next statement to confirm the balance dropped by the full extra amount.</p>`,
    },
  ],
};
