<template>
  <div class="base-form">
    <Form :model="infoForm" ref="infoForm" label-position="left" :label-width="60">
      <Row :gutter="40">
        <Col span="6">
          <FormItem label="姓名" prop="name">
            <Input v-model="infoForm.name"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="性别" prop="name">
            <Select v-model="infoForm.sex" clearable>
              <Option :value="1">男</Option>
              <Option :value="0">女</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="城市" prop="phone">
            <Input v-model="infoForm.city"></Input>
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
          <FormItem label="职业" prop="phone">
            <Input v-model="infoForm.job"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="学校" prop="school">
            <Input v-model="infoForm.school"></Input>
          </FormItem>
        </Col>
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
          <FormItem label="学历" prop="phone">
            <Input v-model="infoForm.education"></Input>
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
        <template v-for="item in infoForm.skill">
          <Col span="6" :key="item._id">
            <FormItem :label="item.label" :key="item._id">
              <Rate allow-half show-text v-model="item.value">
                <span style="color: #f5a623">{{showTxt(item.value)}}</span>
              </Rate>
            </FormItem>
          </Col>
        </template>
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
        remark: '',
        skill: [],
        education: '',
        job: '',
        sex: '',
        city: ''
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
      this.$axios.get(`/api/personal/current`).then((res) => {
        if (res && res.data) {
          Object.assign(this.infoForm, res.data)
        }
      })
    },
    showTxt(num) {
      if (num >= 1 && num <= 2) {
        return '了解'
      } else if (num > 2 && num <= 3) {
        return '掌握'
      } else if (num > 3 && num <= 4.5) {
        return '熟练'
      } else {
        return '精通'
      }
    }
  }
}
</script>

<style scoped></style>
