/* SIP Calculator — monthly SIP maturity value with optional annual step-up and initial lump sum. */
FCX.define({
  slug: "sip-calculator",
  suggestCurrency: "INR",
  inputs: [
    { id: "sip", label: "Monthly SIP amount", type: "currency", default: 10000, min: 0, max: 100000000 },
    { id: "rate", label: "Expected annual return", type: "percent", default: 12, min: 0, max: 30, slider: { min: 0, max: 20, step: 0.5 }, hint: "Long-run Indian equity fund averages are commonly quoted at 10–14% — an assumption, not a guarantee." },
    { id: "years", label: "Investment period", type: "number", default: 15, min: 1, max: 50, integer: true, affixPost: "years" },
    { id: "stepUp", label: "Annual step-up", type: "percent", default: 0, min: 0, max: 50, optional: true, affixPost: "% / yr", hint: "Increase your SIP every year, e.g. 10%." },
    { id: "lump", label: "Initial lump sum", type: "currency", default: 0, min: 0, max: 1000000000, optional: true, hint: "Optional one-time investment alongside the SIP." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.sip > 0)) return { invalid: "Enter a monthly SIP amount." };
    const stepUp = v.stepUp || 0;
    const lump = v.lump || 0;
    const g = FIN.grow({ principal: lump, contribution: v.sip, annualPct: v.rate, years: v.years, annualIncreasePct: stepUp });
    const invested = lump + g.totalContrib;
    const gains = g.interest;
    const multiple = invested > 0 ? g.fv / invested : 0;
    const alt = FIN.grow({ principal: lump, contribution: v.sip, annualPct: v.rate, years: v.years, annualIncreasePct: stepUp > 0 ? 0 : 10 });
    const altLabel = stepUp > 0 ? "Value without step-up" : "Value with 10% step-up";
    const altHint = stepUp > 0 ? "same SIP held flat every year" : "raising the SIP 10% each year";

    const rows = g.rows.map((r) => ({
      y: r.year, c: F.money0(r.contrib), ci: F.money0(lump + r.cumContrib), bal: F.money0(r.balance), gn: F.money0(r.cumInterest),
      _csv_y: r.year, _csv_c: r.contrib, _csv_ci: lump + r.cumContrib, _csv_bal: r.balance, _csv_gn: r.cumInterest,
    }));

    return {
      primary: { label: "Maturity value", value: F.money0(g.fv), sub: `after ${v.years} years at ${F.pct(v.rate)} expected return${stepUp > 0 ? ` with a ${F.pct(stepUp)} yearly step-up` : ""}` },
      metrics: [
        { label: "Total invested", value: F.money0(invested), hint: lump > 0 ? `${F.money0(lump)} lump sum + ${F.money0(g.totalContrib)} via SIP` : "" },
        { label: "Wealth gained", value: F.money0(gains) },
        { label: "Invested-to-value multiple", value: F.num(multiple, 2) + "×" },
        { label: altLabel, value: F.money0(alt.fv), hint: altHint },
      ],
      explain: `<p>A <strong>${F.money0(v.sip)}</strong> monthly SIP${lump > 0 ? ` alongside a <strong>${F.money0(lump)}</strong> lump sum` : ""} at an assumed <strong>${F.pct(v.rate)}</strong> annual return grows to about <strong>${F.money0(g.fv)}</strong> in ${v.years} years${stepUp > 0 ? `, with the SIP stepped up <strong>${F.pct(stepUp)}</strong> every year` : ""}. Of that, <strong>${F.money0(invested)}</strong> is money you invested and <strong>${F.money0(gains)}</strong> is growth — <strong>${F.num(multiple, 2)}×</strong> your money in.</p><p>${stepUp > 0 ? `Holding the SIP flat instead would end at about <strong>${F.money0(alt.fv)}</strong>.` : `Stepping the SIP up 10% a year — roughly matching salary growth — would lift the result to about <strong>${F.money0(alt.fv)}</strong>.`}</p>`,
      chart: {
        title: "Invested amount vs gains",
        cfg: {
          type: "area",
          aria: "Stacked area chart splitting the SIP balance into amount invested and gains over the years",
          x: g.rows.map((r) => "Y" + r.year),
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Invested", color: "var(--c1)", values: g.rows.map((r) => lump + r.cumContrib) },
            { label: "Gains", color: "var(--c2)", values: g.rows.map((r) => r.cumInterest) },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Final value ${F.money0(g.fv)}: ${F.money0(invested)} invested plus ${F.money0(gains)} of gains.`,
        },
      },
      table: {
        title: "Year-by-year SIP growth",
        csvName: "sip-projection",
        views: [{
          id: "annual", label: "Annual",
          columns: [
            { key: "y", label: "Year", align: "left" }, { key: "c", label: "Invested that year" }, { key: "ci", label: "Cumulative invested" },
            { key: "bal", label: "Value" }, { key: "gn", label: "Gains" },
          ],
          rows,
        }],
      },
      scenario: {
        summary: `${F.money0(v.sip)}/mo · ${F.pct(v.rate)} · ${v.years}y${stepUp > 0 ? ` · +${F.pct(stepUp)}/yr` : ""}${lump > 0 ? ` · ${F.money0(lump)} lump` : ""}`,
        metrics: [
          { label: "Maturity value", raw: g.fv, fmt: "money0", betterWhen: "higher" },
          { label: "Total invested", raw: invested, fmt: "money0", betterWhen: null },
          { label: "Wealth gained", raw: gains, fmt: "money0", betterWhen: "higher" },
        ],
      },
    };
  },
});
