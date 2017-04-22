<template>
<div>
  <div class="login-prompt" v-show="error.show">
    <span id="login_rsp_txt">{{error.cont}}</span>
  </div>
  <div class="form-login">
    <div class="login-title">
      <span>账号登录</span>
    </div>
    <form action="#" method="get"  role="form">
      <div class="login-text">
        <input id='number' type="number" placeholder="请输入您的手机号"  required/>
        <div id="rsp_info"></div>
        <input id='password' type="password" placeholder="请输入您的密码" required/>
      </div>
      <div class="login-test">
        <input type="text" placeholder="验证码" v-model="validate.input" required/>
        <span class='validate-num' @click="checkVal" :style="{color: validate.color}">{{validate.num}}</span>
        <p></p>
        <p></p>
        <button id="login-submit" type="button" value="登录" class="btn-block" @click="loginOn">登录</button>
      </div>
      <div class="login-other">
        <router-link to='respass'>重置密码</router-link>
        <router-link to='register'>注册账号</router-link>
      </div>
    </form>
  </div>
</div>
</template>
<script>
import {createCode, createColor} from '../../common/js/common.js'
export default {
  name: 'login',
  data () {
    return {
      error: {
        show: false,
        cont: '密码错误'
      },
      validate: {
        num: null,
        input: '',
        color: null
      },
      syUrl: '',
      sy_login: {
        usr_name: null,
        login_usr_pass: null
      }
    }
  },
  methods: {
    checkVal () {
      this.validate.num = createCode()
      this.validate.color = createColor()
    },
    loginOn () {
      var OKTOUP = true
      if (this.validate.input.toUpperCase() === this.validate.num.toUpperCase()) {
        OKTOUP = true
        for (let x in this.sy_login) {
          if (this.sy_login[x] == null || '') {
            OKTOUP = false
            this.error.cont = '请填写信息'
            this.error.show = true
            setTimeout(x => {
              this.error.show = false
            }, 3000)
          } else {
            OKTOUP = true
          }
        }
      } else {
        OKTOUP = false
        this.error.cont = '验证码错误'
        this.error.show = true
        setTimeout(x => {
          this.error.show = false
        }, 3000)
      }
      if (OKTOUP) {
        this.$http.post(this.syUrl, this.sy_login).then(response => {
          if (response.result.toString() === '1') {
            this.$store.commit('UPDATE_LOGIN', response.sy_usr_mes)
            setTimeout(x => {
              this.$router.push('/homepage')
            }, 1000)
          } else if (response.result.toString() === '0') {
            this.error.cont = '密码或账号有误'
            this.error.show = true
            setTimeout(x => {
              this.error.show = false
            }, 1000)
          }
        }, response => {
          window.alert('网络不给力哟')
        })
      }
    }
  },
  created () {
    this.$store.commit('UPDATE_EATUSER', false)
    this.$store.commit('UPDATE_EATCAMERA', false)
    this.$store.commit('UPDATE_EATLEFT', true)
    this.$store.commit('UPDATE_EATHOME', false)
    this.$store.commit('UPDATE_EATTITLE', false)
    this.checkVal()
  }
}
</script>
<style>
navigation-title{
  position: relative;
  top: 20%;
  left: 32.5%;
  color: #fff;
  font-size: 18px;
}
.form-login{
  width: 100%;
  height: 100%;
}
#login-submit{
  margin-top: 30px;
}
.login-title{
  line-height: 24px;
  height: 28px;
  background-color: #fff;
  color: rgb(231,98,91);
  text-align: center;
  margin-bottom: 10px;
}
.login-text{
  background-color: #fff;
  margin-bottom: 10px;
}
.login-text>input{
  border: 0;
  height: 42px;
  position: relative;
  left: 7%;
  width: 86%;
}
#text-first{
  position: relative;
  width: 100%;
  left: 0;
  height: 10px;
  background-color: #f0edf0;
}
.login-text>div{
  position: relative;
  width: 90%;
  left: 5%;
  border: 1px solid rgb(222,222,222);
}
.login-test{
  background-color: #fff;
  height: 55px;
  margin: 10px 0;
}
.login-get{
  background-color: #fff;
  height: 52px;
}

.login-test>input[type="text"]{
  padding: 0;
  position: relative;
  left: 5%;
  width: 43%;
  height: 42px;
  border: 1px solid rgb(222,222,222);
  border-radius: 4px;
  text-align: center;
}
.validate-num{
  position: relative;
  top: 2px;
  left: 7%;
  width: 43%;
  height: 42px;
  border: 1px solid rgb(222,222,222);
  border-radius: 2px;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight:bolder;
  letter-spacing:3px;
  line-height: 42px;
  text-align: center;
  display: inline-block;
}
.login-test>input[type="button"]{
  position: relative;
  left: 7%;top: -2.5px;
  height: 42px;
  width: 43%;
  border: 0;
  background-color: rgb(232,78,64);
  color: #fff;
}
#zhuce-submit,#login-submit,#login-set{
  position: relative;
  left: 5%;
  top: 5px;
  height: 42px;
  width: 90%;
  border: 0;
  background-color: rgb(232,78,64);
  color: #fff;
}
.login-other>a{
  color: rgb(231,98,91);
}
.login-other>a:first-child{
  margin-left: 5%;
  float: left;
}
.login-other>a:last-child{
  margin-right: 5%;
  float: right;
}
.login-prompt{
  height: 21px;
  text-align: center;
  background-color: rgb(220,211,178);
  color: rgb(206,110,84);
}
#login-fengexian{
  position: relative;
  width: 100%;
  left: 0;
  border: 1px solid rgb(222,222,222);
} 
</style>