import { r as redirect } from './index-wpIsICWW.js';
import { C as CLIENT_ID, a as CLIENT_SECRET, s as saveTokens } from './auth2-Bie9KIHt.js';
import './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm';
import './private-Dxrgp8fo.js';

async function GET({ url }) {
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  if (error || !code) throw redirect(302, "/?spotify=error");
  const redirectUri = `${url.origin}/api/spotify/callback`;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
    })
  });
  if (!res.ok) throw redirect(302, "/?spotify=error");
  const data = await res.json();
  saveTokens(data.access_token, data.refresh_token, data.expires_in);
  throw redirect(302, "/");
}

export { GET };
//# sourceMappingURL=_server.ts-5emFE47i.js.map
