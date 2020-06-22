<template>
  <div>

    <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
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
