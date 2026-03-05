import { google } from 'googleapis';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { G as GOOGLE_CLIENT_ID, a as GOOGLE_CLIENT_SECRET } from './private-Dxrgp8fo.js';

const TOKEN_PATH = "./data/google-tokens.json";
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
function createOAuth2Client() {
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "http://localhost:5173/api/calendar/oauth/callback"
  );
}
function getAuthUrl() {
  const client = createOAuth2Client();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES
  });
}
function saveTokens(tokens) {
  writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}
function loadTokens() {
  if (!existsSync(TOKEN_PATH)) return null;
  try {
    return JSON.parse(readFileSync(TOKEN_PATH, "utf-8"));
  } catch {
    return null;
  }
}
async function getAuthenticatedClient() {
  const tokens = loadTokens();
  if (!tokens) return null;
  const client = createOAuth2Client();
  client.setCredentials(tokens);
  client.on("tokens", (newTokens) => {
    const existing = loadTokens() ?? {};
    saveTokens({ ...existing, ...newTokens });
  });
  return client;
}

export { getAuthenticatedClient as a, createOAuth2Client as c, getAuthUrl as g, saveTokens as s };
//# sourceMappingURL=auth-BT7JgBau.js.map
