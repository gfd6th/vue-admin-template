<template>

  <div class="fixed h-full right-0 mr-4" style="padding-top: 100px; padding-bottom: 30px; width:250px">

    <Transform />

    <div ref="container" class="bg-white relative   h-full rounded p-2 shadow">

      <h4>
        {{ title }}
      </h4>

      <PerfectScrollbar
        ref="scroller"
        class="overflow-auto relative"
        tag="div"
        :style="{height: height + 'px'}"
      >

        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="参数设置" name="attributes">
            <h4>基础参数</h4>
            <div>
              尺寸
            </div>
            <div class="flex mt-2">
              <div class="w-1/3 text-center">
                <div class="mb-2">X</div>
                <scrubber-input v-model="size.x" class="border rounded w-16" :min="0" :max="100" :steps="0.01" />
              </div>
              <div class="w-1/3 text-center">
                <div class="mb-2">Y</div>
                <scrubber-input v-model="size.y" class="border rounded w-16" :min="0" :max="100" :steps="0.01" />
              </div>
              <div class="w-1/3 text-center">
                <div class="mb-2">Z</div>
                <scrubber-input v-model="size.z" class="border rounded w-16" :min="0" :max="100" :steps="0.01" />
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="材质属性" name="material">
            <MaterialEditor />
          </el-tab-pane>

        </el-tabs>
      </PerfectScrollbar>
      <div class="text-center absolute w-full bottom-0 pb-4">
        <el-button>重置</el-button>
        <el-button type="danger" @click="remove">删除</el-button>
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Transform from './Transform'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import ScrubberInput from '@/components/ScrubberInput'
import MaterialEditor from '@/components/MaterialEditor'

export default {
  components: { Transform, PerfectScrollbar, ScrubberInput, MaterialEditor },
  data() {
    return {
      activeName: 'attributes',
      height: null
      // size2: {
      //   x: 1,
      //   y: 1,
      //   z: 1
      // }
    }
  },
  mounted() {
    this.setScrollerHeight()

    window.addEventListener('resize', this.setScrollerHeight)
  },
  beforeDestroy() {
    console.log(111)
    window.removeEventListener('resize', this.setScrollerHeight)
  },
  computed: {
    ...mapGetters('workspace', ['editing', 'intersect', 'models', 'scene']),

    title() {
      return (this.editing | {}).title
    },
    size() {
      return this.intersect.scale
    }

  },
  methods: {
    ...mapActions('workspace', ['setIntersect', 'setModels']),
    input() {
      console.log(2)
    },
    updateMesh() {
      this.intersect.scale.x = this.size.x
      this.intersect.scale.y = this.size.y
      this.intersect.scale.z = this.size.z
    },
    setScrollerHeight() {
      this.height = this.$refs.container.clientHeight - 100
    },
    remove() {
      console.log('remove')

      this.intersect.traverse((obj) => {
        obj.type === 'Mesh' && obj.geometry.dispose()
      }
      )
      // this.removeMat()

      this.setModels(this.models.filter(model => this.intersect.uuid !== model.uuid))
      this.scene.remove(this.intersect)
      this.setIntersect(null)
    }

  }

}
</script>
