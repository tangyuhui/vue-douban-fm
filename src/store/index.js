import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  isPlaying: true,
  curMusic:null,
  curTime: 0,
  duration: 0
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
