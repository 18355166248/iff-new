<template>
  <div class="contect" @click="show">
    <h2>PROFILES</h2>
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['leftShow'],
    data() {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    methods: {
      show() {
        if (this.leftShow) this.$emit('changeData', 'leftShow', false)
      }
    }
  }
</script>

<style scoped lang='less'>
  .contect {
    position: fixed;
    right: 0;
    top: 0;
    width: 120px;
    height: 100%;
    background-color: rgba(37, 33, 85, 0.37);
    overflow: auto;
    h2 {
      padding-top: 50px;
    }
    ul {
      li {
        text-align: center;
        margin: 20px auto;
        width: 60px;
        height: 60px;
        background-color: aqua;
        border-radius: 30px;
        line-height: 60px;
      }
    }
  }
</style>
