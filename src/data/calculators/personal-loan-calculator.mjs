export default {
  slug: "personal-loan-calculator",
  category: "loans",
  title: "Personal Loan Calculator",
  h1: "Personal Loan Calculator",
  metaTitle: "Personal Loan Calculator — Payment, Fees & Effective APR",
  metaDescription:
    "Work out a personal loan's monthly payment and total interest, and see how an origination fee taken out of your disbursal raises the effective APR.",
  tagline:
    "Price an unsecured loan honestly: the monthly payment, the interest, and the effective APR once the origination fee is deducted from what you actually receive.",
  cardDescription: "Monthly payment, origination fee impact and effective APR for unsecured loans.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["unsecured loan", "signature loan", "consolidation loan", "origination fee"],
  keywords: ["personal loan", "origination fee", "effective apr", "unsecured", "debt consolidation"],
  related: ["loan-calculator", "debt-payoff-calculator", "loan-comparison-calculator", "loan-payment-calculator", "budget-calculator"],
  jumpExplainLabel: "Why the APR beats the rate",
  sections: {
    howToHtml: `
      <p>Enter the loan amount from the offer, the quoted interest rate, the repayment term, and — crucially — the origination fee percentage if the offer has one. Most online lenders charge 1–10%; banks and credit unions often charge nothing.</p>
      <ul>
        <li><strong>Loan amount</strong> — the face value you are borrowing and will repay. If you need a specific sum in hand, note that a fee means you must borrow more than that sum.</li>
        <li><strong>Interest rate</strong> — the nominal annual rate on the offer. Unsecured quotes vary enormously with credit score, so use the rate you were actually offered, not an advertised "from" rate.</li>
        <li><strong>Term</strong> — 24 to 60 months is typical; up to 84 exists for larger loans.</li>
        <li><strong>Origination fee</strong> — the percentage the lender keeps out of the disbursal. Leave it at zero for no-fee lenders.</li>
      </ul>
      <p>The results show what actually reaches your bank account and the effective APR — the number to compare across offers.</p>`,
    explanationHtml: `
      <h2>Unsecured money costs more — and fees hide how much</h2>
      <p>A personal loan is <strong>unsecured</strong>: there is no house or car for the lender to repossess if you stop paying. The lender's only protection is your creditworthiness, so rates sit well above secured lending — high single digits for excellent credit, and 20–35% at the subprime end, against the 6–8% a mortgage might cost. Your credit score is the dominant input: the same borrower profile can be quoted rates ten points apart by different lenders, which is why pre-qualifying with several (a soft credit pull, no score damage) routinely saves more than any other step in the process.</p>
      <p>The second cost lever is the <strong>origination fee</strong>, and its mechanics deserve attention. The fee is not billed to you; it is <em>deducted from the disbursal</em>. Take this calculator's default: a $15,000 loan at 11.5% for 48 months with a 2% fee. The lender wires you $14,700, keeps $300, and calculates your $391.34 payment on the full $15,000. You are paying interest for four years on $300 you never saw.</p>
      <p>That is exactly what APR measures. Solving for the rate at which 48 payments of $391.34 are worth the $14,700 you actually received gives an effective APR of <strong>12.59%</strong> — more than a point above the quoted 11.5%. Push the fee to 5% and the APR reaches <strong>14.27%</strong> with the same headline rate. The gap also widens on shorter terms, because the fee is spread over fewer payments: the same 2% fee on a 24-month version of this loan works out to a 13.54% APR. When two offers differ in both rate and fee, only the APR ranks them correctly.</p>
      <p>Common uses shape the sensible term. For <strong>debt consolidation</strong> — replacing 20%+ credit-card balances with one fixed payment — a shorter term locks in the saving. For a large one-off purchase, match the term to the life of what you are buying rather than stretching for the smallest payment.</p>`,
    formulaHtml: `
      <p>The payment uses the standard amortization formula on the <em>full</em> loan amount:</p>
      <div class="formula-block"><span class="fx">M = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]&nbsp;&nbsp;with net disbursal D = P − fee</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly payment</li>
          <li><code>P</code> loan face value; <code>fee</code> = P × fee%</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12; <code>n</code> months</li>
          <li><code>D</code> what actually reaches your account</li>
        </ul>
      </div>
      <p>The effective APR is then the rate <code>a</code> that makes the present value of the <code>n</code> payments of <code>M</code> equal to <code>D</code> rather than <code>P</code>. There is no closed form for <code>a</code>, so the calculator solves it numerically (bisection on the annuity present-value function until it converges to well under a basis point). With no fee, <code>D = P</code> and the APR collapses to the nominal rate.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $15,000 at 11.5% for 48 months with a 2% fee</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.115 ÷ 12 = 0.0095833; (1 + r)<sup>48</sup> = 1.58061.</p>
        <p>M = 15,000 × 0.0095833 × 1.58061 ÷ 0.58061 = <strong>$391.34 per month</strong>, and total interest over 48 payments is <strong>$3,784.09</strong>.</p>
        <p>The 2% fee is <strong>$300</strong>, so the disbursal is <strong>$14,700</strong>. Finding the rate at which 48 payments of $391.34 are worth exactly $14,700 gives an effective APR of <strong>12.59%</strong> — the fee added 1.09 points to the true cost without touching the quoted rate.</p>
        <p>A competing no-fee offer at 12.25% would be the cheaper loan, despite its higher sticker rate.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Credit score.</strong> The single biggest driver of your quote. Moving from a "fair" to a "good" tier can cut an unsecured rate by 5–10 points — worth checking your report for errors before applying.</li>
        <li><strong>Origination fee.</strong> On the default loan, each percentage point of fee adds roughly half a point of APR. Fees hurt more on short terms, where they amortize over fewer payments.</li>
        <li><strong>Term.</strong> Longer terms shrink the payment but multiply the months of interest; 48 → 60 months on this loan adds about $1,000 of interest.</li>
        <li><strong>Secured alternatives.</strong> If you hold home equity or can post collateral, secured products usually undercut personal-loan rates — at the cost of putting the asset at risk.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Assumes a <strong>fixed rate and equal monthly payments</strong> — true for nearly all personal loans, unlike credit lines.</li>
        <li>The effective APR here covers the origination fee only; <strong>late fees, insurance add-ons and prepaid interest</strong> are excluded.</li>
        <li>Some lenders add the fee on top of the loan instead of deducting it from the disbursal — check which structure your offer uses, as the APR math differs slightly.</li>
        <li>Quotes expire and rates move with your credit file; the numbers here reflect the inputs, not a live offer.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why did I receive less money than the loan amount?",
      aHtml: `<p>Your lender deducted the origination fee from the disbursal. On a $15,000 loan with a 2% fee, $300 is withheld and $14,700 arrives in your account — but the debt, and the interest, run on the full $15,000. If you need an exact amount in hand, gross it up: divide the amount you need by (1 − fee%). To net $15,000 with a 2% fee you would borrow about $15,306.</p>`,
    },
    {
      q: "Which number should I compare between offers — rate or APR?",
      aHtml: `<p>APR, always. The nominal rate ignores fees, so a 11.5% loan with a 2% fee (12.59% APR) is more expensive than a 12.25% loan with no fee. APR folds the fee into a single comparable yearly cost. The only caveat: APR comparisons assume you hold the loan to term — if you plan to repay very early, a fee-heavy loan gets even worse, because the fee is sunk on day one.</p>`,
    },
    {
      q: "Is a personal loan a good way to consolidate credit-card debt?",
      aHtml: `<p>Often, yes — swapping 20%+ revolving APRs for a fixed 11–15% installment loan cuts the interest and imposes a fixed end date. Two conditions make it work: the effective APR (after any fee) must be clearly below your cards' rates, and the freed-up cards must not be run back up. Check the plan with the debt payoff calculator before and after to confirm the saving is real.</p>`,
    },
    {
      q: "Can I pay a personal loan off early?",
      aHtml: `<p>Usually — most personal lenders in the US charge no prepayment penalty, though a minority do, so read the agreement. Note that early payoff does not refund the origination fee: it was collected upfront. That is one reason short-term borrowers should prefer no-fee offers even at slightly higher rates.</p>`,
    },
    {
      q: "How does my credit score change the numbers here?",
      aHtml: `<p>It sets the rate you should type in. Advertised ranges are wide — a lender showing "8.99–29.99%" will price you within that band based on score, income and existing debt. Pre-qualify to get your personal rate (a soft inquiry that doesn't affect your score), then enter that figure. A ten-point rate difference on this calculator's default loan changes total interest by thousands of dollars.</p>`,
    },
  ],
};
