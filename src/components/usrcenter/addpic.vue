
<template>
  <div class="addpic" v-on:click.self="addHidden">
    <form action="#" class="addform">
      <p class="addtitle">上传照片</p>
      <div class="addp-name">
        <span>菜名：</span>
        <input type="text" v-model="addpdata.name"  required/>
      </div>
      <div class="addp-select">
        <span>类别：</span>
        <select v-model="addpdata.selected">
          <option value="推荐">推荐</option>
          <option value="菜单">菜单</option>
          <option value="环境">环境</option>
        </select>
      </div>
      <div>
      <ul class="pbc-ul">
        <li class="pbc-yulan" v-show="addpdata.pic < 1">
          <div class="pbc-photos">
            <input type="file" accept="image/*" id="addp-pic" @change="onFileChange" hidden/>
            <label for="addp-pic" class="pbc-label">选择上传</label>
          </div>
        </li>
        <li  v-for="(pic, index) in addpdata.pic " class="pbc-yulan" v-if="addpdata.pic.length > 0">
          <img :src="pic" @click='goSeeBig(index)' />
          <span class="pic-delete" @click="delImage(index)">X</span>
        </li>
      </ul>
    </div>
      <button class="addp-submit" v-on:click.prevent="addp_Btn">提交</button>
    </form>
    <v-modal :symod="symod" v-on:mod_yes="addp_Sub"></v-modal>
    <bigphoto v-on:bigHidden="bigHide" :bigphdata='addpdata.pic' :slideIndex='set_slide_index' v-if="lookBig"></bigphoto>
  </div>
</template>

<script>
import bigphoto from '../bigphoto/bigphoto.vue'
import vModal from '../modal/modal.vue'
export default {
  name: 'addpic',
  components: {
    bigphoto,
    vModal
  },
  data () {
    return {
      set_slide_index: [],
      lookBig: false,
      symod: {
        isShow: false,
        cont: '硕男神好帅啊咋这么帅',
        loading: false,
        btn: true
      },
      adph_Url: '',
      addpdata: {
        name: null,
        selected: null,
        pic: []
      }
    }
  },
  props: ['isHidden'],
  methods: {
    addHidden () {
      this.isHidden = false
      // console.log(this.isHidden)
      this.$emit('addHidden')
    },
    // 提交
    addp_Btn () {
      let PBCISOk = true
      for (let x in this.addpdata) {
        if (this.addpdata[x] == null || '') {
          PBCISOk = false
        }
      }
      if (!PBCISOk) {
        window.alert('信息没填满呢')
      } else {
        this.symod.isShow = true
      }
    },
    addp_Sub () {
      this.$http.post(this.url, this.addpdata).then(response => {
        // successcallback
        this.symod.cont = '请等待'
        this.symod.btn = false
        this.symod.loading = true
        setTimeout(this.addp_afterSub, 500)
      }, response => {
        // errorcallback
      })
    },
    addp_afterSub () {
      this.symod.isShow = false
      this.$emit('addHidden')
      this.$router.push('/shopphoto')
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      // console.log(files)
      // console.log(files.length)
      if (files.length) {
        this.createImage(files)
      }
    },
    createImage (file) {
      if (typeof FileReader === 'undefined') {
        window.alert('您的浏览器不支持图片上传，请升级您的浏览器')
        return false
      }
      // var image = new window.Image()
      // console.log(image)
      var leng = file.length
      var vm = this
      for (var i = 0; i < leng; i++) {
        var reader = new window.FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          // console.log(vm.pbc.pics)
          vm.addpdata.pic.push(e.target.result)
        }
      }
    },
    delImage (index) {
      this.addpdata.pic.shift(index)
    },
    goSeeBig (index) {
      this.set_slide_index = index
      this.lookBig = true
      // console.log(this.set_slide_index)
    },
    bigHide () {
      this.lookBig = false
    }
  }
}
</script>
<style type="text/css">
.addpic{
  position: fixed;
  top: 0rem;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  box-shadow: 0 0 0 999px rgba(0,0,0,.5);
  z-index: 999;
}
.addform{
  position: relative;
  top: 8%;
  left: 7.5%;
  background: rgba(255,255,255,1);
  width: 75%;
  height: 40%;
  padding: 30% 5%;
  text-align: center;
}
.addtitle{
  font-size: 1.2rem;
}
.addp-name{
  margin-top: 1rem;
}
.addp-name input{
  width: 40%;
  height: 1.4rem;
  border: 1px solid grey;
  border-radius: 4px;
}
.addp-select{
  margin-top: 1rem;
}
.addp-select select{
  width: 40%;
/*  height: 20px;
  line-height: 40px;
*/
}
/*select的height*/
.addp-pic{
  margin-top: 1rem;
  text-align: center;
}
#addp-pho{
  display: none;
}
.addp-pic label{
  width: 50%;
  height: 2rem;
  border-radius: 4px;
  line-height: 2rem;
  color: #fff;
  background: red;
  display: inline-block;
}
/*图形待定*/
.addp-submit{
  width: 30%;
  height: 1.8rem;
  border: 0;
  border-radius: 4px;
  margin-top: 2rem;
  color: #fff;
  background: red;
}
</style>