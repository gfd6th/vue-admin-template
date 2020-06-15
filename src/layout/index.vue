<template>
  <div>

    <Navbar class="fixed top-0 w-full bg-white" style="height:75px" />

    <Sidebar class="absolute-y-center z-10" />
    <Right class="absolute-y-center z-10" />
    <Toolbar class="z-10 absolute-x-center" />

    <div style="padding-top: 75px" class="bg-gray-100">

      <app-main />

    </div>

  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Right, Toolbar } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Right,
    Toolbar
  },

  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    }

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

