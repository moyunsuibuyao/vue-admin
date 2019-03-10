<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'app',
  created () {
    const token = localStorage.getItem('sanmiToken')
    if (token) {
      const decoded = jwt_decode(token)
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style lang="less">
html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
