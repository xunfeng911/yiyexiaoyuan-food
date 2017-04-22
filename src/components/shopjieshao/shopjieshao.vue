<template>
  <div class="sjs">
    <div class="sjs-sc">
      <v-img :imgUrl="sjsdata.hdr_pic" class="sjs-hdr-pic"></v-img>
      <div class="sjs-right">
        <p><strong>{{sjsdata.hdr_name}}</strong></p>
        <div class="sjs-hdr-one">
          <span v-for="star in 5">
            <span class="iconfont eat_icon-star sjs-hdr-star"></span>
          </span>
          <span class="sjs-hdr-cost">{{sjsdata.hdr_cost}}元/人</span>
          <span class="iconfont eat_icon-zan sjs-ic-zan" @click="DZbaichi"></span>
          <span class="sjs-hdr-zan">{{sjsdata.hdr_prise}}</span>
        </div>
        <div class="sjs-hdr-two">
          <span class="sjs-hdr-place">{{sjsdata.hdr_place}}</span>
          <span class="sjs-hdr-kind">{{sjsdata.hdr_kind}}</span>
        </div>
        <div class="sjs-hdr-three">
          <span class="sjs-hdr-detpc">{{sjsdata.hdr_detPlace}}</span>
        </div>
        <button class="sjs-hdr-dp" @click="goToPublish">点评</button>
      </div>
    </div>
    <div class="sjs-hd">
      <p>优惠活动</p>
      <div class="sjs-hd-free">
        <span class="iconfont eat_icon-baichi sjs-ic-baichi"></span>
        <span class="sjs-hdr-free">{{sjsdata.hdr_free}}</span>
        <button class="sjs-hd-xp" @click="goSeeFree(sjsdata.hdr_id)">详情</button>
      </div>
      <div class="sjs-hd-yh" v-for="party in sjsdata.hdr_fst">
        <span class="iconfont eat_icon-youhui sjs-ic-youhui"></span>
        <span class="sjs-hdr-fst" @click="goSeeFst(party.fst_id)">{{party.fst_name}}</span>
        <span class="iconfont eat_icon-left sjs-ic-right" @click="goSeeFst(party.fst_id)"></span>
      </div>
    </div>
    <div class="sjs-photo">
      <p class="sjs-ph-title">商家相册</p>
      <div class="sjs-ph-ch">
        <button :class="{'cho-active': isTj}" v-on:click="sjsTj">推荐菜</button>
        <button :class="{'cho-active': isCd}" v-on:click="sjsCd">菜单</button>
        <button :class="{'cho-active': isHj}" v-on:click="sjsHj">环境</button>
      </div>
      <!--轮播图-->
      <div>
        <swiper :options="swiperOption" class="sjs-sw">
              <swiper-slide v-for="(pic, index) in swiper_hdr_pic" class="sjs-swiper">
                <div v-on:click.stop="goSeeBig(index)">
                  <v-img :imgUrl="pic.hdr_pic" class="sjs-swiper"></v-img>
                </div>
                  <span class="sjs-pic-food">{{pic.hdr_food}}</span>
              </swiper-slide>
              <div class="swiper-scrollbar"></div>
            </swiper>
      </div>
    </div>
    <div class="sjs-yhdp">
      <div class="sjs-yd-title">
        <span>用户点评</span>
        <span class="sjs-yd-comtNum">（{{sjsdata.hdr_comtNum}}）</span>
        <span class="iconfont eat_icon-left sjs-ic-right"></span>
      </div>
      <div class="sjs-yd-ch">
        <button :class="{'cho-active': isALL}" v-on:click="sjs_all">所有</button>
        <button :class="{'cho-active': isZUIXIN}" v-on:click="sjs_new">最新</button>
        <button :class="{'cho-active': isYOUTU}" v-on:click="sjs_youtu">有图</button>
      </div>
      <div class="sjs-yd-dp">
        <div class="sjs-dp-left">
          <p>{{sjsaverage}}</p>
          <p>{{sjsdata.hdr_comtNum}}人以评价</p>
        </div>
        <div class="sjs-dp-right">
          <p>味道：{{sjsdata.hdr_taste}}</p>
          <p>份量：{{sjsdata.hdr_weight}}</p>
        </div>
      </div>
    </div>
    <v-modal :symod="symod "v-on:mod_yes="spsj_Sub"></v-modal>
    <!-- 查看大图 -->
    <bigphoto v-on:bigHidden="bigHide" :bigphdata='swiper_hdr_pic' :slideIndex='set_slide_index' v-if="lookBig"></bigphoto>
  </div>
</template>

<script>
import vImg from '../lazyloadimg/lazyimg.vue'
import student from '../friendnews/student.vue'
import bigphoto from '../bigphoto/bigphoto.vue'
import vModal from '../modal/modal.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'shopjieshao',
  components: {
    vImg,
    student,
    bigphoto,
    vModal,
    swiper,
    swiperSlide
  },
  data () {
    return {
      lookBig: false,
      lookindex: null,
      // 选择button控制
      isALL: true,
      isZUIXIN: false,
      isYOUTU: false,
      isTj: true,
      isCd: false,
      isHj: false,
      // vuex控制获取商家id
      MES_hdr_id: [],
      // modal内容
      symod: {
        isShow: false,
        cont: '你特么没登陆，先去登陆',
        loading: true,
        btn: false
      },
      // 点赞url
      zanUrl: '1111',
      zanData: {
        hdr_id: null,
        usr_id: null
      },
      // 设置查看大图
      set_slide_index: [],
      swiper_hdr_pic: [
        {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/799416335/TB237iacA1M.eBjSZFOXXc0rFXa_!!799416335.jpg_600x600.jpg', hdr_food: '兔女郎'},
        {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/856560636/TB2l16_mVXXXXcJXXXXXXXXXXXX_!!856560636.jpg_600x600.jpg', hdr_food: '日式樱花'},
        {hdr_pic: 'https://img.alicdn.com/imgextra/i2/2898229938/TB2VZyebHFlpuFjy0FgXXbRBVXa_!!2898229938.jpg_430x430q90.jpg', hdr_food: '性感情趣'},
        {hdr_pic: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg', hdr_food: '半乳T恤'},
        {hdr_pic: 'https://img.alicdn.com/bao/uploaded/i2/TB1LudONVXXXXXuXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg', hdr_food: '性感旗袍'},
        {hdr_pic: 'https://gd1.alicdn.com/bao/uploaded/i1/85374180/TB2ABOgX_ga61BjSspiXXXUSXXa_!!85374180.jpg_600x600.jpg', hdr_food: '清纯女仆'}
      ],
      sjsUrl: '11',
      sjsdata: {
        hdr_id: 1,
        hdr_name: '梁总川菜馆',
        hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg',
        hdr_prise: 22,
        hdr_star: 4.4,
        hdr_free: '你就是个白吃',
        hdr_fst: [
         {fst_name: '吃五百送八百', fst_id: 1},
         {fst_name: '吃八百送八百', fst_id: 2}
        ],
        hdr_place: '梁总家',
        hdr_detPlace: '海棠8号楼二区622右室右靠门床',
        hdr_kind: '家常菜',
        hdr_cost: 12,
        hdr_comtNum: 88,
        hdr_taste: 8.8,
        hdr_weight: 9.9,
        hdr_tj_pics: [
          {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/799416335/TB237iacA1M.eBjSZFOXXc0rFXa_!!799416335.jpg_600x600.jpg', hdr_food: '兔女郎'},
          {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/856560636/TB2l16_mVXXXXcJXXXXXXXXXXXX_!!856560636.jpg_600x600.jpg', hdr_food: '日式樱花'},
          {hdr_pic: 'https://img.alicdn.com/imgextra/i2/2898229938/TB2VZyebHFlpuFjy0FgXXbRBVXa_!!2898229938.jpg_430x430q90.jpg', hdr_food: '性感情趣'},
          {hdr_pic: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg', hdr_food: '半乳T恤'},
          {hdr_pic: 'https://img.alicdn.com/bao/uploaded/i2/TB1LudONVXXXXXuXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg', hdr_food: '性感旗袍'},
          {hdr_pic: 'https://gd1.alicdn.com/bao/uploaded/i1/85374180/TB2ABOgX_ga61BjSspiXXXUSXXa_!!85374180.jpg_600x600.jpg', hdr_food: '清纯女仆'}
        ],
        hdr_cd_pics: [
          {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/799416335/TB237iacA1M.eBjSZFOXXc0rFXa_!!799416335.jpg_600x600.jpg', hdr_food: '兔女郎'},
          {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/856560636/TB2l16_mVXXXXcJXXXXXXXXXXXX_!!856560636.jpg_600x600.jpg', hdr_food: '日式樱花'},
          {hdr_pic: 'https://img.alicdn.com/imgextra/i2/2898229938/TB2VZyebHFlpuFjy0FgXXbRBVXa_!!2898229938.jpg_430x430q90.jpg', hdr_food: '性感情趣'},
          {hdr_pic: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg', hdr_food: '半乳T恤'},
          {hdr_pic: 'https://img.alicdn.com/bao/uploaded/i2/TB1LudONVXXXXXuXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg', hdr_food: '性感旗袍'},
          {hdr_pic: 'https://gd1.alicdn.com/bao/uploaded/i1/85374180/TB2ABOgX_ga61BjSspiXXXUSXXa_!!85374180.jpg_600x600.jpg', hdr_food: '清纯女仆'}
        ],
        hdr_hj_pics: [
          {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/799416335/TB237iacA1M.eBjSZFOXXc0rFXa_!!799416335.jpg_600x600.jpg', hdr_food: '兔女郎'},
          {hdr_pic: 'https://gd2.alicdn.com/bao/uploaded/i2/856560636/TB2l16_mVXXXXcJXXXXXXXXXXXX_!!856560636.jpg_600x600.jpg', hdr_food: '日式樱花'},
          {hdr_pic: 'https://img.alicdn.com/imgextra/i2/2898229938/TB2VZyebHFlpuFjy0FgXXbRBVXa_!!2898229938.jpg_430x430q90.jpg', hdr_food: '性感情趣'},
          {hdr_pic: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1dyZdKXXXXXb4XpXXXXXXXXXX_!!2-item_pic.png_600x600.jpg', hdr_food: '半乳T恤'},
          {hdr_pic: 'https://img.alicdn.com/bao/uploaded/i2/TB1LudONVXXXXXuXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg', hdr_food: '性感旗袍'},
          {hdr_pic: 'https://gd1.alicdn.com/bao/uploaded/i1/85374180/TB2ABOgX_ga61BjSspiXXXUSXXa_!!85374180.jpg_600x600.jpg', hdr_food: '清纯女仆'}
        ]
      },
      swiperOption: {
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: false,
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 15,
        grabCursor: false
      }
    }
  },
  computed: {
    sjsaverage: function () {
      var a = (this.sjsdata.hdr_taste + this.sjsdata.hdr_weight) / 2
      return a.toFixed(1)
    }
  },
  methods: {
    sjsTj () {
      this.isTj = true
      this.isCd = false
      this.isHj = false
      this.swiper_hdr_pic = this.sjsdata.hdr_tj_pics
    },
    sjsCd () {
      this.isTj = false
      this.isCd = true
      this.isHj = false
      this.swiper_hdr_pic = this.sjsdata.hdr_cd_pics
    },
    sjsHj () {
      this.isTj = false
      this.isCd = false
      this.isHj = true
      this.swiper_hdr_pic = this.sjsdata.hdr_hj_pics
    },
    sjs_all () {
      this.isALL = true
      this.isZUIXIN = false
      this.isYOUTU = false
    },
    sjs_new () {
      this.isALL = false
      this.isZUIXIN = true
      this.isYOUTU = false
    },
    sjs_youtu () {
      this.isALL = false
      this.isZUIXIN = false
      this.isYOUTU = true
    },
    // 前往评论
    goToPublish () {
      let isLogin = this.$store.state.syusr.ISLOGINED
      if (isLogin === true) {
        this.$store.commit('PASS_MES_CHOOSE_SHOP', this.sjsdata.hdr_name)
        this.symod.cont = '正在前往评论'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
          this.$router.push('/stpublish')
        }, 1000)
      } else {
        this.symod.cont = '先滚去登陆'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
          this.$router.push('/login')
        }, 1000)
      }
    },
    // 点赞白吃
    DZbaichi () {
      // window.alert('a')
      let isLogin = this.$store.state.syusr.ISLOGINED
      let isZan = this.$store.state.syusr.ISDIANZAN
      if (isLogin === true) {
        if (isZan === false) {
          this.symod.cont = '每日白食点赞无法取消，确定点赞？'
          this.symod.btn = true
          this.symod.loading = false
          this.symod.isShow = true
        } else {
          this.symod.cont = '你今天已尽点过白食赞，优质评分也有累积分！'
          this.symod.btn = false
          this.symod.loading = false
          this.symod.isShow = true
          setTimeout(x => {
            this.symod.isShow = false
          }, 1000)
        }
      } else {
        this.symod.cont = '先滚去登陆'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
          this.$router.push('/login')
        }, 1000)
      }
    },
    // 点赞成功触发
    spsj_Sub () {
      this.symod.isShow = false
      this.$http.post(this.zanUrl, this.zanData).then(response => {
        this.sjsdata.hdr_prise += 1
        this.$store.commit('UPDATE_ISDIANZAN')
        this.symod.cont = '点赞成功'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
        }, 1000)
      }, response => {
        this.sjsdata.hdr_prise += 1
        this.$store.commit('UPDATE_ISDIANZAN')
        this.symod.cont = '点赞成功'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
        }, 1000)
      })
    },
    // 白吃，优惠详情界面
    goSeeFree () {
      this.$store.commit('PASS_MES_CHOOSE_BAICHI', this.sjsdata.hdr_id)
      this.$router.push('/bcxq')
    },
    goSeeFst (mes) {
      this.$store.commit('PASS_MES_CHOOSE_YOUHUI', mes)
      this.$router.push('/hdxq')
    },
    goSeeBig (index) {
      this.set_slide_index = index
      this.lookBig = true
      console.log(this.set_slide_index)
    },
    bigHide () {
      this.lookBig = false
    }
  },
  created () {
    this.MES_hdr_id = this.$store.state.symes.MES_hdr_id
    this.$http.post(this.sjsUrl, this.MES_hdr_id).then(response => {
      this.sjsdata = response.sjsdata
    }, response => {
    })
    this.zanData.hdr_id = this.sjsdata.hdr_id
    this.zanData.usr_id = this.$store.state.syusr.usr_id
    console.log('MES_hdr_id:' + this.MES_hdr_id)
    console.log(this.zanData)
  }
}
</script>

<style>
.sjs-sc{
  height: 8.5rem;
  padding: .5rem 1rem;
  margin-bottom: .6rem;
  background-color: #fff;
}
.sjs-hdr-pic{
  max-width: 10rem;
  max-height: 7rem;
  width: 33%;
  float: left;
}
.sjs-hdr-pic>img{
  height: 100%;
  width: 100%;
}
.sjs-right{
  width: 63%;
  float: left;
  margin-left: 4%;
}
.sjs-hdr-name{
  font-weight: 900;
}
.sjs-hdr-one{
  margin-top: .2rem;
}
.sjs-ic-zan{
  margin-left: 1.5rem;
  font-size: 1.5rem;
  color: red;
}
.sjs-hdr-zan{
  color: grey;
}
.sjs-hdr-star{
  color: red;
}
.sjs-hdr-cost{
  margin-left: 1rem;
  font-size: .9rem;
  color: gray;
}
.sjs-hdr-two{
  padding-bottom: .2rem;
  border-bottom: 1px solid gainsboro;
  font-size: .9rem;
  color: gray;
}
.sjs-hdr-three{
  margin-top: .2rem;
  font-size: .9rem;
  color: grey;
}
.sjs-hdr-dp{
  float: right;
  width: 4rem;
  height: 2rem;
  border: 0;
  border-radius: 2px;
  margin-top: .5rem;
  font-size: 1rem;
  color: white;
  background: red;
}
.sjs-hdr-kind{
  margin-left: 1rem;
}
.sjs-hd{
  background: #fff;
}
.sjs-hd>p{
  padding: .3rem 0;
  border-bottom: 1px solid grey;
  margin: 0 1rem;
}
.sjs-ic-baichi{
  margin-right: .5rem;
  font-size: 1.4rem;
  color: orange;
}
.sjs-ic-youhui{
  margin-right: .5rem;
  font-size: 1.4rem;
  color: red;
}
.sjs-hd-free,.sjs-hd-yh{
  margin: .4rem 1rem;
  line-height: 1.4rem;
}
.sjs-hd-yh:last-child{
  padding-bottom: .7rem;
}
.sjs-hd-xp{
  float: right;
  width: 3.3rem;
  height: 1.6rem;
  border: 0;
  border-radius: 3px;
  color: #fff;
  background: red;
}
.sjs-ic-right{
  float: right;
  padding-right: 1.5rem;
  margin-top: .5rem;
  -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
.sjs-hdr-free,.sjs-hdr-fst{
  position: relative;
  top: -0.1rem;
  display: inline-block;
}
.sjs-photo{
  width: 100%;
  background: #fff;
}
.sjs-ph-title{
  padding: 0.3rem 0rem;
  border-bottom: 1px solid grey;
  margin: 0 1rem;
}
.sjs-yd-comtNum{
  color: red;
  display: inline-block;
}
.sjs-ph-ch,.sjs-yd-ch{
  margin-top: .8rem;
}
.sjs-ph-ch button,.sjs-yd-ch button{
  width: 20%;
  height: 2rem;
  padding: 0;
  border: 1px solid grey;
  border-radius: 5px;
  font-size: .8rem;
  line-height: 2rem;
  background: #fff;
  margin-left: 9.5%;
}
.sjs-ph-ch button:hover,.sjs-ph-ch button:active{
  color: #fff !important;
  background: #ef7850 !important;
  border: 0 !important;
}
.sjs-yd-ch button:hover,.sjs-yd-ch button:link{
  color: #fff !important;
  background: #ef7850 !important;
  border: 0 !important;
}
.sjs-yhdp{
  width: 100%;
  margin-top: .5rem;
  background: #fff;
}
.sjs-yd-title{
  padding: .3rem 0 .7rem 0;
  border-bottom: 1px solid grey;
  margin: 0 1rem;
}
.sjs-yd-title .sjs-ic-right{
  margin-top: .3rem;
}
.sjs-yd-dp{
  width: 100%;
  height: 6rem;
  text-align: center;
  background-color: #fff;
}
.sjs-dp-left,.sjs-dp-right{
  margin-top: 1rem;
  display: inline-block;
}
.sjs-dp-left p:first-child{
  font-size: 2rem;
  color: red;
}
.sjs-dp-left p:last-child{
  font-size: .8rem;
}
.sjs-dp-right{
  margin-left: 1rem;
  font-size: .8rem;
}
.sjs-sw{
  margin-top: .6rem;
  padding-bottom: .6rem;
  height: 6rem;
}
.sjs-swiper{
  max-width: 6rem;
  max-height: 6rem;
}
.sjs-swiper img{
  width: 100%;
  height: 100%;
}
.sjs-pic-food{
  position: absolute;
  top: 4.5rem;
  width: 6rem;
  height: 1.4rem;
  font-size: .8rem;
  line-height: 1.4rem;
  text-align: center;
  color: #fff;
  background: rgba(0,0,0,.6);
  z-index: 10;
}
@media only screen and (min-width: 300px) and (max-width: 376px) {
  .sjs-ic-zan{
    margin-left: .6rem;
  }
  .sjs-hdr-cost{
    margin-left: .4rem;
  }
  .sjs-hdr-detpc{
    font-size: .8rem;
  }
/*  .sjs-ph-ch button,.sjs-yd-ch button{
    margin-left: 2.2rem;
  }*/
}
</style>