<template>
  <div class="work-content">
    <Modal
      v-model="workExperienceModal"
      :title="!workForm._id ? '新增工作经历' : '编辑工作经历'"
      @on-visible-change="closeWorkModal"
      :loading="workLoading"
    >
      <Form :model="workForm" :label-width="75" :rules="workValidate" ref="workForm">
        <FormItem label="所在公司" prop="company">
          <Input class="d-block" v-model="workForm.company"></Input>
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <DatePicker class="d-block" type="month" v-model="workForm.startTime"></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
          <DatePicker class="d-block" type="month" v-model="workForm.endTime"></DatePicker>
        </FormItem>
        <FormItem label="工作描述" prop="remark">
          <Input v-model="workForm.remark" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
      <span slot="footer">
          <Button type="text" @click="closeWorkModal(false)">取消</Button>
          <Button type="primary" @click="submitWork">确定</Button>
        </span>
    </Modal>
    <Table :columns="workHeader" :data="workData">
      <template slot-scope="{ row }" slot="startTime">
        {{ $moment(row.startTime).format('YYYY-MM') }}
      </template>
      <template slot-scope="{ row }" slot="endTime">
        {{ $moment(row.endTime).format('YYYY-MM') }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          shape="circle"
          class="m-r-10"
          @click="openworkExperienceModal(row)"
          icon="ios-create"
        >
        </Button>
        <Poptip
          confirm
          title="请确认是否删除？"
          @on-ok="removeWork(index, row)"
        >
          <Button type="error" shape="circle" icon="ios-trash"></Button>
        </Poptip>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'WorkExperience',
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择开始时间'))
      } else {
        if (this.workForm.endTime && this.workForm.endTime.valueOf() < value.valueOf()) {
          callback(new Error('开始时间不能大于结束时间'))
        }
        callback()
      }
    }
    const validateEndTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择结束时间'))
      } else {
        if (this.workForm.startTime && value.valueOf() < this.workForm.startTime.valueOf()) {
          callback(new Error('结束时间不能小于开始时间'))
        }
        callback()
      }
    }
    return {
      workExperienceModal: false,
      workLoading: true,
      workHeader: [
        { type: 'index', title: '序号', width: 60, align: 'center' },
        { title: '所在公司', key: 'company' },
        { title: '开始时间', slot: 'startTime', width: 150 },
        { title: '结束时间', slot: 'endTime', width: 150 },
        { title: '工作描述', key: 'remark' },
        { title: '操作', slot: 'action', width: 150, align: 'center' }
      ],
      workData: [],
      workForm: {
        startTime: '',
        endTime: '',
        remark: '',
        company: ''
      },
      workValidate: {
        startTime: [
          { required: true, validator: validateStartTime, trigger: 'change' }
        ],
        endTime: [
          { required: true, validator: validateEndTime, trigger: 'change' }
        ],
        company: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写工作经历', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created() {
    this.initWorkData()
  },
  methods: {
    initWorkData() {
      this.$axios.get('/api/works/list', {
        params: { userId: this.userInfo.id }
      }).then((res) => {
        if (res && res.data) {
          this.workData = res.data
        } else {
          this.workData = []
        }
      })
    },
    openworkExperienceModal(data) {
      console.log(data)
      if (data) {
        this.$axios.get('/api/works/item', {
          params: { _id: data._id }
        }).then((res) => {
          if (res && res.data) {
            this.workForm = res.data
          }
        })
      }
      this.workExperienceModal = true
    },
    submitWork() {
      this.$refs.workForm.validate((valid) => {
        if (valid) {
          const url = this.workForm._id ? '/api/works/edit' : '/api/works/add'
          const params = {}
          Object.assign(params, this.workForm)
          params.userId = this.userInfo.id
          this.$axios.post(url, params).then((res) => {
            if (res && res.data) {
              this.$Message.success(`${!this.workForm._id ? '新增成功' : '编辑成功'}`)
              this.workExperienceModal = false
              this.initWorkData()
            } else {
              this.$Message.warning(`${!this.workForm._id ? '新增失败' : '编辑失败'}`)
              this.workLoading = false
            }
          }).catch(() => {
            this.workLoading = false
          })
        } else {
          this.workLoading = false
        }
      })
    },
    removeWork(index, row) {
      this.$axios.get('/api/works/delete', {
        params: { _id: row._id }
      }).then((res) => {
        if (res && res.data) {
          this.$Message.success('删除成功')
          this.workData.splice(index, 1)
        } else {
          this.$Message.warning('删除失败')
        }
      }).catch(() => {
        this.$Message.warning('删除失败')
      })
    },
    closeWorkModal(type) {
      if (!type) {
        this.$refs.workForm.resetFields()
        this.workExperienceModal = false
        this.workForm = true
        this.workForm = {
          startTime: '',
          endTime: '',
          remark: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
