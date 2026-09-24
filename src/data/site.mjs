/* Finance Calculator X — site configuration, categories, homepage data. */

export const site = {
  name: "Finance Calculator X",
  shortName: "FCX",
  domain: "financecalculatorx.com",
  origin: "https://financecalculatorx.com",
  tagline: "Clear calculators for everyday financial decisions",
  description:
    "Free calculators for loans, mortgages, investing, savings and debt, with charts, schedules, worked examples and transparent formulas.",
  email: "contact@financecalculatorx.com",
  launched: "2026-07",
  lastModified: {
    home: "2026-08-30",
    calculators: "2026-08-30",
    guides: "2026-08-30",
  },
  // GA4 is loaded only after the visitor explicitly allows optional analytics.
  ga4: "G-CB5GWN9DQ9",
  // Monetization stays fail-closed. A build with ads enabled is rejected unless
  // a real publisher ID and certified-CMP confirmation are both supplied.
  adsense: {
    // Verification only: emits the google-adsense-account meta + ads.txt.
    // The ad loader stays off until certifiedCmp and adsEnabled are both true.
    publisherId: "pub-2380122589133794",
    certifiedCmp: false,
    adsEnabled: false,
  },
  // Site-verification meta tokens (used as a fallback to DNS/import verification).
  verify: { google: "", bing: "3927796E5F967AB56978D556F0DA2418" },
};

export const categories = [
  {
    id: "loans",
    short: "Loans",
    title: "Loan Calculators",
    path: "/loan-calculators/",
    lastModified: "2026-08-30",
    icon: "loan",
    tagline: "Work through payments, interest, repayment schedules and payoff options.",
    metaTitle: "Loan Calculators — Payments, Interest, Amortization & Payoff",
    metaDescription:
      "Ten loan calculators covering monthly payments, EMI, total interest, amortization schedules, extra payments, early payoff and side-by-side loan comparison.",
    introHtml: `
      <p>These calculators cover different stages of a fixed-rate loan. Use the <a href="/loan-calculator/">Loan Calculator</a> for a new loan's payment, total interest and full schedule. If you already know the question you need to answer, use the more focused tools: the <a href="/extra-payment-calculator/">Extra Payment Calculator</a> measures the effect of paying more each month, the <a href="/loan-payoff-calculator/">Loan Payoff Calculator</a> estimates when a current balance will clear, and the <a href="/loan-comparison-calculator/">Loan Comparison Calculator</a> compares two offers on the same amount.</p>
      <p>The tools model fixed-rate borrowing with monthly reducing-balance interest. Actual products may instead use daily accrual or different fee, compounding and rounding rules. Compare the assumptions on the calculator page with the agreement or statement for the product being modeled.</p>`,
    eduHtml: `
      <h2>How to get the most out of these calculators</h2>
      <p>A monthly payment only tells part of the story. Two offers can have similar payments and quite different interest totals once the term and fees are included. Keep the amount borrowed the same when you compare offers, then change the rate, term and fees one at a time. The comparison calculator also shows when accrued interest savings first recover a higher upfront fee, including remaining principal in its early-payoff comparison and excluding settlement charges.</p>
      <p>For an existing loan, try an extra monthly payment and look at both the new payoff date and the interest saved. The <a href="/early-loan-payoff-calculator/">Early Loan Payoff Calculator</a> works in the other direction: choose a target date and it estimates the payment needed to reach it.</p>`,
    relatedCategories: ["mortgage", "personal"],
  },
  {
    id: "mortgage",
    short: "Mortgage",
    title: "Mortgage & Home Calculators",
    path: "/mortgage-calculators/",
    lastModified: "2026-08-30",
    icon: "home",
    tagline: "Estimate home costs, affordability, refinancing and early payoff.",
    metaTitle: "Mortgage Calculators — Payment, Affordability, Payoff & Refinance",
    metaDescription:
      "Eight mortgage and home calculators: monthly payment with taxes and insurance, affordability, amortization, early payoff, down payment, refinancing and rent vs buy.",
    introHtml: `
      <p>A mortgage can stay with you for decades, so a modest change in the rate, term or extra payment can materially change the final cost. The <a href="/mortgage-calculator/">Mortgage Calculator</a> estimates principal, interest, property tax, home insurance, PMI and HOA fees together. The <a href="/house-affordability-calculator/">House Affordability Calculator</a> starts with income and current debts to estimate a price range from debt-to-income limits.</p>
      <p>If you already own, the <a href="/mortgage-payoff-calculator/">Mortgage Payoff Calculator</a> models how extra payments change the schedule, while the <a href="/refinance-calculator/">Refinance Calculator</a> compares payment and modeled cost after entered closing costs. The <a href="/rent-vs-buy-calculator/">Rent vs Buy Calculator</a> compares the selected multi-year cash flows for both paths, including an assumed return on cash not used for a down payment.</p>`,
    eduHtml: `
      <h2>What these calculators assume</h2>
      <p>All mortgage tools here model fixed-rate, fully amortizing loans. Adjustable-rate products, interest-only periods and negative amortization are out of scope because they require assumptions this model does not collect. Property tax, insurance and maintenance inputs are estimates controlled by the user; actual figures depend on the property, product and jurisdiction. The results describe the entered scenario and can be compared with an official quote or amortization statement.</p>`,
    relatedCategories: ["loans", "savings"],
  },
  {
    id: "investment",
    short: "Investing",
    title: "Investment Calculators",
    path: "/investment-calculators/",
    lastModified: "2026-08-30",
    icon: "chart",
    tagline: "Explore compound growth, regular investing, future value and returns.",
    metaTitle: "Investment Calculators — Compound Interest, SIP, ROI & Future Value",
    metaDescription:
      "Eight investment calculators: compound interest, investment growth, SIP, lump sum, future value, present value, ROI and simple interest — with year-by-year tables and charts.",
    introHtml: `
      <p>Most of the tools here use compound-growth math, but they answer different planning questions. The <a href="/compound-interest-calculator/">Compound Interest Calculator</a> separates your deposits from the growth on them. The <a href="/investment-calculator/">Investment Calculator</a> also adjusts the result for inflation, while the <a href="/sip-calculator/">SIP Calculator</a> handles monthly systematic investment plans and optional annual step-ups.</p>
      <p>The remaining tools answer planning questions: <a href="/future-value-calculator/">future value</a> ("what will this be worth?"), <a href="/present-value-calculator/">present value</a> ("what is a future amount worth today?"), and <a href="/roi-calculator/">ROI</a> ("what did this investment actually return, annualized?"). Every calculator states its compounding assumptions explicitly and shows the year-by-year table behind the headline number.</p>`,
    eduHtml: `
      <h2>A note on return assumptions</h2>
      <p>Every projection depends on the return rate entered, while real investment returns change from year to year and are not guaranteed. Comparing a lower, middle and higher assumption shows how sensitive the result is; none of those scenarios is a forecast.</p>`,
    relatedCategories: ["savings", "personal"],
  },
  {
    id: "savings",
    short: "Savings",
    title: "Savings Calculators",
    path: "/savings-calculators/",
    lastModified: "2026-08-30",
    icon: "piggy",
    tagline: "Plan regular deposits, savings goals and interest growth.",
    metaTitle: "Savings Calculators — Growth, Goals, Deposits & Simple Interest",
    metaDescription:
      "Savings calculators for account growth with regular deposits, monthly saving targets to reach a goal, and simple interest — with clear assumptions and tables.",
    introHtml: `
      <p>Savings products quote a rate, which makes them easier to model than market investments, although the rate can still change. The <a href="/savings-calculator/">Savings Calculator</a> combines an opening balance, regular deposits and compound interest, and can estimate when you will reach a target. The <a href="/monthly-investment-calculator/">Monthly Investment Calculator</a> starts with the target and timeframe instead. For a product that pays interest without adding it back to the balance, use the <a href="/simple-interest-calculator/">Simple Interest Calculator</a>.</p>
      <h2>Which one fits your question?</h2>
      <ul>
        <li><strong>"I can save X per month. Where will I be in N years?"</strong> Start with the <a href="/savings-calculator/">Savings Calculator</a>. Enter your balance, deposit and annual rate (with Yearly compounding if using APY); set a goal amount if you have one and it will mark the month you cross it.</li>
        <li><strong>"I need X by a certain date. How much must I put away?"</strong> That inverse problem belongs to the <a href="/monthly-investment-calculator/">Monthly Investment Calculator</a>, which also shows how sharply the required amount falls when you add time.</li>
        <li><strong>"My deposit pays interest that doesn't reinvest."</strong> Use the <a href="/simple-interest-calculator/">Simple Interest Calculator</a>, which also quantifies what reinvesting the same rate would add.</li>
        <li><strong>"How do saving and investing assumptions differ?"</strong> The guide on <a href="/guides/how-inflation-affects-savings/">inflation and savings</a> explains the purchasing-power trade-off, while the <a href="/investment-calculators/">investment calculators</a> model uncertain return assumptions rather than an account's stated rate.</li>
      </ul>`,
    eduHtml: `
      <h2>Why the compounding detail matters</h2>
      <p>In the model, the same nominal rate can produce different balances when interest is credited daily, monthly, quarterly or yearly. The savings tools expose that frequency so its effect is visible. If a real product quotes an effective annual yield such as APY or AER, note that it already incorporates compounding; do not combine that yield with an additional compounding assumption without checking the product's definition.</p>`,
    relatedCategories: ["investment", "personal"],
  },
  {
    id: "personal",
    short: "Personal Finance",
    title: "Personal Finance Calculators",
    path: "/personal-finance-calculators/",
    lastModified: "2026-08-30",
    icon: "wallet",
    tagline: "Build a workable budget and compare ways to repay debt.",
    metaTitle: "Personal Finance Calculators — Budgeting & Debt Payoff",
    metaDescription:
      "Personal finance calculators: build a 50/30/20 budget from your income, and plan multi-debt payoff with snowball vs avalanche comparison, timelines and interest totals.",
    introHtml: `
      <p>These two tools cover income allocation and multi-debt repayment. The <a href="/budget-calculator/">Budget Calculator</a> uses the 50/30/20 rule as an editable starting point, not a required split. The <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> uses each balance, rate and minimum payment to compare snowball and avalanche repayment month by month.</p>
      <h2>Where to start</h2>
      <p>The tools can be used in sequence without prescribing an allocation. The <a href="/budget-calculator/">budget calculator</a> turns an editable income split into monthly amounts. One of those amounts can then be entered as an extra payment in the <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> to compare both repayment methods with the same balances and budget. For a single loan rather than a set of debts, the <a href="/loan-payoff-calculator/">Loan Payoff Calculator</a> and <a href="/extra-payment-calculator/">Extra Payment Calculator</a> provide loan-specific schedules. Related guides cover <a href="/guides/debt-snowball-vs-debt-avalanche/">snowball vs avalanche</a> and <a href="/guides/how-much-emergency-fund/">emergency-fund scenario sizing</a>.</p>`,
    eduHtml: `
      <h2>Choosing a repayment order</h2>
      <p>With multiple debts, the repayment order can change total modeled interest even when the monthly budget stays the same. Directing extra money to the highest-rate balance minimizes interest under the calculator's fixed-rate, no-new-charges assumptions. Starting with the smallest balance can produce an earlier first account payoff. The comparison reports both schedules; behavioral and product-specific considerations remain outside the model.</p>`,
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
