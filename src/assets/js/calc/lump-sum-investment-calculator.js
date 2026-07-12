/* Lump Sum Investment Calculator — one-time investment growth, doubling time, optional real value. */
FCX.define({
  slug: "lump-sum-investment-calculator",
  inputs: [
    { id: "amount", label: "One-time investment", type: "currency", default: 100000, min: 0, max: 1000000000 },
    { id: "rate", label: "Expected annual return", type: "percent", default: 10, min: 0, max: 30, slider: { min: 0, max: 20, step: 0.5 }, hint: "An assumption to test, not a promise — try a lower rate too." },
    { id: "years", label: "Years invested", type: "number", default: 15, min: 1, max: 60, integer: true, affixPost: "years" },
    { id: "compFreq", label: "Compounding", type: "select", default: 12, options: [ { v: 12, label: "Monthly" }, { v: 1, label: "Yearly" } ] },
    { id: "inflation", label: "Expected inflation", type: "percent", default: 0, min: 0, max: 20, optional: true, hint: "Optional — shows the result in today's purchasing power." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.amount > 0)) return { invalid: "Enter the amount you're investing." };
    const m = +v.compFreq || 12;
    const infl = v.inflation || 0;
    const fv = FIN.fvLump(v.amount, v.rate, v.years, m);
    const growth = fv - v.amount;
    const multiple = fv / v.amount;
    const rule72 = v.rate > 0 ? 72 / v.rate : null;
    const exactDouble = v.rate > 0 ? Math.log(2) / (m * Math.log(1 + v.rate / 100 / m)) : null;
    const real = FIN.inflationAdjust(fv, infl, v.years);

    const xs = [], main = [], lo = [], hi = [], rows = [];
    const rLo = Math.max(0, v.rate - 2), rHi = v.rate + 2;
    let prev = v.amount;
    for (let y = 1; y <= v.years; y++) {
      const val = FIN.fvLump(v.amount, v.rate, y, m);
      xs.push("Y" + y);
      main.push(val);
      lo.push(FIN.fvLump(v.amount, rLo, y, m));
      hi.push(FIN.fvLump(v.amount, rHi, y, m));
      rows.push({
        y, bal: F.money0(val), g: F.money0(val - prev), cg: F.money0(val - v.amount), x: F.num(val / v.amount, 2) + "×",
        _csv_y: y, _csv_bal: FIN.r2(val), _csv_g: FIN.r2(val - prev), _csv_cg: FIN.r2(val - v.amount), _csv_x: +(val / v.amount).toFixed(3),
      });
      prev = val;
    }

    return {
      primary: { label: "Maturity value", value: F.money0(fv), sub: `${F.money0(v.amount)} invested once, ${v.years} years at ${F.pct(v.rate)} compounded ${m === 12 ? "monthly" : "yearly"}` },
      metrics: [
        { label: "Total growth", value: F.money0(growth) },
        { label: "Growth multiple", value: F.num(multiple, 2) + "×", hint: "final value ÷ amount invested" },
        { label: "Doubling time (Rule of 72)", value: rule72 ? F.num(rule72, 1) + " yrs" : "—", hint: rule72 ? "72 ÷ " + F.num(v.rate, 1) : "no growth at 0%" },
        infl > 0
          ? { label: "In today's money", value: F.money0(real), hint: "adjusted for " + F.pct(infl, 1) + " inflation" }
          : { label: "Exact doubling time", value: exactDouble ? F.num(exactDouble, 2) + " yrs" : "—", hint: exactDouble ? "with " + (m === 12 ? "monthly" : "yearly") + " compounding" : "no growth at 0%" },
      ],
      explain: `<p>Deploying <strong>${F.money0(v.amount)}</strong> once and leaving it for <strong>${v.years} years</strong> at <strong>${F.pct(v.rate)}</strong> projects to about <strong>${F.money0(fv)}</strong> — <strong>${F.num(multiple, 2)}×</strong> the amount you put in, with <strong>${F.money0(growth)}</strong> of that being growth.</p><p>${rule72 ? `At this rate money doubles roughly every <strong>${F.num(rule72, 1)} years</strong> (Rule of 72${exactDouble ? `; the exact figure is ${F.num(exactDouble, 2)} years` : ""}).` : "At 0% the balance never grows — the result is just your original amount."}${infl > 0 ? ` After ${F.pct(infl, 1)} inflation, the ending balance buys what <strong>${F.money0(real)}</strong> buys today.` : ""}</p>`,
      chart: {
        title: "Value over time, with ±2% context",
        note: `Dashed lines show the same investment at ${F.pct(rLo, 1)} and ${F.pct(rHi, 1)} — a reminder that the rate is an assumption.`,
        cfg: {
          type: "lines",
          aria: "Line chart of the lump sum's value over the years at the entered rate, with dashed context lines two points lower and higher",
          x: xs,
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: `At ${F.pct(v.rate, 1)} (entered)`, color: "var(--c1)", values: main },
            { label: `At ${F.pct(rLo, 1)}`, color: "var(--c5)", dash: "5 5", values: lo },
            { label: `At ${F.pct(rHi, 1)}`, color: "var(--c2)", dash: "5 5", values: hi },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `After ${v.years} years: ${F.money0(main[main.length - 1])} at ${F.pct(v.rate, 1)}, vs ${F.money0(lo[lo.length - 1])} at ${F.pct(rLo, 1)} and ${F.money0(hi[hi.length - 1])} at ${F.pct(rHi, 1)}.`,
        },
      },
      table: {
        title: "Year-by-year value",
        csvName: "lump-sum-growth",
        views: [{
          id: "annual", label: "Annual",
          columns: [
            { key: "y", label: "Year", align: "left" }, { key: "bal", label: "Value" }, { key: "g", label: "Growth that year" },
            { key: "cg", label: "Cumulative growth" }, { key: "x", label: "Multiple" },
          ],
          rows,
        }],
      },
      scenario: {
        summary: `${F.money0(v.amount)} once · ${F.pct(v.rate)} · ${v.years}y${infl > 0 ? ` · ${F.pct(infl, 1)} infl.` : ""}`,
        metrics: [
          { label: "Maturity value", raw: fv, fmt: "money0", betterWhen: "higher" },
          { label: "Total growth", raw: growth, fmt: "money0", betterWhen: "higher" },
          { label: "Growth multiple", raw: multiple, fmt: "num", betterWhen: "higher" },
        ],
      },
    };
  },
});
