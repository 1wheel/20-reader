// import posts from './_posts.js';
const fetch = require('node-fetch');
var parseString = require('xml2js').parseString

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

    console.time('rss dl')
    const response = await fetch(url)
    const xml = await response.text();
    console.timeEnd('rss dl')

    var items = parseXML(xml).rss.channel[0].item
    items.forEach(d => {
      Object.keys(d).forEach(key => d[key] = d[key][0])
    })

    res.set({
      'Content-Type': 'application/json',
      'Cache-Control': `max-age=${30 * 60 * 1e3}` // cache for 30 minutes
    });

    res.send(JSON.stringify(items));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// export async function get(req) {
//   const response = await fetch('http://www.nytimes.com/timeswire/feeds/')
//   const xml = await response.text();

//   var items = parseXML(xml).rss.channel[0].item
//   items.forEach(d => {
//     Object.keys(d).forEach(key => d[key] = d[key][0])
//   })

//   console.log(items)

//   return items
// }
