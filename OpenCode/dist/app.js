// ─── DATA ───
const MODEL_COLORS = {
  'deepseek-v4-flash': '#3b82f6',
  'deepseek-v4-pro': '#2563eb',
  'deepseek-v4.1-flash': '#60a5fa',
  'deepseek-v4-flash-vision-exp': '#1d4ed8',
  'mimo-v2.5': '#f97316',
  'glm-5.3-flash': '#22c55e',
  'muse-spark-1.2-contributor': '#c084fc',
  'muse-spark-1.3-contributor': '#a855f7',
  'nemotron-3-ultra': '#84cc16',
  'Other': '#94a3b8',
};

const AUTHOR_COLORS = {
  'DeepSeek': '#3b82f6',
  'Meta': '#a855f7',
  'Zhipu': '#22c55e',
  'Xiaomi': '#f97316',
  'NVIDIA': '#84cc16',
  'Tencent': '#ec4899',
  'OpenAI': '#06b6d4',
  'MiniMax': '#f43f5e',
  'Other': '#94a3b8',
};

// Usage data (tokens in trillions)
const usageData = [
  {date:"JUL 25",segments:[{model:"deepseek-v4.1-flash",value:0},{model:"muse-spark-1.3-contributor",value:0},{model:"deepseek-v4-flash",value:1.39},{model:"mimo-v2.5",value:0.12},{model:"glm-5.3-flash",value:0},{model:"muse-spark-1.2-contributor",value:0},{model:"nemotron-3-ultra",value:0},{model:"deepseek-v4-flash-vision-exp",value:0},{model:"deepseek-v4-pro",value:0.45},{model:"Other",value:0.35}]},
  {date:"AUG 1",segments:[{model:"deepseek-v4-flash",value:3.01},{model:"mimo-v2.5",value:0.16},{model:"deepseek-v4-pro",value:0.32},{model:"Other",value:0.34}]},
  {date:"AUG 8",segments:[{model:"deepseek-v4-flash",value:8.18},{model:"mimo-v2.5",value:0.17},{model:"deepseek-v4-pro",value:0.35},{model:"Other",value:0.43}]},
  {date:"AUG 11",segments:[{model:"deepseek-v4-flash",value:13.92},{model:"mimo-v2.5",value:0.45},{model:"nemotron-3-ultra",value:0.07},{model:"deepseek-v4-pro",value:0.55},{model:"Other",value:0.72}]},
  {date:"AUG 14",segments:[{model:"deepseek-v4-flash",value:18.40},{model:"mimo-v2.5",value:0.51},{model:"nemotron-3-ultra",value:0.23},{model:"deepseek-v4-pro",value:1.66},{model:"Other",value:0.92}]},
  {date:"AUG 17",segments:[{model:"deepseek-v4-flash",value:9.42},{model:"mimo-v2.5",value:2.37},{model:"nemotron-3-ultra",value:0.33},{model:"deepseek-v4-pro",value:0.81},{model:"Other",value:1.27}]},
  {date:"AUG 20",segments:[{model:"deepseek-v4-flash",value:6.91},{model:"mimo-v2.5",value:2.07},{model:"glm-5.3-flash",value:0.07},{model:"muse-spark-1.2-contributor",value:1.56},{model:"nemotron-3-ultra",value:0.50},{model:"deepseek-v4-pro",value:0.40},{model:"Other",value:1.02}]},
  {date:"AUG 22",segments:[{model:"deepseek-v4-flash",value:2.24},{model:"mimo-v2.5",value:1.19},{model:"glm-5.3-flash",value:6.63},{model:"muse-spark-1.2-contributor",value:1.17},{model:"nemotron-3-ultra",value:0.52},{model:"deepseek-v4-flash-vision-exp",value:0.27},{model:"deepseek-v4-pro",value:0.23},{model:"Other",value:0.87}]},
  {date:"AUG 25",segments:[{model:"deepseek-v4-flash",value:3.08},{model:"mimo-v2.5",value:2.26},{model:"glm-5.3-flash",value:8.97},{model:"muse-spark-1.2-contributor",value:1.43},{model:"nemotron-3-ultra",value:0.62},{model:"deepseek-v4-flash-vision-exp",value:0.49},{model:"deepseek-v4-pro",value:0.36},{model:"Other",value:1.20}]},
  {date:"AUG 28",segments:[{model:"deepseek-v4-flash",value:4.04},{model:"mimo-v2.5",value:1.32},{model:"glm-5.3-flash",value:0.62},{model:"muse-spark-1.2-contributor",value:2.09},{model:"nemotron-3-ultra",value:0.61},{model:"deepseek-v4-flash-vision-exp",value:0.31},{model:"deepseek-v4-pro",value:0.22},{model:"Other",value:1.19}]},
  {date:"SEP 1",segments:[{model:"deepseek-v4-flash",value:4.15},{model:"mimo-v2.5",value:1.74},{model:"glm-5.3-flash",value:0.70},{model:"muse-spark-1.2-contributor",value:2.27},{model:"nemotron-3-ultra",value:0.37},{model:"deepseek-v4-flash-vision-exp",value:0.35},{model:"deepseek-v4-pro",value:0.21},{model:"Other",value:0.74}]},
  {date:"SEP 4",segments:[{model:"muse-spark-1.3-contributor",value:4.40},{model:"deepseek-v4-flash",value:3.26},{model:"mimo-v2.5",value:1.72},{model:"glm-5.3-flash",value:0.49},{model:"muse-spark-1.2-contributor",value:1.07},{model:"nemotron-3-ultra",value:0.40},{model:"deepseek-v4-flash-vision-exp",value:0.22},{model:"deepseek-v4-pro",value:0.11},{model:"Other",value:0.89}]},
  {date:"SEP 7",segments:[{model:"muse-spark-1.3-contributor",value:4.52},{model:"deepseek-v4-flash",value:3.49},{model:"mimo-v2.5",value:1.40},{model:"glm-5.3-flash",value:0.52},{model:"muse-spark-1.2-contributor",value:0.76},{model:"nemotron-3-ultra",value:0.43},{model:"deepseek-v4-flash-vision-exp",value:0.12},{model:"deepseek-v4-pro",value:0.12},{model:"Other",value:0.92}]},
  {date:"SEP 10",segments:[{model:"deepseek-v4.1-flash",value:3.02},{model:"muse-spark-1.3-contributor",value:5.86},{model:"deepseek-v4-flash",value:3.20},{model:"mimo-v2.5",value:1.66},{model:"glm-5.3-flash",value:0.60},{model:"muse-spark-1.2-contributor",value:0.63},{model:"nemotron-3-ultra",value:0.34},{model:"deepseek-v4-flash-vision-exp",value:0.20},{model:"deepseek-v4-pro",value:0.13},{model:"Other",value:0.70}]},
  {date:"SEP 13",segments:[{model:"deepseek-v4.1-flash",value:5.59},{model:"muse-spark-1.3-contributor",value:4.41},{model:"deepseek-v4-flash",value:2.59},{model:"mimo-v2.5",value:0.98},{model:"glm-5.3-flash",value:0.40},{model:"muse-spark-1.2-contributor",value:0.49},{model:"nemotron-3-ultra",value:0.31},{model:"deepseek-v4-flash-vision-exp",value:0.13},{model:"deepseek-v4-pro",value:0.08},{model:"Other",value:0.37}]},
  {date:"SEP 16",segments:[{model:"deepseek-v4.1-flash",value:8.22},{model:"muse-spark-1.3-contributor",value:5.29},{model:"deepseek-v4-flash",value:2.84},{model:"mimo-v2.5",value:1.29},{model:"glm-5.3-flash",value:0.60},{model:"muse-spark-1.2-contributor",value:0.49},{model:"nemotron-3-ultra",value:0.39},{model:"deepseek-v4-flash-vision-exp",value:0.17},{model:"deepseek-v4-pro",value:0.11},{model:"Other",value:0.69}]},
  {date:"SEP 17",segments:[{model:"deepseek-v4.1-flash",value:8.80},{model:"muse-spark-1.3-contributor",value:5.86},{model:"deepseek-v4-flash",value:2.45},{model:"mimo-v2.5",value:0.97},{model:"glm-5.3-flash",value:0.57},{model:"muse-spark-1.2-contributor",value:0.41},{model:"nemotron-3-ultra",value:0.44},{model:"deepseek-v4-flash-vision-exp",value:0.17},{model:"deepseek-v4-pro",value:0.11},{model:"Other",value:1.00}]},
];

const leaderboard = [
  {model:"deepseek-v4.1-flash",author:"DeepSeek",tokens:42619,change:434,rank:1},
  {model:"muse-spark-1.3-contributor",author:"Meta",tokens:31598,change:-10,rank:2},
  {model:"deepseek-v4-flash",author:"DeepSeek",tokens:16473,change:-26,rank:3},
  {model:"mimo-v2.5",author:"Xiaomi",tokens:6923,change:-28,rank:4},
  {model:"glm-5.3-flash",author:"Zhipu",tokens:3260,change:-3,rank:5},
  {model:"muse-spark-1.2-contributor",author:"Meta",tokens:2891,change:-40,rank:6},
  {model:"nemotron-3-ultra",author:"NVIDIA",tokens:2207,change:-11,rank:7},
  {model:"deepseek-v4-flash-vision-exp",author:"DeepSeek",tokens:907,change:-3,rank:8},
  {model:"deepseek-v4-pro",author:"DeepSeek",tokens:616,change:-16,rank:9},
  {model:"ling-3.0-flash-fin",author:"Unknown",tokens:496,change:20,rank:10},
  {model:"gpt-5.6-luna",author:"OpenAI",tokens:486,change:-14,rank:11},
  {model:"union-alpha",author:"Unknown",tokens:470,change:null,rank:12},
  {model:"nemotron-3.5-lightning",author:"NVIDIA",tokens:411,change:-33,rank:13},
  {model:"qwen3.8-flash",author:"Qwen",tokens:284,change:-44,rank:14},
  {model:"minimax-m3",author:"MiniMax",tokens:252,change:-18,rank:15},
  {model:"omen-alpha",author:"Unknown",tokens:211,change:-87,rank:16},
  {model:"kimi-k2.7-code",author:"Moonshot",tokens:152,change:-7,rank:17},
  {model:"mimo-v2.5-pro",author:"Xiaomi",tokens:127,change:-28,rank:18},
];

const tokenCost = [
  {model:"ling-3.0-flash-fin",total:0.18,input:0.06,output:0.18,cached:0.012},
  {model:"glm-5.3-flash",total:0.25,input:0.075,output:0.25,cached:0.015},
  {model:"deepseek-v4-flash",total:0.6,input:0.15,output:0.6,cached:0.003},
  {model:"deepseek-v4-flash-vision-exp",total:0.6,input:0.15,output:0.6,cached:0.003},
  {model:"deepseek-v4.1-flash",total:1.2,input:0.3,output:1.2,cached:0.006},
  {model:"deepseek-v4-pro",total:1.98,input:0.66,output:1.98,cached:0.022},
  {model:"mimo-v2.5",total:2,input:0.4,output:2,cached:0.08},
];

const cacheRatio = [
  {model:"deepseek-v4-flash-vision-exp",ratio:98.2,cached:886.7,uncached:16.4,total:903},
  {model:"deepseek-v4.1-flash",ratio:97.8,cached:41485,uncached:916.8,total:42401.7},
  {model:"deepseek-v4-pro",ratio:97.3,cached:596,uncached:16.4,total:612.5},
  {model:"deepseek-v4-flash",ratio:94,cached:15334.6,uncached:983.9,total:16318.5},
  {model:"muse-spark-1.3-contributor",ratio:93.5,cached:29389.6,uncached:2039.5,total:31429.1},
  {model:"glm-5.3-flash",ratio:92.7,cached:3012.5,uncached:236.1,total:3248.6},
  {model:"mimo-v2.5",ratio:92.3,cached:6334,uncached:530.2,total:6864.2},
  {model:"muse-spark-1.2-contributor",ratio:91,cached:2553.6,uncached:253.1,total:2806.6},
  {model:"ling-3.0-flash-fin",ratio:87.3,cached:429.7,uncached:62.5,total:492.2},
  {model:"nemotron-3-ultra",ratio:83.1,cached:1830.7,uncached:371.8,total:2202.4},
];

const sessionCost = [
  {model:"muse-spark-1.2-contributor",cost:0.0001,tokens:64989},
  {model:"mimo-v2.5",cost:0.0012,tokens:647586},
  {model:"muse-spark-1.3-contributor",cost:0.0013,tokens:585014},
  {model:"deepseek-v4-flash",cost:0.0105,tokens:2479647},
  {model:"deepseek-v4-flash-vision-exp",cost:0.062,tokens:5884354},
  {model:"deepseek-v4.1-flash",cost:0.0861,tokens:7563758},
  {model:"glm-5.3-flash",cost:0.1301,tokens:3228638},
  {model:"deepseek-v4-pro",cost:0.2002,tokens:3729504},
];

const retention = [
  {model:"muse-spark-1.3-contributor",author:"Meta",rate:87.4,eligible:4547,retained:3973,rank:1},
  {model:"omen-alpha",author:"Unknown",rate:81.7,eligible:1434,retained:1171,rank:2},
  {model:"muse-spark-1.2-contributor",author:"Meta",rate:81.5,eligible:7689,retained:6263,rank:3},
  {model:"longcat-2.0",author:"Unknown",rate:78.1,eligible:242,retained:189,rank:4},
  {model:"mimo-v2.5",author:"Xiaomi",rate:72.9,eligible:25930,retained:18911,rank:5},
  {model:"qwen3.8-flash",author:"Qwen",rate:72.3,eligible:2182,retained:1577,rank:6},
  {model:"hy3",author:"Tencent",rate:71.9,eligible:3238,retained:2329,rank:7},
  {model:"qwen3.5-plus",author:"Qwen",rate:69.8,eligible:285,retained:199,rank:8},
  {model:"deepseek-v4-flash-vision-exp",author:"DeepSeek",rate:69.6,eligible:13609,retained:9477,rank:9},
  {model:"kimi-k2.5",author:"Moonshot",rate:69.5,eligible:763,retained:530,rank:10},
  {model:"glm-5.3-flash",author:"Zhipu",rate:68.8,eligible:40715,retained:28022,rank:11},
  {model:"deepseek-v4-flash",author:"DeepSeek",rate:68.3,eligible:482807,retained:329599,rank:12},
  {model:"minimax-m2.7",author:"MiniMax",rate:67,eligible:3148,retained:2109,rank:13},
  {model:"glm-5",author:"Zhipu",rate:64.6,eligible:807,retained:521,rank:14},
  {model:"mimo-v2.5-pro",author:"Xiaomi",rate:64.4,eligible:7420,retained:4775,rank:15},
];

const geoData = [
  {country:"CN",tokens:123.107,share:18.8,rank:1},
  {country:"US",tokens:83.290,share:12.7,rank:2},
  {country:"IN",tokens:36.717,share:5.6,rank:3},
  {country:"JP",tokens:27.077,share:4.1,rank:4},
  {country:"BR",tokens:27.014,share:4.1,rank:5},
  {country:"DE",tokens:23.848,share:3.6,rank:6},
  {country:"ID",tokens:19.932,share:3.0,rank:7},
  {country:"SG",tokens:19.078,share:2.9,rank:8},
  {country:"HK",tokens:17.688,share:2.7,rank:9},
  {country:"FR",tokens:12.724,share:1.9,rank:10},
  {country:"ES",tokens:12.468,share:1.9,rank:11},
  {country:"VN",tokens:11.810,share:1.8,rank:12},
  {country:"NL",tokens:10.514,share:1.6,rank:13},
  {country:"RU",tokens:10.323,share:1.6,rank:14},
  {country:"GB",tokens:10.315,share:1.6,rank:15},
  {country:"TR",tokens:9.830,share:1.5,rank:16},
  {country:"CA",tokens:9.294,share:1.4,rank:17},
  {country:"KR",tokens:8.107,share:1.2,rank:18},
  {country:"EG",tokens:8.057,share:1.2,rank:19},
  {country:"AR",tokens:7.629,share:1.2,rank:20},
];

const COUNTRY_NAMES = {
  CN:"China",US:"United States",IN:"India",JP:"Japan",BR:"Brazil",DE:"Germany",
  ID:"Indonesia",SG:"Singapore",HK:"Hong Kong",FR:"France",ES:"Spain",VN:"Vietnam",
  NL:"Netherlands",RU:"Russia",GB:"United Kingdom",TR:"Turkey",CA:"Canada",KR:"South Korea",
  EG:"Egypt",AR:"Argentina",TW:"Taiwan",IT:"Italy",CO:"Colombia",PL:"Poland",MX:"Mexico"
};

const marketData = [
  {date:"JUL 25",total:2.31,authors:[{author:"DeepSeek",share:79.5},{author:"Xiaomi",share:6.6},{author:"Other",share:13.9}]},
  {date:"AUG 1",total:3.84,authors:[{author:"DeepSeek",share:86.9},{author:"Xiaomi",share:4.9},{author:"OpenAI",share:2.5},{author:"Other",share:5.7}]},
  {date:"AUG 8",total:9.12,authors:[{author:"DeepSeek",share:93.5},{author:"Xiaomi",share:2.1},{author:"OpenAI",share:1.9},{author:"Other",share:2.5}]},
  {date:"AUG 14",total:21.71,authors:[{author:"DeepSeek",share:92.4},{author:"Xiaomi",share:2.6},{author:"NVIDIA",share:1.5},{author:"Other",share:3.5}]},
  {date:"AUG 20",total:12.53,authors:[{author:"DeepSeek",share:58.4},{author:"Meta",share:12.6},{author:"Xiaomi",share:16.9},{author:"Other",share:12.1}]},
  {date:"AUG 25",total:18.41,authors:[{author:"DeepSeek",share:21.3},{author:"Meta",share:7.8},{author:"Zhipu",share:49.4},{author:"Xiaomi",share:12.5},{author:"Other",share:9.0}]},
  {date:"SEP 1",total:10.52,authors:[{author:"DeepSeek",share:44.8},{author:"Meta",share:21.5},{author:"Zhipu",share:7.3},{author:"Xiaomi",share:16.8},{author:"Other",share:9.6}]},
  {date:"SEP 7",total:12.28,authors:[{author:"DeepSeek",share:30.4},{author:"Meta",share:43.0},{author:"Zhipu",share:4.6},{author:"Xiaomi",share:11.6},{author:"Other",share:10.4}]},
  {date:"SEP 10",total:16.34,authors:[{author:"DeepSeek",share:40.1},{author:"Meta",share:39.7},{author:"Zhipu",share:3.9},{author:"Xiaomi",share:10.3},{author:"Other",share:6.0}]},
  {date:"SEP 14",total:18.03,authors:[{author:"DeepSeek",share:53.7},{author:"Meta",share:30.7},{author:"Zhipu",share:3.7},{author:"Xiaomi",share:7.6},{author:"Other",share:4.3}]},
  {date:"SEP 17",total:20.78,authors:[{author:"DeepSeek",share:55.9},{author:"Meta",share:30.2},{author:"Zhipu",share:2.9},{author:"Xiaomi",share:4.8},{author:"Other",share:6.2}]},
];

// ─── RENDER TOP MODELS CHART ───
function renderTopModelsChart() {
  const axis = document.getElementById('chart-axis');
  const bars = document.getElementById('chart-bars');
  if (!axis || !bars) return;

  const maxTotal = Math.max(...usageData.map(d => d.segments.reduce((s, seg) => s + seg.value, 0)));

  axis.innerHTML = '';
  bars.innerHTML = '';

  usageData.forEach((day, i) => {
    const total = day.segments.reduce((s, seg) => s + seg.value, 0);
    const showLabel = i % 3 === 0 || i === usageData.length - 1;

    // Axis label
    const axisDiv = document.createElement('div');
    if (!showLabel) axisDiv.setAttribute('data-label-hidden', 'true');
    axisDiv.innerHTML = `<span data-slot="axis-label"><span data-slot="axis-date"><span data-slot="axis-date-mobile">${day.date}</span></span></span>`;
    axis.appendChild(axisDiv);

    // Bar
    const barDiv = document.createElement('div');
    barDiv.setAttribute('data-slot', 'top-models-bar');
    barDiv.setAttribute('tabindex', '0');
    barDiv.setAttribute('role', 'button');

    const heightPct = (total / maxTotal * 100).toFixed(1);
    const stack = document.createElement('div');
    stack.setAttribute('data-slot', 'top-models-stack');
    stack.style.setProperty('--top-models-bar-height', heightPct + '%');

    // Build segments bottom-up
    const segs = day.segments.filter(s => s.value > 0);
    segs.forEach(seg => {
      const pct = (seg.value / total * 100).toFixed(1);
      const i = document.createElement('i');
      i.style.flexGrow = pct;
      i.style.background = MODEL_COLORS[seg.model] || '#94a3b8';
      i.title = `${seg.model}: ${seg.value.toFixed(2)}T`;
      stack.appendChild(i);
    });

    barDiv.appendChild(stack);
    bars.appendChild(barDiv);
  });
}

// ─── RENDER LEADERBOARD ───
function renderLeaderboard() {
  const grid = document.getElementById('leaderboard-grid');
  if (!grid) return;

  const featured = leaderboard.slice(0, 3);
  const compact = leaderboard.slice(3);

  let html = '<div data-slot="leaderboard-featured">';
  featured.forEach(item => {
    const deltaStr = item.change !== null
      ? `<span data-slot="delta" ${item.change < 0 ? 'data-negative="true"' : ''}>${item.change > 0 ? '+' : ''}${item.change}%</span>`
      : '';
    html += `
      <div data-component="leader-card" data-size="featured">
        <span data-slot="rank">#${item.rank}</span>
        <div data-slot="leader-body">
          <span data-slot="leader-avatar">${item.author.charAt(0)}</span>
          <div data-slot="leader-copy">
            <strong>${item.model}</strong>
            <div>
              <span>${formatTokens(item.tokens)}</span>
              ${deltaStr}
            </div>
          </div>
        </div>
      </div>`;
  });
  html += '</div><div data-slot="leaderboard-pattern"></div><div data-slot="leaderboard-compact">';

  compact.forEach(item => {
    const deltaStr = item.change !== null
      ? `<span data-slot="delta" ${item.change < 0 ? 'data-negative="true"' : ''}>${item.change > 0 ? '+' : ''}${item.change}%</span>`
      : '<span data-slot="delta">NEW</span>';
    html += `
      <div data-component="leader-card" data-size="compact">
        <div data-slot="leader-body">
          <span data-slot="leader-avatar">${item.rank}</span>
          <div data-slot="leader-copy">
            <strong>${item.model}</strong>
            <div>
              <span>${formatTokens(item.tokens)}</span>
              ${deltaStr}
            </div>
          </div>
        </div>
      </div>`;
  });
  html += '</div>';
  grid.innerHTML = html;
}

// ─── RENDER SESSION COST ───
function renderSessionCost() {
  const table = document.getElementById('session-cost-table');
  if (!table) return;

  let html = '<div class="table-head"><span></span><span>Model</span><span style="text-align:right">Cost</span><span style="text-align:right">Tokens</span></div>';
  sessionCost.forEach((item, i) => {
    html += `<div class="table-row">
      <span class="rank">${i + 1}</span>
      <span class="name">${item.model}</span>
      <span class="value">$${item.cost.toFixed(4)}</span>
      <span class="secondary">${formatNumber(item.tokens)}</span>
    </div>`;
  });
  table.innerHTML = html;
}

// ─── RENDER TOKEN COST ───
function renderTokenCost() {
  const table = document.getElementById('token-cost-table');
  if (!table) return;

  let html = '<div class="table-head"><span>Model</span><span style="text-align:right">Output</span><span style="text-align:right">Input</span><span style="text-align:right">Cached</span><span style="text-align:right">Total</span></div>';
  tokenCost.forEach(item => {
    html += `<div class="table-row">
      <span class="name">${item.model}</span>
      <span class="value">$${item.output}</span>
      <span class="secondary">$${item.input}</span>
      <span class="secondary">$${item.cached}</span>
      <span class="value">$${item.total}</span>
    </div>`;
  });
  table.innerHTML = html;
}

// ─── RENDER CACHE RATIO ───
function renderCacheRatio() {
  const table = document.getElementById('cache-ratio-table');
  if (!table) return;

  let html = '<div class="table-head"><span>Model</span><span style="text-align:right">Ratio</span><span style="text-align:right">Cached</span><span style="text-align:right">Uncached</span><span style="text-align:right">Total</span></div>';
  cacheRatio.forEach(item => {
    html += `<div class="table-row">
      <span class="name">${item.model}</span>
      <span class="value">${item.ratio}%</span>
      <span class="secondary">${formatNumber(item.cached)}B</span>
      <span class="secondary">${formatNumber(item.uncached)}B</span>
      <span class="secondary">${formatNumber(item.total)}B</span>
    </div>`;
  });
  table.innerHTML = html;
}

// ─── RENDER MARKET SHARE ───
function renderMarketShare() {
  const container = document.getElementById('market-share-chart');
  if (!container) return;

  const labels = document.createElement('div');
  labels.className = 'market-labels';
  const barsWrap = document.createElement('div');
  barsWrap.className = 'market-bars';

  marketData.forEach((day, i) => {
    // Label
    const labelDiv = document.createElement('div');
    labelDiv.innerHTML = `<span class="market-label-inner">${day.date}</span>`;
    labels.appendChild(labelDiv);

    // Bar
    const barDiv = document.createElement('div');
    barDiv.title = `${day.date}: ${day.total.toFixed(1)}T`;
    day.authors.forEach(a => {
      const span = document.createElement('span');
      span.style.flexGrow = a.share;
      span.style.background = AUTHOR_COLORS[a.author] || '#94a3b8';
      span.title = `${a.author}: ${a.share}%`;
      barDiv.appendChild(span);
    });
    barsWrap.appendChild(barDiv);
  });

  container.innerHTML = '';
  container.appendChild(labels);
  container.appendChild(barsWrap);
}

// ─── RENDER RETENTION ───
function renderRetention() {
  const container = document.getElementById('retention-chart');
  if (!container) return;

  let html = `<div class="retention-heading">
    <span></span><strong>Model</strong><em class="retention-marker-col">Retention</em><b>Rate</b><i>Eligible</i>
  </div><ol class="retention-list">`;

  retention.forEach(item => {
    html += `<li><div class="retention-row">
      <span class="rank">${item.rank}</span>
      <strong class="model-name">${item.model}</strong>
      <div class="retention-marker retention-marker-col">
        <span></span><span></span><span></span><span></span>
        <em style="left:${item.rate}%"></em>
      </div>
      <span class="rate">${item.rate}%</span>
      <em class="eligible">${formatNumber(item.eligible)}</em>
    </div></li>`;
  });
  html += '</ol>';
  container.innerHTML = html;
}

// ─── RENDER GEO BREAKDOWN ───
function renderGeo() {
  const table = document.getElementById('geo-table');
  if (!table) return;

  let html = '<div class="table-head"><span></span><span>Country</span><span style="text-align:right">Tokens</span><span style="text-align:right">Share</span></div>';
  geoData.forEach(item => {
    html += `<div class="table-row">
      <span class="rank">${item.rank}</span>
      <span class="name">${getFlag(item.country)} ${COUNTRY_NAMES[item.country] || item.country}</span>
      <span class="value">${item.tokens.toFixed(1)}B</span>
      <span class="secondary">${item.share}%</span>
    </div>`;
  });
  table.innerHTML = html;
}

// ─── UTILITIES ───
function formatTokens(t) {
  if (t >= 1000) return (t / 1000).toFixed(1) + 'K';
  return t.toString();
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toFixed ? n.toFixed(1) : n.toString();
}

function getFlag(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
}

// ─── THEME ───
function setTheme(theme) {
  const main = document.querySelector('[data-page="stats"]');
  if (!main) return;
  main.dataset.theme = theme;
  document.querySelectorAll('[data-slot="theme-option"]').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.getAttribute('aria-label').toLowerCase().includes(theme) ? 'true' : 'false');
  });
}

// ─── MOBILE MENU ───
function toggleMobileMenu() {
  const main = document.querySelector('[data-page="stats"]');
  const nav = document.getElementById('stats-mobile-nav');
  const btn = document.querySelector('[data-slot="menu-button"]');
  const isOpen = main.dataset.menuOpen === 'true';
  main.dataset.menuOpen = isOpen ? 'false' : 'true';
  nav.hidden = isOpen;
  btn.setAttribute('aria-expanded', (!isOpen).toString());
}

// Close mobile menu when clicking a link
document.querySelectorAll('[data-slot="mobile-menu-item"]').forEach(link => {
  link.addEventListener('click', () => {
    const main = document.querySelector('[data-page="stats"]');
    const nav = document.getElementById('stats-mobile-nav');
    main.dataset.menuOpen = 'false';
    nav.hidden = true;
  });
});

// ─── INIT ───
renderTopModelsChart();
renderLeaderboard();
renderSessionCost();
renderTokenCost();
renderCacheRatio();
renderMarketShare();
renderRetention();
renderGeo();
