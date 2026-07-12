export default {
  slug: "simple-interest-calculator",
  category: "investment",
  title: "Simple Interest Calculator",
  h1: "Simple Interest Calculator",
  metaTitle: "Simple Interest Calculator — Interest Without Compounding",
  metaDescription:
    "Work out simple interest with I = P × r × t: interest earned, total amount, and a year-by-year comparison against monthly compounding at the same rate.",
  tagline:
    "Calculate flat, non-compounding interest the way bonds, payout deposits and legal interest actually charge it — and see exactly what not compounding costs.",
  cardDescription: "Flat interest via I = P × r × t, with a side-by-side compound comparison.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  jumpExplainLabel: "Where simple interest is used",
  aliases: ["flat interest", "P r t", "non-compounding interest"],
  keywords: ["simple interest", "I = Prt", "flat rate interest", "bond coupon", "interest payout"],
  related: ["compound-interest-calculator", "loan-interest-calculator", "savings-calculator", "future-value-calculator"],
  sections: {
    howToHtml: `
      <p>Three inputs drive everything here: the principal, the annual rate, and the time in years (decimals work, so 18 months is 1.5). The calculator applies I = P × r × t and reports:</p>
      <ul>
        <li><strong>Interest earned</strong>: the flat total, plus what that is per year and per month.</li>
        <li><strong>Equivalent compound result</strong>: what the same money would earn if interest were reinvested monthly instead of paid out, so you can price the difference.</li>
      </ul>
      <p>The chart and table track both balances year by year. The gap column is the answer to a practical question: if you're offered interest as a payout (a coupon, a monthly-payout deposit), how much are you giving up versus letting it reinvest?</p>`,
    explanationHtml: `
      <h2>Where simple interest is used</h2>
      <p>Simple interest means the rate is only ever applied to the original principal. Earned interest is handed to you, or simply tallied up, but never added to the base. That sounds like a textbook relic, yet it describes a lot of real money: most <strong>bond coupons</strong> pay a fixed percentage of face value each period, straight to your account; <strong>fixed deposits with a payout option</strong> send interest out monthly or quarterly instead of reinvesting it; <strong>promissory notes</strong> between private parties are conventionally written as simple interest; and most <strong>statutory interest</strong> (court judgments, late tax payments, delayed insurance settlements) is calculated as a flat annual percentage on the amount owed.</p>
      <p>The structural difference from compounding is linear versus exponential growth. At 6%, $10,000 earns exactly $600 every single year: the default three-year result is $1,800, and year twenty's interest is the same $600 as year one's. Reinvested monthly at the same 6%, the three-year figure is $1,966.81, only $166.81 more. But stretch to ten years and it's $16,000 simple versus $18,193.97 compounded; at twenty years, $22,000 versus $33,102.04. The two lines on the chart start out nearly touching and then peel apart, which is the whole story: over short periods simple and compound interest are near-twins, and over long periods they aren't even the same species.</p>
      <p>A useful way to think about it: simple interest is what you get when interest is <em>paid out</em>, compound is what you get when it's <em>reinvested</em>. The money doesn't care about the label — a bond investor who takes each coupon and immediately reinvests it at the same rate has manufactured compound interest out of a simple-interest instrument. The gap this calculator shows is therefore not a defect of the product; it's the value of the reinvestment job that's been left to you.</p>
      <p>One caution on language: people often call flat-fee personal loans "simple interest loans," but almost no amortizing loan is simple interest in this sense; each payment is split against an interest charge computed on the <em>declining</em> balance. If you're pricing a loan, use the <a href="/loan-interest-calculator/">Loan Interest Calculator</a> instead; this page is for money that earns, not money you owe.</p>`,
    formulaHtml: `
      <p>The entire model is one multiplication:</p>
      <div class="formula-block"><span class="fx">I = P × r × t</span>
        <ul class="formula-vars">
          <li><code>P</code> principal (the base, which never changes)</li>
          <li><code>r</code> annual rate as a decimal (6% → 0.06)</li>
          <li><code>t</code> time in years (fractions allowed: 9 months = 0.75)</li>
        </ul>
      </div>
      <p>The final amount is simply <code>A = P + I = P(1 + rt)</code>. Because nothing feeds back into the base, interest scales in a straight line with both rate and time: doubling either exactly doubles the interest, which is never true under compounding, where doubling time more than doubles the result.</p>
      <p>The comparison column uses the standard monthly-compounding formula <code>P(1 + r/12)<sup>12t</sup></code> on identical inputs, so the gap you see is purely the effect of reinvestment.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $10,000 at 6% for 3 years</div><div class="ex-body">
        <p>I = 10,000 × 0.06 × 3 = <strong>$1,800</strong>, for a total of <strong>$11,800</strong>. That's $600 per year, or $50 per month, the same every month, first to last.</p>
        <p>Compounded monthly instead, the balance would reach $11,966.81, some $166.81 more over the three years. Small. But run the same comparison out to 20 years: simple interest delivers $12,000 while monthly compounding delivers $23,102.04 — a gap of $11,102.04, more than the original interest itself.</p>
        <p>Doubling time makes the point sharply: at 6% simple, money doubles in 100 ÷ 6 ≈ 16.7 years. Compounded monthly, it doubles in about 11.6.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>Time is where the two models diverge.</strong> Under three years or so, the simple-vs-compound gap at typical rates is small change; past ten years it dominates. Match the model to the product's actual mechanics before comparing offers.</li>
        <li><strong>What happens to the payouts.</strong> If coupon or payout interest lands in an account earning something, your true outcome sits between the two lines on the chart. If it gets spent, the simple line is your reality.</li>
        <li><strong>Rate quotes are comparable only within a model.</strong> A 6.2% simple payout deposit and a 6% compounding one can rank either way depending on the term — compute both, don't eyeball.</li>
        <li><strong>Day-count conventions.</strong> Legal and banking contexts count days differently (365, 360, actual). For multi-year horizons the difference is minor; for short windows it can matter.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The comparison column assumes <strong>monthly</strong> compounding; products that compound daily or yearly will land slightly above or below it. The flagship <a href="/compound-interest-calculator/">Compound Interest Calculator</a> lets you set the frequency exactly.</li>
        <li>Results are gross of tax; payout interest is typically taxable as income in the year received, which can change the payout-vs-reinvest decision.</li>
        <li>A constant rate is assumed for the whole term; floating-rate notes and step-up deposits need a period-by-period calculation.</li>
        <li>This page models interest you <em>earn</em>. Amortizing loans, even ones marketed with "simple interest" language, follow declining-balance math instead.</li>
      </ul>`,
  },
  faq: [
    {
      q: "Is simple interest better or worse than compound interest?",
      aHtml: `<p>For money you're owed, compounding is strictly better at the same rate — reinvested interest earns its own interest. But "simple" products aren't automatically bad deals: a bond or payout deposit hands you cash flow you can spend or reinvest elsewhere. What matters is comparing total outcomes at your actual reinvestment behaviour, which is exactly the gap this calculator computes.</p>`,
    },
    {
      q: "Why do people call car and personal loans 'simple interest loans'?",
      aHtml: `<p>In lending, "simple interest" usually just means interest accrues daily on the current balance with no interest-on-interest — not that I = Prt applies. Each payment covers accrued interest first and principal second, so the balance (and the interest charge) falls every month. The math is amortization, and the right tool for it is the <a href="/loan-calculator/">Loan Calculator</a>.</p>`,
    },
    {
      q: "How do I calculate simple interest for months or days?",
      aHtml: `<p>Convert the time to years and multiply: 8 months is t = 8 ÷ 12 ≈ 0.667, 90 days is t = 90 ÷ 365 ≈ 0.247. On $10,000 at 6%, that's $400 for the 8 months and about $147.95 for the 90 days. The time field here accepts decimals, so you can enter fractional years directly.</p>`,
    },
    {
      q: "Do bonds really pay simple interest?",
      aHtml: `<p>The coupon itself is simple: a 5% annual coupon on $10,000 face value pays $500 a year regardless of price moves, and the payment never compounds inside the bond. Your realized return can still compound if you reinvest coupons — which is why quoted yield-to-maturity figures assume reinvestment. The distinction between the instrument's payments and your reinvestment of them is the core idea on this page.</p>`,
    },
    {
      q: "When does the difference from compounding become material?",
      aHtml: `<p>A working rule from the numbers on this page: at mid-single-digit rates, the gap is under 2% of principal within three years, but grows without bound after that — at 6% it reaches about 22% of principal by year ten and 111% by year twenty. Short holding period: don't sweat the model. Long horizon: the model is the decision.</p>`,
    },
  ],
};
