<template>
  <header class="hidden sm:block bg-white shadow py-6 fixed top-0 w-full z-10">
    <div class=" container">
      <div class=" flex items-center -mx-4">

        <div class=" divide-x-2 flex items-center">

          <img src="@/assets/logo@2x.png" alt="" class="w-56 pr-4">
          <span class="text-xl px-4 font-medium text-gray-700">售后工单系统</span>
        </div>
        <div class="ml-auto">
          <span class="mr-2 text-secondary">
            {{ name | secret }}
          </span>
          <el-button @click="logoutThenToLoginPage">
            退出登录
          </el-button>
        </div>
      </div>
    </div>
  </header>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { getInfo } from '@/utils/auth'
export default {
  filters: {
    secret(phone) {
      return phone.slice(0, 3) + '****' + phone.slice(6, -1)
      // return '***'
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    async logoutThenToLoginPage() {
      await this.logout()
      this.$router.replace('/login')
    }
  },
  computed: {
    ...mapGetters(['name'])
  }

}
</script>
