import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: localStorage.getItem('authToken'),
    notificationUser: null
  },
  mutations: {
    login(state, token) {
      state.authToken = token;
    },
    logout(state) {
      state.authToken = null;
    },
    notificationUser(state, notification) {
      state.notificationUser = notification;
    }
  },
  actions: {
    login({commit}, authInfo) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://emphasoft-test-assignment.herokuapp.com/api-token-auth/', 
          method: 'post',
          data: {
            username: authInfo.username,
            password: authInfo.password
          }
        })
        .then( ({ data }) => {
          const token = data.token;
          commit('login', token);
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common['Authorization'] = 'Token ' + token;
          resolve();
        })
        .catch(e => {
          localStorage.removeItem('authToken');
          reject(e.response);
        })
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      })
    },
    notificationUserNew({ commit }) {
      commit('notificationUser', 'New user has been successfully added.');
    },
    notificationUserEdited({ commit }) {
      commit('notificationUser', 'Changes to the user has been successfully saved.');
    },
    closeNotificationUser({ commit }) {
      commit('notificationUser', null);
    }
  },
  getters: {
    isAuthenticated: state => !!state.authToken
  }
})
