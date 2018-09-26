const fetch = require('node-fetch')
const fs = require('fs')

// cache articles for 10 min
var articleCache = {}
setInterval(() => articleCache = {}, 1000*60*10)


async function getArticleText(url){
  
  if (articleCache[url]) return articleCache[url]

  const response = await fetch(url)
  const html = await response.text()
  // console.log(url)

  // var pClass = html
  //   .split('</time></div></header><div class="StoryBodyCompanionColumn ')[1]
  //   .split(' ')[0]

  var pClass = html
    .split(`{font-family:nyt-imperial,georgia,'times new roman',times,serif;font-size:1.0625rem;line-height:1.5rem;`)[0]
    .split('.')
    .slice(-1)[0]
    
  // console.log(pClass)

  var lines = html
    .split('<div class="bottom-of-article">')[0]
    .replace(
      /<h2 class="/g, 
      `<p class="${pClass}> <h2 `
    )
    // .replace(
    //   /<figure class=/g, 
    //   `<p class="${pClass}> <img `
    // )
    // .replace(/itemID=/g, 'src=')
    .replace(/<figure.+?figure>/g, '')
    .split(`<p class="${pClass}`)
    .slice(1)
    .map(d => d.split('>').slice(1).join('>').split('</p>')[0])
    .map(d => `<p>${d}</p>`)

  // console.log(html.split('<p class="story-body-text').length)
  // console.log(lines.length)
  // console.log(__dirname + '/../../temp/article.html')

  // fs.writeFileSync(__dirname + '/../../temp/article.html', html) 
  // fs.writeFileSync(__dirname + '/../../temp/lines.html', lines.join('\n\n')) 

  return articleCache[url] = lines.join('\n\n')
}

// getArticleText('https://www.nytimes.com/2018/09/19/travel/affordable-seaside-getaways-california-bali-italy-mexico.html?fallback=0&recId=1AkX35z4ZRPC2dM8dn7BNcVx6Tm&locked=0&geoContinent=NA&geoRegion=NY&recAlloc=control&geoCountry=US&blockId=home-living-vi&imp_id=242323522')


export async function get(req, res) {
  try {
    var url = Object.keys(req.query)[0].replace('www', 'mobile')

    var html = await getArticleText(url)

    res.set({
      'Content-Type': 'application/json',
      'Cache-Control': `max-age=${30 * 60 * 0}` // cache for 30 minutes
    })

    res.send(html)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
