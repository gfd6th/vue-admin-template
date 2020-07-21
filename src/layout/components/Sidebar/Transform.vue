<template>

  <ul class="list-none  p-0  bg-white absolute shadow rounded overflow-hidden m-0" style="left: -40px">
    <li :class="{active: active==='translate'}" class="bg-white cursor-pointer p-2 hover:bg-primary  hover:text-white" @click="changeTransform('translate')">
      <i class="el-icon-rank" />
    </li>
    <li :class="{active: active==='rotate'}" class="bg-white cursor-pointer p-2 hover:bg-primary hover:text-white" @click="changeTransform('rotate')">
      <i class="el-icon-refresh" />
    </li>
    <li :class="{active: active==='scale'}" class="bg-white cursor-pointer p-2 hover:bg-primary hover:text-white" @click="changeTransform('scale')">
      <svg-icon icon-class="size" />
    </li>
  </ul>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      active: 'translate'
    }
  },
  computed: {
    transform() {
      return this.$store.state.workspace.transformControls
    }
  },
  methods: {
    changeTransform(type) {
      this.active = type
      this.transform.setMode(type)
    }
  }

}
</script>

<style scoped>
.active{
  @apply bg-primary !important;
  @apply text-white !important;
}

</style>
