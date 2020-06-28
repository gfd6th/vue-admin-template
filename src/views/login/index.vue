<template>
  <div class="h-full">
    <header class="hidden sm:block bg-white shadow py-6 fixed top-0 w-full z-10">
      <div class=" divide-x-2  container flex items-center">

        <img src="@/assets/logo@2x.png" alt="" class="w-56 pr-4">
        <!-- <span class="text-xl px-4 font-medium text-gray-700">售后工单系统</span> -->
      </div>
    </header>
    <div class="container h-full flex items-center">

      <div class="md:flex  bg-white rounded overflow-hidden shadow-lg">

        <div class="hidden md:block w-11/12">
          <img src="https://ae01.alicdn.com/kf/U22427f1d4df44f148fe904fc403a00a1d.jpg" class="w-full object-cover h-full" alt="">
        </div>
        <div class="login-container flex h-screen md:h-auto flex-col w-full md:w-4/12">
          <div class="flex-1">

            <div class="text-center mt-16">
              <!-- <div class="md:w-48 lg:w-56 w-4/5 text-center px-4 mx-auto ">
                <img src="@/assets/logo@2x.png" class="w-full" alt="">
              </div> -->
              <h3 class="text-xl text-gray-700">售后工单系统</h3>
            </div>

            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form mx-auto md:mx-0 p-8 lg:p-8 md:p-4" auto-complete="on" label-position="left">

              <el-form-item prop="telphone">

                <el-input
                  v-model="loginForm.telphone"
                  placeholder="请输入手机号"
                  name="telphone"
                  type="phone"
                />
              </el-form-item>

              <el-form-item prop="password">

                <!-- <div class="svg-container  px-2" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </div> -->
                <el-input
                  ref="password"
                  v-model="loginForm.password"

                  type="password"
                  placeholder="请输入密码"
                  name="password"
                  clearable
                  @keyup.enter.native="handleLogin"
                />
              <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
              </el-form-item>

              <div class="mt-8 md:mt-16">

                <el-button :loading="loading" type="primary" style="width:100%" @click.native.prevent="handleLogin">登录</el-button>
              </div>

            </el-form>
          </div>
          <img src="@/assets/diwen@2x.png" class="w-full md:hidden" alt="">
        </div>
      </div>

    </div>
    <div class="text-center fixed w-full text-gray-700 text-sm" style="bottom: 2rem;">
      Copyright 2016-2020 南昌杰锐软件有限公司ALL Rights Reserved | 赣ICP备 16009993 号
    </div>
  </div>
</template>

<script>
import { validPhone } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validator = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        telphone: '',
        password: ''
      },
      loginRules: {
        telphone: [{ required: true, trigger: 'blur', validator: validator }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((data) => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .el-form-item__content{
    @apply flex
  }

  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 0;
      // color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }

    .el-icon-circle-close{
      color: #889aa4
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    @apply border-b;
    background: none;
    // border-radius: 5px;
    // color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:white;
$dark_gray:#889aa4;
$light_gray:#eee;

@screen md{
  .login-container{
    background-color: transparent !important;
  }
}
.login-container {
  min-height: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 60px 35px 0;
    overflow: hidden;
  }

  .svg-container {
    color: $dark_gray;
    vertical-align: middle;

    display: inline-block;
    .svg-icon{
      vertical-align: -.5rem
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
