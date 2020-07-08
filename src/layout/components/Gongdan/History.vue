<template>
  <div>
    <h4 class="title">
      历史工单
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
        prop="overtime"
        label="完成时间"
      >
        <template slot-scope="scope">
          {{ scope.row.overtime | format }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="worknum"
        label="客服编号"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <div slot-scope="scope" class="flex">
          <div class="w-1/2 text-right">

            <el-button

              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button>
          </div>
          <div class="w-1/2 text-left pl-4">

            <el-button

              size="mini"
              type="text"
              @click="handleRating(scope.$index, scope.row)"
            >{{ scope.row.score === null? '评分' : '已评分' }}</el-button>
          </div>
        </div>
      </el-table-column>
    </el-table>

    <div class="text-center py-8">

      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pageCount"
        hide-on-single-page
        @current-change="onChange"
        @prev-click="onPrev"
        @next-click="onNext"
      />
    </div>

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

      <el-form ref="form" :model="modal" label-position="top">
        <el-form-item label="问题描述" prop="context">
          <el-input
            v-model="modal.context"
            type="textarea"
            maxlength="500"
            disabled
            :autosize="{minRows: 5, maxRows: 10 }"
            show-word-limit
          />
        </el-form-item>

        <div>
          <div class="flex -mx-2">

            <el-form-item class="px-2 flex-1" label="向日葵ID" prop="remotemac">
              <el-input
                v-model="modal.remotemac"
                disabled
              />
            </el-form-item>

            <el-form-item class="px-2 flex-1" label="远程密码" prop="remotecode">
              <el-input
                v-model="modal.remotecode"
                disabled
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
                disabled
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
                disabled
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
        <el-button @click="show = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      ref="rating"
      :show-close="false"
      :visible.sync="showRating"
      width="50%"
    >
      <div slot="title" class="border-b">
        <h3 class="title">工单评价</h3>
      </div>

      <div>
        <p class="font-semibold">
          请您给我们认真负责的小姐姐们打个分吧！
        </p>
        <div>
          <el-button v-for="{title,value} in ratingList" :key="value" :type="value === ratingForm.score?'primary':''" @click="handleRatingForm(value)">

            {{ title }}
          </el-button>
        </div>
        <el-form v-if="ratingForm.score===-2" :model="ratingForm" class="my-2">
          <el-form-item
            prop="remark"
          >
            <el-input
              v-model="ratingForm.remark"
              type="textarea"
              maxlength="500"
              :autosize="{minRows: 2, maxRows: 3 }"
              show-word-limit
              placeholder="请留下您宝贵的意见或建议"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="postRating">评分</el-button>

        <el-button @click="closeRatingModal">关闭</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import schema from 'async-validator'
import { getHistoryList, detail, rating } from '@/api/gongdan'
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
      total: 0,
      pageCount: 0,
      show: false,
      modal: {},
      current: 1,
      limit: 15,
      showRating: false,
      ratingList: [
        {
          title: '投诉',
          value: -2
        },
        {
          title: '不满意',
          value: -1
        },
        {
          title: '一般',
          value: 0
        },
        {
          title: '满意',
          value: 1
        },
        {
          title: '非常满意',
          value: 2
        }
      ],
      ratingForm: {
        id: null,
        score: null,
        remark: null
      }

    }
  },
  computed: {
    rules() {
      return {

        score: {
          required: true,
          message: '请选择评分'
        },
        remark: {
          required: this.ratingForm.score === -2,
          message: '请填写投诉原因'
        }
      }
    }
  },
  watch: {
    current(val) {
      this.getList(val)
    }
  },

  created() {
    this.getList()
  },
  methods: {
    async getList(current = 1) {
      const { data, count, pagesum } = await getHistoryList({
        page: current,
        limit: this.limit
      })
      this.list = data
      this.total = count
      this.pageCount = pagesum
    },
    async handleEdit(index, row) {
      this.show = true
      const { data } = await detail(row.id)
      this.modal = data
    },
    handleRating(index, row) {
      this.showRating = true
      this.ratingForm.id = row.id
      this.ratingForm.score = row.score
    },
    onChange(e) {
      this.current = e
    },
    onPrev() {
      this.current -= 1
    },
    onNext() {
      this.current += 1
    },
    async postRating() {
      var validator = new schema(this.rules)

      validator.validate(this.ratingForm, async(errors, fields) => {
        if (errors) {
          // validation failed, errors is an array of all errors
          // fields is an object keyed by field name with an array of
          // errors per field
          // return handleErrors(errors, fields)
          for (var error of errors) {
            console.log(error)
            this.$message.error({
              message: error.message
            }
            )
          }
          return
        }

        await rating(this.ratingForm)
        this.$message.success({
          message: '感谢您的评分'

        })
        this.closeRatingModal()
        // validation passed
      })
    },
    handleRatingForm(rating) {
      this.ratingForm.score = rating
    },
    resetRatingForm() {
      this.ratingForm = {
        id: null,
        score: null,
        remark: null
      }
    },
    closeRatingModal() {
      this.resetRatingForm()
      this.showRating = false
    }
  }
}
</script>
