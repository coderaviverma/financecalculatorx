import test from "node:test";
import assert from "node:assert/strict";
import { loadCalc, F, n, metric, scnRaw } from "./harness.mjs";

const close = (a, b, tol = 0.02) => assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

/* default values from a config's input defs */
function defaults(cfg) {
  const v = {};
  for (const d of cfg.inputs) v[d.id] = d.default != null ? d.default : d.type === "toggle" ? false : 0;
  return v;
}

/* independent closed-form annuity payment: A = P·r·(1+r)^n / ((1+r)^n − 1) */
const annuityPmt = (P, annualPct, months) => {
  const r = annualPct / 1200;
  const f = Math.pow(1 + r, months);
  return (P * r * f) / (f - 1);
};

test("loan-payoff-calculator: defaults vs closed-form nper; extra payment; invalid below interest", () => {
  const cfg = loadCalc("loan-payoff-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);

  // independent check: n = −ln(1 − r·B/A) / ln(1+r) with B=14000, 8.5%, A=350
  const mr = 8.5 / 1200;
  const nExact = -Math.log(1 - (mr * 14000) / 350) / Math.log(1 + mr); // ≈ 47.20
  const months = Math.ceil(nExact); // 48 (47 full payments + smaller final)
  close(scnRaw(r, "payoff"), months, 0.01);

  // total remaining cost = 47 full payments + adjusted final payment B47·(1+r)
  const k = months - 1;
  const f = Math.pow(1 + mr, k);
  const balK = 14000 * f - 350 * ((f - 1) / mr);
  const totalPaid = 350 * k + balK * (1 + mr);
  close(scnRaw(r, "total cost"), totalPaid, 0.5); // ≈ 16,519.68
  close(scnRaw(r, "interest"), totalPaid - 14000, 0.5); // ≈ 2,519.68
  assert.equal(r.chart.cfg.series.length, 1);
  assert.equal(r.table.views.length, 2);
  assert.ok(r.explain && r.metrics.length === 4);

  // extra payment: second chart series, faster payoff, savings metric
  const x = cfg.compute({ ...defaults(cfg), extra: 50 }, F);
  assert.equal(x.chart.cfg.series.length, 2);
  close(scnRaw(x, "payoff"), 41, 0.01);
  assert.ok(metric(x, "saved"));

  // payment at/below monthly interest → invalid naming the minimum ($99.17)
  const bad = cfg.compute({ ...defaults(cfg), payment: 99 }, F);
  assert.ok(bad.invalid && bad.invalid.includes("$99.17"));
});

test("extra-payment-calculator: savings vs independent balance walk; zero extras stay valid", () => {
  const cfg = loadCalc("extra-payment-calculator");
  const r = cfg.compute(defaults(cfg), F); // default: $100/month extra on 250k @ 6.5% / 360
  assert.ok(!r.invalid);

  // independent check: closed-form payment, then an explicit balance recursion
  const P = 250000, mr = 6.5 / 1200;
  const pay = annuityPmt(P, 6.5, 360); // ≈ 1,580.17
  const walk = (extra) => {
    let bal = P, ti = 0, m = 0;
    while (bal > 0.005 && m < 1200) {
      m++;
      const int = bal * mr;
      let pri = pay + extra - int;
      if (pri >= bal) pri = bal;
      bal -= pri;
      ti += int;
    }
    return { m, ti };
  };
  const base = walk(0), plus = walk(100);
  close(n(r.primary.value), base.ti - plus.ti, 1); // ≈ 58,859.88 saved
  close(scnRaw(r, "months saved"), base.m - plus.m, 0.01); // 56 months
  close(scnRaw(r, "total interest"), plus.ti, 1); // ≈ 260,001.34
  close(n(metric(r, "baseline total interest")), base.ti, 1); // ≈ 318,861.22
  assert.equal(r.chart.cfg.series.length, 2);
  assert.ok(r.table.views[0].columns.some((c) => c.key === "xtr")); // extra column present

  // no extras at all → still valid, zero saved, single balance series
  const none = cfg.compute({ ...defaults(cfg), extraMonthly: 0 }, F);
  assert.ok(!none.invalid);
  close(n(none.primary.value), 0, 0.001);
  close(scnRaw(none, "months saved"), 0, 0.01);
  assert.equal(none.chart.cfg.series.length, 1);
});

test("early-loan-payoff-calculator: required payment closed-form; target already met; non-amortizing current pace", () => {
  const cfg = loadCalc("early-loan-payoff-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);

  // independent closed forms: required payment and its exact total interest A·n − B
  const req = annuityPmt(18000, 7.5, 36); // ≈ 559.91
  close(n(r.primary.value), req);
  close(scnRaw(r, "required"), req, 0.01);
  close(scnRaw(r, "total interest"), req * 36 - 18000, 0.5); // ≈ 2,156.83
  close(scnRaw(r, "payoff"), 36, 0.01);
  close(n(metric(r, "extra needed")), req - 380, 0.02); // ≈ 179.91
  // current pace exists: nper(18000, 7.5, 380) ≈ 56.3 → both bars drawn
  assert.notEqual(metric(r, "at current"), "—");
  assert.equal(r.chart.cfg.series.length, 2);
  assert.equal(r.chart.cfg.type, "bars");

  // target slower than the current pace → already met, zero extra, no invalid
  const easy = cfg.compute({ ...defaults(cfg), target: 60 }, F);
  assert.ok(!easy.invalid);
  close(n(metric(easy, "extra needed")), 0, 0.001);
  assert.ok(easy.explain.toLowerCase().includes("already"));

  // current payment below monthly interest ($112.50) → not invalid; dash + single bar
  const low = cfg.compute({ ...defaults(cfg), payment: 100 }, F);
  assert.ok(!low.invalid);
  assert.equal(metric(low, "at current"), "—");
  assert.equal(low.chart.cfg.series.length, 1);
  close(n(low.primary.value), req, 0.02); // required payment unchanged by current pace
});

test("loan-comparison-calculator: totals, effective APR and break-even vs closed form; equal offers tie", () => {
  const cfg = loadCalc("loan-comparison-calculator");
  assert.equal(cfg.scenario, false);
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);

  // independent closed forms for both offers
  const payA = annuityPmt(20000, 8.9, 60); // ≈ 414.20
  const payB = annuityPmt(20000, 7.4, 60); // ≈ 399.81
  const costA = payA * 60 - 20000; // ≈ 4,851.83 (no fees)
  const costB = payB * 60 - 20000 + 500; // ≈ 4,488.56
  close(n(r.primary.value), costA - costB, 0.5); // ≈ 363.27
  assert.ok(r.primary.sub.includes("Offer B"));
  close(n(metric(r, "payment — offer a")), payA, 0.02);
  close(n(metric(r, "payment — offer b")), payB, 0.02);
  close(n(metric(r, "total cost — offer a")), costA, 0.5);
  close(n(metric(r, "total cost — offer b")), costB, 0.5);

  // break-even: first m with 500 + payB·m < payA·m → ceil(500 / (payA − payB)) = 35
  const be = Math.ceil(500 / (payA - payB) + 1e-9);
  assert.ok(r.explain.includes(`month ${be}`));

  // effective APR of B (fees deducted from proceeds) ≈ 8.47% in the comparison table
  assert.equal(r.table.views.length, 1);
  const aprRow = r.table.views[0].rows.find((row) => row.m.toLowerCase().includes("apr"));
  assert.ok(aprRow && aprRow.b.includes("8.47"));
  assert.equal(r.chart.cfg.type, "bars");
  assert.equal(r.chart.cfg.series.length, 2);
  assert.ok(!r.scenario);

  // identical offers → zero difference and an explicit tie
  const same = cfg.compute({ ...defaults(cfg), rateB: 8.9, feesB: 0 }, F);
  close(n(same.primary.value), 0, 0.005);
  assert.ok(same.primary.sub.includes("same"));
});
