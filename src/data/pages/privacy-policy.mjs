export default {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Finance Calculator X handles calculator inputs, local preferences, optional analytics, hosting logs, shared links and any future advertising.",
  lede: "Calculator inputs stay in your browser during normal use. Optional analytics does not load unless you allow it.",
  lastUpdated: "2026-07-20",
  bodyHtml: `
    <h2>Calculator inputs during normal use</h2>
    <p>Every calculation on Finance Calculator X runs in your web browser. During normal use, the amounts, rates, debt labels, incomes and goals you enter are not submitted to Finance Calculator X, Google Analytics or an advertising service. Saved scenarios stay in this browser unless you deliberately export or share them.</p>

    <h2>Shared calculation links</h2>
    <p>If you choose <em>Copy link</em>, the current inputs are encoded after <code>#calc=</code> in the link. That part is a URL <strong>fragment</strong>: browsers do not include it in HTTP requests, server logs or referrer headers. When someone opens the link, the page captures the shared state in memory and immediately cleans the address bar before optional analytics or future advertising code can load.</p>
    <p>Older links generated before 19 July 2026 may contain inputs in the query string after <code>?</code>. They are still accepted for compatibility and are immediately removed before optional third-party scripts load. Unlike fragments, query strings are part of an HTTP request and may therefore have appeared in Cloudflare request logs. The site no longer generates those legacy links. Treat any calculation link as sensitive if its inputs reveal personal information, and share it only with people you trust.</p>

    <h2>What's stored in your browser (localStorage)</h2>
    <p>To make the site pleasant to use, we keep a small amount of data in your browser's local storage — on your device, readable only by this site, never sent to us:</p>
    <ul>
      <li>Display preferences: theme (light/dark) and currency.</li>
      <li>Recently used calculators, to show shortcuts on the homepage.</li>
      <li>Saved scenarios (A/B comparisons) per calculator, if you use that feature.</li>
      <li>Your analytics choice (allowed or declined), so the site can respect it on later visits.</li>
      <li>For the current browser session only, the two-letter country code used to preselect a display currency (see below).</li>
    </ul>
    <p>You can clear all of it at any time via your browser's site-data settings; the site works fine without it.</p>

    <h2>Hosting, server logs and currency selection</h2>
    <p>The site is served through Cloudflare's content delivery network. As part of delivering and protecting the site, Cloudflare may process technical request data such as IP address, user-agent and requested URL for security, abuse prevention and performance. We do not receive calculator inputs during ordinary calculator use or build visitor profiles from these logs. Cloudflare's practices are described in the <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">Cloudflare Privacy Policy</a>.</p>
    <p>To choose a sensible default display currency, we ask Cloudflare's edge for your approximate <strong>country</strong> (a two-letter code such as US, GB or IN). This resolution happens at the network edge — your IP address is not sent to any third-party geolocation service and is not stored by us. We use only the country code, and only to pick a currency format; you can override it at any time from the currency menu in the header, and your choice then takes precedence.</p>

    <h2>Analytics</h2>
    <p><strong>Google Analytics 4 is optional and does not load unless you select “Allow analytics.”</strong> If you decline or have not yet chosen, the Google tag is not requested and Analytics cookies are not set by this site. You can reopen <em>Privacy choices</em> in the footer and change your choice at any time.</p>
    <p>After opt-in, GA4 helps us understand aggregate page use and navigation. Before sending a page location, the site removes calculator inputs, shared-link state, directory search terms, fragments and unrecognized query parameters. Standard campaign parameters — such as <code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code> or an advertising click identifier — may be retained so a legitimate newsletter, social post or paid campaign is not misclassified as direct traffic. Values are accepted only from a fixed allowlist and are length-limited. Referrer query strings are always removed.</p>
    <p>Custom events contain only coarse interaction labels or counts; they do not contain calculator inputs, saved scenarios, shared-link state or raw search terms. Google may still process information such as an online identifier, device/browser details and approximate location after you consent. Google's handling is described at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
    <p>Withdrawing consent disables future Analytics collection on this browser and removes Google Analytics cookies accessible to the site. It does not retroactively erase data Google already received. You may also use the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">Google Analytics opt-out add-on</a>.</p>

    <h2>Advertising</h2>
    <p><strong>Advertising is not currently enabled in the site's public configuration.</strong> Finance Calculator X may use Google AdSense in the future to fund the site. The build is configured to refuse an AdSense loader unless a real publisher ID and the required consent-management readiness are both supplied.</p>
    <p>If AdSense is enabled, Google and its partners may use cookies or similar identifiers to serve and measure ads, including personalized ads only where a valid consent choice and applicable law permit it.</p>
    <ul>
      <li>Google's use of advertising cookies is described at <a href="https://policies.google.com/technologies/ads" rel="noopener">policies.google.com/technologies/ads</a>.</li>
      <li>You can manage ad personalization at <a href="https://adssettings.google.com" rel="noopener">adssettings.google.com</a>, and learn about opting out of third-party cookies at <a href="https://www.aboutads.info" rel="noopener">aboutads.info</a>.</li>
      <li>Before advertising is enabled for visitors in the EEA, UK or Switzerland, the site operator must configure a Google-certified consent management platform and connect its choices to Google advertising storage.</li>
    </ul>
    <p>Ads are always visually distinct from calculator controls and results, and advertisers have no influence over calculations or content (see the <a href="/editorial-policy/">editorial policy</a>).</p>

    <h2>Email</h2>
    <p>If you <a href="/contact/">email us</a>, we receive your address and message and use them only to respond. We don't add you to lists or share your details.</p>

    <h2>Children</h2>
    <p>The site is a general-audience educational tool and does not knowingly collect personal information from anyone, including children.</p>

    <h2>Changes</h2>
    <p>If these practices change — including if advertising is enabled — this page will be updated and the date above revised no later than when the change takes effect.</p>

    <h2>Contact</h2>
    <p>Privacy questions: <a href="mailto:contact@financecalculatorx.com">contact@financecalculatorx.com</a>.</p>
  `,
};
