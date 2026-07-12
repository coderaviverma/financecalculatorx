/* Test harness: loads browser JS (finance.js, calc configs) into Node. */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export function loadFinance() {
  if (!globalThis.FIN) {
    const src = readFileSync(join(ROOT, "src/assets/js/finance.js"), "utf8");
    (0, eval)(src);
  }
  return globalThis.FIN;
}

/* Load a calculator config file and capture its FCX.define() argument. */
export function loadCalc(slug) {
  loadFinance();
  let captured = null;
  globalThis.window = globalThis;
  globalThis.FCX = { define: (cfg) => (captured = cfg) };
  const src = readFileSync(join(ROOT, "src/assets/js/calc", `${slug}.js`), "utf8");
  (0, eval)(src);
  if (!captured) throw new Error(`calc ${slug} did not call FCX.define`);
  if (captured.slug !== slug) throw new Error(`calc ${slug} defines slug "${captured.slug}"`);
  return captured;
}

/* Node-side formatter facade matching the browser F object (USD). */
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const F = {
  get fin() { return loadFinance(); },
  money: (v) => (isFinite(v) ? usd.format(v) : "—"),
  money0: (v) => (isFinite(v) ? usd0.format(v) : "—"),
  compact: (v) => (isFinite(v) ? "$" + Math.round(v / 1000) + "K" : "—"),
  num: (v, dp) => (isFinite(v) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: dp == null ? 2 : dp }).format(v) : "—"),
  pct: (v, dp) => (isFinite(v) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: dp == null ? 2 : dp }).format(v) + "%" : "—"),
  dur: (m) => {
    if (m == null || !isFinite(m)) return "—";
    const mm = Math.round(m), y = Math.floor(mm / 12), r = mm % 12;
    if (y === 0) return r + (r === 1 ? " month" : " months");
    if (r === 0) return y + (y === 1 ? " year" : " years");
    return y + " yr " + r + " mo";
  },
  sym: () => "$",
  cur: () => "USD",
  today: () => ({ year: 2026, month: 7 }),
  monthName: (m, s) => new Date(2000, m - 1, 1).toLocaleString("en", { month: s || "short" }),
  dateFromNow: (months) => { const d = new Date(2026, 6, 12); d.setMonth(d.getMonth() + Math.round(months)); return d.toLocaleString("en", { month: "short", year: "numeric" }); },
  esc: (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])),
};

/* parse "$1,234.56" → 1234.56 */
export const n = (s) => parseFloat(String(s).replace(/[^\d.\-]/g, ""));

/* find a metric value by label substring */
export const metric = (result, label) => {
  const m = (result.metrics || []).find((x) => x.label.toLowerCase().includes(label.toLowerCase()));
  return m ? m.value : undefined;
};
export const scnRaw = (result, label) => {
  const m = (result.scenario?.metrics || []).find((x) => x.label.toLowerCase().includes(label.toLowerCase()));
  return m ? m.raw : undefined;
};
