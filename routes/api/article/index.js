// import posts from './_posts.js';
const fetch = require('node-fetch');

var articleCache = {}

async function getArticleText(url){
  if (articleCache[url]) return articleCache[url]

  const response = await fetch(url)
  const html = await response.text()

  console.log(html.split('<p class="p-block">').length)

  var lines = html
    .split('<p class="p-block">')
    .slice(1)
    .map(d => d.split('</p>')[0])
    // .filter(d => d.includes('story-body-text'))
  // console.log(lines)

  var lines = html
    .split('<p')
    .slice(1)
    .map(d => d.split('>')[1].split('</p>')[0])
    // .filter(d => d.includes('story-body-text'))

  var lines = html
    .split('<p class="Paragraph-paragraph')
    .slice(1)
    .map(d => d.split('>').slice(1).join('>').split('</p>')[0])
    .map(d => `<p>${d}</p>`)
    // .filter(d => d.includes('story-body-text'))


  // console.log(lines)
  // return html
  return articleCache[url] = lines.join('\n')
}


export async function get(req, res) {

  try {
    var url = Object.keys(req.query)[0].replace('www', 'mobile')
    console.log(url)

    var html = await getArticleText(url)

    res.set({
      'Content-Type': 'application/html',
      // 'Content-Length': json.length
    });

    res.send(html);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
