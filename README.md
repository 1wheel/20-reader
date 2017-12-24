## TODO

- [x] set as home page
- [x] delete other things
- [x] position sticky 
- [ ] bigger desktop fonts
- [x] scroll to on detoggle?
- [x] deploy with rsync
- [ ] forward ports 
- [x] nav for other feeds
- [x] cookies to track read articles
- [x] class="styles-italic--2TT1g"> and class="styles-bold--rNKfn">To
- [x] don't lose section heads
`<h2 class="Heading2-heading2--2UY6W elementStyles-heading2--slXZ7 elementStyles-toneNews--sRTft">Xprize Foundation, Inc.</h2>`
- [ ] filter out images
- [ ] images?
- [ ] show article length?

- [ ] updating #aa1e1e in manifest.json doesn't get used
- [ ] styles don't update without reload
- [ ] debugging is hard `(node:38624) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): TypeError: Cannot read property 'link' of undefined`
- [ ] frequently have to kill server and start over:
```
process-update.js:136 [HMR] Update check failed: Error: Manifest request to /client/7f71269cd30032b87e4f.hot-update.json timed out.
    at XMLHttpRequest.request.onreadystatechange (http://localhost:3000/client/main.7f71269cd30032b87e4f.js:64:22)
handleError @ process-update.js:136
cb @ process-update.js:47
Promise rejected (async)
check @ process-update.js:84
module.exports @ process-update.js:42
processMessage @ client.js:251
handleMessage @ client.js:131
handleMessage @ client.js:94
bootstrap 7f71269cd30032b87e4f:63 Uncaught (in promise) Error: Manifest request to /client/7f71269cd30032b87e4f.hot-update.json timed out.
    at XMLHttpRequest.request.onreadystatechange (bootstrap 7f71269cd30032b87e4f:63)
request.onreadystatechange @ bootstrap 7f71269cd30032b87e4f:63
Promise rejected (async)
check @ process-update.js:81
module.exports @ process-update.js:42
processMessage @ client.js:251
handleMessage @ client.js:131
handleMessage @ client.js:94
```
Requests to API routes don't start until the process is killed and all the requests finish.
This only happens after editting route.html files