<template>
<div class="setpass">
<div class="login-prompt" v-show="error.show">{{error.cont}}</div>
    <div class="form-login">
      <div class="login-title">
        <span>设置密码</span>
      </div>
      <form action="#" method="post" role="form">
        <div class="login-text">
          <div id="login-fengexian"></div>
          <input v-model="updata.first_pass" type="password" placeholder="请输入您的密码" required />
          <div id="text-first"></div>
          <input v-model="updata.second_pass" type="password" placeholder="请确认您的密码" required />
          <div id="login-fengexian"></div>
        </div>
        <div class="login-get">
          <input @click="postPass" type="button" value="提交密码" class="btn btn-block setpassword" />
        </div>
      </form>
    </div>
</div>
</template>
<script>
export default {
  name: 'setpass',
  data () {
    return {
      error: {
        show: false,
        cont: '密码不一致'
      },
      url: '',
      updata: {
        first_pass: null,
        second_pass: null
      }
    }
  },
  methods: {
    postPass () {
      let CANPOST = true
      for (let x in this.updata) {
        if (this.updata[x] == null || '') {
          CANPOST = false
          this.error.cont = '请填写密码'
          this.error.show = true
          setTimeout(x => {
            this.error.show = false
          }, 3000)
        } else if (this.updata[x].length < 6 || this.updata[x].length > 16) {
          CANPOST = false
          this.error.cont = '密码不能小于六位或大于十六位'
          this.error.show = true
          setTimeout(x => {
            this.error.show = false
          }, 3000)
        } else {
          CANPOST = true
        }
      }
      if (this.updata.first_pass.length !== this.updata.second_pass.length) {
        CANPOST = false
        this.error.cont = '密码长度不一致'
        this.error.show = true
        setTimeout(x => {
          this.error.show = false
        }, 3000)
      } else {
        CANPOST = true
      }
      if (CANPOST) {
        this.$http.post(this.url, this.updata).then(response => {
          if (response.result === 1) {
            this.$store.commit('UPDATE_LOGIN', response.sy_usr_mes)
            setTimeout(x => {
              this.$router.push('/homepage')
            }, 1000)
          }
        })
      }
    }
  }
}
</script>
<style >
.setpassword{
  position: relative;
  left: 5%;
  top: 5px;
  height: 42px;
  width: 90%;
  border: 0;
  background-color: rgb(232,78,64);
  color: #fff;
}
</style>