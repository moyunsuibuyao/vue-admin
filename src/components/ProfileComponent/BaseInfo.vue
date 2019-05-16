<template>
  <div class="base-info">
    <Card style="height: 100%">
      <p slot="title">{{infoData.name}}</p>
      <ul class="info-cell">
        <li>
          <span>学校</span>
          <span style="float: right">{{infoData.school}}</span>
        </li>
        <li>
          <span>入学年份</span>
          <span style="float: right">{{}}</span>
        </li>
        <li>
          <span>学院</span>
          <span style="float: right">{{infoData.faculty}}</span>
        </li>
        <li>
          <span>专业</span>
          <span style="float: right">{{infoData.major}}</span>
        </li>
        <li>
          <span>所学课程</span>
          <span style="float: right">{{infoData.subject}}</span>
        </li>
      </ul>
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
        if (res) {
          this.infoData = res
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .base-info {
    height: 100%;
    font-size: 14px;
    .info-cell {
      font-size: 14px;
      font-weight: 500;
      li {
        list-style: none;
        padding: 12px;
      }
    }
  }
</style>
