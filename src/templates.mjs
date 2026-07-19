/* Finance Calculator X — HTML templates (pure functions → strings). */
import { site, categories, nav, footer, popular, tasks, featuredComparisons } from "./data/site.mjs";

export const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- icons ---------- */
const I = {
  loan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="7" rx="6.5" ry="2.6"/><path d="M5.5 7v5c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6V7"/><path d="M5.5 12v5c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6v-5"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v10.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9"/><path d="M9.5 20.5v-6h5v6"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 3.5v17h17"/><path d="M7.5 14.5 11 10l3 3 5.5-6.5"/></svg>',
  piggy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11.5c0-3.6 3.1-6 7.2-6 3.9 0 6.8 2.2 6.8 5.5 0 1.9-.9 3.4-2.3 4.4l.5 2.8h-2.6l-.6-1.4a9 9 0 0 1-3.6 0l-.6 1.4H7.2l.5-2.9C6 14.6 5 13.2 5 11.5Z"/><path d="M5.5 10.5c-1.3 0-2-.7-2-1.8"/><circle cx="15.4" cy="10.4" r=".4" fill="currentColor"/><path d="M10 5.8c.6-1 1.9-1.6 3.2-1.4"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13" rx="2.5"/><path d="M3 9.5 16.5 4.8a1 1 0 0 1 1.3.6l.8 2.4"/><path d="M16 13h3.5"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16M6.5 7.5h11"/><path d="m6.5 7.5-3 6.5c1 .9 2 1.3 3 1.3s2-.4 3-1.3l-3-6.5ZM17.5 7.5l-3 6.5c1 .9 2 1.3 3 1.3s2-.4 3-1.3l-3-6.5Z"/><path d="M9 20h6"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></svg>',
  sprout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5v-7"/><path d="M12 13.5c0-3.5-2.5-6-6.5-6 0 3.6 2.6 6 6.5 6ZM12 11c0-3.4 2.4-5.8 6.5-5.8 0 3.5-2.5 5.8-6.5 5.8Z"/><path d="M7 20.5h10"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="m9.5 14.5 2 2 3.5-3.5"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12L13 3Z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
export const icon = (name) => I[name] || I.chart;

const LOGO = `<svg class="logo" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#0B6B57"/><path d="M7.5 21.5 13 15l3.5 3.5 7-8.5" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="23.5" cy="10" r="2.2" fill="#E9B949"/></svg>`;

const THEME_INIT = `(function(){try{var p=JSON.parse(localStorage.getItem("fcx:prefs")||"{}");var t=p.theme||"auto";if(t==="auto"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

// Calculator share state is deliberately captured before analytics or ad code
// can run. New links use a URL fragment (never sent in an HTTP request); legacy
// query-string links are scrubbed before any third-party script loads. Emitted
// on every page so the guarantee holds even for share links that land on
// non-calculator URLs. A malformed %-sequence keeps the raw payload rather
// than dropping the shared state.
const SHARE_CAPTURE = `(function(){try{var raw="";if(location.hash.indexOf("#calc=")===0){raw=location.hash.slice(6);try{raw=decodeURIComponent(raw)}catch(e){}}else if(location.search.length>1){raw=location.search.slice(1)}if(raw){window.__FCX_SHARE_PARAMS=raw;history.replaceState(null,"",location.pathname)}}catch(e){try{history.replaceState(null,"",location.pathname)}catch(e2){}}})();`;

const adsenseClient = () => {
  const id = String(site.adsense?.publisherId || "").trim();
  if (!id) return "";
  return id.startsWith("ca-pub-") ? id : `ca-${id}`;
};

/* ---------- chrome ---------- */
function header(path) {
  const cur = (href) => (path === href || (href !== "/" && path.startsWith(href)) ? ' aria-current="true"' : "");
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/" aria-label="${esc(site.name)} — home">${LOGO}<span>Finance&nbsp;Calculator&nbsp;<span class="x">X</span></span></a>
    <nav class="main-nav" aria-label="Main">${nav.map((n) => `<a href="${n.href}"${cur(n.href)}>${n.label}</a>`).join("")}</nav>
    <div class="header-actions">
      <button class="icon-btn search-btn" type="button" data-goto-search aria-label="Search calculators">${I.search}<span class="label">Search</span><span class="kbd">/</span></button>
      <div class="menu-wrap">
        <button class="icon-btn" type="button" data-opens="menu-currency" aria-expanded="false" aria-haspopup="true" aria-label="Choose currency"><span id="btn-currency-label">USD</span></button>
        <div class="menu" id="menu-currency" data-menu-currency>
          <div class="menu-title">Display currency</div>
          ${["USD", "EUR", "GBP", "INR", "AUD", "CAD", "SGD", "JPY"].map((c) => `<button type="button" role="menuitemradio" data-v="${c}" aria-checked="false"><span class="sym">${{ USD: "$", EUR: "€", GBP: "£", INR: "₹", AUD: "A$", CAD: "C$", SGD: "S$", JPY: "¥" }[c]}</span>${{ USD: "US Dollar", EUR: "Euro", GBP: "British Pound", INR: "Indian Rupee", AUD: "Australian Dollar", CAD: "Canadian Dollar", SGD: "Singapore Dollar", JPY: "Japanese Yen" }[c]}</button>`).join("")}
        </div>
      </div>
      <div class="menu-wrap">
        <button class="icon-btn" type="button" data-opens="menu-theme" aria-expanded="false" aria-haspopup="true" aria-label="Choose theme">${I.sun}</button>
        <div class="menu" id="menu-theme" data-menu-theme>
          <div class="menu-title">Appearance</div>
          <button type="button" role="menuitemradio" data-v="light" aria-checked="false"><span class="sym">☀</span>Light</button>
          <button type="button" role="menuitemradio" data-v="dark" aria-checked="false"><span class="sym">☾</span>Dark</button>
          <button type="button" role="menuitemradio" data-v="auto" aria-checked="false"><span class="sym">A</span>System</button>
        </div>
      </div>
      <button class="icon-btn nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">${I.menu}</button>
    </div>
  </div>
</header>`;
}

function footerHtml() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="/">${LOGO}<span>Finance&nbsp;Calculator&nbsp;<span class="x">X</span></span></a>
        <p style="margin-top:.9rem">Free, transparent financial calculators with documented formulas, worked examples and tested methodology.</p>
      </div>
      ${footer.groups.map((g) => `<nav aria-label="${esc(g.title)}"><h2>${esc(g.title)}</h2><ul>${g.links.map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join("")}</ul></nav>`).join("")}
    </div>
    <div class="footer-legal">
      <p>© ${new Date().getFullYear()} ${esc(site.name)}. All calculators produce estimates for education and information — not financial, investment, tax or legal advice. <a href="/disclaimer/">Read the full disclaimer</a>.</p>
      ${site.ga4 ? `<button type="button" class="privacy-choice" data-privacy-settings>Privacy choices</button>` : ""}
    </div>
  </div>
</footer>`;
}

function consentHtml() {
  if (!site.ga4) return "";
  return `<aside class="consent-banner" id="analytics-consent" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-copy" hidden>
  <div>
    <h2 id="consent-title">Optional analytics</h2>
    <p id="consent-copy">Allow optional Google Analytics cookies to help us understand which calculators are useful. Calculator inputs are never included, and page URLs are stripped of query strings and fragments. <a href="/privacy-policy/">Privacy policy</a>.</p>
  </div>
  <div class="consent-actions">
    <button type="button" class="btn btn-ghost btn-sm" data-consent="denied">Decline</button>
    <button type="button" class="btn btn-ghost btn-sm" data-consent="granted">Allow analytics</button>
  </div>
</aside>`;
}

/* ---------- base document ---------- */
export function base(p) {
  const brandedTitle = `${p.title} | ${site.name}`;
  const title = p.rawTitle ? p.title : (brandedTitle.length <= 70 ? brandedTitle : p.title);
  const url = site.origin + p.path;
  const adClient = adsenseClient();
  const jsonld = (p.jsonld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n  ");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(p.description)}">
  ${p.noindex ? `<meta name="robots" content="noindex, follow">` : ""}
  <link rel="canonical" href="${url}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:type" content="${p.ogType || "website"}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${site.origin}/assets/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(p.description)}">
  <meta name="twitter:image" content="${site.origin}/assets/img/og-image.png">
  <meta name="theme-color" content="#0B6B57">
  ${site.verify?.google ? `<meta name="google-site-verification" content="${esc(site.verify.google)}">` : ""}
  ${site.verify?.bing ? `<meta name="msvalidate.01" content="${esc(site.verify.bing)}">` : ""}
  ${adClient ? `<meta name="google-adsense-account" content="${esc(adClient)}">` : ""}
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <script>${SHARE_CAPTURE}</script>
  <script>${THEME_INIT}</script>
  <link rel="preload" href="/assets/fonts/inter-latin-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/inter-latin-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/fraunces-latin-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/site.css?v=${p.v}">
  ${site.adsense?.adsEnabled && site.adsense?.certifiedCmp && adClient ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(adClient)}" crossorigin="anonymous"></script>` : ""}
  ${jsonld}
</head>
<body${p.suggestCurrency ? ` data-suggest-currency="${p.suggestCurrency}"` : ""}${site.ga4 ? ` data-ga4="${esc(site.ga4)}"` : ""}>
${header(p.path)}
<main id="main">
${p.content}
</main>
${footerHtml()}
${consentHtml()}
<script src="/assets/js/app.js?v=${p.v}" defer></script>
${(p.scripts || []).map((s) => `<script src="${s}?v=${p.v}" defer></script>`).join("\n")}
</body>
</html>`;
}

/* ---------- JSON-LD helpers ---------- */
export const ldOrg = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.origin + "/",
  logo: site.origin + "/assets/img/apple-touch-icon.png",
  email: site.email,
  founder: { "@type": "Person", name: "Avinash Verma", url: site.origin + "/authors/avinash-verma/" },
  sameAs: ["https://github.com/coderaviverma", "https://gitlab.com/coderaviverma"],
});
export const ldWebsite = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.origin + "/",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: site.origin + "/calculators/?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
});
export const ldBreadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: site.origin + it.path,
  })),
});

// plain text from FAQ answer HTML (for FAQPage schema)
const stripHtml = (s) =>
  String(s || "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

// FAQPage — backed by the genuine, page-specific FAQ content shown on the page
export const ldFaq = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (faqs || []).map((f) => ({
    "@type": "Question",
    name: stripHtml(f.q),
    acceptedAnswer: { "@type": "Answer", text: stripHtml(f.aHtml) },
  })),
});

// WebApplication — a free, browser-based finance tool. No rating/review markup (none exists).
export const ldWebApp = (c) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: c.title,
  url: site.origin + `/${c.slug}/`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (runs in a web browser)",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: c.metaDescription,
  author: { "@type": "Person", name: "Avinash Verma", url: site.origin + "/authors/avinash-verma/" },
  publisher: { "@type": "Organization", name: site.name, url: site.origin + "/" },
});

export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>
    ${items.map((it, i) => i === items.length - 1
      ? `<li><span aria-current="page">${esc(it.name)}</span></li>`
      : `<li><a href="${it.path}">${esc(it.name)}</a></li>`).join("")}
  </ol></nav>`;
}

export const toolCard = (c, showCat) => {
  const ci = categories.find((x) => x.id === c.category);
  return `<a class="tool-card" href="/${c.slug}/"><span class="ic">${icon(ci?.icon || "chart")}</span><span class="t">${esc(c.title)}</span><span class="d">${esc(c.cardDescription)}</span>${showCat ? `<span class="cat">${esc(ci?.short || "")}</span>` : ""}</a>`;
};

/* ---------- calculator page ---------- */
export function calculatorPage(c, all, v) {
  const cat = categories.find((x) => x.id === c.category);
  const crumbs = [{ name: "Home", path: "/" }, { name: cat.title, path: cat.path }, { name: c.title, path: `/${c.slug}/` }];
  const related = (c.related || []).map((slug) => all.find((x) => x.slug === slug)).filter(Boolean);
  const jump = [
    ["#how-to", "How to use"],
    ["#understanding", c.jumpExplainLabel || "How it works"],
    ["#formula", "Formula"],
    ["#example", "Worked example"],
    ["#limitations", "Assumptions"],
    ["#faq", "FAQ"],
  ];
  const content = `
<div class="wrap">
  ${breadcrumbs(crumbs)}
  <div class="page-head">
    <h1>${esc(c.h1 || c.title)}</h1>
    <p class="lede">${c.tagline}</p>
    <div class="review-line">
      <span>By <a href="/authors/avinash-verma/">Avinash Verma</a> · <a href="/editorial-policy/">editorial standards</a></span>
      <span>Last reviewed: <time datetime="${c.lastReviewed}">${new Date(c.lastReviewed + "T00:00:00Z").toLocaleDateString("en", { year: "numeric", month: "long", timeZone: "UTC" })}</time></span>
      <span>Formula v${c.version || "1.0"} · <a href="/methodology/">How we calculate</a></span>
    </div>
  </div>

  <div class="print-header"></div>

  <div class="calc-layout">
    <div class="card calc-card">
      <h2>Inputs</h2>
      <form id="calc-form" class="calc-form" novalidate autocomplete="off"></form>
      <div class="calc-actions">
        <button type="button" class="btn btn-ghost btn-sm" id="act-reset">Reset</button>
        <button type="button" class="btn btn-ghost btn-sm" id="act-share">Copy link</button>
        <button type="button" class="btn btn-ghost btn-sm" id="act-print">Print report</button>
      </div>
      ${c.jurisdiction ? `<div class="callout note calc-note"><span class="c-title">Regional note</span><p>${c.jurisdiction}</p></div>` : ""}
      <p class="calc-currency-note">Changing the currency updates number formatting and the displayed symbol only. It does not apply any country-specific tax, lending, insurance or regulatory rules.</p>
    </div>
    <div class="results">
      <div id="res-invalid" class="result-invalid" hidden></div>
      <div class="result-hero" id="res-hero" aria-live="polite">
        <div class="rh-label"></div>
        <div class="rh-value"></div>
        <p class="rh-sub"></p>
      </div>
      <div class="metric-grid" id="res-metrics"></div>
      <div class="explain-box" id="res-explain"></div>
      <div class="card chart-card" id="chart-card" hidden>
        <h2 id="chart-title"></h2>
        <div id="chart"></div>
        <p class="chart-note" id="chart-note" hidden></p>
      </div>
      <div class="card scenario-card" id="scenario-card" hidden>
        <h2>Compare two scenarios</h2>
        <p class="scenario-intro">${c.scenarioHint || "Save your current inputs as Scenario A, change one assumption, then save Scenario B. The comparison table shows exactly what that change is worth."}</p>
        <div class="scenario-slots">
          ${["A", "B"].map((s) => `<div class="scenario-slot" data-slot="${s}">
            <div class="s-name">Scenario ${s}</div>
            <p class="s-desc">Not saved yet</p>
            <div class="s-actions">
              <button type="button" class="btn btn-soft btn-sm" data-save>Save current as ${s}</button>
              <button type="button" class="btn btn-ghost btn-sm" data-load hidden>Load</button>
              <button type="button" class="btn btn-ghost btn-sm" data-clear hidden>Clear</button>
            </div>
          </div>`).join("")}
        </div>
        <div id="scenario-compare" hidden></div>
      </div>
    </div>
  </div>

  <div class="card table-card" id="table-card" hidden>
    <h2 id="table-title"></h2>
    <div class="table-tools">
      <div class="segment" id="table-views" hidden></div>
      <span class="spacer"></span>
      <button type="button" class="btn btn-ghost btn-sm" id="table-csv">Download CSV</button>
      <button type="button" class="btn btn-ghost btn-sm" id="table-print">Print</button>
    </div>
    <div class="table-wrap"><table class="data" id="table" aria-label="${esc(c.title)} detailed schedule"></table></div>
  </div>

  <article class="calc-article prose">
    <nav aria-label="On this page" class="small" style="margin-bottom:2rem"><strong>On this page:</strong> ${jump.map(([h, t]) => `<a href="${h}">${t}</a>`).join(" · ")}</nav>
    <section id="how-to"><h2>How to use this calculator</h2>${c.sections.howToHtml}</section>
    <section id="understanding">${c.sections.explanationHtml}</section>
    <section id="formula"><h2>Formula and methodology</h2>${c.sections.formulaHtml}</section>
    <section id="example"><h2>Worked example</h2>${c.sections.exampleHtml}</section>
    <section id="factors"><h2>What changes the result</h2>${c.sections.factorsHtml}</section>
    <section id="limitations"><h2>Assumptions and limitations</h2>${c.sections.limitationsHtml}</section>
    <section id="faq" class="faq"><h2>Frequently asked questions</h2>
      ${c.faq.map((f) => `<details><summary>${esc(f.q)}</summary><div class="faq-a">${f.aHtml}</div></details>`).join("")}
    </section>
  </article>

  <section id="related" class="section">
    <div class="section-head"><h2>Related calculators</h2><a class="more" href="${cat.path}">All ${cat.title.toLowerCase()} ${I.arrow}</a></div>
    <div class="related-grid">${related.map((r) => toolCard(r)).join("")}</div>
  </section>
</div>`;
  return base({
    path: `/${c.slug}/`,
    title: c.metaTitle,
    description: c.metaDescription,
    jsonld: [ldBreadcrumbs(crumbs), ldOrg(), ldWebApp(c), ldFaq(c.faq)],
    suggestCurrency: c.suggestCurrency,
    scripts: ["/assets/js/finance.js", "/assets/js/charts.js", "/assets/js/engine.js", `/assets/js/calc/${c.slug}.js`],
    content,
    v,
  });
}

/* ---------- category page ---------- */
export function categoryPage(cat, calcs, guides, v) {
  const crumbs = [{ name: "Home", path: "/" }, { name: cat.title, path: cat.path }];
  const inCat = calcs.filter((c) => c.category === cat.id);
  const featured = inCat.filter((c) => c.featured).slice(0, 3);
  const relCats = (cat.relatedCategories || []).map((id) => categories.find((c) => c.id === id)).filter(Boolean);
  const relGuides = guides.filter((g) => g.categories?.includes(cat.id)).slice(0, 3);
  const content = `
<div class="wrap">
  ${breadcrumbs(crumbs)}
  <div class="page-head">
    <p class="kicker">${inCat.length} calculators</p>
    <h1>${esc(cat.title)}</h1>
    <p class="lede">${esc(cat.tagline)}</p>
  </div>
  <div class="prose cat-intro">${cat.introHtml}</div>

  ${featured.length ? `<section class="section"><div class="section-head"><h2>Start here</h2></div>
    <div class="grid grid-3">${featured.map((c) => toolCard(c)).join("")}</div></section>` : ""}

  <section class="section"><div class="section-head"><h2>All ${esc(cat.title.toLowerCase())}</h2></div>
    <div class="grid grid-3">${inCat.map((c) => toolCard(c)).join("")}</div></section>

  <section class="section prose">${cat.eduHtml}</section>

  ${relGuides.length ? `<section class="section"><div class="section-head"><h2>Related guides</h2><a class="more" href="/guides/">All guides ${I.arrow}</a></div>
    <div class="grid grid-3">${relGuides.map((g) => `<a class="guide-card" href="/guides/${g.slug}/"><span class="k">Guide</span><span class="t">${esc(g.title)}</span><span class="d">${esc(g.cardDescription)}</span></a>`).join("")}</div></section>` : ""}

  <section class="section"><div class="section-head"><h2>Related categories</h2></div>
    <div class="grid grid-2">${relCats.map((rc) => `<a class="cat-card" href="${rc.path}"><span class="ic">${icon(rc.icon)}</span><span class="t">${esc(rc.title)}</span><span class="d">${esc(rc.tagline)}</span></a>`).join("")}</div></section>
</div>`;
  return base({
    path: cat.path,
    title: cat.metaTitle,
    description: cat.metaDescription,
    jsonld: [ldBreadcrumbs(crumbs), ldOrg()],
    content,
    v,
  });
}

/* ---------- home ---------- */
export function homePage(calcs, guides, v) {
  const pop = popular.map((s) => calcs.find((c) => c.slug === s)).filter(Boolean);
  const comparisons = featuredComparisons.map((s) => calcs.find((c) => c.slug === s)).filter(Boolean);
  const guideTeaser = guides.slice(0, 4);
  const content = `
<div class="wrap">
  <section class="hero">
    <h1>${esc(site.tagline)}</h1>
    <p class="sub">Free calculators for loans, mortgages, investing, savings and debt — with documented formulas, worked examples, interactive charts, and downloadable tables or schedules where they add value.</p>
    <div class="hero-search">
      <span class="s-icon">${I.search}</span>
      <input type="search" placeholder="Try “mortgage payment”, “EMI”, “pay off debt”…" aria-label="Search calculators" data-search-input aria-controls="hero-results" role="combobox" aria-expanded="false" autocomplete="off">
      <div class="search-results" id="hero-results" hidden></div>
    </div>
    <div class="hero-chips">
      ${pop.slice(0, 6).map((c) => `<a href="/${c.slug}/">${esc(c.title.replace(/ Calculator$/, ""))}</a>`).join("")}
    </div>
  </section>

  <section class="section" id="recent-tools" hidden>
    <div class="section-head"><h2>Pick up where you left off</h2></div>
    <div class="grid grid-4"></div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Most used calculators</h2><a class="more" href="/calculators/">All calculators ${I.arrow}</a></div>
    <div class="grid grid-4">${pop.map((c) => toolCard(c, true)).join("")}</div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Browse by category</h2></div>
    <div class="grid grid-3">
      ${categories.map((cat) => `<a class="cat-card" href="${cat.path}"><span class="ic">${icon(cat.icon)}</span><span class="t">${esc(cat.title)}</span><span class="d">${esc(cat.tagline)}</span><span class="n">${calcs.filter((c) => c.category === cat.id).length} calculators →</span></a>`).join("")}
    </div>
  </section>

  <section class="section">
    <div class="section-head"><h2>What are you trying to do?</h2></div>
    <div class="grid grid-4">
      ${tasks.map((t) => `<a class="task-card" href="${t.href}"><span class="ic" style="color:var(--brand-ink);display:inline-flex;width:22px">${icon(t.icon)}</span>${esc(t.label)}<span class="ar">${I.arrow}</span></a>`).join("")}
    </div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Decision &amp; comparison tools</h2></div>
    <p class="muted" style="margin-top:-.6rem;max-width:60ch">The most useful answers are comparisons: this loan or that one, extra payments or not, rent or buy. These tools put both options side by side.</p>
    <div class="grid grid-4">${comparisons.map((c) => toolCard(c, true)).join("")}</div>
  </section>

  <div class="trust-band">
    <div>
      <p class="kicker">Trust &amp; methodology</p>
      <h2>Numbers you can check</h2>
      <p class="muted">A calculator is only useful if you can trust it — so nothing here is a black box. Every calculator documents exactly how it works, and the full methodology is public.</p>
      <a class="btn btn-primary" href="/methodology/">How our calculations work</a>
    </div>
    <ul class="trust-list">
      <li><span class="ck">${I.check}</span>Every formula shown on the page, with variables explained</li>
      <li><span class="ck">${I.check}</span>Automated tests verify results against known reference values</li>
      <li><span class="ck">${I.check}</span>Assumptions and limitations stated on every calculator</li>
      <li><span class="ck">${I.check}</span>Estimates for education — never personalized financial advice</li>
      <li><span class="ck">${I.check}</span>Runs in your browser: normal calculator inputs are not submitted</li>
    </ul>
  </div>

  <section class="section">
    <div class="section-head"><h2>Finance, explained properly</h2><a class="more" href="/guides/">All guides ${I.arrow}</a></div>
    <div class="grid grid-4">${guideTeaser.map((g) => `<a class="guide-card" href="/guides/${g.slug}/"><span class="k">Guide</span><span class="t">${esc(g.title)}</span><span class="d">${esc(g.cardDescription)}</span></a>`).join("")}</div>
  </section>

  <section class="section prose">
    <h2 class="mt-0">About Finance Calculator X</h2>
    <p>Finance Calculator X is an independent collection of financial calculators for the decisions most people actually face: borrowing, buying a home, saving, investing and paying off debt. Each calculator is built as a complete decision-support tool — a large, clear answer, the supporting numbers behind it, an interactive chart, a downloadable table or schedule where relevant, and a plain-English explanation of the mathematics involved. Calculations run instantly in your browser and are <a href="/methodology/">documented and tested</a>. The site is free to use and no account is ever required. <a href="/about/">More about the project →</a></p>
  </section>
</div>`;
  return base({
    path: "/",
    title: `Free Financial Calculators | ${site.name}`,
    rawTitle: true,
    description: site.description,
    jsonld: [ldOrg(), ldWebsite()],
    content,
    v,
  });
}

/* ---------- calculators index ---------- */
export function calculatorsIndex(calcs, v) {
  const crumbs = [{ name: "Home", path: "/" }, { name: "All calculators", path: "/calculators/" }];
  const content = `
<div class="wrap">
  ${breadcrumbs(crumbs)}
  <div class="page-head">
    <h1>All calculators</h1>
    <p class="lede">${calcs.length} financial calculators, organized by category. Use search to jump straight to a tool.</p>
  </div>
  <div class="hero-search" id="search" style="margin:0 0 2.5rem">
    <span class="s-icon">${I.search}</span>
    <input type="search" placeholder="Search by name or goal — “home loan”, “pay debt faster”…" aria-label="Search calculators" data-search-input aria-controls="dir-results" autocomplete="off">
    <div class="search-results" id="dir-results" hidden></div>
  </div>
  ${categories.map((cat) => {
    const inCat = calcs.filter((c) => c.category === cat.id);
    return `<section class="section" style="margin-top:2.6rem">
      <div class="section-head"><h2>${esc(cat.title)}</h2><a class="more" href="${cat.path}">Category page ${I.arrow}</a></div>
      <div class="grid grid-3">${inCat.map((c) => toolCard(c)).join("")}</div>
    </section>`;
  }).join("")}
</div>
<script>addEventListener("DOMContentLoaded",function(){var q=new URLSearchParams(location.search).get("q");var i=document.querySelector("[data-search-input]");if(q&&i){i.value=q;i.dispatchEvent(new Event("input"));i.focus()}});</script>`;
  return base({
    path: "/calculators/",
    title: "All Financial Calculators — Loans, Mortgages, Investing, Savings",
    description: `Directory of all ${calcs.length} Finance Calculator X tools: loan, EMI, mortgage, affordability, compound interest, SIP, savings, budgeting and debt payoff calculators.`,
    jsonld: [ldBreadcrumbs(crumbs), ldOrg()],
    content,
    v,
  });
}

/* ---------- guides ---------- */
export function guidePage(g, all, calcs, v) {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }, { name: g.title, path: `/guides/${g.slug}/` }];
  const related = (g.relatedCalculators || []).map((s) => calcs.find((c) => c.slug === s)).filter(Boolean);
  const more = all.filter((x) => x.slug !== g.slug).slice(0, 3);
  const content = `
<div class="wrap">
  ${breadcrumbs(crumbs)}
  <article class="prose" style="margin:0 auto">
    <div class="page-head">
      <p class="kicker">Guide</p>
      <h1>${esc(g.title)}</h1>
      <p class="lede">${esc(g.description)}</p>
      <div class="review-line">
        <span>By <a href="/authors/avinash-verma/">Avinash Verma</a> · <a href="/editorial-policy/">editorial standards</a></span>
        <span>Last reviewed: <time datetime="${g.lastReviewed}">${new Date(g.lastReviewed + "T00:00:00Z").toLocaleDateString("en", { year: "numeric", month: "long", timeZone: "UTC" })}</time></span>
      </div>
    </div>
    ${g.bodyHtml}
  </article>
  ${related.length ? `<section class="section"><div class="section-head"><h2>Try it with a calculator</h2></div>
  <div class="related-grid">${related.map((r) => toolCard(r, true)).join("")}</div></section>` : ""}
  ${more.length ? `<section class="section"><div class="section-head"><h2>More guides</h2><a class="more" href="/guides/">All guides ${I.arrow}</a></div>
  <div class="grid grid-3">${more.map((m) => `<a class="guide-card" href="/guides/${m.slug}/"><span class="k">Guide</span><span class="t">${esc(m.title)}</span><span class="d">${esc(m.cardDescription)}</span></a>`).join("")}</div></section>` : ""}
</div>`;
  return base({
    path: `/guides/${g.slug}/`,
    title: g.metaTitle,
    description: g.metaDescription,
    ogType: "article",
    jsonld: [
      ldBreadcrumbs(crumbs),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.title,
        description: g.metaDescription,
        datePublished: g.published || g.lastReviewed,
        dateModified: g.lastReviewed,
        author: { "@type": "Person", name: "Avinash Verma", url: site.origin + "/authors/avinash-verma/" },
        publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: site.origin + "/assets/img/apple-touch-icon.png" } },
        mainEntityOfPage: site.origin + `/guides/${g.slug}/`,
      },
    ],
    content,
    v,
  });
}

export function guidesIndex(guides, v) {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }];
  const content = `
<div class="wrap">
  ${breadcrumbs(crumbs)}
  <div class="page-head">
    <h1>Finance guides</h1>
    <p class="lede">Short, precise explanations of the concepts behind the calculators — how interest really works, what the formulas assume, and how to compare your options.</p>
  </div>
  <div class="prose" style="margin-bottom:2rem">
    <p>Every guide here exists to answer a question the calculators raise. If a tool told you that extra payments save $58,000, the matching guide explains the mechanics behind that number; if two loan offers look similar, the comparison guide shows which four figures actually decide it. Each article states its assumptions, works through at least one example with real arithmetic, and links to the calculator where you can test the idea with your own numbers. Start with the guide closest to the decision in front of you — they are written to stand alone.</p>
  </div>
  <div class="grid grid-3">
    ${guides.map((g) => `<a class="guide-card" href="/guides/${g.slug}/"><span class="k">Guide</span><span class="t">${esc(g.title)}</span><span class="d">${esc(g.cardDescription)}</span></a>`).join("")}
  </div>
</div>`;
  return base({
    path: "/guides/",
    title: "Finance Guides — Interest, Loans, Investing & Debt Explained",
    description: "Educational guides behind the calculators: how loan interest and amortization work, APR vs interest rate, compound interest, debt strategies, inflation and more.",
    jsonld: [ldBreadcrumbs(crumbs), ldOrg()],
    content,
    v,
  });
}

/* ---------- static pages ---------- */
export function staticPage(p, v) {
  const crumbs = [{ name: "Home", path: "/" }, { name: p.title, path: `/${p.slug}/` }];
  const content = `
<div class="wrap">
  ${breadcrumbs(crumbs)}
  <article class="prose" style="margin:0 auto 2rem">
    <div class="page-head">
      <h1>${esc(p.title)}</h1>
      ${p.lede ? `<p class="lede">${esc(p.lede)}</p>` : ""}
      ${p.lastUpdated ? `<div class="review-line"><span>Last updated: <time datetime="${p.lastUpdated}">${new Date(p.lastUpdated + "T00:00:00Z").toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></span></div>` : ""}
    </div>
    ${p.bodyHtml}
  </article>
</div>`;
  return base({
    path: `/${p.slug}/`,
    title: p.metaTitle || p.title,
    description: p.metaDescription,
    jsonld: [ldBreadcrumbs(crumbs), ldOrg(), ...(p.extraJsonld || [])],
    content,
    v,
  });
}

/* ---------- 404 ---------- */
export function notFound(calcs, v) {
  const pop = popular.slice(0, 4).map((s) => calcs.find((c) => c.slug === s)).filter(Boolean);
  const content = `
<div class="wrap">
  <section class="hero">
    <h1>Page not found</h1>
    <p class="sub">The page you're looking for doesn't exist or has moved. Try searching for a calculator instead.</p>
    <div class="hero-search">
      <span class="s-icon">${I.search}</span>
      <input type="search" placeholder="Search calculators…" aria-label="Search calculators" data-search-input aria-controls="nf-results" autocomplete="off">
      <div class="search-results" id="nf-results" hidden></div>
    </div>
  </section>
  <section class="section">
    <div class="section-head"><h2>Popular calculators</h2><a class="more" href="/calculators/">All calculators ${I.arrow}</a></div>
    <div class="grid grid-4">${pop.map((c) => toolCard(c, true)).join("")}</div>
  </section>
</div>`;
  return base({
    path: "/404.html",
    title: "Page not found",
    description: "The page you're looking for doesn't exist. Browse all Finance Calculator X calculators.",
    noindex: true,
    jsonld: [],
    content,
    v,
  });
}
