import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  dialog: {
    type: '',
    content: [
      // '提交成功，请耐心等待',
      // `预计等待时间：<span class="text-blue-500">2</span>`,
      // '如需一对一专人售后，请咨询售后人员'
    ],
    show: false
  }
}

const mutations = {
  SHOW_DIALOG: (state, {
    type = 'success',
    content
  }) => {
    // eslint-disable-next-line no-sequences
    state.dialog.show = true,
    state.dialog.type = type,
    state.dialog.content = content
  },
  CLOSE_DIALOG: (state) => {
    state.dialog.show = false
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  showDialog({ commit }, data) {
    commit('SHOW_DIALOG', data)
  },
  closeDialog({ commit }) {
    commit('CLOSE_DIALOG')
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
