/* Refinance Calculator — payment recovery, same-date exit cost and lifetime cost. */
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
    { id: "closing", label: "Closing costs", type: "currency", default: 5000, min: 0, max: 10000000, optional: true, hint: "Enter the fees used in this scenario. Actual fee structures and so-called no-cost offers vary by lender and jurisdiction." },
    { id: "horizon", label: "Compare a sale or payoff after", type: "number", default: 60, min: 0, max: 480, integer: true, affixPost: "months", hint: "Includes the balance still owed on both loans at the same date. Fees are paid in cash; financed fees and settlement charges are excluded." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const old = FIN.amortize(v.balance, v.currentRate, v.remaining, {});
    if (!old) return { invalid: "The current loan never amortizes at these values. Check the rate and time remaining." };
    const nw = FIN.amortize(v.balance, v.newRate, v.newTerm, {});
    if (!nw) return { invalid: "The new loan never amortizes at these values. Check the new rate and term." };
    const closing = v.closing || 0;
    const save = FIN.pmt(v.balance, v.currentRate, v.remaining) - FIN.pmt(v.balance, v.newRate, v.newTerm); // positive → payment falls
    const candidate = save > 0 ? Math.ceil(closing / save) : null;
    const breakEven = closing === 0 ? 0 : candidate != null && candidate <= Math.min(old.months, nw.months) ? candidate : null;
    const lifetime = old.totalPaid - (nw.totalPaid + closing); // positive → refi saves money overall
    const horizon = v.horizon == null ? 60 : v.horizon;
    const exitOld = FIN.loanAtMonth(v.balance, v.currentRate, v.remaining, horizon);
    const exitNew = FIN.loanAtMonth(v.balance, v.newRate, v.newTerm, horizon);
    const exitSaving = exitOld.interest - exitNew.interest - closing;
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
    explain += `<p>${closing === 0 ? "There are no upfront fees to recover." : breakEven != null ? `Monthly payment savings recover the <strong>${F.money0(closing)}</strong> cash fee in <strong>${F.dur(breakEven)}</strong>. This payment-only measure excludes the difference in remaining balances.` : save > 0 ? "Payment savings do not recover the cash fee while both loans are still making scheduled payments." : `The payment ${save < 0 ? "rises" : "is unchanged"}, so there is no fee recovery from a lower monthly payment.`} Over the full schedules, the refinance ${Math.abs(lifetime) < 0.005 ? "has the same modeled cost" : lifetime > 0 ? `saves <strong>${F.money0(lifetime)}</strong>` : `costs <strong>${F.money0(-lifetime)}</strong> more`} including fees.</p>`;
    explain += `<p><strong>Exit after month ${horizon}:</strong> comparing payments made, remaining principal and cash closing costs, refinancing ${Math.abs(exitSaving) < 0.005 ? "has the same modeled exit cost" : exitSaving > 0 ? `costs <strong>${F.money(Math.abs(exitSaving))}</strong> less` : `costs <strong>${F.money(Math.abs(exitSaving))}</strong> more`}. This assumes payoff immediately after the scheduled payment, no settlement charges and no interest between payment dates.</p>`;
    if (reset) {
      explain += `<p><strong>Term reset:</strong> the new ${F.dur(v.newTerm)} term is longer than the ${F.dur(v.remaining)} remaining term. The modeled lifetime difference includes these extra payments; the exit comparison also accounts for principal still owed at your selected date.</p>`;
    }

    return {
      primary: {
        label: "Monthly payment change",
        value: sgn(nw.payment - old.payment, F.money) || F.money(0),
        sub: `${F.money(nw.payment)}/mo new vs ${F.money(old.payment)}/mo now`,
      },
      metrics: [
        {
          label: "Payment-only break-even",
          value: breakEven == null ? "None" : breakEven === 0 ? "Immediate" : F.dur(breakEven),
          hint: closing === 0 ? "No cash fees to recover; this does not imply the refinance costs less" : breakEven == null ? "No recovery from lower payments while both schedules are active" : `${F.money0(closing)} fees ÷ ${F.money(save)} monthly saving; excludes remaining balances`,
        },
        {
          label: "Lifetime difference (incl. fees)",
          value: F.money0(Math.abs(lifetime)),
          hint: lifetime >= 0 ? "saved over the remaining life of the loan" : "added cost over the life of the loan",
        },
        { label: "Total interest — current loan", value: F.money0(old.totalInterest) },
        { label: "Total interest — new loan", value: F.money0(nw.totalInterest), hint: closing > 0 ? "plus " + F.money0(closing) + " closing costs" : "" },
        { label: `Exit cost difference at month ${horizon}`, value: F.money(Math.abs(exitSaving)), hint: Math.abs(exitSaving) < 0.005 ? "Same modeled exit cost" : exitSaving > 0 ? "Refinancing costs less at this exit date" : "Keeping the current loan costs less at this exit date" },
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
          {
            id: "exit", label: `Exit at month ${horizon}`,
            columns: [{ key: "m", label: "Metric", align: "left" }, { key: "cur", label: "Current loan" }, { key: "nw", label: "New loan" }],
            rows: [
              ["Payments already made", exitOld.paid, exitNew.paid],
              ["Remaining principal to settle", exitOld.balance, exitNew.balance],
              ["Cash closing costs", 0, closing],
              ["Total exit outlay", exitOld.paid + exitOld.balance, exitNew.paid + exitNew.balance + closing],
              ["Borrowing cost (interest + fees)", exitOld.interest, exitNew.interest + closing],
            ].map(([m, cur, nw]) => ({ m, cur: F.money(cur), nw: F.money(nw), _csv_m: m, _csv_cur: cur, _csv_nw: nw })),
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.balance)} · ${F.pct(v.currentRate)} → ${F.pct(v.newRate)} · ${F.dur(v.remaining)} → ${F.dur(v.newTerm)} · ${F.money0(closing)} fees · exit month ${horizon}`,
        metrics: [
          { label: "Monthly saving", raw: save, fmt: "money", betterWhen: "higher" },
          { label: "Lifetime saving (incl. fees)", raw: lifetime, fmt: "money0", betterWhen: "higher" },
          { label: "Break-even", raw: breakEven, fmt: "dur", betterWhen: "lower" },
          { label: "Saving at selected exit", raw: exitSaving, fmt: "money", betterWhen: "higher" },
        ],
      },
    };
  },
});
