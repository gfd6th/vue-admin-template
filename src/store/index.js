import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters: {
    ...getters,
    loading(state) {
      return state.loading || {}
    }
  },
  state: {
    loading: null,
    toast: null
  },
  actions: {
    async makeToast({
      commit
    }, options) {
      commit('setToast', {
        ...(typeof options === 'string'
          ? {
            title: options
          }
          : options)
      })
    },
    async toggleLoading({
      state,
      commit
    }, {
      key,
      loading
    }) {
      if (typeof loading === 'function') {
        try {
          commit('setLoading', {
            ...state.loading,
            [key]: true
          })
          return await loading()
        } finally {
          commit('setLoading', {
            ...state.loading,
            [key]: false
          })
        }
      } else {
        commit('setLoading', {
          ...state.loading,
          [key]: typeof loading === 'boolean' ? loading : !state.loading[key]
        })
      }
    }
  },
  mutations: {
    clean(state) {
      // 递归模块清除state
      const clean = (_store, _state) => {
        const modules = Object.keys(_store.modules || {})
        const states = Object.keys(_state || {})
        states.map(stateName => {
          if (!modules.includes(stateName)) {
            _state[stateName] = null
          }
        })

        modules.map(moduleName => {
          clean(_store.modules[moduleName], _state[moduleName])
        })
      }
      clean(store, state)
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setToast(state, toast) {
      state.toast = toast
    }

  }
})

export default store
