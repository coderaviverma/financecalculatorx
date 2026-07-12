/* Finance Calculator X — calculator page engine.
   A calculator page registers itself with FCX.define(cfg):
     cfg = {
       slug, inputs: [FieldDef], compute(values, F) -> Result,
       scenario: true|false, suggestCurrency?: "INR"
     }
   FieldDef = { id, label, type: currency|percent|number|term|select|segment|toggle|debts,
                default, min, max, step, integer, hint, tip, affixPost, options,
                slider:{min,max,step}, showIf(values), optional }
   Result = { invalid?, primary:{label,value,sub}, metrics:[{label,value,hint}],
              explain, chart:{title,note,cfg}, table:{title,csvName,views:[{id,label,columns,rows,foot}]},
              scenario:{summary, metrics:[{label,raw,fmt,betterWhen}]} }
   The engine owns rendering, validation, share links, scenarios, CSV, print. */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);

  const F = {
    get fin() { return window.FIN; },
    get money() { return FCX.fmt.money; },
    get money0() { return FCX.fmt.money0; },
    get compact() { return FCX.fmt.compact; },
    get num() { return FCX.fmt.num; },
    get pct() { return FCX.fmt.pct; },
    get dur() { return FCX.fmt.dur; },
    get sym() { return FCX.fmt.sym; },
    get cur() { return FCX.fmt.cur; },
    today() { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() + 1 }; },
    monthName(m, style) { return new Date(2000, m - 1, 1).toLocaleString("en", { month: style || "short" }); },
    dateFromNow(months) {
      const d = new Date(); d.setMonth(d.getMonth() + Math.round(months));
      return d.toLocaleString("en", { month: "short", year: "numeric" });
    },
    esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); },
  };

  function parseNum(str) {
    if (typeof str === "number") return str;
    if (str == null) return NaN;
    const s = String(str).replace(/[^\d.\-]/g, "");
    if (!s || s === "-" || s === ".") return NaN;
    return parseFloat(s);
  }

  function fieldHtml(def) {
    const id = "f-" + def.id;
    let control = "";
    const tip = def.tip ? `<button type="button" class="tip" tabindex="-1" title="${F.esc(def.tip)}" aria-label="More info: ${F.esc(def.tip)}">?</button>` : "";
    const label = `<label class="field-label" for="${id}">${def.label}${tip}</label>`;
    if (def.type === "currency") {
      control = `<div class="control"><span class="affix pre" data-cursym>${FCX.fmt.sym()}</span><input id="${id}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false"></div>`;
    } else if (def.type === "percent") {
      control = `<div class="control"><input id="${id}" class="has-post" type="text" inputmode="decimal" autocomplete="off"><span class="affix post">% / yr</span></div>`;
      if (def.affixPost) control = control.replace("% / yr", F.esc(def.affixPost));
    } else if (def.type === "number") {
      const post = def.affixPost ? `<span class="affix post">${F.esc(def.affixPost)}</span>` : "";
      control = `<div class="control"><input id="${id}" ${post ? 'class="has-post"' : ""} type="text" inputmode="decimal" autocomplete="off">${post}</div>`;
    } else if (def.type === "term") {
      control = `<div class="control"><input id="${id}" class="has-post" type="text" inputmode="numeric" autocomplete="off"></div>
        <div class="segment" data-term-unit role="group" aria-label="Term unit">
          <button type="button" data-u="y" aria-pressed="true">Years</button>
          <button type="button" data-u="m" aria-pressed="false">Months</button>
        </div>`;
    } else if (def.type === "select") {
      control = `<div class="control"><select id="${id}">${def.options.map((o) => `<option value="${F.esc(o.v)}">${F.esc(o.label)}</option>`).join("")}</select><span class="select-caret">▾</span></div>`;
    } else if (def.type === "segment") {
      control = `<div class="segment" data-segment role="group" aria-label="${F.esc(def.label)}">${def.options.map((o, i) => `<button type="button" data-v="${F.esc(o.v)}" aria-pressed="${i === 0}">${F.esc(o.label)}</button>`).join("")}</div>`;
    } else if (def.type === "toggle") {
      return `<div class="field" data-field="${def.id}">
        <div class="toggle-row"><label class="field-label" for="${id}" style="margin:0">${def.label}${tip}</label>
        <span class="switch"><input id="${id}" type="checkbox"><span class="track"></span><span class="thumb"></span></span></div>
        ${def.hint ? `<p class="field-hint">${def.hint}</p>` : ""}<p class="field-error" hidden></p></div>`;
    } else if (def.type === "debts") {
      return `<div class="field" data-field="${def.id}">
        <span class="field-label">${def.label}${tip}</span>
        <div class="row-list" data-rows></div>
        <button type="button" class="btn btn-soft btn-sm" data-add-row>+ Add a debt</button>
        ${def.hint ? `<p class="field-hint">${def.hint}</p>` : ""}<p class="field-error" hidden></p></div>`;
    }
    const slider = def.slider ? `<input type="range" min="${def.slider.min}" max="${def.slider.max}" step="${def.slider.step}" aria-label="${F.esc(def.label)} slider" tabindex="-1">` : "";
    return `<div class="field" data-field="${def.id}">${label}${control}${slider}${def.hint ? `<p class="field-hint">${def.hint}</p>` : ""}<p class="field-error" hidden></p></div>`;
  }

  function debtRowHtml(d, i) {
    return `<div class="row-item" data-row="${i}">
      <div class="row-head"><input type="text" value="${F.esc(d.name)}" aria-label="Debt ${i + 1} name" data-k="name">
        <button type="button" class="row-remove" aria-label="Remove ${F.esc(d.name)}">Remove</button></div>
      <div class="row-fields">
        <div class="field"><label class="field-label">Balance</label><div class="control"><span class="affix pre" data-cursym>${FCX.fmt.sym()}</span><input type="text" inputmode="decimal" data-k="balance" value="${d.balance}"></div></div>
        <div class="field"><label class="field-label">APR</label><div class="control"><input class="has-post" type="text" inputmode="decimal" data-k="apr" value="${d.apr}"><span class="affix post">%</span></div></div>
        <div class="field"><label class="field-label">Min. payment</label><div class="control"><span class="affix pre" data-cursym>${FCX.fmt.sym()}</span><input type="text" inputmode="decimal" data-k="min" value="${d.min}"></div></div>
      </div></div>`;
  }

  function boot(cfg) {
    const form = $("#calc-form");
    if (!form) return;
    const state = { values: {}, termUnits: {}, debts: null, result: null, view: null };

    /* ---- build form ---- */
    form.innerHTML = cfg.inputs.map(fieldHtml).join("");
    const fieldEls = {};
    cfg.inputs.forEach((def) => {
      const wrap = form.querySelector(`[data-field="${def.id}"]`);
      fieldEls[def.id] = wrap;
      if (def.type === "debts") {
        state.debts = (def.default || []).map((d) => Object.assign({}, d));
        renderDebtRows(wrap, def);
      } else if (def.type === "segment") {
        state.values[def.id] = def.default != null ? def.default : def.options[0].v;
        syncSegment(wrap, state.values[def.id]);
        wrap.querySelectorAll("[data-segment] button").forEach((b) => b.addEventListener("click", () => {
          state.values[def.id] = coerceOption(def, b.dataset.v);
          syncSegment(wrap, b.dataset.v);
          onChange();
        }));
      } else if (def.type === "toggle") {
        const input = wrap.querySelector("input");
        input.checked = !!def.default;
        state.values[def.id] = !!def.default;
        input.addEventListener("change", () => { state.values[def.id] = input.checked; onChange(); });
      } else if (def.type === "select") {
        const sel = wrap.querySelector("select");
        sel.value = def.default != null ? String(def.default) : sel.value;
        state.values[def.id] = coerceOption(def, sel.value);
        sel.addEventListener("change", () => { state.values[def.id] = coerceOption(def, sel.value); onChange(); });
      } else if (def.type === "term") {
        state.termUnits[def.id] = def.defaultUnit || "y";
        setInputVal(def, def.default != null ? def.default : 0);
        const input = wrap.querySelector("input[type=text]");
        input.addEventListener("input", () => onFieldInput(def));
        input.addEventListener("blur", () => reformat(def));
        wrap.querySelectorAll("[data-term-unit] button").forEach((b) => b.addEventListener("click", () => {
          const prev = state.termUnits[def.id];
          if (b.dataset.u === prev) return;
          const cur = parseNum(input.value);
          state.termUnits[def.id] = b.dataset.u;
          wrap.querySelectorAll("[data-term-unit] button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          if (isFinite(cur)) input.value = b.dataset.u === "m" ? String(Math.round(cur * 12)) : String(+(cur / 12).toFixed(2).replace(/\.0+$/, ""));
          onFieldInput(def);
        }));
      } else {
        setInputVal(def, def.default != null ? def.default : "");
        const input = wrap.querySelector("input[type=text]");
        input.addEventListener("input", () => onFieldInput(def));
        input.addEventListener("focus", () => input.select());
        input.addEventListener("blur", () => reformat(def));
        const range = wrap.querySelector("input[type=range]");
        if (range) {
          range.value = def.default;
          range.addEventListener("input", () => { input.value = range.value; onFieldInput(def, true); });
        }
      }
    });

    function coerceOption(def, v) {
      const opt = def.options.find((o) => String(o.v) === String(v));
      return opt ? opt.v : v;
    }
    function syncSegment(wrap, v) {
      wrap.querySelectorAll("[data-segment] button").forEach((b) => b.setAttribute("aria-pressed", String(String(b.dataset.v) === String(v))));
    }
    function setInputVal(def, v) {
      const input = fieldEls[def.id].querySelector("input[type=text]");
      if (!input) return;
      if (def.type === "currency") input.value = isFinite(v) && v !== "" ? FCX.fmt.group(v) : "";
      else if (def.type === "term") {
        const u = state.termUnits[def.id];
        input.value = u === "m" ? String(Math.round(v)) : String(+(v / 12).toFixed(2)).replace(/\.00$/, "");
      } else input.value = v === "" ? "" : String(v);
      readField(def);
    }
    function reformat(def) {
      const input = fieldEls[def.id].querySelector("input[type=text]");
      if (def.type === "currency" && isFinite(state.values[def.id])) input.value = FCX.fmt.group(state.values[def.id]);
    }
    function onFieldInput(def, fromSlider) {
      readField(def);
      if (!fromSlider) {
        const range = fieldEls[def.id].querySelector("input[type=range]");
        if (range && isFinite(state.values[def.id])) range.value = state.values[def.id];
      }
      onChange();
    }
    function readField(def) {
      const wrap = fieldEls[def.id];
      const input = wrap.querySelector("input[type=text]");
      if (!input) return;
      let v = parseNum(input.value);
      if (def.type === "term" && state.termUnits[def.id] === "y") v = v * 12;
      if (def.integer && isFinite(v)) v = Math.round(v);
      state.values[def.id] = v;
    }

    /* ---- debts rows ---- */
    function renderDebtRows(wrap, def) {
      const list = wrap.querySelector("[data-rows]");
      list.innerHTML = state.debts.map((d, i) => debtRowHtml(d, i)).join("");
      list.querySelectorAll(".row-item").forEach((row) => {
        const i = +row.dataset.row;
        row.querySelectorAll("input[data-k]").forEach((inp) => {
          inp.addEventListener("input", () => {
            const k = inp.dataset.k;
            state.debts[i][k] = k === "name" ? inp.value : parseNum(inp.value);
            onChange();
          });
        });
        row.querySelector(".row-remove").addEventListener("click", () => {
          if (state.debts.length <= 1) { FCX.toast("Keep at least one debt"); return; }
          state.debts.splice(i, 1);
          renderDebtRows(wrap, def);
          onChange();
        });
      });
      wrap.querySelector("[data-add-row]").onclick = () => {
        state.debts.push({ name: "Debt " + (state.debts.length + 1), balance: 1000, apr: 15, min: 50 });
        renderDebtRows(wrap, def);
        onChange();
      };
    }

    /* ---- validation ---- */
    function validate() {
      let ok = true, firstErr = null;
      cfg.inputs.forEach((def) => {
        const wrap = fieldEls[def.id];
        if (!wrap || wrap.hidden) return;
        const errEl = wrap.querySelector(".field-error");
        let msg = "";
        if (def.type === "debts") {
          for (const d of state.debts) {
            if (!isFinite(d.balance) || d.balance <= 0) msg = "Each debt needs a balance above zero.";
            else if (!isFinite(d.apr) || d.apr < 0 || d.apr > 100) msg = "APR must be between 0 and 100%.";
            else if (!isFinite(d.min) || d.min <= 0) msg = "Each debt needs a minimum payment.";
            if (msg) break;
          }
        } else if (["currency", "percent", "number", "term"].includes(def.type)) {
          const v = state.values[def.id];
          const unit = def.type === "term" ? (state.termUnits[def.id] === "m" ? " months" : " months (in the selected unit)") : "";
          if (!isFinite(v)) msg = def.optional ? "" : "Enter a number.";
          else if (def.min != null && v < def.min) msg = `Must be at least ${FCX.fmt.num(def.min)}${def.type === "term" ? " months" : ""}.`;
          else if (def.max != null && v > def.max) msg = `Must be ${FCX.fmt.num(def.max)}${def.type === "term" ? " months" : ""} or less.`;
          if (!isFinite(v) && def.optional) state.values[def.id] = def.emptyValue != null ? def.emptyValue : 0;
        }
        const input = wrap.querySelector("input[type=text]");
        wrap.classList.toggle("invalid", !!msg);
        if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
        if (errEl) { errEl.textContent = msg; errEl.hidden = !msg; }
        if (msg) { ok = false; firstErr = firstErr || def.label; }
      });
      return { ok, firstErr };
    }

    function applyShowIf() {
      cfg.inputs.forEach((def) => {
        if (!def.showIf) return;
        const show = !!def.showIf(currentValues());
        fieldEls[def.id].hidden = !show;
      });
    }
    function currentValues() {
      const v = Object.assign({}, state.values);
      if (state.debts) v.debts = state.debts.map((d) => Object.assign({}, d));
      return v;
    }

    /* ---- rendering ---- */
    const heroEl = $("#res-hero"), invalidEl = $("#res-invalid");
    function render() {
      const r = state.result;
      const metricsEl = $("#res-metrics"), explainEl = $("#res-explain");
      const chartCard = $("#chart-card"), tableCard = $("#table-card");
      if (!r || r.invalid) {
        invalidEl.hidden = false;
        invalidEl.textContent = (r && r.invalid) || "Check the highlighted fields to see results.";
        heroEl.style.opacity = .4; metricsEl.style.opacity = .4;
        return;
      }
      invalidEl.hidden = true;
      heroEl.style.opacity = 1; metricsEl.style.opacity = 1;
      $(".rh-label", heroEl).textContent = r.primary.label;
      $(".rh-value", heroEl).textContent = r.primary.value;
      $(".rh-sub", heroEl).textContent = r.primary.sub || "";
      metricsEl.innerHTML = (r.metrics || []).map((m) => `<div class="metric"><div class="m-label">${m.label}</div><div class="m-value">${m.value}</div>${m.hint ? `<div class="m-hint">${m.hint}</div>` : ""}</div>`).join("");
      if (explainEl) { explainEl.innerHTML = r.explain || ""; explainEl.hidden = !r.explain; }

      if (chartCard) {
        if (r.chart) {
          chartCard.hidden = false;
          $("#chart-title").textContent = r.chart.title || "Chart";
          FCXCharts.render($("#chart"), r.chart.cfg);
          const note = $("#chart-note");
          if (note) { note.hidden = !r.chart.note; note.textContent = r.chart.note || ""; }
        } else chartCard.hidden = true;
      }
      if (tableCard) {
        if (r.table && r.table.views && r.table.views.length) {
          tableCard.hidden = false;
          $("#table-title").textContent = r.table.title || "Schedule";
          renderViews(r.table);
        } else tableCard.hidden = true;
      }
      renderScenarioSlots();
    }

    function renderViews(t) {
      const seg = $("#table-views");
      if (t.views.length > 1) {
        seg.hidden = false;
        seg.innerHTML = t.views.map((v) => `<button type="button" data-view="${v.id}" aria-pressed="${String(v.id === state.view)}">${v.label}</button>`).join("");
        seg.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { state.view = b.dataset.view; renderViews(t); FCX.track("table_view_changed", { view: state.view }); }));
      } else { seg.hidden = true; }
      if (!t.views.find((v) => v.id === state.view)) state.view = t.views[0].id;
      seg.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === state.view)));
      const view = t.views.find((v) => v.id === state.view);
      const tbl = $("#table");
      const cell = (c, val) => `<td style="${c.align === "left" ? "text-align:left" : ""}">${val == null ? "—" : val}</td>`;
      tbl.innerHTML = `<thead><tr>${view.columns.map((c) => `<th scope="col" style="${c.align === "left" ? "text-align:left" : ""}">${c.label}</th>`).join("")}</tr></thead>
        <tbody>${view.rows.map((row) => `<tr${row._cls ? ` class="${row._cls}"` : ""}>${view.columns.map((c) => cell(c, row[c.key])).join("")}</tr>`).join("")}</tbody>
        ${view.foot ? `<tfoot><tr>${view.foot.map((f) => `<td>${f == null ? "" : f}</td>`).join("")}</tr></tfoot>` : ""}`;
    }

    /* ---- scenarios ---- */
    const scnCard = $("#scenario-card");
    const scnKey = "fcx:scn:" + cfg.slug;
    let scn = { A: null, B: null };
    try { scn = Object.assign(scn, JSON.parse(localStorage.getItem(scnKey) || "{}")); } catch {}

    function renderScenarioSlots() {
      if (!scnCard || cfg.scenario === false) { if (scnCard) scnCard.hidden = true; return; }
      scnCard.hidden = false;
      ["A", "B"].forEach((slot) => {
        const s = scn[slot], box = $(`[data-slot="${slot}"]`, scnCard);
        box.classList.toggle("filled", !!s);
        $(".s-desc", box).textContent = s ? s.summary : "Not saved yet";
        $("[data-save]", box).textContent = s ? "Update" : `Save current as ${slot}`;
        $("[data-load]", box).hidden = !s;
        $("[data-clear]", box).hidden = !s;
      });
      const cmp = $("#scenario-compare");
      if (scn.A && scn.B) {
        const rows = scn.A.metrics.map((ma, i) => {
          const mb = scn.B.metrics[i];
          if (!mb || mb.label !== ma.label) return "";
          const diff = (mb.raw != null && ma.raw != null) ? mb.raw - ma.raw : null;
          const fmtV = (m) => fmtScn(m.raw, m.fmt);
          let cls = "", txt = diff == null ? "—" : (diff > 0 ? "+" : diff < 0 ? "−" : "") + fmtScn(Math.abs(diff), ma.fmt);
          if (diff && ma.betterWhen) cls = (diff < 0) === (ma.betterWhen === "lower") ? "diff-pos" : "diff-neg";
          if (diff === 0) txt = "Same";
          return `<tr><td>${ma.label}</td><td>${fmtV(ma)}</td><td>${fmtV(mb)}</td><td class="${cls}">${txt}</td></tr>`;
        }).join("");
        cmp.innerHTML = `<table class="compare"><thead><tr><th scope="col">Metric</th><th scope="col">Scenario A</th><th scope="col">Scenario B</th><th scope="col">B − A</th></tr></thead><tbody>${rows}</tbody></table>`;
        cmp.hidden = false;
      } else { cmp.hidden = true; cmp.innerHTML = ""; }
    }
    function fmtScn(v, fmt) {
      if (v == null || !isFinite(v)) return "—";
      if (fmt === "money") return FCX.fmt.money(v);
      if (fmt === "money0") return FCX.fmt.money0(v);
      if (fmt === "pct") return FCX.fmt.pct(v);
      if (fmt === "dur") return FCX.fmt.dur(v);
      return FCX.fmt.num(v);
    }
    if (scnCard) {
      scnCard.addEventListener("click", (e) => {
        const box = e.target.closest("[data-slot]");
        if (!box) return;
        const slot = box.dataset.slot;
        if (e.target.matches("[data-save]")) {
          if (!state.result || state.result.invalid || !state.result.scenario) { FCX.toast("Enter valid inputs first"); return; }
          scn[slot] = { values: currentValues(), termUnits: Object.assign({}, state.termUnits), summary: state.result.scenario.summary, metrics: state.result.scenario.metrics };
          try { localStorage.setItem(scnKey, JSON.stringify(scn)); } catch {}
          FCX.track("scenario_compared", { slot });
          FCX.toast(`Saved as Scenario ${slot}`);
          renderScenarioSlots();
        } else if (e.target.matches("[data-load]") && scn[slot]) {
          loadValues(scn[slot].values, scn[slot].termUnits);
          FCX.toast(`Loaded Scenario ${slot}`);
        } else if (e.target.matches("[data-clear]")) {
          scn[slot] = null;
          try { localStorage.setItem(scnKey, JSON.stringify(scn)); } catch {}
          renderScenarioSlots();
        }
      });
    }

    function loadValues(values, termUnits) {
      cfg.inputs.forEach((def) => {
        if (def.type === "debts") {
          if (Array.isArray(values.debts)) { state.debts = values.debts.map((d) => Object.assign({}, d)); renderDebtRows(fieldEls[def.id], def); }
        } else if (def.type === "toggle") {
          state.values[def.id] = !!values[def.id];
          fieldEls[def.id].querySelector("input").checked = !!values[def.id];
        } else if (def.type === "segment") {
          if (values[def.id] != null) { state.values[def.id] = values[def.id]; syncSegment(fieldEls[def.id], values[def.id]); }
        } else if (def.type === "select") {
          if (values[def.id] != null) { state.values[def.id] = values[def.id]; fieldEls[def.id].querySelector("select").value = String(values[def.id]); }
        } else if (values[def.id] != null && isFinite(values[def.id])) {
          if (def.type === "term" && termUnits && termUnits[def.id]) {
            state.termUnits[def.id] = termUnits[def.id];
            const wrap = fieldEls[def.id];
            wrap.querySelectorAll("[data-term-unit] button").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.u === termUnits[def.id])));
          }
          setInputVal(def, values[def.id]);
        }
      });
      onChange();
    }

    /* ---- share / reset / print / csv ---- */
    $("#act-share")?.addEventListener("click", () => {
      const p = new URLSearchParams();
      cfg.inputs.forEach((def) => {
        if (def.type === "debts") p.set("debts", state.debts.map((d) => [encodeURIComponent(d.name), d.balance, d.apr, d.min].join("~")).join("_"));
        else if (def.type === "toggle") p.set(def.id, state.values[def.id] ? "1" : "0");
        else if (state.values[def.id] != null && state.values[def.id] !== "" && isFinite(state.values[def.id])) p.set(def.id, String(+(+state.values[def.id]).toFixed(4)));
        else if (typeof state.values[def.id] === "string") p.set(def.id, state.values[def.id]);
      });
      const url = location.origin + location.pathname + "?" + p.toString();
      (navigator.clipboard?.writeText(url) || Promise.reject()).then(
        () => FCX.toast("Link copied — it reproduces this calculation"),
        () => { prompt("Copy this link:", url); }
      );
      FCX.track("calculation_shared", { slug: cfg.slug });
    });
    function readShareParams() {
      const p = new URLSearchParams(location.search);
      if (![...p.keys()].length) return;
      const values = {};
      let any = false;
      cfg.inputs.forEach((def) => {
        if (!p.has(def.type === "debts" ? "debts" : def.id)) return;
        any = true;
        if (def.type === "debts") {
          values.debts = p.get("debts").split("_").map((s) => {
            const [name, balance, apr, min] = s.split("~");
            return { name: decodeURIComponent(name || "Debt"), balance: +balance || 0, apr: +apr || 0, min: +min || 0 };
          });
        } else if (def.type === "toggle") values[def.id] = p.get(def.id) === "1";
        else if (def.type === "select" || def.type === "segment") values[def.id] = coerceOption(def, p.get(def.id));
        else values[def.id] = parseFloat(p.get(def.id));
      });
      if (any) loadValues(values, null);
    }
    $("#act-reset")?.addEventListener("click", () => {
      const values = {};
      cfg.inputs.forEach((def) => {
        if (def.type === "debts") values.debts = (def.default || []).map((d) => Object.assign({}, d));
        else values[def.id] = def.default != null ? def.default : (def.type === "toggle" ? false : "");
      });
      state.termUnits = {};
      cfg.inputs.forEach((def) => { if (def.type === "term") state.termUnits[def.id] = def.defaultUnit || "y"; });
      loadValues(values, state.termUnits);
      history.replaceState(null, "", location.pathname);
      FCX.toast("Reset to defaults");
    });
    $("#act-print")?.addEventListener("click", doPrint);
    $("#table-print")?.addEventListener("click", doPrint);
    function doPrint() {
      const ph = $(".print-header");
      if (ph) {
        const inputsTxt = cfg.inputs.filter((d) => !fieldEls[d.id]?.hidden && d.type !== "debts").map((d) => {
          let v = state.values[d.id];
          if (d.type === "currency") v = FCX.fmt.money0(v);
          else if (d.type === "percent") v = FCX.fmt.pct(v);
          else if (d.type === "term") v = FCX.fmt.dur(v);
          else if (d.type === "toggle") v = v ? "Yes" : "No";
          else if (d.type === "select" || d.type === "segment") v = (d.options.find((o) => String(o.v) === String(v)) || {}).label || v;
          return `${d.label}: ${v}`;
        }).join(" · ");
        ph.innerHTML = `<div class="ph-brand">Finance Calculator X — ${document.title.split("—")[0].split("|")[0].trim()}</div>
          <div class="ph-meta">${inputsTxt}</div>
          <div class="ph-meta">Generated ${new Date().toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })} · financecalculatorx.com · Estimates for education, not financial advice.</div>`;
      }
      FCX.track("calculation_printed", { slug: cfg.slug });
      window.print();
    }
    $("#table-csv")?.addEventListener("click", () => {
      const t = state.result?.table;
      if (!t) return;
      const view = t.views.find((v) => v.id === state.view) || t.views[0];
      const clean = (x) => String(x == null ? "" : x).replace(/&nbsp;/g, " ").replace(/<[^>]+>/g, "");
      const lines = [view.columns.map((c) => `"${c.label}"`).join(",")];
      view.rows.forEach((r) => lines.push(view.columns.map((c) => {
        const raw = r["_csv_" + c.key] != null ? r["_csv_" + c.key] : r[c.key];
        const v = clean(raw);
        return /^[\d.\-]+$/.test(v.replace(/,/g, "")) ? v.replace(/,/g, "") : `"${v.replace(/"/g, '""')}"`;
      }).join(",")));
      const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (t.csvName || cfg.slug) + ".csv";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      FCX.track("csv_exported", { slug: cfg.slug });
      FCX.toast("Schedule downloaded as CSV");
    });

    /* ---- change pipeline ---- */
    let t0 = 0, computed = false;
    function onChange() {
      clearTimeout(t0);
      t0 = setTimeout(() => {
        applyShowIf();
        const { ok } = validate();
        if (!ok) { state.result = { invalid: "Fix the highlighted inputs to see your results." }; render(); return; }
        let r;
        try { r = cfg.compute(currentValues(), F); }
        catch (err) { console.error(err); r = { invalid: "These inputs can’t be calculated. Try adjusting them." }; }
        state.result = r;
        render();
        if (!computed && r && !r.invalid) { computed = true; FCX.track("calculation_completed", { slug: cfg.slug }); }
      }, 120);
    }

    document.addEventListener("fcx:currency", () => {
      form.querySelectorAll("[data-cursym]").forEach((el) => (el.textContent = FCX.fmt.sym()));
      cfg.inputs.forEach((def) => { if (def.type === "currency") reformat(def); });
      onChange();
    });

    readShareParams();
    FCX.pushRecent(cfg.slug);
    FCX.track("calculator_view", { slug: cfg.slug });
    onChange();
  }

  window.FCX = window.FCX || {};
  window.FCX.define = (cfg) => {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => boot(cfg));
    else boot(cfg);
  };
})();
