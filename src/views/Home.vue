<template>
  <div class="home">
    <iff-header :left-show="leftShow" @changeData="changeData" @close="close"></iff-header>
    <iff-main
      :left-show="leftShow"
      @changeData="changeData"
      @close="close"
      :font_size="font_size"
      :ab-font="abFont"
    >
      <iff-detail :show-obj="showObj" :left-show="leftShow" @changeData="changeData"></iff-detail>
    </iff-main>
  </div>
</template>

<script>
import iffHeader from "@@/header";
import iffMain from "@@/main";
import iffDetail from "@@/leftDetail";

export default {
  name: "home",
  data() {
    return {
      leftShow: false,
      showObj: {},
      font_size: 100,
      abFont: 85, // 缩小字体大小
      curFont: 100
    };
  },
  methods: {
    changeData(name, value) {
      this[name] = value;
    },
    close() {
      if (this.leftShow) {
        this.leftShow = false;
        this.font_size = this.curFont;
      }
    }
  },
  components: {
    iffHeader,
    iffMain,
    iffDetail
  }
};
</script>

<style scoped lang='less'>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>