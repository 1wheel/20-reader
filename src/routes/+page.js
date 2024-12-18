// export var prerender = true

export async function load({fetch, url}){
  var posts = []
  try {
    var feed = url.searchParams.get('feed') || 'recent'
    var response = await fetch(`/api/feed?feed=${feed}`)
    if (!response.ok) {
      console.error(`Feed fetch failed: ${response.status}`)
      return {posts}
    }
    
    posts = await response.json()
    console.log('num posts', posts.length)
    posts.forEach((d, i) => {
      d.id = i
      d.i = i
      d.section = 'section'

      d.html = ''
      d.apiLink = `/api/article?${d.link}`
      d.expanded = false

      d.i = i
      d.section = d.link
        .replace('sunday/', '')
        .replace('columnists/', '')
        .replace('editorialboard/', '')
        .split('/').slice(-2)[0]

      d.byline = (d['dc:creator'] || '').trim()

      d.type = ''
      if (d.section == 'opinion') d.type = 'OPINION: '
      if (d.section == 'crosswords') d.type = 'CROSSWORDS: '
      if (d.section == 'editorials') d.type = 'EDITORIALS: '
      if (d.section == 'editorials') d.type = 'EDITORIALS: '
      if (d.section == 'smarter-living') d.type = 'SMARTER LIVING: '
      if (d.section == 'wirecutter') d.type = 'WIRECUTTTER: '
      if (d.byline == 'The Associated Press') d.type = 'AP: '
      if (d.byline == 'Reuters') d.type = 'REUTERS: '
      if (d.link.includes('/slideshow/')) d.type = 'SLIDESHOW: '
    })

    posts.sort((a, b) => {
      return a.type < b.type ? -1 : a.type > b.type ? 1 : a.i - b.i
    })

    // TODO: why is this error happening? https://github.com/sveltejs/kit/discussions/7259
    return ({posts: JSON.parse(JSON.stringify(posts))})
  } catch (err){
    console.error(`load failed`, err, posts)
    return {posts}
  }
}

