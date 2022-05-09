import { g as getContext, c as create_ssr_component, e as escape, n as null_to_empty } from "../../chunks/index-d6e6373c.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "nav.svelte-1n6j7uc.svelte-1n6j7uc{font-weight:300;background:#000}ul.svelte-1n6j7uc.svelte-1n6j7uc{margin:0;padding:0;text-align:center}ul.svelte-1n6j7uc.svelte-1n6j7uc::after{content:'';display:block;clear:both}li.svelte-1n6j7uc.svelte-1n6j7uc{display:block;float:left;font-weight:400;font-size:18px}li.svelte-1n6j7uc a.selected.svelte-1n6j7uc{position:relative;display:inline-block;z-index:100}.selected.svelte-1n6j7uc.svelte-1n6j7uc::before{position:absolute;content:'';width:calc(100% + 10px);height:2px;background-color:#F48A1F;display:block;bottom:-8px;left:-5px;z-index:-10}a.svelte-1n6j7uc.svelte-1n6j7uc{text-decoration:none;margin:1em 5px;margin-right:1em;display:block}@media(min-width: 750px){li.svelte-1n6j7uc.svelte-1n6j7uc{font-size:22px}.selected.svelte-1n6j7uc.svelte-1n6j7uc::before{width:calc(100% + 20px);left:-10px}a.svelte-1n6j7uc.svelte-1n6j7uc{margin:1em 10px}}",
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let feed = "";
  page.subscribe((page2) => {
    feed = page2.url.searchParams.get("feed") || "recent";
  });
  $$result.css.add(css);
  return `<nav class="${"svelte-1n6j7uc"}"><ul class="${"svelte-1n6j7uc"}"><li class="${"svelte-1n6j7uc"}"><a rel="${"prefetch"}" class="${escape(null_to_empty(feed === "recent" ? "selected" : "")) + " svelte-1n6j7uc"}" href="${"/?feed=recent"}">Most Recent</a></li>

    <li class="${"svelte-1n6j7uc"}"><a rel="${"prefetch"}" class="${escape(null_to_empty(feed === "homepage" ? "selected" : "")) + " svelte-1n6j7uc"}" href="${"/?feed=homepage"}">Homepage</a></li>

    <li class="${"svelte-1n6j7uc"}"><a rel="${"prefetch"}" class="${escape(null_to_empty(feed === "popular" ? "selected" : "")) + " svelte-1n6j7uc"}" href="${"/?feed=popular"}">Popular</a></li>
    
    <li class="${"svelte-1n6j7uc"}"><img id="${"t-logo"}" src="${"/t.png"}" alt="${"t-logo"}"></li></ul></nav>

${slots.default ? slots.default({}) : ``}`;
});
export { _layout as default };
