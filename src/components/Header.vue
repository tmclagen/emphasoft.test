<template>
  <header class="page_header">
    <router-link to="/" class="page_header_logo">Emphasoft.test</router-link>
    <nav @click="closeNav" ref="nav" class="page_header_nav" :class="{'is-visible': navToggle}">
      <router-link class="page_header_nav_item" to="/">Users</router-link>
      <router-link class="page_header_nav_item page_header_nav_newUser" :to="{name: 'UserNew'}">New user</router-link>
      <button @click="logout" class="page_header_nav_item page_header_nav_logout">
        <app-icon icon="mdLogout"></app-icon>
      </button>
    </nav>
    <button @click="navToggle = !navToggle" :class="{'is-active': navToggle}" class="page_header_nav_toggle"></button>
  </header>
</template>

<script>
import AppIcon from '@/components/Icons.vue'

export default {
  data() {
    return {
      navToggle: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({name: 'Login'});
        })
    },
    closeNav($event) {
      if(!$event.target.closest('.page_header_nav_item'))
      {
        this.navToggle = false;
      }
    }
  },
  components: {
    AppIcon
  }
}
</script>

<style>
.page_header_logo
{
  border-bottom: 2px solid transparent;
  color: var(--color-accent);
  font-family: var(--font-accent);
  font-size: 20px;
  font-weight: 600;
  outline: none;
  padding: 5px 0;
  text-decoration: none;
  transition: 75ms ease-out;
}
.page_header_logo:focus
{
  border-color: currentColor;
}
.page_header
{
  align-items: center;
  display: flex;
  margin-bottom: 30px;
  padding-bottom: 30px;
}
.page_header_nav
{
  align-items: center;
  display: flex;
  margin-left: auto;
}
.page_header_nav_item
{
  border-bottom: 2px solid transparent;
  color: hsla(0, 0%, 0%, .5);
  display: block;
  flex-shrink: 0;
  margin-left: 30px;
  outline: none;
  padding: 5px 0;
  text-decoration: none;
  transition: 75ms ease-out;
}
.page_header_nav_item:not(.page_header_nav_newUser):not(.page_header_nav_logout):hover,
.page_header_nav_item:not(.page_header_nav_newUser):not(.page_header_nav_logout):focus
{
  color: var(--color-accent-down);
  border-color: currentColor;
}
.page_header_nav_logout
{
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  fill: currentColor;
  height: 44px;
  margin-left: 15px;
  opacity: .25;
  outline: none;
  padding: 10px;
  transition: 75ms ease-out;
  width: 44px;
}
.page_header_nav_logout:hover,
.page_header_nav_logout:focus
{
  color: var(--color-accent);
  opacity: 1;
}
.page_header_nav_logout svg
{
  height: 100%;
  width: 100%;
}
.page_header_nav_newUser
{
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
  border-radius: 25px;
  box-sizing: border-box;
  padding: 10px 15px;
  transition: 75ms ease-out;
}
.page_header_nav_newUser:hover,
.page_header_nav_newUser:focus
{
  background-color: var(--color-accent);
  color: #fff;
}

.page_header_nav_toggle
{
  appearance: none;
  background: none;
  border: none;
  color: hsla(0, 0%, 0%, .25);
  display: none;
  flex-shrink: 0;
  height: 24px;
  margin-left: auto;
  outline: none;
  padding: 0;
  position: relative;
  width: 24px;
  z-index: 10;
}
.page_header_nav_toggle:hover,
.page_header_nav_toggle:focus
{
  color: var(--color-accent);
}
.page_header_nav_toggle.is-active
{
  color: #fff;
  right: 30px;
  position: fixed;
  top: 34px;
}
.page_header_nav_toggle::before,
.page_header_nav_toggle::after
{
  background-color: currentColor;;
  content: '';
  display: block;
  height: 2px;
  position: absolute;
  transition: 75ms ease-out;
  width: 100%;
}
.page_header_nav_toggle::before
{
  top: 5px;
  transform-origin: center right;
}
.page_header_nav_toggle::after
{
  bottom: 5px;
  transform-origin: center right;
}
.page_header_nav_toggle.is-active::before
{
  transform: translate(-3px, -3px) rotate(-45deg);
}
.page_header_nav_toggle.is-active::after
{
  transform: translate(-3px, 2px) rotate(45deg);
}
@media screen and (max-width: 500px)
{
  .page_header_nav_toggle
  {
    display: block;
  }
  .page_header_nav
  {
    background-color: var(--color-accent);
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    transition: .1s ease-out;
    visibility: hidden;
    width: 100%;
    z-index: 5;
  }
  .page_header_nav.is-visible
  {
    opacity: 1;
    visibility: visible;
  }
  .page_header_nav_newUser
  {
    border-color: #fff;
  }
  .page_header_nav_newUser:hover,
  .page_header_nav_newUser:focus
  {
    background-color: #fff;
    color: var(--color-accent);
  }
  .page_header_nav_item
  {
    color: #fff;
    margin: 10px 0;
  }
  .page_header_nav_item:not(.page_header_nav_newUser):not(.page_header_nav_logout):hover, 
  .page_header_nav_item:not(.page_header_nav_newUser):not(.page_header_nav_logout):focus
  {
    color: #fff;
  }
  .page_header_nav_logout:hover, 
  .page_header_nav_logout:focus
  {
    color: #fff;
  }
}
@media screen and (max-width: 400px)
{
  .page_header_nav_toggle.is-active
  {
    right: 15px;
    top: 19px;
  }
}
</style>