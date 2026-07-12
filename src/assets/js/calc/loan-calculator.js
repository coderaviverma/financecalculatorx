/* Loan Calculator — monthly payment, total interest, amortization, extra payments. */
FCX.define({
  slug: "loan-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 20000, min: 50, max: 100000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 7.5, min: 0, max: 40, slider: { min: 0, max: 20, step: 0.05 }, tip: "The yearly rate your lender quotes. If there are no fees, this equals the APR." },
    { id: "term", label: "Loan term", type: "term", default: 60, min: 3, max: 600 },
    { id: "extra", label: "Extra monthly payment", type: "currency", default: 0, min: 0, max: 10000000, optional: true, hint: "Optional — paid on top of the required payment, straight to principal." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const base = FIN.amortize(v.amount, v.rate, v.term, {});
    if (!base) return { invalid: "This loan never pays off at these values. Shorten the term or check the rate." };
    const extra = v.extra > 0 ? Math.min(v.extra, v.amount) : 0;
    const plan = extra ? FIN.amortize(v.amount, v.rate, v.term, { extraMonthly: extra }) : base;
    const monthly = base.payment + extra;
    const saved = base.totalInterest - plan.totalInterest;

    const monthlyRows = plan.rows.map((r) => ({
      n: r.i, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    }));
    const annualRows = FIN.annualize(plan.rows).map((r) => ({
      n: "Year " + r.i, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    }));
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Payment" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    return {
      primary: { label: "Monthly payment", value: F.money(monthly), sub: extra ? `${F.money(base.payment)} required + ${F.money(extra)} extra` : `for ${F.dur(v.term)} at ${F.pct(v.rate)}` },
      metrics: [
        { label: "Total interest", value: F.money(plan.totalInterest) },
        { label: "Total paid", value: F.money(plan.totalPaid) },
        { label: "Paid off in", value: F.dur(plan.months), hint: "≈ " + F.dateFromNow(plan.months) },
        extra
          ? { label: "Interest saved by extra payments", value: F.money(saved), hint: F.dur(base.months - plan.months) + " sooner" }
          : { label: "Interest as share of total", value: F.pct((plan.totalInterest / plan.totalPaid) * 100, 1) },
      ],
      explain: `<p>Borrowing <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> for <strong>${F.dur(v.term)}</strong> requires a payment of <strong>${F.money(base.payment)}</strong> per month. Over the full schedule you would pay about <strong>${F.money(base.totalInterest)}</strong> in interest — the loan costs roughly <strong>${F.num(base.totalPaid / v.amount, 2)}×</strong> what you borrowed.</p>` +
        (extra ? `<p>Adding <strong>${F.money(extra)}</strong> per month clears the loan in <strong>${F.dur(plan.months)}</strong> instead of ${F.dur(base.months)} and saves about <strong>${F.money(saved)}</strong> in interest.</p>` : ""),
      chart: {
        title: "Where your payments go",
        cfg: {
          type: "donut",
          aria: `Donut chart: principal ${F.money0(v.amount)} versus total interest ${F.money0(plan.totalInterest)}`,
          segments: [
            { label: "Principal", value: v.amount, color: "var(--c1)" },
            { label: "Interest", value: plan.totalInterest, color: "var(--c2)" },
          ],
          fmt: F.money0,
          centerLabel: "Total repaid",
          centerValue: F.compact(plan.totalPaid),
          summary: `Of the ${F.money0(plan.totalPaid)} total repaid, ${F.money0(v.amount)} is principal and ${F.money0(plan.totalInterest)} is interest.`,
        },
      },
      table: {
        title: "Amortization schedule",
        csvName: "loan-amortization",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: annualRows },
          { id: "monthly", label: "Monthly", columns: cols, rows: monthlyRows },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)}${extra ? " · +" + F.money0(extra) + "/mo" : ""}`,
        metrics: [
          { label: "Monthly payment", raw: monthly, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: plan.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Total paid", raw: plan.totalPaid, fmt: "money", betterWhen: "lower" },
          { label: "Payoff time", raw: plan.months, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
