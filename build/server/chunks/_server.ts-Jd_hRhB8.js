import { r as redirect } from './index-wpIsICWW.js';
import { C as CLIENT_ID } from './auth2-DxxfPCs5.js';
import './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm';

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
//# sourceMappingURL=_server.ts-Jd_hRhB8.js.map
