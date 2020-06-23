import Vue from 'vue'

import {
  mapGetters,
  mapActions
} from 'vuex'

Vue.mixin({

  computed: {
    ...mapGetters({
      myLoading: 'loading'
    })
  },

  methods: {
    ...mapActions([
      'makeToast', // toast提示 (showToast已被被设定为关键字))
      'toggleLoading' // 切换loading状态
    ]),

    // 跳转封装
    handleNavTo({
      url,
      type = 'push'
    }) {
      console.log(url)
      this.$router[type](url)
    }

  }
})
