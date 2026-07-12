/* Loan Payment Calculator — payment at monthly, biweekly or weekly frequency, with a
   side-by-side interest comparison. Convention: periodic rate = nominal annual rate ÷
   payments per year (the standard quoting method for consumer loans). */
FCX.define({
  slug: "loan-payment-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 25000, min: 100, max: 100000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 7, min: 0, max: 40, slider: { min: 0, max: 20, step: 0.05 } },
    { id: "years", label: "Loan term", type: "number", default: 5, min: 1, max: 40, integer: true, affixPost: "years" },
    { id: "freq", label: "Payment frequency", type: "segment", default: 12, options: [ { v: 12, label: "Monthly" }, { v: 26, label: "Biweekly" }, { v: 52, label: "Weekly" } ], hint: "Biweekly = every two weeks (26/yr). Weekly = 52/yr." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (!(v.years > 0)) return { invalid: "Enter a term of at least one year." };
    const FREQS = [
      { f: 12, label: "Monthly", per: "month" },
      { f: 26, label: "Biweekly", per: "two weeks" },
      { f: 52, label: "Weekly", per: "week" },
    ];
    const calcAt = (f) => {
      const n = Math.round(v.years * f);
      const pay = FIN.pmtPeriodic(v.amount, v.rate / 100 / f, n);
      const total = pay * n;
      return { n, pay, total, interest: total - v.amount };
    };
    const all = FREQS.map((q) => ({ ...q, ...calcAt(q.f) }));
    const cur = all.find((q) => q.f === +v.freq) || all[0];
    if (!isFinite(cur.pay) || cur.pay <= 0) return { invalid: "This loan never pays off at these values. Check the rate and term." };
    const monthlyEq = (cur.pay * cur.f) / 12;

    return {
      primary: { label: cur.label + " payment", value: F.money(cur.pay), sub: `${cur.n} payments over ${v.years} ${v.years === 1 ? "year" : "years"} at ${F.pct(v.rate)}` },
      metrics: [
        { label: "Total interest", value: F.money(cur.interest) },
        { label: "Total paid", value: F.money(cur.total) },
        { label: "Number of payments", value: F.num(cur.n, 0), hint: "one every " + cur.per },
        { label: "Equivalent monthly cost", value: F.money(monthlyEq), hint: "payment × " + cur.f + " ÷ 12" },
      ],
      explain: `<p>Repaying <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> over <strong>${v.years} ${v.years === 1 ? "year" : "years"}</strong> ${cur.f === 12 ? "monthly" : cur.f === 26 ? "every two weeks" : "weekly"} takes <strong>${F.num(cur.n, 0)}</strong> payments of <strong>${F.money(cur.pay)}</strong>, with <strong>${F.money(cur.interest)}</strong> of interest.</p>` +
        (cur.f !== 12
          ? `<p>The same loan paid monthly would cost <strong>${F.money(all[0].interest)}</strong> in interest — paying ${cur.label.toLowerCase()} saves about <strong>${F.money(all[0].interest - cur.interest)}</strong> because the balance falls a little sooner between due dates.</p>`
          : `<p>Switching to weekly payments would trim interest to <strong>${F.money(all[2].interest)}</strong> — a saving of about <strong>${F.money(all[0].interest - all[2].interest)}</strong> at the same rate and term.</p>`),
      chart: {
        title: "Total interest by payment frequency",
        note: "Same amount, rate and term — only the payment frequency changes.",
        cfg: {
          type: "bars",
          aria: `Bar chart comparing total interest: monthly ${F.money0(all[0].interest)}, biweekly ${F.money0(all[1].interest)}, weekly ${F.money0(all[2].interest)}`,
          x: all.map((q) => q.label),
          series: [{ label: "Total interest", color: "var(--c2)", values: all.map((q) => q.interest) }],
          fmt: F.money,
          fmtAxis: F.compact,
          summary: `Total interest over ${v.years} years: monthly ${F.money(all[0].interest)}, biweekly ${F.money(all[1].interest)}, weekly ${F.money(all[2].interest)}.`,
        },
      },
      table: {
        title: "Frequency comparison",
        csvName: "loan-payment-frequencies",
        views: [
          {
            id: "compare", label: "By frequency",
            columns: [
              { key: "fr", label: "Frequency", align: "left" }, { key: "pay", label: "Payment" },
              { key: "cnt", label: "# payments" }, { key: "int", label: "Total interest" }, { key: "tot", label: "Total paid" },
            ],
            rows: all.map((q) => ({
              fr: q.label, pay: F.money(q.pay), cnt: F.num(q.n, 0), int: F.money(q.interest), tot: F.money(q.total),
              _csv_fr: q.f, _csv_pay: q.pay, _csv_cnt: q.n, _csv_int: q.interest, _csv_tot: q.total,
            })),
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${v.years}y · ${cur.label.toLowerCase()}`,
        metrics: [
          { label: "Payment per period", raw: cur.pay, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: cur.interest, fmt: "money", betterWhen: "lower" },
          { label: "Total paid", raw: cur.total, fmt: "money", betterWhen: "lower" },
          { label: "Number of payments", raw: cur.n, fmt: "num", betterWhen: null },
        ],
      },
    };
  },
});
