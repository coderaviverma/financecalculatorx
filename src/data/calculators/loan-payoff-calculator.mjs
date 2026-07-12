export default {
  slug: "loan-payoff-calculator",
  category: "loans",
  title: "Loan Payoff Calculator",
  h1: "Loan Payoff Calculator",
  metaTitle: "Loan Payoff Calculator — When Will Your Loan Be Paid Off?",
  metaDescription:
    "See when your existing loan will be paid off at your current monthly payment — months left, payoff date, remaining interest, and the effect of paying extra.",
  tagline:
    "Find out exactly when a loan you're already repaying will be gone, what the remaining interest costs, and how the date moves if you pay a little more.",
  cardDescription: "Months left, payoff date and remaining interest on a loan you're already repaying.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["payoff date", "months left on loan", "remaining balance"],
  keywords: ["loan payoff", "payoff date", "remaining interest", "months left", "existing loan"],
  related: ["extra-payment-calculator", "early-loan-payoff-calculator", "loan-calculator", "loan-interest-calculator", "debt-payoff-calculator"],
  jumpExplainLabel: "Reading your loan position",
  sections: {
    howToHtml: `
      <p>This tool is for a loan you already have, so the inputs come off your most recent statement rather than a loan offer:</p>
      <ul>
        <li><strong>Current balance</strong> — the principal you owe today. Use the "principal balance" line, not the original loan amount and not a payoff quote (more on the difference below).</li>
        <li><strong>Interest rate</strong> — the annual rate on the account. For a fixed-rate loan it's the rate you signed at; statements usually print it near the interest charged.</li>
        <li><strong>Current monthly payment</strong> — only the part that services principal and interest. If your payment bundles escrow, insurance or service fees, subtract those first.</li>
        <li><strong>Extra monthly payment</strong> — optional. Enter any amount you could add to see a second payoff line on the chart and the interest it avoids.</li>
      </ul>
      <p>The result is the months remaining, the payoff date, and the interest left to pay — with a full remaining schedule you can export.</p>`,
    explanationHtml: `
      <h2>Reading your loan position off a statement</h2>
      <p>Three different numbers describe "what you owe", and mixing them up skews the result. The <strong>original loan amount</strong> is history — it no longer matters. The <strong>current principal balance</strong> is what interest is charged on, and it's the number this calculator needs. A <strong>payoff quote</strong> is the amount that would settle the loan on a specific day: the principal balance plus interest accrued since your last payment, sometimes plus a processing charge. A payoff quote is typically a little higher than the statement balance, and it expires — lenders quote it "good through" a date because interest keeps accruing daily.</p>
      <p>Given the balance, the rate and your payment, the time to zero isn't guesswork — it's solved directly. Each month your payment first covers the interest accrued on the balance, and the remainder reduces principal. Because the balance shrinks, next month's interest is smaller and the principal portion grows. The <em>nper</em> formula below inverts this process: instead of asking "what payment clears this balance in n months?", it asks "how many months does this payment need?". The answer is rarely a whole number — for the default inputs it's 47.2 months — which is why the schedule shows 47 full payments plus a smaller final one that clears whatever is left.</p>
      <p>The mathematics gets unforgiving near the minimum. On a $14,000 balance at 8.5%, interest accrues at $99.17 per month — that is the floor. Pay $350 and you're done in 48 months with $2,519.68 of interest. Pay $120 — just $20.83 above the floor — and the same loan takes <strong>249 months</strong> (almost 21 years) and $15,767.90 of interest. Pay $105 and it takes <strong>410 months</strong> and $28,997.17 of interest, more than double the balance itself. Close to the floor, almost your entire payment feeds interest and the balance barely moves; every dollar above the floor is what actually retires debt. That asymmetry is why small top-ups matter so much on slow-moving loans.</p>`,
    formulaHtml: `
      <p>The number of months to pay off a balance at a fixed payment is:</p>
      <div class="formula-block"><span class="fx">n = −ln(1 − r·B ÷ A) ÷ ln(1 + r)</span>
        <ul class="formula-vars">
          <li><code>n</code> months until the balance reaches zero</li>
          <li><code>B</code> current principal balance</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12 (8.5% → 0.085 ÷ 12 ≈ 0.007083)</li>
          <li><code>A</code> monthly payment (including any extra)</li>
        </ul>
      </div>
      <p>The formula only has a solution when <code>A &gt; B·r</code> — the payment must exceed the monthly interest, or the logarithm's argument goes negative and the balance never falls. Since <code>n</code> is usually fractional, the schedule runs ⌈n⌉ payments: all but the last at the full amount, and a final payment sized to close the balance exactly. At a 0% rate the answer is simply <code>B ÷ A</code>.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $14,000 left at 8.5%, paying $350/month</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.085 ÷ 12 = 0.007083, so r·B ÷ A = 0.007083 × 14,000 ÷ 350 = 0.2833.</p>
        <p>n = −ln(1 − 0.2833) ÷ ln(1.007083) = 0.3331 ÷ 0.007058 ≈ <strong>47.2 months</strong> — 47 full payments plus a smaller 48th, finishing about 4 years from now.</p>
        <p>Interest remaining comes to <strong>$2,519.68</strong>, for a total remaining cost of $16,519.68.</p>
        <p>Adding $50 a month shortens the payoff to <strong>41 months</strong> and trims interest to $2,146.17 — $373.51 saved for a modest change.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Distance from the interest floor.</strong> On the default inputs the floor is $99.17/month. Payoff time scales with how far above that floor you pay, not with the payment itself — $350 is 3.5× the floor and clears the loan in 4 years; $120 is 1.2× the floor and takes 21 years.</li>
        <li><strong>The rate on the remaining balance.</strong> A higher rate raises the floor and steals more of each payment. If your rate is variable, the payoff date shifts every time it resets.</li>
        <li><strong>Extra amounts, however small.</strong> Every extra dollar lands entirely on principal, permanently lowering the base that future interest is charged on.</li>
        <li><strong>Payment composition.</strong> If part of what you send covers escrow or fees, only the principal-and-interest portion drives the payoff math — enter that portion, not the gross amount.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The balance is treated as of today, with the first payment one month out. A payoff quote from your lender will differ slightly because it adds interest accrued day by day up to the settlement date.</li>
        <li>The rate is assumed fixed until payoff; variable-rate loans will drift from this schedule as their rate changes.</li>
        <li>Late fees, escrow, insurance add-ons and payoff processing charges are not modeled.</li>
        <li>Lenders that accrue interest daily rather than monthly will show totals a fraction of a percent different.</li>
        <li>This is a planning estimate — request an official payoff quote before sending a settlement payment.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why is my lender's payoff quote higher than my statement balance?",
      aHtml: `<p>The statement balance is principal as of the statement date. A payoff quote adds the interest that accrues daily between that date and the day the payoff would post, and sometimes a small processing fee. That's also why quotes carry a "good through" date — after it, more interest has accrued and the number changes.</p>`,
    },
    {
      q: "The formula says 47.2 months — why does the schedule show 48 payments?",
      aHtml: `<p>A loan can't end on a fraction of a payment. You make 47 payments at the full amount, and what's left after the 47th is smaller than a normal installment, so the 48th payment is reduced to exactly close the balance. The calculator sizes that final payment for you, which is why it differs from the rest.</p>`,
    },
    {
      q: "I pay every month but the balance barely moves. What's happening?",
      aHtml: `<p>Your payment is probably only slightly above the monthly interest. On $14,000 at 8.5%, interest is $99.17/month — a $105 payment leaves just $5.83 for principal, which is why that pace takes 410 months to finish. Check how much of your last payment went to principal on your statement; if it's a sliver, even a small permanent top-up changes the trajectory dramatically.</p>`,
    },
    {
      q: "Do I need to know my original loan term?",
      aHtml: `<p>No. The remaining balance, the rate and the payment fully determine the payoff date — the original term and start date drop out of the math entirely. That's convenient if you've refinanced, made irregular extra payments in the past, or simply don't have the original paperwork.</p>`,
    },
    {
      q: "Should I enter my full monthly payment if it includes insurance or escrow?",
      aHtml: `<p>No — enter only the portion that services principal and interest. Escrow, credit insurance and service fees don't reduce your balance, so including them makes the payoff look faster than it is. Your statement usually splits the payment into these parts; use the principal + interest line.</p>`,
    },
  ],
};
