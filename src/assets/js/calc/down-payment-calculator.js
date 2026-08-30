/* Down Payment Calculator — cash target with closing costs and a savings runway. */
FCX.define({
  slug: "down-payment-calculator",
  inputs: [
    { id: "price", label: "Home price", type: "currency", default: 350000, min: 1000, max: 1000000000 },
    { id: "pct", label: "Down payment", type: "percent", default: 20, min: 0, max: 100, affixPost: "% of price", slider: { min: 0, max: 50, step: 1 }, hint: "This model flags possible US conventional-loan PMI below 20% down. Actual loan programs vary." },
    { id: "closingPct", label: "Estimated closing costs", type: "percent", default: 3, min: 0, max: 15, optional: true, affixPost: "% of price", hint: "Enter a scenario percentage; actual transaction costs vary." },
    { id: "savings", label: "Current savings", type: "currency", default: 20000, min: 0, max: 1000000000, optional: true },
    { id: "saveMonthly", label: "Monthly saving amount", type: "currency", default: 800, min: 0, max: 100000000, optional: true },
    { id: "saveRate", label: "Interest on savings", type: "percent", default: 4, min: 0, max: 20, optional: true, hint: "The annual rate used to model growth while saving." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const down = (v.price * v.pct) / 100;
    const closingPct = v.closingPct || 0;
    const closing = v.price * closingPct / 100;
    const cash = down + closing;
    const loan = v.price - down;
    const savings = v.savings || 0;

    let months = null;
    if (savings >= cash) months = 0;
    else {
      const yrs = FIN.yearsToGoal(cash, savings, v.saveMonthly || 0, v.saveRate || 0);
      months = yrs == null ? null : Math.round(yrs * 12);
    }

    const optRows = [3, 5, 10, 15, 20, 25].map((p) => {
      const d = (v.price * p) / 100, c = d + closing;
      return {
        pct: F.pct(p, 0) + (Math.abs(p - v.pct) < 1e-9 ? " (current)" : ""),
        amt: F.money0(d), cash: F.money0(c), pmi: p < 20 ? "Potential" : "Not modeled", loan: F.money0(v.price - d),
        _csv_pct: p, _csv_amt: d, _csv_cash: c, _csv_pmi: p < 20 ? 1 : 0, _csv_loan: v.price - d,
      };
    });

    const segments = [];
    if (down > 0) segments.push({ label: "Down payment", value: down, color: "var(--c1)" });
    if (loan > 0) segments.push({ label: "Financed by mortgage", value: loan, color: "var(--c2)" });

    return {
      primary: {
        label: "Down payment amount",
        value: F.money0(down),
        sub: `${F.pct(v.pct, 1)} of ${F.money0(v.price)} — leaves a ${F.money0(loan)} loan${v.pct < 20 ? " (PMI may apply under some US conventional terms)" : ""}`,
      },
      metrics: [
        { label: "Total cash needed", value: F.money0(cash), hint: `includes ${F.money0(closing)} modeled closing costs (${F.pct(closingPct, 1)} of price)` },
        months === 0
          ? { label: "Time to save", value: "Ready now", hint: "your current savings already cover the cash needed" }
          : months == null
            ? { label: "Time to save", value: "—", hint: "add a monthly saving amount to see your runway" }
            : { label: "Time to save", value: F.dur(months), hint: `saving ${F.money0(v.saveMonthly || 0)}/mo at ${F.pct(v.saveRate || 0, 1)} from ${F.money0(savings)}` },
        { label: "Ready by", value: months == null ? "—" : months === 0 ? "Now" : F.dateFromNow(months) },
        { label: "Resulting loan", value: F.money0(loan), hint: v.pct < 20 ? "this model flags possible US conventional-loan PMI" : "this model does not add PMI at 20%+ down" },
      ],
      explain: `<p>Putting <strong>${F.pct(v.pct, 1)}</strong> down on a <strong>${F.money0(v.price)}</strong> home means <strong>${F.money0(down)}</strong> at closing, plus <strong>${F.money0(closing)}</strong> in modeled closing costs at <strong>${F.pct(closingPct, 1)}</strong> of the price — <strong>${F.money0(cash)}</strong> of cash in total. The modeled mortgage covers <strong>${F.money0(loan)}</strong>.</p><p>${months === 0 ? `The entered <strong>${F.money0(savings)}</strong> of savings already covers that target.` : months == null ? `A positive monthly saving amount is needed to calculate a runway.` : `From <strong>${F.money0(savings)}</strong> saved, adding <strong>${F.money0(v.saveMonthly || 0)}</strong>/month at <strong>${F.pct(v.saveRate || 0, 1)}</strong> reaches the target in about <strong>${F.dur(months)}</strong> (${F.dateFromNow(months)}).`} ${v.pct < 20 ? "Under the calculator's US conventional-loan scenario, PMI may apply below 20% down; actual requirements and cancellation rules vary." : ""}</p>`,
      chart: {
        title: "How the purchase is funded",
        cfg: {
          type: "donut",
          aria: "Donut chart splitting the home price between the down payment and the financed mortgage amount",
          segments,
          fmt: F.money0,
          centerLabel: "Home price",
          centerValue: F.compact(v.price),
          summary: `Of the ${F.money0(v.price)} price, ${F.money0(down)} is paid down and ${F.money0(loan)} is financed. Modeled closing costs of ${F.money0(closing)} come on top.`,
        },
      },
      table: {
        title: "Down payment options at this price",
        csvName: "down-payment-options",
        views: [
          {
            id: "options",
            label: "Options",
            columns: [
              { key: "pct", label: "Down", align: "left" },
              { key: "amt", label: "Amount" },
              { key: "cash", label: "Cash needed" },
              { key: "pmi", label: "PMI model" },
              { key: "loan", label: "Resulting loan" },
            ],
            rows: optRows,
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.price)} · ${F.pct(v.pct, 1)} down · ${F.pct(closingPct, 1)} closing · saving ${F.money0(v.saveMonthly || 0)}/mo`,
        metrics: [
          { label: "Down payment", raw: down, fmt: "money0", betterWhen: null },
          { label: "Cash needed", raw: cash, fmt: "money0", betterWhen: "lower" },
          { label: "Time to save", raw: months, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
