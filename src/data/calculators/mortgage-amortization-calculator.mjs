export default {
  slug: "mortgage-amortization-calculator",
  category: "mortgage",
  title: "Mortgage Amortization Calculator",
  h1: "Mortgage Amortization Calculator",
  metaTitle: "Mortgage Amortization Calculator — Schedule with Dates",
  metaDescription:
    "Build a dated amortization schedule for your mortgage: every payment split into principal and interest, the crossover month, and your final payment date.",
  tagline:
    "The full month-by-month schedule for a home loan, anchored to your actual first payment date — see the principal/interest crossover, your balance at any date, and when the last payment lands.",
  cardDescription: "Dated month-by-month schedule with the principal/interest crossover point.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["amortization schedule", "mortgage schedule", "payment schedule"],
  keywords: ["amortization", "schedule", "principal", "interest", "crossover", "payoff date"],
  related: ["mortgage-calculator", "mortgage-payment-calculator", "mortgage-payoff-calculator", "loan-amortization-calculator", "extra-payment-calculator"],
  jumpExplainLabel: "Reading the schedule",
  sections: {
    howToHtml: `
      <p>Set the loan amount, rate and term, then pick the month and year of your first payment — the whole schedule is dated from there, so any row answers "what will I owe in March 2031?" directly.</p>
      <ul>
        <li><strong>First payment month/year</strong> — from your closing disclosure; it's typically the first day of the second month after closing.</li>
        <li><strong>Extra monthly payment</strong> — optional. Adding one redraws the entire schedule, moves the crossover earlier and pulls in the final payment date.</li>
        <li><strong>Annual vs monthly views</strong> — the annual view shows each 12-payment year with its date range; switch to monthly to find a specific payment, or export the CSV for your records.</li>
      </ul>
      <p>The metrics above the table surface the three dates people actually look up: the crossover, the 5-year balance, and the final payment.</p>`,
    explanationHtml: `
      <h2>Reading a 30-year schedule</h2>
      <p>An amortization schedule is the mortgage's complete flight plan: every payment is the same size, but its composition shifts continuously. Each month, interest is charged on the current balance and the remainder of the payment retires principal. Because a mortgage balance is large and falls slowly, this shift takes far longer than intuition suggests — that's the main thing the schedule teaches.</p>
      <p>Take the default <strong>$320,000 at 6.25% starting July 2026</strong>. The payment is <strong>$1,970.30</strong>, and the very first one splits into $1,666.67 of interest against just $303.63 of principal. Across the whole first year you pay <strong>$19,894 of interest</strong> but reduce the debt by only <strong>$3,750</strong>. Five years in — sixty payments and roughly $118,000 transferred — the balance still stands at <strong>$298,679</strong>, or 93.3% of the original loan.</p>
      <p>The pivotal row is the <strong>crossover</strong>: the first payment where principal exceeds interest. Here that's payment <strong>#228, in June 2045</strong> — almost 19 years in. At rates near 6–7% on a 30-year term, the crossover always lands past the halfway mark, which is why early-years equity comes mostly from your down payment and the market, not from payments. From the crossover onward the balance falls at an accelerating pace until the final payment in <strong>June 2056</strong>.</p>
      <p>The schedule is also your planning surface for prepayments: an extra <strong>$200/month</strong> from the start rewrites it to finish in 282 payments instead of 360 and moves the crossover up to payment #149, saving <strong>$99,019</strong> of interest. Use the dated rows to check the balance before deciding on a recast or a lump-sum prepayment at a specific future date.</p>`,
    formulaHtml: `
      <p>Each row of the schedule applies simple declining-balance arithmetic:</p>
      <div class="formula-block"><span class="fx">Interest<sub>k</sub> = B<sub>k−1</sub> × r &nbsp;·&nbsp; Principal<sub>k</sub> = M − Interest<sub>k</sub> &nbsp;·&nbsp; B<sub>k</sub> = B<sub>k−1</sub> − Principal<sub>k</sub></span>
        <ul class="formula-vars">
          <li><code>B<sub>k</sub></code> balance after payment k (B₀ = loan amount)</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>M</code> level payment from the amortization formula (plus any extra)</li>
        </ul>
      </div>
      <p>Dates advance one calendar month per row from your chosen start. The crossover is the first row where Principal<sub>k</sub> &gt; Interest<sub>k</sub>, which happens once the balance falls below M ÷ 2r. The final payment is reduced so the balance closes at exactly zero, and all rows use cent rounding on exact running balances.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $320,000 at 6.25%, 30 years, first payment July 2026</div><div class="ex-body">
        <p>Monthly rate = 0.0625 ÷ 12 = 0.0052083; payment = <strong>$1,970.30</strong>.</p>
        <p>Row 1 (Jul 2026): interest = 320,000 × 0.0052083 = <strong>$1,666.67</strong>; principal = 1,970.30 − 1,666.67 = <strong>$303.63</strong>; balance $319,696.37.</p>
        <p>Row 228 (Jun 2045): principal $987.35 first exceeds interest $982.94 — the crossover, 19 years in.</p>
        <p>Row 360 (Jun 2056): the final payment clears the loan, bringing lifetime interest to <strong>$389,306</strong> on top of the $320,000 borrowed.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate sets the crossover.</strong> Higher rates push the crossover later because more of each fixed payment is consumed by interest. At the default 6.25% it lands 19 years in; at lower rates it arrives years earlier on the same term.</li>
        <li><strong>Extra payments compound through the schedule.</strong> Every prepaid dollar removes its own future interest, so the $200/month example saves $99,019 — far more than 200 × 282. Earlier extras matter most, while the balance is largest.</li>
        <li><strong>Start date is bookkeeping, not economics.</strong> Shifting the first payment month relabels the dates without changing any amount — but it matters for tax-year interest totals and for timing a future recast.</li>
        <li><strong>Term length dominates total interest.</strong> The same loan on a 20-year schedule crosses over at payment #108 instead of #228 and pays about 38% less lifetime interest, at a higher required payment.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The schedule covers principal and interest only — escrow items (property tax, insurance, PMI) are collected alongside real mortgage payments but never appear in an amortization schedule. Budget them with the <a href="/mortgage-calculator/">mortgage calculator</a>.</li>
        <li>Fixed-rate loans only; an ARM's schedule re-amortizes at each reset and cannot be projected this way.</li>
        <li>Dates assume one payment per calendar month with no skipped or biweekly payments.</li>
        <li>A lender recast (re-amortizing after a lump sum) changes the required payment — model the lump sum here to see the schedule effect, but the official recast figures come from your servicer.</li>
      </ul>`,
  },
  faq: [
    {
      q: "What is the principal/interest crossover and why does it matter?",
      aHtml: `<p>It's the first payment where more money reduces your balance than pays interest — payment #228 (June 2045) on the default inputs. It matters as a mental milestone: before it, the loan is interest-heavy and prepayments have their greatest effect; after it, the balance falls quickly on its own. It's also a fair answer to "when does this loan start working for me?"</p>`,
    },
    {
      q: "Why is my balance so high after five years of payments?",
      aHtml: `<p>Because interest is charged on the outstanding balance, and early on the balance is at its peak. On $320,000 at 6.25%, five years of payments (about $118,218 transferred) still leaves $298,679 owing — over 80% of what you paid went to interest. This is normal amortization, not a lender trick, and it reverses in the later years of the schedule.</p>`,
    },
    {
      q: "How do extra payments change the schedule?",
      aHtml: `<p>An extra amount goes entirely to principal, so every subsequent row accrues less interest. $200/month on the default loan finishes the schedule in 282 payments instead of 360 and saves $99,019. The crossover also moves from payment #228 to #149. For payoff-focused planning on an existing loan, the <a href="/mortgage-payoff-calculator/">mortgage payoff calculator</a> compares your current plan against an accelerated one directly.</p>`,
    },
    {
      q: "Where do property tax and insurance appear in the schedule?",
      aHtml: `<p>They don't — and that's correct. Escrowed tax and insurance are pass-through costs the servicer collects with your payment, but they never touch the loan balance, so no amortization schedule includes them. When comparing this schedule to your statement, compare against the principal-and-interest portion only.</p>`,
    },
    {
      q: "Can I use this for a loan that's already a few years old?",
      aHtml: `<p>Yes — enter your current balance as the loan amount, the remaining years as the term, and the next payment date as the start. The schedule from your original closing and this one will match from that point forward, because amortization has no memory beyond the current balance.</p>`,
    },
  ],
};
