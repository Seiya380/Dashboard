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
  if (!isConnected()) return json({ connected: false });
  const token = await getAccessToken();
  if (!token) return json({ connected: false });
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 204) return json({ connected: true, playing: false });
  if (!res.ok) return json({ connected: true, playing: false });
  const data = await res.json();
  if (!data?.item) return json({ connected: true, playing: false });
  return json({
    connected: true,
    playing: data.is_playing,
    track: {
      name: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      album: data.item.album.name,
      albumArt: data.item.album.images[0]?.url ?? null,
      progress: data.progress_ms,
      duration: data.item.duration_ms,
      url: data.item.external_urls.spotify
    }
  });
}

export { GET };
//# sourceMappingURL=_server.ts-BAHCu4si.js.map
