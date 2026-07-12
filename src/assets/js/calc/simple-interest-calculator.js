/* Simple Interest Calculator — I = P·r·t, with a compound comparison at the same rate. */
FCX.define({
  slug: "simple-interest-calculator",
  inputs: [
    { id: "principal", label: "Principal", type: "currency", default: 10000, min: 0, max: 1000000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 6, min: 0, max: 50, slider: { min: 0, max: 15, step: 0.1 } },
    { id: "time", label: "Time", type: "number", default: 3, min: 0.1, max: 100, affixPost: "years", hint: "Decimals are fine — 2.5 means two and a half years." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.principal > 0)) return { invalid: "Enter a principal amount." };
    const interest = FIN.simpleInterest(v.principal, v.rate, v.time);
    const total = v.principal + interest;
    const perYear = v.time > 0 ? interest / v.time : 0;
    const perMonth = perYear / 12;
    const compFv = FIN.fvLump(v.principal, v.rate, v.time, 12);
    const compInterest = compFv - v.principal;
    const gap = compInterest - interest;

    const N = Math.max(1, Math.ceil(v.time));
    const xs = [], simpleVals = [], compVals = [], rows = [];
    for (let y = 1; y <= N; y++) {
      const t = Math.min(y, v.time);
      const sBal = v.principal + FIN.simpleInterest(v.principal, v.rate, t);
      const cBal = FIN.fvLump(v.principal, v.rate, t, 12);
      xs.push("Y" + +t.toFixed(2));
      simpleVals.push(sBal);
      compVals.push(cBal);
      rows.push({
        y: +t.toFixed(2), s: F.money(sBal), c: F.money(cBal), g: F.money(cBal - sBal),
        _csv_y: +t.toFixed(2), _csv_s: FIN.r2(sBal), _csv_c: FIN.r2(cBal), _csv_g: FIN.r2(cBal - sBal),
      });
    }

    return {
      primary: { label: "Interest earned", value: F.money(interest), sub: `simple interest on ${F.money0(v.principal)} at ${F.pct(v.rate)} for ${F.num(v.time)} ${v.time === 1 ? "year" : "years"}` },
      metrics: [
        { label: "Total amount", value: F.money(total), hint: "principal + interest" },
        { label: "Interest per year", value: F.money(perYear) },
        { label: "Interest per month", value: F.money(perMonth) },
        { label: "Equivalent compound result", value: F.money(compInterest), hint: "if it compounded monthly" },
      ],
      explain: `<p>Simple interest on <strong>${F.money0(v.principal)}</strong> at <strong>${F.pct(v.rate)}</strong> accrues at a flat <strong>${F.money(perYear)}</strong> per year — the base never changes. Over ${F.num(v.time)} ${v.time === 1 ? "year" : "years"} that adds up to <strong>${F.money(interest)}</strong>, for a total of <strong>${F.money(total)}</strong>.</p><p>If the same money compounded monthly instead, it would earn <strong>${F.money(compInterest)}</strong> — <strong>${F.money(gap)}</strong> more, because each interest credit would start earning interest of its own.</p>`,
      chart: {
        title: "Simple vs compound balance, year by year",
        note: "Same principal and rate; the compound line assumes monthly compounding.",
        cfg: {
          type: "lines",
          aria: "Line chart comparing a simple-interest balance with a monthly-compounded balance over the same years",
          x: xs,
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Simple interest", color: "var(--c1)", values: simpleVals },
            { label: "Compound (monthly)", color: "var(--c2)", values: compVals },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `After ${F.num(v.time)} years: ${F.money0(total)} with simple interest vs ${F.money0(compFv)} compounded monthly — a gap of ${F.money0(gap)}.`,
        },
      },
      table: {
        title: "Year-by-year comparison",
        csvName: "simple-vs-compound",
        views: [{
          id: "annual", label: "Annual",
          columns: [
            { key: "y", label: "Year", align: "left" }, { key: "s", label: "Simple balance" },
            { key: "c", label: "Compound balance (monthly)" }, { key: "g", label: "Gap" },
          ],
          rows,
        }],
      },
      scenario: {
        summary: `${F.money0(v.principal)} · ${F.pct(v.rate)} · ${F.num(v.time)}y simple`,
        metrics: [
          { label: "Interest earned", raw: interest, fmt: "money", betterWhen: "higher" },
          { label: "Total amount", raw: total, fmt: "money", betterWhen: "higher" },
          { label: "Gap vs compound", raw: gap, fmt: "money", betterWhen: null },
        ],
      },
    };
  },
});
