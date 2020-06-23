<template>
  <div>

    <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" class="section" />
  </div>
</template>

<script>
import { constantRoutes } from '@/router'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      constantRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
  .section{
    @apply mt-8;
    &:first-child{
      @apply mt-0
    }
  }

</style>

