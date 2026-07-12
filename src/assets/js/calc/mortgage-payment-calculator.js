/* Mortgage Payment Calculator — fast P&I quote with rate sensitivity and term contrast. */
FCX.define({
  slug: "mortgage-payment-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 300000, min: 1000, max: 1000000000, hint: "What you're borrowing — home price minus down payment. For a price/down split with taxes and PMI, use the full mortgage calculator." },
    { id: "rate", label: "Interest rate", type: "percent", default: 6.5, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    { id: "term", label: "Loan term", type: "segment", default: 360, options: [{ v: 180, label: "15 years" }, { v: 240, label: "20 years" }, { v: 360, label: "30 years" }] },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const am = FIN.amortize(v.amount, v.rate, v.term, {});
    if (!am) return { invalid: "This loan never amortizes at these values. Check the rate and term." };
    const ratio = am.totalInterest / v.amount;

    // sensitivity: payments at rate −1%, −0.5%, quoted, +0.5%, +1% (skip negative rates)
    const chartSteps = [-1, -0.5, 0, 0.5, 1].map((d) => v.rate + d).filter((r) => r >= 0);
    const chartPts = chartSteps.map((r) => ({ r, am: FIN.amortize(v.amount, r, v.term, {}) }));
    const tableSteps = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1].map((d) => v.rate + d).filter((r) => r >= 0);
    const rows = tableSteps.map((r) => {
      const a = FIN.amortize(v.amount, r, v.term, {});
      return {
        rate: F.pct(r) + (Math.abs(r - v.rate) < 1e-9 ? " (quoted)" : ""),
        pay: a ? F.money(a.payment) : "—",
        int: a ? F.money0(a.totalInterest) : "—",
        _csv_rate: r, _csv_pay: a ? a.payment : 0, _csv_int: a ? a.totalInterest : 0,
      };
    });

    // per-0.25% delta and the 15 vs 30 contrast, computed live
    const up25 = FIN.amortize(v.amount, v.rate + 0.25, v.term, {});
    const delta25 = up25 ? up25.payment - am.payment : 0;
    const altTerm = v.term === 180 ? 360 : 180;
    const alt = FIN.amortize(v.amount, v.rate, altTerm, {});
    const altLabel = altTerm === 180 ? "15-year" : "30-year";
    const altSentence = alt
      ? (altTerm === 180
        ? `Switching to a <strong>15-year</strong> term raises the payment to <strong>${F.money(alt.payment)}</strong> (+${F.money(alt.payment - am.payment)}/mo) but cuts total interest to <strong>${F.money0(alt.totalInterest)}</strong> — a saving of <strong>${F.money0(am.totalInterest - alt.totalInterest)}</strong>.`
        : `Stretching to a <strong>30-year</strong> term lowers the payment to <strong>${F.money(alt.payment)}</strong> (−${F.money(am.payment - alt.payment)}/mo) but lifts total interest to <strong>${F.money0(alt.totalInterest)}</strong> — <strong>${F.money0(alt.totalInterest - am.totalInterest)}</strong> more over the life of the loan.`)
      : "";

    return {
      primary: {
        label: "Monthly principal & interest",
        value: F.money(am.payment),
        sub: `${F.money0(v.amount)} at ${F.pct(v.rate)} over ${F.dur(v.term)} — before tax, insurance or PMI`,
      },
      metrics: [
        { label: "Total interest", value: F.money0(am.totalInterest), hint: "over " + F.dur(am.months) },
        { label: "Total paid", value: F.money0(am.totalPaid) },
        { label: "Interest-to-principal ratio", value: F.num(ratio, 2) + "×", hint: "total interest ÷ amount borrowed" },
        { label: "Payoff date", value: F.dateFromNow(am.months) },
      ],
      explain: `<p>Borrowing <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> for <strong>${F.dur(v.term)}</strong> costs <strong>${F.money(am.payment)}</strong> per month in principal and interest. Every quarter-point of rate moves that payment by about <strong>${F.money(Math.abs(delta25))}</strong> per month at these numbers, so a lender quote just 0.5% higher costs roughly <strong>${F.money(Math.abs(delta25) * 2)}</strong> more each month.</p><p>${altSentence} Over the full schedule you would pay <strong>${F.money0(am.totalInterest)}</strong> of interest — <strong>${F.num(ratio, 2)}×</strong> the amount borrowed. This is the principal-and-interest figure only; escrow items like property tax and insurance come on top.</p>`,
      chart: {
        title: "Monthly payment at nearby rates",
        note: "Principal & interest only, for the " + F.dur(v.term) + " term. The middle bar is your quoted rate.",
        cfg: {
          type: "bars",
          aria: "Bar chart of the monthly payment at interest rates from one percent below to one percent above the quoted rate",
          x: chartPts.map((p) => F.pct(p.r)),
          series: [{ label: "Monthly P&I", color: "var(--c1)", values: chartPts.map((p) => (p.am ? p.am.payment : 0)) }],
          fmt: F.money,
          fmtAxis: F.compact,
          summary: `Payment ranges from ${F.money(chartPts[0].am ? chartPts[0].am.payment : 0)} at ${F.pct(chartPts[0].r)} to ${F.money(chartPts[chartPts.length - 1].am ? chartPts[chartPts.length - 1].am.payment : 0)} at ${F.pct(chartPts[chartPts.length - 1].r)}.`,
        },
      },
      table: {
        title: "Rate sensitivity matrix (" + F.dur(v.term) + " term)",
        csvName: "mortgage-payment-sensitivity",
        views: [
          {
            id: "sensitivity",
            label: "Sensitivity",
            columns: [
              { key: "rate", label: "Rate", align: "left" },
              { key: "pay", label: "Monthly payment" },
              { key: "int", label: "Total interest" },
            ],
            rows,
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)}`,
        metrics: [
          { label: "Monthly payment", raw: am.payment, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: am.totalInterest, fmt: "money0", betterWhen: "lower" },
          { label: "Total paid", raw: am.totalPaid, fmt: "money0", betterWhen: "lower" },
          { label: "Payoff time", raw: am.months, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
