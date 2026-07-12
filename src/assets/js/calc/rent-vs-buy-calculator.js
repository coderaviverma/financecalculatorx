/* Rent vs Buy Calculator — cumulative net cost of owning vs renting with opportunity cost. */
FCX.define({
  slug: "rent-vs-buy-calculator",
  inputs: [
    { id: "price", label: "Home price", type: "currency", default: 400000, min: 1000, max: 1000000000 },
    { id: "down", label: "Down payment", type: "currency", default: 80000, min: 0, max: 1000000000, hint: "A fixed 30-year mortgage is assumed on the rest." },
    { id: "rate", label: "Mortgage rate", type: "percent", default: 6.5, min: 0, max: 25, slider: { min: 1, max: 12, step: 0.05 } },
    { id: "rent", label: "Monthly rent today", type: "currency", default: 1900, min: 1, max: 10000000 },
    { id: "horizon", label: "How long you'll stay", type: "number", default: 10, min: 1, max: 30, integer: true, affixPost: "years", hint: "The comparison assumes you sell (and pay selling costs) when you leave." },
    { id: "rentGrowth", label: "Annual rent increase", type: "percent", default: 3.5, min: 0, max: 20, optional: true },
    { id: "appreciation", label: "Home appreciation", type: "percent", default: 3.5, min: 0, max: 20, optional: true },
    { id: "taxPct", label: "Property tax", type: "percent", default: 1.1, min: 0, max: 10, optional: true, affixPost: "% of value / yr" },
    { id: "insurance", label: "Home insurance (per year)", type: "currency", default: 1600, min: 0, max: 1000000, optional: true },
    { id: "maintenancePct", label: "Maintenance", type: "percent", default: 1, min: 0, max: 10, optional: true, affixPost: "% of value / yr" },
    { id: "closingPct", label: "Buying closing costs", type: "percent", default: 3, min: 0, max: 10, optional: true, affixPost: "% of price" },
    { id: "sellingPct", label: "Selling costs", type: "percent", default: 6, min: 0, max: 15, optional: true, affixPost: "% of sale price", hint: "Agent commission and transaction fees when you eventually sell." },
    { id: "investReturn", label: "Return on invested cash", type: "percent", default: 6, min: 0, max: 20, optional: true, hint: "What the down payment and closing cash could earn if you rented and invested it instead." },
  ],
  compute(v, F) {
    const FIN = F.fin;
    if (v.down >= v.price) return { invalid: "The down payment covers the whole price — compare a cash purchase separately." };
    const r = FIN.rentVsBuy({
      price: v.price, down: v.down, ratePct: v.rate, termYears: 30,
      closingPct: v.closingPct || 0, taxPct: v.taxPct || 0, insuranceYearly: v.insurance || 0,
      maintenancePct: v.maintenancePct || 0, hoaMonthly: 0, appreciationPct: v.appreciation || 0,
      sellingCostPct: v.sellingPct || 0, rentMonthly: v.rent, rentGrowthPct: v.rentGrowth || 0,
      rentersInsMonthly: 0, investReturnPct: v.investReturn || 0, horizonYears: v.horizon,
    });
    if (!r || !r.rows.length) return { invalid: "The mortgage never amortizes at these values. Check the rate." };
    const last = r.rows[r.rows.length - 1];
    const diff = last.rentNet - last.buyNet; // positive → buying is cheaper
    const upfront = v.down + ((v.closingPct || 0) / 100) * v.price;
    const verdict = Math.abs(diff) < 1 ? "even" : diff > 0 ? "buy" : "rent";

    const rows = r.rows.map((row) => {
      const d = row.rentNet - row.buyNet;
      return {
        y: row.year, buy: F.money0(row.buyNet), rent: F.money0(row.rentNet), diff: F.money0(d), eq: F.money0(row.equity),
        _csv_y: row.year, _csv_buy: row.buyNet, _csv_rent: row.rentNet, _csv_diff: Math.round(d), _csv_eq: row.equity,
      };
    });

    return {
      primary: {
        label: verdict === "buy" ? `Buying is cheaper over ${v.horizon} years` : verdict === "rent" ? `Renting is cheaper over ${v.horizon} years` : `Buying and renting cost about the same`,
        value: F.money0(Math.abs(diff)),
        sub: `net cost of buying ${F.money0(last.buyNet)} vs renting ${F.money0(last.rentNet)} at your horizon`,
      },
      metrics: [
        {
          label: "Break-even year",
          value: r.breakEven ? "Year " + r.breakEven : `Beyond ${v.horizon} years`,
          hint: r.breakEven ? "first year buying pulls ahead of renting" : "buying never catches up within your stay",
        },
        { label: "Net cost of buying", value: F.money0(last.buyNet), hint: "all outflows minus the equity you'd recover by selling" },
        { label: "Net cost of renting", value: F.money0(last.rentNet), hint: "rent paid minus growth on the cash you didn't tie up" },
        { label: "Home equity at horizon", value: F.money0(last.equity), hint: "market value minus the remaining loan" },
      ],
      explain: `<p>Buying ties up <strong>${F.money0(upfront)}</strong> upfront (down payment plus closing costs) and commits you to <strong>${F.money(r.payment)}</strong>/month of principal and interest, plus tax, insurance and maintenance. Renting starts at <strong>${F.money0(v.rent)}</strong>/month, rising ${F.pct(v.rentGrowth || 0, 1)} a year — but leaves that upfront cash invested at ${F.pct(v.investReturn || 0, 1)}.</p><p>After <strong>${v.horizon} years</strong>, buying nets out to <strong>${F.money0(last.buyNet)}</strong> (outflows minus <strong>${F.money0(last.equity)}</strong> of equity, after ${F.pct(v.sellingPct || 0, 1)} selling costs) against <strong>${F.money0(last.rentNet)}</strong> for renting. ${verdict === "buy" ? `Buying comes out about <strong>${F.money0(diff)}</strong> ahead` : verdict === "rent" ? `Renting comes out about <strong>${F.money0(-diff)}</strong> ahead` : `The two are effectively tied`}${r.breakEven ? `, with buying first pulling ahead in <strong>year ${r.breakEven}</strong>.` : `; at these numbers buying doesn't catch up before you'd move.`}</p>`,
      chart: {
        title: "Cumulative net cost: buying vs renting",
        note: "Where the lines cross is the break-even point. Buying starts high because of upfront and selling costs, then equity catches up.",
        cfg: {
          type: "lines",
          aria: "Line chart of the cumulative net cost of buying versus renting for each year of your stay",
          x: r.rows.map((row) => "Y" + row.year),
          xLabel: (x) => "Year " + x.slice(1),
          series: [
            { label: "Buying (net)", color: "var(--c1)", values: r.rows.map((row) => row.buyNet) },
            { label: "Renting (net)", color: "var(--c2)", values: r.rows.map((row) => row.rentNet) },
          ],
          fmt: F.money0,
          fmtAxis: F.compact,
          summary: `At year ${v.horizon}: buying ${F.money0(last.buyNet)}, renting ${F.money0(last.rentNet)}. ${r.breakEven ? "Break-even in year " + r.breakEven + "." : "No break-even within the horizon."}`,
        },
      },
      table: {
        title: "Year by year — positive difference favors buying",
        csvName: "rent-vs-buy-comparison",
        views: [
          {
            id: "annual",
            label: "Annual",
            columns: [
              { key: "y", label: "Year", align: "left" },
              { key: "buy", label: "Buy: net cost" },
              { key: "rent", label: "Rent: net cost" },
              { key: "diff", label: "Difference" },
              { key: "eq", label: "Home equity" },
            ],
            rows,
          },
        ],
      },
      scenario: {
        summary: `${F.money0(v.price)} vs ${F.money0(v.rent)}/mo rent · ${F.pct(v.rate)} · stay ${v.horizon}y`,
        metrics: [
          { label: "Net cost of buying", raw: last.buyNet, fmt: "money0", betterWhen: "lower" },
          { label: "Net cost of renting", raw: last.rentNet, fmt: "money0", betterWhen: "lower" },
          { label: "Break-even year", raw: r.breakEven, fmt: "num", betterWhen: "lower" },
        ],
      },
    };
  },
});
