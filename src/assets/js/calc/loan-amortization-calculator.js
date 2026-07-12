/* Loan Amortization Calculator — dated payment-by-payment schedule with calendar
   months, balance curve, and the principal/interest crossover point. */
FCX.define({
  slug: "loan-amortization-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 200000, min: 100, max: 1000000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 6, min: 0, max: 30, slider: { min: 0, max: 15, step: 0.05 } },
    { id: "term", label: "Loan term", type: "term", default: 240, min: 6, max: 600 },
    { id: "startMonth", label: "First payment month", type: "select", default: 7, options: [
      { v: 1, label: "January" }, { v: 2, label: "February" }, { v: 3, label: "March" }, { v: 4, label: "April" },
      { v: 5, label: "May" }, { v: 6, label: "June" }, { v: 7, label: "July" }, { v: 8, label: "August" },
      { v: 9, label: "September" }, { v: 10, label: "October" }, { v: 11, label: "November" }, { v: 12, label: "December" },
    ] },
    { id: "startYear", label: "First payment year", type: "number", default: 2026, min: 1990, max: 2100, integer: true },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const startYear = Math.round(v.startYear) || F.today().year;
    const startMonth = Math.min(12, Math.max(1, +v.startMonth || 1));
    const am = FIN.amortize(v.amount, v.rate, v.term, { startYear, startMonth });
    if (!am) return { invalid: "This loan never pays off at these values. Check the rate and term." };
    const last = am.rows[am.rows.length - 1];
    const halfIdx = Math.max(0, Math.floor(am.months / 2) - 1);
    const half = am.rows[halfIdx];
    const cross = am.rows.find((r) => r.principal > r.interest);
    const dateOf = (r) => F.monthName(r.month) + " " + r.year;

    const monthlyRows = am.rows.map((r) => ({
      d: dateOf(r), pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_d: r.year + "-" + String(r.month).padStart(2, "0"), _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    }));
    const annual = FIN.annualize(am.rows);
    const annualRows = annual.map((a, i) => {
      const end = am.rows[Math.min((i + 1) * 12, am.months) - 1];
      return {
        d: "Yr " + a.i + " · to " + dateOf(end), pay: F.money(a.payment), pri: F.money(a.principal), int: F.money(a.interest), bal: F.money(a.balance),
        _csv_d: end.year + "-" + String(end.month).padStart(2, "0"), _csv_pay: a.payment, _csv_pri: a.principal, _csv_int: a.interest, _csv_bal: a.balance,
      };
    });
    const cols = [
      { key: "d", label: "Date", align: "left" }, { key: "pay", label: "Payment" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    return {
      primary: { label: "Monthly payment", value: F.money(am.payment), sub: `first payment ${F.monthName(startMonth)} ${startYear}, last ${dateOf(last)}` },
      metrics: [
        { label: "Total interest", value: F.money(am.totalInterest) },
        { label: "Total paid", value: F.money(am.totalPaid), hint: F.num(am.months, 0) + " payments" },
        { label: "Final payment date", value: dateOf(last) },
        { label: "Balance at the halfway point", value: F.money(half.balance), hint: `after payment ${half.i} of ${am.months} (${dateOf(half)})` },
      ],
      explain: `<p>A <strong>${F.money0(v.amount)}</strong> loan at <strong>${F.pct(v.rate)}</strong> over <strong>${F.dur(v.term)}</strong> starting <strong>${F.monthName(startMonth, "long")} ${startYear}</strong> takes a payment of <strong>${F.money(am.payment)}</strong> per month and is cleared in <strong>${dateOf(last)}</strong>.</p>` +
        (cross
          ? `<p>${cross.i === 1 ? "Principal outweighs interest from the very first payment" : `Until payment <strong>#${cross.i}</strong> (${dateOf(cross)}), more of each payment goes to interest than to principal — from that month on, principal takes the larger share`}. At the halfway point (${dateOf(half)}) the balance is still <strong>${F.money0(half.balance)}</strong>, ${F.pct(((v.amount - half.balance) / v.amount) * 100, 1)} of the principal repaid.</p>`
          : ""),
      chart: {
        title: "Remaining balance over the life of the loan",
        cfg: {
          type: "lines",
          aria: `Line chart of the remaining balance falling from ${F.money0(v.amount)} to zero over ${annual.length} years`,
          x: annual.map((a, i) => String(am.rows[Math.min((i + 1) * 12, am.months) - 1].year)),
          xLabel: (x, i) => "End of year " + (i + 1) + " (" + x + ")",
          series: [{ label: "Remaining balance", color: "var(--c1)", values: annual.map((a) => a.balance) }],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `The balance falls slowly at first — ${F.money0(half.balance)} still owed at the halfway point — then accelerates to zero by ${dateOf(last)}.`,
        },
      },
      table: {
        title: "Amortization schedule with dates",
        csvName: "amortization-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: annualRows },
          { id: "monthly", label: "Monthly", columns: cols, rows: monthlyRows },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)} · from ${F.monthName(startMonth)} ${startYear}`,
        metrics: [
          { label: "Monthly payment", raw: am.payment, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: am.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Total paid", raw: am.totalPaid, fmt: "money", betterWhen: "lower" },
          { label: "Payoff time", raw: am.months, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
