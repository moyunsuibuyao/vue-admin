<template>
  <div class="login">
    <Card class="login-card">
      <span slot="title">欢迎登录</span>
      <Form :model="loginForm" ref="loginForm" :rules="rules">
        <FormItem prop="email">
          <Input v-model="loginForm.email" placeholder="请输入邮箱">
            <span slot="prepend" class="fa fa-at"></span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="请输入密码" v-model="loginForm.password">
            <span slot="prepend" class="fa fa-key"></span>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="submitLoginData">登录</Button>
          <p class="go-register__page" @click="$router.push('/register')">
            没有账号，去注册
          </p>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { Base64 } from 'js-base64'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        email: 'guest@guest.com',
        password: '123456'
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确!', trigger: 'change' }
        ],
        password: [{ required: true, message: '请输入密码!', trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  methods: {
    submitLoginData() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const obj = {}
          Object.assign(obj, this.loginForm)
          obj.password = Base64.encode(obj.password)
          this.$axios.post('/api/users/login', obj).then(res => {
            const { token } = res.data
            localStorage.setItem('sanmiToken', token)
            //  解析 token
            const decoded = jwtDecode(token)
            // this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
            this.$store.dispatch('userInfo', decoded)
            this.$Message.success('登录成功!')
            this.$router.push('/profile')
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
  @import "./styles";
</style>
