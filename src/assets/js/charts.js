/* Finance Calculator X — dependency-free SVG charts.
   Types: donut | area (stacked) | lines | bars (grouped).
   Charts re-render at container width for crisp text, share one tooltip,
   and carry aria labels + an sr-only summary supplied by the caller. */
(function (root) {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const charts = []; // {el, cfg}
  let tip = null, raf = 0;

  function el(name, attrs, parent) {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function getTip() {
    if (!tip) { tip = document.createElement("div"); tip.className = "chart-tip"; document.body.appendChild(tip); }
    return tip;
  }
  function showTip(html, x, y) {
    const t = getTip();
    t.innerHTML = html;
    t.style.display = "block";
    const r = t.getBoundingClientRect();
    let lx = x + 14, ly = y + 14;
    if (lx + r.width > innerWidth - 8) lx = x - r.width - 14;
    if (ly + r.height > innerHeight - 8) ly = y - r.height - 14;
    t.style.left = Math.max(6, lx) + "px";
    t.style.top = Math.max(6, ly) + "px";
  }
  function hideTip() { if (tip) tip.style.display = "none"; }

  function niceTicks(min, max, count) {
    // The returned range must COVER [min, max]: the last tick is >= max (and
    // the first <= min), otherwise data draws outside the plot area.
    if (max <= min) max = min + 1;
    const raw = (max - min) / count;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    const ticks = [];
    let v = Math.floor(min / step) * step;
    for (;;) { ticks.push(v); if (v >= max - step * 0.001) break; v += step; }
    return ticks;
  }
  const dflt = (v) => (Math.abs(v) >= 1000 ? (v / 1000).toFixed(0) + "K" : String(Math.round(v)));

  /* ---------- donut ---------- */
  function donut(box, cfg) {
    const size = 300, cx = size / 2, cy = size / 2, R = 118, r0 = 76;
    const total = cfg.segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
    const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, role: "img", "aria-label": cfg.aria || "Breakdown chart", style: "max-width:320px;margin:0 auto" }, box);
    let a0 = -Math.PI / 2;
    cfg.segments.forEach((s) => {
      const frac = Math.max(0, s.value) / total;
      if (frac <= 0) return;
      const a1 = a0 + frac * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const p = (a, rr) => `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
      const d = frac >= 0.9999
        ? `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R} M ${cx} ${cy - r0} A ${r0} ${r0} 0 1 0 ${cx - 0.01} ${cy - r0}`
        : `M ${p(a0, R)} A ${R} ${R} 0 ${large} 1 ${p(a1, R)} L ${p(a1, r0)} A ${r0} ${r0} 0 ${large} 0 ${p(a0, r0)} Z`;
      const path = el("path", { d, fill: s.color, stroke: "var(--surface)", "stroke-width": 2 }, svg);
      const pctTxt = (frac * 100).toFixed(1) + "%";
      path.addEventListener("pointermove", (e) => showTip(`<div class="tt">${s.label}</div><div class="tr"><span>${cfg.fmt ? cfg.fmt(s.value) : s.value}</span><span>${pctTxt}</span></div>`, e.clientX, e.clientY));
      path.addEventListener("pointerleave", hideTip);
      a0 = a1;
    });
    if (cfg.centerLabel) {
      el("text", { x: cx, y: cy - 8, "text-anchor": "middle", "font-size": 12, fill: "var(--ink-3)", "font-family": "inherit" }, svg).textContent = cfg.centerLabel;
      const v = el("text", { x: cx, y: cy + 16, "text-anchor": "middle", "font-size": 20, "font-weight": 700, fill: "var(--ink)", "font-family": "inherit" }, svg);
      v.textContent = cfg.centerValue || "";
    }
  }

  /* ---------- x/y charts (area, lines, bars) ---------- */
  function xyChart(box, cfg) {
    const W = Math.max(300, Math.min(860, box.clientWidth || 640));
    const H = Math.max(230, Math.min(340, W * 0.44));
    const padL = 54, padR = 14, padT = 14, padB = 30;
    const iw = W - padL - padR, ih = H - padT - padB;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": cfg.aria || "Chart" }, box);
    const n = cfg.x.length;
    if (!n) return;

    let maxY, minY = 0;
    if (cfg.type === "area") {
      maxY = Math.max(...cfg.x.map((_, i) => cfg.series.reduce((s, sr) => s + Math.max(0, sr.values[i] || 0), 0)));
    } else {
      const all = cfg.series.flatMap((sr) => sr.values.map((v) => v || 0));
      maxY = Math.max(...all);
      if (cfg.type === "lines") minY = Math.min(0, ...all);
    }
    const ticks = niceTicks(minY, maxY || 1, 4);
    minY = ticks[0];
    maxY = ticks[ticks.length - 1];
    const fmtA = cfg.fmtAxis || dflt;
    const X = (i) => padL + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
    const Y = (v) => padT + ih - ((v - minY) / (maxY - minY)) * ih;

    ticks.forEach((t) => {
      const zero = t === 0 && minY < 0;
      el("line", { x1: padL, x2: W - padR, y1: Y(t), y2: Y(t), stroke: zero ? "var(--line-strong)" : "var(--line)", "stroke-width": 1 }, svg);
      el("text", { x: padL - 8, y: Y(t) + 4, "text-anchor": "end", "font-size": 11, fill: "var(--ink-3)", "font-family": "inherit" }, svg).textContent = fmtA(t);
    });
    const xStep = Math.max(1, Math.ceil(n / (W < 480 ? 5 : 9)));
    cfg.x.forEach((xl, i) => {
      if (i % xStep !== 0 && i !== n - 1) return;
      el("text", { x: X(i), y: H - 8, "text-anchor": "middle", "font-size": 11, fill: "var(--ink-3)", "font-family": "inherit" }, svg).textContent = xl;
    });

    if (cfg.type === "area") {
      const cum = new Array(n).fill(0);
      const layers = cfg.series.map((sr) => {
        const base = cum.slice();
        const top = cum.map((b, i) => b + Math.max(0, sr.values[i] || 0));
        top.forEach((t, i) => (cum[i] = t));
        return { sr, base, top };
      });
      layers.forEach(({ sr, base, top }) => {
        let d = `M ${X(0)} ${Y(top[0])}`;
        for (let i = 1; i < n; i++) d += ` L ${X(i)} ${Y(top[i])}`;
        for (let i = n - 1; i >= 0; i--) d += ` L ${X(i)} ${Y(base[i])}`;
        el("path", { d: d + " Z", fill: sr.color, "fill-opacity": 0.82 }, svg);
      });
    } else if (cfg.type === "lines") {
      cfg.series.forEach((sr) => {
        let d = "";
        sr.values.forEach((v, i) => { d += (i ? " L " : "M ") + X(i) + " " + Y(v || 0); });
        el("path", { d, fill: "none", stroke: sr.color, "stroke-width": 2.5, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": sr.dash || "none" }, svg);
      });
    } else if (cfg.type === "bars") {
      const groupW = iw / n;
      const barW = Math.min(46, (groupW * 0.72) / cfg.series.length);
      cfg.x.forEach((_, i) => {
        const cxx = padL + groupW * i + groupW / 2;
        const total = barW * cfg.series.length;
        cfg.series.forEach((sr, si) => {
          const v = sr.values[i] || 0;
          el("rect", { x: cxx - total / 2 + si * barW, y: Y(v), width: barW - 2, height: Math.max(0, padT + ih - Y(v)), rx: 4, fill: sr.color }, svg);
        });
      });
    }

    // hover guide + unified tooltip
    const guide = el("line", { y1: padT, y2: padT + ih, stroke: "var(--line-strong)", "stroke-width": 1, "stroke-dasharray": "3 3", opacity: 0 }, svg);
    const dots = cfg.type !== "bars" ? cfg.series.map((sr) => el("circle", { r: 4, fill: sr.color, stroke: "var(--surface)", "stroke-width": 1.5, opacity: 0 }, svg)) : [];
    const overlay = el("rect", { x: padL, y: padT, width: iw, height: ih, fill: "transparent" }, svg);
    overlay.addEventListener("pointermove", (e) => {
      const rect = svg.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * W;
      const i = Math.max(0, Math.min(n - 1, Math.round(((px - padL) / iw) * (n - 1))));
      guide.setAttribute("x1", X(i)); guide.setAttribute("x2", X(i)); guide.setAttribute("opacity", 1);
      const fmt = cfg.fmt || fmtA;
      let html = `<div class="tt">${cfg.xLabel ? cfg.xLabel(cfg.x[i], i) : cfg.x[i]}</div>`;
      let cumV = 0;
      cfg.series.forEach((sr, si) => {
        const v = sr.values[i] || 0;
        if (cfg.type === "area") { cumV += Math.max(0, v); if (dots[si]) { dots[si].setAttribute("cx", X(i)); dots[si].setAttribute("cy", Y(cumV)); dots[si].setAttribute("opacity", 1); } }
        else if (dots[si]) { dots[si].setAttribute("cx", X(i)); dots[si].setAttribute("cy", Y(v)); dots[si].setAttribute("opacity", 1); }
        html += `<div class="tr"><span>${sr.label}</span><span>${fmt(v)}</span></div>`;
      });
      if (cfg.type === "area" && cfg.series.length > 1) html += `<div class="tr"><span>Total</span><span>${fmt(cumV)}</span></div>`;
      showTip(html, e.clientX, e.clientY);
    });
    overlay.addEventListener("pointerleave", () => { hideTip(); guide.setAttribute("opacity", 0); dots.forEach((d) => d.setAttribute("opacity", 0)); });
  }

  function legend(box, series) {
    const lg = document.createElement("div");
    lg.className = "chart-legend";
    series.forEach((s) => {
      const li = document.createElement("span");
      li.className = "li";
      li.innerHTML = `<span class="sw" style="background:${s.color}"></span>${s.label}`;
      lg.appendChild(li);
    });
    box.appendChild(lg);
  }

  function render(container, cfg) {
    container.innerHTML = "";
    const box = document.createElement("div");
    box.className = "chart-box";
    container.appendChild(box);
    if (cfg.type === "donut") donut(box, cfg);
    else xyChart(box, cfg);
    if (cfg.legend !== false) legend(container, cfg.segments || cfg.series);
    if (cfg.summary) {
      const s = document.createElement("p");
      s.className = "sr-only";
      s.textContent = cfg.summary;
      container.appendChild(s);
    }
    const existing = charts.find((c) => c.el === container);
    if (existing) existing.cfg = cfg; else charts.push({ el: container, cfg });
  }

  addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      charts.forEach((c) => { if (c.el.isConnected && c.cfg.type !== "donut") { const cfg = c.cfg; c.el.innerHTML = ""; const box = document.createElement("div"); box.className = "chart-box"; c.el.appendChild(box); xyChart(box, cfg); if (cfg.legend !== false) legend(c.el, cfg.series); } });
    });
  });

  root.FCXCharts = { render };
})(typeof self !== "undefined" ? self : globalThis);
