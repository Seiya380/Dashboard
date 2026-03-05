import { d as db, s as settings } from './index2-CQQ6lQvR.js';
import { eq } from 'drizzle-orm';
import { S as SPOTIFY_CLIENT_ID, b as SPOTIFY_CLIENT_SECRET } from './private-Dxrgp8fo.js';

const CLIENT_ID = SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function getSetting(key) {
  return db.select().from(settings).where(eq(settings.key, key)).get()?.value ?? null;
}
function setSetting(key, value) {
  db.insert(settings).values({ key, value, updatedAt: now() }).onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: now() } }).run();
}
function isConnected() {
  return !!getSetting("spotify_refresh_token");
}
async function getAccessToken() {
  const refreshToken = getSetting("spotify_refresh_token");
  if (!refreshToken) return null;
  const expiresAt = getSetting("spotify_expires_at");
  const accessToken = getSetting("spotify_access_token");
  if (accessToken && expiresAt && Date.now() < parseInt(expiresAt) - 6e4) {
    return accessToken;
  }
  return refreshAccessToken(refreshToken);
}
async function refreshAccessToken(refreshToken) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken })
  });
  if (!res.ok) return null;
  const data = await res.json();
  setSetting("spotify_access_token", data.access_token);
  setSetting("spotify_expires_at", String(Date.now() + data.expires_in * 1e3));
  if (data.refresh_token) setSetting("spotify_refresh_token", data.refresh_token);
  return data.access_token;
}
function saveTokens(accessToken, refreshToken, expiresIn) {
  setSetting("spotify_access_token", accessToken);
  setSetting("spotify_refresh_token", refreshToken);
  setSetting("spotify_expires_at", String(Date.now() + expiresIn * 1e3));
}
function disconnect() {
  for (const key of ["spotify_access_token", "spotify_refresh_token", "spotify_expires_at"]) {
    db.delete(settings).where(eq(settings.key, key)).run();
  }
}

export { CLIENT_ID as C, CLIENT_SECRET as a, disconnect as d, getAccessToken as g, isConnected as i, saveTokens as s };
//# sourceMappingURL=auth2-Bie9KIHt.js.map
