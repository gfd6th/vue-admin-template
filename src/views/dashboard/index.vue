<template>
  <div class="bg-gray md:bg-white md:mx-auto  md:p-4 rounded ">
    <div class="flex items-center justify-between border-b pb-2">
      <h3>我的售后工单</h3>
      <div>
        <el-button
          type="primary"
          @click="handleNavTo({'url' :'/create'})"
        >
          <i class="el-icon-plus el-icon--left" />提交新工单</el-button>
      </div>
    </div>
    <Processing />
    <History />
  </div>

</template>

<script>
import Processing from '@/layout/components/Gongdan/Processing'
import History from '@/layout/components/Gongdan/History'

export default {
  components: { Processing, History }
}
</script>

