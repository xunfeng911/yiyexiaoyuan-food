<template>
  <div class="infor">   
    <div class="change-username">
      <span class="iconfont eat_icon-user"></span>
      <input class="infor-input" type="text" :value="usrData.name" readonly required/>
      <a class="change-right" @click="changeName">></a>
    </div>
    <div class="change-password">
      <span class="iconfont eat_icon-user"></span>
      <span>修改登录密码</span> 
      <a class="change-right" @click='changePass'>></a>
    </div>
    <div class="userTel">
      <span class="iconfont eat_icon-user"></span>
      <span>已绑定手机号</span>
      <span class="infor-right1">{{usrData.mobile}}</span>
    </div>
    <div class="change-QQ" >
      <span class="iconfont eat_icon-user"></span>
      <span>用户QQ号</span>
      <input class=" infor-right2 infor-input" type="number" :value="usrData.tecent" readonly required/>
      <!-- <span class="infor-right2">{{usrData.tecent}}</span> -->
      <a class="change-right" @click="changeQQ">></a>
    </div>
    <button class="dis-login" @click="disLogin" role="button">退出登录</button>
  </div>
</template>
<script>
// import {preNode} from '../../common/js/common.js'
export default {
  name: 'inforch',
  data () {
    return {
      // symod: {
      //   isShow: false,
      //   cont: '退出登录，前往首页',
      //   loading: true,
      //   btn: false
      // },
      usrData: {
        name: '马总',
        mobile: 181818181818,
        tecent: 1234567
      },
      up_name: null,
      up_qq: null
    }
  },
  watch: {

  },
  methods: {
    disLogin () {
      // this.symod.isShow = true
      this.$store.commit('UPDATE_OUTLOGIN')
      setTimeout(x => {
        // this.symod.isShow = false
        this.$router.push('/homepage')
      }, 1000)
    },
    changeName (e) {
      this.$router.push('/changename')
      // preNode(e.target).removeAttribute('readonly')
      // preNode(e.target).focus()
      // console.log(preNode(e.target))
    },
    changeQQ (e) {
      this.$router.push('/changeqq')
    },
    changePass () {
      this.$router.push('/setpass')
    }
    // nameBlur (e) {
    //   this.up_name = e.target.value
    //   if (this.up_name !== null || '') {
    //     e.target.setAttribute('readonly', true)
    //   } else {
    //     e.target.value = this.usrData.name
    //     console.log(e.target.value)
    //   }
    // }
  },
  created () {
    this.usrData.name = this.$store.state.syusr.usr_name
    this.usrData.mobile = this.$store.state.syusr.usr_tel
    this.usrData.tecent = this.$store.state.syusr.usr_qq
  }
}
</script>
<style>
.infor{
  width: 100%;
  height: 100%;
}
.infor div{
  width: 88%;
  height: 3rem;
  padding: 0 6%;
  border-bottom: 1px solid grey;
  background: #fff;
  font-size: 1rem;
  line-height: 3rem;
}
.infor div span:first-child{
  margin-right: 1rem;
}
.infor-right1{
  margin-left: 2.7rem;
}
.infor-right2{
  margin-left: 4rem;
}
.change-right{
  float: right;
}
.dis-login{
  width: 70%;
  height: 3rem;
  border: 0;
  border-radius: 5px;
  margin-top: 3rem;
  margin-left: 15%;
  font-size: 1rem;
  color: #fff;
  background: red;
}
.infor-input{
  height: 2rem;
  font-size: 1rem;
  width: 45%;
}
</style>