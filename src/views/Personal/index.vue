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
    <div class="work-experience">
      <div class="info-title">
        <Row type="flex" align="middle">
          <Col span="12">
            <h3 class="p-b-3">工作经历</h3>
          </Col>
          <Col span="12" class="tr">
            <Tooltip placement="top" content="新增工作经历">
              <Button type="text" @click="openExperienceModal('work')" class="p-0 m-0">
                <i class="fa fa-plus fz-16"></i>
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
      <Experience
        ref="work"
        :tableHeader="tableHeader"
        :tableData="workData"
        @addData="addData"
      />
    </div>
    <div class="project-experience m-t-20">
      <div class="info-title">
        <Row type="flex" align="middle">
          <Col span="12">
            <h3 class="p-b-3">项目经历</h3>
          </Col>
          <Col span="12" class="tr">
            <Tooltip placement="top" content="新增项目经历">
              <Button type="text" class="p-0 m-0" @click="openExperienceModal('project')">
                <i class="fa fa-plus fz-16"></i>
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
      <Experience
        ref="project"
        :tableHeader="tableHeader"
        :tableData="projectData"
        @addData="addData"
      />
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/components/PersonalComponent/BaseInfo.vue'
import Experience from '@/components/PersonalComponent/Experience.vue'

export default {
  name: 'index',
  components: {
    BaseInfo,
    Experience
  },
  data() {
    return {
      tableHeader: [
        { type: 'index', title: '序号', width: 60, align: 'center' },
        { title: '所在公司', key: 'company' },
        { title: '开始时间', slot: 'startTime', width: 150 },
        { title: '结束时间', slot: 'endTime', width: 150 },
        { title: '工作描述', key: 'remark' },
        { title: '操作', slot: 'action', width: 150, align: 'center' }
      ],
      workData: [],
      projectData: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.initWorkData()
    this.initProjectData()
  },
  methods: {
    initWorkData() {
      this.$axios.get('/api/works/list').then((res) => {
        if (res && res.data) {
          this.workData = res.data
        } else {
          this.workData = []
        }
      })
    },
    initProjectData() {
      this.$axios.get('/api/projects/list').then((res) => {
        if (res && res.data) {
          this.projectData = res.data
        } else {
          this.projectData = []
        }
      })
    },
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
    },
    addData(type) {
      if (type === 'work') {
        this.initWorkData()
      } else {
        this.initProjectData()
      }
    },
    openExperienceModal(type) {
      if (type === 'work') {
        this.$refs.work.openModal(null, type)
      } else {
        this.$refs.project.openModal(null, type)
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "./styles";
</style>
<style lang="less">
  .personal {
    .experience-content {
      .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        left: 18px!important;
      }
    }
  }
</style>
