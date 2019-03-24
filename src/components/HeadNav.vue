<template>
  <a-layout-header class="layout-header-bar" :class="collapsed ? 'close-width' : 'open-width'">
    <div class="header-nav">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="collapsedMenu"
      />
      <div class="header-nav__right">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#" style="cursor: pointer">
            <!--<a-avatar :src="userInfo.avatar" size="small" />-->
            <span>欢迎，{{userInfo.name}}</span>
          </a>
          <a-menu slot="overlay" style="margin-top: 10px" @click="selectDropdownItem">
            <a-menu-item key="person">
              <a href="javascript:;">个人信息</a>
            </a-menu-item>
            <a-menu-item key="logout">
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: 'head-nav',
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.user
    }
  },
  methods: {
    collapsedMenu() {
      this.collapsed = !this.collapsed
      this.$emit('collapsedMenu', this.collapsed)
    },
    selectDropdownItem(select) {
      switch (select.key) {
        case 'person':
          this.showInfoList()
          break
        case 'logout':
          this.logout()
          break
        default:
          console.log('no this item')
      }
    },
    showInfoList() {},
    logout() {
      localStorage.removeItem('sanmiToken')
      localStorage.removeItem('defaultSelectedMenuItem')
      localStorage.removeItem('defaultOpenKeys')
      this.$store.dispatch('clearCurrentStatus')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
  .layout-header-bar{
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,.1);
    position: fixed;
    z-index: 1;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
      &:hover {
        color: #1890ff;
      }
    }
    .header-nav {
      height: 100%;
      display: flex;
      .header-nav__right {
        flex: 1;
        text-align: right;
        margin-right: 40px;
        .welcome-title {
          margin-right: 20px;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
  .close-width {
    width: calc(100% - 80px);
    left: 80px;
  }
  .open-width {
    width: calc(100% - 200px);
    left: 200px;
  }
</style>
