export default {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Finance Calculator X handles data: calculations run in your browser, preferences stay in local storage, and advertising cookies are disclosed clearly.",
  lede: "The short version: your financial inputs never leave your device, and we collect as little as possible.",
  lastUpdated: "2026-07-12",
  bodyHtml: `
    <h2>Your calculator inputs stay on your device</h2>
    <p>Every calculation on Finance Calculator X runs entirely in your web browser. The amounts, rates, debts, incomes and goals you type are <strong>never transmitted to our servers</strong>, stored by us, or shared with anyone. If you use the <em>Copy link</em> feature, your inputs are encoded into the link itself so that whoever you send it to can reproduce the calculation — sharing such a link is your choice and under your control.</p>

    <h2>What's stored in your browser (localStorage)</h2>
    <p>To make the site pleasant to use, we keep a small amount of data in your browser's local storage — on your device, readable only by this site, never sent to us:</p>
    <ul>
      <li>Display preferences: theme (light/dark) and currency.</li>
      <li>Recently used calculators, to show shortcuts on the homepage.</li>
      <li>Saved scenarios (A/B comparisons) per calculator, if you use that feature.</li>
      <li>For the current browser session only, the two-letter country code used to preselect a display currency (see below).</li>
    </ul>
    <p>You can clear all of it at any time via your browser's site-data settings; the site works fine without it.</p>

    <h2>Hosting, server logs and currency selection</h2>
    <p>The site is served through Cloudflare's content delivery network. Like virtually all web infrastructure, Cloudflare may process technical request data (such as IP address, user-agent and requested URL) transiently for security, abuse prevention and performance. We do not use this data to identify visitors. Cloudflare's practices are described in the <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">Cloudflare Privacy Policy</a>.</p>
    <p>To choose a sensible default display currency, we ask Cloudflare's edge for your approximate <strong>country</strong> (a two-letter code such as US, GB or IN). This resolution happens at the network edge — your IP address is not sent to any third-party geolocation service and is not stored by us. We use only the country code, and only to pick a currency format; you can override it at any time from the currency menu in the header, and your choice then takes precedence.</p>

    <h2>Analytics</h2>
    <p>We use two analytics tools to understand aggregate traffic and improve the calculators:</p>
    <ul>
      <li><strong>Cloudflare Web Analytics</strong> — privacy-first and <strong>cookieless</strong>: it sets no cookies, does not fingerprint visitors, and does not track people across sites. Described in the <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">Cloudflare Privacy Policy</a>.</li>
      <li><strong>Google Analytics 4</strong> — helps us see which calculators and guides are used, from which sources and countries, and how people move through the site. GA4 <strong>uses cookies</strong> and processes data on Google's infrastructure; we enable IP anonymization and do not send personally identifiable information or your calculator inputs to it. Google's handling is described at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>. You can opt out with the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">Google Analytics opt-out add-on</a>.</li>
    </ul>
    <p>Where consent is required (for example in the EEA and UK), analytics and advertising cookies are governed by the consent choice you make in our cookie prompt. We never send the financial figures you type into calculators to any analytics or advertising service.</p>

    <h2>Advertising</h2>
    <p>To keep the site free, we may display advertising served by <strong>Google AdSense</strong>. When ads are shown, Google and its partners may use cookies or similar identifiers to serve and measure ads, including — where you've consented or as applicable law allows — personalized ads based on your visits to this and other websites.</p>
    <ul>
      <li>Google's use of advertising cookies is described at <a href="https://policies.google.com/technologies/ads" rel="noopener">policies.google.com/technologies/ads</a>.</li>
      <li>You can manage ad personalization at <a href="https://adssettings.google.com" rel="noopener">adssettings.google.com</a>, and learn about opting out of third-party cookies at <a href="https://www.aboutads.info" rel="noopener">aboutads.info</a>.</li>
      <li>Where required (for example in the EEA/UK), a consent prompt will ask for your choices before any advertising cookies are set.</li>
    </ul>
    <p>Ads are always visually distinct from calculator controls and results, and advertisers have no influence over calculations or content (see the <a href="/editorial-policy/">editorial policy</a>).</p>

    <h2>Email</h2>
    <p>If you <a href="/contact/">email us</a>, we receive your address and message and use them only to respond. We don't add you to lists or share your details.</p>

    <h2>Children</h2>
    <p>The site is a general-audience educational tool and does not knowingly collect personal information from anyone, including children.</p>

    <h2>Changes</h2>
    <p>If our practices change — for example, when advertising or analytics are introduced — this page will be updated and the date above revised before the change takes effect.</p>

    <h2>Contact</h2>
    <p>Privacy questions: <a href="mailto:contact@financecalculatorx.com">contact@financecalculatorx.com</a>.</p>
  `,
};
