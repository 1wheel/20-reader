import { parseString } from "xml2js";
var feeds = {
  recent: {
    items: [],
    url: "https://content.api.nytimes.com/svc/news/v3/all/recent.rss"
  },
  homepage: {
    items: [],
    url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
  },
  popular: {
    items: [],
    url: "http://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml"
  }
};
async function updateFeeds() {
  for (let feedKey in feeds) {
    let feed = feeds[feedKey];
    const response = await fetch(feed.url);
    const xml = await response.text();
    var items = parseXML(xml).rss.channel[0].item;
    items.forEach((d) => {
      Object.keys(d).forEach((key) => d[key] = d[key][0]);
      d.link = d.link.split("?")[0];
    });
    if (items.length) {
      feed.items = items.filter((d) => !d.link.includes("nytimes.com/live/")).filter((d) => d.title).filter((d) => !d.title.includes(": Your ") || !d.title.includes("Briefing"));
    }
  }
  function parseXML(xml) {
    var result = {};
    parseString(xml, (err, res) => result = res);
    return result;
  }
}
setInterval(updateFeeds, 1e3 * 60 * 5);
updateFeeds();
async function get(req) {
  try {
    var feed = Object.keys(req.url.searchParams)[0] || "recent";
    if (!feeds[feed].items.length)
      await updateFeeds();
    return {
      "Content-Type": "application/json",
      body: JSON.stringify(feeds[feed].items)
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      body: err.message
    };
  }
}
export { get };
