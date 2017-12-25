const fetch = require('node-fetch');
const parseString = require('xml2js').parseString

function parseXML(xml){
  var result = {}
  parseString(xml, (err, res) => result = res)
  return result
}

export async function get(req, res) {
  try {
    var feed = Object.keys(req.query)[0] || 'recent'

    var url = {
      recent: 'http://www.nytimes.com/timeswire/feeds/',
      homepage: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      popular: 'http://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml'
    }[feed]

    const response = await fetch(url)
    const xml = await response.text();

    var items = parseXML(xml).rss.channel[0].item
    items.forEach(d => {
      Object.keys(d).forEach(key => d[key] = d[key][0])
    })

    res.set({
      'Content-Type': 'application/json',
      // 'Cache-Control': `max-age=${1 * 60 * 1e3}` // cache for 1 minute
    });

    res.send(JSON.stringify(items));
  } catch (err) {
    res.status(500).send(err.message);
  }
}
