/* Future Value Calculator — TVM future value of a lump sum plus contributions, end or beginning timing. */
FCX.define({
  slug: "future-value-calculator",
  inputs: [
    { id: "present", label: "Present amount", type: "currency", default: 5000, min: 0, max: 1000000000, optional: true, hint: "Money you have today." },
    { id: "contribution", label: "Monthly contribution", type: "currency", default: 250, min: 0, max: 100000000, optional: true },
    { id: "timing", label: "Contribution timing", type: "segment", default: "end", options: [ { v: "end", label: "End of month" }, { v: "begin", label: "Beginning of month" } ], showIf: (v) => v.contribution > 0, hint: "Beginning-of-month contributions earn one extra month of interest each." },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 7, min: 0, max: 50, slider: { min: 0, max: 15, step: 0.1 } },
    { id: "years", label: "Years", type: "number", default: 15, min: 1, max: 60, integer: true, affixPost: "years" },
    { id: "compFreq", label: "Compounding", type: "select", default: 12, options: [ { v: 12, label: "Monthly" }, { v: 4, label: "Quarterly" }, { v: 1, label: "Yearly" } ] },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.present > 0) && !(v.contribution > 0)) return { invalid: "Enter a present amount, a monthly contribution, or both." };
    const timing = v.timing === "begin" ? "begin" : "end";
    const m = +v.compFreq || 12;
    const g = FIN.grow({ principal: v.present || 0, contribution: v.contribution || 0, annualPct: v.rate, years: v.years, compFreq: m, timing });
    const fvLump = FIN.fvLump(v.present || 0, v.rate, v.years, m);
    const fvContrib = g.fv - fvLump;
    const contributed = (v.present || 0) + g.totalContrib;

    const milestones = [5, 10, 15, 20, 25];
    const barVals = milestones.map((y) => FIN.grow({ principal: v.present || 0, contribution: v.contribution || 0, annualPct: v.rate, years: y, compFreq: m, timing }).fv);

    const rows = g.rows.map((r) => ({
      y: r.year, c: F.money(r.contrib), i: F.money(r.interest), ti: F.money(r.cumInterest), bal: F.money(r.balance),
      _csv_y: r.year, _csv_c: r.contrib, _csv_i: r.interest, _csv_ti: r.cumInterest, _csv_bal: r.balance,
    }));

    return {
      primary: { label: "Future value", value: F.money(g.fv), sub: `in ${v.years} years at ${F.pct(v.rate)} compounded ${({12:"monthly",4:"quarterly",1:"yearly"})[m]}` },
      metrics: [
        { label: "FV of the lump sum alone", value: F.money(fvLump), hint: (v.present || 0) > 0 ? `what today's ${F.money0(v.present)} grows into` : "no present amount entered" },
        { label: "FV of contributions alone", value: F.money(Math.max(0, fvContrib)) },
        { label: "Total contributed", value: F.money(contributed) },
        { label: "Interest earned", value: F.money(g.interest) },
      ],
      explain: `<p>At <strong>${F.pct(v.rate)}</strong>, ${v.present > 0 ? `today's <strong>${F.money0(v.present)}</strong>` : "your plan"}${v.contribution > 0 ? `${v.present > 0 ? " plus" : ""} <strong>${F.money0(v.contribution)}</strong> at the ${timing === "begin" ? "beginning" : "end"} of each month` : ""} has a future value of <strong>${F.money0(g.fv)}</strong> in ${v.years} years. You'd put in <strong>${F.money0(contributed)}</strong>; time and compounding contribute the other <strong>${F.money0(g.interest)}</strong>.</p>`,
      chart: {
        title: "Future value as the clock runs longer",
        note: "Same inputs, computed at 5, 10, 15, 20 and 25 years.",
        cfg: {
          type: "bars",
          aria: "Bar chart of the future value of these inputs at 5, 10, 15, 20 and 25 years",
          x: milestones.map((y) => y + " yrs"),
          series: [{ label: "Future value", color: "var(--c1)", values: barVals }],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Future value of the same plan: ${milestones.map((y, i) => y + " years " + F.money0(barVals[i])).join(", ")}.`,
        },
      },
      table: {
        title: "Year-by-year growth",
        csvName: "future-value-growth",
        views: [{
          id: "annual", label: "Annual",
          columns: [
            { key: "y", label: "Year", align: "left" }, { key: "c", label: "Contributed" }, { key: "i", label: "Interest earned" },
            { key: "ti", label: "Total interest" }, { key: "bal", label: "Balance" },
          ],
          rows,
        }],
      },
      scenario: {
        summary: `${F.money0(v.present || 0)} + ${F.money0(v.contribution || 0)}/mo (${timing}) · ${F.pct(v.rate)} · ${v.years}y`,
        metrics: [
          { label: "Future value", raw: g.fv, fmt: "money", betterWhen: "higher" },
          { label: "Total contributed", raw: contributed, fmt: "money", betterWhen: null },
          { label: "Interest earned", raw: g.interest, fmt: "money", betterWhen: "higher" },
        ],
      },
    };
  },
});
