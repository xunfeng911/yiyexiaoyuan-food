<template>
<div>
  <div class="pyh">
    <form action="#" class="pyh-form">
      <div class="pyh-div">
        <span>活动开始时间：</span>
        <input type="" name="pyh-begin" v-model="pyh.begin"/>
      </div>
      <div class="pyh-div">
        <span>活动结束时间：</span>
        <input type="" name="pyh-end" v-model="pyh.end"/>
      </div>
      <div class="pyh-div">
        <span>活动联系电话：</span>
        <input type="number" name="pyh-tel" v-model="pyh.tel"/>
      </div>
      <div class="pyh-js">
        <p>活动介绍：</p>
        <textarea rows="10" v-model="pyh.textcont"></textarea>
      </div>
      <div>
      <ul class="pbc-ul">
        <li class="pbc-yulan" v-show="pyh.pics.length != 9">
          <div class="pbc-photos">
            <input type="file" accept="image/*" id="pyh-pic"  multiple="multiple" @change="onFileChange" />
            <label for="pyh-pic" class="pbc-label">选择上传</label>
          </div>
        </li>
        <li  v-for="(pic, index) in pyh.pics " class="pbc-yulan" v-if="pyh.pics.length > 0">
          <img :src="pic" @click='goSeeBig(index)' />
          <span class="pic-delete" @click="delImage(index)">X</span>
        </li>
      </ul>
    </div>
      <button class="pyh-btn" @click.prevent="pyh_Btn">发布</button>
    </form>
  </div>
  <v-modal v-if='symod.isShow' :symod="symod" v-on:mod_cancel="modCancel" v-on:mod_yes="pyh_Sub"></v-modal>
  <bigphoto v-on:bigHidden="bigHide" :bigphdata='pyh.pics' :slideIndex='set_slide_index' v-if="lookBig"></bigphoto>  
</div>
</template>
 <script>
import bigphoto from '../bigphoto/bigphoto.vue'
import vModal from '../modal/modal.vue'
export default {
  name: 'push-yh',
  components: {
    bigphoto,
    vModal
  },
  data () {
    return {
      // 查看大图
      lookBig: false,
      set_slide_index: [],
      // 弹窗
      symod: {
        isShow: false,
        cont: '硕男神好帅啊咋这么帅',
        loading: false,
        btn: true
      },
      // ajax
      pyh_url: null,
      pyh: {
        begin: null,
        end: null,
        tel: null,
        textcont: null,
        pics: []
      }
    }
  },
  methods: {
      // 提交
    pyh_Btn () {
      // console.log(this.pbc)
      let PYHISOk = true
      for (let x in this.pyh) {
        if (this.pyh[x] == null || '') {
          PYHISOk = false
        }
        console.log(x + this.pyh[x])
      }
      if (!PYHISOk) {
        window.alert('信息没填满呢')
      } else {
        this.symod.isShow = true
      }
    },
    pyh_Sub () {
      this.$http.post(this.pyh_url, this.pyh).then(response => {
        this.symod.cont = '请等待'
        this.symod.btn = false
        this.symod.loading = true
        setTimeout(this.modCancel, 500)
      }, response => {
        window.alert('失败')
      })
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
          // console.log(vm.pyh.pics)
          vm.pyh.pics.push(e.target.result)
        }
      }
    },
    delImage (index) {
      this.pyh.pics.shift(index)
    },
    goSeeBig (index) {
      this.set_slide_index = index
      this.lookBig = true
      // console.log(this.set_slide_index)
    },
    bigHide () {
      this.lookBig = false
    },
    modCancel () {
      this.symod.isShow = false
    }
  }
}
 </script>
<style type="text/css">
.pyh{
  padding: 1rem 10%;
  text-align: center;
  background: #fff;
}
.pyh-div{
  margin-bottom: 2rem;
}
.pyh-div span{
  width: 20%;
}
.pyh-div input{
  width: 50%;
  height: 1.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  margin-left: 5%;
}
.pyh-js{
  text-align: left;
}
.pyh-js textarea{
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: .5rem;
}
#pyh-pic{
  display: none;
}
.pyh-label{
  width: 6rem;
  height: 6rem;
  margin-top: .4rem;
  line-height: 6rem;
  background: grey;
  display: block;
}
.pyh-btn{
  position: relative;
  left: 40%;
  width: 20%;
  height: 2.5rem;
  border: 0;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background: red;
}
</style>