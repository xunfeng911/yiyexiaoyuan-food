<template>
<div>
  <div class="login-prompt" v-show='error.show'>
    <span id="register_rsp_txt">{{error.cont}}</span>
    <a id="register_rsp_href"></a>
  </div>
  <div class="form-login">
    <div class="login-title">
      <span>账号注册</span>
    </div>
  <form action="#" method="get"  role="form">
    <div class="login-text">
      <div id="login-fengexian"></div>
      <input  id="Mobile_num" type="number" placeholder="请输入您的手机号" v-model="sy_register.usr_tel"  required/>
    </div>
    <div class="login-test">
        <input id='validate_num' type="text" v-model="validate.input" placeholder="验证码" required/>
        <span class='validate-num' @click="checkVal" :style="{color: validate.color}">{{validate.num}}</span>
    </div>
    <div class="login-test1">
        <input type="text" id="tel-code" placeholder="手机验证码" v-model="sy_register.usr_valid" maxlength="6" required/>
      <input type="button" id="login-get" :disabled="disabled" :value='inputValue' class="btn" @click="getTelVal" />
    </div>
    <input type="button" id="zhuce-submit" class="btn btn-block" value="提交手机验证码" @click="regOn"/>
  </form>
    <p class="yhxy">注册即为同意<a href="yhxy.htm">《用户协议》</a></p>
  </div>
</div>  
</template>

<script>
import {createCode, createColor} from '../../common/js/common.js'
export default {
  name: 'register',
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
      disabled: false,
      count_down: 0,
      count: 60,
      getValue: '获取手机验证码',
      inputValue: null,
      sy_register: {
        usr_tel: null,
        usr_valid: null
      }
    }
  },
  computed: {
    inCount () {
      return this.count + 's'
    }
  },
  methods: {
    checkVal () {
      this.validate.num = createCode()
      this.validate.color = createColor()
    },
    getTelVal () {
      var OKTOUP = true
      console.log(OKTOUP)
      if (this.validate.input.toUpperCase() === this.validate.num.toUpperCase()) {
        OKTOUP = true
        var reg = /^1(3|4|5|7|8)[0-9]\d{8}$/
        if (reg.test(this.sy_register.usr_tel) === true) {
          this.$http.post(this.sy_register.usr_tel).then(response => {
            this.count_down += 1
            if (this.count_down === 3) {
              this.error.cont = '请勿多次请求验证码'
              this.error.show = true
              setTimeout(x => {
                this.error.show = false
                this.$router.push('/homepage')
              }, 3000)
            }
            this.count = 60
            // this.inputValue = this.inCount
            var iCount = setInterval(x => {
              if (this.count > 0) {
                this.count--
                this.disabled = true
                this.inputValue = this.inCount
              } else {
                clearInterval(iCount)
                this.count = 60
                this.disabled = false
                this.inputValue = this.getValue
              }
            }, 1000)
            // console.log(iCount)
          }, response => {
            this.count_down += 1
            if (this.count_down === 3) {
              this.error.cont = '请勿多次请求验证码'
              this.error.show = true
              setTimeout(x => {
                this.error.show = false
                this.$router.push('/homepage')
              }, 3000)
            }
            this.count = 60
            this.inputValue = this.inCount
            var iCount = setInterval(x => {
              if (this.count > 0) {
                this.count--
                this.inputValue = this.inCount
                this.disabled = true
              } else {
                clearInterval(iCount)
                this.count = 60
                this.disabled = false
                this.inputValue = this.getValue
              }
            }, 1000)
            // console.log(iCount)
          })
        } else {
          OKTOUP = false
          this.error.cont = '手机号格式不对'
          this.error.show = true
          setTimeout(x => {
            this.error.show = false
          }, 3000)
        }
      } else {
        OKTOUP = false
        this.error.cont = '验证码错误'
        this.error.show = true
        setTimeout(x => {
          this.error.show = false
        }, 3000)
      }
    },
    regOn () {
      var OKTOUP = true
      console.log(OKTOUP)
      if (this.validate.input.toUpperCase() === this.validate.num.toUpperCase()) {
        OKTOUP = true
        var reg = /^1(3|4|5|7|8)[0-9]\d{8}$/
        if (reg.test(this.sy_register.usr_tel) === true) {
          this.$http.post(this.sy_register.usr_tel).then(response => {
            if (response.result === 0) {
              this.$router.push('setpass')
            }
          }, response => {

          })
        } else {
          OKTOUP = false
          this.error.cont = '手机号格式不对'
          this.error.show = true
          setTimeout(x => {
            this.error.show = false
          }, 3000)
        }
      } else {
        OKTOUP = false
        this.error.cont = '验证码错误'
        this.error.show = true
        setTimeout(x => {
          this.error.show = false
        }, 3000)
      }
    }
  },
  created () {
    this.checkVal()
    this.inputValue = this.getValue
  }
}
</script>

<style>
.yhxy{
  text-align: center;
  margin: 10px 0;
}
.yhxy>a{
  color: red;
}
.login-test1{
  background-color: #fff;
  height: 55px;
  margin: 10px 0;
}
.login-test1>input[type="text"]{
  padding: 0;
  position: relative;
  top: 4px;
  left: 5%;
  width: 43%;
  height: 42px;
  border: 1px solid rgb(222,222,222);
  border-radius: 4px;
  text-align: center;
}
.login-test1>input[type="button"]{
  position: relative;
  left: 7%;
  top: 4px;
  height: 42px;
  width: 43%;
  border: 0;
  background-color: rgb(232,78,64);
  color: #fff;
}
</style>