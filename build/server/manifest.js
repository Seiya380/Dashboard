const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Knights-of-Sidonia.png","icon-192.png","icon-512.png","icon.svg","manifest.json","sw.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.CNyVm_w-.js",app:"_app/immutable/entry/app.cmcUKaJm.js",imports:["_app/immutable/entry/start.CNyVm_w-.js","_app/immutable/chunks/BN8ODvaQ.js","_app/immutable/chunks/CsVHGGuQ.js","_app/immutable/entry/app.cmcUKaJm.js","_app/immutable/chunks/CsVHGGuQ.js","_app/immutable/chunks/CRa6zWHF.js","_app/immutable/chunks/51XDbXE4.js","_app/immutable/chunks/BM3iUIG-.js","_app/immutable/chunks/B4uFvTJC.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-8VqZHqqT.js')),
			__memo(() => import('./chunks/1-Y-7_A4mM.js')),
			__memo(() => import('./chunks/2-CdIin3m6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/bookmarks",
				pattern: /^\/api\/bookmarks\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Cq8HJJLX.js'))
			},
			{
				id: "/api/bookmarks/[id]",
				pattern: /^\/api\/bookmarks\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BB_rMmb4.js'))
			},
			{
				id: "/api/bookmarks/[id]/check",
				pattern: /^\/api\/bookmarks\/([^/]+?)\/check\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CWm3s12p.js'))
			},
			{
				id: "/api/calendar",
				pattern: /^\/api\/calendar\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Bj0q4ty7.js'))
			},
			{
				id: "/api/calendar/ics",
				pattern: /^\/api\/calendar\/ics\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DsAGxKx-.js'))
			},
			{
				id: "/api/calendar/oauth",
				pattern: /^\/api\/calendar\/oauth\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C2Gp3co1.js'))
			},
			{
				id: "/api/calendar/oauth/callback",
				pattern: /^\/api\/calendar\/oauth\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-yTmlgUDC.js'))
			},
			{
				id: "/api/calendar/subscribe",
				pattern: /^\/api\/calendar\/subscribe\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DXf3uG5_.js'))
			},
			{
				id: "/api/calendar/subscribe/[id]",
				pattern: /^\/api\/calendar\/subscribe\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DIBmOhU3.js'))
			},
			{
				id: "/api/chat",
				pattern: /^\/api\/chat\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Cx8gL9A2.js'))
			},
			{
				id: "/api/embed",
				pattern: /^\/api\/embed\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DLyJJQFp.js'))
			},
			{
				id: "/api/goals",
				pattern: /^\/api\/goals\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DeqxnwKT.js'))
			},
			{
				id: "/api/goals/[id]",
				pattern: /^\/api\/goals\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Cjpz2VPG.js'))
			},
			{
				id: "/api/links",
				pattern: /^\/api\/links\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-ChweatZb.js'))
			},
			{
				id: "/api/news",
				pattern: /^\/api\/news\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-5AdJHTfr.js'))
			},
			{
				id: "/api/news/feeds",
				pattern: /^\/api\/news\/feeds\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B40eyBZ6.js'))
			},
			{
				id: "/api/news/feeds/[id]",
				pattern: /^\/api\/news\/feeds\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DjX9S0Ya.js'))
			},
			{
				id: "/api/quote",
				pattern: /^\/api\/quote\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Bh5WWb-a.js'))
			},
			{
				id: "/api/spotify/callback",
				pattern: /^\/api\/spotify\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-XrySCy0e.js'))
			},
			{
				id: "/api/spotify/disconnect",
				pattern: /^\/api\/spotify\/disconnect\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-XJQD4CXF.js'))
			},
			{
				id: "/api/spotify/login",
				pattern: /^\/api\/spotify\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Jd_hRhB8.js'))
			},
			{
				id: "/api/spotify/now-playing",
				pattern: /^\/api\/spotify\/now-playing\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BmswkGdf.js'))
			},
			{
				id: "/api/spotify/playlists",
				pattern: /^\/api\/spotify\/playlists\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BUtXdB9o.js'))
			},
			{
				id: "/api/spotify/recent",
				pattern: /^\/api\/spotify\/recent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-l0NtZ7P_.js'))
			},
			{
				id: "/api/tasks",
				pattern: /^\/api\/tasks\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DYnthOV6.js'))
			},
			{
				id: "/api/tasks/[id]",
				pattern: /^\/api\/tasks\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DUvDmSZd.js'))
			},
			{
				id: "/api/watchlist",
				pattern: /^\/api\/watchlist\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CXmkNc7z.js'))
			},
			{
				id: "/api/watchlist/[symbol]",
				pattern: /^\/api\/watchlist\/([^/]+?)\/?$/,
				params: [{"name":"symbol","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Cys9uL-W.js'))
			},
			{
				id: "/api/widgets/layout",
				pattern: /^\/api\/widgets\/layout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BJeGueOM.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
