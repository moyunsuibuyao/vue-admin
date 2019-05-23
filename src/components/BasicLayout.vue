<template>
  <div id="basic-layout">
    <Layout>
      <Header
        :style="{
          position: 'fixed',
          width: '100%',
          padding: 0,
          background: '#fff',
          zIndex: 1000
        }">
        <Menu
          mode="horizontal"
          style="height: 64px"
          :active-name="$route.path"
          ref="sideMenu"
          @on-select="selectMenu"
        >
          <div class="layout-header__wrapper">
            <div class="layout-title">三米主页</div>
            <div class="layout-nav">
<!--              :to="item.path"-->
              <template v-for="item in menuList">
                <MenuItem
                  v-if="!item.children.length"
                  to="/profile"
                  :key="item._id"
                  :name="item.path"
                >
                  <span :class="item.icon"></span>
                  {{item.name}}
                </MenuItem>
                <Submenu v-else :key="item._id" :name="item.path">
                  <template slot="title">
                    <span :class="item.icon"></span>
                    {{item.name}}
                  </template>
                  <template v-for="val in item.children">
<!--                    <MenuItem :key="val._id" :name="val.path" :to="val.path">{{val.name}}</MenuItem>-->
                    <MenuItem :key="val._id" :name="val.path" to="/profile">{{val.name}}</MenuItem>
                  </template>
                </Submenu>
              </template>
            </div>
            <div class="layout-user">
              <Button
                shape="circle"
                type="error"
                icon="ios-brush"
                @click="writeArticle"
                style="margin-right: 40px"
              >
                写文章
              </Button>
              <Dropdown @on-click="handleClick">
                <a href="javascript:void(0)">
                  <img src="../assets/moyun.jpeg" class="idol-avatar">
                  <span class="fa fa-caret-down caret-down"></span>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="personal">个人信息</DropdownItem>
                  <DropdownItem name="logout">退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '64px 0 0 0', background: '#fff', height: contentHeight}">
        <template v-if="$route.meta.keepAlive">
          <keep-alive>
            <router-view style="padding: 20px"></router-view>
          </keep-alive>
        </template>
        <template v-else>
          <router-view style="padding: 20px"></router-view>
        </template>
      </Content>
    </Layout>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'BasicLayout',
  data() {
    return {
      menuList: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
    contentHeight() {
      return `${window.innerHeight - 64}px`
    }
  },
  created () {
    const token = localStorage.getItem('sanmiToken')
    if (token) {
      const decoded = jwtDecode(token)
      this.$store.dispatch('userInfo', decoded)
    }
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.$axios.get('/api/menus/list').then((res) => {
        if (res.data && res.data.length) {
          this.menuList = this.treeData(res.data).filter((item) => {
            return item.level !== 2
          })
        } else {
          this.menuList = []
        }
        this.$nextTick(() => {
          this.$refs.sideMenu.updateActiveName()
        })
      })
    },
    treeData(data) {
      data.forEach((item) => {
        if (item.level === 1) {
          this.$set(item, 'children', [])
        }
        data.forEach((val) => {
          if (item.level === 2 && item.parentId === val._id) {
            val.children.push(item)
          }
        })
      })
      return data
    },
    writeArticle() {
      if (this.userInfo.identity === '0') {
        this.$Message.warning('暂无权限')
      } else {
        this.$router.push('/write')
      }
    },
    selectMenu() {
      if (this.userInfo.identity === '0') {
        return this.$Message.warning('现只开放简历模块，其他模块暂未开放')
      }
    },
    handleClick(name) {
      switch (name) {
        case 'logout':
          localStorage.removeItem('sanmiToken')
          this.$router.push('/login')
          break
        case 'personal':
          if (this.userInfo.identity === '0') {
            return this.$Message.warning('暂无权限')
          }
          this.$router.push('/personal')
          break
        default:
          console.log('no found this name')
      }
    }
  }
}
</script>

<style scoped lang="less">
  #basic-layout {
    height: 100%;
    .layout-header__wrapper {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      -webkit-align-items: center;
      box-align: center;
      -moz-box-align: center;
      -webkit-box-align: center;
      .layout-title {
        width: 100px;
        height: 100%;
        color: #2C3E50;
        font-size: 24px;
        font-weight: 700;
        margin: 0 40px;
      }
      .layout-nav {
        margin-left: 50px;
        box-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        flex: 1;
        -webkit-flex: 1;
      }
      .layout-user {
        margin-right: 20px;
        .idol-avatar {
          height: 40px;
          width: 40px;
          border: 1px solid #ddd;
          border-radius: 50%;
          vertical-align: middle;
        }
        .caret-down {
          margin-left: 10px;
          font-size: 16px;
          color: #999;
        }
      }
    }
  }
</style>
