<template>
  <div class="article">
    <Card dis-hover>
      <div class="wrapper-filter d-flex">
        <div class="w-px-70 m-t-1">文章类别</div>
        <div class="flex_1">
          <CheckboxGroup v-model="isChecked" @on-change="initArticleList">
            <template v-for="item in typeList">
              <Checkbox class="m-l-10" :key="item._id" :label="item._id">{{item.name}}</Checkbox>
            </template>
          </CheckboxGroup>
        </div>
      </div>
    </Card>
    <div class="article-list m-t-10 m-b-20 of-y-auto" v-if="articleList.length" :style="{ height: listHeight }">
      <Row type="flex" :gutter="20">
        <template v-for="(item, index) in articleList">
          <Col span="8" :key="index" class="m-t-10">
            <Card :key="item._id">
              <p slot="title">{{item.title}}</p>
              <p slot="extra">
                <Button size="small" type="primary" shape="circle" icon="ios-create" @click="editArticle(item)"></Button>
                <Poptip
                  confirm
                  title="请确认是否删除？"
                  @on-ok="removeArticle(item)"
                >
                  <Button type="error" size="small" shape="circle" icon="ios-trash" class="m-l-5"></Button>
                </Poptip>
              </p>
              <p class="bd-bottom l-h-30 p-16 of-hidden" style="height: 120px;">
                {{item.description}}
              </p>
              <div class="tr p-t-6 p-b-6">
                <router-link :to="'/read/' + item._id" tag="a" target="_blank">
                  <Button type="text">
                    <span class="fz-14" style="font-weight: 500">
                     >>> 阅读全文
                    </span>
                  </Button>
                </router-link>
              </div>
            </Card>
          </Col>
        </template>
      </Row>
    </div>
    <div v-else class="bd m-t-10 tc fz-16 m-b-20 no-content" :style="{ height: listHeight, lineHeight: listHeight }">
      暂无内容
    </div>
    <div class="tr p-r-16 bd-top">
      <Page
        class="m-t-16"
        :total="pageTotal"
        :show-elevator="true"
        :show-sizer="true"
        :show-total="true"
        :page-size="pageSize"
        :current.sync="pageNo"
        @on-change="changePageNo"
        @on-page-size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      typeList: [],
      articleList: [],
      isChecked: [],
      keyword: '',
      pageTotal: 0,
      pageNo: 1,
      pageSize: 10
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
    listHeight() {
      return `${window.innerHeight - 240}px`
    }
  },
  created () {
    this.initTypeList()
    this.initArticleList()
  },
  methods: {
    initTypeList() {
      this.$axios.get('/api/writeTypes/list').then((res) => {
        if (res && res.data) {
          this.typeList = res.data
          this.typeList.forEach((item) => {
            this.$set(item, 'checked', false)
          })
        } else {
          this.typeList = []
        }
      })
    },
    initArticleList() {
      this.$axios.get('/api/articles/list', {
        params: {
          type: this.isChecked,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        }
      }).then((res) => {
        if (res && res.data && res.data.dataList.length) {
          this.articleList = res.data.dataList
          this.pageTotal = res.data.page && res.data.page.pageTotal ? res.data.page.pageTotal : 0
        } else {
          this.articleList = []
          this.pageTotal = 0
        }
      })
    },
    removeArticle(data) {
      console.log(this.userInfo.identity)
      if (this.userInfo.identity === '1') {
        this.$axios.get('/api/articles/delete', {
          params: { id: data._id }
        }).then((res) => {
          if (res && res.data) {
            this.initArticleList()
            this.$Message.success(res.data.message)
          } else {
            this.$Message.warning('删除失败，请稍后再试')
          }
        })
      } else {
        this.$Message.info('对不起，只有三米才有该权限')
      }
    },
    editArticle(item) {
      if (this.userInfo.identity === '1') {
        this.$router.push(`/write/${item._id}`)
      } else {
        this.$Message.info('对不起，只有三米才有该权限')
      }
    },
    changePageNo(pageNo) {
      this.pageNo = pageNo
      this.initArticleList()
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.initArticleList()
    }
  }
}
</script>

<style scoped lang="less">
  .no-content {
    color: #808695;
  }
</style>
<style lang="less">
  .article {
    .article-list {
      .ivu-card-body {
        padding: 0!important;
      }
      .ivu-btn:focus {
        box-shadow: none!important;
      }
      .ivu-btn-text:focus {
         box-shadow: none!important;
      }
    }
  }
</style>
