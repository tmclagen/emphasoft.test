<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Roboto&display=swap');

:root
{
  --font-accent: 'Nunito', sans-serif;
  --font-body: 'Roboto', sans-serif;
  --color-accent: hsl(240, 50%, 60%);
  --color-accent-down: hsl(240, 50%, 50%);
  --color-error: hsl(0, 65%, 55%);
  --color-success: hsl(150, 50%, 50%);
}
body
{
  font-family: var(--font-body);
}
#app
{
  box-sizing: border-box;
  display: flex;
  min-height: 100vh;
  padding: 30px;
}
h1
{
  color: var(--color-accent);
  font-family: var(--font-accent);
  font-size: 50px;
  text-align: center;
}

.form_block:not(:first-child)
{
  margin-top: 30px;
}
.form_notification
{
  align-items: center;
  border-radius: 25px;
  box-sizing: border-box;
  display: flex;
  line-height: 1.5em;
  min-height: 50px;
  padding: 15px 30px;
}
.form_notification.is-error
{
  background-color: var(--color-error);
  color: #fff;
}
.form_notification.is-success
{
  background-color: var(--color-success);
  color: #fff;
}
.form_input
{
  display: block;
}
.form_input_title
{
  color: hsla(0, 0%, 0%, .5);
  font-family: var(--font-accent);
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}
.form_input input
{
  background-color: hsla(0, 0%, 0%, .05);
  border: 2px solid transparent;
  border-radius: 25px;
  box-sizing: border-box;
  display: block;
  font-family: inherit;
  font-size: 1rem;
  height: 50px;
  outline: none;
  padding: 0 30px;
  transition: 85ms ease-out;
  width: 100%;
}
.form_input:focus-within input,
.form_input input:focus
{
  border-color: var(--color-accent);
}
.form_input.is-error input,
.form_input.is-error:focus-within input,
.form_input.is-error input:focus
{
  border-color: var(--color-error);
}
.form_input_error
{
  align-items: center;
  background-color: var(--color-error);
  border-radius: 25px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  line-height: 1.5em;
  margin-top: 5px;
  padding: 5px 30px;
}

.bttn_group
{
  display: flex;
}
.bttn_group-center
{
  justify-content: center;
}
.bttn
{
  appearance: none;
  border: none;
  border-radius: 25px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-family: var(--font-accent);
  font-weight: 600;
  height: 50px;
  letter-spacing: .025em;
  outline: none;
  padding: 0 50px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 85ms ease-out;
}
.bttn-primary
{
  background-color: var(--color-accent);
  color: #fff;
}
.bttn-primary:hover,
.bttn-primary:focus
{
  background-color: var(--color-accent-down);
}

@media screen and (max-width: 500px) 
{
  h1
  {
    font-size: 35px;
  }
}
@media screen and (max-width: 400px)
{
  #app
  {
    padding: 15px;
  }
  .bttn
  {
    width: 100%;
  }
}
</style>
