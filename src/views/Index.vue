<template>
  <a-layout id="basic-layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" class="fixed-sider">
      <div class="logo">
        <img src="../assets/ant.svg">
        <span v-show="!collapsed">ADMIN</span>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :inlineCollapsed="collapsed"
        v-show="menuList.length"
        :defaultSelectedKeys="defaultSelectedMenuItem"
        :defaultOpenKeys="defaultOpen"
        @select="selectedMenu"
      >
        <template v-for="item in menuList">
          <a-sub-menu :key="item.path" v-if="item.children.length">
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{item.name}}</span>
            </span>
            <a-menu-item v-for="value in item.children" :key="value.path">
              {{value.name}}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path">
            <a-icon :type="item.icon" />
            <span>{{item.name}}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{marginLeft: `${collapsed ? '80px' : '200px'}`, marginRight: '16px'}">
      <head-nav @collapsedMenu="collapsedMenu"></head-nav>
      <a-layout-content class="basic-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import HeadNav from '../components/HeadNav'

export default {
  name: 'index',
  components: { HeadNav },
  data() {
    return {
      collapsed: false,
      menuList: [],
      defaultSelectedMenuItem: ['/index'],
      defaultOpen: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.user
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.$axios.get('/api/menus/list').then((res) => {
        if (res && res.status === 200 && res.data) {
          this.menuList = res.data.filter((item) => {
            item.children = res.data.filter((value) => {
              return value.parentId === item._id
            })
            return item.level === 1
          })
        } else {
          this.menuList = []
        }
      }).catch(() => {
        this.menuList = []
      })
    },
    selectedMenu({ key }) {
      this.$router.push(key)
    },
    collapsedMenu(val) {
      this.collapsed = val
    }
  }
}
</script>

<style scoped lang="less">
  #basic-layout {
    height: 100%;
    .fixed-sider {
      overflow-y: auto;
      height: 100%;
      position: fixed;
      left: 0;
    }
    .logo {
      height: 64px;
      background: #002140;
      display: flex;
      img {
        height: 40px;
        width: 40px;
        margin-top: 12px;
        margin-left: 18px
      }
      span {
        flex: 1;
        margin-left: 10px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        line-height: 64px;
      }
    }
    .basic-content {
      width: 100%;
      margin: 80px 16px 16px 16px;
      min-height: 280px;
    }
  }
</style>
