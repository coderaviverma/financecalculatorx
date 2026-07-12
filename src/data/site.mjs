/* Finance Calculator X — site configuration, categories, homepage data. */

export const site = {
  name: "Finance Calculator X",
  shortName: "FCX",
  domain: "financecalculatorx.com",
  origin: "https://financecalculatorx.com",
  tagline: "Make Smarter Financial Decisions With Better Calculators",
  description:
    "Free financial calculators for loans, mortgages, investments, savings, debt, retirement and everyday money decisions — with charts, amortization tables, worked examples and transparent methodology.",
  email: "contact@financecalculatorx.com",
  launched: "2026-07",
  // Analytics & search-console integration. GA4 loads only when ga4 is a non-empty G-XXXX id.
  ga4: "G-CB5GWN9DQ9",
  // Site-verification meta tokens (used as a fallback to DNS/import verification).
  verify: { google: "", bing: "" },
};

export const categories = [
  {
    id: "loans",
    short: "Loans",
    title: "Loan Calculators",
    path: "/loan-calculators/",
    icon: "loan",
    tagline: "Payments, interest, amortization and payoff strategies for any loan.",
    metaTitle: "Loan Calculators — Payments, Interest, Amortization & Payoff",
    metaDescription:
      "Ten loan calculators covering monthly payments, EMI, total interest, amortization schedules, extra payments, early payoff and side-by-side loan comparison.",
    introHtml: `
      <p>Every loan in this section follows the same underlying mathematics — a fixed-rate, level-payment (amortizing) loan — but each calculator answers a different question about it. Use the <a href="/loan-calculator/">Loan Calculator</a> when you want the complete picture of a new loan: payment, total interest and a full amortization schedule. Use the goal-specific tools when you already know what you're trying to change: the <a href="/extra-payment-calculator/">Extra Payment Calculator</a> shows what paying more each month actually saves, the <a href="/loan-payoff-calculator/">Loan Payoff Calculator</a> works out how long your current balance will take to clear, and the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> puts two offers side by side so the cheaper one is obvious.</p>
      <p>All of these tools work for personal loans, car loans, education loans and most fixed-rate borrowing. They assume interest accrues monthly on the remaining balance — the reducing-balance method used by almost all mainstream lenders — and every page documents its formula, assumptions and a worked example so you can verify the numbers yourself.</p>`,
    eduHtml: `
      <h2>How to get the most out of these calculators</h2>
      <p>Start with the payment, but decide on the total cost. Two loans with similar monthly payments can differ by thousands in total interest once the term is taken into account — a longer term almost always means a smaller payment and a larger total cost. When comparing offers, keep the loan amount identical and let only the rate, term and fees vary; the comparison calculator does this for you and shows the break-even point when fees are involved.</p>
      <p>If you already have a loan, the highest-leverage number to experiment with is the extra monthly payment. Because extra amounts go entirely toward principal, even small additions remove interest from every remaining month of the schedule. The <a href="/early-loan-payoff-calculator/">Early Loan Payoff Calculator</a> approaches the same idea from the other direction: pick a target payoff date and it tells you the payment required to hit it.</p>`,
    relatedCategories: ["mortgage", "personal"],
  },
  {
    id: "mortgage",
    short: "Mortgage",
    title: "Mortgage & Home Calculators",
    path: "/mortgage-calculators/",
    icon: "home",
    tagline: "Payments, affordability, payoff, refinancing and rent-vs-buy decisions.",
    metaTitle: "Mortgage Calculators — Payment, Affordability, Payoff & Refinance",
    metaDescription:
      "Eight mortgage and home calculators: monthly payment with taxes and insurance, affordability, amortization, early payoff, down payment, refinancing and rent vs buy.",
    introHtml: `
      <p>A mortgage is usually the largest loan you'll ever take, and small differences — half a percent on the rate, one extra payment a year, a 15- instead of 30-year term — compound into five- and six-figure differences in total cost. These calculators isolate each of those decisions. The <a href="/mortgage-calculator/">Mortgage Calculator</a> estimates a complete monthly payment including property tax, home insurance, PMI and HOA fees, not just principal and interest. The <a href="/house-affordability-calculator/">House Affordability Calculator</a> works backwards from your income and debts using the same debt-to-income ratios lenders apply.</p>
      <p>If you already own, the <a href="/mortgage-payoff-calculator/">Mortgage Payoff Calculator</a> and <a href="/refinance-calculator/">Refinance Calculator</a> quantify the two most common questions: what extra payments would save, and whether refinancing actually breaks even after closing costs. And if you're deciding whether to buy at all, the <a href="/rent-vs-buy-calculator/">Rent vs Buy Calculator</a> compares the true multi-year cost of both paths, including the opportunity cost of your down payment.</p>`,
    eduHtml: `
      <h2>What these calculators assume</h2>
      <p>All mortgage tools here model fixed-rate, fully amortizing loans — the standard structure in most markets. Adjustable-rate products, interest-only periods and negative amortization are deliberately out of scope, because their outcomes depend on future rate paths no calculator can honestly predict. Property tax, insurance and maintenance inputs are annual estimates you control; the pages explain typical ranges, but your actual figures depend on location and property. Every result should be read as an estimate to structure your decision, then verified against a lender's official quote or amortization statement.</p>`,
    relatedCategories: ["loans", "savings"],
  },
  {
    id: "investment",
    short: "Investing",
    title: "Investment Calculators",
    path: "/investment-calculators/",
    icon: "chart",
    tagline: "Compound growth, SIPs, future value, returns and investment planning.",
    metaTitle: "Investment Calculators — Compound Interest, SIP, ROI & Future Value",
    metaDescription:
      "Seven investment calculators: compound interest, investment growth, SIP, lump sum, future value, present value and ROI — with year-by-year tables and charts.",
    introHtml: `
      <p>Investment mathematics is mostly one idea — compound growth — viewed from different angles. The <a href="/compound-interest-calculator/">Compound Interest Calculator</a> is the reference tool: it shows how a starting amount and regular contributions grow, and splits the result into what you put in versus what compounding added. The <a href="/investment-calculator/">Investment Calculator</a> builds on that with inflation adjustment, so you can see results in today's purchasing power. The <a href="/sip-calculator/">SIP Calculator</a> applies the same engine to monthly systematic investment plans, including annual step-ups.</p>
      <p>The remaining tools answer planning questions: <a href="/future-value-calculator/">future value</a> ("what will this be worth?"), <a href="/present-value-calculator/">present value</a> ("what is a future amount worth today?"), and <a href="/roi-calculator/">ROI</a> ("what did this investment actually return, annualized?"). Every calculator states its compounding assumptions explicitly and shows the year-by-year table behind the headline number.</p>`,
    eduHtml: `
      <h2>A note on return assumptions</h2>
      <p>Every projection here is driven by the return rate you enter, and real-world returns are neither fixed nor guaranteed. A sensible way to use these tools is to run three scenarios — conservative, expected and optimistic — and check that your plan survives the conservative one. The scenario comparison feature on each calculator exists for exactly this. Historical long-run averages for diversified equity portfolios are often quoted between 6% and 10% per year before inflation, but past performance does not determine future results, and these pages never assume otherwise.</p>`,
    relatedCategories: ["savings", "personal"],
  },
  {
    id: "savings",
    short: "Savings",
    title: "Savings Calculators",
    path: "/savings-calculators/",
    icon: "piggy",
    tagline: "Savings growth, monthly deposits, goals and simple interest.",
    metaTitle: "Savings Calculators — Growth, Goals, Deposits & Simple Interest",
    metaDescription:
      "Savings calculators for account growth with regular deposits, monthly saving targets to reach a goal, and simple interest — with clear assumptions and tables.",
    introHtml: `
      <p>Saving differs from investing mainly in certainty: savings accounts and deposits pay a stated rate, so the mathematics here produces firmer answers than any market projection. The <a href="/savings-calculator/">Savings Calculator</a> models an account balance growing with regular deposits and compound interest, and can tell you when you'll reach a target. The <a href="/monthly-investment-calculator/">Monthly Investment Calculator</a> inverts the question — enter the goal and the timeframe, and it solves for the monthly amount required. The <a href="/simple-interest-calculator/">Simple Interest Calculator</a> covers the cases where interest doesn't compound: some fixed deposits, short-term lending and many bond coupons.</p>
      <h3>Which one fits your question?</h3>
      <ul>
        <li><strong>"I can save X per month. Where will I be in N years?"</strong> Start with the <a href="/savings-calculator/">Savings Calculator</a>. Enter your balance, deposit and the account's APY; set a goal amount if you have one and it will mark the month you cross it.</li>
        <li><strong>"I need X by a certain date. How much must I put away?"</strong> That inverse problem belongs to the <a href="/monthly-investment-calculator/">Monthly Investment Calculator</a>, which also shows how sharply the required amount falls when you add time.</li>
        <li><strong>"My deposit pays interest that doesn't reinvest."</strong> Use the <a href="/simple-interest-calculator/">Simple Interest Calculator</a>, which also quantifies what reinvesting the same rate would add.</li>
        <li><strong>"Should this money be saved or invested at all?"</strong> For horizons under a few years, or money you cannot afford to see dip, a stated savings rate usually wins the decision; the guide on <a href="/guides/how-inflation-affects-savings/">inflation and savings</a> covers the trade-off, and the <a href="/investment-calculators/">investment calculators</a> handle the market side.</li>
      </ul>`,
    eduHtml: `
      <h2>Why the compounding detail matters</h2>
      <p>Two accounts advertising the same nominal rate can pay different amounts depending on how often interest is credited — daily, monthly, quarterly or yearly. The savings tools let you set the compounding frequency and show the effect directly. For short horizons the difference is small; over a decade it is visible. When comparing real accounts, look for the effective annual yield (APY/AER), which already includes compounding, and use that figure here for the most accurate projection.</p>`,
    relatedCategories: ["investment", "personal"],
  },
  {
    id: "personal",
    short: "Personal Finance",
    title: "Personal Finance Calculators",
    path: "/personal-finance-calculators/",
    icon: "wallet",
    tagline: "Budgeting and debt payoff strategies for everyday money decisions.",
    metaTitle: "Personal Finance Calculators — Budgeting & Debt Payoff",
    metaDescription:
      "Personal finance calculators: build a 50/30/20 budget from your income, and plan multi-debt payoff with snowball vs avalanche comparison, timelines and interest totals.",
    introHtml: `
      <p>These tools deal with the money decisions that don't involve a bank quote: how to allocate income, and how to sequence debt repayment. The <a href="/budget-calculator/">Budget Calculator</a> turns your take-home pay into a concrete monthly plan using the 50/30/20 rule as a starting point, with every category adjustable. The <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> takes a real list of debts — each with its own balance, rate and minimum payment — and simulates the snowball and avalanche strategies month by month, so you can see the actual difference in payoff date and interest paid rather than guessing.</p>
      <h3>Where to start</h3>
      <p>The two tools are designed to be used in sequence. Run the <a href="/budget-calculator/">budget</a> first: its "savings &amp; debt" slice is the number that feeds everything else, and the page shows what that slice implies for an emergency fund timeline. If you carry more than one debt, take that monthly amount straight into the <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> as your extra payment and compare both payoff strategies with your real balances — the difference between them is often smaller than expected, and seeing your own numbers settles the argument quickly. For a single loan rather than a set of debts, the <a href="/loan-payoff-calculator/">Loan Payoff Calculator</a> and <a href="/extra-payment-calculator/">Extra Payment Calculator</a> in the loans section answer the same questions with loan-specific detail. Two guides pair well with this page: <a href="/guides/debt-snowball-vs-debt-avalanche/">snowball vs avalanche</a> and <a href="/guides/how-much-emergency-fund/">how much emergency fund you need</a>.</p>`,
    eduHtml: `
      <h2>Strategy beats intensity</h2>
      <p>With multiple debts, the order of repayment changes the total interest you pay even when the monthly budget stays identical. The avalanche method (highest interest rate first) is mathematically optimal; the snowball method (smallest balance first) often wins in practice because early payoffs keep people motivated. The debt payoff calculator shows both side by side with your real numbers — for many debt profiles the difference is smaller than expected, which is itself useful to know: the best strategy is the one you'll stick with.</p>`,
    relatedCategories: ["loans", "savings"],
  },
];

/* Homepage: most popular tools (order matters) */
export const popular = [
  "loan-calculator",
  "mortgage-calculator",
  "compound-interest-calculator",
  "emi-calculator",
  "sip-calculator",
  "debt-payoff-calculator",
  "house-affordability-calculator",
  "rent-vs-buy-calculator",
];

/* Homepage: featured comparison tools */
export const featuredComparisons = [
  "loan-comparison-calculator",
  "rent-vs-buy-calculator",
  "extra-payment-calculator",
  "refinance-calculator",
];

/* “What are you trying to do?” task cards */
export const tasks = [
  { label: "Buy a home", href: "/house-affordability-calculator/", icon: "home" },
  { label: "Compare two loan offers", href: "/loan-comparison-calculator/", icon: "scale" },
  { label: "Pay off debt faster", href: "/debt-payoff-calculator/", icon: "target" },
  { label: "Grow my savings", href: "/compound-interest-calculator/", icon: "sprout" },
  { label: "Start investing monthly", href: "/sip-calculator/", icon: "calendar" },
  { label: "Plan a big purchase", href: "/savings-calculator/", icon: "piggy" },
  { label: "Pay off my mortgage early", href: "/mortgage-payoff-calculator/", icon: "bolt" },
  { label: "Understand a return", href: "/roi-calculator/", icon: "chart" },
];

/* header nav */
export const nav = [
  { label: "Calculators", href: "/calculators/" },
  { label: "Guides", href: "/guides/" },
  { label: "Methodology", href: "/methodology/" },
  { label: "About", href: "/about/" },
];

/* footer link groups (calculator slugs resolved at build) */
export const footer = {
  groups: [
    {
      title: "Popular calculators",
      links: [
        ["Loan Calculator", "/loan-calculator/"],
        ["Mortgage Calculator", "/mortgage-calculator/"],
        ["EMI Calculator", "/emi-calculator/"],
        ["Compound Interest", "/compound-interest-calculator/"],
        ["SIP Calculator", "/sip-calculator/"],
        ["Debt Payoff", "/debt-payoff-calculator/"],
      ],
    },
    {
      title: "Categories",
      links: [
        ["Loan Calculators", "/loan-calculators/"],
        ["Mortgage & Home", "/mortgage-calculators/"],
        ["Investment", "/investment-calculators/"],
        ["Savings", "/savings-calculators/"],
        ["Personal Finance", "/personal-finance-calculators/"],
        ["All calculators", "/calculators/"],
      ],
    },
    {
      title: "Finance Calculator X",
      links: [
        ["About", "/about/"],
        ["Methodology", "/methodology/"],
        ["Editorial policy", "/editorial-policy/"],
        ["Corrections", "/corrections-policy/"],
        ["Guides", "/guides/"],
        ["Contact", "/contact/"],
      ],
    },
    {
      title: "Legal",
      links: [
        ["Financial disclaimer", "/disclaimer/"],
        ["Privacy policy", "/privacy-policy/"],
        ["Terms of use", "/terms-of-use/"],
      ],
    },
  ],
};
