<template>
  <div class="article">
    <Card>
      <div class="wrapper-filter d-flex">
        <div class="w-px-70 m-t-1">文章类别</div>
        <div class="flex_1">
          <CheckboxGroup v-model="isChecked">
            <template v-for="item in typeList">
              <Checkbox class="m-l-10" :key="item._id" :label="item._id">{{item.name}}</Checkbox>
            </template>
          </CheckboxGroup>
        </div>
      </div>
    </Card>
    <div class="article-list m-t-10">
      <Row type="flex" :gutter="20">
        <template v-for="(item, index) in articleList">
          <Col span="12" :key="index" class="m-t-10">
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
                <Button type="text">
                  <span class="fz-14" style="font-weight: 500">
                   >>> 阅读全文
                  </span>
                </Button>
              </div>
            </Card>
          </Col>
        </template>
      </Row>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'index',
  data() {
    return {
      typeList: [],
      articleList: [],
      isChecked: [],
      keyword: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
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
      const params = {}
      this.$axios.get('/api/articles/list', { params }).then((res) => {
        if (res && res.data) {
          this.articleList = res.data
          this.articleList.forEach((item) => {
            console.log(Base64.decode(item.content))
          })
        } else {
          this.articleList = []
        }
      })
    },
    removeArticle(data) {
      if (this.userInfo.identifier === '1') {
        this.$axios.get('/api/articles/delete', {
          params: { id: data._id }
        }).then((res) => {
          if (res && res.data) {
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
      if (this.userInfo.identifier === '1') {
        this.$router.push(`/write/${item._id}`)
      } else {
        this.$Message.info('对不起，只有三米才有该权限')
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "./styles";
</style>
<style lang="less">
  .article {
    .article-list {
      .ivu-card-body {
        padding: 0!important;
      }
    }
  }
</style>
