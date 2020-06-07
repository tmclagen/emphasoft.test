import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const token = localStorage.getItem('authToken');
if(token)
{
  axios.defaults.headers.common['Authorization'] = 'Token ' + token;
}

Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
