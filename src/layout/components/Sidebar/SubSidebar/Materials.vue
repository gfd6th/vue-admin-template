<template>
  <div class="overflow-hidden">
    <div ref="upper">

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

      <ul class="list-none flex border-b  px-1 flex-wrap pb-4">

        <li v-for="category in categories" :key="category" class="text-xs p-1 category" :class="{active: category === active}">
          <el-link :underline="false" @click="active=category">{{ category }}</el-link>
        </li>
      </ul>
    </div>

    <!-- <div  class="overflow-hidden"> -->

    <PerfectScrollbar
      ref="scroller"

      class="list-none px-0 flex flex-wrap overflow-auto relative"
      tag="ul"
      :style="{height: height + 'px'}"
    >

      <li v-for="item in filterdItems" :key="item.id" class="w-1/2 text-center mb-4 cursor-pointer" :class="{selected: item.id===materialId}" @click="getMaterial(item)">

        <img style="width: 100px" :src="item.image" alt="" class="border w-full object-center object-none">

        <div class="text-xs text-primary title">
          {{ item.title }}
        </div>
      </li>

    </PerfectScrollbar>
    <!-- </div> -->

  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
export default {
  components: { PerfectScrollbar },
  data() {
    return {
      active: '全部',
      height: null,
      materialId: null
    }
  },
  computed: {
    ...mapGetters('subsidebar', ['categories', 'items', 'material']),
    tab() {
      return this.$store.state.workspace.active
    },
    filterdItems() {
      if (this.active === '全部') {
        return this.items
      } else {
        return this.items.filter(item => {
          return item.category === this.active
        })
      }
    }

  },
  async mounted() {
    await this.loadSubSidebar(this.tab)
    this.setScrollerHeight()

    window.addEventListener('resize', this.setScrollerHeight)
    this.$once('hook:beforeDestory', () => {
      window.removeEventListener('resize', this.setScrollerHeight)
    })
  },
  destroyed() {
    console.log('destory mat')
  },

  methods: {
    ...mapActions('subsidebar', ['loadSubSidebar', 'loadMaterial', 'setObj']),
    ...mapActions('workspace', ['edit', 'addModelToScene']),
    setScrollerHeight() {
      this.height = document.getElementById('sub-container').clientHeight - this.$refs.upper.clientHeight - 64
    },
    async getMaterial(item) {
      await this.loadMaterial(item.id)
      this.materialId = item.id
      this.edit(this.material)
      this.addModelToScene(this.material.three)
    }
  }
}
</script>
<style scoped>
.active >>> .el-link--inner{
  @apply text-blue-400 !important;
  @apply cursor-default
}
.category >>> .el-link--inner{
  @apply text-secondary;

}
.category >>> .el-link--inner:hover{
  @apply text-blue-400;
}
.selected .title {
  @apply text-blue-500
}

</style>
