// Repeatable input-boundary audit. Financial reference checks live in tests/.
import { readdirSync, writeFileSync } from 'node:fs';
import { loadCalc, F } from '../tests/harness.mjs';

const report = [];
for (const file of readdirSync(new URL('../src/assets/js/calc/', import.meta.url)).filter(f => f.endsWith('.js')).sort()) {
  const cfg = loadCalc(file.slice(0, -3));
  const defaults = Object.fromEntries(cfg.inputs.map(d => [d.id, d.default ?? (d.type === 'toggle' ? false : 0)]));
  const cases = [{ name: 'default', values: defaults }];
  for (const d of cfg.inputs) {
    for (const edge of ['min', 'max']) if (Number.isFinite(d[edge])) cases.push({ name: `${d.id}:${edge}`, values: { ...defaults, [d.id]: d[edge] } });
    if (d.type === 'percent' && d.min === 0) cases.push({ name: `${d.id}:near-zero`, values: { ...defaults, [d.id]: 1e-14 } });
    for (const o of d.options || []) cases.push({ name: `${d.id}:${o.v}`, values: { ...defaults, [d.id]: o.v } });
  }
  const results = cases.map(c => {
    try {
      const r = cfg.compute(c.values, F);
      if (r.invalid) return { name: c.name, status: c.name === 'default' ? 'FAIL' : 'rejected', detail: r.invalid };
      const nonfinite = [];
      function walk(x, path = '') {
        if (typeof x === 'number' && !Number.isFinite(x)) nonfinite.push(path);
        else if (x && typeof x === 'object') for (const [k,v] of Object.entries(x)) walk(v, `${path}.${k}`);
      }
      walk(r);
      if (!r.primary || /NaN|Infinity|undefined/.test(JSON.stringify(r)) || nonfinite.length) return { name: c.name, status: 'FAIL', detail: nonfinite, primary: r.primary };
      return { name: c.name, status: 'pass', primary: r.primary.value };
    } catch (e) { return { name: c.name, status: 'FAIL', detail: e.message }; }
  });
  report.push({ slug: cfg.slug, cases: results });
}
const failed = report.flatMap(r => r.cases.filter(c => c.status === 'FAIL').map(c => ({ slug: r.slug, ...c })));
const summary = { calculators: report.length, cases: report.reduce((n,r) => n+r.cases.length,0), failures: failed, rejected: report.reduce((n,r) => n+r.cases.filter(c => c.status === 'rejected').length,0) };
if (process.argv[2]) writeFileSync(process.argv[2], JSON.stringify({ summary, report }, null, 2)+'\n');
console.log(JSON.stringify(summary, null, 2));
if (failed.length) process.exitCode = 1;
