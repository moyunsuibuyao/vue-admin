<template>
  <div class="read h-100 of-y-auto">
    <div class="post-node h-100">
      <h1 class="m-b-20">{{articleInfo.title}}</h1>
      <div class="author m-b-28">
        <p class="meta m-t-5">
          <span>作者：{{articleInfo.creator}}</span>
          <span class="m-l-20">创建时间：{{$moment(articleInfo.date).format('YYYY-MM-DD')}}</span>
          <span class="m-l-20">文章类型：{{type}}</span>
        </p>
      </div>
      <mavon-editor
        v-html="content"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :boxShadow="false"
      />
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'index',
  data() {
    return {
      articleId: '',
      content: '',
      articleInfo: {},
      type: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.articleId = this.$route.query.id
    console.log(this.$axios.defaults.baseURL)
    this.initArticle()
  },
  methods: {
    initArticle() {
      this.$axios.get('/api/articles/item', {
        params: { id: this.articleId }
      }).then((res) => {
        if (res && res.data) {
          this.articleInfo = res.data
          const arr = []
          res.data.writeType.forEach((item) => {
            arr.push(item.name)
          })
          this.type = arr.join('、')
          this.content = Base64.decode(res.data.content).split('</h1>')[1]
        } else {
          this.articleInfo = {}
          this.content = ''
        }
      })
    }
  }
}
</script>

<style lang="less">
  .read {
    .markdown-body h2 {
      border-bottom: none!important;
    }
    .post-node {
      margin: 0 auto;
      padding-bottom: 20px;
      width: 65%;
      .meta {
        span {
          color: #969696;
        }
      }
    }
  }
</style>
