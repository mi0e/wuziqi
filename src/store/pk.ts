import { createStore } from 'vuex'

export default {
  state: {
    gameObject: null
  },
  getters: {
  },
  mutations: {
    updateGameObject (state: any, gameObject: any) {
      state.gameObject = gameObject
    }
  },
  actions: {

  },
  modules: {
  }
}
