  <template>
  <div class="navigation">
    <span v-show="eatUser" v-on:click="gousr" class="iconfont eat_icon-user nb-user"></span>
    <span v-show="eatCamera" v-on:click="gocamera" class="iconfont eat_icon-camera nb-camera"></span>
    <span v-show="eatLeft" v-on:click="goback" class="iconfont eat_icon-left nb-left"></span>
    <span v-show="eatHome" v-on:click="gohome" class="iconfont eat_icon-home nb-home"></span>
    <span v-show="eatTitle" class="eat-title">
      <router-link to='homepage'>食也</router-link>
      <a href="www.yiyexy.com">拼车</a>
    </span>
    <v-modal :symod="symod" v-on:mod_yes="nav_Pub"></v-modal>
  </div>
</template>

<script>
import vModal from '../modal/modal.vue'
export default {
  name: 'navbar',
  components: {
    vModal
  },

  data () {
    return {
      symod: {
        isShow: false,
        cont: '你特么没登陆，先去登陆',
        loading: true,
        btn: false
      }
    }
  },
  computed: {
    eatUser () {
      return this.$store.state.synav.eatUser
    },
    eatLeft () {
      return this.$store.state.synav.eatLeft
    },
    eatCamera () {
      return this.$store.state.synav.eatCamera
    },
    eatHome () {
      return this.$store.state.synav.eatHome
    },
    eatTitle () {
      return this.$store.state.synav.eatTitle
    }
  },
  methods: {
    goback: function () {
      this.$router.back()
    },
    gousr: function () {
      let isLogin = this.$store.state.syusr.ISLOGINED
      if (isLogin === true) {
        this.$router.push('/usrcenter')
      } else {
        this.symod.isShow = true
        setTimeout(this.nav_Pub, 1000)
      }
    },
    gocamera: function () {
      this.$router.push('/stpublish')
    },
    gohome: function () {
      this.$router.push('/homepage')
    },
    nav_Pub () {
      this.symod.isShow = false
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  .navigation {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 680px;
    height: 7.3%;
    background-color: #c62f2f;
    z-index: 999;
  }
  .eat-title{
    position: absolute;
    left: 50%;
    margin-left: -4.8rem;
    text-align: center;
    line-height: 3rem;
  }
  .eat-title>a{
    font-size: 1.4rem;
    margin-left: 1.2rem;
    color: #fff;
  }
  .nb-user,.nb-camera,.nb-home{
    position: absolute;
    float: right;
    font-size: 2rem;
    line-height: 3rem;
    color: #fff;
  }
  .nb-user{
    right: 2%;
  }
  .nb-camera,.nb-home{
    right: 15%;
  }
  .nb-left{
    position: absolute;
    float: left;
    left: 3%;
    font-size: 2rem;
    line-height: 3rem;
    color: #FFFFFF;
  }
@media only screen and (min-width: 300px) and (max-width: 360px) {
  html{
    font-size: 14px;
  }
/*  .eat-title{
    left: 26%;
  }*/
  .nb-left{
    left: 1%;
  }
}

</style>
