<template>
  <div class="usrcenter">
    <div class="uc-infor">
      <div v-on:click="usrPic">
        <v-img :imgUrl="usr_hp[0]" class="uc-usr-pic"></v-img>
      </div>
      <div class="uc-right">
        <span class="uc-usr-name">{{usr_name}}</span>
        <router-link to='/inforch'>
          <span class="iconfont eat_icon-left uc-if-right"></span>
        </router-link>
        <p v-if="ISSHOP" class="uc-usr-shop">商家用户</p>
      </div>
    </div>
    <div class="uc-icon-ch">
      <div class="uc-icon">
        <router-link to='homepage'>
          <a id="ic-shouye"><span class="iconfont eat_icon-home uc-ic-home"></span></a>
          <label for="ic-shouye">首页</label>
        </router-link>
      </div>
      <div class="uc-icon">
        <a id="ic-taxi"><span class="iconfont eat_icon-taxi uc-ic-taxi"></span></a>
        <label for="ic-taxi">我的行程</label>
      </div>
      <div class="uc-icon">
        <router-link to="mycomment">
          <a id="ic-commnet"><span class="iconfont eat_icon-comment uc-ic-comment"></span></a>
          <label for="ic-commnet">我的评价</label>
        </router-link>
      </div>
      <div class="uc-icon">
        <router-link to="message">
          <a id="ic-mes"><span class="iconfont eat_icon-xiaoxi uc-ic-xiaoxi"></span></a>
          <label for="ic-mes">消息</label>
          <p class="uc-usr-ifnum" v-if="usr_infoNum > 0">{{usr_infoNum}}</p>
        </router-link>
      </div>
    </div>
    <div class="uc-shop-list" v-if="ISSHOP">
      <div class="uc-list">
        <router-link to="shopphoto">
          <span>商家相册</span>
          <span class="iconfont eat_icon-left uc-list-right"></span>
        </router-link>
      </div>
      <div class="uc-list">
        <router-link to="pushbaichi">
          <span>发布白食</span>
          <span class="iconfont eat_icon-left uc-list-right"></span>
        </router-link>
      </div>
      <div class="uc-list">
        <router-link to="pushyouhui">
          <span>发布活动</span>
          <span class="iconfont eat_icon-left uc-list-right"></span>
        </router-link>
      </div>
    </div>
    <div class="usr-uc-pic" @click.self="usrCancel" v-show="UC_PIC_CH">
    <!-- <transition name="slide-up"> -->
      <ul class="uc-pic-ch" @click.stop>
        <label for="uc-file">
          <li>
            <input type="file" accept="image/*" id="uc-file"  @change="onPhotoChange"/>
            <span>从相册选择图片</span>
          </li>
        </label>
        <li v-on:click="goSeeBig">查看大图</li>
        <li v-on:click="usrCancel">取消</li>
      </ul>
    <!-- </transion> -->
    </div>
  <bigphoto v-on:bigHidden="bigHide" :bigphdata='usr_hp' :slideIndex='set_slide_index' v-if="lookBig"></bigphoto>
  </div>
</template>

<script>
import vImg from '../lazyloadimg/lazyimg.vue'
import bigphoto from '../bigphoto/bigphoto.vue'
export default {
  name: 'shop',
  components: {
    vImg,
    bigphoto
  },
  data () {
    return {
      lookBig: false,
      set_slide_index: [],
      UC_PIC_CH: false
    //   usrdata: {
    //     usr_shop: true,
    //     usr_id: 1,
    //     usr_name: '梁总',
    //     usr_infoNum: 55,
    //     usr_pic: 'http://ww4.sinaimg.cn/bmiddle/005WfFgKgw1fbsiduaum0j30hs0qogmr.jpg'
    //   }
    }
  },
  computed: {
    ISSHOP () {
      return this.$store.state.syusr.ISSHOP
    },
    usr_name () {
      return this.$store.state.syusr.usr_name
    },
    usr_hp () {
      return this.$store.state.syusr.usr_hp
    },
    usr_infoNum () {
      return this.$store.state.syusr.usr_infoNum
    }
  },
  created () {
    this.$store.commit('UPDATE_EATUSER', false)
    this.$store.commit('UPDATE_EATCAMERA', false)
    this.$store.commit('UPDATE_EATLEFT', true)
    this.$store.commit('UPDATE_EATHOME', false)
    this.$store.commit('UPDATE_EATTITLE', false)
  },
  methods: {
    usrPic () {
      this.UC_PIC_CH = true
    },
    onPhotoChange (e) {
      var files = e.target.files || e.dataTransfer.files
      console.log(files)
      if (files.length) {
        if (typeof FileReader === 'undefined') {
          window.alert('浏览器不支持')
          return false
        }
        // var leng = file.length
      }
    },
    usrCancel () {
      this.UC_PIC_CH = false
    },
    goSeeBig () {
      this.UC_PIC_CH = false
      this.set_slide_index = 0
      this.lookBig = true
      // console.log(this.set_slide_index)
    },
    bigHide () {
      this.lookBig = false
    }
  }
}
</script>

<style>
.usrcenter{
  background: #f0edf0;
  height: 100%;
}
.uc-infor,.uc-icon-ch{
  height: 4.2rem;
  background-color: #fff ;
  padding: .2rem 1.5rem 0 1.5rem;
  margin-bottom: .5rem;
}
.uc-usr-pic{
  float: left;
  max-width: 4rem;
  max-height: 4rem;
  border-radius: 10rem;
  overflow: hidden;
}
.uc-usr-pic img{
  width: 100%;
  height: 100%;
}
.uc-right{
  margin-left: 6rem;
}
.uc-usr-name{
  position: relative;
  top: .6rem;
  text-align: right;
}
.uc-usr-shop{
  position: relative;
  top: 1rem;
  left: 0rem;
  font-size: .8rem;
  color: orange;
}
.uc-if-right{
  float: right;
  margin-top: 1.4rem;
  -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
.uc-icon{
  float: left;
  width: 25%;
  padding-top: .5rem;
  text-align: center;
}
.uc-icon a .iconfont{
  font-size: 1.5rem;
}
.uc-icon label{
  display: block;
}
.uc-icon-ch{
  padding: 0;
}
.uc-usr-ifnum{
  position: relative;
  top: -1rem;
  right: 1.4rem;
  float: right;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 2rem;
  font-size: .8rem;
  line-height: 1.2rem;
  color: #fff;
  background: red;
}
.uc-list{
  height: 2.4rem;
  padding: 0 1.5rem;
  margin-bottom: .1rem;
  line-height: 2.4rem;
  background: #fff;
}
.uc-list-right{
  float: right;
  -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
.usr-uc-pic{
  position: fixed;
  top: 0;
  width: 100%;
  height:100%;
  background: rgba(0,0,0,.7);
  z-index: 9999;
}
.uc-pic-ch{
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 680px;
  text-align: center;
}
.uc-pic-ch li{
  height: 3rem;
  font-size: 1.2rem;
  line-height: 3rem;
  background: #fff;
}
.uc-pic-ch li:nth-child(2){
  border-top: 1px solid grey;
  border-bottom: 1rem solid #f0edf0;
}
/*.uc-pic-ch li:first-child{
 outline:1px solid #000 ;
}*/
#uc-file{
  display: none;
}

/*动画*/
.slide-up-enter{

}
.slide-up-enter-active{

}
.slide-up-leave{

}
.slide-up-leave-active{

}
</style>
