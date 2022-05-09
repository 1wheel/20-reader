// const fetch = require('node-fetch')
// const parseString = require('xml2js').parseString
import {parseString} from 'xml2js'

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
        .filter(d => !d.link.includes('nytimes.com/live/')) // https://www.nytimes.com/live/2020/iowa-democratic-caucus-01-26/caucusing-with-disability
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


export async function get(req) {
  try {
    var feed = req.url.searchParams.get('feed') || 'recent'
    if (!feeds[feed].items.length) await updateFeeds()

    return {
      'Content-Type': 'application/json',
      body: JSON.stringify(feeds[feed].items)
    }

  } catch (err) {
    console.log(err)
    return {
      status: 500,
      body: err.message,
    }
  }
}