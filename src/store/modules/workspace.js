// import {
//   login,
//   logout,
//   getInfo
// } from '@/api/user'

// import { load } from '@/api/workspace'
import * as THREE from 'three'
var loader = new THREE.ObjectLoader()

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
  editing: null,
  scene: null,
  models: [],
  intersect: null,
  transformControls: null
}

const mutations = {
  CHANGE_TAB(state, tab) {
    state.active = tab
  },
  CHANGE_EDITING(state, obj) {
    state.editing = obj
  },
  SET_SCENE(state, scene) {
    state.scene = scene
  },
  ADD_MODEL(state, model) {
    state.models.push(model)
  },
  SET_MODELS(state, models) {
    state.models = models
  },
  SET_INTERSECT(state, intersect) {
    state.intersect = intersect
  },
  SET_TRANSFORMCONTROL(state, control) {
    state.transformControls = control
  }
}

const actions = {
  select({ commit }, tab) {
    commit('CHANGE_TAB', tab)
    commit('CHANGE_EDITING', null)
  },
  edit({
    commit
  }, obj) {
    commit('CHANGE_EDITING', obj)
  },
  setScene({ commit }, scene) {
    commit('SET_SCENE', scene)
  },
  addModelToScene({ commit, state }, model) {
    var loader = new THREE.BufferGeometryLoader()
    var result = loader.parse(model)

    var mesh = new THREE.Mesh(result)
    commit('SET_INTERSECT', mesh)
    commit('ADD_MODEL', mesh)
    commit('SET_SCENE', state.scene.add(mesh))
  },
  setModels({ commit }, models) {
    commit('SET_MODELS', models)
  },
  setIntersect({ commit }, intersect) {
    commit('SET_INTERSECT', intersect)
  },
  setControl({ commit }, control) {
    commit('SET_TRANSFORMCONTROL', control)
  }
}

const getters = {
  editing() {
    return state.editing
  },
  scene() {
    return state.scene
  },
  intersect() {
    return state.intersect
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
