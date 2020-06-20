<template>
  <div class="dialog">
    <el-dialog
      :visible.sync="dialog.show"
      width="80%"
      center
    >

      <div class="text-center">
        <div class="text-6xl" :class="dialog.type === 'success'? 'el-icon-success text-blue-500': 'el-icon-error text-danger '" />
      </div>

      <div class="text-center">
        <h3 class="text-lg">

          {{ dialog.content[0] }}

        </h3>
        <div class="text-lg" v-html="dialog.content[1]" />
        <p class="text-secondary">
          {{ dialog.content[2] }}
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" class="w-32" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('app', ['dialog'])
  },
  methods: {
    ...mapActions('app', ['closeDialog'])
  }
}
</script>

<style scoped>
  @screen sm {

    .dialog >>> .el-dialog {
      width: 30% !important
    }
  }
</style>
