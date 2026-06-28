import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/hyeonyoung/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const width = 1408;
const height = 1008;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="17"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
    <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="4" seed="23"/><feColorMatrix type="matrix" values="0.18 0 0 0 0.83 0 0.16 0 0 0.78 0 0 0.13 0 0.68 0 0 0 .18 0"/></filter>
    <linearGradient id="panelShade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f5ecd9" stop-opacity=".96"/><stop offset="1" stop-color="#e8dcc4" stop-opacity=".98"/></linearGradient>
  </defs>
  <rect x="17" y="17" width="${width - 34}" height="${height - 34}" rx="46" fill="none" stroke="#16100b" stroke-width="34"/>
  <rect x="42" y="42" width="${width - 84}" height="${height - 84}" rx="28" fill="none" stroke="#f7efdf" stroke-width="14" opacity=".92" filter="url(#rough)"/>
  <rect x="56" y="56" width="${width - 112}" height="${height - 112}" rx="22" fill="none" stroke="#17110c" stroke-width="5" opacity=".85" filter="url(#rough)"/>
  <path d="M72 70 h44 m-44 0 v44 m30 -44 v30 m-30 0 h30" fill="none" stroke="#9b6d32" stroke-width="3" opacity=".72"/>
  <path d="M${width - 72} 70 h-44 m44 0 v44 m-30 -44 v30 m30 0 h-30" fill="none" stroke="#9b6d32" stroke-width="3" opacity=".72"/>
  <path d="M72 ${height - 70} h44 m-44 0 v-44 m30 44 v-30 m-30 0 h30" fill="none" stroke="#9b6d32" stroke-width="3" opacity=".72"/>
  <path d="M${width - 72} ${height - 70} h-44 m44 0 v-44 m-30 44 v-30 m30 0 h-30" fill="none" stroke="#9b6d32" stroke-width="3" opacity=".72"/>
  <path d="M56 618 C260 606 430 616 650 611 C900 606 1112 610 1308 598 L1320 600 L1320 916 L88 916 C80 852 74 766 68 648 Z" fill="url(#panelShade)" opacity=".99"/>
  <path d="M74 622 C318 612 552 620 784 612 C1004 604 1146 612 1310 598" fill="none" stroke="#17110c" stroke-width="7" opacity=".72" filter="url(#rough)"/>
  <path d="M86 914 C280 905 526 918 760 909 C964 901 1108 910 1308 900" fill="none" stroke="#17110c" stroke-width="4" opacity=".55" filter="url(#rough)"/>
  <rect x="86" y="640" width="1236" height="250" fill="url(#paper)" opacity=".58"/>
  <path d="M180 735 H760 M180 798 H760" stroke="#6d5c46" stroke-width="2" opacity=".28"/>
  <path d="M960 840 H1202" stroke="#17110c" stroke-width="4" opacity=".78"/>
  <path d="M56 596 C102 618 178 625 254 622" stroke="#17110c" stroke-width="18" stroke-linecap="round" opacity=".95" filter="url(#rough)"/>
  <path d="M1110 604 C1188 596 1264 596 1328 578" stroke="#17110c" stroke-width="14" stroke-linecap="round" opacity=".75" filter="url(#rough)"/>
</svg>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
await page.screenshot({
  path: "public/card-assets/common/goe-grand-general-frame-v1.png",
  omitBackground: true,
});
await browser.close();
