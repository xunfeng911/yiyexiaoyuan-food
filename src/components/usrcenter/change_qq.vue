<template>
  <div class="change-qq">
    <div class="setqq-prompt" id="setqq_rsp" hidden>
      <span id="setqq_rsp_txt">oh my god</span>
      <a id="setqq_rsp_href"></a>
    </div>
    <form id="form-QQ" action="#" method="get">
      <input id="input-QQ" type="number" maxlength="12" v-model='new_qq' placeholder="请填入真实QQ号提高拼车效率" required />
      <input class="btn btn-block"  id='set_qq' type="button" value="修改" @click='upQQ'/>
    </form>
    <v-modal :symod="symod" v-on:mod_yes="modal_Sub"></v-modal>
  </div>
</template>
<script>
import vModal from '../modal/modal.vue'
export default {
  name: 'chanqq',
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
      qqUrl: '',
      new_usr: {
        qq: null,
        id: null
      }
    }
  },
  methods: {
    modal_Sub () {
      console.log('aaa')
    },
    upQQ () {
      this.new_usr.id = this.$store.state.syusr.usr_id
      if (this.new_qq !== null) {
        this.$http.post(this.qqUrl, this.new_usr).then(response => {
          this.symod.isShow = true
          this.$store.commit('UPDATE_USRQQ', this.new_qq)
          setTimeout(x => {
            this.symod.isShow = false
            this.$router.push('/inforch')
          }, 1500)
        })
      }
    }
  }
}
</script>
<style>
.setqq-prompt {
  height: 21px;
  text-align: center;
  background-color: rgb(220,211,178);
  color: rgb(206,110,84);
}
</style>