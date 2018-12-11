<template>
  <div class="header" @click="$emit('close')">
    <div class="fl">
      C&A Career Journey
    </div>
    <div class="fr right">
      <div v-for="item in list" :key="item">{{item}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['leftShow'],
    data() {
      return {
        list: ['Expertise', 'Innovation', 'Leadership']
      }
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped lang='less'>
  .header {
    overflow: hidden;
    height: 100px;
    line-height: 100px;
    box-sizing: border-box;
    padding-right: 33px;
    position: relative;
    z-index: 99;
    > div {
      font-family: "Mshtakan", Arial, sans-serif;
    }
    > div:first-child {
      color: #00399c;
      font-size: 42px;
      font-weight: 700;
      word-spacing: 10px;
    }
    .right {
      height: 100%;;
      line-height: 100px;
      overflow: hidden;
      display: flex;
      align-items: center;
      > div {
        width: 123px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        &:first-child {
          background-color: #ffdd00;
          margin-right: 20px;
        }
        &:nth-child(2) {
          background-color: #8ce200;
          margin-right: 20px;
        }
        &:last-child {
          background-color: #47b9fc;
        }
      }
    }
  }
</style>