import * as fs from 'fs';
import * as _ from 'underscore'

import {curly} from 'node-libcurl'

// cache articles for 10 min
var articleCache = {}
setInterval(() => articleCache = {}, 1000*60*10)

function curlUrl(url){
  return new Promise((resolve, reject) => {
    exec(`curl -s -L ${url}`, {encoding: 'utf8'}, (error, stdout, stderror) => {
      if (error || stderror) reject(error | stderror)

      resolve(stdout)
    })
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getArticleText(url){
  
  if (articleCache[url]) return articleCache[url]
  await sleep(Math.random()*100)

  var {statusCode, data, headers} = await curly.get(url)
  var html = data

  // const response = await fetch(url)


  var pStr = `{margin-bottom:0.9375rem;margin-top:0;}`
  var pClass = html
    .split(pStr)[0]
    .split('.')
    .slice(-1)[0]
  // console.log({pClass})

  var lines = html
    .split('<div id="after-bottom"><')[0]
    .split('site-index-label')[0]
    .split('g-electionguide-list-header')[0] // no 2020 footer
    .replace(`h2 class="css-zd32qr e6u6ph31"`, 'div') // no promos
    .replace(
      /<h2 /g, 
      `<p class="${pClass}"> <h2 `
    )
    .replace(/<figure.+?figure>/g, '')
    .split(`<p class="${pClass}`)
    .slice(1)
    .map(d => d.split('>').slice(1).join('>').split('</p>')[0])
    .map(d => `<p>${d}</p>`)
    .filter(d => !d.includes('css-1uuihdo')) // remove promos
    .filter(d => !d.includes('storyline-latest-updates'))
    .filter(d => !d.includes('>Card 1 of'))

  // intentional links to the end
  lines = _.sortBy(lines, d => d.includes('[') && d.includes(']')  && d.includes('href') ? 1 : -1)
  lines = _.sortBy(lines, d => d.includes('toplinks-title') ? 1 : -1)



  // console.log(html.split('<p class="story-body-text').length)
  // console.log(lines.length)


  // var tempDir = '/Users/adampearce/Desktop/lib/20-reader/temp/'
  // fs.writeFileSync(tempDir + 'article.html', html) 
  // fs.writeFileSync(tempDir + 'lines.html', lines.join('\n\n')) 

  return articleCache[url] = lines.join('\n\n')
}

getArticleText('https://www.nytimes.com/2022/05/07/pageoneplus/corrections-may-7-2022.html')


export async function GET(req) {
  try {
    var url = req.url.searchParams.keys().next().value//.replace('www', 'mobile')
    var html = await getArticleText(url)
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
    return new Response(html, {headers})
  } catch (err) {
    console.log(err)
    return new Response(err.message, {status: 500})
    return {
      status: 500,
      body: err.message,
    }
  }
}
