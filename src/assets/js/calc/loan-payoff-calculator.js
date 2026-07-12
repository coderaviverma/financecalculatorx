/* Loan Payoff Calculator — time to zero on a loan you're already repaying. */
FCX.define({
  slug: "loan-payoff-calculator",
  inputs: [
    { id: "balance", label: "Current loan balance", type: "currency", default: 14000, min: 1, max: 100000000, hint: "The principal you owe today, from your latest statement — not the original loan amount." },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 8.5, min: 0, max: 40, slider: { min: 0, max: 20, step: 0.05 } },
    { id: "payment", label: "Current monthly payment", type: "currency", default: 350, min: 1, max: 10000000, tip: "Only the principal-and-interest portion. Leave out escrow, insurance or fees bundled into what you send." },
    { id: "extra", label: "Extra monthly payment", type: "currency", default: 0, min: 0, max: 10000000, optional: true, hint: "Optional — see how the payoff date moves if you add this each month." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const minPay = (v.balance * v.rate) / 1200;
    if (v.rate > 0 && v.payment <= minPay)
      return { invalid: `At ${F.pct(v.rate)}, interest on ${F.money0(v.balance)} accrues at ${F.money(minPay)} per month, so a ${F.money(v.payment)} payment never reduces the balance. The payment must be above ${F.money(minPay)} — the more above it, the faster the loan ends.` };
    const base = FIN.amortize(v.balance, v.rate, 0, { paymentOverride: v.payment });
    if (!base) return { invalid: "These values never pay the loan off. Check the balance, rate and payment." };
    const extra = v.extra > 0 ? v.extra : 0;
    const plan = extra ? FIN.amortize(v.balance, v.rate, 0, { paymentOverride: v.payment, extraMonthly: extra }) : base;
    const exactMonths = FIN.nper(v.balance, v.rate, v.payment + extra);
    const saved = base.totalInterest - plan.totalInterest;

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Payment" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    const x = [];
    const balAt = (am, m) => (m === 0 ? v.balance : am.rows[m - 1] ? am.rows[m - 1].balance : 0);
    const series = extra
      ? [
          { label: "With the extra payment", color: "var(--c1)", values: [] },
          { label: "Current payment only", color: "var(--c4)", dash: "5 5", values: [] },
        ]
      : [{ label: "Remaining balance", color: "var(--c1)", values: [] }];
    for (let m = 0; m <= base.months; m++) {
      x.push(String(m));
      if (extra) { series[0].values.push(balAt(plan, m)); series[1].values.push(balAt(base, m)); }
      else series[0].values.push(balAt(base, m));
    }

    return {
      primary: {
        label: "Time until paid off",
        value: F.dur(plan.months),
        sub: `${F.money0(v.balance)} at ${F.pct(v.rate)}, paying ${F.money(v.payment + extra)}/month`,
      },
      metrics: [
        { label: "Payoff date", value: F.dateFromNow(plan.months), hint: exactMonths != null ? `${F.num(exactMonths, 1)} months of full payments` : "" },
        { label: "Interest remaining", value: F.money(plan.totalInterest) },
        { label: "Total remaining cost", value: F.money(plan.totalPaid) },
        extra
          ? { label: "Saved by the extra payment", value: F.money(saved), hint: F.dur(base.months - plan.months) + " sooner" }
          : { label: "Interest accruing this month", value: F.money(minPay), hint: F.pct((minPay / v.payment) * 100, 0) + " of your payment" },
      ],
      explain:
        `<p>Your <strong>${F.money0(v.balance)}</strong> balance at <strong>${F.pct(v.rate)}</strong> accrues about <strong>${F.money(minPay)}</strong> of interest per month right now. Paying <strong>${F.money(v.payment + extra)}</strong> a month, the loan is gone in <strong>${F.dur(plan.months)}</strong> (${F.dateFromNow(plan.months)}), with <strong>${F.money(plan.totalInterest)}</strong> of interest still to pay — <strong>${F.money(plan.totalPaid)}</strong> in total. The final installment is smaller than the rest because it only needs to clear what's left.</p>` +
        (extra ? `<p>The <strong>${F.money(extra)}</strong> extra shortens the schedule by <strong>${F.dur(base.months - plan.months)}</strong> and avoids <strong>${F.money(saved)}</strong> of interest compared with keeping the payment at ${F.money(v.payment)}.</p>` : ""),
      chart: {
        title: "Remaining balance, month by month",
        cfg: {
          type: "lines",
          aria: extra
            ? "Line chart of the remaining loan balance over time, comparing the current payment with the current payment plus the extra amount"
            : "Line chart of the remaining loan balance falling to zero over time",
          x,
          xLabel: (m) => (+m === 0 ? "Today" : "Month " + m + " · " + F.dateFromNow(+m)),
          series,
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: extra
            ? `The balance reaches zero at month ${plan.months} with the extra payment, versus month ${base.months} at the current payment alone.`
            : `The balance reaches zero at month ${base.months}.`,
        },
      },
      table: {
        title: "Remaining schedule",
        csvName: "loan-payoff-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: FIN.annualize(plan.rows).map((r) => fmtRow(r, "Year " + r.i)) },
          { id: "monthly", label: "Monthly", columns: cols, rows: plan.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.balance)} · ${F.pct(v.rate)} · ${F.money0(v.payment)}/mo${extra ? " · +" + F.money0(extra) : ""}`,
        metrics: [
          { label: "Payoff time", raw: plan.months, fmt: "dur", betterWhen: "lower" },
          { label: "Interest remaining", raw: plan.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Total cost", raw: plan.totalPaid, fmt: "money", betterWhen: "lower" },
        ],
      },
    };
  },
});
