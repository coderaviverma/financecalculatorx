/* Present Value Calculator — discount a future amount or a stream of payments to today's value. */
FCX.define({
  slug: "present-value-calculator",
  inputs: [
    { id: "mode", label: "What are you valuing?", type: "segment", default: "lump", options: [ { v: "lump", label: "A future amount" }, { v: "stream", label: "A stream of payments" } ] },
    { id: "future", label: "Future amount", type: "currency", default: 100000, min: 0, max: 1000000000, showIf: (v) => v.mode !== "stream" },
    { id: "years", label: "Years until received", type: "number", default: 10, min: 0.5, max: 80, affixPost: "years", showIf: (v) => v.mode !== "stream" },
    { id: "payment", label: "Payment per month", type: "currency", default: 1000, min: 0, max: 100000000, showIf: (v) => v.mode === "stream" },
    { id: "months", label: "How long payments last", type: "term", default: 120, min: 1, max: 1200, showIf: (v) => v.mode === "stream" },
    { id: "rate", label: "Discount rate", type: "percent", default: 6, min: 0, max: 50, slider: { min: 0, max: 15, step: 0.1 }, hint: "Your required return / opportunity cost — what the money could earn elsewhere." },
    { id: "compFreq", label: "Compounding", type: "select", default: 12, options: [ { v: 12, label: "Monthly" }, { v: 1, label: "Yearly" } ], showIf: (v) => v.mode !== "stream" },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const stream = v.mode === "stream";
    const m = +v.compFreq || 12;
    let pv, nominal, horizonLabel;
    if (stream) {
      if (!(v.payment > 0)) return { invalid: "Enter a payment amount." };
      pv = FIN.pvAnnuity(v.payment, v.rate, v.months);
      nominal = v.payment * v.months;
      horizonLabel = `${F.money0(v.payment)}/month for ${F.dur(v.months)}`;
    } else {
      if (!(v.future > 0)) return { invalid: "Enter a future amount." };
      pv = FIN.pvLump(v.future, v.rate, v.years, m);
      nominal = v.future;
      horizonLabel = `${F.money0(v.future)} received in ${F.num(v.years)} ${v.years === 1 ? "year" : "years"}`;
    }
    const discount = nominal - pv;
    const pvPct = nominal > 0 ? (pv / nominal) * 100 : 0;
    const effYear = stream ? FIN.ear(v.rate, 12) : FIN.ear(v.rate, m);

    const rateXs = [], rateVals = [];
    for (let r = 2; r <= 12; r++) {
      rateXs.push(r + "%");
      rateVals.push(stream ? FIN.pvAnnuity(v.payment, r, v.months) : FIN.pvLump(v.future, r, v.years, m));
    }

    const rows = [];
    if (stream) {
      const nY = Math.ceil(v.months / 12);
      for (let y = 1; y <= nY; y++) {
        const mm = Math.min(y * 12, v.months);
        const nom = v.payment * mm;
        const p = FIN.pvAnnuity(v.payment, v.rate, mm);
        rows.push({
          y: F.dur(mm), n: F.money0(nom), p: F.money(p), s: F.pct(nom > 0 ? (p / nom) * 100 : 0, 1),
          _csv_y: mm, _csv_n: nom, _csv_p: FIN.r2(p), _csv_s: nom > 0 ? +((p / nom) * 100).toFixed(2) : 0,
        });
      }
    } else {
      const nY = Math.max(1, Math.round(v.years));
      for (let y = 1; y <= nY; y++) {
        const t = Math.min(y, v.years);
        const p = FIN.pvLump(v.future, v.rate, t, m);
        rows.push({
          y: +t.toFixed(2), n: F.money0(v.future), p: F.money(p), s: F.pct((p / v.future) * 100, 1),
          _csv_y: +t.toFixed(2), _csv_n: v.future, _csv_p: FIN.r2(p), _csv_s: +((p / v.future) * 100).toFixed(2),
        });
      }
    }

    return {
      primary: { label: "Present value", value: F.money(pv), sub: `${horizonLabel}, discounted at ${F.pct(v.rate)}` },
      metrics: [
        { label: "Total nominal amount", value: F.money0(nominal), hint: stream ? `${F.num(v.months, 0)} payments of ${F.money0(v.payment)}` : "the face amount, undiscounted" },
        { label: "Discount applied", value: F.money(discount), hint: "nominal minus present value" },
        { label: "PV as % of nominal", value: F.pct(pvPct, 1) },
        { label: "Effective discount per year", value: F.pct(effYear, 2), hint: "each year of waiting costs about this much of the value" },
      ],
      explain: stream
        ? `<p>Receiving <strong>${F.money0(v.payment)}</strong> a month for <strong>${F.dur(v.months)}</strong> totals <strong>${F.money0(nominal)}</strong> on paper — but because the later payments arrive years from now, the whole stream is worth <strong>${F.money(pv)}</strong> today at a <strong>${F.pct(v.rate)}</strong> discount rate. Discounting removes <strong>${F.money0(discount)}</strong>, leaving ${F.pct(pvPct, 1)} of the nominal total.</p>`
        : `<p>A promise of <strong>${F.money0(v.future)}</strong> in <strong>${F.num(v.years)}</strong> years is worth <strong>${F.money(pv)}</strong> today if your money could otherwise earn <strong>${F.pct(v.rate)}</strong> — that's ${F.pct(pvPct, 1)} of the face amount. Invested at that rate, ${F.money0(pv)} would grow back into ${F.money0(v.future)} right on schedule.</p>`,
      chart: {
        title: "Present value at different discount rates",
        note: "Same " + (stream ? "payment stream" : "future amount") + ", discounted at 2% through 12%.",
        cfg: {
          type: "lines",
          aria: "Line chart of the present value of the same " + (stream ? "payment stream" : "future amount") + " at discount rates from 2% to 12%",
          x: rateXs,
          xLabel: (x) => "Discount rate " + x,
          series: [{ label: "Present value", color: "var(--c1)", values: rateVals }],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Present value falls as the discount rate rises: ${F.money0(rateVals[0])} at 2% down to ${F.money0(rateVals[rateVals.length - 1])} at 12%.`,
        },
      },
      table: {
        title: stream ? "Present value as payments accumulate" : "Present value by years until received",
        csvName: "present-value",
        views: [{
          id: "pv", label: stream ? "By duration" : "By year",
          columns: [
            { key: "y", label: stream ? "Payments received over" : "Years until received", align: "left" },
            { key: "n", label: "Nominal" }, { key: "p", label: "Present value" }, { key: "s", label: "% of nominal" },
          ],
          rows,
        }],
      },
      scenario: {
        summary: stream ? `${F.money0(v.payment)}/mo × ${F.dur(v.months)} · ${F.pct(v.rate)}` : `${F.money0(v.future)} in ${F.num(v.years)}y · ${F.pct(v.rate)}`,
        metrics: [
          { label: "Present value", raw: pv, fmt: "money", betterWhen: "higher" },
          { label: "Discount applied", raw: discount, fmt: "money", betterWhen: "lower" },
        ],
      },
    };
  },
});
