/* ROI Calculator — total return on a completed (or current) investment, plus the annualized rate. */
FCX.define({
  slug: "roi-calculator",
  inputs: [
    { id: "invested", label: "Amount invested", type: "currency", default: 10000, min: 0, max: 1000000000 },
    { id: "received", label: "Amount received / current value", type: "currency", default: 14000, min: 0, max: 1000000000 },
    { id: "period", label: "Holding period", type: "term", default: 36, min: 1, max: 1200 },
    { id: "costs", label: "Additional costs", type: "currency", default: 0, min: 0, max: 1000000000, optional: true, hint: "Fees, commissions, taxes paid — they count as part of what you put in." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.invested > 0)) return { invalid: "Enter the amount you invested." };
    const costs = v.costs || 0;
    const base = v.invested + costs;
    const profit = v.received - base;
    const roi = (profit / base) * 100;
    const years = v.period / 12;
    const annualized = FIN.cagr(base, v.received, years);
    const annOk = annualized != null && isFinite(annualized);

    const holdYears = [1, 2, 3, 5, 10];
    const rows = holdYears.map((y) => {
      const a = FIN.cagr(base, v.received, y);
      return {
        y, r: F.pct(roi, 2), a: a != null && isFinite(a) ? F.pct(a, 2) : "—",
        _csv_y: y, _csv_r: +roi.toFixed(4), _csv_a: a != null && isFinite(a) ? +a.toFixed(4) : "",
      };
    });

    return {
      primary: { label: "Total ROI", value: F.pct(roi, 2), sub: `${F.money0(profit)} net ${profit >= 0 ? "profit" : "loss"} on ${F.money0(base)} over ${F.dur(v.period)}` },
      metrics: [
        { label: "Net profit", value: F.money(profit), hint: costs > 0 ? `after ${F.money0(costs)} of costs` : "" },
        { label: "Annualized return (CAGR)", value: annOk ? F.pct(annualized, 2) : "—", hint: annOk ? `the steady yearly rate that turns ${F.money0(base)} into ${F.money0(v.received)} in ${F.dur(v.period)}` : "" },
        { label: "Break-even value", value: F.money0(base), hint: "you needed at least this back to avoid a loss" },
      ],
      explain: `<p>You put in <strong>${F.money0(base)}</strong>${costs > 0 ? ` (${F.money0(v.invested)} invested + ${F.money0(costs)} of costs)` : ""} and ${v.received >= base ? "got back" : "have"} <strong>${F.money0(v.received)}</strong> — a net ${profit >= 0 ? "profit" : "loss"} of <strong>${F.money0(Math.abs(profit))}</strong>, or a total return of <strong>${F.pct(roi, 2)}</strong>.</p><p>Because that took <strong>${F.dur(v.period)}</strong>, it works out to <strong>${annOk ? F.pct(annualized, 2) : "—"}</strong> per year compounded — the number to use when comparing this against anything else.</p>`,
      chart: {
        title: "How time changes the annualized rate",
        note: "The same total return looks different when it is earned over a different number of years.",
        cfg: {
          type: "bars",
          aria: "Bar chart showing the annualized rate for the same total return over one, two, three, five and ten years",
          x: rows.map((r) => `${r.y} yr`),
          series: [{ label: "Annualized return", color: "var(--c1)", values: rows.map((r) => r._csv_a === "" ? 0 : r._csv_a) }],
          fmt: (x) => F.pct(x, 2),
          fmtAxis: (x) => F.num(x, 0) + "%",
          summary: `A total return of ${F.pct(roi, 2)} annualizes differently depending on how long it takes; your entered ${F.dur(v.period)} works out to ${annOk ? F.pct(annualized, 2) : "—"} per year.`,
        },
      },
      table: {
        title: "Same total return over different holding periods",
        csvName: "roi-by-holding-period",
        views: [{
          id: "hold", label: "By holding period",
          columns: [
            { key: "y", label: "Years held", align: "left" }, { key: "r", label: "Total ROI (unchanged)" }, { key: "a", label: "Annualized return" },
          ],
          rows,
        }],
      },
      scenario: {
        summary: `${F.money0(base)} → ${F.money0(v.received)} · ${F.dur(v.period)}`,
        metrics: [
          { label: "Total ROI", raw: roi, fmt: "pct", betterWhen: "higher" },
          { label: "Annualized return", raw: annOk ? annualized : 0, fmt: "pct", betterWhen: "higher" },
          { label: "Net profit", raw: profit, fmt: "money", betterWhen: "higher" },
        ],
      },
    };
  },
});
