/* EMI Calculator — reducing-balance EMI, total interest, amortization, one-time prepayment. */
FCX.define({
  slug: "emi-calculator",
  suggestCurrency: "INR",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 2500000, min: 1000, max: 1000000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 8.5, min: 0, max: 30, slider: { min: 4, max: 18, step: 0.05 }, tip: "Use the reducing-balance rate in the offer. A flat-rate quote uses a different calculation and is not directly comparable at the same number." },
    { id: "term", label: "Loan tenure", type: "term", default: 240, min: 6, max: 480 },
    { id: "prepay", label: "One-time prepayment", type: "currency", default: 0, min: 0, max: 1000000000, optional: true, hint: "The model applies the usable portion as extra principal. EMI stays fixed; an amount applied before payoff can shorten tenure." },
    { id: "prepayMonth", label: "Prepayment made in month", type: "number", default: 24, min: 1, max: 480, integer: true, affixPost: "month #", showIf: (v) => v.prepay > 0 },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const base = FIN.amortize(v.amount, v.rate, v.term, {});
    if (!base) return { invalid: "This loan never pays off at these values. Check the rate and tenure." };
    const requestedPrepay = v.prepay > 0 ? v.prepay : 0;
    const prepay = Math.min(requestedPrepay, v.amount);
    const pMonth = Math.max(1, Math.round(v.prepayMonth || 1));
    const plan = prepay ? FIN.amortize(v.amount, v.rate, v.term, { extraOnce: prepay, extraOnceMonth: pMonth }) : base;
    if (!plan) return { invalid: "The prepayment plan could not be computed. Check the prepayment amount and month." };
    const actualPrepay = prepay && plan.rows[pMonth - 1] ? plan.rows[pMonth - 1].extra : 0;
    const prepayApplied = actualPrepay > 0.005;
    const prepayDesc = prepayApplied
      ? (Math.abs(actualPrepay - requestedPrepay) <= 0.01 ? F.money0(actualPrepay) : `${F.money0(actualPrepay)} of the requested ${F.money0(requestedPrepay)}`)
      : "";
    const saved = base.totalInterest - plan.totalInterest;
    const monthsSaved = base.months - plan.months;
    const principalShare = plan.totalPaid > 0 ? (v.amount / plan.totalPaid) * 100 : 0;

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Paid" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    return {
      primary: { label: "Monthly EMI", value: F.money(base.payment), sub: `for ${F.dur(v.term)} at ${F.pct(v.rate)} (reducing balance)` },
      metrics: [
        { label: "Total interest", value: F.money(plan.totalInterest) },
        { label: "Total payment", value: F.money(plan.totalPaid), hint: prepayApplied ? "including the applied prepayment" : "EMI schedule total" },
        { label: "Principal share of total payment", value: F.pct(principalShare, 1) },
        requestedPrepay
          ? { label: "Interest saved by prepaying", value: F.money(saved), hint: prepayApplied ? (monthsSaved > 0 ? "loan closes " + F.dur(monthsSaved) + " sooner" : "applied amount does not change the rounded payoff month") : "selected month is the scheduled payoff month, so no extra is applied" }
          : { label: "Loan closes in", value: F.dur(plan.months), hint: "≈ " + F.dateFromNow(plan.months) },
      ],
      explain: `<p>A loan of <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> for <strong>${F.dur(v.term)}</strong> means an EMI of <strong>${F.money(base.payment)}</strong>. Interest over the full tenure comes to <strong>${F.money0(base.totalInterest)}</strong>, so you repay about <strong>${F.num(base.totalPaid / v.amount, 2)}×</strong> the amount borrowed.</p>` +
        (requestedPrepay ? (prepayApplied
          ? `<p>The schedule applies <strong>${prepayDesc}</strong> as extra principal in month ${pMonth}. The EMI stays unchanged, the loan closes in <strong>${F.dur(plan.months)}</strong> instead of ${F.dur(base.months)}, and modeled interest falls by about <strong>${F.money0(saved)}</strong>. Any requested amount beyond the balance then due is not applied.</p>`
          : `<p>The requested <strong>${F.money0(requestedPrepay)}</strong> in month ${pMonth} is not applied as extra because that is already the scheduled payoff payment.</p>`) : ""),
      chart: {
        title: "Principal vs interest over the full tenure",
        note: prepayApplied ? "Interest shown after the applied portion of the one-time prepayment." : "",
        cfg: {
          type: "donut",
          aria: `Donut chart: principal ${F.money0(v.amount)} versus total interest ${F.money0(plan.totalInterest)}`,
          segments: [
            { label: "Principal", value: v.amount, color: "var(--c1)" },
            { label: "Interest", value: plan.totalInterest, color: "var(--c2)" },
          ],
          fmt: F.money0,
          centerLabel: "Total payment",
          centerValue: F.compact(plan.totalPaid),
          summary: `Of the ${F.money0(plan.totalPaid)} repaid in total, ${F.money0(v.amount)} is principal and ${F.money0(plan.totalInterest)} is interest.`,
        },
      },
      table: {
        title: "EMI amortization schedule",
        csvName: "emi-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: FIN.annualize(plan.rows).map((r) => fmtRow(r, "Year " + r.i)) },
          { id: "monthly", label: "Monthly", columns: cols, rows: plan.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)}${prepayApplied ? " · " + prepayDesc + " prepaid @ mo " + pMonth : requestedPrepay ? " · requested prepayment not applied" : ""}`,
        metrics: [
          { label: "Monthly EMI", raw: base.payment, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: plan.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Total payment", raw: plan.totalPaid, fmt: "money", betterWhen: "lower" },
          { label: "Tenure", raw: plan.months, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
