<template>
  <div>
    <head-top></head-top>

  </div>
</template>

<script>
import headTop from '../common/head/head'

export default {
  data () {
    return {
    }
  },

  mounted () {

  },
  components: {
    headTop
  },
  computed: {
  },

  methods: {
    // 点击图标刷新页面
    reload () {
      window.location.reload()
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
