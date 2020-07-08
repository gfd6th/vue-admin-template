<template>
  <div>
    <h4 class="title">
      当前进行中
    </h4>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="num"
        label="工单编号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="type"
        label="工单类型"
        width="180"
      />
      <el-table-column
        align="center"
        prop="subtime"
        label="提交时间"
      >
        <template slot-scope="scope">
          {{ scope.row.subtime | format }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="worknum"
        label="客服编号"
      />
      <el-table-column
        align="center"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <div slot-scope="scope">
          <div class="w-1/2 text-right">

            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button>
          </div>
        </div>
      </el-table-column>

    </el-table>

    <el-dialog

      ref="form"
      :show-close="false"
      :visible.sync="show"
      width="50%"
    >
      <div slot="title" class="border-b">
        <h3 class="title">工单详情</h3>
      </div>

      <div class="clearfix">
        <label class="el-form-item__label">
          问题类型: {{ modal.type }}
        </label>
      </div>

      <el-form ref="form" :rules="rules" :model="modal" label-position="top">
        <el-form-item label="问题描述" prop="context">
          <el-input
            v-model="modal.context"
            type="textarea"
            maxlength="500"
            :autosize="{minRows: 5, maxRows: 10 }"
            show-word-limit
          />
        </el-form-item>

        <div>
          <div class="flex -mx-2">

            <el-form-item class="px-2 flex-1" label="向日葵ID" prop="remotemac">
              <el-input
                v-model="modal.remotemac"
              />
            </el-form-item>

            <el-form-item class="px-2 flex-1" label="远程密码" prop="remotecode">
              <el-input
                v-model="modal.remotecode"
              />
            </el-form-item>
          </div>
        </div>

        <div>
          <label class="el-form-item__label">联系方式</label>
          <div class="flex -mx-2">
            <el-form-item class="py-1 px-2 flex-1">
              <el-input
                v-model="modal.telphone"
                disabled
              >
                <div slot="prefix" class="el-input__icon flex items-center">

                  <img src="@/icons/webshouji@2x.png" class="w-5 h-5">
                </div>

              </el-input>
            </el-form-item>

            <el-form-item class="py-1 px-2 flex-1">
              <el-input
                v-model="modal.wx"
                placeholder="您的微信联系方式"
              >
                <div slot="prefix" class="el-input__icon flex items-center">

                  <img src="@/icons/webweixin@2x.png" class="w-5 h-5">
                </div>
              </el-input>
            </el-form-item>
            <el-form-item class="py-1 px-2 flex-1">
              <el-input
                v-model="modal.qq"
                placeholder="您的qq联系方式"
              >
                <div slot="prefix" class="el-input__icon flex items-center">

                  <img src="@/icons/webqq@2x.png" class="w-5 h-5">
                </div>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">

        <el-button type="primary" @click="update">保存</el-button>
        <el-button @click="show = false">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getProcessingList, detail, edit } from '@/api/gongdan'
import moment from 'moment'
export default {
  filters: {
    format(date) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    }
  },
  data() {
    return {
      list: [],
      show: false,
      modal: {},
      rules: {
        context: [
          { required: true, message: '请填写问题详情', trigger: 'blur' }
        ],
        remotemac: [
          { required: true, message: '请填写向日葵ID', trigger: 'blur' }
        ],
        remotecode: [
          { required: true, message: '请填写远程密码', trigger: 'blur' }

        ]

      }
    }
  },
  async created() {
    const { data } = await getProcessingList()
    this.list = data
  },

  methods: {
    async handleEdit(index, row) {
      this.show = true
      const { data } = await detail(row.id)
      this.modal = data
    },
    update() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await edit(this.modal)
          this.show = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
        }
      })
    }
  }
}
</script>
