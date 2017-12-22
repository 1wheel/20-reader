const fetch = require('node-fetch')

var articleCache = {}

async function getArticleText(url){
	// return 'yooo'
	if (articleCache[url]) return articleCache[url]

  const response = await fetch(url)
  const html = await response.text()

  var lines = html.split('\n')
  	.filter(d => d.includes('story-body-text'))
  	console.log(lines)

  return articleCache[url] = lines.join('\n')
}

getArticleText('https://www.nytimes.com/2017/12/22/briefing/catalonia-jerusalem-christmas.html')


// export function get(req, res, next) {
// 	const { slug } = req.params
// 	console.log(articleCache)
// 	console.log(slug)

// 	if (slug == 'test-slug') {
// 		res.set({
// 			'Content-Type': 'application/json',
// 			// 'Cache-Control': `max-age=${30 * 60 * 1e3}` // cache for 30 minutes
// 		})

// 		var url = 'https://www.nytimes.com/2017/12/22/briefing/catalonia-jerusalem-christmas.html'
// 		res.end(getArticleText(url))
// 	} else {
// 		next()
// 	}
// }