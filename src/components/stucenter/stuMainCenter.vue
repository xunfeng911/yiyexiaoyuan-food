<template>
  <div>
    <div class="stu-usr-info">
      <v-img :imgUrl="usrdata.usr_pic" class="stu-usr-hp"></v-img>
      <div class="stu-usr-more">
        <span class="stu-usr-name">{{usrdata.usr_name}}</span>
        <span class="iconfont eat_icon-left stu-usr-right"></span>
      </div>
    </div>
    <div class="stu-main-bar">
      <div class="stu-bar-icon">
        <a id="ic-shouye"><span class="iconfont eat_icon-home stu-main-icon"></span></a>
        <label for="ic-shouye">首页</label>
      </div>
      <div class="stu-bar-icon">
        <a id="ic-taxi"><span class="iconfont eat_icon-taxi stu-main-icon"></span></a>
        <label for="ic-taxi">我的行程</label>
      </div>
      <div class="stu-bar-icon">
        <a id="ic-commnet"><span class="iconfont eat_icon-comment stu-main-icon"></span></a>
        <label for="ic-commnet">我的评价</label>
      </div>
      <div class="stu-bar-icon">
        <a id="ic-mes"><span class="iconfont eat_icon-xiaoxi stu-main-icon"></span></a>
        <label for="ic-mes">消息</label>
        <p class="uc-usr-ifnum" v-if="usrdata.usr_infoNum > 0 ">{{usrdata.usr_infoNum}}</p>
      </div>
    </div>
    <ul class="uc-pic-ch">
      <li><input type="file" accept="image/*" id="uc-file"/><span>从相册选择图片</span></li>
      <li>查看大图</li>
      <li>取消</li>
    </ul>
  </div>
</template>

<style>
  .stu-usr-info {
    height: 4.2rem;
    background-color: #fff;
    padding: .2rem 1.5rem 0 1.5rem;
    margin-bottom: .5rem;
  }

  .stu-usr-hp {
    float: left;
    max-width: 4rem;
    max-height: 4rem;
    border-radius: 10rem;
    overflow: hidden;
    background-color: #2c3e50;
  }

  .stu-usr-hp img {
    height: 100%;
    width: 100%;
  }

  .stu-usr-more {
    margin-left: 6rem;
  }

  .stu-usr-name {
    position: relative;
    top: 1.2rem;
  }

  .stu-usr-right {
    float: right;
    margin-top: 1.4rem;
    transform: rotate(-180deg);
  }
  .stu-main-bar{
    height: 4.2rem;
    background-color: #fff;
    padding: 0;
    margin-bottom: .5rem
  }
  .stu-bar-icon{
    float: left;
    width: 25%;
    padding-top: .5rem;
    text-align: center;
  }
  .stu-bar-icon a,.stu-main-icon{
    font-size: 1.5rem;
  }
  .stu-bar-icon label{
    display: block;
  }
  /*.stu-ic-home{*/

  /*}*/
</style>
<script>
  import vImg from '../lazyloadimg/lazyimg.vue'
  export default{
    name: 'stuCenter',
    components: {
      vImg
    },
    data () {
      return {
        usrdata: {
          usr_shop: false,
          usr_id: 1,
          usr_name: '梁总',
          usr_infoNum: 30,
          usr_pic: 'http://tva2.sinaimg.cn/crop.3.0.634.634.1024/cd516b22jw8fa4mlfynwzj20hs0hm0tr.jpg'
        }
      }
    }
  }
</script>
