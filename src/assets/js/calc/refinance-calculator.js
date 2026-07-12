/* Refinance Calculator — payment change, honest break-even, lifetime cost incl. fees. */
FCX.define({
  slug: "refinance-calculator",
  inputs: [
    { id: "balance", label: "Current loan balance", type: "currency", default: 260000, min: 1000, max: 1000000000 },
    { id: "currentRate", label: "Current interest rate", type: "percent", default: 7.25, min: 0, max: 25 },
    { id: "remaining", label: "Time remaining", type: "term", default: 300, min: 6, max: 480, hint: "How long is left on your existing loan." },
    { id: "newRate", label: "New interest rate", type: "percent", default: 6.25, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    {
      id: "newTerm", label: "New loan term", type: "select", default: 300,
      options: [
        { v: 120, label: "10 years" }, { v: 180, label: "15 years" }, { v: 240, label: "20 years" },
        { v: 300, label: "25 years" }, { v: 360, label: "30 years" },
      ],
      hint: "Matching your remaining time avoids resetting the clock; a longer term lowers the payment but can raise lifetime cost.",
    },
    { id: "closing", label: "Closing costs", type: "currency", default: 5000, min: 0, max: 10000000, optional: true, hint: "Origination, appraisal, title — often 2–5% of the balance. A \"no-cost\" refi prices these into the rate instead." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const old = FIN.amortize(v.balance, v.currentRate, v.remaining, {});
    if (!old) return { invalid: "The current loan never amortizes at these values. Check the rate and time remaining." };
    const nw = FIN.amortize(v.balance, v.newRate, v.newTerm, {});
    if (!nw) return { invalid: "The new loan never amortizes at these values. Check the new rate and term." };
    const closing = v.closing || 0;
    const save = old.payment - nw.payment; // positive → payment falls
    const breakEven = save > 0 ? Math.ceil(closing / save) : null;
    const lifetime = old.totalPaid - (nw.totalPaid + closing); // positive → refi saves money overall
    const reset = v.newTerm > v.remaining;
    const sgn = (x, f) => (x > 0 ? "+" : x < 0 ? "−" : "") + f(Math.abs(x));

    // remaining balance by year under both loans
    const yrs = Math.ceil(Math.max(old.months, nw.months) / 12);
    const balAt = (rows, m) => (m <= 0 ? v.balance : m - 1 < rows.length ? rows[m - 1].balance : 0);
    const xs = [], bOld = [], bNew = [];
    for (let y = 0; y <= yrs; y++) { xs.push("Y" + y); bOld.push(balAt(old.rows, y * 12)); bNew.push(balAt(nw.rows, y * 12)); }

    const cmpRows = [
      { m: "Monthly payment", cur: F.money(old.payment), nw: F.money(nw.payment), d: sgn(nw.payment - old.payment, F.money), _csv_m: "payment", _csv_cur: old.payment, _csv_nw: nw.payment, _csv_d: FIN.r2(nw.payment - old.payment) },
      { m: "Interest rate", cur: F.pct(v.currentRate), nw: F.pct(v.newRate), d: sgn(v.newRate - v.currentRate, (x) => F.pct(x, 2)), _csv_m: "rate", _csv_cur: v.currentRate, _csv_nw: v.newRate, _csv_d: v.newRate - v.currentRate },
      { m: "Term", cur: F.dur(v.remaining), nw: F.dur(v.newTerm), d: sgn(v.newTerm - v.remaining, F.dur), _csv_m: "term_months", _csv_cur: v.remaining, _csv_nw: v.newTerm, _csv_d: v.newTerm - v.remaining },
      { m: "Total interest", cur: F.money0(old.totalInterest), nw: F.money0(nw.totalInterest), d: sgn(nw.totalInterest - old.totalInterest, F.money0), _csv_m: "total_interest", _csv_cur: old.totalInterest, _csv_nw: nw.totalInterest, _csv_d: FIN.r2(nw.totalInterest - old.totalInterest) },
      { m: "Total cost (incl. fees)", cur: F.money0(old.totalPaid), nw: F.money0(nw.totalPaid + closing), d: sgn(nw.totalPaid + closing - old.totalPaid, F.money0), _csv_m: "total_cost", _csv_cur: old.totalPaid, _csv_nw: FIN.r2(nw.totalPaid + closing), _csv_d: FIN.r2(nw.totalPaid + closing - old.totalPaid) },
    ];

    let explain = `<p>Refinancing <strong>${F.money0(v.balance)}</strong> from <strong>${F.pct(v.currentRate)}</strong> (${F.dur(v.remaining)} left) into a <strong>${F.dur(v.newTerm)}</strong> loan at <strong>${F.pct(v.newRate)}</strong> changes the payment from <strong>${F.money(old.payment)}</strong> to <strong>${F.money(nw.payment)}</strong> — ${save > 0 ? `<strong>${F.money(save)}</strong> less` : save < 0 ? `<strong>${F.money(-save)}</strong> more` : "no change"} per month.</p>`;
    if (save > 0) {
      explain += `<p>The <strong>${F.money0(closing)}</strong> of closing costs is recovered by the monthly saving in about <strong>${breakEven === 0 ? "no time" : F.dur(breakEven)}</strong>. Over the full schedules, the refinance ${lifetime >= 0 ? `saves <strong>${F.money0(lifetime)}</strong>` : `costs <strong>${F.money0(-lifetime)}</strong> more`} including fees.</p>`;
    } else {
      explain += `<p>The payment rises, so closing costs are never recovered from monthly savings — there is no payment break-even. ${lifetime > 0 ? `The shorter schedule still ${reset ? "changes" : "cuts"} lifetime cost by <strong>${F.money0(lifetime)}</strong> including fees, which can make this worthwhile as a term-shortening move.` : `Lifetime cost also rises by <strong>${F.money0(-lifetime)}</strong> including fees — this refinance loses on both fronts.`}</p>`;
    }
    if (reset) {
      explain += `<p><strong>Term reset warning:</strong> the new ${F.dur(v.newTerm)} term is longer than the ${F.dur(v.remaining)} you have left. Stretching the balance over more payments ${lifetime < 0 ? `raises lifetime cost by <strong>${F.money0(-lifetime)}</strong> despite the lower rate` : `keeps lifetime cost lower here, but only because of the rate gap`} — compare the total-cost row in the table, not just the payment.</p>`;
    }

    return {
      primary: {
        label: "Monthly payment change",
        value: sgn(nw.payment - old.payment, F.money) || F.money(0),
        sub: `${F.money(nw.payment)}/mo new vs ${F.money(old.payment)}/mo now`,
      },
      metrics: [
        {
          label: "Break-even on closing costs",
          value: breakEven == null ? "None" : breakEven === 0 ? "Immediate" : F.dur(breakEven),
          hint: breakEven == null ? "the payment doesn't fall, so fees are never recouped monthly" : `${F.money0(closing)} fees ÷ ${F.money(save)} monthly saving`,
        },
        {
          label: "Lifetime difference (incl. fees)",
          value: F.money0(Math.abs(lifetime)),
          hint: lifetime >= 0 ? "saved over the remaining life of the loan" : "added cost over the life of the loan",
        },
        { label: "Total interest — current loan", value: F.money0(old.totalInterest) },
        { label: "Total interest — new loan", value: F.money0(nw.totalInterest), hint: closing > 0 ? "plus " + F.money0(closing) + " closing costs" : "" },
      ],
      explain,
      chart: {
        title: "Remaining balance: current loan vs new loan",
        note: reset ? "The new loan's line extends further right — that's the term reset." : "",
        cfg: {
          type: "lines",
          aria: "Line chart comparing the remaining balance of the current loan and the refinanced loan over the years",
          x: xs,
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Current loan", color: "var(--c5)", dash: "5 5", values: bOld },
            { label: "New loan", color: "var(--c1)", values: bNew },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `The current loan pays off in ${F.dur(old.months)}; the new loan in ${F.dur(nw.months)}.`,
        },
      },
      table: {
        title: "Current vs new loan",
        csvName: "refinance-comparison",
        views: [
          {
            id: "comparison",
            label: "Comparison",
            columns: [
              { key: "m", label: "Metric", align: "left" },
              { key: "cur", label: "Current loan" },
              { key: "nw", label: "New loan" },
              { key: "d", label: "Difference" },
            ],
            rows: cmpRows,
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.balance)} · ${F.pct(v.currentRate)} → ${F.pct(v.newRate)} · ${F.dur(v.remaining)} → ${F.dur(v.newTerm)} · ${F.money0(closing)} fees`,
        metrics: [
          { label: "Monthly saving", raw: save, fmt: "money", betterWhen: "higher" },
          { label: "Lifetime saving (incl. fees)", raw: lifetime, fmt: "money0", betterWhen: "higher" },
          { label: "Break-even", raw: breakEven, fmt: "dur", betterWhen: "lower" },
        ],
      },
    };
  },
});
