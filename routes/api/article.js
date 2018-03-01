const fetch = require('node-fetch')
const fs = require('fs')

// cache articles for 30 min
var articleCache = {}
setInterval(() => articleCache = {}, 1000*60*30)


async function getArticleText(url){
  if (articleCache[url]) return articleCache[url]

  const response = await fetch(url)
  const html = await response.text()

  var pClass = html
    .split('</time></div></header><p class="')[1]
    .split(' ')[0]

  console.log(pClass)

  var lines = html
    .replace(
      /<h2 class="Heading2-heading2/g, 
      '<p class="story-body-text"> <h2 class="Heading2-heading2'
    )
    .replace(/<figure.+?figure>/g, '')
    .split(`<p class="${pClass}`)
    .slice(1)
    .map(d => d.split('>').slice(1).join('>').split('</p>')[0])
    .map(d => `<p>${d}</p>`)

  // console.log(html.split('<p class="story-body-text').length)
  // fs.writeFileSync('temp/cross.html', html) 

  return articleCache[url] = lines.join('\n\n')
}


export async function get(req, res) {
  try {
    var url = Object.keys(req.query)[0].replace('www', 'mobile')

    var html = await getArticleText(url)

    res.set({
      'Content-Type': 'application/json',
      'Cache-Control': `max-age=${30 * 60 * 5}` // cache for 30 minutes
    })

    res.send(html)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
