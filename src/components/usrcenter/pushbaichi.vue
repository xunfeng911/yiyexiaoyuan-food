<template>
<div>
  <div class="pbc">
  <form action="#" class="pbc-form">
    <div class="pbc-div pbc-peo">
      <span>人数：</span>
      <input type="number" name="pbc-num" v-model="pbc.num"/>
    </div>
    <div class="pbc-div">
      <span>点赞评论开始时间：</span>
      <input type="date" name="pbc-dz-begin" v-model="pbc.dzBegin" />
    </div>
    <div class="pbc-div">
      <span>点赞评论结束时间：</span>
      <input type="date" name="pbc-dz-end" v-model="pbc.dzEnd" />
    </div>
    <div class="pbc-div">
      <span>白食使用截止时间：</span>
      <input type="date" name="pbc-bc-end" v-model="pbc.bcEnd" />
    </div>
    <div class="pbc-div pbc-phone">
      <span>电话：</span>
      <input type="tel" name="pbc-tel" v-model="pbc.tel"/>
    </div>
    <div class="pbc-js">
      <p>白食描述：</p>
      <textarea rows="10" v-model="pbc.textcont"></textarea>
    </div>
    <div>
      <ul class="pbc-ul">
        <li class="pbc-yulan" v-show="pbc.pics.length != 9">
          <div class="pbc-photos">
            <input type="file" accept="image/*" id="pbc-pic"  multiple="multiple" @change="onFileChange" />
            <label for="pbc-pic" class="pbc-label">选择上传</label>
          </div>
        </li>
        <li  v-for="(pic, index) in pbc.pics " class="pbc-yulan" v-if="pbc.pics.length > 0">
          <img :src="pic" @click='goSeeBig(index)' />
          <span class="pic-delete" @click="delImage(index)">X</span>
        </li>
      </ul>
    </div>
    <button class="pbc-btn" v-on:click.prevent="pbc_Btn">发布</button>
  </form>
  </div>
  <v-modal :symod="symod" v-on:mod_yes="pbc_Sub"></v-modal>
  <bigphoto v-on:bigHidden="bigHide" :bigphdata='pbc.pics' :slideIndex='set_slide_index' v-if="lookBig"></bigphoto>
</div>
</template>
<script>
import bigphoto from '../bigphoto/bigphoto.vue'
import vModal from '../modal/modal.vue'
export default {
  name: 'push-bc',
  components: {
    bigphoto,
    vModal
  },
  data () {
    return {
      lookBig: false,
      set_slide_index: [],
      symod: {
        isShow: false,
        cont: '硕男神好帅啊咋这么帅',
        loading: false,
        btn: true
      },
      pbc_Url: null,
      pbc: {
        num: null,
        dzBegin: null,
        dzEnd: null,
        bcEnd: null,
        tel: null,
        textcont: null,
        pics: []
      }
    }
  },
  methods: {
    // 提交
    pbc_Btn () {
      // console.log(this.pbc)
      let PBCISOk = true
      for (let x in this.pbc) {
        if (this.pbc[x] == null || '') {
          PBCISOk = false
        }
        console.log(this.pbc[x])
      }
      if (!PBCISOk) {
        window.alert('信息没填满呢')
      } else {
        this.symod.isShow = true
      }
    },
    pbc_Sub () {
      window.alert('baba')
      this.$http.post(this.pbc_Url, this.pbc).then(response => {
        this.symod.cont = '请等待'
        this.symod.btn = false
        this.symod.loading = true
        setTimeout(this.pbc_afterSub, 500)
      }, response => {
        // errorcallback
      })
    },
    pbc_afterSub () {
      this.symod.isShow = false
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
          console.log(vm.pbc.pics)
          console.log(e.target.result)
          vm.pbc.pics.push(e.target.result)
        }
      }
    },
    delImage (index) {
      this.pbc.pics.shift(index)
    },
    goSeeBig (index) {
      this.set_slide_index = index
      this.lookBig = true
      // console.log(this.set_slide_index)
    },
    bigHide () {
      this.lookBig = false
    }
  },
  created () {
  }
}
</script>
<style type="text/css">
.pbc{
  padding: 1rem 7%;
  text-align: center;
  background: #fff;
}
.pbc-div{
  margin-bottom: 2rem;
}
.pbc-div span{
  width: 20%;
}
.pbc-div input{
  width: 50%;
  height: 1.5rem;
  border: 1px solid grey;
  border-radius: 5px;
}
.pbc-peo span,.pbc-phone span{
  margin-left: -6rem;
}
.pbc-peo input,.pbc-phone input{
  position: relative;
  left: 6rem;
}
.pbc-js{
  text-align: left;
  padding: 0 5%;
}
.pbc-js textarea{
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: .5rem;
}
#pbc-pic{
  display: none;
}
.pbc-label{
  height: auto;
  width: auto;
  line-height: 6.6rem;
  background: grey;
  display: block;
}
.pbc-btn{
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
.pbc-ul{
  width: 100%;
  height: auto;
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
.pbc-yulan{
  width: 6.6rem;
  height: 6.6rem;
  margin-top: .4rem;
}
.pbc-yulan img{
  width: 100%;
  height: 100%;
}
.pic-delete{
  position: relative;
  top: -6.3rem;
  right: .3rem;
  float: right;
  color: rgba(0,0,0,.8);
  z-index: 999;
}
@media only screen and (min-width: 0px) and (max-width: 340px) {
  .pbc-yulan{
    width: 6rem;
    height: 6rem;
  }
  .pbc-label{
    line-height: 6rem;
  }
  .pic-delete{
  position: relative;
  top: -6rem;
  right: .3rem;
  float: right;
  color: rgba(0,0,0,.8);
  z-index: 999;
}
}
</style>