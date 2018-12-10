<template>
  <div class="home">
    <iff-header :left-show="leftShow"></iff-header>
    <iff-main :left-show="leftShow" @changeData="changeData"></iff-main>
  </div>
</template>

<script>
import iffHeader from '@@/header'
import iffMain from '@@/main'

export default {
  name: 'home',
  data() {
    return {
      leftShow: false,
      showObj: {}
    }
  },
  methods: {
    changeData(name, value) {
      this[name] = value
    }
  },
  components: {
    iffHeader,
    iffMain
  }
}
</script>

<style scoped lang='less'>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>