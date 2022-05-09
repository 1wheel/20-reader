export const manifest = {
	appDir: "_app",
	assets: new Set([".DS_Store","global.css","manifest.json","t.png"]),
	mimeTypes: {".css":"text/css",".json":"application/json",".png":"image/png"},
	_: {
		entry: {"file":"start-2a2be589.js","js":["start-2a2be589.js","chunks/index-5f95ec63.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "api/feed",
				pattern: /^\/api\/feed\/?$/,
				names: [],
				types: [],
				load: () => import('./server/entries/endpoints/api/feed.js')
			},
			{
				type: 'endpoint',
				id: "api/article",
				pattern: /^\/api\/article\/?$/,
				names: [],
				types: [],
				load: () => import('./server/entries/endpoints/api/article.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
