import { j as json } from './index-wpIsICWW.js';
import { d as db, f as watchlistTickers, s as settings } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { n as now } from './dates-CjMa0hVO.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';

const YF_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  "Referer": "https://finance.yahoo.com/"
};
let _sessionCookie = "";
let _crumb = "";
let _sessionTs = 0;
const SESSION_TTL = 2 * 60 * 60 * 1e3;
async function refreshYahooSession() {
  try {
    const [row] = await db.select().from(settings).where(eq(settings.key, "yf_session"));
    if (row) {
      const saved = JSON.parse(row.value);
      if (Date.now() - saved.ts < SESSION_TTL) {
        _sessionCookie = saved.cookie;
        _crumb = saved.crumb;
        _sessionTs = saved.ts;
        return true;
      }
    }
  } catch {
  }
  try {
    const r1 = await fetch("https://finance.yahoo.com/", {
      headers: { ...YF_HEADERS, "Accept": "text/html" },
      signal: AbortSignal.timeout(1e4)
    });
    if (!r1.ok) return false;
    const setCookieHeader = r1.headers.get("set-cookie") ?? "";
    const cookies = setCookieHeader.split(/,(?=[^ ].*?=)/).map((c) => c.split(";")[0].trim()).filter(Boolean).join("; ");
    const r2 = await fetch("https://query2.finance.yahoo.com/v1/test/getcrumb", {
      headers: { ...YF_HEADERS, Cookie: cookies },
      signal: AbortSignal.timeout(1e4)
    });
    if (!r2.ok) return false;
    const crumb = await r2.text();
    if (!crumb || crumb.includes("Too Many")) return false;
    _sessionCookie = cookies;
    _crumb = crumb;
    _sessionTs = Date.now();
    const ts = now();
    await db.insert(settings).values({ key: "yf_session", value: JSON.stringify({ cookie: cookies, crumb, ts: _sessionTs }), updatedAt: ts }).onConflictDoUpdate({ target: settings.key, set: { value: JSON.stringify({ cookie: cookies, crumb, ts: _sessionTs }), updatedAt: ts } });
    return true;
  } catch {
    return false;
  }
}
async function ensureSession() {
  if (_sessionCookie && _crumb && Date.now() - _sessionTs < SESSION_TTL) return true;
  return refreshYahooSession();
}
const quoteCache = /* @__PURE__ */ new Map();
const CACHE_TTL = 6e4;
const COINGECKO_IDS = {
  "BTC-USD": "bitcoin",
  "BTC-EUR": "bitcoin",
  "ETH-USD": "ethereum",
  "ETH-EUR": "ethereum",
  "SOL-USD": "solana",
  "SOL-EUR": "solana",
  "BNB-USD": "binancecoin",
  "BNB-EUR": "binancecoin",
  "XRP-USD": "ripple",
  "XRP-EUR": "ripple",
  "ADA-USD": "cardano",
  "ADA-EUR": "cardano",
  "DOGE-USD": "dogecoin",
  "DOGE-EUR": "dogecoin",
  "AVAX-USD": "avalanche-2",
  "AVAX-EUR": "avalanche-2",
  "MATIC-USD": "matic-network",
  "MATIC-EUR": "matic-network",
  "DOT-USD": "polkadot",
  "DOT-EUR": "polkadot"
};
function isCrypto(symbol) {
  return symbol in COINGECKO_IDS;
}
async function fetchCryptoQuote(symbol) {
  const geckoId = COINGECKO_IDS[symbol];
  const vs = symbol.endsWith("-EUR") ? "eur" : "usd";
  const currency = symbol.endsWith("-EUR") ? "EUR" : "USD";
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=${vs}&include_24hr_change=true`,
      { signal: AbortSignal.timeout(1e4) }
    );
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    const data = await res.json();
    const entry = data[geckoId];
    if (!entry) throw new Error("Not found");
    const price = entry[vs] ?? 0;
    const changePct = entry[`${vs}_24h_change`] ?? 0;
    const prevPrice = price / (1 + changePct / 100);
    const change = price - prevPrice;
    return { symbol, displayName: null, shortName: geckoId, price, change, changePct, currency, marketState: "REGULAR" };
  } catch (err) {
    return { symbol, displayName: null, shortName: symbol, price: 0, change: 0, changePct: 0, currency, marketState: "CLOSED", error: String(err) };
  }
}
async function fetchYahooQuote(symbol, retry = true) {
  const cached = quoteCache.get(symbol);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.quote;
  await ensureSession();
  const crumbParam = _crumb ? `&crumb=${encodeURIComponent(_crumb)}` : "";
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d${crumbParam}`;
  try {
    const res = await fetch(url, {
      headers: { ...YF_HEADERS, Cookie: _sessionCookie },
      signal: AbortSignal.timeout(1e4)
    });
    if (res.status === 429 && retry) {
      _sessionTs = 0;
      await refreshYahooSession();
      return fetchYahooQuote(symbol, false);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data?.chart?.error) throw new Error(data.chart.error.description ?? "Not found");
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta) throw new Error("No data returned");
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? meta.regularMarketPrice;
    const price = meta.regularMarketPrice ?? 0;
    const change = price - (prevClose ?? price);
    const changePct = prevClose ? change / prevClose * 100 : 0;
    const quote = {
      symbol,
      displayName: null,
      shortName: meta.shortName ?? meta.longName ?? symbol,
      price,
      change,
      changePct,
      currency: meta.currency ?? "USD",
      marketState: meta.marketState ?? "CLOSED"
    };
    quoteCache.set(symbol, { quote, ts: Date.now() });
    return quote;
  } catch (err) {
    return { symbol, displayName: null, shortName: symbol, price: 0, change: 0, changePct: 0, currency: "USD", marketState: "CLOSED", error: err instanceof Error ? err.message : String(err) };
  }
}
async function fetchQuote(symbol) {
  return isCrypto(symbol) ? fetchCryptoQuote(symbol) : fetchYahooQuote(symbol);
}
async function fetchQuotes(symbols) {
  const result = /* @__PURE__ */ new Map();
  const stocks = symbols.filter((s) => !isCrypto(s));
  const cryptos = symbols.filter(isCrypto);
  const cryptoResults = await Promise.all(cryptos.map(fetchCryptoQuote));
  for (const q of cryptoResults) result.set(q.symbol, q);
  for (let i = 0; i < stocks.length; i++) {
    if (i > 0) await new Promise((r) => setTimeout(r, 300));
    const q = await fetchYahooQuote(stocks[i]);
    result.set(q.symbol, q);
  }
  return result;
}
const GET = async () => {
  const tickers = await db.select().from(watchlistTickers);
  if (!tickers.length) return json([]);
  const quotes = await fetchQuotes(tickers.map((t) => t.symbol));
  return json(
    tickers.map((t) => {
      const q = quotes.get(t.symbol);
      return { id: t.id, symbol: t.symbol, displayName: t.displayName, shortName: q?.shortName ?? t.symbol, price: q?.price ?? 0, change: q?.change ?? 0, changePct: q?.changePct ?? 0, currency: q?.currency ?? "USD", marketState: q?.marketState ?? "CLOSED", error: q?.error };
    })
  );
};
const POST = async ({ request }) => {
  const { symbol, displayName } = await request.json();
  if (!symbol?.trim()) return json({ error: "Symbol required" }, { status: 400 });
  const sym = symbol.trim().toUpperCase();
  const quote = await fetchQuote(sym);
  if (quote.error) {
    return json({ error: `"${sym}" not found — check the symbol (e.g. MC.PA for LVMH, BTC-USD for Bitcoin)` }, { status: 404 });
  }
  const id = crypto.randomUUID();
  const [row] = await db.insert(watchlistTickers).values({ id, symbol: sym, displayName: displayName?.trim() || null, createdAt: now() }).onConflictDoNothing().returning();
  if (!row) return json({ error: "Already in watchlist" }, { status: 409 });
  return json({ id, symbol: sym, displayName: displayName || null, ...quote }, { status: 201 });
};

export { GET, POST };
//# sourceMappingURL=_server.ts-CXmkNc7z.js.map
