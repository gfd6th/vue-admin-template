<template>
  <div class="sub ml-2 h-full " style="padding-top: 100px; padding-bottom: 30px; width:250px">
    <div id="sub-container" class="bg-white   h-full rounded p-2 shadow relative overflow-hidden">
      <i class="el-icon-circle-close hover:text-blue-600 absolute cursor-pointer text-xl text-secondary" style="right: .5rem" @click="close" />
      <component :is="tab" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Materials from './Materials'
import Lights from './Lights'
export default {
  components: { Materials, Lights },
  computed: {
    tab() {
      return this.$store.state.workspace.active.name
    }

  },

  methods: {
    ...mapActions('workspace', ['select', 'edit']),
    close() {
      this.select(null)
      this.edit(null)
    }
  }
}
</script>
<style scoped>

</style>
