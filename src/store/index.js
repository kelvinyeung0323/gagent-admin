import Vue from 'vue'
import Vuex from 'vuex'
import commonModule from './commonModule';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common:commonModule,
  }
})
