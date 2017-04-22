<template>
  <div class="change-name">
    <div class="set-prompt" id="set_rsp" hidden >
      <span id="set_rsp_txt">oh my god</span>
    </div>
    <form id="form-name" action="#" method="get">
      <input id="input-name" type="text" maxlength="16" v-model='new_name' placeholder="请填入新名称" />
      <p>以英文字母和汉字组成,4-16个字符,一汉字为两字符</p>
      <p class="red">用户名仅可修改一次</p>
      <input id="user-name" class="btn btn-block" type="button" @click="upName" value="修改"/>
    </form>
    <v-modal :symod="symod" v-on:mod_yes="modal_Sub"></v-modal>
  </div>
</template>
<script>
import vModal from '../modal/modal.vue'
export default {
  name: 'chaname',
  components: {
    vModal
  },
  data () {
    return {
      symod: {
        isShow: false,
        cont: '修改成功！',
        loading: true,
        btn: false
      },
      nameUrl: '',
      new_usr: {
        id: null,
        name: null
      }
    }
  },
  methods: {
    modal_Sub () {
      console.log('aaa')
    },
    upName () {
      this.new_usr = this.$store.state.syusr.usr_id
      var regUser1 = /[a-zA-Z]{4,16}/
      var regUser2 = /[\u4e00-\u9fa5]{2,8}/
      if (regUser1.test(this.new_name) === true || regUser2.test(this.new_name) === true) {
        this.$http.post(this.nameUrl, this.new_usr).then(response => {
          if (response.result === 1) {
            this.symod.cont = '用户名已被使用'
            this.new_name = null
            this.symod.isShow = true
            setTimeout(x => {
              this.symod.isShow = false
            }, 1500)
          } else if (response.result === 0) {
            this.symod.cont = '修改成功！'
            this.$store.commit('UPDATE_USRNAME', this.new_name)
            this.symo.isShow = true
            setTimeout(x => {
              this.symod.isShow = true
            }, 1500)
          }
        })
      } else {
        this.symod.cont = '用户名不合法'
        this.symod.isShow = true
        setTimeout(x => {
          this.symod.isShow = false
        }, 1500)
      }
    }
  }
}
</script>
<style>
#input-QQ,#input-name{
  width: 100%;
  height: 48px;
  border: 0;
  border-bottom: 2px solid rgb(200,200,200);
  padding-left: 20px;
}
#input-QQ::-webkit-input-placeholder,#input-name::-webkit-input-placeholder { padding-left: 20px; }
#input-QQ::-moz-placeholder,#input-name::-moz-placeholder { padding-left: 20px; } /* firefox 19+ */
#input-QQ:-ms-input-placeholder,#input-name:-ms-input-placeholder { padding-left: 20px; } /* ie */
#input-QQ>input:-moz-placeholder,#input-name>input:-moz-placeholder { padding-left: 20px; }

#form-QQ>input[type="button"],#form-name>input[type="button"]{
  position: relative;
  width: 80%;
  height: 42px;
  line-height: 28px;
  left: 10%;
  color: #fff;
  background-color: rgb(232,78,64);
  border-radius: 5px;
}
#form-QQ>input[type="button"]{
  margin-top: 50px;
}
#form-name>input[type="button"]{
  
}
#form-name>p{
  text-align: center;
}
.red{
  color: red;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>