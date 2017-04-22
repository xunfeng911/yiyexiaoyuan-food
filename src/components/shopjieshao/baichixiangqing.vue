<template>
  <div class="bcxq">
    <div class="bcxq-hd-name">
      <span>活动名称：</span>
      <span>{{bcxqData.name}}</span>
    </div>
    <div class="bcxq-hd-begin">
      <span>活动开始时间：</span>
      <span>{{bcxqData.begin}}</span>
    </div>
    <div class="bcxq-hd-end">
      <span>活动结束时间：</span>
      <span>{{bcxqData.end}}</span>
    </div> 
    <div class="bcxq-hd-tel">
      <span>咨询电话：</span>
      <span>{{bcxqData.tel}}</span>
    </div>
    <div class="bcxq-hd-eatend">
      <span>白食截止时间：</span>
      <span>{{bcxqData.eat_end}}</span>
    </div>
    <div class="bcxq-hd-num">
      <span>白食名额：</span>
      <span>{{bcxqData.num}}</span>
    </div>
    <div class="bcxq-hd-pic" v-for="pic in bcxqData.pic">
        <v-img :imgUrl="pic.path" class="bcxq-hd-pic"></v-img>
    </div>
    <div class="bcxq-hd-text">
      <span>{{bcxqData.textcont}}</span>
    </div>
  </div>
</template>
<script>
import vImg from '../lazyloadimg/lazyimg.vue'
export default {
  name: 'bcxq',
  components: {
    vImg
  },
  data () {
    return {
      bcxqUrl: '',
      bcxqUp: {
        shopId: null,
        privilegeActivityId: null
      },
      bcxqData: {
        privilegeActivityId: 1,
        name: '白痴来白吃',
        begin: '2016-2-2',
        end: '2018-2-2',
        eat_end: '2018-2-10',
        tel: '11111111111',
        num: '8',
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
    this.bcxqUp.privilegeActivityId = this.$store.state.symes.MES_choose_youhui
    this.bcxqUp.shopId = this.$store.state.symes.MES_hdr_id
    this.$http.post(this.bcxqUrl, this.bcxqUp).then(response => {
      this.bcxqData = response.bcxqData
    })
  }
}
</script>
<style type="text/css">
.bcxq{
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  background: #fff;
  text-align: center;
}
.bcxq div{
  position: relative;
  left: 20%;
  width: 60%;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  display: flex; 
  justify-content: space-between;
}
.bcxq-hd-pic{
  position: relative;
  left: 5% !important;
  width: 90% !important;
  margin-bottom: .5rem !important;
  height: auto;
}
.bcxq-hd-pic img{
  width: 100%;
  height: 100%;
}
</style>