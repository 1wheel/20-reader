// export const prerender = true

export async function load({fetch, url}){
  const feed = url.searchParams.get('feed') || 'recent'

  let posts = await (await fetch(`/api/feed?feed=${feed}`)).json()
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

  return ({posts})
}

