import { r as redirect } from './index-wpIsICWW.js';
import { C as CLIENT_ID } from './auth2-Bie9KIHt.js';
import './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm';
import './private-Dxrgp8fo.js';

const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-top-read"
].join(" ");
function GET({ url }) {
  const redirectUri = `${url.origin}/api/spotify/callback`;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: redirectUri
  });
  throw redirect(302, `https://accounts.spotify.com/authorize?${params}`);
}

export { GET };
//# sourceMappingURL=_server.ts-F5g-sX5Y.js.map
