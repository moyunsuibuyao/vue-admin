<template>
  <div class="base-info">
    <Card style="height: 100%">
      <p slot="title">{{infoData.name}}</p>
      <Row class="info-cell">
        <Col span="6">
          <span style="margin-right: 12px">学校</span>
          <span>{{infoData.school}}11</span>
        </Col>
      </Row>
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
    }
  }
</style>
