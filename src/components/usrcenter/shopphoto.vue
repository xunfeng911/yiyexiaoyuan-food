<template>
  <div class="spp">
    <addpic v-on:addHidden="addHide" :isHidden="isAdd" v-if="isAdd"></addpic>
    <div class="spp-title">
      <span>商家相册</span>
      <button class="spp-tj" v-on:click.stop="sppAdd">添加照片</button>
    </div>
    <div class="spp-cho">
     <button class="cho-tj" :class="{'cho-active': isTj}" v-on:click="sppTj" >推荐</button>
      <button class="cho-cd":class="{'cho-active': isCd}" v-on:click="sppCd" >菜单</button>
     <button class="cho-hj" :class="{'cho-active': isHj}" v-on:click="sppHj" >环境</button>
    </div>
    <div class="spp-list">
    <div class="spp-list-pic" v-for='(sppho, index) in hdr_Food'>
      <v-img :imgUrl="sppho.hdr_pic" class="spp-list-pho"></v-img>
      <div class="spp-pic-com">
        <span class="iconfont eat_icon-comment spp-comment"></span>
        <span>{{sppho.hdr_food}}</span>
      </div>
      <div class="spp-pic-ljt">
        <span id="spp-pic-del" class="iconfont eat_icon-ljt spp-ljt" v-on:click="sppPicDel(sppho.hdr_FoodName)"></span>
        <label for="spp-pic-del" v-on:click="sppPicDel(sppho.hdr_FoodName)">删除</label>
      </div>
    </div>
   </div>
   <v-modal :symod="symod" v-on:mod_yes="spp_del"></v-modal>
  </div>
</template>
<script>
import vImg from '../lazyloadimg/lazyimg.vue'
import addpic from './addpic.vue'
import vModal from '../modal/modal.vue'
export default {
  name: 'shop-po',
  components: {
    vImg,
    addpic,
    vModal
  },
  data () {
    return {
      isTj: true,
      isCd: false,
      isHj: false,
      isAdd: false,
      symod: {
        isShow: false,
        cont: '真的要删除嘛？',
        loading: false,
        btn: true
      },
      // 将要删除的index
      willBeDel: null,
      hdr_tj_pics: [
        {
          hdr_food: '家常菜',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '家常菜',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '家常菜',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '家常菜',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        }
      ],
      hdr_cd_pics: [
        {
          hdr_food: '大火锅',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '大火锅',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '大火锅',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '大火锅',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        }
      ],
      hdr_hj_pics: [
        {
          hdr_food: '嘿嘿嘿',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '嘿嘿嘿',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '嘿嘿嘿',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        },
        {
          hdr_food: '嘿嘿嘿',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg'
        }
      ],
      hdr_Food: []
    }
  },
  computed: {
    // hdr_Food () {
    //   return this.hdr_recFood
    // }
  },
  methods: {
    sppTj () {
      this.hdr_Food = this.hdr_tj_pics
      this.isTj = true
      this.isCd = false
      this.isHj = false
    },
    sppCd () {
      this.hdr_Food = this.hdr_cd_pics
      this.isTj = false
      this.isCd = true
      this.isHj = false
    },
    sppHj () {
      this.hdr_Food = this.hdr_hj_pics
      this.isTj = false
      this.isCd = false
      this.isHj = true
    },
    sppAdd () {
      this.isAdd = true
    },
    sppPicDel (foodname) {
      this.willBeDel = foodname
      this.symod.isShow = true
    },
    spp_del () {
      this.$http.delete('api', this.willBeDel).then(response => {
        this.symod.cont = '请等待'
        this.symod.btn = false
        this.symod.loading = true
        setTimeout(this.spp_afterDel, 500)
      }, response => {
        // errorcallback
      })
    },
    spp_afterDel () {
      this.symod.isShow = true
      this.getFood()
    },
    getFood () {
      this.$http.get('api').then(response => {
        this.hdr_tj_pics = response.hdr_tj_pics
        this.hdr_cd_pics = response.hdr_cd_pics
        this.hdr_hj_pics = response.hdr_hj_pics
        console.log(response.body)
      }, response => {
        console.log('s')
      })
    },
    addHide () {
      this.isAdd = false
      console.log(this.isAdd)
    }
  },
  created () {
    this.getFood()
    this.hdr_Food = this.hdr_tj_pics
  }
}
</script>
<style type="text/css">
.spp{
  width: 100%;
  height: 100%;
  background: #fff;
}
.spp-title{
  padding-top: 1.2rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid grey;
  margin: 0rem 5% 0 5%;
}
.spp-tj{
  position: relative;
  top: -.5rem;
  float: right;
  width: 20%;
  height: 1.8rem;
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: red;
}
.spp-cho{
  padding: .8rem 5% 0 5%;
}
.spp-cho button{
  width: 24%;
  height: 1.8rem;
  border: 1px solid grey;
  border-radius: 10px;
  margin-right: .5rem;
  font-size: .8rem;
  color: #000;
  background: #fff;
}
.cho-active,.spp-cho button:hover{
  color: #fff !important;
  background: #ef7850 !important;
  border: 0 !important;
}
.spp-list{
  width: 100%;
}
.spp-list-pic{
  float: left;
  width: 40%;
  display: inline-block;
}
.spp-list-pho{
  width: 100%;
  height: auto;
  margin: 1rem 0 .7rem 0;
}
.spp-list-pic:nth-child(odd){
  padding-left: 7%; 
  padding-right: 6%;
}
.spp-list-pho>img{
  width: 100%;
  height: 100%;
}
.spp-pic-com{
  float: left;
}
.spp-pic-ljt{
  float: right;
}
.spp-add{
  display: none;
}
</style>