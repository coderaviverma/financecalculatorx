/* Compound Interest Calculator — growth of principal + contributions, any compounding frequency. */
FCX.define({
  slug: "compound-interest-calculator",
  inputs: [
    { id: "principal", label: "Starting amount", type: "currency", default: 10000, min: 0, max: 1000000000, optional: true },
    { id: "contribution", label: "Regular contribution", type: "currency", default: 200, min: 0, max: 100000000, optional: true, hint: "Added at the end of each contribution period." },
    { id: "contribFreq", label: "Contribution frequency", type: "segment", default: 12, options: [ { v: 12, label: "Monthly" }, { v: 4, label: "Quarterly" }, { v: 1, label: "Yearly" } ], showIf: (v) => v.contribution > 0 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 7, min: 0, max: 50, slider: { min: 0, max: 15, step: 0.1 } },
    { id: "years", label: "Time to grow", type: "number", default: 20, min: 1, max: 80, integer: true, affixPost: "years" },
    { id: "compFreq", label: "Compounding frequency", type: "select", default: 12, options: [ { v: 365, label: "Daily (365/yr)" }, { v: 12, label: "Monthly" }, { v: 4, label: "Quarterly" }, { v: 2, label: "Half-yearly" }, { v: 1, label: "Yearly" } ], hint: "How often interest is added to the balance." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.principal > 0) && !(v.contribution > 0)) return { invalid: "Enter a starting amount, a regular contribution, or both." };
    const g = FIN.grow({ principal: v.principal || 0, contribution: v.contribution || 0, contribFreq: +v.contribFreq || 12, annualPct: v.rate, years: v.years, compFreq: +v.compFreq });
    const invested = (v.principal || 0) + g.totalContrib;
    const growthShare = g.fv > 0 ? (g.interest / g.fv) * 100 : 0;
    const eff = FIN.ear(v.rate, +v.compFreq);

    const years = g.rows.map((r) => "Y" + r.year);
    const cols = [
      { key: "y", label: "Year", align: "left" }, { key: "c", label: "Contributed" }, { key: "i", label: "Interest earned" },
      { key: "ti", label: "Total interest" }, { key: "bal", label: "Balance" },
    ];
    const rows = g.rows.map((r) => ({
      y: r.year, c: F.money(r.contrib), i: F.money(r.interest), ti: F.money(r.cumInterest), bal: F.money(r.balance),
      _csv_y: r.year, _csv_c: r.contrib, _csv_i: r.interest, _csv_ti: r.cumInterest, _csv_bal: r.balance,
    }));

    return {
      primary: { label: "Future value", value: F.money(g.fv), sub: `after ${v.years} years at ${F.pct(v.rate)} compounded ${({365:"daily",12:"monthly",4:"quarterly",2:"half-yearly",1:"yearly"})[+v.compFreq]}` },
      metrics: [
        { label: "Total invested", value: F.money(invested), hint: (v.principal > 0 ? F.money0(v.principal) + " start" : "") + (v.principal > 0 && g.totalContrib > 0 ? " + " : "") + (g.totalContrib > 0 ? F.money0(g.totalContrib) + " contributions" : "") },
        { label: "Interest earned", value: F.money(g.interest) },
        { label: "Share from compounding", value: F.pct(growthShare, 1), hint: "of the final balance" },
        { label: "Effective annual rate", value: F.pct(eff, 3), hint: "nominal " + F.pct(v.rate) + " with this compounding" },
      ],
      explain: `<p>Starting with <strong>${F.money0(v.principal || 0)}</strong>${v.contribution > 0 ? ` and adding <strong>${F.money0(v.contribution)}</strong> ${({12:"every month",4:"every quarter",1:"every year"})[+v.contribFreq]}` : ""} at <strong>${F.pct(v.rate)}</strong>, you'd have about <strong>${F.money0(g.fv)}</strong> after ${v.years} years. Of that, <strong>${F.money0(invested)}</strong> is money you put in and <strong>${F.money0(g.interest)}</strong> is compound growth${growthShare >= 50 ? " — the growth now outweighs your own deposits" : ""}.</p>`,
      chart: {
        title: "Growth over time",
        cfg: {
          type: "area",
          aria: "Stacked area chart of balance over time split into starting amount, contributions and interest",
          x: years,
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Starting amount", color: "var(--c5)", values: g.rows.map(() => v.principal || 0) },
            { label: "Contributions", color: "var(--c1)", values: g.rows.map((r) => r.cumContrib) },
            { label: "Interest", color: "var(--c2)", values: g.rows.map((r) => r.cumInterest) },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Final balance ${F.money0(g.fv)}: ${F.money0(v.principal || 0)} starting amount, ${F.money0(g.totalContrib)} contributions, ${F.money0(g.interest)} interest.`,
        },
      },
      table: {
        title: "Year-by-year growth",
        csvName: "compound-interest-growth",
        views: [{ id: "annual", label: "Annual", columns: cols, rows }],
      },
      scenario: {
        summary: `${F.money0(v.principal || 0)} + ${F.money0(v.contribution || 0)}/${({12:"mo",4:"qtr",1:"yr"})[+v.contribFreq] || "mo"} · ${F.pct(v.rate)} · ${v.years}y`,
        metrics: [
          { label: "Future value", raw: g.fv, fmt: "money", betterWhen: "higher" },
          { label: "Total invested", raw: invested, fmt: "money", betterWhen: null },
          { label: "Interest earned", raw: g.interest, fmt: "money", betterWhen: "higher" },
          { label: "Share from compounding", raw: growthShare, fmt: "pct", betterWhen: "higher" },
        ],
      },
    };
  },
});
