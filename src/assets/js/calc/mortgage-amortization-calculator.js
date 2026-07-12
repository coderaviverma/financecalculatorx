/* Mortgage Amortization Calculator — dated schedule, principal/interest crossover, cumulative split. */
FCX.define({
  slug: "mortgage-amortization-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 320000, min: 1000, max: 1000000000 },
    { id: "rate", label: "Interest rate", type: "percent", default: 6.25, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    { id: "term", label: "Loan term", type: "term", default: 360, min: 12, max: 480 },
    {
      id: "startMonth", label: "First payment month", type: "select", default: 7,
      options: [
        { v: 1, label: "January" }, { v: 2, label: "February" }, { v: 3, label: "March" }, { v: 4, label: "April" },
        { v: 5, label: "May" }, { v: 6, label: "June" }, { v: 7, label: "July" }, { v: 8, label: "August" },
        { v: 9, label: "September" }, { v: 10, label: "October" }, { v: 11, label: "November" }, { v: 12, label: "December" },
      ],
    },
    { id: "startYear", label: "First payment year", type: "number", default: 2026, min: 1990, max: 2100, integer: true },
    { id: "extra", label: "Extra monthly payment", type: "currency", default: 0, min: 0, max: 10000000, optional: true, hint: "Optional — applied straight to principal each month; the schedule and crossover update to match." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const am = FIN.amortize(v.amount, v.rate, v.term, { startYear: v.startYear, startMonth: v.startMonth, extraMonthly: v.extra || 0 });
    if (!am) return { invalid: "This mortgage never pays off at these values. Check the rate and term." };
    const dateOf = (r) => F.monthName(r.month) + " " + r.year;
    const cross = am.rows.find((r) => r.principal > r.interest);
    const last = am.rows[am.rows.length - 1];
    const bal5 = am.months > 60 ? am.rows[59].balance : 0;
    const y1 = am.rows.slice(0, 12);
    const y1Int = y1.reduce((s, r) => s + r.interest, 0);
    const y1Pri = y1.reduce((s, r) => s + r.principal, 0);

    // cumulative principal vs interest by schedule year
    const annual = FIN.annualize(am.rows);
    let cumP = 0, cumI = 0;
    const xs = [], sP = [], sI = [];
    annual.forEach((a) => { cumP += a.principal; cumI += a.interest; xs.push("Y" + a.i); sP.push(cumP); sI.push(cumI); });

    const monthlyRows = am.rows.map((r) => ({
      n: r.i, date: dateOf(r), pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_date: r.year + "-" + String(r.month).padStart(2, "0"), _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    }));
    const annualRows = annual.map((a) => {
      const first = am.rows[(a.i - 1) * 12];
      const lastRow = am.rows[Math.min(a.i * 12 - 1, am.rows.length - 1)];
      return {
        n: "Year " + a.i, date: dateOf(first) + " – " + dateOf(lastRow), pay: F.money(a.payment), pri: F.money(a.principal), int: F.money(a.interest), bal: F.money(a.balance),
        _csv_n: a.i, _csv_date: first.year + "-" + String(first.month).padStart(2, "0"), _csv_pay: a.payment, _csv_pri: a.principal, _csv_int: a.interest, _csv_bal: a.balance,
      };
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "date", label: "Date", align: "left" }, { key: "pay", label: "Payment" },
      { key: "pri", label: "Principal" }, { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];

    return {
      primary: {
        label: "Monthly payment",
        value: F.money(am.payment + (v.extra || 0)),
        sub: v.extra > 0
          ? `${F.money(am.payment)} required + ${F.money(v.extra)} extra, starting ${F.monthName(v.startMonth, "long")} ${v.startYear}`
          : `principal & interest, starting ${F.monthName(v.startMonth, "long")} ${v.startYear}`,
      },
      metrics: [
        { label: "Total interest", value: F.money0(am.totalInterest), hint: "over " + F.dur(am.months) },
        cross
          ? { label: "Principal/interest crossover", value: dateOf(cross), hint: `payment #${cross.i} of ${am.months} — first month principal exceeds interest` }
          : { label: "Principal/interest crossover", value: "—", hint: "interest exceeds principal for the whole schedule" },
        { label: "Balance after 5 years", value: F.money0(bal5), hint: am.months > 60 ? F.pct((bal5 / v.amount) * 100, 1) + " of the loan still owed" : "paid off within 5 years" },
        { label: "Final payment", value: dateOf(last) },
      ],
      explain: `<p>A <strong>${F.money0(v.amount)}</strong> mortgage at <strong>${F.pct(v.rate)}</strong> over <strong>${F.dur(v.term)}</strong> amortizes at <strong>${F.money(am.payment)}</strong> per month${v.extra > 0 ? ` (you're paying <strong>${F.money(am.payment + v.extra)}</strong> with the extra)` : ""}. In the first year, <strong>${F.money0(y1Int)}</strong> of your payments goes to interest and only <strong>${F.money0(y1Pri)}</strong> to principal.</p><p>${cross ? `The schedule crosses over at payment <strong>#${cross.i}</strong> (<strong>${dateOf(cross)}</strong>) — the first month more of the payment reduces the balance than pays interest.` : "At these values interest stays above principal for the entire schedule."} ${am.months > 60 ? `Five years in you would still owe <strong>${F.money0(bal5)}</strong>.` : ""} The final payment lands in <strong>${dateOf(last)}</strong>, with <strong>${F.money0(am.totalInterest)}</strong> of interest paid in total.</p>`,
      chart: {
        title: "Cumulative principal vs interest",
        note: "Stacked totals per schedule year. Early on the interest band grows faster; the balance shifts as the loan matures.",
        cfg: {
          type: "area",
          aria: "Stacked area chart of cumulative principal repaid and cumulative interest paid over the life of the mortgage",
          x: xs,
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Principal repaid", color: "var(--c1)", values: sP },
            { label: "Interest paid", color: "var(--c2)", values: sI },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `By payoff, ${F.money0(cumP)} of principal is repaid against ${F.money0(cumI)} of interest.`,
        },
      },
      table: {
        title: "Amortization schedule with dates",
        csvName: "mortgage-amortization-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: annualRows },
          { id: "monthly", label: "Monthly", columns: cols, rows: monthlyRows },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)} · from ${F.monthName(v.startMonth)} ${v.startYear}${v.extra > 0 ? " · +" + F.money0(v.extra) + "/mo" : ""}`,
        metrics: [
          { label: "Monthly payment", raw: am.payment + (v.extra || 0), fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: am.totalInterest, fmt: "money0", betterWhen: "lower" },
          { label: "Payoff time", raw: am.months, fmt: "dur", betterWhen: "lower" },
          { label: "Balance after 5 years", raw: bal5, fmt: "money0", betterWhen: "lower" },
        ],
      },
    };
  },
});
