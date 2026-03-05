import { e as error, r as redirect } from './index-wpIsICWW.js';
import { c as createOAuth2Client, s as saveTokens } from './auth-BT7JgBau.js';
import { s as syncCalendarEvents } from './calendar-DhMAeEvs.js';
import 'googleapis';
import 'fs';
import './private-Dxrgp8fo.js';
import './index2-CQQ6lQvR.js';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import './dates-CjMa0hVO.js';

const GET = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) throw error(400, "No code provided");
  const client = createOAuth2Client();
  try {
    const { tokens } = await client.getToken(code);
    saveTokens(tokens);
    syncCalendarEvents().catch(console.error);
    throw redirect(302, "/");
  } catch (err) {
    if (err.status === 302) throw err;
    throw error(500, "Failed to exchange code");
  }
};

export { GET };
//# sourceMappingURL=_server.ts-CC_gOnP-.js.map
