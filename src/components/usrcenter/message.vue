<template>
  <div class="stuMyMessage">
    <div class="msgBox" v-for="i in boxData">
      <div class="msgBox-usr-pic">
        <v-img :imgUrl="i.usr_hp" class="msgBox-usr-hp"></v-img>
      </div>
      <div class="msgBox-main">
        <span class="msgBox-usr-name" :class="{ msgBoxIsHdr: i.isHdr }">{{i.userId}}</span>
        <span class="msgBox-do">{{i.doWhat}}</span>
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

  .msgBox-main {
    margin-top: 20px;
    margin-left: 100px;
  }

  .msgBox-usr-pic {
    float: left;
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
    overflow: hidden;
    background-color: rgba(81, 93, 184, 1);
  }

  .msgBox-usr-hp img {
    width: 100%;
    height: 100%;
  }

  .msgBox-usr-name {
    font-size: 18px;
    color: rgba(81, 93, 184, 1);
  }

  .msgBoxIsHdr {
    color: orange;
    font-weight: bold;
  }
</style>
<script>
  import vImg from '../lazyloadimg/lazyimg.vue'
  export default{
    data () {
      return {
        boxData: [
          {
            isHdr: true,
            userId: 'hello树先生',
            doWhat: '回复了你的评价',
            usr_hp: 'http://tva2.sinaimg.cn/crop.3.0.634.634.1024/cd516b22jw8fa4mlfynwzj20hs0hm0tr.jpg'
          },
          {
            sHdr: false,
            userId: '徐太浪',
            doWhat: '回复了你的回复',
            usr_hp: 'http://img3.duitang.com/uploads/item/201408/25/20140825082917_LaGy4.thumb.224_0.jpeg'
          }
        ]
      }
    },
    name: 'message',
    components: {
      vImg
    }
  }
</script>
