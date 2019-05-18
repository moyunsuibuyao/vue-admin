<template>
  <div class="personal">
    <div class="base-info">
      <div class="info-title">
        <Row type="flex" align="middle">
          <Col span="12">
            <h3 class="p-b-3">基本信息</h3>
          </Col>
          <Col span="12" class="tr">
            <Tooltip placement="top" content="保存基本信息">
              <Button type="text" @click="saveBaseInfo" class="p-0 m-0">
                <i class="fa fa-save fz-16"></i>
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
      <BaseInfo ref="baseInfo" />
    </div>
    <div class="work-experience m-t-20">
      <div class="info-title">
        <Row type="flex" align="middle">
          <Col span="12">
            <h3 class="p-b-3">工作经历</h3>
          </Col>
          <Col span="12" class="tr">
            <Tooltip placement="top" content="新增工作经历">
              <Button type="text" @click="addWorkExperience" class="p-0 m-0">
                <i class="fa fa-plus fz-16"></i>
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/components/PersonalComponent/BaseInfo.vue'

export default {
  name: 'index',
  components: {
    BaseInfo
  },
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created () {
  },
  methods: {
    saveBaseInfo() {
      this.$Spin.show()
      const info = this.$refs.baseInfo
      if (info) {
        const params = {}
        Object.assign(params, info.infoForm)
        params.userId = this.userInfo.id
        this.$axios.post('/api/personal/edit', params).then((res) => {
          if (res && res.data) {
            this.$Message.success('保存成功')
          }
        })
      }
      this.$Spin.hide()
      console.log('this.$refs.baseInfo.infoForm', this.$refs.baseInfo.infoForm)
    },
    addWorkExperience() {},
    resetForm(form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style scoped lang="less">
  @import "./styles";
</style>
