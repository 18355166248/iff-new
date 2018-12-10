<template>
  <div class="leftDetail" :class="{show: leftShow}">
    <span class='iconfont icon-guanbi' @click="close"></span>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="showObj.icon"></use>
    </svg>
    <h1>{{showObj.text}}</h1>
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
        if (this.$refs[v.name] && this.$refs[v.name].length === 1 && this.$refs[v.name][0].classList.contains('contect')) {
          this.$refs[v.name][0].classList.remove('contect')
        }
      })
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('changeData', 'leftShow', false)
    },
    toggle(name) {
      if (this.$refs[name][0].classList.contains('contect')) {
        this.$refs[name][0].classList.remove('contect')
      } else {
        this.$refs[name][0].classList.add('contect')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.leftDetail {
  width: 0;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  background-color: #fff;
  transition: width 100ms;
  &.show {
    width: 400px;
  }
  h1 {
    font: 700 26px 'Aril';
  }
  > .icon {
    width: 130px;
    height: 130px;
    margin: 20px 0;
    text-align: center;
  }
  > .iconfont {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  > ul {
    margin-top: 20px;
    > li {
      padding: 0 20px;
      > div {
        text-align: left;
        position: relative;
        .icon-xiala {
          position: absolute;
          right: 0;
        }
        &:first-child {
          color: blue;
          font-weight: 700;
          cursor: pointer;
        }
        &:nth-child(2) {
          margin: 10px;
          transition: all 100ms;
          height: 0;
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
