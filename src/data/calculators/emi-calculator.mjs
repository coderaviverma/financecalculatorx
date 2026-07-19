export default {
  slug: "emi-calculator",
  category: "loans",
  title: "EMI Calculator",
  h1: "EMI Calculator",
  metaTitle: "EMI Calculator — Monthly EMI, Total Interest & Amortization",
  metaDescription:
    "Calculate a loan EMI with a monthly reducing-balance model. See total interest, the full schedule, and the modeled effect of a one-time prepayment.",
  tagline:
    "Find the equated monthly installment for a home, car or personal loan, see the interest over the full tenure, and check how a lump-sum prepayment shortens the loan.",
  cardDescription: "Monthly EMI, total interest and prepayment savings on the reducing-balance method.",
  lastReviewed: "2026-07-19",
  version: "1.0",
  popular: true,
  featured: true,
  suggestCurrency: "INR",
  aliases: ["equated monthly installment", "home loan emi", "car loan emi", "india loan"],
  keywords: ["emi", "reducing balance", "flat rate", "tenure", "prepayment", "foreclosure"],
  related: ["loan-calculator", "personal-loan-calculator", "loan-amortization-calculator", "extra-payment-calculator", "sip-calculator"],
  jumpExplainLabel: "Reducing balance vs flat rate",
  sections: {
    howToHtml: `
      <p>Fill in the sanctioned loan amount, the annual interest rate from your sanction letter, and the tenure. The calculator returns your EMI, the interest over the full tenure, and a month-by-month schedule you can export.</p>
      <ul>
        <li><strong>Loan amount</strong>: the sanctioned principal. For a home loan this is the property cost minus your down payment (banks typically fund 75–90% of the property value).</li>
        <li><strong>Interest rate</strong>: the annual reducing-balance rate. If a dealer or NBFC quotes a "flat rate", do not enter it here; read the note below on why the two are not comparable.</li>
        <li><strong>Tenure</strong>: home loans in India commonly run 15–30 years, car loans 3–7 years, and personal loans 1–5 years. Toggle between years and months.</li>
        <li><strong>One-time prepayment</strong> (optional): enter a lump sum (a bonus, maturing FD, or annual incentive) and the month you plan to pay it, and the results show the interest saved and how much earlier the loan closes.</li>
      </ul>`,
    explanationHtml: `
      <h2>How your EMI splits between principal and interest</h2>
      <p>EMI stands for <strong>equated monthly installment</strong>, the fixed modeled amount that closes the balance at the end of the tenure. This calculator uses a <strong>monthly reducing balance</strong>: each period's interest is the outstanding principal times one-twelfth of the annual rate, and the rest of the EMI reduces principal. On a ₹25,00,000 loan at 8.5% for 20 years, the modeled EMI is ₹21,695.58; in the first month, ₹17,708 of it is interest and only ₹3,987 touches the principal. Two decades later the proportions have fully reversed. Actual lender schedules can differ because of daily accrual, reset dates, fees and rounding.</p>
      <p>This structure explains a fact that surprises many first-time borrowers: over a 20-year tenure at 8.5%, the total interest of ₹27,06,939 <em>exceeds</em> the ₹25,00,000 you borrowed. Principal makes up just 48% of everything you pay. Long tenures keep the EMI affordable relative to income, but they hand the bank interest for 240 separate months.</p>
      <p><strong>Beware the flat rate.</strong> Some NBFCs, dealer finance desks and gold-loan shops quote a "flat rate", where interest is computed on the <em>original</em> principal for the whole tenure, ignoring everything you have already repaid. A flat 8% on a ₹8,00,000 five-year car loan means an installment of ₹18,667 — the same installment a reducing-balance loan would carry at roughly <strong>14.13%</strong>. As a rule of thumb, a flat rate is equivalent to a reducing-balance rate about 1.7–1.8 times higher, so always ask which method a quote uses before comparing offers.</p>
      <p>Prepayment can materially reduce interest, but charges and treatment depend on the borrower, lender, rate type, loan purpose, contract date and applicable RBI direction. The linked RBI source below describes the relevant regulatory scope; your sanction letter controls your loan. This calculator assumes the prepayment is applied directly to principal, the EMI stays unchanged and the tenure shortens. Confirm that treatment before relying on the estimate.</p>`,
    formulaHtml: `
      <p>The EMI on a reducing-balance loan is:</p>
      <div class="formula-block"><span class="fx">EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>P</code> sanctioned principal</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12 (8.5% → 0.085 ÷ 12 = 0.0070833)</li>
          <li><code>n</code> tenure in months</li>
        </ul>
      </div>
      <p>Month by month, the schedule applies: interest = outstanding balance × <code>r</code>; principal repaid = EMI − interest; new balance = old balance − principal repaid. A one-time prepayment is subtracted from the balance in the month you choose, after which the same EMI clears the smaller balance in fewer months. At a 0% rate the EMI is simply <code>P ÷ n</code>. This is a common monthly reducing-balance model, not a representation of every Indian loan; a flat-rate or daily-accrual quote follows different arithmetic and cannot be entered here directly.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: ₹25,00,000 home loan at 8.5% for 20 years</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.085 ÷ 12 = 0.0070833, tenure <code>n</code> = 240 months.</p>
        <p>(1 + 0.0070833)<sup>240</sup> = 5.44124, so EMI = 25,00,000 × 0.0070833 × 5.44124 ÷ 4.44124 = <strong>₹21,695.58</strong>.</p>
        <p>Across 240 installments you pay <strong>₹52,06,939</strong> in total: ₹25,00,000 of principal and <strong>₹27,06,939</strong> of interest. The interest bill is larger than the loan itself.</p>
        <p>Now suppose a bonus lets you prepay <strong>₹2,00,000</strong> in month 24. The EMI stays ₹21,695.58, but the loan closes in <strong>203 months instead of 240</strong> (37 EMIs never happen) and the interest falls by <strong>₹6,06,271</strong>. A prepayment of 8% of the loan removed over 22% of the interest.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Tenure.</strong> The same ₹25,00,000 at 8.5% costs ₹19,31,328 in interest over 15 years (EMI ₹24,618) versus ₹27,06,939 over 20 years (EMI ₹21,696). The ₹2,923 lower EMI buys ₹7,75,611 of extra interest.</li>
        <li><strong>Rate.</strong> Half a percentage point matters at these tenures: at 9% instead of 8.5%, the EMI rises only ₹798 but lifetime interest climbs by about ₹1,91,416.</li>
        <li><strong>Prepayment timing.</strong> A lump sum in year 2 removes far more interest than the same sum in year 12, because it stops interest accruing on that slice of principal for all the remaining months.</li>
        <li><strong>Quoting method.</strong> Reducing-balance and flat-rate quotes differ hugely at the same headline number — a flat 8% behaves like roughly 14% reducing. Compare only like with like.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Assumes a <strong>fixed rate for the whole tenure</strong>. Most Indian home loans float with the repo-linked rate, so your EMI or tenure will be reset when the benchmark moves.</li>
        <li>Processing fees, GST on charges, and loan insurance premiums are <strong>not included</strong>; they raise the effective cost above the quoted rate.</li>
        <li>The prepayment model keeps the EMI constant and shortens the tenure; if you instead ask the bank to reduce the EMI and keep the tenure, the interest saving is smaller.</li>
        <li>Pre-EMI interest on under-construction property (paid before full disbursal) is outside the scope of this schedule.</li>
        <li>Figures are for planning. Your bank's sanction letter and repayment schedule are the binding documents.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12878" rel="noopener">Reserve Bank of India: circular on foreclosure charges / prepayment penalties</a> — the regulatory basis for the note on prepaying floating-rate loans to individuals.</li>
        <li><a href="https://www.rbi.org.in/" rel="noopener">Reserve Bank of India</a> — regulator of the reducing-balance lending conventions this calculator models.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Is the rate my bank quotes a reducing-balance rate?",
      aHtml: `<p>Do not infer the calculation method from the lender type alone. Look for “reducing balance,” “daily reducing,” “monthly reducing,” or “flat rate” in the sanction letter and ask for the legally required cost disclosure. A flat rate charges interest on the original principal for the entire tenure and is not directly comparable with a reducing rate; use total repayment or effective APR to compare offers.</p>`,
    },
    {
      q: "Can my bank charge me for prepaying or foreclosing the loan?",
      aHtml: `<p>It depends on the loan's rate type, purpose, borrower classification, contract date and current RBI rules. RBI directions restrict such charges for specified floating-rate loans, but the scope matters and other products can have contractual charges or conditions. Check the linked RBI circular and your sanction letter, or obtain written confirmation from the lender, before making a prepayment decision.</p>`,
    },
    {
      q: "After a prepayment, should I reduce the EMI or the tenure?",
      aHtml: `<p>Under the model, reducing the tenure saves more interest because the balance spends fewer months accruing it. That is the option this calculator models. A lender may instead reduce the EMI or offer a choice, so state your instruction and get the revised schedule in writing. EMI reduction improves monthly cash flow but usually preserves more interest-bearing months.</p>`,
    },
    {
      q: "Why does the interest exceed the principal on my home loan?",
      aHtml: `<p>Long tenures do that. Interest accrues each month on the outstanding balance, and on a 20-year loan the balance stays large for many years — at 8.5%, ₹25,00,000 borrowed generates ₹27,06,939 of interest across 240 months. Shortening the tenure or making early prepayments are the two levers that pull that number down; the worked example above shows a single ₹2,00,000 prepayment removing over ₹6,00,000 of interest.</p>`,
    },
    {
      q: "Does this calculator handle floating-rate resets?",
      aHtml: `<p>No — it computes the schedule at one fixed rate. After a repo-linked reset, the lender may change the EMI, tenure or both under the agreement and applicable rules. To explore one possible outcome, rerun the calculator with the outstanding balance, new rate and proposed remaining tenure, then compare it with the lender's revised schedule.</p>`,
    },
  ],
};
