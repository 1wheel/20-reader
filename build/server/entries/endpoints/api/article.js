import "fs";
import * as _ from "underscore";
import { curly } from "node-libcurl";
var articleCache = {};
setInterval(() => articleCache = {}, 1e3 * 60 * 10);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getArticleText(url) {
  if (articleCache[url])
    return articleCache[url];
  await sleep(Math.random() * 100);
  var { statusCode, data, headers } = await curly.get(url);
  var html = data;
  var pStr = `{margin-bottom:0.9375rem;margin-top:0;}`;
  var pClass = html.split(pStr)[0].split(".").slice(-1)[0];
  var lines = html.split('<div id="after-bottom"><')[0].split("site-index-label")[0].split("g-electionguide-list-header")[0].replace(`h2 class="css-zd32qr e6u6ph31"`, "div").replace(/<h2 /g, `<p class="${pClass}"> <h2 `).replace(/<figure.+?figure>/g, "").split(`<p class="${pClass}`).slice(1).map((d) => d.split(">").slice(1).join(">").split("</p>")[0]).map((d) => `<p>${d}</p>`).filter((d) => !d.includes("css-1uuihdo")).filter((d) => !d.includes("storyline-latest-updates")).filter((d) => !d.includes(">Card 1 of"));
  lines = _.sortBy(lines, (d) => d.includes("[") && d.includes("]") && d.includes("href") ? 1 : -1);
  lines = _.sortBy(lines, (d) => d.includes("toplinks-title") ? 1 : -1);
  return articleCache[url] = lines.join("\n\n");
}
getArticleText("https://www.nytimes.com/2022/05/07/pageoneplus/corrections-may-7-2022.html");
async function get(req) {
  try {
    var url = req.url.searchParams.keys().next().value;
    var html = await getArticleText(url);
    return {
      header: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
      "Cache-Control": `max-age=${30 * 60 * 0}`,
      body: html
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
