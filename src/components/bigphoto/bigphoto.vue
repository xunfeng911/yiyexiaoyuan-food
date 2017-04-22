<template>
<div class="bigphoto" v-on:click="bigHidden">
<!--轮播图-->
  <div class="big-pics">
    <swiper :options="swiperOption">
          <swiper-slide v-for="pic in bigphdata">
              <!-- <v-img :imgUrl="pic.hdr_pic" class="big-pic" ></v-img> -->
              <img :src="pic.hdr_pic||pic.photo||pic" class="big-pic" />
              <div v-if="pic.hdr_food" class="big-content">{{pic.hdr_food}}</div>
          </swiper-slide>
          <div class="swiper-scrollbar"></div>
        </swiper>
  </div>
</div>
</template>

<script>
import vImg from '../lazyloadimg/lazyimg.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'bigphoto',
  components: {
    vImg,
    swiper,
    swiperSlide
  },
  props: ['bigphdata', 'slideIndex'],
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        initialSlide: 0
      }
    }
  },
  methods: {
    bigHidden () {
      this.$emit('bigHidden')
    }
  },
  created () {
    console.log('big' + this.bigphdata, this.slideIndex)
    this.swiperOption.initialSlide = this.slideIndex
  }
}
</script>
<style type="text/css">
.bigphoto{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0,0,0,.8);
  z-index: 999;
  display: flex;
  align-items: center;
}
.big-pics{
  position: relative;
  width: 100%;
}
.big-pic{
  width: 100%;
  height: auto;
}
.big-pic img{
  width: 100%;
  height: 100%;
}
.big-content{
  margin-top: 1rem;
  text-align: center;
}
</style>