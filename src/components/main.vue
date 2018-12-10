<template>
  <div class="main" :style="{paddingTop: paddTop}">
    <div class="out_box">
      <div
        v-for="(item, index) in list"
        :key="item.name"
        class="box"
        :class="{active: !item.active}"
      >
        <div v-for="(v1, i1) in item.children" :key="i1" class="inner_box"
        :style="{
          marginBottom: item.show ? '20px' : '60px',
          width: item.active && item.show && i1 < 6 ? '300%' : '100%',
          left: item.active && item.show && i1 < 6 ? index*-100+'%' : 0
          }">
          <template v-if="!item.show">
            <div
              :style="{
                  borderColor: v1.border,
                  left: v1.left,
                  transform: v1.translate}"
              class="child"
            >
              <span :style="{backgroundColor: v1.tit}">{{v1.num}}</span>
              <span>{{v1.name}}</span>
            </div>
          </template>
          <template v-else>
            <template v-if="!v1.name">
              <template v-for="(v2, i2) in v1.children">
                <div
                  :style="{
                    borderColor: v2.border,
                    left: !item.active ? '50%' : v2.left,
                    transform: !item.active ? 'translateX(-50%)' : v2.translate}"
                  :key="i2"
                  class="child"
                >
                  <span :style="{backgroundColor: v2.tit}">{{v2.num}}</span>
                  <span>{{v2.name}}</span>
                </div>
              </template>
            </template>
            <template v-else>
              <template v-if="!v1.type">
                <div
                  :style="{
                      borderColor: v1.border,
                      left: !item.active ? '50%' : v1.left,
                      transform: !item.active ? 'translateX(-50%)' : v1.translate}"
                  class="child"
                > 
                  <span :style="{backgroundColor: v1.tit}">{{v1.num}}</span>
                  <span>{{v1.name}}</span>
                </div>
              </template>
              <template v-else>
                <img :src="v1.url" class="spot">
              </template>
            </template>
          </template>
        </div>
        <div class="btn" @click="toggle(index)" :class="{active:item.active}">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import list1 from "./list";

export default {
  data() {
    return {
      paddTop: null,
      list1,
      list: []
    };
  },
  created() {
    this.paddTop =
      window.innerHeight - 900 < 0 ? "100px" : window.innerHeight - 900 + "px"
    let list = JSON.parse(JSON.stringify(this.list1))
    list.forEach((v, i) => {
      v.children = v.children.splice(v.children.length - 5, 5)
    })
    this.list = JSON.parse(JSON.stringify(list))
  },
  mounted() {},
  methods: {
    toggle(index) {
      let list = JSON.parse(JSON.stringify(this.list1))
      list.forEach((v, i) => {
        v.show = true
        if (i !== index) {
          console.log(v.children.length)
          v.active = false
          v.children = [{url: require('assets/spot.png'), name: true, type: true}].concat(v.children.splice(v.children.length - 3, 3))
        } else {
          v.active = true
        }
      })
      this.list = JSON.parse(JSON.stringify(list))
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  min-width: 1100px;
  height: 100%;
  padding: 100px 4% 0 0;
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  position: absolute;
  justify-content: center;
  .out_box {
    width: 100%;
    height: 100%;
    position: relative;
    > div.box {
      display: inline-block;
      width: 33.333333%;
      position: absolute;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 0;
      &:nth-child(2) {
        left: 33.33333%;
      }
      &:last-child {
        left: 66.66666%;
      }
      &.active::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        left: 0;
        top: 0;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0)
        );
      }
      .inner_box {
        position: relative;
        width: 100%;
        height: 30px;
        left: 0;
        top: 0;
        > div {
          cursor: pointer;
          height: 30px;
          padding: 0 32px 0 56px;
          box-sizing: border-box;
          border-radius: 15px;
          border: 2px solid transparent;
          line-height: 26px;
          position: absolute;
          span:first-child {
            color: #fff;
            line-height: 30px;
            position: absolute;
            left: -2px;
            top: -2px;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            background-color: transparent;
          }
        }
        .spot {
          position: absolute;
          bottom: -10px;
          width: 52px;
          height:10px;
          margin-left: -26px;
        }
      }
      .btn {
        display: inline-block;
        width: 268px;
        height: 46px;
        border: 4px solid #0040a6;
        line-height: 38px;
        box-sizing: border-box;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        border-radius: 8px;
        position: relative;
        z-index: 10;
        &::before {
          content: "";
          box-sizing: border-box;
          position: absolute;
          width: 268px;
          height: 46px;
          border-radius: 8px;
          bottom: -10px;
          left: -4px;
          border: 2px solid #0040a6;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-top: none;
        }
        &.active {
          background-color: #0040a6;
          color: #fff;
        }
      }
    }
  }
}
</style>