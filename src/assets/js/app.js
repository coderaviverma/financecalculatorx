/* Finance Calculator X — site chrome: preferences (theme/currency),
   formatters, header menus, instant search, toasts, analytics hooks. */
(function () {
  "use strict";
  const FCX = (window.FCX = window.FCX || {});

  /* ---------- preferences ---------- */
  const PREF_KEY = "fcx:prefs";
  const CURRENCIES = {
    USD: { locale: "en-US", label: "US Dollar", sym: "$" },
    EUR: { locale: "de-DE", label: "Euro", sym: "€" },
    GBP: { locale: "en-GB", label: "British Pound", sym: "£" },
    INR: { locale: "en-IN", label: "Indian Rupee", sym: "₹" },
    AUD: { locale: "en-AU", label: "Australian Dollar", sym: "A$" },
    CAD: { locale: "en-CA", label: "Canadian Dollar", sym: "C$" },
    SGD: { locale: "en-SG", label: "Singapore Dollar", sym: "S$" },
    JPY: { locale: "ja-JP", label: "Japanese Yen", sym: "¥" },
  };
  FCX.CURRENCIES = CURRENCIES;

  function loadPrefs() {
    try { return Object.assign({ theme: "auto", currency: "USD" }, JSON.parse(localStorage.getItem(PREF_KEY) || "{}")); }
    catch { return { theme: "auto", currency: "USD" }; }
  }
  let prefs = loadPrefs();
  FCX.prefs = () => prefs;
  FCX.setPref = (k, v) => {
    prefs[k] = v;
    try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch {}
    if (k === "theme") applyTheme();
    if (k === "currency") { buildFmt(); document.dispatchEvent(new CustomEvent("fcx:currency")); }
    syncMenus();
  };

  function applyTheme() {
    const t = prefs.theme === "auto"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : prefs.theme;
    document.documentElement.setAttribute("data-theme", t);
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => { if (prefs.theme === "auto") applyTheme(); });
  applyTheme();

  /* ---------- formatters ---------- */
  let _money, _money0, _compact, _num, _cur;
  function buildFmt() {
    // per-page suggested currency applies until the visitor picks one themselves
    const pageCur = document.body?.dataset.suggestCurrency;
    _cur = (!localStorage.getItem(PREF_KEY) && pageCur && CURRENCIES[pageCur]) ? pageCur : (CURRENCIES[prefs.currency] ? prefs.currency : "USD");
    const loc = CURRENCIES[_cur].locale;
    _money = new Intl.NumberFormat(loc, { style: "currency", currency: _cur });
    _money0 = new Intl.NumberFormat(loc, { style: "currency", currency: _cur, maximumFractionDigits: 0 });
    _compact = new Intl.NumberFormat(loc, { style: "currency", currency: _cur, notation: "compact", maximumFractionDigits: 1 });
    _num = new Intl.NumberFormat(loc, { maximumFractionDigits: 2 });
  }
  FCX.fmt = {
    money: (v) => (isFinite(v) ? _money.format(v) : "—"),
    money0: (v) => (isFinite(v) ? _money0.format(v) : "—"),
    compact: (v) => (isFinite(v) ? _compact.format(v) : "—"),
    num: (v, dp) => (isFinite(v) ? new Intl.NumberFormat(CURRENCIES[_cur].locale, { maximumFractionDigits: dp == null ? 2 : dp }).format(v) : "—"),
    pct: (v, dp) => (isFinite(v) ? FCX.fmt.num(v, dp == null ? 2 : dp) + "%" : "—"),
    group: (v) => (isFinite(v) ? _num.format(v) : ""),
    dur: (months) => {
      if (months == null || !isFinite(months)) return "—";
      const m = Math.round(months);
      const y = Math.floor(m / 12), mm = m % 12;
      if (y === 0) return mm + (mm === 1 ? " month" : " months");
      if (mm === 0) return y + (y === 1 ? " year" : " years");
      return y + " yr " + mm + " mo";
    },
    sym: () => CURRENCIES[_cur].sym,
    cur: () => _cur,
  };
  buildFmt();
  document.addEventListener("DOMContentLoaded", () => { buildFmt(); syncMenus(); });

  /* ---------- analytics hooks (no external calls) ---------- */
  FCX.track = (event, props) => {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event }, props || {})); } catch {}
  };

  /* ---------- toast ---------- */
  let toastEl, toastTimer;
  FCX.toast = (msg) => {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  };

  /* ---------- recently used ---------- */
  FCX.pushRecent = (slug) => {
    try {
      const arr = JSON.parse(localStorage.getItem("fcx:recent") || "[]").filter((s) => s !== slug);
      arr.unshift(slug);
      localStorage.setItem("fcx:recent", JSON.stringify(arr.slice(0, 8)));
    } catch {}
  };

  /* ---------- header interactions ---------- */
  function syncMenus() {
    document.querySelectorAll("[data-menu-theme] button[data-v]").forEach((b) => b.setAttribute("aria-checked", String(prefs.theme === b.dataset.v)));
    document.querySelectorAll("[data-menu-currency] button[data-v]").forEach((b) => b.setAttribute("aria-checked", String(FCX.fmt.cur() === b.dataset.v)));
    const curBtn = document.getElementById("btn-currency-label");
    if (curBtn) curBtn.textContent = FCX.fmt.cur();
  }

  function closeMenus(except) {
    document.querySelectorAll(".menu.open").forEach((m) => { if (m !== except) m.classList.remove("open"); });
  }

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-opens]");
    if (opener) {
      const menu = document.getElementById(opener.dataset.opens);
      if (menu) { const willOpen = !menu.classList.contains("open"); closeMenus(); menu.classList.toggle("open", willOpen); opener.setAttribute("aria-expanded", String(willOpen)); }
      return;
    }
    const opt = e.target.closest(".menu button[data-v]");
    if (opt) {
      const menu = opt.closest(".menu");
      if (menu.hasAttribute("data-menu-theme")) FCX.setPref("theme", opt.dataset.v);
      if (menu.hasAttribute("data-menu-currency")) FCX.setPref("currency", opt.dataset.v);
      menu.classList.remove("open");
      return;
    }
    if (!e.target.closest(".menu")) closeMenus();
    const nav = document.querySelector(".main-nav");
    const tog = e.target.closest(".nav-toggle");
    if (tog && nav) { nav.classList.toggle("open"); tog.setAttribute("aria-expanded", nav.classList.contains("open")); }
    else if (nav && !e.target.closest(".site-header")) nav.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeMenus(); document.querySelector(".main-nav")?.classList.remove("open"); } });

  /* ---------- instant search ---------- */
  let index = null, idxPromise = null;
  function loadIndex() {
    if (!idxPromise) idxPromise = fetch("/assets/search-index.json").then((r) => r.json()).then((d) => (index = d)).catch(() => (index = []));
    return idxPromise;
  }
  function score(item, q) {
    const t = item.t.toLowerCase(), words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return 0;
    let s = 0, matched = 0;
    const hay = (item.t + " " + (item.a || []).join(" ") + " " + (item.k || []).join(" ") + " " + item.c).toLowerCase();
    for (const w of words) {
      if (t === w) { s += 60; matched++; }
      else if (t.startsWith(w)) { s += 30; matched++; }
      else if (t.includes(w)) { s += 18; matched++; }
      else if ((item.a || []).some((x) => x.toLowerCase().includes(w))) { s += 14; matched++; }
      else if (hay.includes(w)) { s += 7; matched++; }
    }
    // most words must match somewhere; stray words ("faster", "my") don't zero the result
    if (!matched || matched / words.length < 0.6) return 0;
    return s + (item.p ? 3 : 0);
  }
  function attachSearch(input, resultsBox) {
    let items = [], active = -1;
    const render = () => {
      resultsBox.innerHTML = "";
      if (!items.length) { resultsBox.innerHTML = '<div class="none">No matching calculator. Try “loan”, “mortgage”, “savings”…</div>'; return; }
      items.forEach((it, i) => {
        const a = document.createElement("a");
        a.href = it.u;
        a.className = i === active ? "active" : "";
        a.innerHTML = `<span class="st">${it.t}</span><span class="sd">${it.d}</span>`;
        resultsBox.appendChild(a);
      });
    };
    const update = () => {
      const q = input.value.trim();
      if (!q) { resultsBox.hidden = true; return; }
      loadIndex().then(() => {
        items = (index || []).map((it) => ({ it, s: score(it, q) })).filter((x) => x.s > 0)
          .sort((a, b) => b.s - a.s).slice(0, 8).map((x) => x.it);
        active = -1;
        resultsBox.hidden = false;
        render();
        FCX.track("calculator_search_used", { q });
      });
    };
    input.addEventListener("input", update);
    input.addEventListener("focus", () => { if (input.value.trim()) update(); });
    input.addEventListener("keydown", (e) => {
      if (resultsBox.hidden) return;
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(items.length - 1, active + 1); render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); render(); }
      else if (e.key === "Enter" && active >= 0 && items[active]) { location.href = items[active].u; }
      else if (e.key === "Escape") { resultsBox.hidden = true; }
    });
    document.addEventListener("click", (e) => { if (!resultsBox.contains(e.target) && e.target !== input) resultsBox.hidden = true; });
  }
  FCX.attachSearch = attachSearch;

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-search-input]").forEach((input) => {
      const box = document.getElementById(input.getAttribute("aria-controls"));
      if (box) attachSearch(input, box);
    });
    // "/" focuses the first search field
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName || "")) {
        const s = document.querySelector("[data-search-input]");
        if (s) { e.preventDefault(); s.focus(); s.scrollIntoView({ block: "center", behavior: "smooth" }); }
      }
    });
    // header search buttons route to the calculator directory
    document.querySelectorAll("[data-goto-search]").forEach((b) => b.addEventListener("click", () => {
      const s = document.querySelector("[data-search-input]");
      if (s) { s.focus(); s.scrollIntoView({ block: "center", behavior: "smooth" }); }
      else location.href = "/calculators/#search";
    }));
    // recently used strip (homepage)
    const recentWrap = document.getElementById("recent-tools");
    if (recentWrap) {
      loadIndex().then(() => {
        let slugs = [];
        try { slugs = JSON.parse(localStorage.getItem("fcx:recent") || "[]"); } catch {}
        const items = slugs.map((s) => (index || []).find((it) => it.u === "/" + s + "/")).filter(Boolean).slice(0, 4);
        if (!items.length) return;
        recentWrap.querySelector(".grid").innerHTML = items.map((it) => `<a class="tool-card" href="${it.u}"><span class="t">${it.t}</span><span class="d">${it.d}</span></a>`).join("");
        recentWrap.hidden = false;
      });
    }
  });
})();
