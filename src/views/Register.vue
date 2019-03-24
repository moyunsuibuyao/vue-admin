<template>
  <div class="register">
    <img src="../assets/bg.jpg">
    <a-card class="register-card" title="注册账号">
      <a-form :form="form" @submit="submitRegisterData">
        <a-form-item>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{
                  required: true, message: '用户名不能为空',
                }, {
                  max: 8, min: 2, message: '长度在2到8个字符之间',
                }]
              }
            ]"
            placeholder="请输入用户名"
          >
            <i slot="addonBefore" class="fa fa-user"></i>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: '邮箱格式不正确!'
                }, {
                  required: true, message: '邮箱不能为空'
                }]
              }
            ]"
            placeholder="请输入邮箱"
          >
            <i slot="addonBefore" class="fa fa-at"></i>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  max: 20, min: 6, message: '长度在6到20个字符之间',
                }]
              }
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <i slot="addonBefore" class="fa fa-lock"></i>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'passwordAgain',
              {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  validator: compareToFirstPassword,
                }]
              }
            ]"
            type="password"
            placeholder="请确认密码"
          >
            <i slot="addonBefore" class="fa fa-check"></i>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-spin tip="注册中" :spinning="loading" :delay="300">
            <a-button type="primary" block html-type="submit">注册</a-button>
            <p style="text-align: center" class="login-btn" @click="$router.push('/login')">
              已有账号，去登录
            </p>
          </a-spin>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'Register',
  data() {
    return {
      loading: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
  },
  methods: {
    // 校验密码
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    },
    submitRegisterData(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true
          const obj = {}
          Object.assign(obj, values)
          obj.password = Base64.encode(obj.password)
          obj.identity = 0
          obj.passwordAgain = Base64.encode(obj.passwordAgain)
          this.$axios.post('/api/users/register', obj).then((res) => {
            this.$message.success('注册成功!')
            this.loading = false
            this.$router.push('/login')
          }).catch(() => { this.loading = false })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .register {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .register-card {
      width: 350px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .login-btn {
        padding: 0;
        margin: 0;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>
