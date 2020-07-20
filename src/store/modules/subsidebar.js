// import {
//   login,
//   logout,
//   getInfo
// } from '@/api/user'

import { load, loadMaterial, loadLight, lodalModel } from '@/api/workspace'

const state = {
  categories: [],
  items: [],
  material: null,
  light: null,
  model: null
}

const mutations = {

  SET_ITEMS(state, items) {
    state.items = items
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_MATERIAL(state, material) {
    state.material = material
  },
  SET_LIGHT(state, light) {
    state.light = light
  },
  SET_MODEL(state, model) {
    state.model = model
  }
}

const actions = {

  async loadSubSidebar({ commit }, tab) {
    const { data: { items, categories }} = await load(tab.name)
    commit('SET_ITEMS', items)
    commit('SET_CATEGORIES', categories)
  },
  async loadMaterial({ commit }, id) {
    const { data } = await loadMaterial(id)
    commit('SET_MATERIAL', data)
    // console.log(data)
  },
  setObj({ commit }, obj) {
    const type = `set_${obj.type}`.toUpperCase()
    commit(type, obj.data)
  },
  async loadLight({ commit }, id) {
    const { data } = await loadLight(id)
    commit('SET_LIGHT', data)
    console.log(data)
  },
  async loadModel({
    commit
  }, id) {
    const {
      data
    } = await loadModel(id)
    commit('SET_MODEL', data)

    console.log(data)
  }
}

const getters = {
  categories() {
    return ['全部', ...state.categories]
  },
  items() {
    return state.items
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
