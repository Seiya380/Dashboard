import { j as json } from './index-wpIsICWW.js';
import { i as isConnected, g as getAccessToken } from './auth2-Bie9KIHt.js';
import './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm';
import './private-Dxrgp8fo.js';

async function GET() {
  if (!isConnected()) return json([]);
  const token = await getAccessToken();
  if (!token) return json([]);
  const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=4", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return json([]);
  const data = await res.json();
  return json(
    data.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      albumArt: item.track.album.images[2]?.url ?? item.track.album.images[0]?.url ?? null,
      url: item.track.external_urls.spotify
    }))
  );
}

export { GET };
//# sourceMappingURL=_server.ts-BJv26056.js.map
