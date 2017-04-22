<template>
  <div>
    <div class="fm-more">
      <span>点击此处参加更多白食</span>
    </div>
    <div class="fm-rule">
      <h5>规则：每日一次点赞机会，点赞截止</h5>
      <h5>时间按数量排名获得白食机会</h5>
      <h5>（一个有效评价=5个赞）</h5>
    </div>
    <figure v-for="(data, index) in hdrMes " class="fm-card">
      <div class="fm-hdr-card">
        <v-img :imgUrl="data.hdr_pic" class="fm-hdr-pic"></v-img>
        <div class="fm-hdr-mes">
          <span class="fm-hdr-name">{{data.hdr_name}}</span>
          <span class="fm-hdr-free" >{{data.hdr_free}}</span>
          <span class="iconfont eat_icon-baichi fm-bai" ></span>
          <div class="fm-usr-zan">
            <span class="iconfont eat_icon-zan fm-zan" @click="DZbaichi(index)"></span>
            <span class="fm-span-zan">{{data.usr_zan}}</span>
          </div>
          <h5>点赞截止时间：{{data.hdr_prise_stopTime}}</h5>
          <h5>使用截止时间：{{data.hdr_free_stopTime}}</h5>
          <p>我的排名：<span>{{data.usr_rank}}</span></p>
          <button class="fm-hdr-dp" @click="goToPublish(data.hdr_id)">点评</button>
        </div>
      </div>
      <div class="fm-free-pubr">
        <div v-for="free in data.free_top" class="fm-pubr-rank">
          <h4 class="fm-pubr-name">{{free.pubr_name}}</h4>
          <span class="fm-probar" :style="{width:free.pubr_zan /50 * 90 + '%'}"></span>
          <span class="fm-pubr-zan">{{free.pubr_zan}}</span>
        </div>
      </div>
    </figure>
    <v-modal :symod="symod" v-on:mod_yes="spsj_Sub"></v-modal>
  </div>
</template>

<script>
import vImg from '../lazyloadimg/lazyimg.vue'
import vModal from '../modal/modal.vue'
export default {
  name: 'freemeal',
  components: {
    vImg,
    vModal
  },
  data () {
    return {
      freeUrl: '',
      freeData: {
        hdr_id: '2'
      },
      symod: {
        isShow: false,
        cont: '你特么没登陆，先去登陆',
        loading: true,
        btn: false
      },
      // 中间值
      free_zan_index: null,
      hdrMes: [
        {
          hdr_id: 1,
          hdr_name: '梁总川菜馆',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg',
          hdr_free: '你就是个白吃',
          hdr_prise_stopTime: '2017-2-2',
          hdr_free_stopTime: '2017-3-3',
          usr_zan: 24,
          usr_rank: 5,
          free_top: [
            {pubr_name: '马总', pubr_zan: 50},
            {pubr_name: '梁总', pubr_zan: 30},
            {pubr_name: '卢总', pubr_zan: 28},
            {pubr_name: '游总', pubr_zan: 26},
            {pubr_name: '郑总', pubr_zan: 24}
          ]
        },
        {
          hdr_id: 1,
          hdr_name: '梁总川菜馆',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg',
          hdr_free: '你就是个白吃',
          hdr_prise_stopTime: '2017-2-2',
          hdr_free_stopTime: '2017-3-3',
          usr_zan: 24,
          usr_rank: 5,
          free_top: [
            {pubr_name: '马总', pubr_zan: 32},
            {pubr_name: '梁总', pubr_zan: 30},
            {pubr_name: '卢总', pubr_zan: 28},
            {pubr_name: '游总', pubr_zan: 26},
            {pubr_name: '郑总', pubr_zan: 24}
          ]
        }
      ]
    }
  },
  methods: {
    // 前往评论
    goToPublish (mes) {
      let isLogin = this.$store.state.syusr.ISLOGINED
      if (isLogin === true) {
        this.$store.commit('PASS_MES_CHOOSE_SHOP', mes)
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
    DZbaichi (zan) {
      // window.alert('a')
      let isLogin = this.$store.state.syusr.ISLOGINED
      let isZan = this.$store.state.syusr.ISDIANZAN
      if (isLogin === true) {
        if (isZan === false) {
          this.free_zan_index = zan
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
      let k = this.free_zan_index
      this.$http.post(this.zanUrl, this.zanData).then(response => {
        this.hdrMes[k].usr_zan += 1
        this.$store.commit('UPDATE_ISDIANZAN')
        this.symod.cont = '点赞成功'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
        }, 1000)
      }, response => {
        this.hdrMes[k].usr_zan += 1
        this.$store.commit('UPDATE_ISDIANZAN')
        this.symod.cont = '点赞成功'
        this.symod.btn = false
        this.symod.loading = true
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
        }, 1000)
      })
    }
  },
  created () {
    this.$store.commit('UPDATE_EATLEFT', true)
  }
}
</script>

<style>
.fm-more{
  height: 2.25rem;
  color: #cf5156;
  margin-bottom: .625rem;
  text-align: center;
  background: #fff;
}
.fm-more>span{
  position: relative;
  top: .625rem;
}
.fm-rule{
  padding: .3125rem 0;
  margin-bottom: .625rem;
  text-align: center;
  background: #fff;
}
.fm-card{
  padding: .3125rem 0;
  margin: 0;
  margin-bottom: .8rem;
  background: #fff;
}
.fm-hdr-card{
  width: 96%;
  margin:0 auto;
}
.fm-hdr-pic{
  width: 30%;
  padding-left: 2%;
  float: left;
}
.fm-hdr-pic>img{
  width: 100%;
  height: 100%;
}
.fm-hdr-mes{
  width: 60%;
  padding-top: 1%;
  padding-left: 5%;
  float: left;
}
.fm-hdr-name{
  font-weight: bold;
}
.fm-bai{
  color: red;
  font-size: 1.25rem;
  line-height: 1.25rem;
  float: right;
}
.fm-hdr-free{
  margin-left: .2rem;
  height: 1.25rem;
  font-size: .815rem;
  line-height: 1.25rem;
  float: right;
  display: inline-block;
}
.fm-usr-zan{
  position: absolute;
  left: 82%;
  margin-top: .5rem;
  color: red;
}
.fm-zan{
  margin-right: .1875rem;
  font-size: 2rem;
}
.fm-span-zan{
  position: relative;
  bottom: .25rem;
  height: 2rem;
  line-height: 2rem;
  display: inline-block;
}
.fm-hdr-mes>h5{
  margin-top: .5rem;
}
.fm-hdr-mes>p{
  margin-top: .7rem;
}
.fm-hdr-dp{
  position: relative;
  float: right;
  /*top: -0.6rem;*/
  width: 5rem;
  height: 2rem;
  border: 0;
  border-radius:.25rem ;
  text-align: center;
  line-height: 2rem;
  color: #FFFFFF;
  background-color: red;
  display: block;
}
.fm-free-pubr{
  margin: 1.2rem;
  margin-top: 8rem;
}
.fm-pubr-rank{
}
.fm-pubr-name{
  font-weight: bolder;
}
.fm-probar{
  /*width: 90%;*/
  height: .8rem;
  border-radius: .2rem;
  background-color: red;
  display: inline-block;
}
.fm-pubr-zan{
  float: right;
  color: red;
}
@media only screen and (min-width: 300px) and (max-width: 360px) {
  body{
    font-size: 14px;
  }
  .fm-zan{
    margin-right: .1rem;
  }
  .fm-hdr-dp{
    width: 4rem;
    top: -1.3rem;
  }
}
</style>
