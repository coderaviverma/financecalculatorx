import test from "node:test";
import assert from "node:assert/strict";
import { loadCalc, F, n, metric, scnRaw } from "./harness.mjs";

const close = (a, b, tol = 0.02) => assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

/* independent closed-form level payment: P·r·(1+r)^n / ((1+r)^n − 1) */
const pmtRef = (P, r, nper) => {
  if (r === 0) return P / nper;
  const f = Math.pow(1 + r, nper);
  return (P * r * f) / (f - 1);
};

/* helper: default values from a config's input defs */
function defaults(cfg) {
  const v = {};
  for (const d of cfg.inputs) v[d.id] = d.default != null ? d.default : d.type === "toggle" ? false : 0;
  return v;
}

test("emi-calculator: default EMI vs closed form, prepayment, zero rate", () => {
  const cfg = loadCalc("emi-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent check: 2,500,000 @ 8.5%/12 over 240 months
  const ref = pmtRef(2500000, 0.085 / 12, 240); // 21695.58
  close(n(r.primary.value), ref, 0.02);
  close(scnRaw(r, "monthly emi"), ref, 0.01);
  // total interest ≈ EMI×n − P (final-payment rounding aside)
  close(scnRaw(r, "total interest"), ref * 240 - 2500000, 1);
  close(scnRaw(r, "tenure"), 240, 0.01);
  assert.ok(r.chart && r.table && r.explain);
  assert.equal(r.table.views.find((v) => v.id === "monthly").rows.length, 240);
  assert.equal(r.chart.cfg.type, "donut");

  // one-time prepayment shortens tenure and saves interest; EMI unchanged
  const pre = cfg.compute({ ...defaults(cfg), prepay: 200000, prepayMonth: 24 }, F);
  close(n(pre.primary.value), ref, 0.02);
  close(scnRaw(pre, "tenure"), 203, 0.01);
  close(scnRaw(pre, "total interest"), 2100667.91, 1);
  assert.ok(pre.metrics.some((m) => m.label.toLowerCase().includes("saved")));

  // zero rate: EMI = P/n
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 2500000 / 240, 0.01);
});

test("personal-loan-calculator: payment, fee, effective APR, no-fee edge", () => {
  const cfg = loadCalc("personal-loan-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  const ref = pmtRef(15000, 0.115 / 12, 48); // 391.34
  close(n(r.primary.value), ref, 0.02);
  close(scnRaw(r, "monthly payment"), ref, 0.01);
  close(scnRaw(r, "amount received"), 14700, 0.01);
  close(n(metric(r, "origination fee")), 300, 0.01);

  // independent APR check: solve PV(payment, a, 48) = 14700 with an inline
  // annuity present-value, not the FIN library.
  const pv = (pay, annualPct, months) => {
    const rr = annualPct / 100 / 12;
    return rr === 0 ? pay * months : (pay * (1 - Math.pow(1 + rr, -months))) / rr;
  };
  let lo = 11.5, hi = 41.5;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (pv(ref, mid, 48) > 14700) lo = mid; else hi = mid;
  }
  close(scnRaw(r, "effective apr"), (lo + hi) / 2, 0.005); // ≈ 12.585
  assert.ok(r.chart.cfg.segments.some((s) => s.label.toLowerCase().includes("fee")));

  // no fee: APR equals the nominal rate, donut loses the fee slice
  const nofee = cfg.compute({ ...defaults(cfg), feePct: 0 }, F);
  close(scnRaw(nofee, "effective apr"), 11.5, 0.001);
  assert.ok(!nofee.chart.cfg.segments.some((s) => s.label.toLowerCase().includes("fee")));

  // zero rate with a fee still yields a positive APR
  const zr = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zr.primary.value), 15000 / 48, 0.01);
  assert.ok(scnRaw(zr, "effective apr") > 0);
});

test("loan-payment-calculator: frequencies vs closed form, invalid term", () => {
  const cfg = loadCalc("loan-payment-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  const refM = pmtRef(25000, 0.07 / 12, 60); // 495.03
  close(n(r.primary.value), refM, 0.02);
  close(scnRaw(r, "total interest"), refM * 60 - 25000, 0.5); // 4701.80
  close(scnRaw(r, "number of payments"), 60, 0.01);

  // biweekly: nominal/26 convention
  const bi = cfg.compute({ ...defaults(cfg), freq: 26 }, F);
  const refB = pmtRef(25000, 0.07 / 26, 130); // 228.18
  close(n(bi.primary.value), refB, 0.02);
  close(scnRaw(bi, "number of payments"), 130, 0.01);
  assert.ok(scnRaw(bi, "total interest") < scnRaw(r, "total interest"));

  // chart compares all three frequencies; table has one row per frequency
  assert.equal(r.chart.cfg.type, "bars");
  assert.equal(r.chart.cfg.x.length, 3);
  assert.equal(r.table.views[0].rows.length, 3);

  // zero rate: payment = P/n
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 25000 / 60, 0.01);

  // invalid: no term
  const bad = cfg.compute({ ...defaults(cfg), years: 0 }, F);
  assert.ok(bad.invalid);
});

test("loan-interest-calculator: total interest vs closed form, zero rate", () => {
  const cfg = loadCalc("loan-interest-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  const ref = pmtRef(30000, 0.08 / 12, 72); // 526.00
  close(scnRaw(r, "total interest"), ref * 72 - 30000, 1); // 7871.80
  close(n(r.primary.value), 7871.8, 1);
  close(scnRaw(r, "interest share"), (7871.8 / 30000) * 100, 0.05); // 26.2%
  close(scnRaw(r, "monthly payment"), ref, 0.01);
  // first-year interest metric and area chart shape
  close(n(metric(r, "first-year")), 2253.33, 0.5);
  assert.equal(r.chart.cfg.type, "area");
  assert.equal(r.chart.cfg.series.length, 2);
  assert.equal(r.table.views[0].rows.length, 6);
  // cumulative % of interest in the final year row reaches 100
  const lastRow = r.table.views[0].rows[5];
  close(lastRow._csv_pct, 100, 0.01);

  // zero rate: no interest at all, metrics stay finite
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  assert.ok(!zero.invalid);
  close(n(zero.primary.value), 0, 0.01);
  close(scnRaw(zero, "total paid"), 30000, 0.5);
  assert.ok(!/NaN/.test(JSON.stringify(zero)));
});

test("loan-amortization-calculator: dated schedule, payment vs closed form, dates", () => {
  const cfg = loadCalc("loan-amortization-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  const ref = pmtRef(200000, 0.06 / 12, 240); // 1432.86
  close(n(r.primary.value), ref, 0.02);
  close(scnRaw(r, "total interest"), ref * 240 - 200000, 1); // 143886.91
  close(scnRaw(r, "payoff"), 240, 0.01);
  // 240 months from Jul 2026 → final payment Jun 2046
  assert.equal(metric(r, "final payment"), "Jun 2046");
  close(n(metric(r, "halfway")), 129062.84, 0.5);
  // dated rows: first row Jul 2026, monthly view carries dates
  const monthly = r.table.views.find((v) => v.id === "monthly");
  assert.equal(monthly.rows.length, 240);
  assert.equal(monthly.rows[0].d, "Jul 2026");
  assert.equal(monthly.rows[0]._csv_d, "2026-07");
  assert.equal(monthly.rows[239].d, "Jun 2046");
  assert.equal(r.chart.cfg.type, "lines");
  // crossover cited in explain text (payment #103 on defaults)
  assert.ok(r.explain.includes("#103"));

  // zero rate: straight-line payoff, principal leads from payment one
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 200000 / 240, 0.01);
  close(scnRaw(zero, "total interest"), 0, 0.01);
  assert.ok(!/NaN/.test(JSON.stringify(zero)));

  // different start date shifts the calendar
  const jan = cfg.compute({ ...defaults(cfg), startMonth: 1, startYear: 2027 }, F);
  assert.equal(jan.table.views.find((v) => v.id === "monthly").rows[0].d, "Jan 2027");
  assert.equal(metric(jan, "final payment"), "Dec 2046");
});
