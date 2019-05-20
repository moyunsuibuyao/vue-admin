<template>
  <div class="h-100">
    <Card class="h-100">
      <div class="base">
        <h3 class="p-b-10 bd-bottom">基本信息</h3>
        <Row class="info-cell">
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">姓名</span>
            <span>{{infoData.name}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">联系方式</span>
            <span>{{infoData.phone}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">所在城市</span>
            <span>{{infoData.city}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">邮箱</span>
            <span>{{infoData.email}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">学校</span>
            <span>{{infoData.school}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">学院</span>
            <span>{{infoData.faculty}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">专业</span>
            <span>{{infoData.major}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">学历</span>
            <span>{{infoData.education}}</span>
          </Col>
          <Col span="8" class="p-t-12 p-b-12">
            <span class="d-inline-block w-px-70">时间</span>
            <span>
            {{$moment(infoData.startSchoolDate).format('YYYY-MM-DD')}}
            至
            {{$moment(infoData.graduateDate).format('YYYY-MM-DD')}}
          </span>
          </Col>
        </Row>
        <p class="p-t-12 p-b-12 d-flex">
          <span class="d-inline-block w-px-70">课程</span>
          <span class="flex_1">{{infoData.subject}}</span>
        </p>
      </div>
      <div class="skill m-t-20">
        <h3 class="p-b-10 bd-bottom">工作技能</h3>
        <Row>
          <template v-for="(item, index) in infoData.skill">
            <Col :key="index" span="8" class="p-t-12 p-b-12">
              <span :key="'span' + index" class="d-inline-block w-px-70">{{item.label}}</span>
              <Rate :key="'rate' + index" :value="item.value" disabled allow-half show-text>
                <span style="color: #f5a623">{{showTxt(item.value)}}</span>
              </Rate>
            </Col>
          </template>
        </Row>
      </div>
      <div class="remark m-t-20">
        <h3 class="p-b-10 bd-bottom">自我评价</h3>
        <p class="p-t-12 l-h-25">{{infoData.remark}}</p>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  data() {
    return {
      infoData: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$axios.get('/api/personal/current').then((res) => {
        if (res && res.data) {
          this.infoData = res.data
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

<style scoped lang="less">
</style>
