export default {
  slug: "loan-payment-calculator",
  category: "loans",
  title: "Loan Payment Calculator",
  h1: "Loan Payment Calculator",
  metaTitle: "Loan Payment Calculator — Monthly, Biweekly & Weekly",
  metaDescription:
    "Find your loan payment at monthly, biweekly or weekly frequency, and compare the total interest all three schedules cost on the same loan.",
  tagline:
    "Compare monthly, biweekly and weekly schedules by payment amount, number of payments and total interest.",
  cardDescription: "Payment per period at monthly, biweekly or weekly frequency, with an interest comparison.",
  lastReviewed: "2026-08-30",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["biweekly payment", "weekly payment", "payment frequency", "installment"],
  keywords: ["loan payment", "biweekly", "weekly", "payment schedule", "frequency"],
  related: ["loan-calculator", "loan-interest-calculator", "extra-payment-calculator", "loan-payoff-calculator", "loan-amortization-calculator"],
  jumpExplainLabel: "Does frequency matter?",
  sections: {
    howToHtml: `
      <p>Use this page when the question is how paying monthly, biweekly or weekly changes a loan's payment and interest; for a single monthly payment with a full amortization schedule, use the <a href="/loan-calculator/">Loan Calculator</a> instead. Set the amount, rate and term in years, then choose how often you want to pay. The calculator prices the loan at that frequency and, in the chart and table, prices it at the other two frequencies as well so you can see the difference side by side.</p>
      <ul>
        <li><strong>Monthly</strong>: 12 modeled payments a year.</li>
        <li><strong>Biweekly</strong>: 26 modeled payments a year, one every two weeks.</li>
        <li><strong>Weekly</strong>: 52 modeled payments a year.</li>
      </ul>
      <p>The "equivalent monthly cost" metric converts any frequency back to a per-calendar-month figure, which keeps budgeting comparisons honest: a $228.18 biweekly payment looks small but still costs about $494 per calendar month.</p>`,
    explanationHtml: `
      <h2>What changing the payment frequency really does</h2>
      <p>Splitting a loan into smaller, more frequent payments changes its cost through one mechanism only: <strong>principal starts falling sooner within each month</strong>. When you pay weekly, the balance drops a little every seven days instead of sitting untouched for thirty, so slightly less interest accrues between payments. The effect is real but modest. On this calculator's default loan of $25,000 at 7% over five years, the totals are: monthly, 60 payments of $495.03 with <strong>$4,701.80</strong> interest; biweekly, 130 payments of $228.18 with <strong>$4,662.99</strong>; weekly, 260 payments of $114.02 with <strong>$4,646.34</strong>. Going from monthly to weekly saves $55.46 over five years, about 92 cents a month.</p>
      <p>So why do "biweekly programs" have a reputation for slashing loan costs? Because the well-known trick is not a frequency change at all; it is an <strong>extra payment in disguise</strong>. "True biweekly" means paying <em>half your monthly payment</em> every two weeks. Since the year has 26 fortnights, you make the equivalent of 13 monthly payments a year instead of 12. On the default loan, half-payments of $247.51 every two weeks would clear it in about 4½ years and cut interest to roughly $4,216 — a saving of $486, nine times what the pure frequency effect delivers. This calculator prices each frequency at its exact required payment, so the comparison isolates frequency alone; use the extra payment calculator to model the 13-payments-a-year strategy.</p>
      <p>Payment frequency can also be viewed as a cash-flow timing choice. A biweekly or weekly schedule creates smaller, more frequent required amounts, while monthly creates one larger amount. The calculator does not model payroll dates, late payments, fees or credit-reporting consequences.</p>`,
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
      <p>The model uses the <strong>nominal annual rate divided by the number of payments per year</strong>. Note this makes the effective annual rate differ slightly across frequencies (7% ÷ 52 compounds to a touch more than 7% ÷ 12), which is why the interest differences shown here are small rather than zero. A lender may instead preserve the effective rate, accrue daily, or hold partial payments until a full installment is available; use the documented convention from the actual offer. At 0% the payment is simply <code>P ÷ n</code>.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $25,000 at 7% over 5 years, three ways</div><div class="ex-body">
        <p><strong>Monthly:</strong> periodic rate 0.07 ÷ 12 = 0.0058333, n = 60; (1.0058333)<sup>60</sup> = 1.41763, so A = $495.03. Total paid $29,701.80, interest <strong>$4,701.80</strong>.</p>
        <p><strong>Biweekly:</strong> rate 0.07 ÷ 26 = 0.0026923, n = 130; A = $228.18. Total paid $29,662.99, interest <strong>$4,662.99</strong>, which is $38.81 less than monthly.</p>
        <p><strong>Weekly:</strong> rate 0.07 ÷ 52, n = 260; A = $114.02. Total paid $29,646.34, interest <strong>$4,646.34</strong>, or $55.46 less than monthly.</p>
        <p>All three cost about $494–495 per calendar month. Frequency fine-tunes the interest; it does not transform the loan.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Cash-flow timing.</strong> The schedules divide the annual payment stream differently. Whether a frequency aligns with income dates is a budgeting question outside the loan formula.</li>
        <li><strong>Rate and term.</strong> These dominate cost at every frequency. A 1-point rate change on the default loan moves interest by roughly $700; switching monthly→weekly moves it by $55.</li>
        <li><strong>"True biweekly" vs priced biweekly.</strong> Paying half the monthly amount 26 times a year is a ~8% overpayment, not a frequency effect. It shortens the loan by months, not days.</li>
        <li><strong>Contract handling.</strong> The model assumes each scheduled amount reduces the balance at that frequency. An actual loan may use different accrual or posting rules, so compare the result with its disclosure and schedule.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Uses the <strong>nominal-rate ÷ frequency</strong> convention throughout. A lender that fixes the effective annual rate instead would show near-identical interest at all frequencies.</li>
        <li>"Biweekly" here means every two weeks (26/yr). <strong>Semi-monthly</strong> (24/yr, e.g. the 1st and 15th) is a different schedule this tool does not model.</li>
        <li>Terms are whole years; frequencies other than 12, 26 and 52 (daily, quarterly) are not offered.</li>
        <li>No fees, insurance or payment-processing charges are included. Add any quoted charges to a separate all-in cost comparison.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why does paying weekly save so little?",
      aHtml: `<p>Because the required payment is recalculated for the frequency: you are not paying anything extra, just delivering the same annual amount in smaller slices. The only saving comes from principal reducing a few days earlier within each month, worth $55.46 over the whole life of the default loan. Meaningful savings need overpayment: pay more than the required amount at any frequency and the term itself shrinks.</p>`,
    },
    {
      q: "What is the difference between biweekly and twice-a-month payments?",
      aHtml: `<p>Biweekly means every 14 days, or 26 payments per year. Semi-monthly means twice per calendar month, or 24 payments per year. The two-payment difference is exactly why "true biweekly" plans (half the monthly payment every two weeks) sneak in one extra monthly payment per year. If your lender offers "twice a month", you get the cash-flow smoothing but not the extra-payment effect.</p>`,
    },
    {
      q: "What does a biweekly payment program change?",
      aHtml: `<p>A plan that collects half a monthly payment every two weeks collects the equivalent of 13 monthly payments each year, so it combines a timing change with an annual overpayment. Program fees and posting rules are not modeled. Compare the written schedule with a scenario that adds one-twelfth of the monthly payment as an extra each month.</p>`,
    },
    {
      q: "How does fortnightly income affect this comparison?",
      aHtml: `<p>A biweekly schedule has 26 required amounts and can be compared directly with 26 income periods. In the default calculation its interest difference from monthly is under $40 over the full term. Payroll timing, account balances and automatic-debit rules are not inputs, so the tool shows loan arithmetic rather than selecting a frequency.</p>`,
    },
  ],
};
