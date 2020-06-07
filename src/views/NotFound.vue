<template>
  <div class="page_notfound">
    <router-link to="/" class="page_header_logo">Emphasoft.test</router-link>
    <div class="page_notfound_content">
      <h2>Ooops<span>404 The page was not found</span></h2>
    </div>
  </div>
</template>

<style>
  .page_notfound
  {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .page_notfound_content
  {
    display: flex;
    margin: auto;
    padding: 30px 0;
  }
  .page_notfound_content h2
  {
    color: hsla(0, 0%, 0%, .35);
    font-family: var(--font-accent);
    font-size: 70px;
    text-align: center;
  }
  .page_notfound_content h2 span
  {
    display: block;
    font-size: 30px;
    margin-top: 20px;
  }
</style>
