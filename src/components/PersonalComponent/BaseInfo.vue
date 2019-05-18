<template>
  <div class="base-form">
    <Form :model="infoForm" ref="infoForm" label-position="left" :label-width="36">
      <Row :gutter="40">
        <Col span="6">
          <FormItem label="姓名" prop="name">
            <Input v-model="infoForm.name"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="手机" prop="phone">
            <Input v-model="infoForm.phone"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="邮箱" prop="email">
            <Input v-model="infoForm.email"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="学校" prop="school">
            <Input v-model="infoForm.school"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="40">
        <Col span="6">
          <FormItem label="学院" prop="faculty">
            <Input v-model="infoForm.faculty"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="专业" prop="major">
            <Input v-model="infoForm.major"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入学" prop="startSchoolDate">
            <DatePicker type="date" v-model="infoForm.startSchoolDate" class="d-block"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="毕业" prop="graduateDate">
            <DatePicker type="date" v-model="infoForm.graduateDate" class="d-block"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="40">
        <Col span="12">
          <FormItem label="课程" prop="subject">
            <Input type="textarea" :rows="3" v-model="infoForm.subject"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="简介" prop="remark">
            <Input type="textarea" :rows="3" v-model="infoForm.remark"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  data() {
    return {
      infoForm: {
        name: '',
        school: '',
        email: '',
        phone: '',
        subject: '',
        startSchoolDate: '',
        graduateDate: '',
        major: '',
        faculty: '',
        remark: ''
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created () {
    console.log(this.userInfo)
    this.getBaseInfo()
  },
  methods: {
    getBaseInfo() {
      this.$axios.get(`/api/personal/current`, {
        params: { userId: this.userInfo.id }
      }).then((res) => {
        if (res && res.data) {
          Object.assign(this.infoForm, res.data)
        }
      })
    }
  }
}
</script>

<style scoped></style>
