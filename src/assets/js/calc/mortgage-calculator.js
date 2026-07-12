/* Mortgage Calculator — full monthly payment: P&I, property tax, insurance, PMI, HOA. */
FCX.define({
  slug: "mortgage-calculator",
  inputs: [
    { id: "price", label: "Home price", type: "currency", default: 350000, min: 1000, max: 1000000000 },
    { id: "down", label: "Down payment", type: "currency", default: 70000, min: 0, max: 1000000000, hint: "20% of the price avoids PMI with most lenders." },
    { id: "rate", label: "Interest rate", type: "percent", default: 6.5, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    { id: "term", label: "Loan term", type: "term", default: 360, min: 12, max: 480 },
    { id: "tax", label: "Property tax (per year)", type: "currency", default: 3600, min: 0, max: 10000000, optional: true },
    { id: "insurance", label: "Home insurance (per year)", type: "currency", default: 1500, min: 0, max: 10000000, optional: true },
    { id: "pmiRate", label: "PMI rate (per year)", type: "percent", default: 0.5, min: 0, max: 5, optional: true, affixPost: "% of loan", showIf: (v) => v.price > 0 && v.down / v.price < 0.2, hint: "Charged because the down payment is under 20%. Drops off once you reach 20% equity." },
    { id: "hoa", label: "HOA / society fees (per month)", type: "currency", default: 0, min: 0, max: 100000, optional: true },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (v.down >= v.price) return { invalid: "The down payment covers the full price — there is no loan left to calculate." };
    const loan = v.price - v.down;
    const am = FIN.amortize(loan, v.rate, v.term, {});
    if (!am) return { invalid: "This mortgage never pays off at these values. Check the rate and term." };
    const ltv = loan / v.price;
    const pmiMonthly = ltv > 0.8 && v.pmiRate > 0 ? (loan * v.pmiRate) / 100 / 12 : 0;
    let pmiMonths = 0;
    if (pmiMonthly > 0) {
      const threshold = 0.8 * v.price;
      pmiMonths = am.rows.findIndex((r) => r.balance <= threshold) + 1 || am.months;
    }
    const taxM = (v.tax || 0) / 12, insM = (v.insurance || 0) / 12, hoaM = v.hoa || 0;
    const piti = am.payment + taxM + insM + pmiMonthly + hoaM;

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "P&I paid" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];
    const segments = [
      { label: "Principal & interest", value: am.payment, color: "var(--c1)" },
      { label: "Property tax", value: taxM, color: "var(--c2)" },
      { label: "Insurance", value: insM, color: "var(--c3)" },
    ];
    if (pmiMonthly > 0) segments.push({ label: "PMI", value: pmiMonthly, color: "var(--c4)" });
    if (hoaM > 0) segments.push({ label: "HOA", value: hoaM, color: "var(--c5)" });

    return {
      primary: { label: "Total monthly payment", value: F.money(piti), sub: `${F.money(am.payment)} principal & interest on a ${F.money0(loan)} loan` },
      metrics: [
        { label: "Loan amount", value: F.money0(loan), hint: F.pct(ltv * 100, 1) + " loan-to-value" },
        { label: "Total interest", value: F.money0(am.totalInterest), hint: "over " + F.dur(am.months) },
        { label: "Total P&I paid", value: F.money0(am.totalPaid) },
        pmiMonthly > 0
          ? { label: "PMI", value: F.money(pmiMonthly) + "/mo", hint: `≈ ${F.dur(pmiMonths)} until 20% equity (${F.money0(pmiMonthly * pmiMonths)} total)` }
          : { label: "Payoff date", value: F.dateFromNow(am.months) },
      ],
      explain: `<p>On a <strong>${F.money0(v.price)}</strong> home with <strong>${F.money0(v.down)}</strong> down (${F.pct((v.down / v.price) * 100, 1)}), you'd borrow <strong>${F.money0(loan)}</strong>. At <strong>${F.pct(v.rate)}</strong> over <strong>${F.dur(v.term)}</strong>, principal and interest come to <strong>${F.money(am.payment)}</strong> per month, and interest over the full term totals about <strong>${F.money0(am.totalInterest)}</strong>.</p><p>${pmiMonthly > 0 ? `Because the down payment is under 20%, PMI of about <strong>${F.money(pmiMonthly)}</strong>/month applies for roughly ${F.dur(pmiMonths)} until the balance reaches 80% of the price. ` : ""}With tax, insurance${pmiMonthly ? ", PMI" : ""}${hoaM ? " and HOA" : ""} included, plan on <strong>${F.money(piti)}</strong> per month.</p>`,
      chart: {
        title: "What's inside the monthly payment",
        note: pmiMonthly > 0 ? "PMI shown at its initial amount; it ends once the balance falls to 80% of the home price." : "",
        cfg: {
          type: "donut",
          aria: "Donut chart splitting the monthly payment into principal and interest, tax, insurance and other costs",
          segments,
          fmt: F.money,
          centerLabel: "Per month",
          centerValue: F.money0(piti),
          summary: `Monthly payment ${F.money(piti)}: ${F.money(am.payment)} principal & interest, ${F.money(taxM)} tax, ${F.money(insM)} insurance${pmiMonthly ? ", " + F.money(pmiMonthly) + " PMI" : ""}${hoaM ? ", " + F.money(hoaM) + " HOA" : ""}.`,
        },
      },
      table: {
        title: "Amortization schedule (principal & interest)",
        csvName: "mortgage-amortization",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: FIN.annualize(am.rows).map((r) => fmtRow(r, "Year " + r.i)) },
          { id: "monthly", label: "Monthly", columns: cols, rows: am.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.price)} · ${F.money0(v.down)} down · ${F.pct(v.rate)} · ${F.dur(v.term)}`,
        metrics: [
          { label: "Monthly payment (all-in)", raw: piti, fmt: "money", betterWhen: "lower" },
          { label: "Principal & interest", raw: am.payment, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: am.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Loan amount", raw: loan, fmt: "money0", betterWhen: "lower" },
        ],
      },
    };
  },
});
