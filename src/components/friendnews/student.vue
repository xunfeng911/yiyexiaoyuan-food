<template>
  <div class="st-dtCard">
    <div class="st-usrBar">
      <div class="st-usrHp">
        <img :src="news.userPic"/>
      </div>
      <div class="st-usrInfo">
        <span class="st-usrName"><p>{{news.userId}}</p></span>
        <div class="st-star">
          <span class="iconfont eat_icon-star" v-for="i in news.star"></span>
          <span class="iconfont eat_icon-banstar" v-for="j in news.banStar"></span>
        </div>
        <span class="st-cost">
          <p>{{news.perMoney}}元/人</p>
        </span>
        <span class="st-more iconfont eat_icon-left" @click="editNews"></span>
      </div>
      <div class="st-pubTime">
        <p>发布于{{news.createDate}}</p>
      </div>
      <div class="st-kind" :class="{isShop:news.isShop}">
        <p>{{news.foodName}}</p>
      </div>
    </div>
    <div class="st-mainCont" :class="{showAll: isAll}">
      <br>
      <p>
        {{news.content}}
      </p>
    </div>
    <div class="st-showMoreCont " @click="showAllContent">全文</div>
    <div class="st-usrPics" :class="{isShowPic:isShowPic}">
      <v-img :imgUrl="i" class="st-picBox st-picHdr" v-for="i in news.picturesPath"></v-img>
    </div>
    <div class="st-shareBar">
      <span class="iconfont eat_icon-comment"></span>
      <span class="iconfont eat_icon-zan" :class="{isLike:news.isLike}" @click="likes">{{news.likesNumber}}</span>
      <span class="iconfont eat_icon-share"></span>
      <span class="st-morePic" @click="showPhoto">更多图片</span>
    </div>
    <div class="st-hdrInfo">
      <div class="st-hdrPic">
        <v-img :imgUrl="news.shopPic" class="st-hdrPicHolder">
        </v-img>
      </div>
      <span class="st-hdrName">
        <p>{{news.shopId}}</p>
        <p>{{news.shopPlace}}</p>
      </span>
      <span class="iconfont eat_icon-left st-hdrMore"></span>
    </div>
    <div class="st-devLine"></div>
    <div class="st-comment">
      <div class="st-commentNum">
        <p>全部评论({{news.comments.length}})</p>
      </div>
      <div class="st-commentMain" v-for="(i,index) in news.comments" @click="makeReply(index)">
        <span class="st-commenter">{{i.createrId}}</span>
        <span v-if="judgeReply(i)">回复</span>
        <span v-if="judgeReply(i)" class="st-commenter">{{i.replyId}}</span>
        <span>:</span>
        <span>{{i.content}}</span>
      </div>
    </div>
    <div class="st-dBlock"></div>
    <v-modal :symod="symod"></v-modal>
  </div>
</template>
<script>
  import vImg from '../lazyloadimg/lazyimg.vue'
  import vModal from '../modal/modal.vue'
  export default{
    name: 'student',
    components: {
      vImg,
      vModal
    },
    props: {
      news: {
        default: {
          userId: 'error',
          userPic: 'http://yiyexy.com/favicon.png',
          createDate: 100000,
          foodName: 'error',
          perMoney: 0,
          tasteScore: 1,
          weightScore: 1,
          content: 'this is the main content',
          picturesTrendId: {},
          picturesPath: ['', ''],
          likesNumber: 0,
          shopId: 'error',
          shopPlace: 'error',
          shopPic: '',
          comments: [
            {
              id: 0,
              createrId: 0,
              trendId: 0,
              replyId: 0,
              content: 'error'
            },
            {
              id: 0,
              createrId: 0,
              trendId: 0,
              replyId: 1,
              content: 'error'
            }
          ],
          isLike: false,
          star: [],
          banStar: [],
          isShop: true
        }
      }
    },
    created () {
      let s1 = this.news.tasteScore
      let s2 = this.news.weightScore
//      console.log(s1)
//      console.log(s2)
      let myInt = parseInt((s1 + s2) / 2)
      let myFloat = ((s1 + s2) / 2) - (parseInt((s1 + s2) / 2))
      if (myFloat >= 0.25 && myFloat <= 0.75) {
        this.news.banStar.length = 1
      }
      if (myFloat > 0.75) {
        myInt += 1
      }
      this.news.star.length = myInt
      this.transTime()
      this.judgeShop()
    },
    data () {
      return {
        isReply: [],
        isAll: false,
        isShowPic: false,
        symod: {
          isBody: false,
          isShow: false,
          cont: '真的要删除嘛？',
          loading: false,
          btn: false,
          isEdit: false,
          posY: 0,
          posX: 0
        }
      }
    },
    methods: {
      showAllContent () {
        this.isAll = !this.isAll
      },
      judgeShop () {
        if (this.news.userId === this.news.shopId) {
          this.news.foodName = '商家认证'
          this.news.isShop = true
        }
      },
      judgeReply (e) {
        return (!(e.createrId === e.replyId))
      },
      editNews () {
        this.symod.isShow = true
        this.symod.isEdit = true
        this.symod.posY = window.event.clientY
        this.symod.posX = window.event.clientX
      },
      showPhoto () {
        this.isShowPic = !this.isShowPic
      },
      share () {
      },
      likes () {
        if (this.news.isLike) {
          this.news.likesNumber -= 1
        } else {
          this.news.likesNumber += 1
        }
        this.news.isLike = !this.news.isLike
      },
      comment () {
      },
      goToShop () {
      },
      makeReply (e) {
        this.symod.isShow = true
        this.symod.btn = true
        this.symod.cont = '确定删除此条评论?'
        console.log(e)
      },
      transTime () {
        let pubDate = this.news.createDate
        let date = new window.Date(pubDate)
        this.news.createDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//        console.log(myDate)
      }
    }
  }
</script>
<style>

  .st-dtCard {
    position: relative;
    width: 100%;
    background: rgba(255, 255, 255, 1);
  }

  .st-usrBar {
    height: 80px;
    width: 100%;
    /*overflow: hidden;*/
  }

  .st-usrHp {
    float: left;
    height: 61px;
    width: 60px;
    background-color: #7e8c8d;
    margin: 10px 0 10px 10px;
    border-radius: 100%;
    overflow: hidden;
  }

  .st-usrHp img {
    height: 100%;
    width: 100%;
  }

  .st-usrInfo {
    padding-top: 10px;
    float: left;
    height: 50%;
    width: 70%;
    margin-left: 10px;
  }

  .st-usrInfo span {
    display: block;
    height: 100%;
    width: 20%;
    float: left;
    /*background-color: #c43134;*/
  }

  .st-usrInfo > span:last-child {
    float: right;
    height: 100%;
    width: 10px;
    margin-left: 20px;
    margin-right: -10px;
    margin-top: 4px;
  }

  .st-usrName p {
    white-space: nowrap;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    padding-top: 4px;
    color: #c43134;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .st-star {
    float: left;
    height: 100%;
    width: 40%;
    padding-top: 10px;
    padding-left: 12px;
  }

  .st-star .eat_icon-star, .eat_icon-banstar {
    font-size: 18px;
    color: #c43134;
  }

  .st-cost p {
    padding-left: 10px;
    white-space: nowrap;
    margin-top: 8px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: #3b3b3b;
  }

  .st-more {
    font-size: 18px;
    font-weight: bold;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

  .st-pubTime, .kind {
    float: left;
    margin-left: 10px;
    height: 40px;
    width: 50%;
  }

  .st-pubTime p {
    margin-top: 5px;
    font-size: 12px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #b3b3b3;
  }

  .st-kind {
    float: left;
    width: 20%;
    margin-left: -15%;
  }

  .st-kind p {
    width: 10%;
    display: inline;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    background-color: #3b3b3b;
    color: yellow;
    padding: 5%;
    border-radius: 20px;
  }

  .isShop p {
    background-color: #c62f2f;
    color: #FFFFFF;
  }

  .st-mainCont, .st-usrPics {
    height: 200px;
    width: 100%;
    overflow: hidden;
  }

  .showAll {
    height: 100%;
  }

  .st-mainCont p {
    padding: 0 20px 0 20px;
    font-weight: normal;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .st-showMoreCont {
    margin-top: 8px;
    margin-left: 6%;
    font-size: 16px;
    font-weight: bolder;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .st-usrPics {
    height: 110px;
  }

  .isShowPic {
    height: 100%;
  }

  .st-picHdr {
    float: left;
    width: 100px;
    height: 100px;
    margin-top: 6px;
    background-color: #7e8c8d;
  }

  .st-picBox {
    margin-left: 22px;
    margin-bottom: 4px;
  }

  .st-picBox img {
    width: 100%;
    height: 100%;
  }

  .st-shareBar {
    width: 100%;
    height: 40px;
    /*background-color: #42b983;*/
  }

  .st-shareBar span {
    font-size: 30px;
    padding-right: 30px;
    padding-top: 4px;
    float: right;
  }

  .st-shareBar :last-child {
    margin-top: 10px;
    font-size: 16px;
    float: left;
    margin-left: 20px;
    font-weight: bold;
  }

  .isLike {
    color: #c62f2f;
  }

  @media screen and(max-width: 340px) {
    .st-shareBar span {
      font-size: 24px;
      padding-top: 10px;
    }
    .st-usrName p {
      padding-top: 4px;
      font-size: 10px;
    }
  }

  .st-hdrInfo {
    margin-top: 10px;
    width: 100%;
    height: 100px;
    background-color: #f0edf0;
  }

  .st-hdrPic {
    float: left;
    margin: 10px;
    background-color: #2c3e50;
  }

  .st-hdrPicHolder {
    height: 80px;
    width: 80px;
  }

  .st-hdrPicHolder img {
    height: 100%;
    width: 100%;
  }

  .st-hdrName {
    float: left;
    margin-top: 10px;
    height: 80%;
    width: 40%;
    /*background-color: #3b3b3b;*/

  }

  .st-hdrName p {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #3b3b3b;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .st-hdrMore {
    float: right;
    margin-top: 30px;
    margin-right: 40px;
    font-size: 30px;
    color: #3b3b3b;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .st-devLine {
    width: 100%;
    height: 1px;
    margin-top: 4px;
    background-color: #3b3b3b;
  }

  .st-comment {
    width: 100%;
    margin-top: 20px;

  }

  .st-commentNum {
    margin-left: 1%;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .st-commentMain {
    margin-left: 1%;
    margin-bottom: 12px;
  }

  .st-commenter {
    color: #c62f2f;
  }

  .st-dBlock {
    width: 100%;
    height: 20px;
    margin-top: 10px;
    background-color: #f0edf0;
  }
</style>
