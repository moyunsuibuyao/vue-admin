<template>
  <div class="write">
    <div class="m-b-20" style="z-index: 1000">
      <Select v-model="articleType" style="width: 200px">
        <Option v-for="item in typeList" :key="item._id" :value="item._id">{{item.name}}</Option>
      </Select>
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
      articleType: '',
      typeList: [],
      content: '',
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
    }
  },
  created () {
    this.initTypeList()
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
    saveMyWrite(value, render) {
      const title = document.createRange().createContextualFragment(render).children[0].innerText
      console.log({
        title
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
