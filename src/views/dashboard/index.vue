<template>
  <el-form ref="form" :rules="rules" :model="form" label-position="top" class="bg-gray container md:bg-white md:mx-auto rounded md:p-4">
    <div class="mx-auto px-3 md:w-1/2">
      <div class="card shadow md:shadow-none">
        <h3 class="title m-0">
          工单信息
        </h3>
        <el-form-item label="问题类型" class="mt-4" prop="tid">
          <el-select v-model="form.tid" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in options"
              :key="item.tid"
              :label="item.name"
              :value="item.tid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="问题描述" prop="context">
          <el-input
            v-model="form.context"
            type="textarea"
            maxlength="500"
            :autosize="{minRows: 5, maxRows: 10 }"
            show-word-limit
          />
        </el-form-item>
      </div>

      <div class="card mt-3 shadow md:shadow-none">
        <h3 class="title m-0">
          远程连接
        </h3>

        <div class="md:flex md:-mx-2">

          <el-form-item class="md:px-2 flex-1" label="向日葵ID" prop="remotemac">
            <el-input
              v-model="form.remotemac"
            />
          </el-form-item>

          <el-form-item class="md:px-2 flex-1" label="远程密码" prop="remotecode">
            <el-input
              v-model="form.remotecode"
            />
          </el-form-item>
        </div>

        <el-form-item>
          <div class="flex justify-between">
            <div class="label">
              下载地址
            </div>
            <div class="flex items-center cursor-pointer" @click="handleCopy('https://sunlogin.oray.com/personal/download/', $event)">
              <span class="label">
                复制地址:
              </span>
              <img src="@/icons/webfuzhidizhi@2x.png" class="w-5 h-5 ml-2" alt="">
            </div>
          </div>
          <el-input
            value="https://sunlogin.oray.com/personal/download/"
            disabled
          />
        </el-form-item>

      </div>

      <div class="card mt-3 shadow md:shadow-none">
        <h3 class="title m-0 mb-4">
          联系方式
        </h3>

        <div class="md:flex md:-mx-2">
          <el-form-item class="py-1 md:px-2">
            <el-input
              v-model="form.telphone"
              disabled
            >
              <div slot="prefix" class="el-input__icon flex items-center">

                <img src="@/icons/webshouji@2x.png" class="w-5 h-5">
              </div>

            </el-input>
          </el-form-item>

          <el-form-item class="py-1 md:px-2">
            <el-input
              v-model="form.wx"
              placeholder="您的微信联系方式"
            >
              <div slot="prefix" class="el-input__icon flex items-center">

                <img src="@/icons/webweixin@2x.png" class="w-5 h-5">
              </div>
            </el-input>
          </el-form-item>
          <el-form-item class="py-1 md:px-2">
            <el-input
              v-model="form.qq"
              placeholder="您的qq联系方式"
            >
              <div slot="prefix" class="el-input__icon flex items-center">

                <img src="@/icons/webqq@2x.png" class="w-5 h-5">
              </div>
            </el-input>
          </el-form-item>
        </div>

      </div>

      <div class="my-8 md:px-3  ">

        <el-button type="primary" class="w-full" :loading="submiting" @click="submit">
          提交
        </el-button>
      </div>
    </div>

  </el-form>
</template>

<script>
import request from '@/utils/request'
import clip from '@/utils/clipboard' // use clipboard directly
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      options: [],
      submiting: false,
      form: {
        telphone: '',
        tid: '',
        context: '',
        remotemac: '',
        remotecode: '',
        qq: '',
        wx: ''
      },
      rules: {

        tid: [
          { required: true, message: '请选择问题类型', trigger: 'change' }
        ],
        context: [
          { required: true, message: '请填写问题详情', trigger: 'blur' }
        ],
        remotemac: [
          { required: true, message: '请填写向日葵ID', trigger: 'blur' }
        ],
        remotecode: [
          { required: true, message: '请填写远程密码', trigger: 'blur' }

        ]
        // qq: '',
        // wx: ''
      }
    }
  },
  async created() {
    const { data: { list, phone }} = await request({
      url: '/user/baseinfo',
      method: 'get'
    })
    this.options = list
    this.form.telphone = phone
  },
  methods: {
    ...mapActions('app', ['showDialog']),
    handleCopy(text, event) {
      clip(text, event)
    },
    async submit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          this.submiting = true
          try {
            const { data: { type, value }} = await this.submitForm()
            if (type === 0) {
              // 工单已提交成功，预计15分钟内与您联系
              this.showDialog({
                type: 'success',
                content: [
                  '提交成功，请耐心等待',
                  `预计等待时间：<span class="text-primary">${value}</span>`,
                  '如需一对一专人售后，请咨询售后人员'
                ]
              })
            } else {
              // 售后作息时间为 8.30 至 21:00 ，您的工单已提交成功，工作人员将隔日处理
              this.showDialog({
                type: 'success',
                content: [
                  '提交成功，当前无售后人员值岗',
                  `工作时间：8：30—21：00<br> 我们将第一时间与您取得联系`,
                  '如需一对一专人售后，请咨询售后人员'
                ]
              })
            }
          } catch (e) {
            console.log(e)
            this.showDialog({
              type: 'error',
              content: [
                '提交失败，您的上个工单正在进行中',
                '请您完成当前工单后再进行提交',
                '如需一对一专人售后，请咨询售后人员'
              ]
            })
          }
        } else {
          console.log('error submit!!')
        }
        this.submiting = false
      })
    },
    async submitForm() {
      return await request({
        url: '/user/submit',
        method: 'post',
        data: this.form
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .card{
    @apply p-3 bg-white rounded
  }
  .title::before{
    content: "";
    @apply .pl-1 .bg-blue-500 .mr-2

  }
  .container >>> .el-form-item__label{
    @apply p-0
  }
  .container >>> .el-form-item{
    @apply my-2
  }
  .label{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    font-weight: 700;
  }
</style>

