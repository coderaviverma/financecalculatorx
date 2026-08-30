/* Mortgage Payoff Calculator — existing loan, extra monthly and/or lump sum, interest saved. */
FCX.define({
  slug: "mortgage-payoff-calculator",
  inputs: [
    { id: "balance", label: "Current loan balance", type: "currency", default: 240000, min: 100, max: 1000000000, hint: "The remaining principal from your latest statement — not the original loan amount." },
    { id: "rate", label: "Interest rate", type: "percent", default: 6, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    { id: "remaining", label: "Time remaining", type: "term", default: 264, min: 6, max: 480 },
    { id: "extra", label: "Extra monthly payment", type: "currency", default: 200, min: 0, max: 10000000, optional: true },
    { id: "lump", label: "One-time lump sum", type: "currency", default: 0, min: 0, max: 1000000000, optional: true, hint: "A single prepayment — a bonus, inheritance or savings you want to put against the loan." },
    { id: "lumpMonth", label: "Lump sum paid in", type: "number", default: 1, min: 1, max: 480, integer: true, affixPost: "months from now", showIf: (v) => v.lump > 0 },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const base = FIN.amortize(v.balance, v.rate, v.remaining, {});
    if (!base) return { invalid: "This balance never pays off at these values. Check the rate and time remaining." };
    const monthlyExtra = v.extra || 0, requestedLump = v.lump || 0;
    const lumpMonth = Math.max(1, Math.round(v.lumpMonth || 1));
    const requestedAny = monthlyExtra > 0 || requestedLump > 0;
    const acc = requestedAny
      ? FIN.amortize(v.balance, v.rate, v.remaining, { extraMonthly: monthlyExtra, extraOnce: requestedLump, extraOnceMonth: lumpMonth })
      : base;
    if (!acc) return { invalid: "The accelerated plan could not be computed. Check the extra payment values." };
    const lumpRow = requestedLump > 0 ? acc.rows[lumpMonth - 1] : null;
    const actualLump = lumpRow ? Math.max(0, lumpRow.extra - Math.min(monthlyExtra, lumpRow.extra)) : 0;
    const lumpApplied = actualLump > 0.005;
    const hasExtra = monthlyExtra > 0 || lumpApplied;
    const ignoredLump = requestedLump > 0 && !lumpApplied;
    const saved = Math.max(0, base.totalInterest - acc.totalInterest);
    const monthsSaved = Math.max(0, base.months - acc.months);

    // remaining balance by year, both plans
    const yrs = Math.ceil(base.months / 12);
    const balAt = (rows, m) => (m <= 0 ? v.balance : m - 1 < rows.length ? rows[m - 1].balance : 0);
    const xs = [], bBase = [], bAcc = [];
    for (let y = 0; y <= yrs; y++) { xs.push("Y" + y); bBase.push(balAt(base.rows, y * 12)); bAcc.push(balAt(acc.rows, y * 12)); }

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Payment" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];
    const lumpDesc = lumpApplied
      ? (Math.abs(actualLump - requestedLump) <= 0.01
          ? `${F.money0(actualLump)} lump sum in month ${lumpMonth}`
          : `${F.money0(actualLump)} of the requested ${F.money0(requestedLump)} lump sum in month ${lumpMonth}`)
      : "";
    const extraDesc = [monthlyExtra > 0 ? `up to ${F.money(monthlyExtra)}/mo extra` : "", lumpDesc].filter(Boolean).join(" + ");
    const lumpNote = ignoredLump
      ? ` The requested ${F.money0(requestedLump)} lump sum in month ${lumpMonth} is not applied because the modeled loan is already paid off.`
      : requestedLump > actualLump + 0.01
        ? ` The remaining requested lump amount is not needed once the balance reaches zero.`
        : "";

    return {
      primary: {
        label: "Interest saved",
        value: F.money(saved),
        sub: hasExtra ? `with ${extraDesc} — debt-free ${F.dur(monthsSaved)} sooner` : ignoredLump ? "the selected lump month falls after the modeled payoff" : "add an extra monthly payment or a lump sum above to see the effect",
      },
      metrics: [
        { label: "New payoff date", value: F.dateFromNow(acc.months), hint: F.dur(acc.months) + " from now" },
        { label: "Time cut from the loan", value: hasExtra ? F.dur(monthsSaved) : "—", hint: ignoredLump ? "the requested lump sum is after payoff and is not applied" : "" },
        { label: "Interest remaining (current plan)", value: F.money0(base.totalInterest) },
        { label: "Interest remaining (new plan)", value: F.money0(acc.totalInterest) },
      ],
      explain: `<p>Staying on schedule, your <strong>${F.money0(v.balance)}</strong> balance at <strong>${F.pct(v.rate)}</strong> takes <strong>${F.dur(base.months)}</strong> to clear at <strong>${F.money(base.payment)}</strong>/month, costing <strong>${F.money0(base.totalInterest)}</strong> more in interest.</p>` +
        (hasExtra
          ? `<p>Adding ${extraDesc} pays it off in <strong>${F.dur(acc.months)}</strong> — <strong>${F.dur(monthsSaved)}</strong> early — and trims modeled interest to <strong>${F.money0(acc.totalInterest)}</strong>, a difference of <strong>${F.money0(saved)}</strong>. Prepaid principal stops accruing modeled loan interest at the entered rate; actual benefit can differ with penalties, fees or tax treatment.${lumpNote}</p>`
          : requestedAny
            ? `<p>The requested prepayment does not change the schedule.${lumpNote}</p>`
            : `<p>Because modeled interest accrues on the balance every month, an applied prepayment can shorten the schedule and reduce total interest. Enter an amount above to calculate the difference.</p>`),
      chart: {
        title: "Remaining balance: current plan vs accelerated",
        cfg: {
          type: "lines",
          aria: "Line chart comparing the remaining mortgage balance under the current plan and with extra payments",
          x: xs,
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Current plan", color: "var(--c5)", dash: "5 5", values: bBase },
            { label: "With extra payments", color: "var(--c1)", values: bAcc },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: hasExtra
            ? `The accelerated plan reaches zero ${F.dur(monthsSaved)} before the current plan.`
            : `Both lines are identical until you add an extra payment.`,
        },
      },
      table: {
        title: hasExtra ? "Accelerated payoff schedule" : "Payoff schedule (current plan)",
        csvName: "mortgage-payoff-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: FIN.annualize(acc.rows).map((r) => fmtRow(r, "Year " + r.i)) },
          { id: "monthly", label: "Monthly", columns: cols, rows: acc.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.balance)} @ ${F.pct(v.rate)} · ${F.dur(v.remaining)} left${hasExtra ? " · " + extraDesc : ignoredLump ? " · requested lump not applied" : ""}`,
        metrics: [
          { label: "Interest saved", raw: saved, fmt: "money0", betterWhen: "higher" },
          { label: "Time saved", raw: monthsSaved, fmt: "dur", betterWhen: "higher" },
          { label: "New total interest", raw: acc.totalInterest, fmt: "money0", betterWhen: "lower" },
        ],
      },
    };
  },
});
