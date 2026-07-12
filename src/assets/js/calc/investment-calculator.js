/* Investment Calculator — growth with contributions, inflation-adjusted (real) results. */
FCX.define({
  slug: "investment-calculator",
  inputs: [
    { id: "initial", label: "Initial investment", type: "currency", default: 10000, min: 0, max: 1000000000, optional: true },
    { id: "monthly", label: "Monthly contribution", type: "currency", default: 500, min: 0, max: 100000000, optional: true },
    { id: "rate", label: "Expected annual return", type: "percent", default: 8, min: 0, max: 30, slider: { min: 0, max: 15, step: 0.1 }, hint: "Before inflation. Long-run diversified equity averages are often quoted at 6–10%." },
    { id: "years", label: "Investment horizon", type: "number", default: 25, min: 1, max: 60, integer: true, affixPost: "years" },
    { id: "inflation", label: "Expected inflation", type: "percent", default: 3, min: 0, max: 20, optional: true, hint: "Used to show results in today's purchasing power." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.initial > 0) && !(v.monthly > 0)) return { invalid: "Enter an initial investment, a monthly contribution, or both." };
    const g = FIN.grow({ principal: v.initial || 0, contribution: v.monthly || 0, annualPct: v.rate, years: v.years });
    const invested = (v.initial || 0) + g.totalContrib;
    const real = FIN.inflationAdjust(g.fv, v.inflation || 0, v.years);
    const realRate = ((1 + v.rate / 100) / (1 + (v.inflation || 0) / 100) - 1) * 100;

    const cols = [
      { key: "y", label: "Year", align: "left" }, { key: "inv", label: "Total invested" }, { key: "gr", label: "Total growth" },
      { key: "bal", label: "Balance" }, { key: "real", label: "In today's money" },
    ];
    const rows = g.rows.map((r) => {
      const rl = FIN.inflationAdjust(r.balance, v.inflation || 0, r.year);
      return {
        y: r.year, inv: F.money0((v.initial || 0) + r.cumContrib), gr: F.money0(r.cumInterest), bal: F.money0(r.balance), real: F.money0(rl),
        _csv_y: r.year, _csv_inv: (v.initial || 0) + r.cumContrib, _csv_gr: r.cumInterest, _csv_bal: r.balance, _csv_real: Math.round(rl),
      };
    });

    return {
      primary: { label: "Projected value", value: F.money0(g.fv), sub: `after ${v.years} years at ${F.pct(v.rate)} average annual return` },
      metrics: [
        { label: "Total invested", value: F.money0(invested) },
        { label: "Investment growth", value: F.money0(g.interest), hint: F.num(g.fv / Math.max(invested, 1), 1) + "× your money in" },
        { label: "In today's money", value: F.money0(real), hint: "adjusted for " + F.pct(v.inflation || 0, 1) + " inflation" },
        { label: "Real annual return", value: F.pct(realRate, 2), hint: "return after inflation" },
      ],
      explain: `<p>Investing <strong>${F.money0(v.initial || 0)}</strong> now${v.monthly > 0 ? ` plus <strong>${F.money0(v.monthly)}</strong> a month` : ""} at an average <strong>${F.pct(v.rate)}</strong> return projects to about <strong>${F.money0(g.fv)}</strong> in ${v.years} years — <strong>${F.money0(invested)}</strong> of deposits and <strong>${F.money0(g.interest)}</strong> of growth.</p><p>Because prices rise too, that future balance would buy what <strong>${F.money0(real)}</strong> buys today at ${F.pct(v.inflation || 0, 1)} inflation. Planning with the inflation-adjusted number keeps goals honest.</p>`,
      chart: {
        title: "Nominal balance, money invested, and real value",
        cfg: {
          type: "lines",
          aria: "Line chart comparing nominal balance, total invested and inflation-adjusted value over time",
          x: g.rows.map((r) => "Y" + r.year),
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Balance", color: "var(--c1)", values: g.rows.map((r) => r.balance) },
            { label: "In today's money", color: "var(--c2)", values: g.rows.map((r) => FIN.inflationAdjust(r.balance, v.inflation || 0, r.year)) },
            { label: "Total invested", color: "var(--c5)", dash: "5 5", values: g.rows.map((r) => (v.initial || 0) + r.cumContrib) },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `After ${v.years} years: balance ${F.money0(g.fv)}, invested ${F.money0(invested)}, worth ${F.money0(real)} in today's money.`,
        },
      },
      table: {
        title: "Year-by-year projection",
        csvName: "investment-projection",
        views: [{ id: "annual", label: "Annual", columns: cols, rows }],
      },
      scenario: {
        summary: `${F.money0(v.initial || 0)} + ${F.money0(v.monthly || 0)}/mo · ${F.pct(v.rate)} · ${v.years}y · ${F.pct(v.inflation || 0, 1)} infl.`,
        metrics: [
          { label: "Projected value", raw: g.fv, fmt: "money0", betterWhen: "higher" },
          { label: "Total invested", raw: invested, fmt: "money0", betterWhen: null },
          { label: "Growth", raw: g.interest, fmt: "money0", betterWhen: "higher" },
          { label: "In today's money", raw: real, fmt: "money0", betterWhen: "higher" },
        ],
      },
    };
  },
});
