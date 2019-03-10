<template>
  <Header
    :style="{background: '#fff', padding: 0, boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
    class="layout-header-bar"
  >
    <div class="header-nav">
      <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
      <div class="header-nav__right">
        <Dropdown @on-click="selectDropdownItem">
          <div style="cursor: pointer">
            <Avatar :src="userInfo.avatar" size="small" />
            <Icon type="md-arrow-dropdown" style="margin-left: 5px; color: #333; font-size: 14px"></Icon>
          </div>
          <DropdownMenu slot="list" style="text-align: left">
            <DropdownItem name="person">个人信息</DropdownItem>
            <DropdownItem name="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </Header>
</template>

<script>
export default {
  name: 'head-nav',
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    userInfo () {
      return this.$store.getters.user
    }
  },
  methods: {
    collapsedSider () {
      this.isCollapsed = !this.isCollapsed
      this.$emit('collapsedSider', this.isCollapsed)
    },
    selectDropdownItem (select) {
      switch (select) {
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
    showInfoList () {},
    logout () {
      localStorage.removeItem('sanmiToken')
      this.$store.dispatch('clearCurrentStatus')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    .header-nav {
      height: 100%;
      display: flex;
      .menu-icon{
        cursor: pointer;
        display: inline-block;
        width: 30px;
        line-height: 64px;
        transition: all .3s;
      }
      .rotate-icon{
        transform: rotate(-90deg);
      }
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
</style>
