/* Personal Loan Calculator — payment, origination fee, net disbursal, effective APR. */
FCX.define({
  slug: "personal-loan-calculator",
  inputs: [
    { id: "amount", label: "Loan amount", type: "currency", default: 15000, min: 100, max: 10000000 },
    { id: "rate", label: "Annual interest rate", type: "percent", default: 11.5, min: 0, max: 40, slider: { min: 4, max: 30, step: 0.1 }, tip: "Unsecured rates run well above mortgage or car-loan rates and depend heavily on your credit score." },
    { id: "term", label: "Repayment term", type: "term", default: 48, min: 6, max: 120 },
    { id: "feePct", label: "Origination fee", type: "percent", default: 2, min: 0, max: 12, optional: true, affixPost: "% of loan", hint: "Deducted from the money you receive — you still repay the full loan amount." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    const am = FIN.amortize(v.amount, v.rate, v.term, {});
    if (!am) return { invalid: "This loan never pays off at these values. Check the rate and term." };
    const fee = (v.amount * (v.feePct || 0)) / 100;
    const net = v.amount - fee;
    if (net <= 0) return { invalid: "The fee consumes the whole loan — nothing would be disbursed." };

    // Effective APR: the rate at which the payment stream is worth exactly the net amount received.
    let apr = v.rate;
    if (fee > 0) {
      let lo = v.rate, hi = v.rate + 30;
      for (let i = 0; i < 60; i++) {
        const mid = (lo + hi) / 2;
        if (FIN.principalFromPayment(am.payment, mid, v.term) > net) lo = mid; else hi = mid;
      }
      apr = (lo + hi) / 2;
    }

    const fmtRow = (r, label) => ({
      n: label, pay: F.money(r.payment), pri: F.money(r.principal), int: F.money(r.interest), bal: F.money(r.balance),
      _csv_n: r.i, _csv_pay: r.payment, _csv_pri: r.principal, _csv_int: r.interest, _csv_bal: r.balance,
    });
    const cols = [
      { key: "n", label: "#", align: "left" }, { key: "pay", label: "Payment" }, { key: "pri", label: "Principal" },
      { key: "int", label: "Interest" }, { key: "bal", label: "Balance" },
    ];
    const segments = [
      { label: "Money you receive", value: net, color: "var(--c1)" },
      { label: "Interest", value: am.totalInterest, color: "var(--c2)" },
    ];
    if (fee > 0) segments.push({ label: "Origination fee", value: fee, color: "var(--c3)" });

    return {
      primary: { label: "Monthly payment", value: F.money(am.payment), sub: `for ${F.dur(v.term)} at ${F.pct(v.rate)} nominal` },
      metrics: [
        { label: "Total interest", value: F.money(am.totalInterest) },
        { label: "Origination fee", value: F.money(fee), hint: fee > 0 ? F.pct(v.feePct) + " of the loan, kept by the lender" : "no fee entered" },
        { label: "You actually receive", value: F.money(net), hint: fee > 0 ? "but you repay the full " + F.money0(v.amount) : "the full loan amount" },
        { label: "Effective APR", value: F.pct(apr, 2), hint: fee > 0 ? "true cost including the fee" : "equals the rate — no fee" },
      ],
      explain: `<p>Borrowing <strong>${F.money0(v.amount)}</strong> at <strong>${F.pct(v.rate)}</strong> for <strong>${F.dur(v.term)}</strong> costs <strong>${F.money(am.payment)}</strong> per month and <strong>${F.money(am.totalInterest)}</strong> in interest.</p>` +
        (fee > 0
          ? `<p>Because the lender deducts a <strong>${F.money(fee)}</strong> origination fee, only <strong>${F.money(net)}</strong> lands in your account — yet the payments are calculated on the full ${F.money0(v.amount)}. Measured against the money you actually received, the true cost is <strong>${F.pct(apr, 2)}</strong> APR, not ${F.pct(v.rate)}.</p>`
          : `<p>With no origination fee, the effective APR equals the nominal rate of <strong>${F.pct(v.rate)}</strong>.</p>`),
      chart: {
        title: "What the repayments cover",
        note: fee > 0 ? "The fee never reaches you, but you repay it with interest as part of the principal." : "",
        cfg: {
          type: "donut",
          aria: `Donut chart splitting total repayment into net disbursal ${F.money0(net)}, interest ${F.money0(am.totalInterest)}${fee > 0 ? " and origination fee " + F.money0(fee) : ""}`,
          segments,
          fmt: F.money,
          centerLabel: "Total repaid",
          centerValue: F.compact(am.totalPaid),
          summary: `Of the ${F.money0(am.totalPaid)} repaid: ${F.money0(net)} is money you received, ${F.money0(am.totalInterest)} is interest${fee > 0 ? ", " + F.money0(fee) + " is the origination fee" : ""}.`,
        },
      },
      table: {
        title: "Amortization schedule",
        csvName: "personal-loan-schedule",
        views: [
          { id: "annual", label: "Annual", columns: cols, rows: FIN.annualize(am.rows).map((r) => fmtRow(r, "Year " + r.i)) },
          { id: "monthly", label: "Monthly", columns: cols, rows: am.rows.map((r) => fmtRow(r, r.i)) },
        ],
      },
      scenario: {
        summary: `${F.money0(v.amount)} · ${F.pct(v.rate)} · ${F.dur(v.term)}${fee > 0 ? " · " + F.pct(v.feePct) + " fee" : ""}`,
        metrics: [
          { label: "Monthly payment", raw: am.payment, fmt: "money", betterWhen: "lower" },
          { label: "Total interest", raw: am.totalInterest, fmt: "money", betterWhen: "lower" },
          { label: "Effective APR", raw: apr, fmt: "pct", betterWhen: "lower" },
          { label: "Amount received", raw: net, fmt: "money", betterWhen: "higher" },
        ],
      },
    };
  },
});
