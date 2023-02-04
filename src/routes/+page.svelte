<script>
  import { onMount } from 'svelte'

  export let posts

  function toggle(post){
    window.localStorage.setItem(post.key, new Date().toISOString())

    post.expanded = !post.expanded
    post.read = true

    posts = posts.slice()

    const node = event.target
    const isAbove = node.parentNode.getBoundingClientRect().top < 0
    if (isAbove && !post.expanded){
      setTimeout(() => node.scrollIntoView(true), 0)
    }
  }

  if (typeof window == 'undefined'){
    onMount(decoratePosts)
  } else{
    decoratePosts()
  }
  

  function decoratePosts(){
    posts.forEach(post => {
      post.key = post.link.split('.com')[1].split('.html')[0]
      post.read = window.localStorage.getItem(post.key)
    })

    posts.forEach(async post => {
      fetch(post.apiLink).then(r => r.text()).then(html => {
        post.html = html
        posts = posts.slice()
      })
    })
  }



</script>


<head>
  <title>nyt-reader</title>
</head>

<div>
  {#each posts as post (post.title)}
  <div class='article {post.expanded ? "expanded" : ""} {post.read ? "read" : ""}'>
    <div class='title' on:click='{() => toggle(post)}'>
      {post.title}
    </div>

    <div class='article-expand'>
      <p>
        <a href='{post.link}'>{post.byline} // {post.section.toUpperCase()}</a>
      </p>

      {@html post.expanded ? post.html : ''}
    </div>

    <link rel='prefetch' href='{post.apiLink}'>

  </div>
  {/each}
</div>




<style>
  .article {
    position: relative;
  }

  .title{
    padding: 5px;
    background: #000;
    padding-bottom: 5px;
    padding-top: 5px;
    font-size: 16px;
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    cursor: pointer;
    border-top: 1px solid #888;
  }
  .article:first-child .title{
    border-top: 0px solid #888;
  }
  .read .title{
    background: #222;
  }

  .article-expand{
    display: none;
    padding: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-top: 1px;
    font-weight: 300;
  }

  .expanded .article-expand{
    display: block;
    background: #111;
  }

  @media (min-width: 750px) {
    .title {
      font-size: 18px;
      padding: 10px;
    }
    .article-expand {
      font-size: 16px;
      padding: 10px;
      padding-top: 1px;
    }
  }

</style>