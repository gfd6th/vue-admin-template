<template>
  <div class="fixed h-full flex items-center px-4">
    <div class="bg-white rounded shadow overflow-hidden">
      <!-- <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          户型库
        </div>
      </div>
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          素材库
        </div>
      </div>
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          灯光库
        </div>
      </div>
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          几何库
        </div>
      </div> -->
      <div v-for="item in left_menu" :key="item.name" class="item text-center p-3 cursor-pointer" :class="{active: active === item}" @click="handleClickMenu(item)">
        <div class="icon">

          <svg-icon :icon-class="item.icon || 'password'" />
        </div>
        <div class="mt-2 text-xs">
          {{ item.title }}
        </div>
      </div>
    </div>
    <SubSidebar v-if="active" />
  </div>
</template>

<script>
import SubSidebar from './SubSidebar'

import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  components: { SubSidebar },
  computed: {
    ...mapGetters(['left_menu']),
    active() {
      return this.$store.state.workspace.active
    }
  },
  methods: {
    ...mapActions('workspace', ['select']),
    handleClickMenu(tab) {
      this.select(tab)
    }
  }
}
</script>

<style lang="scss" scoped>
  .item{
    &.active, &:hover{
      @apply bg-primary;
      .icon, div{
        @apply text-white
      }
    }

  }

</style>
