<script>
    import { page } from '$app/stores';
    let feed = ''

    page.subscribe(page => {
      feed = page.url.searchParams.get('feed') || 'recent'
    })
</script>

<nav>
  <ul>
    <li><a rel=prefetch class='{feed === "recent"  ? "selected" : ""}' href='/?feed=recent'>Most Recent</a></li>

    <li><a rel=prefetch class='{feed === "homepage"  ? "selected" : ""}' href='/?feed=homepage'>Homepage</a></li>

    <li><a rel=prefetch class='{feed === "popular"  ? "selected" : ""}' href='/?feed=popular'>Popular</a></li>
    
    <li><img id='t-logo' src='/t.png' alt='t-logo'></li>
  </ul>
</nav>

<slot></slot>

<style>
  nav {
    /*border-bottom: 1px solid rgba(170,30,30,0.1);*/
    font-weight: 300;
    /*color: #fff;*/
    background: #000;
  }

  ul {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    font-weight: 400;
    font-size: 18px;
    /*width: 200px;*/
  }

  li a.selected {
    position: relative;
    display: inline-block;
    /*color: #fff;*/
    z-index: 100;
    /*font-weight: 400;*/
    /*opacity: 1 !important;*/
    /*text-decoration: underline;*/
  }

  .selected::before {
    position: absolute;
    content: '';
    width: calc(100% + 10px);
    height: 2px;
    background-color: #F48A1F;
    display: block;
    bottom: -8px;
    left: -5px;
    z-index: -10;
  }

  a {
    text-decoration: none;
    margin: 1em 5px;
    margin-right: 1em;
    display: block;
  }

  @media (min-width: 750px) {
    li{
      font-size: 22px;
    }
    
    .selected::before {
      width: calc(100% + 20px);
      left: -10px;
    }

    a {
      margin: 1em 10px;
    }

  }

</style>