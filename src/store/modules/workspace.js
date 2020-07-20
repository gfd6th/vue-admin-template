// import {
//   login,
//   logout,
//   getInfo
// } from '@/api/user'

// import { load } from '@/api/workspace'

const menu = [{
  title: '素材库',
  name: 'materials',
  icon: ''
},
{
  title: '灯光库',
  name: 'lights',
  icon: ''
},
{
  title: '模型库',
  name: 'models',
  icon: ''
}

]

const state = {
  active: null,
  menu,
  editing: null
}

const mutations = {
  CHANGE_TAB(state, tab) {
    state.active = tab
  },
  CHANGE_EDITING(state, obj) {
    state.editing = obj
  }

}

const actions = {
  select({ commit }, tab) {
    commit('CHANGE_TAB', tab)
  },
  edit({
    commit
  }, obj) {
    commit('CHANGE_EDITING', obj)
  }

}

const getters = {
  editing() {
    return state.editing
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
