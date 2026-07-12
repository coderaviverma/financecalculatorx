/* Early Loan Payoff Calculator — pick a payoff deadline, get the required payment. */
FCX.define({
  slug: "early-loan-payoff-calculator",
  inputs: [
    { id: "balance", label: "Current loan balance", type: "currency", default: 18000, min: 1, max: 100000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 7.5, min: 0, max: 40, slider: { min: 0, max: 20, step: 0.05 } },
    { id: "payment", label: "Current monthly payment", type: "currency", default: 380, min: 1, max: 10000000, hint: "What you pay toward principal and interest today." },
    { id: "target", label: "Target payoff time", type: "term", default: 36, min: 1, max: 600, tip: "How long from now you want the loan fully gone. The result is the payment that makes it happen." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const required = FIN.pmt(v.balance, v.rate, v.target);
    if (!isFinite(required) || required <= 0) return { invalid: "These values don't produce a payment. Check the balance and target." };
    const tgt = FIN.amortize(v.balance, v.rate, v.target, {});
    if (!tgt) return { invalid: "The target plan never pays off at these values. Check the rate and target." };
    const minPay = (v.balance * v.rate) / 1200;
    const curMonths = FIN.nper(v.balance, v.rate, v.payment);
    const cur = curMonths != null ? FIN.amortize(v.balance, v.rate, 0, { paymentOverride: v.payment }) : null;
    const extraNeeded = Math.max(0, required - v.payment);
    const alreadyMet = required <= v.payment;
    const savedInt = cur ? Math.max(0, cur.totalInterest - tgt.totalInterest) : null;

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Payment" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    const series = [];
    if (cur) series.push({ label: `Current pace (${F.money(v.payment)}/mo)`, color: "var(--c4)", values: [cur.totalInterest] });
    series.push({ label: `Target plan (${F.money(required)}/mo)`, color: "var(--c1)", values: [tgt.totalInterest] });

    return {
      primary: {
        label: "Required monthly payment",
        value: F.money(required),
        sub: `pays off ${F.money0(v.balance)} at ${F.pct(v.rate)} in ${F.dur(v.target)} (${F.dateFromNow(tgt.months)})`,
      },
      metrics: [
        {
          label: "Extra needed per month",
          value: F.money(extraNeeded),
          hint: alreadyMet ? "your current payment already meets this target" : `on top of your ${F.money(v.payment)} payment`,
        },
        { label: "Interest with the target plan", value: F.money(tgt.totalInterest) },
        {
          label: "Interest at current payment",
          value: cur ? F.money(cur.totalInterest) : "—",
          hint: cur ? `paid off in ${F.dur(cur.months)}` : `never pays off — ${F.money(v.payment)} doesn't cover the ${F.money(minPay)} monthly interest`,
        },
        { label: "Interest saved", value: savedInt != null ? F.money(savedInt) : "—", hint: savedInt != null && savedInt > 0 ? "by switching to the target plan" : "" },
      ],
      explain:
        `<p>To clear <strong>${F.money0(v.balance)}</strong> at <strong>${F.pct(v.rate)}</strong> in exactly <strong>${F.dur(v.target)}</strong>, pay <strong>${F.money(required)}</strong> per month. That plan costs <strong>${F.money(tgt.totalInterest)}</strong> in interest and ends around <strong>${F.dateFromNow(tgt.months)}</strong>.</p>` +
        (alreadyMet && cur
          ? `<p>You already beat this target: at your current <strong>${F.money(v.payment)}</strong> payment the loan is gone in <strong>${F.dur(cur.months)}</strong>, sooner than the deadline you picked. Keep the payment where it is, or pick a shorter target.</p>`
          : cur
            ? `<p>That's <strong>${F.money(extraNeeded)}</strong> more than you pay now. Staying at <strong>${F.money(v.payment)}</strong> would take <strong>${F.dur(cur.months)}</strong> and cost <strong>${F.money(cur.totalInterest)}</strong> in interest, so hitting the deadline keeps <strong>${F.money(savedInt)}</strong> in your pocket.</p>`
            : `<p>Your current <strong>${F.money(v.payment)}</strong> payment doesn't cover the <strong>${F.money(minPay)}</strong> of interest that accrues each month, so at that pace the loan never pays off. The required payment above is still the answer: it amortizes the balance to zero on your deadline regardless of where the payment stands today.</p>`),
      chart: {
        title: "Total interest: current pace vs target plan",
        note: cur ? "" : "No bar is shown for the current pace because the payment never amortizes the loan.",
        cfg: {
          type: "bars",
          aria: "Bar chart comparing total interest paid at the current payment with total interest under the target payoff plan",
          x: ["Total interest"],
          series,
          fmt: F.money,
          fmtAxis: F.compact,
          summary: cur
            ? `Interest totals ${F.money(cur.totalInterest)} at the current pace versus ${F.money(tgt.totalInterest)} on the target plan.`
            : `The target plan costs ${F.money(tgt.totalInterest)} in interest; the current payment never pays the loan off.`,
        },
      },
      table: {
        title: "Schedule at the required payment",
        csvName: "early-payoff-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: FIN.annualize(tgt.rows).map((r) => fmtRow(r, "Year " + r.i)) },
          { id: "monthly", label: "Monthly", columns: cols, rows: tgt.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.balance)} · ${F.pct(v.rate)} · gone in ${F.dur(v.target)}`,
        metrics: [
          { label: "Required payment", raw: required, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: tgt.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Payoff time", raw: tgt.months, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
