<template>
  <div>
    <div v-if="!material.type" class="flex items-center">

      <div class="mr-2" style="width: 50px">类型</div>
      <el-select v-model="type" placeholder="请选择类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div />
    <Material v-model="material" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Material from './Material'
export default {
  components: { Material },
  data() {
    return {
      type: null,
      options: [
        {
          value: 'MeshBasicMaterial',
          label: 'MeshBasicMaterial'
        },
        {
          value: 'LineBasicMaterial',
          label: 'LineBasicMaterial'
        },
        {
          value: 'LineDashedMaterial',
          label: 'LineDashedMaterial'
        },
        {
          value: 'MeshDepthMaterial',
          label: 'MeshDepthMaterial'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('workspace', ['intersect']),
    material() {
      return this.intersect.material
    }
  }
}
</script>
