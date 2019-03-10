<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Sider
        :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}"
        ref="side"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <div :style="{height: '64px', background: '#002140', display: 'flex'}">
          <img src="../assets/ant.svg" style="height: 40px; width: 40px; margin-top: 12px; margin-left: 12px">
          <span v-show="!isCollapsed" style="flex: 1; margin-left: 10px; color: #fff; font-size: 18px; font-weight: 600; line-height: 64px">三米</span>
        </div>
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <Icon type="ios-navigate"></Icon>
            <span>Option 1</span>
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="ios-search"></Icon>
            <span>Option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>Option 3</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout :style="{marginLeft: `${isCollapsed ? '78px' : '200px'}`}">
        <HeadNav @collapsedSider="collapsedSider" />
        <Content :style="{padding: '16px', overflowY: 'auto'}">
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'

export default {
  name: 'index',
  components: { HeadNav },
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    userInfo () {
      return this.$store.getters.user
    }
  },
  methods: {
    collapsedSider (val) {
      this.isCollapsed = val
      this.$refs.side.toggleCollapse()
    }
  }
}
</script>

<style scoped lang="less">
  .layout{
    height: 100%;
    background: #f5f7f9;
    position: relative;
    .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }
    .menu-item {
      span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
      }
      i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
      }
    }
    .collapsed-menu {
      span {
        width: 0;
        transition: width .2s ease;
      }
      i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
      }
    }
  }
</style>
