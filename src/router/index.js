import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
{
  path: '/login',
  name: 'Login',
  component: Login,
  beforeEnter(to, from, next) {
    if (store.getters.isAuthenticated)
    {
      next({name: 'Users'});
    }
    next();
  },
  meta: { title: 'Login' }
},
{
  path: '/',
  name: 'Users',
  component: Users,
  meta: { 
    requiresAuth: true ,
    title: 'Users'
  }
},
{
  path: '/user/new',
  name: 'UserNew',
  component: User,
  meta: { 
    requiresAuth: true ,
    title: 'New user'
  }
},
{
  path: '/user/:id',
  name: 'User',
  component: User,
  props: true,
  meta: { 
    requiresAuth: true ,
    title: 'Edit user'
  }
},
{
  path: '*',
  name: 'NotFound',
  component: NotFound,
  meta: { title: '404 Not Found' }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | Emphasoft.test';
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({name: 'Login'});
    }
    else {
      next();
    }
  } 
  else {
    next();
  }
})

export default router
