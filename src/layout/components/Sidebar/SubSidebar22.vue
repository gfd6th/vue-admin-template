<template>
  <div class="sub ml-2 h-full " style="padding-top: 100px; padding-bottom: 30px; width:250px">
    <div class="bg-white   h-full rounded p-2 shadow relative">
      <i class="el-icon-circle-close hover:text-blue-600 absolute cursor-pointer text-xl text-secondary" style="right: .5rem" @click="close" />

      <div class="flex items-center mt-8">

        <div class="font-semibold">
          {{ tab.title }}
        </div>
        <div class="ml-auto">
          <i class="el-icon-search text-black hover:text-blue-600 cursor-pointer" />
          <i
            class="el-icon-arrow-left text-black hover:text-blue-600 cursor-pointer"
          />
        </div>
      </div>
      <div class="text-center my-2">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-user-solid"
        >我的材质</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  computed: {
    tab() {
      return this.$store.state.workspace.active
    }
  },
  created() {
    this.loadSubSidebar(this.tab)
  },
  methods: {
    ...mapActions('workspace', ['select', 'loadSubSidebar']),
    close() {
      this.select(null)
    }
  }
}
</script>
<style scoped>

</style>
