<template>
  <div class="profile">
    <nav class="nav-left">
      <Menu active-name="1" style="height: 100%" @on-select="selectionInfo">
        <MenuItem name="1">
          <span class="fa fa-id-card"></span>
          <span style="margin-left: 8px">基本信息</span>
        </MenuItem>
        <MenuItem name="2">
          <span class="fa fa-clipboard"></span>
          <span style="margin-left: 8px">个人/工作经历</span>
        </MenuItem>
        <MenuItem name="3">
          <span class="fa fa-pencil-square"></span>
          <span style="margin-left: 8px">项目经历</span>
        </MenuItem>
      </Menu>
    </nav>
    <div class="right-content">
      <BaseInfo v-if="selectionItem === '1'" />
      <WorkExperience v-if="selectionItem === '2'" />
      <ProjectExperience v-if="selectionItem === '3'" />
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/components/ProfileComponent/BaseInfo.vue'
import WorkExperience from '@/components/ProfileComponent/WorkExperience.vue'
import ProjectExperience from '@/components/ProfileComponent/ProjectExperience.vue'

export default {
  name: 'index',
  components: {
    BaseInfo,
    WorkExperience,
    ProjectExperience
  },
  data() {
    return {
      selectionItem: '1'
    }
  },
  created () {
  },
  methods: {
    selectionInfo(selection) {
      this.selectionItem = selection
    }
  }
}
</script>

<style scoped lang="less">
  .profile {
    display: flex;
    align-items: flex-start;
    height: 100%;
    .nav-left {
      height: 100%;
      margin-right: 20px;
      width: 240px;
    }
    .right-content {
      flex: 1;
      height: 100%;
    }
  }
</style>
