<template>
  <div class="project-experience h-100" style="overflow-y: auto">
    <Timeline class="m-t-10">
      <TimelineItem v-for="item in dataList" :key="item._id">
        <Card>
          <p class="fz-14" style="font-weight: bold">{{item.company}}</p>
          <div class="fz-14 m-t-20">
            <template v-for="(value, index) in item.remark.split('；')">
              <p :key="index" class="m-t-10">{{value}}</p>
            </template>
          </div>
        </Card>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  name: 'ProjectExperience',
  data() {
    return {
      dataList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init() {
      this.$axios.get('/api/projects/list').then((res) => {
        if (res && res.data) {
          this.dataList = res.data
        } else {
          this.dataList = []
        }
      })
    },
    filterDate(value) {
      const dateValue = this.$moment(value).valueOf()
      const nowDate = this.$moment().valueOf()
      if (dateValue >= nowDate) {
        return '至今'
      }
      return this.$moment(value).format('YYYY-MM')
    }
  }
}
</script>

<style scoped>

</style>
