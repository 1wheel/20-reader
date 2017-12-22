// import posts from './_posts.js';
const fetch = require('node-fetch');
var parseString = require('xml2js').parseString

export async function get(req, res) {
  try {
    const response = await fetch('http://www.nytimes.com/timeswire/feeds/')
    const text = await response.text();

    res.set({
      'Content-Type': 'application/json',
      // 'Content-Length': json.length
    });

    res.send(text);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


// export function get(req, res) {
//   res.set({
//     'Content-Type': 'application/json',
//     'Cache-Control': `max-age=${1*60*1000}` // cache for 1 minute
//   });

//   // var url = 'http://www.nytimes.com/timeswire/feeds/'

//   console.log(res.end)

//   request({url}, (err, res, body) => {
//     // console.log(body)

//     console.log(res.end)
    
//     // res.end(body)
//     // cb(body)
//   })


//   // res.end(contents);
// }