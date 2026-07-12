/* Debt Payoff Calculator — multi-debt snowball vs avalanche simulation. */
FCX.define({
  slug: "debt-payoff-calculator",
  inputs: [
    {
      id: "debts", label: "Your debts", type: "debts",
      default: [
        { name: "Credit card", balance: 8000, apr: 22.9, min: 200 },
        { name: "Car loan", balance: 12000, apr: 9.5, min: 280 },
        { name: "Personal loan", balance: 5000, apr: 14, min: 150 },
      ],
      hint: "Balance, annual rate and required minimum payment for each debt.",
    },
    { id: "extra", label: "Extra amount per month", type: "currency", default: 300, min: 0, max: 10000000, optional: true, hint: "Budget beyond the minimums. As debts clear, their minimums roll into this too." },
    { id: "method", label: "Payoff strategy", type: "segment", default: "avalanche", options: [ { v: "avalanche", label: "Avalanche (highest rate first)" }, { v: "snowball", label: "Snowball (smallest first)" } ] },
  ],
  scenario: true,
  compute(v, F) {
    const FIN = F.fin;
    const debts = (v.debts || []).map((d) => ({ name: d.name || "Debt", balance: d.balance, apr: d.apr, minPayment: d.min }));
    if (!debts.length) return { invalid: "Add at least one debt." };
    const chosen = FIN.debtPlan(debts, v.extra || 0, v.method);
    if (chosen.error === "min") return { invalid: `The minimum payment on “${chosen.debt}” doesn't cover its monthly interest — the balance would grow forever. Increase that minimum.` };
    if (chosen.error === "cap") return { invalid: "These debts take more than 100 years to clear. Increase the payments." };
    const other = FIN.debtPlan(debts, v.extra || 0, v.method === "avalanche" ? "snowball" : "avalanche");
    const minOnly = FIN.debtPlan(debts, 0, v.method);
    const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
    const methodName = v.method === "avalanche" ? "avalanche" : "snowball";
    const otherName = v.method === "avalanche" ? "snowball" : "avalanche";
    const firstPaid = chosen.perDebt.slice().sort((a, b) => a.payoffMonth - b.payoffMonth)[0];

    const planCols = [
      { key: "d", label: "Debt", align: "left" }, { key: "bal", label: "Balance" }, { key: "apr", label: "APR" },
      { key: "min", label: "Min. payment" }, { key: "ord", label: "Extra goes" }, { key: "paid", label: "Paid off" },
    ];
    const planRows = debts.map((d, i) => {
      const pd = chosen.perDebt.find((x) => x.name === d.name) || {};
      const ord = chosen.order.indexOf(d.name) + 1;
      return {
        d: F.esc(d.name), bal: F.money0(d.balance), apr: F.pct(d.apr), min: F.money0(d.minPayment),
        ord: ord === 1 ? "1st" : ord === 2 ? "2nd" : ord === 3 ? "3rd" : ord + "th",
        paid: "Month " + pd.payoffMonth + " (" + F.dateFromNow(pd.payoffMonth) + ")",
        _csv_d: d.name, _csv_bal: d.balance, _csv_apr: d.apr, _csv_min: d.minPayment, _csv_ord: ord, _csv_paid: pd.payoffMonth,
      };
    });
    const tlCols = [
      { key: "m", label: "Month", align: "left" }, { key: "paid", label: "Paid" }, { key: "int", label: "Interest accrued" }, { key: "bal", label: "Remaining debt" },
    ];
    const tlRows = chosen.timeline.map((r) => ({
      m: r.m + " · " + F.dateFromNow(r.m), paid: F.money(r.paid), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_m: r.m, _csv_paid: r.paid, _csv_int: r.interest, _csv_bal: r.balance,
    }));

    const maxM = Math.max(chosen.months, other.months, minOnly.months);
    const series = [
      { label: methodName[0].toUpperCase() + methodName.slice(1) + " (chosen)", color: "var(--c1)", values: [] },
      { label: otherName[0].toUpperCase() + otherName.slice(1), color: "var(--c3)", values: [] },
      { label: "Minimums only", color: "var(--c4)", dash: "5 5", values: [] },
    ];
    const x = [];
    for (let m = 0; m <= maxM; m++) {
      x.push(String(m));
      series[0].values.push(m === 0 ? totalDebt : chosen.timeline[m - 1] ? chosen.timeline[m - 1].balance : 0);
      series[1].values.push(m === 0 ? totalDebt : other.timeline[m - 1] ? other.timeline[m - 1].balance : 0);
      series[2].values.push(m === 0 ? totalDebt : minOnly.timeline[m - 1] ? minOnly.timeline[m - 1].balance : 0);
    }

    return {
      primary: { label: "Debt-free in", value: F.dur(chosen.months), sub: `${F.money0(totalDebt)} across ${debts.length} debt${debts.length > 1 ? "s" : ""} · debt-free ${F.dateFromNow(chosen.months)}` },
      metrics: [
        { label: "Total interest (" + methodName + ")", value: F.money(chosen.totalInterest) },
        { label: "Saved vs minimums only", value: F.money(Math.max(0, minOnly.totalInterest - chosen.totalInterest)), hint: F.dur(Math.max(0, minOnly.months - chosen.months)) + " sooner" },
        { label: "First win", value: F.esc(firstPaid.name), hint: "paid off month " + firstPaid.payoffMonth },
        { label: otherName + " would cost", value: F.money(other.totalInterest), hint: other.months === chosen.months ? "same payoff time" : F.dur(other.months) },
      ],
      explain: `<p>Paying the minimums plus <strong>${F.money0(v.extra || 0)}</strong> a month with the <strong>${methodName}</strong> method clears all <strong>${F.money0(totalDebt)}</strong> in <strong>${F.dur(chosen.months)}</strong> with <strong>${F.money(chosen.totalInterest)}</strong> of interest. Extra money targets ${v.method === "avalanche" ? "the highest-rate debt first, which minimizes total interest" : "the smallest balance first, which produces the quickest first payoff"} — here that's <strong>${F.esc(chosen.order[0])}</strong>.</p><p>${other.totalInterest.toFixed(0) === chosen.totalInterest.toFixed(0) ? `Both strategies cost about the same for these debts.` : `The ${otherName} method on the same budget would cost <strong>${F.money(other.totalInterest)}</strong>${other.months !== chosen.months ? ` over ${F.dur(other.months)}` : ""} — a difference of <strong>${F.money(Math.abs(other.totalInterest - chosen.totalInterest))}</strong>.`} Minimum payments alone would take <strong>${F.dur(minOnly.months)}</strong> and <strong>${F.money(minOnly.totalInterest)}</strong> of interest.</p>`,
      chart: {
        title: "Remaining debt, month by month",
        cfg: {
          type: "lines",
          aria: "Line chart of remaining debt over time comparing the chosen strategy, the alternative strategy and minimum payments only",
          x,
          xLabel: (m) => (+m === 0 ? "Start" : "Month " + m + " · " + F.dateFromNow(+m)),
          series,
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Debt reaches zero at month ${chosen.months} with the ${methodName} method, versus ${minOnly.months} with minimums only.`,
        },
      },
      table: {
        title: "Your payoff plan",
        csvName: "debt-payoff-plan",
        views: [
          { id: "plan", label: "Payoff order", columns: planCols, rows: planRows },
          { id: "timeline", label: "Monthly timeline", columns: tlCols, rows: tlRows },
        ],
      },
      scenario: {
        summary: `${debts.length} debts · ${F.money0(totalDebt)} · +${F.money0(v.extra || 0)}/mo · ${methodName}`,
        metrics: [
          { label: "Debt-free in", raw: chosen.months, fmt: "dur", betterWhen: "lower" },
          { label: "Total interest", raw: chosen.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Total paid", raw: chosen.totalPaid, fmt: "money", betterWhen: "lower" },
        ],
      },
    };
  },
});
