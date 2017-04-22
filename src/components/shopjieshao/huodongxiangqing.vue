<template>
  <div class="hdxq">
    <div class="hdxq-hd-name">
      <span>活动名称：</span>
      <span>{{hdxqData.name}}</span>
    </div>
    <div class="hdxq-hd-begin">
      <span>活动开始时间：</span>
      <span>{{hdxqData.begin}}</span>
    </div>
    <div class="hdxq-hd-end">
      <span>活动结束时间：</span>
      <span>{{hdxqData.end}}</span>
    </div> 
    <div class="hdxq-hd-tel">
      <span>咨询电话：</span>
      <span>{{hdxqData.tel}}</span>
    </div>
    <div class="hdxq-hd-pic" v-for="pic in hdxqData.pic">
        <v-img :imgUrl="pic.path" class="hdxq-hd-pic"></v-img>
    </div>
    <div class="hdxq-hd-text">
      <span>{{hdxqData.textcont}}</span>
    </div>
  </div>
</template>
<script>
import vImg from '../lazyloadimg/lazyimg.vue'
export default {
  name: 'hdxq',
  components: {
    vImg
  },
  data () {
    return {
      hdxqUrl: '',
      hdxqUp: {
        shopId: null,
        privilegeActivityId: null
      },
      hdxqData: {
        privilegeActivityId: 1,
        name: '吃八百送八百',
        begin: '2016-2-2',
        end: '2018-2-2',
        tel: '11111111111',
        textcont: '22222222222',
        shopId: 2,
        pic: [
          {
            privilegeActivityId: 1,
            path: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg'
          },
          {
            privilegeActivityId: 1,
            path: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg'
          },
          {
            privilegeActivityId: 1,
            path: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg'
          }
        ]
      }
    }
  },
  created () {
    this.hdxqUp.privilegeActivityId = this.$store.state.symes.MES_choose_youhui
    this.hdxqUp.shopId = this.$store.state.symes.MES_hdr_id
    this.$http.post(this.hdxqUrl, this.hdxqUp).then(response => {
      this.hdxqData = response.hdxqData
    })
  }
}
</script>
<style type="text/css">
.hdxq{
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  background: #fff;
  text-align: center;
}
.hdxq div{
  position: relative;
  left: 20%;
  width: 60%;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  display: flex; 
  justify-content: space-between;
}
.hdxq-hd-pic{
  position: relative;
  left: 5% !important;
  width: 90% !important;
  height: auto;
}
.hdxq-hd-pic img{
  width: 100%;
  height: 100%;
}
</style>