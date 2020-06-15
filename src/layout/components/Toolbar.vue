<template>
  <div class="fixed bottom-0 mb-4 text-center">
    <div style="width: 700px">
      <div class="rounded bg-white inline-flex justify-center shadow" style="width: 400px">
        <div class="p-3 w-1/5">
          <svg-icon icon-class="password" />
          <div class="mt-2 text-xs">历史版本</div>
        </div>
        <div class="p-3 w-1/5">
          <svg-icon icon-class="password" />
          <div class="mt-2 text-xs">保存</div>
        </div>
        <div class="p-3 w-1/5">
          <svg-icon icon-class="password" />
          <div class="mt-2 text-xs">回退</div>
        </div>
        <div class="p-3 w-1/5">
          <svg-icon icon-class="password" />
          <div class="mt-2 text-xs">恢复</div>
        </div>
        <div class="p-3 w-1/5">
          <svg-icon icon-class="password" />
          <div class="mt-2 text-xs">渲染</div>
        </div>
      </div>

      <div class="flex justify-between items-center mt-2">
        <div>
          <el-button-group>
            <el-button size="mini">2D</el-button>
            <el-button size="mini">3D</el-button>
          </el-button-group>

          <el-button-group>
            <el-button size="mini">2D</el-button>
            <el-button size="mini">3D</el-button>
          </el-button-group>
        </div>

        <el-dropdown>
          <el-button size="mini">
            更多菜单
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <el-button-group>
          <el-button size="mini"><svg-icon icon-class="password" /></el-button>
          <el-button size="mini"><svg-icon icon-class="password" /></el-button>

          <div class="flex items-center px-1">
            <i class="el-icon-zoom-out" @click="value--" />
            <div class=" mx-3">

              <div class="slider" style="width: 100px">
                <el-slider v-model="value" :show-tooltip="false" />
              </div>
            </div>
            <i class="el-icon-zoom-in" @click="value++" />
          </div>

        </el-button-group> -->

        <div class="flex items-center bg-white rounded border" style="padding: 5px; height: 28px">
          <div class="px-1">
            <svg-icon icon-class="password" />
          </div>
          <div class="px-1">
            <svg-icon icon-class="password" />
          </div>
          <div class="flex items-center px-1">
            <i class="el-icon-zoom-out cursor-pointer hover:text-blue-500" @click="value--" />
            <div class=" mx-3">

              <div class="slider" style="width: 100px">
                <el-slider v-model="value" :show-tooltip="false" />
              </div>
            </div>
            <i class="el-icon-zoom-in cursor-pointer hover:text-blue-500" @click="value++" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 50
    }
  }
}
</script>

<style scoped>
.slider >>> .el-slider__runway {
  margin: 0;
}
</style>
