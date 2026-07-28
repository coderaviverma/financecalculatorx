export default {
  slug: "personal-loan-calculator",
  category: "loans",
  title: "Personal Loan Calculator",
  h1: "Personal Loan Calculator",
  metaTitle: "Personal Loan Calculator — Payment, Fees & Effective APR",
  metaDescription:
    "Work out a personal loan's monthly payment and total interest, and see how an origination fee taken out of your disbursal raises the effective APR.",
  tagline:
    "Include a deducted origination fee when comparing a personal loan's payment, total interest and effective APR.",
  cardDescription: "Monthly payment, origination fee impact and effective APR for unsecured loans.",
  lastReviewed: "2026-07-22",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["unsecured loan", "signature loan", "consolidation loan", "origination fee"],
  keywords: ["personal loan", "origination fee", "effective apr", "unsecured", "debt consolidation"],
  related: ["loan-calculator", "debt-payoff-calculator", "loan-comparison-calculator", "loan-payment-calculator", "budget-calculator"],
  jumpExplainLabel: "Why the APR beats the rate",
  sections: {
    howToHtml: `
      <p>From the offer in front of you, enter the loan amount, quoted interest rate, repayment term and origination fee percentage, if there is one.</p>
      <ul>
        <li><strong>Loan amount</strong>: the face value you are borrowing and will repay. If you need a specific sum in hand, note that a fee means you must borrow more than that sum.</li>
        <li><strong>Interest rate</strong>: the nominal annual rate on the offer. Unsecured quotes vary enormously with credit score, so use the rate you were offered, not an advertised "from" rate.</li>
        <li><strong>Term</strong>: use the number of months stated in the offer.</li>
        <li><strong>Origination fee</strong>: this model treats the fee as a percentage deducted from the disbursal. Leave it at zero for a no-fee offer.</li>
      </ul>
      <p>The results show how much lands in your bank account, along with the effective APR, which is the number to compare across offers.</p>`,
    explanationHtml: `
      <h2>Unsecured money costs more, and fees hide how much</h2>
      <p>A personal loan is usually <strong>unsecured</strong>, so the lender prices the offer from the application and credit risk rather than from pledged collateral. Rates and fees vary widely by lender, borrower and market. Use a written offer rather than an advertised starting rate, and check whether any rate enquiry or pre-qualification will affect your credit file in your jurisdiction.</p>
      <p>The second input is the <strong>origination fee</strong>. This calculator assumes it is deducted from the disbursal. On the default $15,000 loan, a 2% fee means $14,700 reaches you while the payment is still calculated from $15,000. Some lenders charge or finance fees differently, so compare this assumption with the offer.</p>
      <p>This calculator expresses that deducted fee as an effective APR. Solving for the rate at which 48 payments of $391.34 are worth the $14,700 received gives <strong>12.59%</strong>, more than a point above the quoted 11.5%. A 5% fee raises the modeled figure to <strong>14.27%</strong>. For a final comparison, use the lender's regulated APR disclosure because it may include charges or conventions beyond this calculator's single fee input.</p>
      <p>Common uses shape the sensible term. For <strong>debt consolidation</strong> (replacing high-rate credit-card balances with one fixed payment), a shorter term locks in the saving. For a large one-off purchase, match the term to the life of what you are buying rather than stretching for the smallest payment.</p>`,
    formulaHtml: `
      <p>The payment uses the standard amortization formula on the <em>full</em> loan amount:</p>
      <div class="formula-block"><span class="fx">M = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]&nbsp;&nbsp;with net disbursal D = P − fee</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly payment</li>
          <li><code>P</code> loan face value; <code>fee</code> = P × fee%</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12; <code>n</code> months</li>
          <li><code>D</code> the net amount that reaches your account</li>
        </ul>
      </div>
      <p>The effective APR is then the rate <code>a</code> that makes the present value of the <code>n</code> payments of <code>M</code> equal to <code>D</code> rather than <code>P</code>. There is no closed form for <code>a</code>, so the calculator solves it numerically (bisection on the annuity present-value function until it converges to well under a basis point). With no fee, <code>D = P</code> and the APR collapses to the nominal rate.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $15,000 at 11.5% for 48 months with a 2% fee</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.115 ÷ 12 = 0.0095833; (1 + r)<sup>48</sup> = 1.58061.</p>
        <p>M = 15,000 × 0.0095833 × 1.58061 ÷ 0.58061 = <strong>$391.34 per month</strong>, and total interest over 48 payments is <strong>$3,784.09</strong>.</p>
        <p>The 2% fee is <strong>$300</strong>, so the disbursal is <strong>$14,700</strong>. Finding the rate at which 48 payments of $391.34 are worth exactly $14,700 gives an effective APR of <strong>12.59%</strong>. The fee added 1.09 points to the true cost without touching the quoted rate.</p>
        <p>A competing no-fee offer at 12.25% would be the cheaper loan, despite its higher sticker rate.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Credit profile.</strong> Credit history, income, existing debt, loan size and lender policy can all affect the quote. Check the application-specific rate rather than relying on a broad advertised range.</li>
        <li><strong>Origination fee.</strong> On the default loan, each percentage point of fee adds roughly half a point of APR. Fees hurt more on short terms, where they amortize over fewer payments.</li>
        <li><strong>Term.</strong> Longer terms shrink the payment but multiply the months of interest; 48 → 60 months on this loan adds about $1,000 of interest.</li>
        <li><strong>Secured alternatives.</strong> If you hold home equity or can post collateral, secured products usually undercut personal-loan rates, at the cost of putting the asset at risk.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Assumes a <strong>fixed rate and equal monthly payments</strong>. It does not model a variable-rate loan or credit line.</li>
        <li>The effective APR here covers the origination fee only; <strong>late fees, insurance add-ons and prepaid interest</strong> are excluded.</li>
        <li>Some lenders add the fee on top of the loan instead of deducting it from the disbursal. Check which structure your offer uses, as the APR math differs slightly.</li>
        <li>Quotes expire and rates move with your credit file; the numbers here reflect the inputs, not a live offer.</li>
      </ul>
      <h3>Sources and references</h3>
      <ul>
        <li><a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" rel="noopener">CFPB: Interest rate vs APR</a> — the fee-inclusive APR concept behind this calculator's effective-APR figure.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why did I receive less money than the loan amount?",
      aHtml: `<p>Your lender deducted the origination fee from the disbursal. On a $15,000 loan with a 2% fee, $300 is withheld and $14,700 arrives in your account — but the debt, and the interest, run on the full $15,000. If you need an exact amount in hand, gross it up: divide the amount you need by (1 − fee%). To net $15,000 with a 2% fee you would borrow about $15,306.</p>`,
    },
    {
      q: "Which number should I compare between offers — rate or APR?",
      aHtml: `<p>For offers with the same amount and term, APR can capture costs that the nominal rate omits. Also compare the itemized fees and total amount paid, especially if you expect to repay early. This calculator's effective APR includes the modeled origination fee only, so use the lender's regulated disclosure for the final comparison.</p>`,
    },
    {
      q: "Is a personal loan a good way to consolidate credit-card debt?",
      aHtml: `<p>It can be: replacing higher-rate revolving balances with a lower fixed-rate installment loan cuts the interest and imposes a fixed end date. Two conditions make it work: the effective APR (after any fee) must be clearly below your cards' rates, and the freed-up cards must not be run back up. Check the plan with the debt payoff calculator before and after to confirm the saving is real.</p>`,
    },
    {
      q: "Can I pay a personal loan off early?",
      aHtml: `<p>Read the agreement for any prepayment charge and ask for a payoff quotation. An origination fee already collected may not be refundable, which can make a fee-heavy offer relatively expensive over a short holding period. Compare total cost to your expected payoff date rather than assuming the full-term APR tells the whole story.</p>`,
    },
    {
      q: "How does my credit score change the numbers here?",
      aHtml: `<p>Enter the rate from a specific offer rather than the lowest rate in an advertisement. Lenders may consider credit history, income, existing debt, loan amount and other factors. Before requesting a quote, check whether the enquiry will be recorded on your credit file; practices and effects vary.</p>`,
    },
  ],
};
