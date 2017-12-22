// import posts from './_posts.js';


export function get(req, res, next) {
	// the `slug` parameter is available because this file
	// is called [slug].js
	const { slug } = req.params;
	console.log(slug)

	if (slug in lookup) {
		res.set({
			'Content-Type': 'application/json',
			'Cache-Control': `max-age=${30 * 60 * 1e3}` // cache for 30 minutes
		});

		res.end({ok: 5});
	} else {
		next();
	}
}