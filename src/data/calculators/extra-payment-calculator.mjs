export default {
  slug: "extra-payment-calculator",
  category: "loans",
  title: "Extra Payment Calculator",
  h1: "Extra Payment Calculator",
  metaTitle: "Extra Payment Calculator — Interest Saved by Paying More",
  metaDescription:
    "Test extra monthly, yearly or one-time loan payments and see the interest saved, the new payoff date, and how many months you cut from the schedule.",
  tagline:
    "Test monthly, yearly or one-time extra payments on a fixed-rate loan and compare the revised interest and payoff date.",
  cardDescription: "Interest saved and months cut by monthly, yearly or one-time prepayments.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["prepayment", "pay extra on loan", "lump sum payment"],
  keywords: ["extra payment", "prepayment", "interest saved", "principal only", "lump sum"],
  related: ["loan-payoff-calculator", "early-loan-payoff-calculator", "mortgage-payoff-calculator", "loan-amortization-calculator", "loan-calculator"],
  jumpExplainLabel: "How prepayment works",
  sections: {
    howToHtml: `
      <p>Set up the loan as it was written (amount, rate and term), then experiment with three kinds of extra payment, alone or combined:</p>
      <ul>
        <li><strong>Extra per month</strong> adds a fixed top-up to every payment. The steadiest and, dollar for dollar, most effective pattern.</li>
        <li><strong>Extra per year</strong> models a once-a-year amount such as a bonus or tax refund, applied every twelfth month.</li>
        <li><strong>One-time payment</strong> covers a single lump sum; a month field appears so you can place it anywhere in the schedule and test timing.</li>
      </ul>
      <p>The headline figure is the interest you avoid versus making no extra payments, alongside the new payoff date and the months removed. The chart overlays both balance curves so you can watch them separate.</p>`,
    explanationHtml: `
      <h2>What an extra payment actually buys</h2>
      <p>On the model used here, the scheduled payment covers the period's interest first and the remainder reduces principal. An extra amount then reduces principal immediately, so later interest is calculated on a smaller balance. A real lender may apply excess money to fees, accrued interest or a future instalment instead; confirm the posting rule before using the projected saving.</p>
      <p>Timing and rhythm matter more than most people expect. Consider the default loan here ($250,000 at 6.5% over 30 years, which costs $318,861 in interest if left alone) and two plans that commit the same $1,200 of cash per year. Paid as <strong>$100 every month</strong>, the loan ends 56 months early and saves <strong>$58,860</strong>. Paid as <strong>one $1,200 lump each year</strong>, it ends 54 months early and saves <strong>$56,592</strong>. Identical money, a $2,268 difference, purely because the monthly drip reaches the balance sooner on average, so each dollar spends more months not accruing interest.</p>
      <p>The same logic makes early lump sums far more powerful than late ones. A one-time $10,000 against this loan in month 12 saves <strong>$49,273</strong> of interest; the same $10,000 in month 180 saves only <strong>$15,380</strong>. Nothing about the loan changed; the later payment simply has fewer remaining months over which to suppress interest. If you're expecting a windfall and intend to prepay, the arithmetic argues for applying it when it arrives rather than holding it for a round-number occasion.</p>`,
    formulaHtml: `
      <p>With a required payment <code>A</code> and a recurring extra <code>E</code>, the balance evolves month by month as:</p>
      <div class="formula-block"><span class="fx">B<sub>m</sub> = B<sub>m−1</sub> × (1 + r) − (A + E)</span>
        <ul class="formula-vars">
          <li><code>B<sub>m</sub></code> balance after month m</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>A</code> required payment (unchanged by prepaying)</li>
          <li><code>E</code> extra amount that month (monthly, yearly and one-time extras all enter here)</li>
        </ul>
      </div>
      <p>The loan ends at the first month where <code>B<sub>m</sub></code> reaches zero, with the final payment trimmed to close it exactly. Interest saved is the baseline schedule's total interest minus the accelerated schedule's. There is no separate "savings formula", because the saving <em>is</em> the difference between the two simulations. A single prepaid dollar in month t avoids roughly <code>(1 + r)<sup>n−t</sup> − 1</code> dollars of future interest, which is why earlier dollars save more.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $100/month extra on $250,000 at 6.5% over 30 years</div><div class="ex-body">
        <p>The required payment is <strong>$1,580.17</strong>; left untouched, the loan costs <strong>$318,861.22</strong> in interest over 360 months.</p>
        <p>With $100 extra each month, the balance reaches zero in <strong>304 months</strong>: 25 years 4 months, or 4 years 8 months early.</p>
        <p>Total interest falls to <strong>$260,001.34</strong>, a saving of <strong>$58,859.88</strong>. Roughly $49 is avoided for every $100 prepaid, and the earlier dollars do most of that work.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>When the extra money arrives.</strong> The dominant factor. The same $10,000 saves $49,273 in month 12 of the default loan but $15,380 in month 180, a 3.2× difference on identical cash.</li>
        <li><strong>Frequency at equal cash.</strong> Monthly drips edge out annual lumps ($58,860 vs $56,592 on $1,200/year here) because money reaches principal sooner on average.</li>
        <li><strong>The loan's rate.</strong> A higher rate increases the interest avoided by reducing principal. Compare that modeled saving with the after-tax return and liquidity of any alternative use for the money.</li>
        <li><strong>How your lender applies extras.</strong> Savings assume the extra posts to principal immediately. If it's held as a credit toward next month's installment, the effect largely evaporates; see the FAQ.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Extras are assumed to post to principal on the same day as the regular payment; a lender that holds funds or applies them at cycle end will produce slightly smaller savings.</li>
        <li>The required payment is held constant. Some lenders offer to recast (re-amortize) after a large lump sum, which lowers the payment instead of shortening the term: different goal, different math.</li>
        <li>Prepayment penalties are not modeled; a few loan types charge them, so check your agreement.</li>
        <li>The rate is assumed fixed for the whole comparison, and both schedules assume no missed payments.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Do lenders automatically put extra money toward principal?",
      aHtml: `<p>Not always, and this is the biggest practical gotcha. Some servicers treat an overpayment as an early payment of next month's installment — which mostly prepays interest you'd owe anyway and saves you almost nothing. When you send extra, mark it "apply to principal" (most online portals have this option), and check the next statement to confirm the balance dropped by the full extra amount.</p>`,
    },
    {
      q: "Is $100 a month the same as $1,200 once a year?",
      aHtml: `<p>Close, but not equal. On the default $250,000 loan at 6.5%, $100/month saves $58,860 of interest while a $1,200 annual lump saves $56,592 — about $2,268 less for the same total cash. The monthly pattern wins because, on average, each dollar reaches the principal months earlier and therefore spends longer suppressing interest.</p>`,
    },
    {
      q: "Should I prepay the loan or invest the money instead?",
      aHtml: `<p>Prepaying produces a known interest saving under the loan's current rate and posting rules, while an investment return is uncertain. Taxes, deductions and fees can change the comparison. Also consider liquidity: money used to reduce principal generally cannot be withdrawn without new borrowing.</p>`,
    },
    {
      q: "Will paying extra reduce my required monthly payment?",
      aHtml: `<p>No — with standard amortizing loans the contractual payment stays the same and the term shortens instead. The exception is a formal recast: after a large principal payment, some lenders will re-amortize the remaining balance over the remaining term for a fee, lowering the payment. If your goal is a smaller obligation rather than a faster payoff, ask about recasting.</p>`,
    },
    {
      q: "I expect a windfall — should I hold it until January or apply it now?",
      aHtml: `<p>Apply it when it arrives. Savings depend on how many months the prepaid principal spends off the balance, so every month of delay costs you one month of avoided interest on that amount. The one-time field with its month selector lets you price the delay exactly for your own loan.</p>`,
    },
  ],
};
