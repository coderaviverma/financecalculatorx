/* Savings Calculator — account balance from deposits + APY, with optional goal date. */
FCX.define({
  slug: "savings-calculator",
  inputs: [
    { id: "balance", label: "Current balance", type: "currency", default: 5000, min: 0, max: 1000000000, optional: true },
    { id: "deposit", label: "Monthly deposit", type: "currency", default: 400, min: 0, max: 100000000, optional: true, hint: "Added at the end of each month." },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 4.2, min: 0, max: 20, slider: { min: 0, max: 10, step: 0.05 }, hint: "Use the account's APY — enter compounding Yearly if you do." },
    { id: "compFreq", label: "Compounding", type: "select", default: 12, options: [ { v: 365, label: "Daily (365/yr)" }, { v: 12, label: "Monthly" }, { v: 1, label: "Yearly" } ] },
    { id: "years", label: "Saving for", type: "number", default: 10, min: 1, max: 60, integer: true, affixPost: "years" },
    { id: "goal", label: "Savings goal", type: "currency", default: 0, min: 0, max: 1000000000, optional: true, hint: "Optional — we'll tell you when you reach it." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.balance > 0) && !(v.deposit > 0)) return { invalid: "Enter a current balance, a monthly deposit, or both." };
    const g = FIN.grow({ principal: v.balance || 0, contribution: v.deposit || 0, contribFreq: 12, annualPct: v.rate, years: v.years, compFreq: +v.compFreq });
    const deposited = (v.balance || 0) + g.totalContrib;
    const eff = FIN.ear(v.rate, +v.compFreq);
    const freqWord = ({ 365: "daily", 12: "monthly", 1: "yearly" })[+v.compFreq];

    const goal = v.goal || 0;
    let goalYears = null, goalMonths = null;
    if (goal > 0) {
      goalYears = FIN.yearsToGoal(goal, v.balance || 0, v.deposit || 0, v.rate); // YEARS or null
      goalMonths = goalYears == null ? null : Math.round(goalYears * 12);
    }

    const metrics = [
      { label: "Total deposited", value: F.money0(deposited), hint: (v.balance > 0 ? F.money0(v.balance) + " today" : "") + (v.balance > 0 && g.totalContrib > 0 ? " + " : "") + (g.totalContrib > 0 ? F.money0(g.totalContrib) + " in deposits" : "") },
      { label: "Interest earned", value: F.money(g.interest) },
      { label: "Effective annual yield", value: F.pct(eff, 3), hint: F.pct(v.rate) + " compounded " + freqWord },
    ];
    if (goal > 0) {
      if (goalMonths != null) {
        metrics.push({ label: "Goal reached in", value: F.dur(goalMonths), hint: F.money0(goal) + " around " + F.dateFromNow(goalMonths) });
      } else {
        metrics.push({ label: "Share of goal reached", value: F.pct((g.fv / goal) * 100, 1), hint: "reaching " + F.money0(goal) + " is beyond 100 years at this pace" });
      }
    }

    // find the first table year the balance crosses the goal
    const goalYearRow = goal > 0 ? (g.rows.find((r) => r.balance >= goal) || {}).year : null;

    const cols = [
      { key: "y", label: "Year", align: "left" }, { key: "d", label: "Deposited" },
      { key: "i", label: "Interest" }, { key: "bal", label: "Balance" },
    ];
    const rows = g.rows.map((r) => ({
      y: r.year === goalYearRow ? r.year + " · goal reached" : r.year,
      d: F.money(r.contrib), i: F.money(r.interest), bal: F.money(r.balance),
      _csv_y: r.year, _csv_d: r.contrib, _csv_i: r.interest, _csv_bal: r.balance,
      ...(r.year === goalYearRow ? { _cls: "year-row" } : {}),
    }));

    let goalNote = "";
    if (goal > 0) {
      goalNote = goalMonths != null
        ? `You cross your ${F.money0(goal)} goal after about ${F.dur(goalMonths)} (${F.dateFromNow(goalMonths)}).`
        : `At this pace, the ${F.money0(goal)} goal stays out of reach for over 100 years — raise the deposit to bring it closer.`;
    }

    return {
      primary: { label: `Balance after ${v.years} years`, value: F.money(g.fv), sub: `saving ${F.money0(v.deposit || 0)}/month at ${F.pct(v.rate)}, compounded ${freqWord}` },
      metrics,
      explain: `<p>Starting from <strong>${F.money0(v.balance || 0)}</strong> and depositing <strong>${F.money0(v.deposit || 0)}</strong> every month at <strong>${F.pct(v.rate)}</strong>, your account grows to about <strong>${F.money0(g.fv)}</strong> in ${v.years} years. You deposit <strong>${F.money0(deposited)}</strong> of that yourself; the remaining <strong>${F.money0(g.interest)}</strong> is interest the bank pays you.</p>${goal > 0 ? `<p>${goalMonths != null ? `Your <strong>${F.money0(goal)}</strong> goal arrives in about <strong>${F.dur(goalMonths)}</strong> — around ${F.dateFromNow(goalMonths)}.` : `Your <strong>${F.money0(goal)}</strong> goal is beyond 100 years at this pace. A bigger monthly deposit moves it far more than a slightly better rate.`}</p>` : ""}`,
      chart: {
        title: "Your deposits vs interest earned",
        note: goalNote,
        cfg: {
          type: "area",
          aria: "Stacked area chart splitting the savings balance into money deposited and interest earned over the years",
          x: g.rows.map((r) => "Y" + r.year),
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Money you deposited", color: "var(--c1)", values: g.rows.map((r) => (v.balance || 0) + r.cumContrib) },
            { label: "Interest earned", color: "var(--c2)", values: g.rows.map((r) => r.cumInterest) },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Balance after ${v.years} years: ${F.money0(g.fv)} — ${F.money0(deposited)} deposited, ${F.money0(g.interest)} interest.${goalNote ? " " + goalNote : ""}`,
        },
      },
      table: {
        title: "Year-by-year savings balance",
        csvName: "savings-projection",
        views: [{ id: "annual", label: "Annual", columns: cols, rows }],
      },
      scenario: {
        summary: `${F.money0(v.balance || 0)} + ${F.money0(v.deposit || 0)}/mo · ${F.pct(v.rate)} · ${v.years}y${goal > 0 ? ` · goal ${F.money0(goal)}` : ""}`,
        metrics: [
          { label: "Final balance", raw: g.fv, fmt: "money", betterWhen: "higher" },
          { label: "Interest earned", raw: g.interest, fmt: "money", betterWhen: "higher" },
          { label: "Months to goal", raw: goal > 0 && goalMonths != null ? goalMonths : null, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
