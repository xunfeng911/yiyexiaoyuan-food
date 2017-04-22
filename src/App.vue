<template>
  <div id="app">
    <navbar></navbar>
    <div class="one-inner">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import navbar from './components/navbar/navbar.vue'
  import login from './components/login/login.vue'
  import register from './components/register/register.vue'
  import foodcourt from './components/foodcourt/foodcourt.vue'
  import freemeal from './components/freemeal/freemeal.vue'
  import replaceme from './components/replaceme/replaceme.vue'
  import homepage from './components/homepage/homepage.vue'
  import student from './components/friendnews/student.vue'
  import shopjieshao from './components/shopjieshao/shopjieshao.vue'
  import usrcenter from './components/usrcenter/usrcenter.vue'
  import stPublish from './components/publish/st_publish.vue'
  import hdrPublish from './components/publish/hdr_publish.vue'
  // import stuCenter from './components/stucenter/stuMainCenter.vue'
  import message from './components/usrcenter/message.vue'
  import pushBc from './components/usrcenter/pushbaichi.vue'
  import pushYh from './components/usrcenter/pushyouhui.vue'
  import shopPo from './components/usrcenter/shopphoto.vue'

  export default {
    name: 'app',
    components: {
      navbar,       // 导航
      login,        // 登陆
      register,     // 注册
      foodcourt,    // 商家目录
      freemeal,     // 免费白吃
      replaceme,    // 替我决定
      homepage,     // 主页
      shopjieshao,  // 商家介绍
      student,      // 动态
      usrcenter,    // 用户中心
      hdrPublish,   // 商家发布
      stPublish,    // 学生发布
      // stuCenter,
      message,      // 我的消息
      pushBc,       // 发布白吃
      pushYh,       // 发布优惠
      shopPo        // 商家相册
    },
    created () {
      this.$router.push('/homepage')
    }
  }

</script>

<style>
/*  body{
    background-color: #f0edf0;
  }*/
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: auto;
    max-width: 680px;
  }
  .one-inner {
    background-color: #f0edf0;
    position: absolute;
    top: 3.7%;
    width: 100%;
    height: 96.5%;
  }
</style>
