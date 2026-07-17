export default {
  slug: "emi-calculator",
  category: "loans",
  title: "EMI Calculator",
  h1: "EMI Calculator",
  metaTitle: "EMI Calculator — Monthly EMI, Total Interest & Amortization",
  metaDescription:
    "Calculate your loan EMI on the reducing-balance method Indian banks use. See total interest, the full schedule, and what a one-time prepayment saves.",
  tagline:
    "Find the equated monthly installment for a home, car or personal loan, see the interest over the full tenure, and check how a lump-sum prepayment shortens the loan.",
  cardDescription: "Monthly EMI, total interest and prepayment savings on the reducing-balance method.",
  lastReviewed: "2026-07-12",
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
      <p>EMI stands for <strong>equated monthly installment</strong>, the fixed amount you pay every month so that the loan closes exactly at the end of the tenure. Banks in India charge interest on the <strong>reducing balance</strong>: each month's interest is the outstanding principal times one-twelfth of the annual rate, and whatever remains of your EMI after that interest goes toward reducing the principal. On a ₹25,00,000 home loan at 8.5% for 20 years, the EMI is ₹21,695.58; in the first month, ₹17,708 of it is interest and only ₹3,987 touches the principal. Two decades later the proportions have fully reversed.</p>
      <p>This structure explains a fact that surprises many first-time borrowers: over a 20-year tenure at 8.5%, the total interest of ₹27,06,939 <em>exceeds</em> the ₹25,00,000 you borrowed. Principal makes up just 48% of everything you pay. Long tenures keep the EMI affordable relative to income, but they hand the bank interest for 240 separate months.</p>
      <p><strong>Beware the flat rate.</strong> Some NBFCs, dealer finance desks and gold-loan shops quote a "flat rate", where interest is computed on the <em>original</em> principal for the whole tenure, ignoring everything you have already repaid. A flat 8% on a ₹8,00,000 five-year car loan means an installment of ₹18,667 — the same installment a reducing-balance loan would carry at roughly <strong>14.13%</strong>. As a rule of thumb, a flat rate is equivalent to a reducing-balance rate about 1.7–1.8 times higher, so always ask which method a quote uses before comparing offers.</p>
      <p>Prepayment is the borrower's strongest tool. The RBI has barred banks and NBFCs from charging foreclosure or prepayment penalties on <strong>floating-rate loans to individuals</strong>, so most home-loan borrowers can prepay freely; fixed-rate loans may still carry a charge, typically 2–4% of the amount prepaid. When you prepay, the lender usually keeps the EMI unchanged and shortens the tenure, which is exactly how this calculator models it.</p>`,
    formulaHtml: `
      <p>The EMI on a reducing-balance loan is:</p>
      <div class="formula-block"><span class="fx">EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>P</code> sanctioned principal</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12 (8.5% → 0.085 ÷ 12 = 0.0070833)</li>
          <li><code>n</code> tenure in months</li>
        </ul>
      </div>
      <p>Month by month, the schedule applies: interest = outstanding balance × <code>r</code>; principal repaid = EMI − interest; new balance = old balance − principal repaid. A one-time prepayment is subtracted from the balance in the month you choose, after which the same EMI clears the smaller balance in fewer months. At a 0% rate the EMI is simply <code>P ÷ n</code>. This is the standard method used by Indian banks for home, car and personal loans; a flat-rate quote follows different arithmetic and cannot be entered here directly.</p>`,
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
      aHtml: `<p>If it is a scheduled bank quoting a home, car or personal loan, almost certainly yes: regulated bank lending in India is quoted on the reducing balance. Be careful with two-wheeler dealer finance, some NBFC consumer loans and informal lenders, where "flat rate" quotes are common. A flat rate charges interest on the original principal for the entire tenure and is roughly equivalent to a reducing-balance rate 1.7–1.8× higher, so a "6.5% flat" two-wheeler loan is really an ~11–12% loan.</p>`,
    },
    {
      q: "Can my bank charge me for prepaying or foreclosing the loan?",
      aHtml: `<p>Not on floating-rate loans to individuals. The RBI has prohibited foreclosure charges and prepayment penalties on those, which covers the vast majority of home loans. Fixed-rate loans and business loans can still carry a charge, commonly 2–4% of the prepaid amount, so check your sanction letter. Some banks also set a minimum prepayment (often one or two EMIs' worth) per transaction.</p>`,
    },
    {
      q: "After a prepayment, should I reduce the EMI or the tenure?",
      aHtml: `<p>Reducing the tenure saves far more interest, because the loan spends fewer months accruing it. That is the option this calculator models, and the one banks apply by default unless you request otherwise. Reducing the EMI instead improves monthly cash flow but leaves the full tenure intact. Choose the EMI reduction only if your budget genuinely needs the breathing room.</p>`,
    },
    {
      q: "Why does the interest exceed the principal on my home loan?",
      aHtml: `<p>Long tenures do that. Interest accrues each month on the outstanding balance, and on a 20-year loan the balance stays large for many years — at 8.5%, ₹25,00,000 borrowed generates ₹27,06,939 of interest across 240 months. Shortening the tenure or making early prepayments are the two levers that pull that number down; the worked example above shows a single ₹2,00,000 prepayment removing over ₹6,00,000 of interest.</p>`,
    },
    {
      q: "Does this calculator handle floating-rate resets?",
      aHtml: `<p>No — it computes the schedule at one fixed rate. When your repo-linked rate resets, banks usually keep the EMI the same and stretch or shrink the remaining tenure. To estimate the effect of a reset, rerun the calculator with the outstanding balance as the loan amount, the new rate, and the remaining tenure.</p>`,
    },
  ],
};
