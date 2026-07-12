import test from "node:test";
import assert from "node:assert/strict";
import { loadCalc, F, n, metric, scnRaw } from "./harness.mjs";

const close = (a, b, tol = 0.02) => assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

/* helper: default values from a config's input defs */
function defaults(cfg) {
  const v = {};
  for (const d of cfg.inputs) v[d.id] = d.default != null ? d.default : d.type === "toggle" ? false : 0;
  return v;
}

test("savings-calculator: defaults vs inline annuity formula, goal date, zero rate", () => {
  const cfg = loadCalc("savings-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent crosscheck: FV = B(1+i)^n + D[(1+i)^n - 1]/i with i = 0.042/12, n = 120
  const i = 0.042 / 12, nper = 120;
  const fvCheck = 5000 * Math.pow(1 + i, nper) + 400 * (Math.pow(1 + i, nper) - 1) / i; // 67129.48
  close(n(r.primary.value), fvCheck, 0.5);
  close(scnRaw(r, "final balance"), 67129.48, 0.5);
  close(scnRaw(r, "interest"), fvCheck - 53000, 0.5);
  close(n(metric(r, "total deposited")), 53000, 0.5);
  assert.ok(metric(r, "effective").includes("4.282")); // ear(4.2, 12)
  assert.equal(r.table.views[0].rows.length, 10);
  assert.equal(r.chart.cfg.series.length, 2);
  // no goal set → 3 metrics, no goal metric, months-to-goal raw null
  assert.equal(r.metrics.length, 3);
  assert.equal(scnRaw(r, "months to goal"), null);

  // goal set: $50,000 reached in 92 months (7y 8mo), table year 8 marked
  const goal = cfg.compute({ ...defaults(cfg), goal: 50000 }, F);
  close(scnRaw(goal, "months to goal"), 92, 0.01);
  assert.equal(metric(goal, "goal reached in"), "7 yr 8 mo");
  const marked = goal.table.views[0].rows.find((row) => row._cls === "year-row");
  assert.ok(marked && marked._csv_y === 8);
  assert.ok(goal.chart.note.includes("goal"));

  // unreachable goal → share-of-goal metric instead of a date
  const far = cfg.compute({ ...defaults(cfg), balance: 0, deposit: 1, goal: 10000000 }, F);
  assert.ok(far.metrics.some((m) => m.label === "Share of goal reached"));
  assert.equal(scnRaw(far, "months to goal"), null);

  // zero rate → pure deposits
  const zero = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(n(zero.primary.value), 53000, 0.01);

  // nothing entered → invalid
  const empty = cfg.compute({ ...defaults(cfg), balance: 0, deposit: 0 }, F);
  assert.ok(empty.invalid);
});

test("monthly-investment-calculator: solved contribution round-trips through FIN.grow", () => {
  const cfg = loadCalc("monthly-investment-calculator");
  const FIN = F.fin;
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  const req = scnRaw(r, "required monthly");
  close(req, 519.7, 0.01);
  close(n(r.primary.value), 519.7, 0.01);
  // independent crosscheck: growing 5000 at 7% with the solved monthly must hit 100000 within $1
  const chk = FIN.grow({ principal: 5000, contribution: req, contribFreq: 12, annualPct: 7, years: 10, compFreq: 12 });
  close(chk.fv, 100000, 1);
  close(scnRaw(r, "total contributed"), req * 120, 0.5);
  close(n(metric(r, "growth does the rest")), 100000 - 5000 - req * 120, 1); // 32636.33
  close(scnRaw(r, "growth"), 32.64, 0.05); // share funded by growth %
  // sensitivity bars: 5 rates, monotonically decreasing requirement
  const vals = r.chart.cfg.series[0].values;
  assert.equal(vals.length, 5);
  for (let k = 1; k < vals.length; k++) assert.ok(vals[k] < vals[k - 1]);
  close(vals[0], 667.33, 0.01); // 3%
  close(vals[4], 391.96, 0.01); // 11%
  // timeline table: 5 rows, entered timeline highlighted, 20y row matches library
  const rows = r.table.views[0].rows;
  assert.equal(rows.length, 5);
  assert.equal(rows.find((row) => row._cls === "year-row")._csv_y, 10);
  close(rows[4]._csv_m, FIN.contributionForGoal(100000, 5000, 7, 20, 12), 0.01); // 153.20

  // goal already funded by principal growth → required 0, surplus reported
  const funded = cfg.compute({ ...defaults(cfg), target: 10000, principal: 6000 }, F);
  assert.equal(scnRaw(funded, "required monthly"), 0);
  close(n(metric(funded, "projected surplus")), 12057.97 - 10000, 0.5);
  assert.ok(funded.explain.includes("don't need to add anything"));

  // zero return → simple division (100000 - 5000) / 120
  const flat = cfg.compute({ ...defaults(cfg), rate: 0 }, F);
  close(scnRaw(flat, "required monthly"), 791.67, 0.01);

  // no target → invalid
  assert.ok(cfg.compute({ ...defaults(cfg), target: 0 }, F).invalid);
});

test("budget-calculator: plain-arithmetic split, weekly toggle, bad percentages", () => {
  const cfg = loadCalc("budget-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent crosscheck: straight percentages of 4500
  close(n(r.primary.value), 4500 * 0.2, 0.01); // 900 savings & debt
  close(scnRaw(r, "needs"), 4500 * 0.5, 0.01); // 2250
  close(scnRaw(r, "wants"), 4500 * 0.3, 0.01); // 1350
  close(n(metric(r, "yearly savings")), 900 * 12, 0.01); // 10800
  // emergency-fund pace: 6 × 2250 / 900 = 15 months → "1 yr 3 mo"
  assert.ok(metric(r, "savings rate check") === "20%");
  assert.ok(r.metrics.find((m) => m.label === "Savings rate check").hint.includes("1 yr 3 mo"));
  // donut segments sum to income
  const segSum = r.chart.cfg.segments.reduce((s, x) => s + x.value, 0);
  close(segSum, 4500, 0.01);
  // table: 3 buckets + total row highlighted; weekly column = monthly × 12/52
  const rows = r.table.views[0].rows;
  assert.equal(rows.length, 4);
  assert.equal(rows[3]._cls, "year-row");
  close(rows[0]._csv_wk, (2250 * 12) / 52, 0.01); // 519.23
  close(rows[3]._csv_mo, 4500, 0.01);

  // weekly toggle swaps metric hints to per-week amounts
  const wk = cfg.compute({ ...defaults(cfg), weekly: true }, F);
  assert.ok(wk.metrics.find((m) => m.label === "Needs").hint.includes("per week"));
  assert.ok(wk.metrics.find((m) => m.label === "Needs").hint.includes("519.23"));

  // percentages that don't total 100 → invalid message contains the actual sum
  const bad = cfg.compute({ ...defaults(cfg), savePct: 25 }, F);
  assert.ok(bad.invalid && bad.invalid.includes("105"));
  const badLow = cfg.compute({ ...defaults(cfg), wantsPct: 20 }, F);
  assert.ok(badLow.invalid && badLow.invalid.includes("90"));

  // zero income → invalid
  assert.ok(cfg.compute({ ...defaults(cfg), income: 0 }, F).invalid);
});
