import * as fs from 'fs';
import * as _ from 'underscore'

import {curly} from 'node-libcurl'
import {exec} from 'child_process'

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

  if (true){
    var html = (await curly.get(url)).data
  } else {
    var html = await curlUrl(url)
  }
  // fs.writeFileSync('/Users/zoia/1wheel/20-reader/temp/page-curl.html', html)

  try {
    var jsonStr = html
      .split('<script>window.__preloadedData = ')[1]
      .split(';</script>')[0]
      .replaceAll(':undefined', ':null')

    var __preloadedData = JSON.parse(jsonStr)
    // fs.writeFileSync('/Users/zoia/1wheel/20-reader/temp/page.json', JSON.stringify(__preloadedData, null, 2))

    var lines = __preloadedData.initialData.data.article.sprinkledBody.content
      .map(renderBlock)
      .filter(d => d != '')
      .map(d => `<p>${d}</p>`)

    return articleCache[url] = lines.join('\n\n')
  } catch {
    return '' 
  }

  function imgHtml(media){
    return  `<img src='${media.crops[0].renditions[0].url}' style='width:100%'></img>
          <p style='margin-top:-20px;font-size:10px'>${media.legacyHtmlCaption}</p>`
  }

  function renderBlock(d){
    var rv = ''

    if (d.__typename == 'ParagraphBlock'){
      rv += '<p>'
      d.content.forEach(d => {
        if (!d.formats) return
        if (d.formats.length == 0){
          rv += d.text
        // TODO: split off to handle <p> wrapping?
        } else if (d.formats[0].__typename == 'BoldFormat'){
          rv += `<b>${d.text}</b>`
        } else if (d.formats[0].__typename == 'ItalicFormat'){
          rv += `<i>${d.text}</i>`
        } else if (d.formats[0].__typename == 'LinkFormat'){
          rv += `<a href='${d.formats[0].url}'>${d.text}</a>`
        } else{
          console.log(d.formats[0].__typename)
        }
      })
      rv += '</p>'
    } else if (d.__typename.includes('Heading')){
      rv += `<b>${d.content[0].text}</b>`
    } else if (d.__typename == 'ListBlock'){
      rv += `<ul>${d.content.map(renderBlock).join('\n')}</ul>` 
    } else if (d.__typename == 'ListItemBlock'){
      rv += `<li>${d.content.map(renderBlock).join('\n')}</li>` 
    } else if (d.__typename == 'BlockquoteBlock'){
      rv += `<blockquote>${d.content.map(renderBlock).join('\n')}</blockquote>` 
    } else if (d.__typename == 'ImageBlock'){ 
      rv += imgHtml(d.media)
    } else if (d.__typename == 'DiptychBlock'){ 
      rv += imgHtml(d.imageOne)
      rv += imgHtml(d.imageTwo)
    } else if (['Dropzone', 'RuleBlock', 'HeaderBasicBlock', 'EmailSignupBlock', 'RelatedLinksBlock', 'DetailBlock', 'HeaderFullBleedVerticalBlock', 'HeaderFullBleedHorizontalBlock', 'BylineBlock', 'CapsuleBlock'].includes(d.__typename)){
    } else {
      rv += `<span style='font-family:monospace;font-size:10px;'>${JSON.stringify(d, null, 2).slice(0, 128)}</span>`
      // CapsuleBlock
      // ListBlock
      // DetailBlock
      // BlockquoteBlock
      console.log(d.__typename)
    }

    return rv
  }




  // var pStr = `{margin-bottom:0.9375rem;margin-top:0;}`
  // var pClass = html
  //   .split(pStr)[0]
  //   .split('.')
  //   .slice(-1)[0]
  // console.log({pClass})

  // var ulStr = `{list-style:none;margin-left:20px;margin-right:20px;width:`
  // var ulClass = html
  //   .split(ulStr)[0]
  //   .split('.')
  //   .slice(-1)[0]
  // console.log({ulClass})


  // var lines = html
  //   .split('<div id="after-bottom"><')[0]
  //   .split('site-index-label')[0]
  //   // .split('g-electionguide-list-header')[0] // no 2020 footer
  //   // .replace(`h2 class="css-zd32qr e6u6ph31"`, 'div') // no promos
  //   .replace(
  //     /<h2 /g, 
  //     `<p class="${pClass}"> <h2 `
  //   )
  //   // .replaceAll(
  //   //   `<ul class="${ulClass} `,
  //   //   `<p class="${pClass}"> <ul `
  //   // )
  //   // .replace(/<figure.+?figure>/g, '')
  //   .split(`<p class="${pClass}`)
  //   .slice(1)
  //   // .map(d => d.split('>').slice(1).join('>').split('</p>')[0])
  //   // .map(d => `<p>${d}</p>`)
  //   // // .filter(d => !d.includes('css-1uuihdo')) // remove promos
  //   // .filter(d => !d.includes('storyline-latest-updates'))
  //   // .filter(d => !d.includes('>Card 1 of'))

  // console.log(lines)

  // // intentional links to the end
  // lines = _.sortBy(lines, d => d.includes('[') && d.includes(']')  && d.includes('href') ? 1 : -1)
  // lines = _.sortBy(lines, d => d.includes('toplinks-title') ? 1 : -1)

  // console.log(html.split('<p class="story-body-text').length)
  // console.log(lines.length)

  // var tempDir = '/Users/adampearce/Desktop/lib/20-reader/temp/'
  // fs.writeFileSync(tempDir + 'article.html', html) 
  // fs.writeFileSync(tempDir + 'lines.html', lines.join('\n\n')) 
  
  // return articleCache[url] = lines.join('\n\n')
}

// getArticleText('https://www.nytimes.com/2023/05/27/business/dealbook/unused-paid-time-off.html')
// getArticleText('https://www.nytimes.com/2024/01/29/briefing/drone-deaths-jordan-president-biden-campaign.html')
// getArticleText('https://www.nytimes.com/2024/01/29/world/middleeast/unrwa-israel-gaza-terrorism.html')
  
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
