export default {
  slug: "mortgage-payment-calculator",
  category: "mortgage",
  title: "Mortgage Payment Calculator",
  h1: "Mortgage Payment Calculator",
  metaTitle: "Mortgage Payment Calculator — Monthly P&I by Rate & Term",
  metaDescription:
    "Get your monthly principal and interest payment in seconds, see how each 0.5% of rate moves it, and compare 15, 20 and 30-year terms side by side.",
  tagline:
    "A fast principal-and-interest quote from just three inputs — loan amount, rate and term — with a sensitivity table showing exactly how much every fraction of a percent costs you.",
  cardDescription: "Quick monthly P&I payment with rate sensitivity and 15/20/30-year comparison.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["p&i calculator", "monthly mortgage payment", "home loan payment"],
  keywords: ["mortgage payment", "principal and interest", "rate sensitivity", "monthly payment", "15 vs 30 year"],
  related: ["mortgage-calculator", "mortgage-amortization-calculator", "house-affordability-calculator", "refinance-calculator", "loan-payment-calculator"],
  sections: {
    howToHtml: `
      <p>Enter the loan amount (the price minus whatever you're putting down), then the rate you've been quoted and a term. The payment updates instantly, and the chart shows what the same loan costs at rates 0.5% and 1% either side of your quote.</p>
      <ul>
        <li><strong>Loan amount</strong> is just the borrowed figure. If you're still working out the price/down-payment split, the <a href="/mortgage-calculator/">full mortgage calculator</a> handles that along with taxes and PMI.</li>
        <li><strong>Rate</strong>: use the quoted note rate. Trying the slider around your quote shows how much rate-shopping is worth before you lock.</li>
        <li><strong>Term</strong>: flip between 15, 20 and 30 years to see the payment/interest trade-off in one tap.</li>
      </ul>
      <p>The sensitivity table below the chart breaks the range into 0.25% steps, which is how lender offers usually differ.</p>`,
    explanationHtml: `
      <h2>A fast quote, and what moves it</h2>
      <p>This tool answers the question you have in the first five minutes of mortgage shopping: <em>what would that loan cost per month?</em> It deliberately computes principal and interest only, the number rate quotes and pre-approval letters are built around, so you can compare offers on equal footing without tax and insurance estimates muddying the picture.</p>
      <p>The useful insight is how the payment scales. On a <strong>$300,000</strong> loan over 30 years, moving the rate from 6.5% to 6.75% raises the payment from <strong>$1,896.20</strong> to <strong>$1,945.79</strong> — about <strong>$50 per month for each quarter point</strong>. Across the full ±1% band the payment runs from $1,703.37 at 5.5% to $2,097.64 at 7.5%, a spread of nearly $400/month on the same house. That is why locking 0.25% lower matters more than most closing-cost line items: over 30 years that quarter point is worth roughly $17,900 of interest on this loan.</p>
      <p>Term is the other lever, and it trades monthly comfort against lifetime cost. The same $300,000 at 6.5% costs $1,896.20/month over 30 years but $2,613.32 over 15, which is $717 more each month. In exchange, total interest collapses from $382,633 to $170,398. One number captures the whole 15-vs-30 decision: the shorter term saves about <strong>$212,235</strong> here.</p>
      <p>Keep in mind the payment a lender collects will be higher once property tax, insurance and possibly PMI are escrowed on top. Use this tool to compare loans; use the full mortgage calculator to budget the complete monthly outlay.</p>`,
    formulaHtml: `
      <p>The payment is the standard fixed-rate amortization formula, applied monthly:</p>
      <div class="formula-block"><span class="fx">M = L × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>M</code> monthly principal &amp; interest payment</li>
          <li><code>L</code> loan amount</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>n</code> total payments (15y = 180, 20y = 240, 30y = 360)</li>
        </ul>
      </div>
      <p>The sensitivity rows re-run the same formula at rates from 1% below to 1% above your quote in 0.25% steps, holding the amount and term constant. Total interest for each row is <code>M × n − L</code>, with the final payment adjusted by the schedule so the balance closes exactly at zero. Nothing else is added: no tax, insurance, PMI or fees.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $300,000 at 6.5% — three terms, one loan</div><div class="ex-body">
        <p>Monthly rate = 0.065 ÷ 12 = 0.0054167. Over <strong>30 years</strong> (n = 360): M = 300,000 × 0.0054167 × 1.0054167<sup>360</sup> ÷ (1.0054167<sup>360</sup> − 1) = <strong>$1,896.20</strong>, with <strong>$382,633</strong> of lifetime interest (1.28× the amount borrowed).</p>
        <p>Over <strong>20 years</strong> (n = 240): <strong>$2,236.72</strong>/month and $236,813 of interest. Over <strong>15 years</strong> (n = 180): <strong>$2,613.32</strong>/month and $170,398 of interest.</p>
        <p>Rate sensitivity at the 30-year term: a lender quoting 6% instead of 6.5% drops the payment to $1,798.65 and saves $35,119 of total interest; a 7% quote raises it to $1,995.91 and adds $35,893.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Rate, in quarter points.</strong> Lender offers on the same day typically differ by 0.125–0.375%. At $300,000 over 30 years, each 0.25% is about $50/month. The table shows your exact figure, which is the number to hold in your head while comparing Loan Estimates.</li>
        <li><strong>Term.</strong> Shorter terms carry lower rates in the market as well as less interest by construction, so the real-world 15-vs-30 gap is usually bigger than this constant-rate comparison shows.</li>
        <li><strong>Loan size.</strong> The payment scales linearly: 10% more borrowed is 10% more payment at any rate. If a payment target is fixed, work backward with the <a href="/house-affordability-calculator/">affordability calculator</a> instead.</li>
        <li><strong>Points and credits.</strong> Paying discount points buys a lower rate. Convert the point cost into the monthly saving shown here to judge whether you'll hold the loan long enough for it to pay off.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>Principal and interest only, by design: property tax, home insurance, PMI and HOA dues are excluded. The <a href="/mortgage-calculator/">mortgage calculator</a> estimates the complete monthly payment including escrow items.</li>
        <li>Assumes a fixed-rate, fully amortizing loan; ARM, interest-only and balloon structures follow different math.</li>
        <li>The rate comparison holds the term constant. In real markets, 15-year loans usually price 0.4–0.7% below 30-year loans, which this constant-rate view understates.</li>
        <li>Fees and points are not modeled, so this is a payment comparison, not an APR comparison.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Why doesn't this match the payment my lender quoted?",
      aHtml: `<p>Lender payment quotes often bundle escrow (property tax, home insurance and PMI) on top of principal and interest. This tool shows only P&amp;I, which is what the amortization formula produces and what pre-approvals are sized on. If the gap is large, ask the lender for the escrow breakdown, or model the full payment in the <a href="/mortgage-calculator/">mortgage calculator</a>.</p>`,
    },
    {
      q: "How much does 0.25% of rate actually matter?",
      aHtml: `<p>On a $300,000 30-year loan around 6.5%, each quarter point moves the payment roughly $50 per month and about $17,900 of lifetime interest. The calculator computes the exact delta for your amount and term, worth knowing before paying discount points or accepting a rate lock extension fee.</p>`,
    },
    {
      q: "Is a 15-year loan always the better deal?",
      aHtml: `<p>It is always cheaper in total interest, about $212,235 less on the example loan, but it is not automatically better. The higher required payment is a hard commitment; a 30-year loan with voluntary extra payments achieves much of the saving while keeping the option to fall back to the lower minimum. The right choice depends on income stability and what else the monthly difference could earn.</p>`,
    },
    {
      q: "Can I use this for a pre-approval sanity check?",
      aHtml: `<p>Yes, that's the core use. Take the loan amount from your pre-approval letter and the quoted rate, and check that the resulting P&amp;I payment fits your budget with room for tax, insurance and maintenance on top. Lenders approve against gross income ratios, which routinely allows more than is comfortable to pay.</p>`,
    },
    {
      q: "Why show payoff date if there's no start date input?",
      aHtml: `<p>The payoff date is projected from today, assuming the first payment is due next month, which is good enough for planning. If you want a schedule anchored to a specific first-payment month, with every payment dated, the <a href="/mortgage-amortization-calculator/">mortgage amortization calculator</a> does exactly that.</p>`,
    },
  ],
};
