<template>
  <div class="leftDetail" :class="{show: leftShow}" @click.stop>
    <span class="iconfont icon-guanbi" @click="close"></span>
    <h1>{{showObj.name}}</h1>
    <ul>
      <li v-for="item in showObj.list" :key="item.name">
        <div @click="toggle(item.name)">
          <span class="text-title">{{item.name}}</span>
          <span class="iconfont icon-xiala"></span>
        </div>
        <div :ref="item.name">{{item.contect}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    leftShow: {
      type: Boolean,
      default: false
    },
    showObj: {
      type: Object,
      default: {}
    }
  },
  watch: {
    showObj(newval) {
      newval.list.forEach(v => {
        if (
          this.$refs[v.name] &&
          this.$refs[v.name].length === 1 &&
          this.$refs[v.name][0].classList.contains("contect")
        ) {
          this.$refs[v.name][0].classList.remove("contect");
        }
      });
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("changeData", "leftShow", false);
      this.$emit("changeData", "font_size", 100);
    },
    toggle(name) {
      if (this.$refs[name][0].classList.contains("contect")) {
        this.$refs[name][0].classList.remove("contect");
      } else {
        this.$refs[name][0].classList.add("contect");
      }
    }
  }
};
</script>

<style scoped lang='less'>
.leftDetail {
  width: 0;
  height: 100%;
  z-index: 110;
  overflow: auto;
  background-color: #fff;
  transition: width 100ms;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  position: relative;
  font-size: 100px;
  &.show {
    width: 360px;
  }
  h1 {
    font: 700 .30em "Aril";
    margin: 40px 0;
  }
  .icon-guanbi {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  > ul {
    margin-top: .2em;
    > li {
      padding: 0 .2em;
      > div {
        text-align: left;
        position: relative;
        span {
          position: absolute;
        }
        .text-title {
          font-size: 20px;
        }
        .icon-xiala {
          right: 0;
        }
        &:first-child {
          color: blue;
          font-weight: 700;
          cursor: pointer;
          height: .3em;
        }
        &:nth-child(2) {
          margin: .10em;
          transition: all 100ms;
          height: 0;
          font-size: 16px;
          overflow: hidden;
        }
        &.contect {
          height: auto;
        }
      }
    }
  }
}
</style>
