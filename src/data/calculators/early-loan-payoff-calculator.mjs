export default {
  slug: "early-loan-payoff-calculator",
  category: "loans",
  title: "Early Loan Payoff Calculator",
  h1: "Early Loan Payoff Calculator",
  metaTitle: "Early Loan Payoff Calculator — Hit a Target Payoff Date",
  metaDescription:
    "Pick a target payoff date for your loan and get the exact monthly payment it takes, the extra needed above your current payment, and the interest you save.",
  tagline:
    "Choose when you want the loan gone; this tool works backwards to the monthly payment that hits the deadline and prices it against your current pace.",
  cardDescription: "The exact monthly payment that retires your loan by a date you choose.",
  lastReviewed: "2026-07-12",
  version: "1.0",
  popular: false,
  featured: false,
  aliases: ["pay off loan early", "target payoff date", "payoff goal"],
  keywords: ["early payoff", "required payment", "payoff deadline", "target date", "pay loan faster"],
  related: ["loan-payoff-calculator", "extra-payment-calculator", "mortgage-payoff-calculator", "loan-calculator", "debt-payoff-calculator"],
  jumpExplainLabel: "Deadline-first payoff",
  sections: {
    howToHtml: `
      <p>Enter your loan as it stands today and the deadline you want to hit:</p>
      <ul>
        <li><strong>Current balance</strong> and <strong>rate</strong> — from your latest statement.</li>
        <li><strong>Current monthly payment</strong> — what you actually pay toward principal and interest now; it's the benchmark the target plan is priced against.</li>
        <li><strong>Target payoff time</strong> — how long from now the balance should reach zero. Toggle between years and months.</li>
      </ul>
      <p>The answer is the required monthly payment, the gap between it and what you pay today, and the interest the faster plan avoids. If the required payment comes out below your current one, you're already ahead of the goal — the result says so instead of flagging an error.</p>`,
    explanationHtml: `
      <h2>Working backwards from a deadline</h2>
      <p>Most loan tools run forwards: you supply a payment and they tell you when the debt ends. This one inverts the question. You fix the end date — <em>the loan is gone in 36 months</em> — and the calculator solves for the one unknown left, the payment. It's the same annuity equation used to originate a loan, applied to your current balance with your deadline as the term. That inversion is useful because deadlines, not payments, are how payoff goals usually arrive: the car loan should end before the lease on the next one starts, the personal loan before a mortgage application (lenders count its payment in your debt-to-income ratio), the education loan before a planned career break, every loan before retirement ends the paycheck that services it.</p>
      <p>The price of speed is not linear, and seeing the curve helps you pick a sensible target. For the default loan — $18,000 at 7.5%, currently paid at $380/month and on pace to finish in 57 months — here is what each deadline costs:</p>
      <table>
        <thead><tr><th>Target</th><th>Required payment</th><th>Extra vs $380</th><th>Total interest</th></tr></thead>
        <tbody>
          <tr><td>48 months</td><td>$435.22</td><td>+$55.22</td><td>$2,890.57</td></tr>
          <tr><td>36 months</td><td>$559.91</td><td>+$179.91</td><td>$2,156.83</td></tr>
          <tr><td>24 months</td><td>$809.99</td><td>+$429.99</td><td>$1,439.82</td></tr>
        </tbody>
      </table>
      <p>Cutting nine months off the natural pace costs about $55 extra; the next twelve cost $125 more; the twelve after that, another $250. Each year removed must squeeze the same principal into fewer payments, so the marginal cost per month saved keeps rising while the interest saved per month shrinks. The right target is where the required payment still fits comfortably in your budget in a bad month — a deadline you abandon after a year saves less than a slower one you keep.</p>`,
    formulaHtml: `
      <p>The payment that retires a balance in exactly <code>n</code> months is the standard annuity payment, applied to today's balance:</p>
      <div class="formula-block"><span class="fx">A = B × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]</span>
        <ul class="formula-vars">
          <li><code>A</code> required monthly payment</li>
          <li><code>B</code> current balance</li>
          <li><code>r</code> monthly rate = annual rate ÷ 12</li>
          <li><code>n</code> target payoff time in months</li>
        </ul>
      </div>
      <p>Because the plan ends in exactly <code>n</code> level payments, its total interest is simply <code>A × n − B</code>. The extra needed each month is <code>A</code> minus your current payment, floored at zero. Your current pace, for comparison, comes from the payoff-time formula (<em>nper</em>); if the current payment doesn't exceed <code>B × r</code>, that pace never terminates — but the required payment for your target exists regardless, because it's computed from the balance, rate and deadline alone.</p>`,
    exampleHtml: `
      <div class="example-block"><div class="ex-head">Example: $18,000 at 7.5%, gone in 36 months</div><div class="ex-body">
        <p>Monthly rate <code>r</code> = 0.075 ÷ 12 = 0.00625, and (1.00625)<sup>36</sup> = 1.25179.</p>
        <p>A = 18,000 × 0.00625 × 1.25179 ÷ 0.25179 = <strong>$559.91 per month</strong> — $179.91 above the current $380 payment.</p>
        <p>Interest on the 36-month plan is 559.91 × 36 − 18,000 = <strong>$2,156.83</strong>. Staying at $380 would take 57 months and $3,410.84 of interest, so the deadline saves <strong>$1,254.01</strong> and finishes 21 months sooner.</p>
      </div></div>`,
    factorsHtml: `
      <ul>
        <li><strong>How aggressive the target is.</strong> The marginal cost rises as the deadline tightens: on the default loan, the first nine months cut cost ~$6/month each, the last twelve ~$21/month each.</li>
        <li><strong>Where your current payment already stands.</strong> If it's close to the required payment, the goal is nearly free; if it barely covers interest, the required payment will feel like a different loan entirely.</li>
        <li><strong>Rate and balance.</strong> Both scale the required payment roughly proportionally — rerun the numbers after any rate change or lump-sum payment.</li>
        <li><strong>Budget durability.</strong> The required payment is a commitment for every month of the target window; a plan you can hold beats a faster one you can't.</li>
      </ul>`,
    limitationsHtml: `
      <ul>
        <li>The target plan assumes level payments starting one month from today at a fixed rate — a variable rate changes the required payment as it moves.</li>
        <li>Your lender's contractual minimum still applies; the "required payment" here is your voluntary target, not a modification of the loan.</li>
        <li>Fees, escrow and insurance portions of your payment are outside the math — compare principal-and-interest amounts only.</li>
        <li>If your current payment can't amortize the loan, the "interest at current payment" comparison is shown as — (it would be infinite), while the target-plan figures remain exact.</li>
      </ul>`,
  },
  faq: [
    {
      q: "The required payment is less than I already pay. Did I do something wrong?",
      aHtml: `<p>No — it means your current payment already beats the deadline you picked. The result tells you how many months your current pace actually needs, so you can either relax (the goal is met) or tighten the target until the required payment rises above what you pay today. Deadlines longer than your natural payoff always produce this outcome.</p>`,
    },
    {
      q: "My current payment doesn't even cover the interest. Can I still set a target?",
      aHtml: `<p>Yes. The required payment depends only on the balance, the rate and the deadline — not on what you pay now. The calculator will tell you the current pace never finishes (interest exceeds the payment, so the balance grows), and the required payment is exactly the fix: it's the smallest level payment that lands the balance on zero at your chosen date.</p>`,
    },
    {
      q: "Is hitting a deadline this way better than refinancing to a shorter term?",
      aHtml: `<p>They reach the same schedule by different routes. Refinancing to a shorter term may buy a lower rate but locks the higher payment in contractually and usually costs fees. Voluntarily paying the required amount keeps the old payment as your safety floor — if money gets tight you can drop back without penalty. If the rate improvement is large, compare both routes with the refinance numbers in hand.</p>`,
    },
    {
      q: "Why does each extra year I cut cost more per month than the last?",
      aHtml: `<p>Because the same principal must fit into fewer payments while interest has less time to spread out. Going from 57 to 48 months redistributes the balance over slightly fewer installments; going from 36 to 24 crams it into far fewer. The per-month price of speed therefore accelerates — the mini-table above shows the curve for the default loan.</p>`,
    },
    {
      q: "Does the target plan change my official loan term with the lender?",
      aHtml: `<p>No. You simply pay more than the contractual minimum each month, and the loan ends early on its own once the balance hits zero. Nothing needs the lender's approval, though you should confirm extra amounts post to principal and that no prepayment penalty applies to your loan type.</p>`,
    },
  ],
};
