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

/* independent closed-form: monthly payment for principal P, annual % rate, n months */
const pmtRef = (P, annualPct, months) => {
  const r = annualPct / 100 / 12;
  if (r === 0) return P / months;
  const f = Math.pow(1 + r, months);
  return (P * r * f) / (f - 1);
};

test("mortgage-payment-calculator: closed-form payment, sensitivity, term flip", () => {
  const cfg = loadCalc("mortgage-payment-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent crosscheck: 300000 @ 6.5% / 360mo
  close(n(r.primary.value), pmtRef(300000, 6.5, 360), 0.01); // 1896.20
  close(n(r.primary.value), 1896.2, 0.01);
  close(scnRaw(r, "total interest"), 382633.47, 1);
  close(scnRaw(r, "payoff"), 360, 0.01);
  // chart: 5 bars at −1, −0.5, 0, +0.5, +1
  assert.equal(r.chart.cfg.x.length, 5);
  close(r.chart.cfg.series[0].values[0], pmtRef(300000, 5.5, 360), 0.01); // 1703.37
  close(r.chart.cfg.series[0].values[4], pmtRef(300000, 7.5, 360), 0.01); // 2097.64
  // table: 9 rows in 0.25% steps, all finite
  const rows = r.table.views[0].rows;
  assert.equal(rows.length, 9);
  rows.forEach((row) => assert.ok(isFinite(row._csv_pay) && row._csv_pay > 0));
  // 15-year term
  const t15 = cfg.compute({ ...defaults(cfg), term: 180 }, F);
  close(n(t15.primary.value), pmtRef(300000, 6.5, 180), 0.01); // 2613.32
  close(scnRaw(t15, "total interest"), 170397.98, 1);
  // edge: very low rate — negative sensitivity steps are dropped, nothing NaN
  const low = cfg.compute({ ...defaults(cfg), rate: 0.5 }, F);
  assert.ok(!low.invalid);
  assert.ok(low.chart.cfg.x.length < 5);
  low.chart.cfg.series[0].values.forEach((x) => assert.ok(isFinite(x)));
});

test("mortgage-amortization-calculator: dated schedule, crossover, extra payment", () => {
  const cfg = loadCalc("mortgage-amortization-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  close(n(r.primary.value), pmtRef(320000, 6.25, 360), 0.01); // 1970.30
  close(scnRaw(r, "total interest"), 389306.21, 1);
  // crossover: first month principal > interest = payment #228 → June 2045 (start July 2026)
  assert.ok(metric(r, "crossover").includes("Jun 2045"));
  // balance after 5 years and final payment date
  close(n(metric(r, "balance after 5")), 298679, 1);
  assert.equal(metric(r, "final payment"), "Jun 2056");
  // monthly view: 360 dated rows, first is July 2026
  const monthly = r.table.views.find((v) => v.id === "monthly");
  assert.equal(monthly.rows.length, 360);
  assert.equal(monthly.rows[0].date, "Jul 2026");
  assert.equal(r.chart.cfg.series.length, 2);
  // edge: extra 200/month → 282-month payoff, big interest cut
  const ex = cfg.compute({ ...defaults(cfg), extra: 200 }, F);
  close(scnRaw(ex, "payoff"), 282, 0.01);
  close(scnRaw(ex, "total interest"), 290286.72, 1);
  assert.equal(metric(ex, "crossover"), "Nov 2038"); // crossover moves up to payment #149
});

test("mortgage-payoff-calculator: interest saved vs nper crosscheck, lump-only, no extras", () => {
  const cfg = loadCalc("mortgage-payoff-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent crosscheck of accelerated months via nper closed form
  const basePmt = pmtRef(240000, 6, 264); // 1639.38
  const rm = 6 / 100 / 12;
  const accMonths = Math.ceil(-Math.log(1 - (rm * 240000) / (basePmt + 200)) / Math.log(1 + rm));
  assert.equal(accMonths, 212);
  close(scnRaw(r, "time saved"), 264 - accMonths, 0.01); // 52 months
  close(n(r.primary.value), 43095.2, 0.5); // interest saved
  close(scnRaw(r, "new total interest"), 149700.77, 0.5);
  close(n(metric(r, "current plan")), 192796, 1);
  // lump-only path
  const lump = cfg.compute({ ...defaults(cfg), extra: 0, lump: 10000, lumpMonth: 1 }, F);
  close(n(lump.primary.value), 25256.91, 0.5);
  close(scnRaw(lump, "time saved"), 21, 0.01);
  // edge: no extras at all → zero saved, still valid, plans identical
  const none = cfg.compute({ ...defaults(cfg), extra: 0, lump: 0 }, F);
  assert.ok(!none.invalid);
  close(n(none.primary.value), 0, 0.001);
  close(scnRaw(none, "time saved"), 0, 0.001);
});

test("house-affordability-calculator: DTI caps arithmetic, binding flip, crushing debts", () => {
  const cfg = loadCalc("house-affordability-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent crosscheck: min(8000×28%−350, 8000×36%−400−350) = 1890 front-binding
  const gross = 96000 / 12;
  const maxPI = Math.min(gross * 0.28 - 350, gross * 0.36 - 400 - 350);
  assert.equal(maxPI, 1890);
  const rm = 6.5 / 100 / 12;
  const loanRef = (maxPI * (1 - Math.pow(1 + rm, -360))) / rm;
  close(scnRaw(r, "affordable price"), loanRef + 40000, 1); // 339018.45
  close(scnRaw(r, "affordable price"), 339018.45, 1);
  close(scnRaw(r, "max monthly"), 1890, 0.01);
  close(scnRaw(r, "loan"), 299018.45, 1);
  assert.ok(metric(r, "limits").toLowerCase().includes("front"));
  // chart covers the three standards; conservative bar matches its price
  assert.equal(r.chart.cfg.x.length, 3);
  close(r.chart.cfg.series[0].values[0], 301047.85, 1);
  close(r.chart.cfg.series[0].values[2], 376989.05, 1);
  // heavier debts flip the binding constraint to back-end
  const back = cfg.compute({ ...defaults(cfg), debts: 1200 }, F);
  close(scnRaw(back, "affordable price"), 250420.39, 1);
  assert.ok(metric(back, "limits").toLowerCase().includes("debt"));
  // edge: crushing debts exhaust the back-end cap entirely
  const crush = cfg.compute({ ...defaults(cfg), debts: 3000 }, F);
  assert.ok(crush.invalid);
});

test("down-payment-calculator: cash target, savings runway closed form, ready-now", () => {
  const cfg = loadCalc("down-payment-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  close(n(r.primary.value), 70000, 0.01); // 20% of 350000
  close(scnRaw(r, "cash needed"), 80500, 0.01); // +3% closing
  // independent crosscheck: months via annuity closed form (deposit after growth)
  const rm = 4 / 100 / 12;
  const nRef = Math.ceil(Math.log((80500 + 800 / rm) / (20000 + 800 / rm)) / Math.log(1 + rm));
  assert.equal(nRef, 63);
  close(scnRaw(r, "time to save"), 63, 0.01);
  assert.ok(metric(r, "ready by").includes("2031"));
  // options table: 6 tiers with correct PMI flags
  const rows = r.table.views[0].rows;
  assert.equal(rows.length, 6);
  assert.equal(rows[0].pmi, "Yes"); // 3%
  assert.equal(rows[4].pmi, "No"); // 20%
  close(rows[1]._csv_cash, 28000, 0.01); // 5% → 17500 + 10500
  // edge: savings already cover the target
  const ready = cfg.compute({ ...defaults(cfg), savings: 100000 }, F);
  assert.ok(!ready.invalid);
  assert.equal(metric(ready, "time to save"), "Ready now");
  close(scnRaw(ready, "time to save"), 0, 0.001);
});

test("rent-vs-buy-calculator: verdict at horizon, renter year-1 identity, 1-year edge", () => {
  const cfg = loadCalc("rent-vs-buy-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // library reference values at the 10-year horizon
  close(scnRaw(r, "buying"), 193605.6, 1);
  close(scnRaw(r, "renting"), 194717.78, 1);
  close(n(r.primary.value), 194717.78 - 193605.6, 1); // |difference| ≈ 1112
  assert.ok(r.primary.label.toLowerCase().includes("buying is cheaper"));
  assert.ok(metric(r, "break-even").includes("Year 10"));
  close(scnRaw(r, "break-even"), 10, 0.01);
  // independent identity: renter net year 1 = 12×rent − upfront×return = 22800 − 5520
  const upfront = 80000 + 0.03 * 400000;
  const rentNetY1 = 1900 * 12 - upfront * 0.06;
  const rows = r.table.views[0].rows;
  assert.equal(rows.length, 10);
  close(rows[0]._csv_rent, rentNetY1, 0.5); // 17280
  close(n(metric(r, "equity")), 292956, 1);
  // edge: 1-year horizon — renting wins big, no break-even
  const short = cfg.compute({ ...defaults(cfg), horizon: 1 }, F);
  assert.ok(!short.invalid);
  assert.ok(short.primary.label.toLowerCase().includes("renting is cheaper"));
  close(n(short.primary.value), 53828.72 - 17280, 1);
  assert.ok(metric(short, "break-even").includes("Beyond"));
  // edge: down payment covers the price
  const bad = cfg.compute({ ...defaults(cfg), down: 400000 }, F);
  assert.ok(bad.invalid);
});

test("refinance-calculator: break-even = fees/savings, term reset, higher-rate edge", () => {
  const cfg = loadCalc("refinance-calculator");
  const r = cfg.compute(defaults(cfg), F);
  assert.ok(!r.invalid);
  // independent crosscheck: payments and break-even from closed forms
  const oldPmt = pmtRef(260000, 7.25, 300); // 1879.30
  const newPmt = pmtRef(260000, 6.25, 300); // 1715.14
  const save = oldPmt - newPmt;
  close(scnRaw(r, "monthly saving"), save, 0.01); // 164.16
  close(scnRaw(r, "break-even"), Math.ceil(5000 / save), 0.01); // 31
  close(scnRaw(r, "lifetime"), 44247.23, 1);
  assert.ok(metric(r, "break-even").includes("2 yr 7 mo")); // 31 months
  close(n(metric(r, "current loan")), 303789, 1);
  close(n(metric(r, "new loan")), 254542, 1);
  assert.equal(r.table.views[0].rows.length, 5);
  // term reset: 30-year new term saves monthly but costs more overall + warns
  const reset = cfg.compute({ ...defaults(cfg), newTerm: 360 }, F);
  close(scnRaw(reset, "monthly saving"), oldPmt - pmtRef(260000, 6.25, 360), 0.01); // 278.44
  close(scnRaw(reset, "lifetime"), -17521.95, 1);
  assert.ok(reset.explain.toLowerCase().includes("term reset"));
  // edge: higher new rate → negative savings, no break-even, still valid
  const worse = cfg.compute({ ...defaults(cfg), newRate: 7.75 }, F);
  assert.ok(!worse.invalid);
  close(scnRaw(worse, "monthly saving"), oldPmt - pmtRef(260000, 7.75, 300), 0.01); // −84.55
  assert.equal(scnRaw(worse, "break-even"), null);
  assert.equal(metric(worse, "break-even"), "None");
});
