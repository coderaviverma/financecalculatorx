/* House Affordability Calculator — works backward from income via front/back DTI caps. */
FCX.define({
  slug: "house-affordability-calculator",
  inputs: [
    { id: "income", label: "Annual gross income", type: "currency", default: 96000, min: 1000, max: 1000000000, hint: "Before tax, all borrowers combined." },
    { id: "debts", label: "Monthly debt payments", type: "currency", default: 400, min: 0, max: 10000000, optional: true, hint: "Car loans, student loans, card minimums — not rent or utilities." },
    { id: "down", label: "Down payment available", type: "currency", default: 40000, min: 0, max: 1000000000 },
    { id: "rate", label: "Interest rate", type: "percent", default: 6.5, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    { id: "term", label: "Loan term", type: "segment", default: 30, options: [{ v: 15, label: "15 years" }, { v: 30, label: "30 years" }] },
    { id: "taxIns", label: "Monthly property tax + insurance", type: "currency", default: 350, min: 0, max: 1000000, optional: true, hint: "An estimate for homes in your target area — it reduces the payment left over for the loan itself." },
    {
      id: "standard", label: "Lending standard", type: "select", default: "28/36",
      options: [
        { v: "25/33", label: "Conservative — 25% / 33%" },
        { v: "28/36", label: "Standard — 28% / 36%" },
        { v: "31/43", label: "Aggressive — 31% / 43%" },
      ],
      hint: "Front-end % of income for housing / back-end % for housing plus all debts.",
    },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const parts = String(v.standard).split("/");
    const frontPct = parseFloat(parts[0]) || 28;
    const backPct = parseFloat(parts[1]) || 36;
    const cfg = { incomeAnnual: v.income, debtsMonthly: v.debts || 0, downPayment: v.down || 0, annualPct: v.rate, years: v.term, taxInsMonthly: v.taxIns || 0 };
    const a = FIN.affordability({ ...cfg, frontPct, backPct });
    if (!(a.maxPI > 0)) return { invalid: "At these ratios, existing debts and housing costs already use the whole allowance — no room is left for a mortgage payment. Lower the monthly debts or tax/insurance estimate, or pick a more aggressive standard." };
    const gross = v.income / 12;
    const frontBinds = a.binding === "front";

    // all three standards for the chart + the contrast metric
    const standards = [
      { key: "25/33", name: "Conservative", f: 25, b: 33 },
      { key: "28/36", name: "Standard", f: 28, b: 36 },
      { key: "31/43", name: "Aggressive", f: 31, b: 43 },
    ].map((s) => ({ ...s, r: FIN.affordability({ ...cfg, frontPct: s.f, backPct: s.b }) }));
    const contrast = v.standard === "25/33" ? standards[1] : standards[0];

    // rate sensitivity: the payment cap is income-driven, so it stays fixed; loan and price move
    const rows = [-1, -0.5, 0, 0.5, 1].map((d) => v.rate + d).filter((r) => r >= 0).map((r) => {
      const s = FIN.affordability({ ...cfg, annualPct: r, frontPct, backPct });
      return {
        rate: F.pct(r) + (Math.abs(r - v.rate) < 1e-9 ? " (current)" : ""),
        pi: F.money(s.maxPI), loan: F.money0(s.loan), price: F.money0(s.price),
        _csv_rate: r, _csv_pi: s.maxPI, _csv_loan: s.loan, _csv_price: s.price,
      };
    });

    return {
      primary: {
        label: "Home price you can afford",
        value: F.money0(a.price),
        sub: `a ${F.money0(a.loan)} loan plus your ${F.money0(v.down)} down payment, under the ${frontPct}/${backPct} standard`,
      },
      metrics: [
        { label: "Max monthly P&I", value: F.money(a.maxPI), hint: "what's left for the loan after tax/insurance and the DTI caps" },
        { label: "Loan amount", value: F.money0(a.loan), hint: `at ${F.pct(v.rate)} over ${v.term} years` },
        {
          label: "What limits you",
          value: frontBinds ? "Housing cap (front-end)" : "Existing debts (back-end)",
          hint: frontBinds
            ? `the ${frontPct}% housing share of income is reached before the ${backPct}% total-debt cap`
            : `your other debt payments hit the ${backPct}% total-debt cap first`,
        },
        { label: `At the ${contrast.name.toLowerCase()} ${contrast.key} standard`, value: F.money0(contrast.r.price), hint: "the same inputs under stricter ratios" },
      ],
      explain: `<p>On <strong>${F.money0(gross)}</strong> of gross monthly income, the <strong>${frontPct}/${backPct}</strong> standard allows <strong>${F.money(gross * (frontPct / 100))}</strong> for housing (front-end) and <strong>${F.money(gross * (backPct / 100))}</strong> for housing plus all debts (back-end). After <strong>${F.money(v.taxIns || 0)}</strong> of tax/insurance${v.debts > 0 ? ` and <strong>${F.money(v.debts)}</strong> of debt payments` : ""}, the ${frontBinds ? "front-end" : "back-end"} cap binds first, leaving <strong>${F.money(a.maxPI)}</strong> per month for principal and interest.</p><p>That payment supports a <strong>${F.money0(a.loan)}</strong> loan at <strong>${F.pct(v.rate)}</strong> over <strong>${v.term} years</strong>; with <strong>${F.money0(v.down)}</strong> down, the price ceiling is <strong>${F.money0(a.price)}</strong>. This is the most a lender would likely approve — not necessarily what fits your budget.</p>`,
      chart: {
        title: "Affordable price under each lending standard",
        note: "Same income, debts, rate and down payment — only the DTI ratios change.",
        cfg: {
          type: "bars",
          aria: "Bar chart of the affordable home price under conservative, standard and aggressive lending ratios",
          x: standards.map((s) => s.name),
          series: [{ label: "Affordable price", color: "var(--c1)", values: standards.map((s) => s.r.price) }],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `Affordable price: ${standards.map((s) => `${F.money0(s.r.price)} at ${s.key}`).join(", ")}.`,
        },
      },
      table: {
        title: "Rate sensitivity — same payment cap, different price",
        csvName: "house-affordability-sensitivity",
        views: [
          {
            id: "sensitivity",
            label: "Sensitivity",
            columns: [
              { key: "rate", label: "Rate", align: "left" },
              { key: "pi", label: "Max P&I" },
              { key: "loan", label: "Loan" },
              { key: "price", label: "Home price" },
            ],
            rows,
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.income)}/yr · ${F.money0(v.debts || 0)} debts · ${F.pct(v.rate)} · ${v.term}y · ${frontPct}/${backPct}`,
        metrics: [
          { label: "Affordable price", raw: a.price, fmt: "money0", betterWhen: "higher" },
          { label: "Max monthly P&I", raw: a.maxPI, fmt: "money", betterWhen: "higher" },
          { label: "Loan amount", raw: a.loan, fmt: "money0", betterWhen: "higher" },
        ],
      },
    };
  },
});
