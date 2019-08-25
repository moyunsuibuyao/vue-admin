<template>
  <div class="register">
    <Card class="register-card">
      <span slot="title">注册账号</span>
      <Form :model="registerForm" ref="registerForm" :rules="rules">
        <FormItem prop="name">
          <Input v-model="registerForm.name" placeholder="请输入用户名">
            <span slot="prepend" class="fa fa-user"></span>
          </Input>
        </FormItem>
        <FormItem prop="email">
          <Input v-model="registerForm.email" placeholder="请输入邮箱">
            <span slot="prepend" class="fa fa-at"></span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="registerForm.password" type="password" placeholder="请输入密码">
            <span slot="prepend" class="fa fa-lock"></span>
          </Input>
        </FormItem>
        <FormItem prop="confirmPassword">
          <Input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码">
            <span slot="prepend" class="fa fa-check"></span>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="submitRegisterData">注册</Button>
          <p class="go-login__page" @click="$router.push('/login')">
            已有账号，去登录
          </p>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'register',
  data() {
    // 校验密码
    const compareToFirstPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码!'))
      } else if (value && value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { max: 8, min: 2, message: '长度在2到8个字符之间' }
        ],
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确!', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' },
          { max: 20, min: 6, message: '长度在6到20个字符之间' }
        ],
        confirmPassword: [{ validator: compareToFirstPassword, trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
    submitRegisterData() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          const obj = {}
          Object.assign(obj, this.registerForm)
          obj.password = Base64.encode(obj.password)
          obj.identity = 0
          obj.confirmPassword = Base64.encode(obj.confirmPassword)
          this.$axios.post('/api/users/register', obj).then((res) => {
            this.$Message.success('注册成功!')
            this.$router.push('/login')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "./styles";
</style>
