<template>
  <div class="login">
    <img src="../assets/bg.jpg">
    <Card class="login-card">
      <p slot="title">欢迎登录</p>
      <Form :model="loginForm" :rules="ruleValidate" ref="loginForm">
        <FormItem prop="email">
          <Input v-model="loginForm.email" placeholder="请输入邮箱" clearable>
            <Icon type="ios-at" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="请输入密码" clearable>
            <Icon type="md-lock" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="submitLoginData('loginForm')">登录</Button>
          <Button type="text" long style="margin-top: 8px" @click="$router.push('/register')">没有账号，去注册</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      ruleValidate: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLoginData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/users/login', this.loginForm).then(res => {
            const { token } = res.data
            localStorage.setItem('sanmiToken', token)
            //  解析 token
            const decoded = jwt_decode(token)
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)

            this.$Message.success('登录成功!')
            this.$router.push('/index')
          })
        }
      })
    },
    isEmpty (value) {
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
    }
  }
</style>
