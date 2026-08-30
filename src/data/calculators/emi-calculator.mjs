export default {
  slug: "emi-calculator",
  category: "loans",
  title: "EMI Calculator",
  h1: "EMI Calculator",
  metaTitle: "EMI Calculator — Monthly EMI, Total Interest & Amortization",
  metaDescription:
    "Calculate a loan EMI with a monthly reducing-balance model. See total interest, the full schedule, and the modeled effect of a one-time prepayment.",
  tagline:
    "Use the amount, rate and tenure to calculate EMI and total interest, with an optional lump-sum prepayment.",
  cardDescription: "Monthly EMI, total interest and prepayment savings on the reducing-balance method.",
  lastReviewed: "2026-08-30",
  version: "1.1",
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
        <li><strong>Loan amount</strong>: the principal stated in the sanction letter or repayment schedule. Do not infer it from the property or purchase price because down-payment and financing rules vary.</li>
        <li><strong>Interest rate</strong>: the annual monthly reducing-balance rate. A quote described as a flat rate follows different arithmetic and cannot be entered directly.</li>
        <li><strong>Tenure</strong>: the contractual number of months or years from the sanction letter. Toggle between years and months.</li>
        <li><strong>One-time prepayment</strong> (optional): enter a lump sum (a bonus, maturing FD, or annual incentive) and the month you plan to pay it, and the results show the interest saved and how much earlier the loan closes.</li>
      </ul>`,
    explanationHtml: `
      <h2>How your EMI splits between principal and interest</h2>
      <p>EMI stands for <strong>equated monthly installment</strong>, the fixed modeled amount that closes the balance at the end of the tenure. This calculator uses a <strong>monthly reducing balance</strong>: each period's interest is the outstanding principal times one-twelfth of the annual rate, and the rest of the EMI reduces principal. On a ₹25,00,000 loan at 8.5% for 20 years, the modeled EMI is ₹21,695.58; in the first month, ₹17,708 of it is interest and only ₹3,987 touches the principal. Two decades later the proportions have fully reversed. Actual lender schedules can differ because of daily accrual, reset dates, fees and rounding.</p>
      <p>Under the 20-year, 8.5% example, the modeled interest of ₹27,06,939 exceeds the ₹25,00,000 principal. Principal is about 48% of total scheduled payments because interest accrues during 240 monthly periods. A shorter modeled tenure raises the EMI and reduces the number of interest-bearing periods.</p>
      <p><strong>Flat-rate quotes use different arithmetic.</strong> If interest is calculated on the original principal for the entire tenure, a flat 8% quote on ₹8,00,000 over five years produces an installment of ₹18,667. A monthly reducing-balance loan reaches a similar installment at roughly <strong>14.13%</strong>. That relationship depends on the term and payment pattern, so there is no universal flat-to-reducing conversion multiplier; compare disclosed total repayment or an effective annual cost.</p>
      <p>Prepayment can materially reduce modeled interest, but charges and treatment depend on the borrower, lender, rate type, loan purpose, contract date and applicable RBI direction. The linked RBI source below covers Indian commercial banks; other regulated entities have entity-specific directions. This calculator assumes the prepayment is applied directly to principal, the EMI stays unchanged and the tenure shortens. Compare that assumption with the sanction letter before relying on the estimate.</p>`,
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
        <li><strong>Quoting method.</strong> In the five-year example, a flat 8% payment resembles a roughly 14.13% monthly reducing-balance payment. The conversion changes with tenure, so compare total repayment or effective annual cost rather than headline rates alone.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Assumes a <strong>fixed rate for the whole tenure</strong>. A floating-rate contract may reset the EMI, tenure or both according to its benchmark and terms.</li>
        <li>Processing fees, taxes on charges and loan-insurance premiums are <strong>not included</strong>; compare them separately using the lender's disclosure.</li>
        <li>The prepayment model keeps the EMI constant and shortens the tenure; if you instead ask the bank to reduce the EMI and keep the tenure, the interest saving is smaller.</li>
        <li>Pre-EMI interest on under-construction property (paid before full disbursal) is outside the scope of this schedule.</li>
        <li>Figures are for planning. Your bank's sanction letter and repayment schedule are the binding documents.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=13140" rel="noopener">Reserve Bank of India: Commercial Banks — Responsible Business Conduct Directions, 2025</a> — the current consolidated commercial-bank provisions on floating-rate resets and prepayment charges.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Is the rate my bank quotes a reducing-balance rate?",
      aHtml: `<p>Do not infer the calculation method from the lender type alone. Look for “reducing balance,” “daily reducing,” “monthly reducing,” or “flat rate” in the sanction letter and ask for the legally required cost disclosure. A flat rate charges interest on the original principal for the entire tenure and is not directly comparable with a reducing rate; use total repayment or effective APR to compare offers.</p>`,
    },
    {
      q: "Can my bank charge me for prepaying or foreclosing the loan?",
      aHtml: `<p>It depends on the lender type, loan rate, purpose, borrower classification and sanction or renewal date. The linked current RBI direction bars these charges for covered floating-rate loans from Indian commercial banks and specifies how the scope changes by date; other regulated entities have their own directions, while uncovered products can have contractual charges or conditions. Compare the applicable direction with the sanction letter or written lender confirmation.</p>`,
    },
    {
      q: "What happens after the modeled prepayment?",
      aHtml: `<p>The calculator keeps the EMI unchanged and shortens the tenure, which reduces the number of modeled interest-bearing months. An actual lender may recalculate the EMI, tenure or both under the contract and applicable rules. Compare any revised lender schedule with this tool's stated assumption rather than treating it as the only available treatment.</p>`,
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
