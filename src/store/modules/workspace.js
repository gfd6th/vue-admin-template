// import {
//   login,
//   logout,
//   getInfo
// } from '@/api/user'

import { load } from '@/api/workspace'

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
  active: '素材库',
  menu,
  lists: []

}

const mutations = {
  CHANGE_TAB(state, name) {
    state.active = name
  },
  SET_LISTS(state, lists) {
    state.lists = lists
  }
}

const actions = {
  async select({ commit }, tab) {
    commit('CHANGE_TAB', tab.title)
    const lists = await load(tab.name)
    commit('SET_LISTS', lists)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
