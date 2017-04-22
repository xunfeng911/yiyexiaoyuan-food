<template>
  <div class="home">
    <swipe class="my-swipe" speed="500" showIndicators="true" >
      <swipe-item class="slide" v-for="img in bannerImg">
        <img :src="img" class="bannerPic">
      </swipe-item>
    </swipe>
    <div class="homeChoose">
      <div class="chooseItem">
        <router-link to="foodcourt">
          <span class="chooseItem iconfont eat_icon-shangjia "></span>
          <p>商家目录</p>
        </router-link>
      </div>
      <div class="chooseItem">
        <router-link to="freemeal">
          <span class="chooseItem iconfont eat_icon-free-eat"></span>
          <p>点赞白食</p>
        </router-link>
      </div>
      <div class="chooseItem">
        <router-link to="replaceme">
          <span class="chooseItem iconfont eat_icon-decide"></span>
          <p>替我决定</p>
        </router-link>
      </div>
    </div>
    <div class="homeOrder">
      <div class="orderItem">
        <p :class="{orderSelect: isHdr}" @click="hdrOrder">商</p>
      </div>
      <div class="orderItem">
        <p :class="{orderSelect: isSt}" @click="stOrder">学</p>
      </div>
      <div class="centerItem"><p>美食广场</p></div>
      <div class="orderItem">
        <p :class="{orderSelect: isTime}" @click="timeOrder">时</p>
      </div>
      <div class="orderItem">
        <p :class="{orderSelect: isZan}" @click="likeOrder">赞</p>
      </div>
    </div>
    <div class="homeMain">
      <student v-for="(i,index) in news" :news="news[index]"></student>
    </div>
  </div>
</template>
<script>
  import vImg from '../lazyloadimg/lazyimg.vue'
  import student from '../friendnews/student.vue'
  export default{
    name: 'homepage',
    components: {
      vImg,
      student
    },
    data () {
      return {
        bannerImg: ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2977549189,1146316290&fm=21&gp=0.jpg',
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4228239489,2016762267&fm=23&gp=0.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1486284077728&di=66bbaa731d73bd2e60f23a9085466345&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3043351164%2C386551216%26fm%3D214%26gp%3D0.jpg'
        ],
        doge: '',
        isHdr: false,
        isSt: false,
        isTime: false,
        isZan: false,
        news: [
          {
            userId: '天津大麻花',
            userPic: 'http://m.tuniucdn.com/filebroker/cdn/vnd/ee/27/ee27793448a6d6aca3b401e39a808f57_w320_h240_c1_t0.png',
            createDate: 1486618778417,
            foodName: '',
            perMoney: 12,
            tasteScore: 4,
            weightScore: 5,
            content: '清朝末年，在天津卫海河西侧，繁华喧闹的小白楼南端，有一条名为十八街的巷子，有一个叫刘老八的人一个这个巷子里开了一家小小的麻花铺，字号唤作“桂发祥”。这个人很聪明又能干，炸麻花可以说有一手绝活。他炸的麻花真材实料，选用精白面粉，上等清油。每天做的麻花香味能传遍整条巷街，人们闻到香味纷纷蜂拥到他的铺子购买，因此他的铺子总是顾客盈门。后来，他的生意越做越大，开了店面。开始还算是宾客满盈，但是随着时间的推移，大家越来越觉得麻花有点乏而生腻，渐渐的生意就不如以往了。老人家不甘心。后来店里有个少掌柜的，一次出去游玩，回到家是又累又饿，就要点心吃，可巧点心没有了，只剩下一些点心渣。又没有别的什么吃的，那少掌柜的灵机一动，让人把点心渣与麻花面和在一起做成麻花下锅炸。结果炸出的麻花和以前的不一样，除了酥脆不艮和香气扑鼻，味道还十分可口。按照这个方法，刘老八是尽心研究，在麻花的白条和麻条之间夹进了什锦酥馅。至于配料，更是苦思冥想，颇费了一番脑筋，桂花、闽姜、核桃仁、花生、芝麻......还有青红丝和冰糖。为了使自己的麻花与众不同，增强口感味道，把放置时间延长，取材也是愈来愈精细，如用杭州西湖桂花加工而成的精品咸桂花、岭甫种植甘蔗制成的冰糖、精制小麦粉等等，制作成不仅存放良久不艮，而且香气四溢，味道香脆可口，满口生津。',
            picturesTrendId: {},
            picturesPath: [
              'http://m.tuniucdn.com/filebroker/cdn/vnd/ee/27/ee27793448a6d6aca3b401e39a808f57_w320_h240_c1_t0.png',
              'http://i3.sinaimg.cn/travel/2013/1023/U8159P704DT20131023110335.jpg',
              'http://images.3158.cn/data/attachment/tianjin/article/2014/08/13/f8c0f76c77b94ec5f5e5c19020b3d80e.jpg',
              'http://imglf1.ph.126.net/P3Q11hnFTJZC5Iv-9NwWzg==/6608748779166346924.jpg',
              'http://i3.sinaimg.cn/travel/2013/1023/U8159P704DT20131023110335.jpg',
              'http://images.3158.cn/data/attachment/tianjin/article/2014/08/13/f8c0f76c77b94ec5f5e5c19020b3d80e.jpg',
              'http://m.tuniucdn.com/filebroker/cdn/vnd/ee/27/ee27793448a6d6aca3b401e39a808f57_w320_h240_c1_t0.png',
              'http://i3.sinaimg.cn/travel/2013/1023/U8159P704DT20131023110335.jpg',
              'http://images.3158.cn/data/attachment/tianjin/article/2014/08/13/f8c0f76c77b94ec5f5e5c19020b3d80e.jpg'
            ],
            likesNumber: 0,
            shopId: '天津大麻花',
            shopPlace: '老综合楼8楼',
            shopPic: 'http://m.tuniucdn.com/filebroker/cdn/vnd/ee/27/ee27793448a6d6aca3b401e39a808f57_w320_h240_c1_t0.png',
            comments: [
              {
                id: 0,
                createrId: '马总',
                trendId: 0,
                replyId: '马总',
                content: '特别好吃我去'
              },
              {
                id: 0,
                createrId: '硕爷',
                trendId: 0,
                replyId: '马总',
                content: '妈的乱说'
              }
            ],
            isLike: false,
            star: [],
            banStar: []
          },
          {
            userId: 'shabi',
            userPic: 'http://yiyexy.com/favicon.png',
            createDate: 1486618778417,
            foodName: '北京烤鸭',
            perMoney: 0,
            tasteScore: 4,
            weightScore: 5,
            content: '2015年1月16日，中央纪委监察部网站发布消息，国家安全部副部长、党委委员马建涉嫌严重违纪违法接受组织调查。2016年12月30日，中央纪委监察部网站发布消息，经中共中央批准，中共中央纪委对国家安全部原党委委员、副部长马建严重违纪问题进行了立案审查。经查，马建严重违反政治纪律和政治规矩，对抗组织审查，转移、藏匿涉案财物；违反组织纪律，不按规定报告个人房产等有关事项，违规为家属办理出境证件；违反廉洁纪律，利用职务上的便利为亲属经营活动谋取巨额利益；违反工作纪律，滥用权力干预执法司法活动；利用职务上的便利为他人谋取利益并收受巨额财物，涉嫌受贿犯罪。马建身为党的高级领导干部，理想信念丧失，严重违反党的纪律，造成严重后果，且在党的十八大后仍不收敛、不收手，性质恶劣、情节严重。依据《中国共产党纪律处分条例》等有关规定，经中央纪委常委会议审议并报中共中央批准，决定给予马建开除党籍处分；由监察部报国务院批准，给予其开除公职处分；收缴其违纪所得；将其涉嫌犯罪问题、线索及所涉款物移送司法机关依法处理。',
            picturesTrendId: {},
            picturesPath: [
              'http://i1.17173cdn.com/2fhnvk/YWxqaGBf/cms3/RjihTbbkyatlFiD.jpg',
              'http://i2.17173cdn.com/2fhnvk/YWxqaGBf/cms3/rrqsCnbkyatlFho.jpg',
              'http://img1.imgtn.bdimg.com/it/u=3803592998,823198989&fm=23&gp=0.jpg',
              'http://i1.17173cdn.com/2fhnvk/YWxqaGBf/cms3/RjihTbbkyatlFiD.jpg',
              'http://i2.17173cdn.com/2fhnvk/YWxqaGBf/cms3/rrqsCnbkyatlFho.jpg',
              'http://img1.imgtn.bdimg.com/it/u=3803592998,823198989&fm=23&gp=0.jpg'
            ],
            likesNumber: 32,
            shopId: 'error',
            shopPlace: 'error',
            shopPic: 'http://tva2.sinaimg.cn/crop.3.0.634.634.1024/cd516b22jw8fa4mlfynwzj20hs0hm0tr.jpg',
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
                content: '你个傻逼'
              }
            ],
            isLike: false,
            star: [],
            banStar: []
          }
        ]
      }
    },
    methods: {
      hello: function () {
        console.log('hello')
      },
      hdrOrder: function () {
        this.isHdr = !this.isHdr
        this.isSt = false
        this.isTime = false
        this.isZan = false
      },
      stOrder: function () {
        this.isHdr = false
        this.isSt = !this.isSt
        this.isTime = false
        this.isZan = false
      },
      timeOrder: function () {
        this.isHdr = false
        this.isSt = false
        this.isTime = !this.isTime
        this.isZan = false
      },
      likeOrder: function () {
        this.isHdr = false
        this.isSt = false
        this.isTime = false
        this.isZan = !this.isZan
      }
    },
    created () {
      this.$store.commit('UPDATE_EATUSER', true)
      this.$store.commit('UPDATE_EATCAMERA', true)
      this.$store.commit('UPDATE_EATLEFT', false)
      this.$store.commit('UPDATE_EATHOME', false)
      this.$store.commit('UPDATE_EATTITLE', true)
    }
  }
</script>
<style>
  .is-active {
    z-index: 18;
  }

  .home {
    height: 100%;
    width: 100%;
    background-color: #f0edf0;
  }

  .homeBanner {
    height: 200px;
    width: 100%;
    background-color: #3b3b3b;
    overflow: hidden;
  }

  .bannerPic {
    height: 100%;
    width: 100%;
  }

  .homeChoose {
    margin-top: 10px;
    height: 88px;
    width: 100%;
    background-color: #fff;
  }

  .chooseItem {
    float: left;
    margin-right: 20%;
    margin-left: 20%;
    margin-top: 3px;
  }

  .chooseItem:last-child {
    margin-right: 0;
    margin-left: 0;
  }

  .chooseItem:first-child {
    float: left;
    margin-right: 0;
    margin-left: 10%;
  }

  @media screen and (max-width: 330px ) {
    .chooseItem:first-child {
      margin-left: 6%;
    }
  }

  .chooseItem span {
    font-size: 46px;
    margin-top: 8px;
    margin-bottom: 10px;
    padding-left: 3px;
    color: #c62f2f;
  }

  .chooseItem p {
    position: absolute;
    font-size: 16px;
    top: 274px;
    text-align: center;
  }

  .homeOrder {
    height: 50px;
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .centerItem {
    width: 40%;
    height: 100%;
    float: left;
  }

  .centerItem p {
    font-size: 24px;
    color: #c43134;
    font-weight: bolder;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 6%;
    text-shadow: #c62f2f 0 0 2px;
  }

  .orderItem {
    float: left;
    height: 100%;
    width: 15%;
    background-color: #fff;
  }

  .orderItem p {
    padding: 4px;
    padding-top: 6px;
    font-size: 18px;
    width: 38%;
    height: 38%;
    margin-top: 14%;
    margin-left: 26%;
    text-align: center;
    position: relative;
    border: 1px solid #3b3b3b;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
  }

  .orderSelect {
    color: #FFFFFF;
    background-color: rgba(96, 119, 254, 1);
    border: none;
  }

  .my-swipe {
    height: 200px;
    width: 100%;
    overflow: hidden;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }

  .slide {
    position: absolute;
    height: 200px;
    width: 100%;
    background-color: #b3b3b3;
    color: #fff;
  }

</style>
