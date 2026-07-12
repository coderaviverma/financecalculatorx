/* Monthly Investment Calculator — goal solver: target amount → required monthly investment. */
FCX.define({
  slug: "monthly-investment-calculator",
  inputs: [
    { id: "target", label: "Target amount", type: "currency", default: 100000, min: 1, max: 1000000000 },
    { id: "years", label: "Years to reach it", type: "number", default: 10, min: 1, max: 60, integer: true, affixPost: "years" },
    { id: "rate", label: "Expected annual return", type: "percent", default: 7, min: 0, max: 30, slider: { min: 0, max: 15, step: 0.1 }, hint: "Match this to what you'd actually hold — cash rates for short goals, market averages only for long ones." },
    { id: "principal", label: "Current savings toward it", type: "currency", default: 5000, min: 0, max: 1000000000, optional: true },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.target > 0)) return { invalid: "Enter the target amount you're saving toward." };
    const principal = v.principal || 0;
    const months = v.years * 12;
    const req = FIN.contributionForGoal(v.target, principal, v.rate, v.years, 12);
    const funded = req <= 0;
    const totalContrib = req * months;
    const growthPart = Math.max(0, v.target - principal - totalContrib);
    const growthShare = (growthPart / v.target) * 100;
    const rLo = FIN.contributionForGoal(v.target, principal, Math.max(0, v.rate - 2), v.years, 12);
    const rHi = FIN.contributionForGoal(v.target, principal, v.rate + 2, v.years, 12);
    const projected = funded ? FIN.grow({ principal, contribution: 0, annualPct: v.rate, years: v.years, compFreq: 12 }).fv : 0;

    const metrics = funded
      ? [
          { label: "Projected value of current savings", value: F.money0(projected), hint: `${F.money0(principal)} at ${F.pct(v.rate)} for ${v.years} years` },
          { label: "Projected surplus", value: F.money0(projected - v.target), hint: "beyond the " + F.money0(v.target) + " target" },
          { label: "Total you'll contribute", value: F.money0(0), hint: "the goal is already funded" },
        ]
      : [
          { label: "Total you'll contribute", value: F.money0(totalContrib), hint: `${F.money(req)} × ${months} months` },
          { label: "Growth does the rest", value: F.money0(growthPart), hint: "returns on your savings and contributions" },
          { label: "Share funded by growth", value: F.pct(growthShare, 1), hint: "of the " + F.money0(v.target) + " target" },
          { label: "Required at ±2% return", value: `${F.money0(rLo)} / ${F.money0(rHi)}`, hint: `if returns run at ${F.pct(Math.max(0, v.rate - 2), 1)} or ${F.pct(v.rate + 2, 1)} instead` },
        ];

    // sensitivity bars: required monthly at 3/5/7/9/11%
    const barRates = [3, 5, 7, 9, 11];
    const barVals = barRates.map((r) => FIN.contributionForGoal(v.target, principal, r, v.years, 12));

    // timeline table at the entered return
    const timelines = [5, 8, 10, 15, 20];
    const cols = [
      { key: "y", label: "Years", align: "left" }, { key: "m", label: "Monthly needed" },
      { key: "tc", label: "Total contributed" }, { key: "gr", label: "Growth contribution" },
    ];
    const rows = timelines.map((y) => {
      const c = FIN.contributionForGoal(v.target, principal, v.rate, y, 12);
      const tc = c * y * 12;
      const gr = Math.max(0, v.target - principal - tc);
      return {
        y: y + (y === v.years ? " · your timeline" : ""), m: F.money(c), tc: F.money0(tc), gr: F.money0(gr),
        _csv_y: y, _csv_m: c, _csv_tc: tc, _csv_gr: gr,
        ...(y === v.years ? { _cls: "year-row" } : {}),
      };
    });

    return {
      primary: funded
        ? { label: "Required monthly investment", value: F.money(0), sub: `your ${F.money0(principal)} already grows past ${F.money0(v.target)} in ${v.years} years` }
        : { label: "Required monthly investment", value: F.money(req), sub: `to reach ${F.money0(v.target)} in ${v.years} years at ${F.pct(v.rate)}` },
      metrics,
      explain: funded
        ? `<p>Good news — you don't need to add anything. Your current <strong>${F.money0(principal)}</strong> growing at <strong>${F.pct(v.rate)}</strong> projects to <strong>${F.money0(projected)}</strong> in ${v.years} years, a surplus of <strong>${F.money0(projected - v.target)}</strong> over your <strong>${F.money0(v.target)}</strong> target. You could stop here, shorten the timeline, or aim the surplus at the next goal.</p>`
        : `<p>To reach <strong>${F.money0(v.target)}</strong> in ${v.years} years at <strong>${F.pct(v.rate)}</strong>, invest <strong>${F.money(req)}</strong> every month${principal > 0 ? ` on top of your <strong>${F.money0(principal)}</strong> head start` : ""}. Your contributions total <strong>${F.money0(totalContrib)}</strong>; growth covers <strong>${F.money0(growthPart)}</strong> — <strong>${F.pct(growthShare, 1)}</strong> of the target.</p><p>If returns land 2% lower, the required amount rises to <strong>${F.money(rLo)}</strong>; 2% higher trims it to <strong>${F.money(rHi)}</strong>. Budget for the lower-return case and let good years surprise you.</p>`,
      chart: {
        title: "Required monthly at different returns",
        note: `Bars use your ${F.money0(v.target)} target, ${v.years}-year timeline and ${F.money0(principal)} starting savings — only the return assumption changes.`,
        cfg: {
          type: "bars",
          aria: "Bar chart of the required monthly investment at 3, 5, 7, 9 and 11 percent expected returns",
          x: barRates.map((r) => r + "%"),
          xLabel: (x) => x + " return",
          series: [{ label: "Monthly needed", color: "var(--c1)", values: barVals }],
          fmt: F.money,
          fmtAxis: F.money0,
          summary: `Required monthly for ${F.money0(v.target)} in ${v.years} years: ${barRates.map((r, i) => F.money0(barVals[i]) + " at " + r + "%").join(", ")}.`,
        },
      },
      table: {
        title: `Same goal, different timelines (at ${F.pct(v.rate)})`,
        csvName: "monthly-investment-timelines",
        views: [{ id: "timelines", label: "Timelines", columns: cols, rows }],
      },
      scenario: {
        summary: `${F.money0(v.target)} in ${v.years}y · ${F.pct(v.rate)} · ${F.money0(principal)} start`,
        metrics: [
          { label: "Required monthly", raw: funded ? 0 : req, fmt: "money", betterWhen: "lower" },
          { label: "Total contributed", raw: funded ? 0 : totalContrib, fmt: "money0", betterWhen: "lower" },
          { label: "Share funded by growth", raw: funded ? 100 : growthShare, fmt: "pct", betterWhen: "higher" },
        ],
      },
    };
  },
});
