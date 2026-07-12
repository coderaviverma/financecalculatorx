import test from "node:test";
import assert from "node:assert/strict";
import { loadFinance } from "./harness.mjs";

const FIN = loadFinance();
const close = (a, b, tol = 0.02) => assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

test("pmt matches known reference values", () => {
  close(FIN.pmt(250000, 6.5, 360), 1580.17);
  close(FIN.pmt(100000, 6, 180), 843.86);
  close(FIN.pmt(20000, 7.5, 60), 400.76);
  close(FIN.pmt(280000, 6.5, 360), 1769.79);
});

test("pmt with zero interest is principal/months", () => {
  close(FIN.pmt(20000, 0, 60), 333.3333, 0.001);
});

test("amortize closes balance to zero and sums correctly", () => {
  const a = FIN.amortize(20000, 7.5, 60, {});
  assert.equal(a.months, 60);
  assert.equal(a.rows.length, 60);
  assert.equal(a.rows[59].balance, 0);
  close(a.totalInterest, 4045.54, 0.5);
  close(a.totalPaid, 24045.54, 0.5);
  // principal portions must sum to the loan
  const pri = a.rows.reduce((s, r) => s + r.principal, 0);
  close(pri, 20000, 0.5);
});

test("amortize with extra payment shortens schedule and saves interest", () => {
  const base = FIN.amortize(20000, 7.5, 60, {});
  const extra = FIN.amortize(20000, 7.5, 60, { extraMonthly: 100 });
  assert.equal(extra.months, 47);
  close(base.totalInterest - extra.totalInterest, 964.55, 0.5);
  assert.ok(extra.rows[extra.rows.length - 1].balance === 0);
});

test("amortize rejects loans that never pay off", () => {
  // payment override below interest-only
  const bad = FIN.amortize(100000, 12, 360, { paymentOverride: 900 }); // interest = 1000/mo
  assert.equal(bad, null);
});

test("amortize handles very small and very large values", () => {
  const small = FIN.amortize(100, 5, 12, {});
  assert.equal(small.months, 12);
  assert.equal(small.rows[11].balance, 0);
  const big = FIN.amortize(50000000, 4.2, 360, {});
  assert.equal(big.months, 360);
  close(big.payment, FIN.pmt(50000000, 4.2, 360), 0.02);
});

test("annualize groups rows into years", () => {
  const a = FIN.amortize(20000, 7.5, 60, {});
  const y = FIN.annualize(a.rows);
  assert.equal(y.length, 5);
  close(y.reduce((s, r) => s + r.interest, 0), a.totalInterest, 0.1);
  assert.equal(y[4].balance, 0);
});

test("grow matches reference values", () => {
  const g = FIN.grow({ principal: 10000, contribution: 200, annualPct: 7, years: 20 });
  close(g.fv, 144572.72, 0.5);
  close(g.totalContrib, 48000, 0.01);
  close(g.interest, 86572.72, 0.5);
  assert.equal(g.rows.length, 20);
  const annual = FIN.grow({ principal: 10000, contribution: 200, annualPct: 7, years: 20, compFreq: 1 });
  close(annual.fv, 140204.12, 1);
});

test("grow with zero rate is pure accumulation", () => {
  const g = FIN.grow({ principal: 1000, contribution: 100, annualPct: 0, years: 2 });
  close(g.fv, 1000 + 2400, 0.01);
  close(g.interest, 0, 0.001);
});

test("fvLump / pvLump are inverses; match references", () => {
  close(FIN.fvLump(5000, 6, 10, 12), 9096.98);
  close(FIN.fvLump(1000, 10, 2, 1), 1210);
  const fv = FIN.fvLump(12345, 7.3, 13, 12);
  close(FIN.pvLump(fv, 7.3, 13, 12), 12345, 0.01);
});

test("nper solves payoff time consistent with pmt", () => {
  const p = FIN.pmt(20000, 7.5, 60);
  close(FIN.nper(20000, 7.5, p), 60, 0.01);
  assert.equal(FIN.nper(20000, 12, 100), null); // 100 < interest 200/mo
  close(FIN.nper(1200, 0, 100), 12, 0.001);
});

test("principalFromPayment inverts pmt", () => {
  close(FIN.principalFromPayment(1580.17, 6.5, 360), 250000, 1);
});

test("ear and nominalFromEar", () => {
  close(FIN.ear(7, 12), 7.229, 0.001);
  close(FIN.nominalFromEar(7.229, 12), 7, 0.001);
});

test("contributionForGoal reaches the target", () => {
  const c = FIN.contributionForGoal(100000, 10000, 6, 10, 12);
  const g = FIN.grow({ principal: 10000, contribution: c, annualPct: 6, years: 10 });
  close(g.fv, 100000, 1);
});

test("yearsToGoal is consistent with grow", () => {
  const y = FIN.yearsToGoal(50000, 0, 500, 6);
  const g = FIN.grow({ principal: 0, contribution: 500, annualPct: 6, years: y });
  assert.ok(g.fv >= 50000 && g.fv < 51500);
});

test("cagr and inflationAdjust", () => {
  close(FIN.cagr(10000, 20000, 7.2727), 10.0, 0.05); // rule of 72 sanity
  close(FIN.inflationAdjust(548914.96, 3, 25), 262164.84, 1);
  assert.equal(FIN.cagr(0, 100, 5), null);
});

test("debtPlan matches reference simulation", () => {
  const debts = [
    { name: "Credit card", balance: 8000, apr: 22.9, minPayment: 200 },
    { name: "Car loan", balance: 12000, apr: 9.5, minPayment: 280 },
    { name: "Personal loan", balance: 5000, apr: 14, minPayment: 150 },
  ];
  const aval = FIN.debtPlan(debts, 300, "avalanche");
  const snow = FIN.debtPlan(debts, 300, "snowball");
  const minOnly = FIN.debtPlan(debts, 0, "avalanche");
  assert.equal(aval.months, 33);
  assert.equal(snow.months, 33);
  assert.equal(minOnly.months, 57);
  close(aval.totalInterest, 4773.44, 0.5);
  close(snow.totalInterest, 5307.68, 0.5);
  close(minOnly.totalInterest, 10331.53, 0.5);
  assert.deepEqual(aval.order, ["Credit card", "Personal loan", "Car loan"]);
  assert.deepEqual(snow.order, ["Personal loan", "Credit card", "Car loan"]);
  assert.ok(aval.totalInterest < snow.totalInterest);
});

test("debtPlan flags impossible minimum payments", () => {
  const r = FIN.debtPlan([{ name: "Trap", balance: 10000, apr: 24, minPayment: 150 }], 0, "avalanche");
  assert.equal(r.error, "min"); // interest is 200/mo > 150 minimum
});

test("affordability respects DTI caps", () => {
  const a = FIN.affordability({ incomeAnnual: 96000, debtsMonthly: 400, annualPct: 6.5, years: 30, downPayment: 40000, taxInsMonthly: 350 });
  // front cap: 8000*.28-350 = 1890; back cap: 8000*.36-400-350 = 2130 → front binds
  close(a.maxPI, 1890, 0.01);
  assert.equal(a.binding, "front");
  close(FIN.pmt(a.loan, 6.5, 360), 1890, 0.5);
  close(a.price, a.loan + 40000, 0.01);
});

test("rentVsBuy produces sane cumulative curves", () => {
  const r = FIN.rentVsBuy({
    price: 400000, down: 80000, ratePct: 6.5, termYears: 30, closingPct: 3,
    taxPct: 1.1, insuranceYearly: 1600, maintenancePct: 1, hoaMonthly: 0,
    appreciationPct: 3.5, sellingCostPct: 6, rentMonthly: 1900, rentGrowthPct: 3.5,
    rentersInsMonthly: 15, investReturnPct: 6, horizonYears: 15,
  });
  assert.equal(r.rows.length, 15);
  assert.ok(r.rows.every((row) => isFinite(row.buyNet) && isFinite(row.rentNet)));
  assert.ok(r.rows[14].equity > r.rows[0].equity);
  // with fast-growing rent, buying should eventually break even
  assert.ok(r.breakEven === null || (r.breakEven >= 1 && r.breakEven <= 15));
});
