const fetch = require('node-fetch')
const parseString = require('xml2js').parseString

var feeds = {
  recent: {
    items: [], 
    url: 'https://content.api.nytimes.com/svc/news/v3/all/recent.rss'
  },
  homepage: {
    items: [], 
    url: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
  },
  popular: {
    items: [], 
    url: 'http://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml'
  }
}

async function updateFeeds(){
  for (let feedKey in feeds){
    let feed = feeds[feedKey]

    const response = await fetch(feed.url)
    const xml = await response.text()

    var items = parseXML(xml).rss.channel[0].item
    items.forEach(d => {
      Object.keys(d).forEach(key => (d[key] = d[key][0]))

      d.link = d.link.split('?')[0]
    })

    if (items.length){ 
      feed.items = items
        .filter(d => d.title)
        .filter(d => !d.title.includes(': Your ') || !d.title.includes('Briefing'))
    }
  }


  function parseXML(xml) {
    var result = {}
    parseString(xml, (err, res) => (result = res))
    return result
  }
}

// refresh feeds every 5 min
setInterval(updateFeeds, 1000*60*5)
updateFeeds()


export async function get(req, res) {
  try {
    var feed = Object.keys(req.query)[0] || 'recent'
    if (!feeds[feed].items.length) await updateFeeds()

    res.header('Access-Control-Allow-Origin', '*') 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    res.set({'Content-Type': 'application/json'})
    res.send(JSON.stringify(feeds[feed].items))
  } catch (err) {
    res.status(500).send(err.message)
  }
}
