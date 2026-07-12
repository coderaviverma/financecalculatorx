/* Extra Payment Calculator — the what-if tool for monthly, yearly and one-time prepayments. */
FCX.define({
  slug: "extra-payment-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 250000, min: 50, max: 1000000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 6.5, min: 0, max: 40, slider: { min: 0, max: 15, step: 0.05 } },
    { id: "term", label: "Loan term", type: "term", default: 360, min: 6, max: 600 },
    { id: "extraMonthly", label: "Extra per month", type: "currency", default: 100, min: 0, max: 10000000, optional: true, hint: "Added to every payment, straight to principal." },
    { id: "extraYearly", label: "Extra per year", type: "currency", default: 0, min: 0, max: 10000000, optional: true, hint: "e.g. a bonus each year — applied every 12th month." },
    { id: "extraOnce", label: "One-time extra payment", type: "currency", default: 0, min: 0, max: 100000000, optional: true },
    { id: "onceMonth", label: "Month of the one-time payment", type: "number", default: 12, min: 1, max: 600, integer: true, showIf: (v) => v.extraOnce > 0, hint: "1 = the first payment month." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const base = FIN.amortize(v.amount, v.rate, v.term, {});
    if (!base) return { invalid: "This loan never pays off at these values. Check the amount, rate and term." };
    const onceMonth = Math.min(Math.max(1, Math.round(v.onceMonth || 1)), v.term);
    const opts = { extraMonthly: v.extraMonthly || 0, extraYearly: v.extraYearly || 0, extraOnce: v.extraOnce || 0, extraOnceMonth: onceMonth };
    const hasExtra = opts.extraMonthly > 0 || opts.extraYearly > 0 || opts.extraOnce > 0;
    const plan = hasExtra ? FIN.amortize(v.amount, v.rate, v.term, opts) : base;
    const saved = Math.max(0, base.totalInterest - plan.totalInterest);
    const monthsSaved = base.months - plan.months;

    const extraBits = [];
    if (opts.extraMonthly > 0) extraBits.push(`${F.money(opts.extraMonthly)} monthly`);
    if (opts.extraYearly > 0) extraBits.push(`${F.money(opts.extraYearly)} yearly`);
    if (opts.extraOnce > 0) extraBits.push(`${F.money(opts.extraOnce)} once in month ${onceMonth}`);

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), xtr: F.money(r.extra), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_xtr: r.extra, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const annualRows = FIN.annualize(plan.rows).map((r, i) => {
      const slice = plan.rows.slice(i * 12, i * 12 + 12);
      const xtr = slice.reduce((s, rr) => s + rr.extra, 0);
      return {
        n: "Year " + r.i, pay: F.money(r.payment), xtr: F.money(xtr), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
        _csv_n: r.i, _csv_pay: r.payment, _csv_xtr: xtr, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
      };
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Total paid" }, { key: "xtr", label: "Extra" },
      { key: "pri", label: "Principal" }, { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    const x = [];
    const balAt = (am, m) => (m === 0 ? v.amount : am.rows[m - 1] ? am.rows[m - 1].balance : 0);
    const series = hasExtra
      ? [
          { label: "With extra payments", color: "var(--c1)", values: [] },
          { label: "Baseline schedule", color: "var(--c4)", dash: "5 5", values: [] },
        ]
      : [{ label: "Loan balance", color: "var(--c1)", values: [] }];
    for (let m = 0; m <= base.months; m++) {
      x.push(String(m));
      if (hasExtra) { series[0].values.push(balAt(plan, m)); series[1].values.push(balAt(base, m)); }
      else series[0].values.push(balAt(base, m));
    }

    return {
      primary: {
        label: "Interest saved",
        value: F.money(saved),
        sub: hasExtra ? `paid off ${F.dur(monthsSaved)} sooner than the ${F.dur(v.term)} schedule` : "enter an extra amount above to see its effect",
      },
      metrics: [
        { label: "New payoff time", value: F.dur(plan.months), hint: "≈ " + F.dateFromNow(plan.months) },
        { label: "Time saved", value: F.dur(monthsSaved) },
        { label: "Baseline total interest", value: F.money(base.totalInterest), hint: "with no extra payments" },
        { label: "New total interest", value: F.money(plan.totalInterest) },
      ],
      explain:
        `<p>Without extras, <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> over <strong>${F.dur(v.term)}</strong> means a <strong>${F.money(base.payment)}</strong> payment and <strong>${F.money(base.totalInterest)}</strong> of interest.</p>` +
        (hasExtra
          ? `<p>Adding <strong>${extraBits.join(" + ")}</strong> — every unit of it applied to principal — ends the loan in <strong>${F.dur(plan.months)}</strong> instead of ${F.dur(base.months)}, cutting interest to <strong>${F.money(plan.totalInterest)}</strong>. That's <strong>${F.money(saved)}</strong> kept, for money you were going to pay toward the loan anyway — just earlier.</p>`
          : `<p>Add a monthly, yearly or one-time extra amount and this page shows the interest it removes and the months it cuts from the schedule.</p>`),
      chart: {
        title: "Balance over time: baseline vs with extras",
        cfg: {
          type: "lines",
          aria: "Line chart comparing the loan balance under the baseline schedule with the balance when extra payments are added",
          x,
          xLabel: (m) => (+m === 0 ? "Start" : "Month " + m + " · " + F.dateFromNow(+m)),
          series,
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: hasExtra
            ? `With extras the balance hits zero at month ${plan.months}; the baseline schedule runs to month ${base.months}.`
            : `The baseline balance reaches zero at month ${base.months}.`,
        },
      },
      table: {
        title: "Accelerated schedule",
        csvName: "extra-payment-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: annualRows },
          { id: "monthly", label: "Monthly", columns: cols, rows: plan.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)}${extraBits.length ? " · +" + extraBits.join(", ") : ""}`,
        metrics: [
          { label: "Interest saved", raw: saved, fmt: "money", betterWhen: "higher" },
          { label: "Months saved", raw: monthsSaved, fmt: "dur", betterWhen: "higher" },
          { label: "Total interest", raw: plan.totalInterest, fmt: "money", betterWhen: "lower" },
        ],
      },
    };
  },
});
