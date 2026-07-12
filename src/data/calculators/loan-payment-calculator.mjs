export default {
  slug: "loan-payment-calculator",
  category: "loans",
  title: "Loan Payment Calculator",
  h1: "Loan Payment Calculator",
  metaTitle: "Loan Payment Calculator — Monthly, Biweekly & Weekly",
  metaDescription:
    "Find your loan payment at monthly, biweekly or weekly frequency, and compare the total interest all three schedules cost on the same loan.",
  tagline:
    "Pick a payment frequency — monthly, biweekly or weekly — and see the payment per period, the number of payments, and how the schedules compare on total interest.",
  cardDescription: "Payment per period at monthly, biweekly or weekly frequency, with an interest comparison.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["biweekly payment", "weekly payment", "payment frequency", "installment"],
  keywords: ["loan payment", "biweekly", "weekly", "payment schedule", "frequency"],
  related: ["loan-calculator", "loan-interest-calculator", "extra-payment-calculator", "loan-payoff-calculator", "loan-amortization-calculator"],
  jumpExplainLabel: "Does frequency matter?",
  sections: {
    howToHtml: `
      <p>Set the amount, rate and term in years, then choose how often you want to pay. The calculator prices the loan at that frequency and, in the chart and table, prices it at the other two frequencies as well so you can see the difference side by side.</p>
      <ul>
        <li><strong>Monthly</strong> — 12 payments a year, the default for almost every consumer loan.</li>
        <li><strong>Biweekly</strong> — 26 payments a year, one every two weeks. Popular where salaries are paid fortnightly.</li>
        <li><strong>Weekly</strong> — 52 payments a year, common for small business and some auto lenders.</li>
      </ul>
      <p>The "equivalent monthly cost" metric converts any frequency back to a per-calendar-month figure, which makes budgeting comparisons honest — a $228.18 biweekly payment looks small but still costs about $494 per calendar month.</p>`,
    explanationHtml: `
      <h2>What changing the payment frequency really does</h2>
      <p>Splitting a loan into smaller, more frequent payments changes its cost through one mechanism only: <strong>principal starts falling sooner within each month</strong>. When you pay weekly, the balance drops a little every seven days instead of sitting untouched for thirty, so slightly less interest accrues between payments. The effect is real but modest. On this calculator's default loan — $25,000 at 7% over five years — the totals are: monthly, 60 payments of $495.03 with <strong>$4,701.80</strong> interest; biweekly, 130 payments of $228.18 with <strong>$4,662.99</strong>; weekly, 260 payments of $114.02 with <strong>$4,646.34</strong>. Going from monthly to weekly saves $55.46 over five years — about 92 cents a month.</p>
      <p>So why do "biweekly programs" have a reputation for slashing loan costs? Because the well-known trick is not a frequency change at all — it is an <strong>extra payment in disguise</strong>. "True biweekly" means paying <em>half your monthly payment</em> every two weeks. Since the year has 26 fortnights, you make the equivalent of 13 monthly payments a year instead of 12. On the default loan, half-payments of $247.51 every two weeks would clear it in about 4½ years and cut interest to roughly $4,216 — a saving of $486, nine times what the pure frequency effect delivers. This calculator prices each frequency at its exact required payment, so the comparison isolates frequency alone; use the extra payment calculator to model the 13-payments-a-year strategy.</p>
      <p>The best practical reason to match payment frequency to your payroll is <strong>cash-flow smoothing</strong>, not interest savings. If you are paid every two weeks, a biweekly debit lands right after each paycheck and never collides with a month where three other bills cluster. Missed-payment fees and the credit-score damage they cause cost far more than the few dollars frequency arithmetic can save or lose.</p>`,
    formulaHtml: `
      <p>The payment per period generalizes the monthly formula to any frequency <code>f</code>:</p>
      <div class="formula-block"><span class="fx">A = P × (i/f) × (1 + i/f)<sup>n</sup> ÷ [(1 + i/f)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>A</code> payment per period</li>
          <li><code>P</code> loan amount; <code>i</code> annual nominal rate</li>
          <li><code>f</code> payments per year (12, 26 or 52)</li>
          <li><code>n</code> = years × f, total number of payments</li>
        </ul>
      </div>
      <p>The periodic rate is the <strong>nominal annual rate divided by the number of payments per year</strong> — the same convention lenders use when they quote "7% compounded to match the payment schedule". Note this makes the effective annual rate differ slightly across frequencies (7% ÷ 52 compounds to a touch more than 7% ÷ 12), which is why the interest differences shown here are small rather than zero. At 0% the payment is simply <code>P ÷ n</code>.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $25,000 at 7% over 5 years, three ways</div><div class="ex-body">
        <p><strong>Monthly:</strong> periodic rate 0.07 ÷ 12 = 0.0058333, n = 60; (1.0058333)<sup>60</sup> = 1.41763, so A = $495.03. Total paid $29,701.80, interest <strong>$4,701.80</strong>.</p>
        <p><strong>Biweekly:</strong> rate 0.07 ÷ 26 = 0.0026923, n = 130; A = $228.18. Total paid $29,662.99, interest <strong>$4,662.99</strong> — $38.81 less than monthly.</p>
        <p><strong>Weekly:</strong> rate 0.07 ÷ 52, n = 260; A = $114.02. Total paid $29,646.34, interest <strong>$4,646.34</strong> — $55.46 less than monthly.</p>
        <p>All three cost about $494–495 per calendar month. Frequency fine-tunes the interest; it does not transform the loan.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Payroll alignment.</strong> Matching debits to paydays is the strongest argument for non-monthly schedules — it prevents the timing crunches that cause missed payments.</li>
        <li><strong>Rate and term.</strong> These dominate cost at every frequency. A 1-point rate change on the default loan moves interest by roughly $700; switching monthly→weekly moves it by $55.</li>
        <li><strong>"True biweekly" vs priced biweekly.</strong> Paying half the monthly amount 26 times a year is a ~8% overpayment, not a frequency effect — it shortens the loan by months, not days.</li>
        <li><strong>Lender handling.</strong> Some servicers hold partial payments until a full installment accumulates, which erases the frequency benefit entirely. Confirm payments post to principal immediately.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Uses the <strong>nominal-rate ÷ frequency</strong> convention throughout. A lender that fixes the effective annual rate instead would show near-identical interest at all frequencies.</li>
        <li>"Biweekly" here means every two weeks (26/yr). <strong>Semi-monthly</strong> (24/yr, e.g. the 1st and 15th) is a different schedule this tool does not model.</li>
        <li>Terms are whole years; frequencies other than 12, 26 and 52 (daily, quarterly) are not offered.</li>
        <li>No fees, insurance or payment-processing charges are included — some lenders charge per-transaction fees that can exceed the interest saved by frequent payment.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why does paying weekly save so little?",
      aHtml: `<p>Because the required payment is recalculated for the frequency — you are not paying anything extra, just delivering the same annual amount in smaller slices. The only saving comes from principal reducing a few days earlier within each month, worth $55.46 over the whole life of the default loan. Meaningful savings need overpayment: pay more than the required amount at any frequency and the term itself shrinks.</p>`,
    },
    {
      q: "What is the difference between biweekly and twice-a-month payments?",
      aHtml: `<p>Biweekly means every 14 days — 26 payments per year. Semi-monthly means twice per calendar month — 24 payments per year. The two-payment difference is exactly why "true biweekly" plans (half the monthly payment every two weeks) sneak in one extra monthly payment per year. If your lender offers "twice a month", you get the cash-flow smoothing but not the extra-payment effect.</p>`,
    },
    {
      q: "Is a biweekly mortgage program worth signing up for?",
      aHtml: `<p>The arithmetic behind it — 26 half-payments equal 13 full payments a year — genuinely shortens a loan. But you rarely need a paid program to get it: most servicers let you add one-twelfth of your payment as a monthly extra, which has the same effect with no enrollment fee. Watch for programs that charge setup or per-debit fees, and for servicers that hold half-payments in suspense instead of applying them.</p>`,
    },
    {
      q: "Which frequency should I choose if I'm paid fortnightly?",
      aHtml: `<p>Biweekly, in most cases — a fixed debit two or three days after each paycheck makes the loan effectively self-paying and removes the mid-month scramble. The interest difference against monthly is trivially small (under $40 on the default loan), so decide on cash-flow convenience, then use any surplus as a deliberate extra payment, which is where real savings live.</p>`,
    },
  ],
};
