<template>
  <div class="shopcard" v-on:click.stop="goToXQ">
    <v-img :imgUrl="scdata.hdr_pic" class="sc-hdr-pic"></v-img>
    <div class="sc-hdr-mes">
      <span class="sc-hdr-name">{{scdata.hdr_name}}</span>
      <div class="sc-hdr-one">
        <span v-for="star in 5">
          <span class="iconfont eat_icon-star sc-hdr-star"></span>
        </span>
        <span class="sc-hdr-cost">{{scdata.hdr_cost}}元/人</span>
      </div>
      <div class="sc-hdr-two">
        <span class="sc-hdr-place">{{scdata.hdr_place}}</span>
        <span class="sc-hdr-kind">{{scdata.hdr_kind}}</span>
      </div>
      <div class="sc-hdr-three">
        <span class="iconfont eat_icon-baichi sc-hdr-baichi"></span>
        <span class="sc-hdr-free">{{scdata.hdr_free}}</span>
      </div>
      <div class="sc-hdr-four">
        <span class="iconfont eat_icon-youhui sc-hdr-youhui"></span>
        <span class="sc-hdr-fst">{{scdata.hdr_fst}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import vImg from '../lazyloadimg/lazyimg.vue'

export default {
  name: 'shopcard',
  components: {
    vImg
  },
  props: ['scdata'],
  methods: {
    goToXQ () {
      this.$store.commit('PASS_MES_HDR_ID', this.scdata.hdr_id)
      this.$router.push('/shopjieshao')
    }
  },
  mounted () {
  }
}

</script>

<style>
.shopcard{
  height: 8rem;
  padding: .5rem 1rem;
  margin-bottom: .6rem;
  background-color: #fff;
}
.sc-hdr-pic{
  max-width: 10rem;
  max-width: 7rem;
  width: 33%;
  float: left;
}
.sc-hdr-pic>img{
  height: 100%;
  width: 100%;
}
.sc-hdr-mes{
  width: 63%;
  float: left;
  margin-left: 4%;
}
.sc-hdr-name{
  font-weight: 900;
}
.sc-hdr-one{
  margin-top: .2rem;
}
.sc-hdr-star{
  color: red;
}
.sc-hdr-cost{
  margin-left: 1rem;
  font-size: .9rem;
  color: gray;
}
.sc-hdr-two{
  padding-bottom: .2rem;
  border-bottom: 1px solid gainsboro;
  margin-top: .3rem;
  font-size: .9rem;
  color: gray;
}
.sc-hdr-kind{
  margin-left: 1rem;
}
.sc-hdr-three,.sc-hdr-four{
  margin-top: .4rem;
  font-size: 1.1rem;
}
.sc-hdr-baichi{
  color: orange;
}
.sc-hdr-youhui{
  color: red;
}
@media only screen and (min-width: 310px) and (max-width: 375px) {
  .shopcard{
    height: 8rem;
  }
  .sc-hdr-three,.sc-hdr-four{
  font-size: .8rem;
}
}
</style>