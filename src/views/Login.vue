<template>
  <div class="login">
    <img src="../assets/bg.jpg">
    <a-card class="login-card" title="欢迎登录">
      <a-form :form="form" @submit="submitLoginData">
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: '邮箱格式不正确!',
                }, {
                  required: true, message: '邮箱不能为空',
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
                rules: [{required: true, message: '请输入密码!' }]
              }
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <i slot="addonBefore" class="fa fa-lock"></i>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-spin tip="注册中" :spinning="loading" :delay="300">
            <a-button type="primary" block html-type="submit">登录</a-button>
            <p class="register-btn" @click="$router.push('/register')">
              没有账号，去注册
            </p>
          </a-spin>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { Base64 } from 'js-base64'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loading: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    submitLoginData(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true
          const obj = {}
          Object.assign(obj, values)
          obj.password = Base64.encode(obj.password)
          this.$axios.post('/api/users/login', obj).then(res => {
            const { token } = res.data
            localStorage.setItem('sanmiToken', token)
            //  解析 token
            const decoded = jwtDecode(token)
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)
            this.$message.success('登录成功!')
            this.loading = false
            this.$router.push('/index')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .login-card {
      width: 350px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .register-btn {
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
<style lang="less">
  .login {
    .ant-card-body {
      padding: 16px !important;
    }
  }
</style>
