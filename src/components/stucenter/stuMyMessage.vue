<template>
  <div class="stuMyMessage">
    <div class="msgBox">
      <div class="msgBox-usr-pic">
        <v-img :imgUrl="boxData.usr_hp" class="msgBox-usr-hp"></v-img>
      </div>
      <div class="msgBox-main">
        <span class="msgBox-usr-name" :class="{ msgBoxIsHdr: boxData.isHdr }">hmp</span>
        <span class="msgBox-do">{{boxData.doWhat}}</span>
      </div>
    </div>
    <div class="msgBox">
      <div class="msgBox-usr-pic">
        <v-img :imgUrl="boxData.usr_hp" class="msgBox-usr-hp"></v-img>
      </div>
      <div class="msgBox-main">
        <span class="msgBox-usr-name" :class="{ msgBoxIsHdr: boxData.isHdr }">hmp</span>
        <span class="msgBox-do">{{boxData.doWhat}}</span>
      </div>
    </div>
  </div>
</template>
<style>

  .msgBox {
    height: 6rem;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #7e8c8d;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    box-sizing: border-box;
  }
  .msgBox-main{
    margin-top: 20px;
    margin-left: 100px;
  }
  .msgBox-usr-pic {
    float: left;
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
    overflow: hidden;
    background-color: #2c3e50;
  }
  .msgBox-usr-hp img{
    width: 100%;
    height: 100%;
  }
  .msgBox-usr-name{
    font-size: 18px;
    font-weight: bold;
  }
  .msgBoxIsHdr{
    color: orange;
  }
</style>
<script>
  import vImg from '../lazyloadimg/lazyimg.vue'
  export default{
    data () {
      return {
        boxData: {
          isHdr: true,
          doWhat: '回复了你的评价',
          usr_hp: 'http://tva2.sinaimg.cn/crop.3.0.634.634.1024/cd516b22jw8fa4mlfynwzj20hs0hm0tr.jpg'
        }
      }
    },
    name: 'stuMyMessage',
    components: {
      vImg
    }
  }
</script>
