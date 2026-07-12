/* Loan Comparison Calculator — two offers on one amount: payment, total cost, effective APR. */
FCX.define({
  slug: "loan-comparison-calculator",
  scenario: false,
  inputs: [
    { id: "amount", label: "Loan amount (both offers)", type: "currency", default: 20000, min: 50, max: 100000000, hint: "Compare offers on the same amount — differences in payment and cost then come only from the offers themselves." },
    { id: "rateA", label: "Offer A — interest rate", type: "percent", default: 8.9, min: 0, max: 40, slider: { min: 0, max: 25, step: 0.05 } },
    { id: "termA", label: "Offer A — term", type: "term", default: 60, min: 3, max: 600 },
    { id: "feesA", label: "Offer A — upfront fees", type: "currency", default: 0, min: 0, max: 10000000, optional: true, hint: "Origination, processing or documentation fees." },
    { id: "rateB", label: "Offer B — interest rate", type: "percent", default: 7.4, min: 0, max: 40, slider: { min: 0, max: 25, step: 0.05 } },
    { id: "termB", label: "Offer B — term", type: "term", default: 60, min: 3, max: 600 },
    { id: "feesB", label: "Offer B — upfront fees", type: "currency", default: 500, min: 0, max: 10000000, optional: true },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const feesA = v.feesA || 0, feesB = v.feesB || 0;
    if (feesA >= v.amount || feesB >= v.amount) return { invalid: "Fees can't equal or exceed the loan amount — check the fee inputs." };
    const A = FIN.amortize(v.amount, v.rateA, v.termA, {});
    const B = FIN.amortize(v.amount, v.rateB, v.termB, {});
    if (!A || !B) return { invalid: "One of the offers never pays off at these values. Check the rates and terms." };
    const costA = A.totalInterest + feesA;
    const costB = B.totalInterest + feesB;

    // Effective APR: the rate at which the payment stream discounts to the net
    // proceeds (amount minus fees) — the fees-deducted-from-proceeds convention.
    const effApr = (payment, months, net) => {
      let lo = 0, hi = 200;
      for (let i = 0; i < 100; i++) {
        const mid = (lo + hi) / 2;
        if (FIN.principalFromPayment(payment, mid, months) > net) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    };
    const aprA = effApr(A.payment, v.termA, v.amount - feesA);
    const aprB = effApr(B.payment, v.termB, v.amount - feesB);

    const diff = costA - costB;
    const winner = Math.abs(diff) < 0.005 ? null : diff > 0 ? "B" : "A";
    const payDiff = A.payment - B.payment;
    const payWinner = Math.abs(payDiff) < 0.005 ? null : payDiff > 0 ? "B" : "A";

    // Break-even: the cheaper offer carries higher upfront fees — find the first
    // month its cumulative cost (fees + payments made so far) drops below the other's.
    let breakEven = null;
    if (winner && (winner === "A" ? feesA > feesB : feesB > feesA)) {
      let cumA = feesA, cumB = feesB;
      const maxM = Math.max(A.months, B.months);
      for (let m = 1; m <= maxM && breakEven === null; m++) {
        cumA += A.rows[m - 1] ? A.rows[m - 1].payment : 0;
        cumB += B.rows[m - 1] ? B.rows[m - 1].payment : 0;
        if ((winner === "B" ? cumB : cumA) < (winner === "B" ? cumA : cumB)) breakEven = m;
      }
    }

    const sd = (val, fmt) => (Math.abs(val) < 0.005 ? "—" : (val > 0 ? "+" : "−") + fmt(Math.abs(val)));
    const cols = [
      { key: "m", label: "Metric", align: "left" }, { key: "a", label: "Offer A" },
      { key: "b", label: "Offer B" }, { key: "d", label: "A − B" },
    ];
    const rows = [
      { m: "Monthly payment", a: F.money(A.payment), b: F.money(B.payment), d: sd(payDiff, F.money), _csv_m: "monthly_payment", _csv_a: A.payment, _csv_b: B.payment, _csv_d: payDiff },
      { m: "Total interest", a: F.money(A.totalInterest), b: F.money(B.totalInterest), d: sd(A.totalInterest - B.totalInterest, F.money), _csv_m: "total_interest", _csv_a: A.totalInterest, _csv_b: B.totalInterest, _csv_d: A.totalInterest - B.totalInterest },
      { m: "Fees", a: F.money(feesA), b: F.money(feesB), d: sd(feesA - feesB, F.money), _csv_m: "fees", _csv_a: feesA, _csv_b: feesB, _csv_d: feesA - feesB },
      { m: "Total cost (interest + fees)", a: F.money(costA), b: F.money(costB), d: sd(diff, F.money), _csv_m: "total_cost", _csv_a: costA, _csv_b: costB, _csv_d: diff },
      { m: "Effective APR (with fees)", a: F.pct(aprA, 2), b: F.pct(aprB, 2), d: sd(aprA - aprB, (x) => F.pct(x, 2)), _csv_m: "effective_apr", _csv_a: aprA, _csv_b: aprB, _csv_d: aprA - aprB },
      { m: "Payoff time", a: F.dur(A.months), b: F.dur(B.months), d: A.months === B.months ? "—" : `Offer ${A.months < B.months ? "A" : "B"} ends ${F.dur(Math.abs(A.months - B.months))} sooner`, _csv_m: "payoff_months", _csv_a: A.months, _csv_b: B.months, _csv_d: A.months - B.months },
    ];

    return {
      primary: {
        label: "Total cost difference",
        value: F.money(Math.abs(diff)),
        sub: winner ? `Offer ${winner} costs less overall (interest + fees)` : "both offers cost the same overall",
      },
      metrics: [
        { label: "Monthly payment — Offer A", value: F.money(A.payment), hint: `${F.pct(v.rateA)} · ${F.dur(v.termA)}` },
        { label: "Monthly payment — Offer B", value: F.money(B.payment), hint: `${F.pct(v.rateB)} · ${F.dur(v.termB)}` },
        { label: "Total cost — Offer A", value: F.money(costA), hint: `${F.money(A.totalInterest)} interest + ${F.money0(feesA)} fees` },
        { label: "Total cost — Offer B", value: F.money(costB), hint: `${F.money(B.totalInterest)} interest + ${F.money0(feesB)} fees` },
      ],
      explain:
        `<p>On <strong>${F.money0(v.amount)}</strong>, Offer A (${F.pct(v.rateA)}, ${F.dur(v.termA)}${feesA ? ", " + F.money0(feesA) + " fees" : ""}) costs <strong>${F.money(A.payment)}</strong>/month and <strong>${F.money(costA)}</strong> in interest and fees combined. Offer B (${F.pct(v.rateB)}, ${F.dur(v.termB)}${feesB ? ", " + F.money0(feesB) + " fees" : ""}) costs <strong>${F.money(B.payment)}</strong>/month and <strong>${F.money(costB)}</strong> all-in. Counting fees against the money you actually receive, the effective APR is <strong>${F.pct(aprA, 2)}</strong> for A and <strong>${F.pct(aprB, 2)}</strong> for B.</p>` +
        `<p>${winner ? `<strong>Offer ${winner}</strong> is the cheaper loan overall, by <strong>${F.money(Math.abs(diff))}</strong>.` : `The two offers cost the same overall at these inputs.`}` +
        (winner && payWinner && payWinner !== winner ? ` Note the split verdict: Offer ${payWinner} has the lower monthly payment while Offer ${winner} costs less in total — a lower payment stretched over more months is not a cheaper loan.` : "") +
        (v.termA !== v.termB ? ` The terms differ (${F.dur(v.termA)} vs ${F.dur(v.termB)}), so the totals cover different lengths of time — weigh the total cost against how long each offer keeps a payment in your budget.` : "") +
        (breakEven ? ` Offer ${winner} starts behind because of its higher upfront fees; its lower payments recover that gap by <strong>month ${breakEven}</strong> (${F.dateFromNow(breakEven)}). If you'd repay or refinance before then, the other offer would work out cheaper.` : "") +
        `</p>`,
      chart: {
        title: "Offer A vs Offer B",
        note: "Monthly payment is shown on the same money scale as the totals, so its bars are small — hover for exact values.",
        cfg: {
          type: "bars",
          aria: "Grouped bar chart comparing monthly payment, total interest and total cost for the two loan offers",
          x: ["Monthly payment", "Total interest", "Total cost"],
          series: [
            { label: "Offer A", color: "var(--c1)", values: [A.payment, A.totalInterest, costA] },
            { label: "Offer B", color: "var(--c2)", values: [B.payment, B.totalInterest, costB] },
          ],
          fmt: F.money,
          fmtAxis: F.compact,
          summary: `Offer A: ${F.money(A.payment)}/month, ${F.money(costA)} total cost. Offer B: ${F.money(B.payment)}/month, ${F.money(costB)} total cost.`,
        },
      },
      table: {
        title: "Side-by-side comparison",
        csvName: "loan-comparison",
        views: [{ id: "compare", label: "Comparison", columns: cols, rows }],
      },
    };
  },
});
