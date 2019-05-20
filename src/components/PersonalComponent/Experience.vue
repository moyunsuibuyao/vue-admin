<template>
  <div class="experience-content">
    <Modal
      v-model="experienceModal"
      :title="!experienceForm._id ? '新增经历' : '编辑经历'"
      @on-visible-change="closeModal"
      :loading="loading"
    >
      <Form :model="experienceForm" :label-width="75" :rules="rulesValidate" ref="experienceForm">
        <FormItem label="所在公司" prop="company">
          <Input class="d-block" v-model="experienceForm.company"></Input>
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <DatePicker class="d-block" type="month" v-model="experienceForm.startTime"></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
          <DatePicker class="d-block" type="month" v-model="experienceForm.endTime"></DatePicker>
        </FormItem>
        <FormItem :label="experienceType === 'work' ? '工作描述' : '项目描述'" prop="remark">
          <Input v-model="experienceForm.remark" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
      <span slot="footer">
          <Button type="text" @click="closeModal(false)">取消</Button>
          <Button type="primary" @click="submitData">确定</Button>
        </span>
    </Modal>
    <Table :columns="tableHeader" :data="tableData">
      <template slot-scope="{ row }" slot="startTime">
        {{ $moment(row.startTime).format('YYYY-MM') }}
      </template>
      <template slot-scope="{ row }" slot="endTime">
        {{ filterDate(row.endTime) }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          shape="circle"
          class="m-r-10"
          @click="openModal(row, row.experienceType)"
          icon="ios-create"
        >
        </Button>
        <Poptip
          confirm
          title="请确认是否删除？"
          @on-ok="removeData(index, row)"
        >
          <Button type="error" shape="circle" icon="ios-trash"></Button>
        </Poptip>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'Experience',
  props: ['type', 'tableHeader', 'tableData'],
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择开始时间'))
      } else {
        if (this.experienceForm.endTime && this.experienceForm.endTime.valueOf() < value.valueOf()) {
          callback(new Error('开始时间不能大于结束时间'))
        }
        callback()
      }
    }
    const validateEndTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择结束时间'))
      } else {
        if (this.experienceForm.startTime && value.valueOf() < this.experienceForm.startTime.valueOf()) {
          callback(new Error('结束时间不能小于开始时间'))
        }
        callback()
      }
    }
    return {
      experienceModal: false,
      loading: true,
      experienceType: '',
      experienceForm: {
        startTime: '',
        endTime: '',
        remark: '',
        company: ''
      },
      rulesValidate: {
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
  watch: {
    tableData: {
      handler(val) {
        return val
      },
      immediate: true,
      deep: true
    },
    tableHeader: {
      handler(val) {
        return val
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  methods: {
    openModal(data, type) {
      this.experienceType = type
      if (data) {
        const url = data.experienceType === 'work' ? '/api/works/item' : '/api/projects/item'
        this.$axios.get(url, {
          params: { _id: data._id }
        }).then((res) => {
          if (res && res.data) {
            this.experienceForm = res.data
          }
        })
      }
      this.experienceModal = true
    },
    submitData() {
      this.$refs.experienceForm.validate((valid) => {
        if (valid) {
          let url = ''
          if (this.experienceType === 'work') {
            url = this.experienceForm._id ? '/api/works/edit' : '/api/works/add'
          } else {
            url = this.experienceForm._id ? '/api/projects/edit' : '/api/projects/add'
          }
          const params = {}
          Object.assign(params, this.experienceForm)
          params.userId = this.userInfo.id
          params.experienceType = this.experienceType
          this.$axios.post(url, params).then((res) => {
            if (res && res.data) {
              this.$Message.success(`${!this.experienceForm._id ? '新增成功' : '编辑成功'}`)
              this.$emit('addData', this.experienceType)
              this.experienceModal = false
            } else {
              this.$Message.warning(`${!this.experienceForm._id ? '新增失败' : '编辑失败'}`)
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    },
    removeData(index, row) {
      let url = row.experienceType === 'work' ? '/api/works/delete' : '/api/projects/delete'
      this.$axios.get(url, {
        params: { _id: row._id }
      }).then((res) => {
        if (res && res.data) {
          this.$Message.success('删除成功')
          this.tableData.splice(index, 1)
        } else {
          this.$Message.warning('删除失败')
        }
      }).catch(() => {
        this.$Message.warning('删除失败')
      })
    },
    closeModal(type) {
      if (!type) {
        this.$refs.experienceForm.resetFields()
        this.experienceModal = false
        this.experienceForm = true
        this.experienceType = ''
        this.experienceForm = {
          startTime: '',
          endTime: '',
          remark: ''
        }
      }
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
