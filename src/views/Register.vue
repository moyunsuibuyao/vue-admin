<template>
  <div class="register">
    <img src="../assets/bg.jpg">
    <Card class="register-card">
      <p slot="title">注册账号</p>
      <Form :model="registerForm" :rules="ruleValidate" ref="registerForm">
        <FormItem prop="name">
          <Input v-model="registerForm.name" placeholder="请输入用户名" clearable>
            <Icon type="ios-person" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem prop="email">
          <Input v-model="registerForm.email" placeholder="请输入邮箱" clearable>
            <Icon type="ios-at" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="registerForm.password" placeholder="请输入密码" clearable>
            <Icon type="md-lock" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem prop="passwordAgain">
          <Input type="password" v-model="registerForm.passwordAgain" placeholder="请确认密码" clearable>
            <Icon type="md-checkmark" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="submitRegisterData('registerForm')">注册</Button>
          <Button type="text" long style="margin-top: 8px" @click="$router.push('/login')">已有账号，去登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        passwordAgain: '',
        identity: 0
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 4, max: 8,  message: '长度在4到8个字符之间', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20,  message: '长度在6到20个字符之间', trigger: 'blur' }
        ],
        passwordAgain: [{ validator: validatePassCheck, trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
    submitRegisterData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/users/register', this.registerForm).then(res => {
            this.$Message.success('注册成功!')
          })
          this.$router.push('/login')
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
    }
  }
</style>
