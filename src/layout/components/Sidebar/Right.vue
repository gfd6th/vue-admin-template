<template>

  <div class="fixed h-full right-0 mr-4" style="padding-top: 100px; padding-bottom: 30px; width:250px">

    <Transform />
    <div class="bg-white   h-full rounded p-2 shadow">

      <h4>
        {{ title }}
      </h4>
      <div>
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="参数设置" name="attributes">
            <h4>基础参数</h4>
            <el-form :model="size" label-position="top">
              <el-form-item label="X">

                <el-slider v-model="size.x" :show-tooltip="false" :step="0.01" @input="updateMesh" />
                <el-input v-model="size.x" @change="updateMesh" />

              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="材质属性" name="material">222</el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Transform from './Transform'
export default {
  components: { Transform },
  data() {
    return {
      activeName: 'attributes',
      size: {
        x: 1,
        y: 1,
        z: 1
      }
    }
  },
  computed: {
    ...mapGetters('workspace', ['editing', 'intersect']),
    title() {
      return (this.editing | {}).title
    }

  },
  methods: {
    updateMesh() {
      this.intersect.scale.x = this.size.x
    }
  }

}
</script>
