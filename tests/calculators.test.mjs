import test from "node:test";
import assert from "node:assert/strict";
import { loadCalc, F, n, metric, scnRaw } from "./harness.mjs";

const close = (a, b, tol = 0.02) => assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

/* helper: default values from a config's input defs */
function defaults(cfg) {
  const v = {};
  for (const d of cfg.inputs) {
    if (d.type === "debts") v.debts = (d.default || []).map((x) => ({ ...x }));
    else v[d.id] = d.default != null ? d.default : d.type === "toggle" ? false : 0;
  }
  return v;
}

test("loan-calculator: defaults, zero rate, extra payment, invalid", () => {
  const cfg = loadCalc("loan-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  close(n(r.primary.value), 400.76);
  close(scnRaw(r, "total interest"), 4045.54, 0.5);
  close(scnRaw(r, "payoff"), 60, 0.01);
  assert.ok(r.chart && r.table && r.explain);
  assert.equal(r.table.views.length, 2);
  assert.equal(r.table.views.find((v) => v.id === "monthly").rows.length, 60);

  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 333.33, 0.01);

  const extra = cfg.compute({ ...defaults(cfg), extra: 100 }, F);
  close(scnRaw(extra, "payoff"), 47, 0.01);
  close(scnRaw(extra, "total interest"), 3080.99, 0.5);
});

test("mortgage-calculator: PITI, PMI trigger, invalid down payment", () => {
  const cfg = loadCalc("mortgage-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  close(n(r.primary.value), 2194.79, 0.02); // 1769.79 P&I + 300 tax + 125 ins
  close(scnRaw(r, "principal & interest"), 1769.79, 0.02);
  close(scnRaw(r, "total interest"), 357124.57, 1);
  // 10% down → PMI appears in donut + PMI metric
  const pmi = cfg.compute({ ...defaults(cfg), down: 35000, pmiRate: 0.5 }, F);
  assert.ok(pmi.chart.cfg.segments.some((s) => s.label === "PMI"));
  assert.ok(pmi.metrics.some((m) => m.label === "PMI"));
  const bad = cfg.compute({ ...defaults(cfg), down: 400000 }, F);
  assert.ok(bad.invalid);
});

test("compound-interest-calculator: reference growth + frequency effect", () => {
  const cfg = loadCalc("compound-interest-calculator");
  const r = cfg.compute(defaults(cfg), F);
  close(n(r.primary.value), 144572.72, 0.5);
  close(scnRaw(r, "interest earned"), 86572.72, 0.5);
  const annual = cfg.compute({ ...defaults(cfg), compFreq: 1 }, F);
  close(n(annual.primary.value), 140204.12, 1);
  const empty = cfg.compute({ ...defaults(cfg), principal: 0, contribution: 0 }, F);
  assert.ok(empty.invalid);
  // effective rate metric sanity: 7% monthly → 7.229%
  assert.ok(metric(r, "effective").includes("7.229"));
});

test("investment-calculator: nominal + real values", () => {
  const cfg = loadCalc("investment-calculator");
  const r = cfg.compute(defaults(cfg), F);
  close(scnRaw(r, "projected"), 548914.96, 1);
  close(scnRaw(r, "today"), 262164.84, 1);
  close(scnRaw(r, "invested"), 160000, 0.01);
  assert.equal(r.chart.cfg.series.length, 3);
  assert.equal(r.table.views[0].rows.length, 25);
});

test("debt-payoff-calculator: avalanche vs snowball reference", () => {
  const cfg = loadCalc("debt-payoff-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  close(scnRaw(r, "debt-free"), 33, 0.01);
  close(scnRaw(r, "total interest"), 4773.44, 0.5);
  const snow = cfg.compute({ ...defaults(cfg), method: "snowball" }, F);
  close(scnRaw(snow, "total interest"), 5307.68, 0.5);
  // impossible minimum flagged
  const bad = cfg.compute({ debts: [{ name: "Trap", balance: 10000, apr: 24, min: 150 }], extra: 0, method: "avalanche" }, F);
  assert.ok(bad.invalid && bad.invalid.includes("Trap"));

  // The extra budget can rescue a minimum that only equals monthly interest.
  const rescued = cfg.compute({ debts: [{ name: "Debt", balance: 1000, apr: 12, min: 10 }], extra: 100, method: "avalanche" }, F);
  assert.ok(!rescued.invalid);
  close(scnRaw(rescued, "debt-free"), 10, 0.01);
  close(scnRaw(rescued, "total interest"), 53.78, 0.01);
  assert.equal(metric(rescued, "saved vs"), "Not reached");
  assert.ok(!JSON.stringify(rescued).includes("undefined"));

  // Duplicate display names retain distinct payoff rows through stable IDs.
  const duplicate = cfg.compute({
    debts: [
      { name: "Same", balance: 1000, apr: 12, min: 10 },
      { name: "Same", balance: 500, apr: 6, min: 20 },
    ],
    extra: 100,
    method: "avalanche",
  }, F);
  assert.deepEqual(duplicate.table.views[0].rows.map((row) => row._csv_paid), [10, 13]);
  assert.deepEqual(duplicate.table.views[0].rows.map((row) => row._csv_ord), [1, 2]);

  // The alternative and minimum-only simulations may exceed the cap even
  // when the selected avalanche plan is valid; output stays finite and omits
  // unavailable chart series rather than dereferencing null fields.
  const cappedComparisons = cfg.compute({
    debts: [
      { name: "High", balance: 500, apr: 24, min: 5 },
      { name: "Low", balance: 100, apr: 0, min: 1 },
    ],
    extra: 5,
    method: "avalanche",
  }, F);
  assert.ok(!cappedComparisons.invalid);
  assert.equal(cappedComparisons.chart.cfg.series.length, 1);
  assert.equal(metric(cappedComparisons, "snowball would cost"), "Not reached");
  assert.equal(metric(cappedComparisons, "saved vs"), "Not reached");
  assert.ok(!/undefined|NaN/.test(JSON.stringify(cappedComparisons)));
});
