/* Budget Calculator — 50/30/20 rule with adjustable needs/wants/savings splits. */
FCX.define({
  slug: "budget-calculator",
  inputs: [
    { id: "income", label: "Monthly take-home income", type: "currency", default: 4500, min: 1, max: 100000000, hint: "After tax and payroll deductions — what actually lands in your account." },
    { id: "needsPct", label: "Needs", type: "percent", default: 50, min: 0, max: 100, affixPost: "% of income", hint: "Housing, groceries, utilities, transport, insurance, minimum debt payments." },
    { id: "wantsPct", label: "Wants", type: "percent", default: 30, min: 0, max: 100, affixPost: "% of income", hint: "Dining out, travel, subscriptions, hobbies, upgrades." },
    { id: "savePct", label: "Savings & debt repayment", type: "percent", default: 20, min: 0, max: 100, affixPost: "% of income", hint: "Emergency fund, investing, and debt payments beyond the minimums." },
    { id: "weekly", label: "Show weekly amounts", type: "toggle", default: false },
  ],
  compute(v, F) {
    if (!(v.income > 0)) return { invalid: "Enter your monthly take-home income." };
    const sum = (v.needsPct || 0) + (v.wantsPct || 0) + (v.savePct || 0);
    if (Math.abs(sum - 100) > 0.01) return { invalid: `Your three percentages add up to ${F.num(sum, 2)}% — adjust them to total 100%.` };

    const needs = (v.income * (v.needsPct || 0)) / 100;
    const wants = (v.income * (v.wantsPct || 0)) / 100;
    const save = (v.income * (v.savePct || 0)) / 100;
    const wk = (m) => (m * 12) / 52;
    const efTarget = needs * 6;
    const efMonths = save > 0 ? efTarget / save : null;

    const metrics = [
      { label: "Needs", value: F.money0(needs), hint: v.weekly ? F.money(wk(needs)) + " per week" : "essentials you can't easily cancel" },
      { label: "Wants", value: F.money0(wants), hint: v.weekly ? F.money(wk(wants)) + " per week" : "spending you'd cut first if income fell" },
      { label: "Yearly savings at this rate", value: F.money0(save * 12), hint: v.weekly ? F.money(wk(save)) + " per week" : "12 × " + F.money0(save) },
      {
        label: "Savings rate check",
        value: F.pct(v.savePct || 0, 1),
        hint: save > 0
          ? `a 6-month cushion of needs (${F.money0(efTarget)}) takes about ${F.dur(Math.round(efMonths))} at this pace`
          : "with nothing allocated to savings, an emergency fund never builds",
      },
    ];

    const cols = [
      { key: "cat", label: "Category", align: "left" }, { key: "p", label: "% of income" },
      { key: "mo", label: "Monthly" }, { key: "wk", label: "Weekly" }, { key: "yr", label: "Yearly" },
    ];
    const row = (cat, pct, amt, cls) => ({
      cat, p: F.pct(pct, 1), mo: F.money(amt), wk: F.money(wk(amt)), yr: F.money0(amt * 12),
      _csv_cat: cat, _csv_p: pct, _csv_mo: amt, _csv_wk: Math.round(wk(amt) * 100) / 100, _csv_yr: amt * 12,
      ...(cls ? { _cls: cls } : {}),
    });
    const rows = [
      row("Needs — housing, groceries, utilities, transport, insurance, minimum debt payments", v.needsPct || 0, needs),
      row("Wants — dining out, travel, subscriptions, hobbies, upgrades", v.wantsPct || 0, wants),
      row("Savings & debt repayment — emergency fund, investing, extra debt payments", v.savePct || 0, save),
      row("Total", 100, v.income, "year-row"),
    ];

    return {
      primary: { label: "Savings & debt repayment", value: F.money(save), sub: `per month — ${F.pct(v.savePct || 0, 1)} of your ${F.money0(v.income)} take-home` },
      metrics,
      explain: `<p>On <strong>${F.money0(v.income)}</strong> of monthly take-home pay, a ${F.num(v.needsPct || 0)}/${F.num(v.wantsPct || 0)}/${F.num(v.savePct || 0)} split allows <strong>${F.money0(needs)}</strong> for needs, <strong>${F.money0(wants)}</strong> for wants, and puts <strong>${F.money0(save)}</strong> a month toward savings and extra debt payments — <strong>${F.money0(save * 12)}</strong> a year.</p><p>${save > 0 ? `At that pace, a six-month emergency cushion of <strong>${F.money0(efTarget)}</strong> (6 × your monthly needs) takes about <strong>${F.dur(Math.round(efMonths))}</strong> to build.` : `Nothing is allocated to savings, so no emergency cushion builds — even a few percent moved from wants changes that.`}</p>`,
      chart: {
        title: "Where the month's income goes",
        cfg: {
          type: "donut",
          aria: "Donut chart splitting monthly income into needs, wants, and savings plus debt repayment",
          segments: [
            { label: "Needs", value: needs, color: "var(--c1)" },
            { label: "Wants", value: wants, color: "var(--c2)" },
            { label: "Savings & debt", value: save, color: "var(--c3)" },
          ],
          fmt: F.money,
          centerLabel: "Per month",
          centerValue: F.money0(v.income),
          summary: `Monthly income ${F.money0(v.income)}: ${F.money0(needs)} needs, ${F.money0(wants)} wants, ${F.money0(save)} savings and debt repayment.`,
        },
      },
      table: {
        title: "Suggested breakdown",
        csvName: "budget-breakdown",
        views: [{ id: "breakdown", label: "Breakdown", columns: cols, rows }],
      },
      scenario: {
        summary: `${F.money0(v.income)}/mo · ${F.num(v.needsPct || 0)}/${F.num(v.wantsPct || 0)}/${F.num(v.savePct || 0)} split`,
        metrics: [
          { label: "Needs", raw: needs, fmt: "money0", betterWhen: null },
          { label: "Wants", raw: wants, fmt: "money0", betterWhen: null },
          { label: "Savings & debt", raw: save, fmt: "money", betterWhen: "higher" },
        ],
      },
    };
  },
});
