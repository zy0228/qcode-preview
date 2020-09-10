<template>
  <div>
    <div class="qcode">
      <img v-if="!url" width="350" height="350" src="../assets/timg.gif" alt="">
      <img v-else width="350" height="350" :src=url alt="">
    </div>
    <div class="operation-btn">
      <button @click="getQcode">{{infoText}}</button>
    </div>

    <div class="aside">
      打开窗户让孤单透气， 这一间屋子如此密闭
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      url: '',
      infoText: '获取最新预览码',
      ip: ''
    }
  },
  created () {
    this.getQcode()
  },
  methods: {
    getQcode () {
      this.url = ''
      this.infoText = '拼命获取中~'
      axios.get(`http://${window.location.hostname}:3000/getQcode`).then(res => {
        this.url = 'data:image/png;base64,' + res.data
        this.infoText = '获取最新预览码'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.qcode
  margin-top 100px
.operation-btn button
  cursor pointer
  height 40px
  width 120px
  background-color #42b983
  border none
.aside
  height 40px
  line-height 40px
  margin-top 200px
  overflow hidden
  font-size 20px
  color #2c3e50
  font-style italic
</style>
