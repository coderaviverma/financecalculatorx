/* Finance Calculator X — financial math library.
   Pure functions, no DOM. Loaded in the browser as window.FIN and in Node
   tests via tests/harness.mjs. All rates are annual percentages unless noted.
   Money is computed in floating point and rounded to cents at presentation
   or schedule boundaries; schedules carry exact balances and adjust the
   final payment so balances close to zero. */
(function (root) {
  "use strict";

  const r2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100;

  /* ---- rates ---- */
  // periodic rate for a payment/contribution frequency `pf` given an annual
  // nominal rate compounded `cf` times per year
  function periodicRate(annualPct, cf, pf) {
    const i = annualPct / 100;
    if (i === 0) return 0;
    if (cf === pf) return i / cf;
    return Math.pow(1 + i / cf, cf / pf) - 1;
  }
  const monthlyRate = (annualPct) => annualPct / 100 / 12;

  // effective annual rate from nominal compounded m times/year
  function ear(annualPct, m) {
    const i = annualPct / 100;
    return (Math.pow(1 + i / m, m) - 1) * 100;
  }
  // nominal APR from effective annual rate
  function nominalFromEar(earPct, m) {
    return (Math.pow(1 + earPct / 100, 1 / m) - 1) * m * 100;
  }

  /* ---- level-payment loans ---- */
  // periodic payment for principal P, periodic rate r, n periods
  function pmtPeriodic(P, r, n) {
    if (n <= 0) return NaN;
    if (r === 0) return P / n;
    const f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }
  // monthly payment for an annual rate over `months`
  function pmt(P, annualPct, months) {
    return pmtPeriodic(P, monthlyRate(annualPct), months);
  }

  // number of periods to repay P at periodic rate r with payment A.
  // Returns null when the payment does not cover interest.
  function nperPeriodic(P, r, A) {
    if (A <= 0 || P <= 0) return null;
    if (r === 0) return P / A;
    if (A <= P * r) return null;
    return -Math.log(1 - (r * P) / A) / Math.log(1 + r);
  }
  function nper(P, annualPct, monthlyPayment) {
    return nperPeriodic(P, monthlyRate(annualPct), monthlyPayment);
  }

  // principal supportable by a monthly payment (present value of annuity)
  function principalFromPayment(monthlyPayment, annualPct, months) {
    const r = monthlyRate(annualPct);
    if (r === 0) return monthlyPayment * months;
    return (monthlyPayment * (1 - Math.pow(1 + r, -months))) / r;
  }

  /* ---- amortization ----
     opts: { extraMonthly, extraYearly, extraOnce, extraOnceMonth,
             startYear, startMonth (1-12), paymentOverride }
     Returns { rows, months, totalInterest, totalPaid, payment, payoff:{year,month} }
     rows: { i, year, month, payment, interest, principal, extra, balance } */
  function amortize(P, annualPct, termMonths, opts) {
    const o = opts || {};
    const r = monthlyRate(annualPct);
    const basePmt = o.paymentOverride != null ? o.paymentOverride : pmtPeriodic(P, r, termMonths);
    if (!isFinite(basePmt) || basePmt <= 0) return null;
    if (r > 0 && basePmt <= P * r && !(o.extraMonthly > 0 || o.extraYearly > 0 || o.extraOnce > 0)) return null;

    const startYear = o.startYear || null;
    const startMonth = o.startMonth || 1;
    const rows = [];
    let bal = P, totalInterest = 0, totalPaid = 0, i = 0;
    const hardCap = 12 * 100; // 100 years safety

    while (bal > 0.005 && i < hardCap) {
      i++;
      const interest = bal * r;
      let extra = (o.extraMonthly || 0);
      if (o.extraYearly && i % 12 === 0) extra += o.extraYearly;
      if (o.extraOnce && i === (o.extraOnceMonth || 1)) extra += o.extraOnce;
      let pay = basePmt + extra;
      let principal = pay - interest;
      if (principal <= 0 && extra === 0) return null; // never amortizes
      if (principal >= bal) { principal = bal; pay = principal + interest; }
      bal -= principal;
      totalInterest += interest;
      totalPaid += pay;
      let year = null, month = null;
      if (startYear) {
        const mm = startMonth - 1 + i - 1;
        year = startYear + Math.floor(mm / 12);
        month = (mm % 12) + 1;
      }
      rows.push({ i, year, month, payment: r2(pay), interest: r2(interest), principal: r2(principal), extra: r2(Math.min(extra, pay - interest)), balance: r2(Math.max(bal, 0)) });
    }
    return { rows, months: i, totalInterest: r2(totalInterest), totalPaid: r2(totalPaid), payment: r2(basePmt) };
  }

  // group amortization rows into yearly aggregates
  function annualize(rows) {
    const out = [];
    for (let y = 0; y * 12 < rows.length; y++) {
      const slice = rows.slice(y * 12, y * 12 + 12);
      out.push({
        i: y + 1,
        year: slice[0].year,
        payment: r2(slice.reduce((s, r_) => s + r_.payment, 0)),
        interest: r2(slice.reduce((s, r_) => s + r_.interest, 0)),
        principal: r2(slice.reduce((s, r_) => s + r_.principal, 0)),
        balance: slice[slice.length - 1].balance,
      });
    }
    return out;
  }

  /* ---- growth / savings ----
     Future value with optional starting principal and recurring contribution.
     cfg: { principal, contribution, contribFreq (per year, default 12),
            annualPct, years, compFreq (default 12), timing ('end'|'begin'),
            annualIncreasePct (step-up of contribution each year) }
     Returns { fv, totalContrib (excl. principal), totalPrincipal, interest, rows }
     rows (yearly): { year, contrib, interest, balance, cumContrib, cumInterest } */
  function grow(cfg) {
    const c = Object.assign({ principal: 0, contribution: 0, contribFreq: 12, compFreq: 12, timing: "end", annualIncreasePct: 0 }, cfg);
    const pf = c.contribution > 0 ? c.contribFreq : 12;
    const rp = periodicRate(c.annualPct, c.compFreq, pf);
    const periods = Math.round(c.years * pf);
    let bal = c.principal, contrib = c.contribution;
    let cumContrib = 0, cumInterest = 0;
    const rows = [];
    let yContrib = 0, yInterest = 0;
    for (let p = 1; p <= periods; p++) {
      if (c.timing === "begin" && contrib) { bal += contrib; cumContrib += contrib; yContrib += contrib; }
      const interest = bal * rp;
      bal += interest; cumInterest += interest; yInterest += interest;
      if (c.timing !== "begin" && contrib) { bal += contrib; cumContrib += contrib; yContrib += contrib; }
      if (p % pf === 0) {
        rows.push({ year: p / pf, contrib: r2(yContrib), interest: r2(yInterest), balance: r2(bal), cumContrib: r2(cumContrib), cumInterest: r2(cumInterest) });
        yContrib = 0; yInterest = 0;
        if (c.annualIncreasePct) contrib *= 1 + c.annualIncreasePct / 100;
      }
    }
    if (periods % pf !== 0) {
      rows.push({ year: Math.ceil(periods / pf), contrib: r2(yContrib), interest: r2(yInterest), balance: r2(bal), cumContrib: r2(cumContrib), cumInterest: r2(cumInterest) });
    }
    return { fv: r2(bal), totalContrib: r2(cumContrib), totalPrincipal: r2(c.principal), interest: r2(cumInterest), rows };
  }

  function fvLump(P, annualPct, years, compFreq) {
    const m = compFreq || 12;
    return P * Math.pow(1 + annualPct / 100 / m, m * years);
  }
  function pvLump(F, annualPct, years, compFreq) {
    const m = compFreq || 12;
    return F / Math.pow(1 + annualPct / 100 / m, m * years);
  }
  function pvAnnuity(payment, annualPct, months) {
    return principalFromPayment(payment, annualPct, months);
  }
  // simple interest: I = P * r * t
  function simpleInterest(P, annualPct, years) {
    return P * (annualPct / 100) * years;
  }
  // contribution needed to reach target FV (end-of-period contributions)
  function contributionForGoal(target, principal, annualPct, years, pf) {
    const f = pf || 12;
    const rp = periodicRate(annualPct, 12, f);
    const n = Math.round(years * f);
    const fromPrincipal = principal * Math.pow(1 + rp, n);
    const need = target - fromPrincipal;
    if (need <= 0) return 0;
    if (rp === 0) return need / n;
    return (need * rp) / (Math.pow(1 + rp, n) - 1);
  }
  // years to reach target with contributions (simulation; returns null > 100y)
  function yearsToGoal(target, principal, contributionMonthly, annualPct) {
    const rp = monthlyRate(annualPct);
    let bal = principal;
    for (let m = 1; m <= 1200; m++) {
      bal = bal * (1 + rp) + contributionMonthly;
      if (bal >= target) return m / 12;
    }
    return null;
  }

  function cagr(begin, end, years) {
    if (begin <= 0 || years <= 0) return null;
    return (Math.pow(end / begin, 1 / years) - 1) * 100;
  }
  function inflationAdjust(value, inflationPct, years) {
    return value / Math.pow(1 + inflationPct / 100, years);
  }

  /* ---- multi-debt payoff (snowball / avalanche) ----
     debts: [{ name, balance, apr, minPayment }], extra: monthly extra budget
     method: 'snowball' (smallest balance first) | 'avalanche' (highest APR first)
     Returns { months, totalInterest, totalPaid, perDebt, timeline, order }
     timeline (monthly): { m, balance, interest, paid }
     perDebt: { name, payoffMonth, interest } */
  function debtPlan(debts, extra, method) {
    const ds = debts.map((d, ix) => ({ ix, name: d.name, bal: d.balance, r: monthlyRate(d.apr), apr: d.apr, min: d.minPayment, interest: 0, payoffMonth: null }));
    // fail fast: every min payment must at least cover that debt's interest
    for (const d of ds) if (d.bal > 0 && d.min <= d.bal * d.r) return { error: "min", debt: d.name };
    const order = ds.slice().sort((a, b) => method === "avalanche" ? (b.apr - a.apr) || (a.bal - b.bal) : (a.bal - b.bal) || (b.apr - a.apr));
    const timeline = [];
    let m = 0, totalInterest = 0, totalPaid = 0;
    const cap = 1200;
    while (ds.some((d) => d.bal > 0.005) && m < cap) {
      m++;
      let budgetExtra = extra || 0;
      let monthInterest = 0, monthPaid = 0;
      // freed-up minimums roll into the extra budget (classic snowball behaviour)
      for (const d of ds) if (d.bal <= 0.005 && d.payoffMonth) budgetExtra += d.min;
      // accrue interest
      for (const d of ds) {
        if (d.bal <= 0.005) continue;
        const int = d.bal * d.r;
        d.bal += int; d.interest += int; monthInterest += int; totalInterest += int;
      }
      // minimum payments
      for (const d of ds) {
        if (d.bal <= 0.005) continue;
        const pay = Math.min(d.min, d.bal);
        d.bal -= pay; monthPaid += pay; totalPaid += pay;
        if (pay < d.min) budgetExtra += d.min - pay;
      }
      // extra to targets in order
      for (const t of order) {
        if (budgetExtra <= 0) break;
        if (t.bal <= 0.005) continue;
        const pay = Math.min(budgetExtra, t.bal);
        t.bal -= pay; budgetExtra -= pay; monthPaid += pay; totalPaid += pay;
      }
      for (const d of ds) if (d.bal <= 0.005 && !d.payoffMonth) d.payoffMonth = m;
      timeline.push({ m, balance: r2(ds.reduce((s, d) => s + Math.max(d.bal, 0), 0)), interest: r2(monthInterest), paid: r2(monthPaid) });
    }
    if (m >= cap) return { error: "cap" };
    return {
      months: m,
      totalInterest: r2(totalInterest),
      totalPaid: r2(totalPaid),
      perDebt: ds.map((d) => ({ name: d.name, payoffMonth: d.payoffMonth, interest: r2(d.interest) })),
      order: order.map((d) => d.name),
      timeline,
    };
  }

  /* ---- house affordability (28/36 style DTI) ---- */
  function affordability(cfg) {
    const c = Object.assign({ frontPct: 28, backPct: 36, taxInsMonthly: 0, hoaMonthly: 0 }, cfg);
    const gross = c.incomeAnnual / 12;
    const frontCap = gross * (c.frontPct / 100) - c.taxInsMonthly - c.hoaMonthly;
    const backCap = gross * (c.backPct / 100) - c.debtsMonthly - c.taxInsMonthly - c.hoaMonthly;
    const maxPI = Math.max(0, Math.min(frontCap, backCap));
    const loan = principalFromPayment(maxPI, c.annualPct, c.years * 12);
    return { maxPI: r2(maxPI), loan: r2(Math.max(0, loan)), price: r2(Math.max(0, loan) + (c.downPayment || 0)), frontCap: r2(frontCap), backCap: r2(backCap), binding: frontCap <= backCap ? "front" : "back" };
  }

  /* ---- rent vs buy (annual simulation) ----
     Buyer net cost(Y)  = upfront + owning outflows − net equity recovered if sold in Y
     Renter net cost(Y) = rent outflows − growth earned on upfront invested instead
     Break-even = first year buyer net cost <= renter net cost. */
  function rentVsBuy(cfg) {
    const c = Object.assign({ maintenancePct: 1, sellingCostPct: 6, rentersInsMonthly: 0, hoaMonthly: 0 }, cfg);
    const loan0 = c.price - c.down;
    const am = amortize(loan0, c.ratePct, c.termYears * 12, {});
    if (!am) return null;
    const upfront = c.down + (c.closingPct / 100) * c.price;
    const years = Math.min(c.horizonYears, c.termYears);
    const annual = annualize(am.rows);
    let value = c.price, rent = c.rentMonthly, invest = upfront;
    let buyOut = upfront, rentOut = 0, balance = loan0;
    const rows = [];
    let breakEven = null;
    for (let y = 1; y <= years; y++) {
      const a = annual[y - 1] || { payment: 0, balance };
      balance = a.balance != null ? a.balance : balance;
      value *= 1 + c.appreciationPct / 100;
      const owningCosts = a.payment + (c.taxPct / 100) * value + c.insuranceYearly + (c.maintenancePct / 100) * value + c.hoaMonthly * 12;
      buyOut += owningCosts;
      rentOut += rent * 12 + c.rentersInsMonthly * 12;
      rent *= 1 + c.rentGrowthPct / 100;
      invest *= 1 + c.investReturnPct / 100;
      const equityIfSold = value * (1 - c.sellingCostPct / 100) - balance;
      const buyNet = buyOut - equityIfSold;
      const rentNet = rentOut - (invest - upfront);
      rows.push({ year: y, buyNet: r2(buyNet), rentNet: r2(rentNet), homeValue: r2(value), equity: r2(Math.max(0, value - balance)), rentYear: r2(rent * 12) });
      if (breakEven === null && buyNet <= rentNet) breakEven = y;
    }
    return { rows, breakEven, payment: am.payment };
  }

  const api = {
    r2, periodicRate, monthlyRate, ear, nominalFromEar,
    pmt, pmtPeriodic, nper, nperPeriodic, principalFromPayment,
    amortize, annualize,
    grow, fvLump, pvLump, pvAnnuity, simpleInterest,
    contributionForGoal, yearsToGoal, cagr, inflationAdjust,
    debtPlan, affordability, rentVsBuy,
  };
  root.FIN = api;
})(typeof self !== "undefined" ? self : globalThis);
