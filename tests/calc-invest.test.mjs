import test from "node:test";
import assert from "node:assert/strict";
import { loadCalc, F, n, metric, scnRaw } from "./harness.mjs";

const close = (a, b, tol = 0.02) => assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

/* helper: default values from a config's input defs */
function defaults(cfg) {
  const v = {};
  for (const d of cfg.inputs) {
    v[d.id] = d.default != null ? d.default : d.type === "toggle" ? false : 0;
  }
  return v;
}

test("simple-interest-calculator: I = P·r·t crosscheck + zero rate", () => {
  const cfg = loadCalc("simple-interest-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent closed form: I = 10000 × 0.06 × 3
  const expected = 10000 * 0.06 * 3;
  close(n(r.primary.value), expected, 0.01);
  close(n(metric(r, "total amount")), 10000 + expected, 0.01);
  close(n(metric(r, "per year")), expected / 3, 0.01);
  close(n(metric(r, "per month")), expected / 36, 0.01);
  // compound comparison metric: 10000(1 + 0.06/12)^36 − 10000
  const comp = 10000 * Math.pow(1 + 0.06 / 12, 36) - 10000;
  close(n(metric(r, "compound")), comp, 0.02);
  close(scnRaw(r, "gap"), comp - expected, 0.02);
  assert.equal(r.chart.cfg.series.length, 2);
  assert.equal(r.table.views[0].rows.length, 3);

  // zero rate: no interest, no gap, never NaN
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 0, 0.001);
  close(scnRaw(zero, "gap"), 0, 0.001);
  assert.ok(!String(zero.primary.value).includes("NaN"));

  const bad = cfg.compute({ ...defaults(cfg), principal: 0 }, F);
  assert.ok(bad.invalid);
});

test("future-value-calculator: TVM crosscheck + begin/end timing sign", () => {
  const cfg = loadCalc("future-value-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent closed form: FV = P(1+i)^n + C[(1+i)^n − 1]/i, i = 0.07/12, n = 180
  const i = 0.07 / 12, f = Math.pow(1 + i, 180);
  const lump = 5000 * f;
  const annuity = 250 * (f - 1) / i;
  close(n(r.primary.value), lump + annuity, 0.5);
  close(n(metric(r, "lump sum alone")), lump, 0.5);
  close(n(metric(r, "contributions alone")), annuity, 0.5);
  close(scnRaw(r, "total contributed"), 5000 + 250 * 180, 0.01);
  close(scnRaw(r, "interest"), lump + annuity - 50000, 0.5);
  assert.equal(r.chart.cfg.type, "bars");
  assert.equal(r.chart.cfg.x.length, 5);
  assert.equal(r.table.views[0].rows.length, 15);

  // annuity due: beginning-of-month must exceed end-of-month by annuity × i exactly
  const due = cfg.compute({ ...defaults(cfg), timing: "begin" }, F);
  const dueFv = scnRaw(due, "future value"), endFv = scnRaw(r, "future value");
  assert.ok(dueFv > endFv, "begin timing must increase FV");
  close(dueFv - endFv, annuity * i, 0.5);

  // zero rate: FV = deposits, no interest
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 5000 + 250 * 180, 0.01);

  const bad = cfg.compute({ ...defaults(cfg), present: 0, contribution: 0 }, F);
  assert.ok(bad.invalid);
});

test("present-value-calculator: lump + stream crosschecks, zero rate", () => {
  const cfg = loadCalc("present-value-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent closed form: PV = 100000 / (1 + 0.06/12)^120
  const pvLump = 100000 / Math.pow(1 + 0.06 / 12, 120);
  close(n(r.primary.value), pvLump, 0.02);
  close(scnRaw(r, "discount applied"), 100000 - pvLump, 0.02);
  close(n(metric(r, "% of nominal")), (pvLump / 100000) * 100, 0.1);
  assert.equal(r.chart.cfg.x.length, 11); // rates 2..12
  assert.equal(r.table.views[0].rows.length, 10);

  // stream mode: PV = C[1 − (1+i)^−n]/i, i = 0.005, n = 120
  const s = cfg.compute({ ...defaults(cfg), mode: "stream" }, F);
  const i = 0.06 / 12;
  const pvAnn = 1000 * (1 - Math.pow(1 + i, -120)) / i;
  close(n(s.primary.value), pvAnn, 0.02);
  close(n(metric(s, "nominal")), 120000, 0.5);
  assert.equal(s.table.views[0].rows.length, 10);

  // zero discount rate: PV equals nominal in both modes
  const z1 = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(z1.primary.value), 100000, 0.01);
  const z2 = cfg.compute({ ...defaults(cfg), mode: "stream", rate: 0 }, F);
  close(n(z2.primary.value), 120000, 0.01);

  const bad = cfg.compute({ ...defaults(cfg), future: 0 }, F);
  assert.ok(bad.invalid);
});

test("sip-calculator: annuity crosscheck + step-up increases result", () => {
  const cfg = loadCalc("sip-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent closed form: FV = 10000 × [(1.01)^180 − 1] / 0.01
  const i = 0.12 / 12;
  const expected = 10000 * (Math.pow(1 + i, 180) - 1) / i;
  close(n(r.primary.value), expected, 0.5);
  close(scnRaw(r, "invested"), 1800000, 0.01);
  close(scnRaw(r, "wealth gained"), expected - 1800000, 0.5);
  assert.equal(r.table.views[0].rows.length, 15);
  assert.equal(r.chart.cfg.type, "area");
  // contrast metric at stepUp=0 shows the 10% step-up value
  assert.ok(r.metrics.some((m) => m.label.includes("with 10% step-up")));

  // step-up: independent month-by-month simulation with 10% yearly raises
  const su = cfg.compute({ ...defaults(cfg), stepUp: 10 }, F);
  let bal = 0, c = 10000, invested = 0;
  for (let m = 1; m <= 180; m++) {
    bal = bal * (1 + i) + c;
    invested += c;
    if (m % 12 === 0) c *= 1.1;
  }
  close(scnRaw(su, "maturity"), bal, 1);
  close(scnRaw(su, "invested"), invested, 1);
  assert.ok(scnRaw(su, "maturity") > scnRaw(r, "maturity"), "step-up must increase maturity value");
  assert.ok(su.metrics.some((m) => m.label.includes("without step-up")));

  const bad = cfg.compute({ ...defaults(cfg), sip: 0 }, F);
  assert.ok(bad.invalid);
});

test("lump-sum-investment-calculator: FV crosscheck, doubling, inflation", () => {
  const cfg = loadCalc("lump-sum-investment-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent closed form: FV = 100000 × (1 + 0.10/12)^180
  const expected = 100000 * Math.pow(1 + 0.10 / 12, 180);
  close(n(r.primary.value), expected, 1);
  close(scnRaw(r, "growth"), expected - 100000, 1);
  close(scnRaw(r, "multiple"), expected / 100000, 0.01);
  // doubling metrics: rule of 72 = 7.2, exact monthly = ln2 / (12·ln(1 + 0.1/12))
  assert.ok(metric(r, "rule of 72").includes("7.2"));
  const exact = Math.log(2) / (12 * Math.log(1 + 0.10 / 12));
  close(n(metric(r, "exact doubling")), exact, 0.01);
  assert.equal(r.chart.cfg.series.length, 3);
  assert.ok(r.chart.cfg.series[1].dash && r.chart.cfg.series[2].dash);
  assert.equal(r.table.views[0].rows.length, 15);

  // inflation > 0 swaps the 4th metric to real value: FV / 1.03^15
  const infl = cfg.compute({ ...defaults(cfg), inflation: 3 }, F);
  close(n(metric(infl, "today's money")), expected / Math.pow(1.03, 15), 1);

  // yearly compounding: FV = 100000 × 1.10^15
  const yr = cfg.compute({ ...defaults(cfg), compFreq: 1 }, F);
  close(n(yr.primary.value), 100000 * Math.pow(1.10, 15), 1);

  const bad = cfg.compute({ ...defaults(cfg), amount: 0 }, F);
  assert.ok(bad.invalid);
});

test("roi-calculator: ROI arithmetic crosscheck + loss and costs edges", () => {
  const cfg = loadCalc("roi-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent arithmetic: ROI = (14000 − 10000) / 10000; CAGR = 1.4^(1/3) − 1
  close(scnRaw(r, "total roi"), 40, 0.001);
  close(n(metric(r, "net profit")), 4000, 0.01);
  const cagr = (Math.pow(14000 / 10000, 1 / 3) - 1) * 100;
  close(scnRaw(r, "annualized"), cagr, 0.01);
  close(n(metric(r, "break-even")), 10000, 0.01);
  assert.equal(r.chart.cfg.type, "bars");
  assert.deepEqual(r.chart.cfg.x, ["1 yr", "2 yr", "3 yr", "5 yr", "10 yr"]);
  assert.doesNotMatch(r.chart.cfg.summary, /savings|bonds|equities/i);
  assert.equal(r.table.views[0].rows.length, 5);

  // costs join the base: ROI = (14000 − 10000 − 500) / 10500
  const c = cfg.compute({ ...defaults(cfg), costs: 500 }, F);
  close(scnRaw(c, "total roi"), (3500 / 10500) * 100, 0.01);
  close(n(metric(c, "break-even")), 10500, 0.01);

  // loss: 10000 → 8000 over 3y = −20% ROI, negative annualized
  const loss = cfg.compute({ ...defaults(cfg), received: 8000 }, F);
  close(scnRaw(loss, "total roi"), -20, 0.001);
  close(scnRaw(loss, "annualized"), (Math.pow(0.8, 1 / 3) - 1) * 100, 0.01);
  assert.ok(scnRaw(loss, "net profit") < 0);

  const bad = cfg.compute({ ...defaults(cfg), invested: 0 }, F);
  assert.ok(bad.invalid);
});
