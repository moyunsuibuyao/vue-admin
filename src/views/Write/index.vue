<template>
  <div class="write">
    <div style="z-index: 1000" class="m-b-20">
      <Select v-model="articleType" style="width: 200px" multiple placeholder="请选择文章分类">
        <Option v-for="item in typeList" :key="item._id" :value="item._id">{{item.name}}</Option>
      </Select>
      <Input :maxlength="100" class="d-inline-block w-60 m-l-20" v-model="description" placeholder="请输入文章简介，100字内"></Input>
    </div>
    <div>
      <mavon-editor
        :style="{ zIndex: 300, height: editorHeight }"
        v-model="content"
        ref="md"
        :toolbars="markdownOption"
        @save="saveMyWrite"
        placeholder="文章标题请用h1，一篇文章只能用一个h1"
      >
      </mavon-editor>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'index',
  data() {
    return {
      // 文章类型，0：前端，1：随笔
      articleType: [],
      typeList: [],
      articleId: '',
      content: '',
      description: '',
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  computed: {
    editorHeight() {
      return `${window.innerHeight - 160}px`
    },
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.articleId = this.$route.params.id
    this.initTypeList()
    if (this.articleId !== 'add') {
      this.initArticle()
    }
  },
  methods: {
    initTypeList() {
      this.$axios.get('/api/writeTypes/list').then((res) => {
        if (res && res.data) {
          this.typeList = res.data
        } else {
          this.typeList = []
        }
      })
    },
    initArticle() {
      this.$axios.get('/api/articles/item', {
        params: { id: this.articleId }
      }).then((res) => {
        if (res && res.data) {
          res.data.writeType.forEach((item) => {
            this.articleType.push(item._id)
          })
          this.content = Base64.decode(res.data.markdownContent)
          this.description = res.data.description
        }
      })
    },
    saveMyWrite(value, render) {
      const editor = document.createRange().createContextualFragment(render).children[0]
      const title = editor && editor.innerText ? editor.innerText : ''
      const params = this.getParamsData(title, value, render)
      const api = this.articleId === 'add' ? '/api/articles/add' : '/api/articles/edit'
      this.$axios.post(api, params).then((res) => {
        if (res && res.data) {
          this.articleId = res.data._id
          this.$router.push(`/write/${res.data._id}`)
          return this.$Message.success(this.articleId === 'add' ? '添加成功' : '编辑成功')
        }
      })
    },
    getParamsData(title, render, value) {
      const params = {}
      Object.assign(params, {
        title,
        content: Base64.encode(render),
        markdownContent: Base64.encode(value),
        creatorId: this.userInfo.id,
        creator: this.userInfo.name,
        writeType: this.articleType,
        description: this.description
      })
      if (!params.writeType.length) {
        return this.$Message.warning('请选择文章分类')
      }
      if (!params.description) {
        return this.$Message.warning('请输入文章简介')
      }
      if (!params.title) {
        return this.$Message.warning('请输入文章标题')
      }
      if (this.articleId !== 'add') {
        params._id = this.articleId
      }
      return params
    }
  }
}
</script>

<style scoped lang="less">
</style>
