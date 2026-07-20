/* Finance Calculator X — site chrome: preferences (theme/currency),
   formatters, header menus, instant search, toasts, analytics hooks. */
(function () {
  "use strict";
  const FCX = (window.FCX = window.FCX || {});

  /* ---------- optional analytics consent ---------- */
  const CONSENT_KEY = "fcx:analytics-consent-v1";
  const ga4 = document.body?.dataset.ga4 || "";
  let analyticsConsent = "";
  let analyticsLoaded = false;
  try { analyticsConsent = localStorage.getItem(CONSENT_KEY) || ""; } catch {}

  function cleanPageLocation() {
    const attribution = window.__FCX_ATTRIBUTION_PARAMS || "";
    return location.origin + location.pathname + (attribution ? "?" + attribution : "");
  }

  function cleanReferrer() {
    if (!document.referrer) return "";
    try {
      const u = new URL(document.referrer);
      return u.origin + u.pathname;
    } catch { return ""; }
  }

  function loadAnalytics() {
    if (!ga4 || analyticsConsent !== "granted") return;
    window["ga-disable-" + ga4] = false;
    if (analyticsLoaded) {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      return;
    }
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("js", new Date());
    window.gtag("config", ga4, {
      page_location: cleanPageLocation(),
      page_referrer: cleanReferrer(),
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4);
    document.head.appendChild(script);
  }

  function removeAnalyticsCookies() {
    document.cookie.split(";").map((v) => v.trim().split("=")[0]).filter((name) => name === "_ga" || name.startsWith("_ga_")).forEach((name) => {
      document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax";
      document.cookie = name + "=; Max-Age=0; Path=/; Domain=" + location.hostname + "; SameSite=Lax";
      document.cookie = name + "=; Max-Age=0; Path=/; Domain=." + location.hostname + "; SameSite=Lax";
    });
  }

  function setAnalyticsConsent(value) {
    analyticsConsent = value === "granted" ? "granted" : "denied";
    try { localStorage.setItem(CONSENT_KEY, analyticsConsent); } catch {}
    document.getElementById("analytics-consent")?.setAttribute("hidden", "");
    if (analyticsConsent === "granted") loadAnalytics();
    else {
      window["ga-disable-" + ga4] = true;
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      removeAnalyticsCookies();
    }
  }

  function showConsent(focus) {
    const banner = document.getElementById("analytics-consent");
    if (!banner || !ga4) return;
    banner.removeAttribute("hidden");
    if (focus) banner.querySelector("[data-consent]")?.focus();
  }

  function initConsent() {
    document.querySelectorAll("[data-consent]").forEach((button) => button.addEventListener("click", () => setAnalyticsConsent(button.dataset.consent)));
    document.querySelectorAll("[data-privacy-settings]").forEach((button) => button.addEventListener("click", () => showConsent(true)));
    if (analyticsConsent !== "granted") {
      // Remove cookies left by the pre-consent implementation for returning
      // visitors, including when their stored choice is already "denied".
      window["ga-disable-" + ga4] = true;
      removeAnalyticsCookies();
      if (!analyticsConsent) showConsent(false);
    }
  }

  // Deferred scripts execute in document order, so this runs before engine.js
  // boots any calculator. Loading here rather than at DOMContentLoaded means
  // the gtag queue already exists when boot-time events (calculator_view, the
  // initial calculation_completed) fire for visitors with stored consent.
  if (analyticsConsent === "granted") loadAnalytics();

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
    try { return Object.assign({ theme: "auto", currency: "USD", currencySet: false }, JSON.parse(localStorage.getItem(PREF_KEY) || "{}")); }
    catch { return { theme: "auto", currency: "USD", currencySet: false }; }
  }
  let prefs = loadPrefs();
  FCX.prefs = () => prefs;
  FCX.setPref = (k, v) => {
    prefs[k] = v;
    if (k === "currency") prefs.currencySet = true; // an explicit pick always wins over auto-detected/page defaults
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

  /* ---------- currency auto-detection (country → currency, resolved at the CF edge) ---------- */
  // A visitor's country maps to one of the supported display currencies; anything
  // unmapped falls through to the page suggestion or USD. Explicit choices always win.
  const COUNTRY_CCY = {
    US: "USD", GB: "GBP", IN: "INR", AU: "AUD", CA: "CAD", SG: "SGD", JP: "JPY",
    AT: "EUR", BE: "EUR", HR: "EUR", CY: "EUR", EE: "EUR", FI: "EUR", FR: "EUR", DE: "EUR",
    GR: "EUR", IE: "EUR", IT: "EUR", LV: "EUR", LT: "EUR", LU: "EUR", MT: "EUR", NL: "EUR",
    PT: "EUR", SK: "EUR", SI: "EUR", ES: "EUR",
  };
  let geoCur = null, geoResolved = false;
  try {
    const cc = sessionStorage.getItem("fcx:geo"); // cached for the session — no refetch on navigation
    if (cc !== null) { geoResolved = true; if (COUNTRY_CCY[cc]) geoCur = COUNTRY_CCY[cc]; }
  } catch {}

  /* ---------- formatters ---------- */
  let _money, _money0, _compact, _num, _cur;
  function buildFmt() {
    const pageCur = document.body?.dataset.suggestCurrency;
    // precedence: explicit user choice → detected country → per-page suggestion → USD
    _cur =
      (prefs.currencySet && CURRENCIES[prefs.currency]) ? prefs.currency :
      (geoCur && CURRENCIES[geoCur]) ? geoCur :
      (pageCur && CURRENCIES[pageCur]) ? pageCur : "USD";
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

  function applyGeo(country) {
    const c = COUNTRY_CCY[String(country || "").toUpperCase()];
    if (!c || !CURRENCIES[c]) return;
    geoCur = c;
    if (!prefs.currencySet) { buildFmt(); syncMenus(); document.dispatchEvent(new CustomEvent("fcx:currency")); }
  }
  function initGeo() {
    if (prefs.currencySet || geoResolved) return; // user already chose, or already known this session
    fetch("/geo", { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const c = (d && d.country) || "";
        try { sessionStorage.setItem("fcx:geo", c); } catch {}
        geoResolved = true;
        applyGeo(c);
      })
      .catch(() => {});
  }

  document.addEventListener("DOMContentLoaded", () => { buildFmt(); syncMenus(); initGeo(); initConsent(); });

  /* ---------- analytics hooks (never queue pre-consent events) ---------- */
  FCX.track = (event, props) => {
    if (analyticsConsent !== "granted" || typeof window.gtag !== "function") return;
    try {
      window.gtag("event", event, props || {});
    } catch {}
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
        FCX.track("calculator_search_used", { result_count: items.length });
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
