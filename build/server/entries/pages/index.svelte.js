import { c as create_ssr_component, a as each, e as escape, b as add_attribute } from "../../chunks/index-d6e6373c.js";
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".article.svelte-imjlbl.svelte-imjlbl{position:relative}.title.svelte-imjlbl.svelte-imjlbl{padding:5px;background:#000;padding-bottom:5px;padding-top:5px;font-size:16px;position:sticky;position:-webkit-sticky;top:0px;cursor:pointer;border-top:1px solid #888}.article.svelte-imjlbl:first-child .title.svelte-imjlbl{border-top:0px solid #888}.read.svelte-imjlbl .title.svelte-imjlbl{background:#222}.article-expand.svelte-imjlbl.svelte-imjlbl{display:none;padding:5px;padding-top:10px;padding-bottom:10px;padding-top:1px;font-weight:300}.expanded.svelte-imjlbl .article-expand.svelte-imjlbl{display:block;background:#111}@media(min-width: 750px){.title.svelte-imjlbl.svelte-imjlbl{font-size:18px;padding:10px}.article-expand.svelte-imjlbl.svelte-imjlbl{font-size:16px;padding:10px;padding-top:1px}}",
  map: null
};
async function load({ fetch }) {
  const feed = "recent";
  let posts = await (await fetch(`/api/feed?${feed}`)).json();
  posts.forEach((d, i) => {
    d.id = i;
    d.i = i;
    d.section = "section";
    d.html = "";
    d.apiLink = `/api/article?${d.link}`;
    d.expanded = false;
    d.i = i;
    d.section = d.link.replace("sunday/", "").replace("columnists/", "").replace("editorialboard/", "").split("/").slice(-2)[0];
    d.byline = (d["dc:creator"] || "").trim();
    d.type = "";
    if (d.section == "opinion")
      d.type = "OPINION: ";
    if (d.section == "crosswords")
      d.type = "CROSSWORDS: ";
    if (d.section == "editorials")
      d.type = "EDITORIALS: ";
    if (d.section == "editorials")
      d.type = "EDITORIALS: ";
    if (d.section == "smarter-living")
      d.type = "SMARTER LIVING: ";
    if (d.section == "wirecutter")
      d.type = "WIRECUTTTER: ";
    if (d.byline == "The Associated Press")
      d.type = "AP: ";
    if (d.byline == "Reuters")
      d.type = "REUTERS: ";
    if (d.link.includes("/slideshow/"))
      d.type = "SLIDESHOW: ";
  });
  posts.sort((a, b) => {
    return a.type < b.type ? -1 : a.type > b.type ? 1 : a.i - b.i;
  });
  return { props: { posts } };
}
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  $$result.css.add(css);
  return `<head><title>nyt-reader</title></head>

<div>${each(posts, (post) => {
    return `<div class="${"article " + escape(post.expanded ? "expanded" : "") + " " + escape(post.read ? "read" : "") + " svelte-imjlbl"}"><div class="${"title svelte-imjlbl"}">${escape(post.title)}</div>

    <div class="${"article-expand svelte-imjlbl"}"><p><a${add_attribute("href", post.link, 0)}>${escape(post.byline)} // ${escape(post.section.toUpperCase())}</a></p>

      <!-- HTML_TAG_START -->${post.expanded ? post.html : ""}<!-- HTML_TAG_END --></div>

    <link rel="${"prefetch"}"${add_attribute("href", post.apiLink, 0)}>

  </div>`;
  })}
</div>`;
});
export { Routes as default, load };
