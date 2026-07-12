/* Loan Interest Calculator — the cost side of a loan: total interest, front-loading,
   year-by-year accrual on the reducing balance. */
FCX.define({
  slug: "loan-interest-calculator",
  inputs: [
    { id: "amount", label: "Amount borrowed", type: "currency", default: 30000, min: 100, max: 100000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 8, min: 0, max: 40, slider: { min: 0, max: 20, step: 0.05 } },
    { id: "term", label: "Loan term", type: "term", default: 72, min: 6, max: 600 },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const am = FIN.amortize(v.amount, v.rate, v.term, {});
    if (!am) return { invalid: "This loan never pays off at these values. Check the rate and term." };
    const annual = FIN.annualize(am.rows);
    const firstYearInt = annual[0] ? annual[0].interest : 0;
    const intShare = (am.totalInterest / v.amount) * 100;
    const avgPerMonth = am.totalInterest / am.months;
    const multiple = am.totalPaid / v.amount;

    let cumInt = 0;
    const tableRows = annual.map((a) => {
      cumInt += a.interest;
      const pctPaid = am.totalInterest > 0 ? (cumInt / am.totalInterest) * 100 : 100;
      return {
        y: "Year " + a.i, int: F.money(a.interest), cum: F.money(cumInt), pct: F.pct(pctPaid, 1),
        _csv_y: a.i, _csv_int: a.interest, _csv_cum: cumInt, _csv_pct: pctPaid,
      };
    });

    // cumulative interest and principal series, one point per year
    let ci = 0, cp = 0;
    const cumIntSeries = [], cumPriSeries = [];
    annual.forEach((a) => { ci += a.interest; cp += a.principal; cumIntSeries.push(ci); cumPriSeries.push(cp); });

    return {
      primary: { label: "Total interest", value: F.money(am.totalInterest), sub: `on ${F.money0(v.amount)} over ${F.dur(v.term)} at ${F.pct(v.rate)}` },
      metrics: [
        { label: "Interest as share of amount borrowed", value: F.pct(intShare, 1) },
        { label: "First-year interest", value: F.money(firstYearInt), hint: am.totalInterest > 0 ? F.pct((firstYearInt / am.totalInterest) * 100, 1) + " of all interest" : "" },
        { label: "Average interest per month", value: F.money(avgPerMonth), hint: "front-loaded — early months cost more" },
        { label: "Effective cost multiple", value: F.num(multiple, 2) + "×", hint: "total paid ÷ amount borrowed" },
      ],
      explain: `<p>Borrowing <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> for <strong>${F.dur(v.term)}</strong> costs <strong>${F.money(am.totalInterest)}</strong> in interest — every ${F.sym()}1 borrowed is repaid as <strong>${F.sym()}${F.num(multiple, 2)}</strong>. The first payment includes <strong>${F.money(am.rows[0].interest)}</strong> of interest; the last only <strong>${F.money(am.rows[am.rows.length - 1].interest)}</strong>, because interest is charged on a balance that shrinks every month.</p>`,
      chart: {
        title: "Cumulative interest vs principal repaid",
        note: "Stacked: the top of the chart is everything paid so far.",
        cfg: {
          type: "area",
          aria: `Stacked area chart of cumulative principal repaid and cumulative interest paid over ${annual.length} years`,
          x: annual.map((a) => "Y" + a.i),
          xLabel: (x) => "End of year " + x.slice(1),
          series: [
            { label: "Principal repaid", color: "var(--c1)", values: cumPriSeries },
            { label: "Interest paid", color: "var(--c2)", values: cumIntSeries },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `By payoff, ${F.money0(v.amount)} of principal and ${F.money0(am.totalInterest)} of interest have been paid, ${F.money0(am.totalPaid)} in total.`,
        },
      },
      table: {
        title: "Interest by year",
        csvName: "loan-interest-by-year",
        views: [
          {
            id: "annual", label: "Annual",
            columns: [
              { key: "y", label: "Year", align: "left" }, { key: "int", label: "Interest that year" },
              { key: "cum", label: "Cumulative interest" }, { key: "pct", label: "% of total interest" },
            ],
            rows: tableRows,
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)}`,
        metrics: [
          { label: "Total interest", raw: am.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Interest share of amount", raw: intShare, fmt: "pct", betterWhen: "lower" },
          { label: "Monthly payment", raw: am.payment, fmt: "money", betterWhen: "lower" },
          { label: "Total paid", raw: am.totalPaid, fmt: "money", betterWhen: "lower" },
        ],
      },
    };
  },
});
