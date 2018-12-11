<template>
  <div
    class="main"
    :style="{paddingTop: paddTop, fontSize: font_size+'px'}"
    
  >
    <div class="out_box">
      <!-- 侧边栏 -->
      <slot></slot>
      <div v-for="(item, index) in list"
        :key="item.name"
        :style="{zIndex: item.active ? 10 : 0}"
        class="box">
        <div class="package" :class="{active: !item.active}">
          <div
            v-for="(v1, i1) in item.children"
            :key="i1"
            class="inner_box"
            :style="{
            marginBottom: item.show ? '1.25em' : '3.75em',
            width: item.active && item.show && i1 < 6 ? '300%' : '100%',
            left: item.active && item.show && i1 < 6 ? index*-100+'%' : 0
            }"
          >
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
                    @click.stop="showDetail(index, i1, i2)"
                    :class="v2.select ? 'active' : ''"
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
                    @click.stop="showDetail(index, i1)"
                    :class="v1.select ? 'active' : ''"
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
        </div>
        <div class="btn" @click="toggle(index)" :class="{active:item.active}">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import list1 from "./list";

export default {
  props: ['font_size', 'abFont'],
  data() {
    return {
      paddTop: null,
      list1,
      list: []
    };
  },
  created() {
    this.paddTop =
      document.body.clientHeight - 900 < 0 ? "100px" : document.body.clientHeight - 900 + "px"
    let list = JSON.parse(JSON.stringify(this.list1))
    list.forEach((v, i) => {
      v.children = v.children.splice(v.children.length - 5, 5)
    })
    this.list = JSON.parse(JSON.stringify(list))
  },
  methods: {
    toggle(index) {
      let list = JSON.parse(JSON.stringify(this.list1))
      list.forEach((v, i) => {
        v.show = true;
        if (i !== index) {
          v.active = false;
          v.children = [
            { url: require("assets/spot.png"), name: true, type: true }
          ].concat(v.children.splice(v.children.length - 3, 3));
          v.children.forEach((v1) => {
            if (v1.children) {
              v1.children.forEach(v2 => {
                v2.select = false
              })
            } else {
              v1.select = false
            }
          })
        } else {
          v.active = true;
        }
      })
      this.list = JSON.parse(JSON.stringify(list));
    },
    showDetail(index, i1, i2) {
      this.dealArr(index, i1, i2)
      var item = this.selectCur(index, i1, i2)


      this.showDom(item)
    },
    dealArr(index, i1, i2) {
      this.list.forEach((v,i) => {
        v.children.forEach((v1,ii) => {
          if (v1.children) {
              v1.children.forEach((v2,iii) => {
                v2.select = false
              })
            } else {
              v1.select = false
            }
        })
        if (i !== index) {
          let item = JSON.parse(JSON.stringify(this.list1[i]))
          const curIndex = Math.abs(item.children.length - i1 -1)
          let start = (8-curIndex) > 0 ? (8-curIndex) : 0
          let end = 11-curIndex
          let light = (9 - curIndex) ? 2 : 1
          
          if (curIndex > 1) { // 点击超过第二个的时候
             let children = [
                { url: require("assets/spot.png"), name: true, type: true }
              ].concat(item.children.slice(start, end))
            children.forEach((vv3, ii3) => {
              if (vv3.children) {
                children[ii3] = vv3.children[0]
              }
            })

            children[light].select = true
            v.children = children
          } else { // 当点击第一个或者第二个的时候
            v.children[Math.abs(4 - curIndex - 1)].select = true
          }
          let children = [
            { url: require("assets/spot.png"), name: true, type: true }
          ].concat(item.children.slice(item.children.length - i1, 3))
          // console.log(Math.abs(item.children.length - i1 -1))
        }
      })
    },
    selectCur(index, i1, i2) {
      let item
      if (i2 || i2 === 0) {
        item = JSON.parse(JSON.stringify(this.list1[index].children[i1].children[i2]))
        this.list[index].children[i1].children[i2].select = true
      } else {
        item = JSON.parse(JSON.stringify(this.list1[index].children[i1]))
        this.list[index].children[i1].select = true
      }
      return item
    },
    showDom(item) {
      this.$emit("changeData", "leftShow", true);
      this.$emit("changeData", "font_size", this.abFont);
      this.$emit("changeData", "showObj", item);
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
    display: flex;
    > div.box {
      display: inline-block;
      text-align: center;
      height: 100%;
      flex: 1;
      position: relative;
      z-index: 0;
      .package {
        bottom: 1em;
        left: 0;
        width: 100%;
        position: absolute;
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
          height: 1.875em;
          left: 0;
          top: 0;
          font-size: 0.16em;
          > div {
            cursor: pointer;
            height: 1.875em;
            padding: 0 2em 0 3.5em;
            box-sizing: border-box;
            border-radius: 1em;
            border: 2px solid transparent;
            line-height: 1.625em;
            position: absolute;
            &.active {
              border-style: dashed;
            }
            span:first-child {
              color: #fff;
              line-height: 1.875em;
              position: absolute;
              left: -2px;
              top: -2px;
              width: 1.875em;
              height: 1.875em;
              border-radius: 1em;
              background-color: transparent;
            }
          }
          .spot {
            position: absolute;
            bottom: -0.625em;
            width: 3.25em;
            height: 0.625em;
            margin-left: -1.625em;
          }
        }
      }
      .btn {
        cursor: pointer;
        display: inline-block;
        width: 13.4em;
        height: 2.3em;
        border: 0.2em solid #0040a6;
        line-height: 1.9em;
        box-sizing: border-box;
        text-align: center;
        font-weight: 700;
        font-size: 0.2em;
        border-radius: 0.4em;
        bottom: 1em;
        z-index: 10;
        left: 50%;
        margin-left: -6.7em;
        position: absolute;
        &::before {
          content: "";
          box-sizing: border-box;
          position: absolute;
          width: 13.4em;
          height: 2.3em;
          border-radius: 0.4em;
          bottom: -0.5em;
          left: -0.2em;
          border: 0.1em solid #0040a6;
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