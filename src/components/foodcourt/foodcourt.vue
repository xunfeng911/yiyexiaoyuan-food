<template>
  <div class="fc">
    <div class="fc-top">
      <div class="fc-t-where" @click="fcTwhere">
        <span>{{fc_choose.where}}</span>
        <span class="iconfont eat_icon-xiangxia fc-t-xx"></span>
      </div>
      <div class="fc-t-meishi" @click="fcTmeishi">
        <span>{{fc_choose.delicacy}}</span>
        <span class="iconfont eat_icon-xiangxia fc-t-xx"></span>
      </div>
      <div class="fc-t-zhineng" @click="fcTzhineng">
        <span>{{fc_choose.intsort}}</span>
        <span class="iconfont eat_icon-xiangxia fc-t-xx"></span>
      </div>
    </div>
    <ul class="fc-wh-ul" v-show="fc_list_show">
      <li v-for="li in fc_list" @click="fcChoList(li.list)">{{li.list}}</li>
    </ul>
    <div class="fc-sc">
      <div v-for="data in scdata">
        <shopcard :scdata='data'></shopcard>
      </div>
    </div>
  </div>
</template>

<script>
import shopcard from '../shopcards/shopcard.vue'
export default {
  name: 'foodcourt',
  components: {
    shopcard
  },
  data () {
    return {
      fcUrl: null,
      fc_choose: {
        where: '所有区域',
        delicacy: '所有美食',
        intsort: '智能排序'
      },
      fc_list_show: false,
      fc_list: [],
      fc_list_where: [
        {list: '所有区域'},
        {list: '综合楼'},
        {list: '丁香'},
        {list: '海棠'},
        {list: '竹园'}
      ],
      fc_list_food: [
        {list: '所有美食'},
        {list: '早点'},
        {list: '正餐'},
        {list: '饮品'},
        {list: '其他'}
      ],
      fc_list_intsort: [
        {list: '智能排序'},
        {list: '分数排序'},
        {list: '人气排序'}
      ],
      scdata: [
        {
          hdr_id: 1,
          hdr_name: '梁总川菜馆',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg',
          hdr_star: 4.4,
          hdr_free: '你就是个白吃',
          hdr_fst: '吃五百送五百',
          hdr_place: '梁总家',
          hdr_kind: '家常菜',
          hdr_cost: 12
        },
        {
          hdr_id: 2,
          hdr_name: '梁总川菜馆',
          hdr_pic: 'http://ww3.sinaimg.cn/bmiddle/e951cbb5ly1fbuwlhqov1j20ku0kuh92.jpg',
          hdr_star: 4.4,
          hdr_free: '你就是个白吃',
          hdr_fst: '吃五百送五百',
          hdr_place: '梁总家',
          hdr_kind: '家常菜',
          hdr_cost: 12
        }
      ]
    }
  },
  methods: {
    fcTwhere () {
      this.fc_list = this.fc_list_where
      this.fc_list_show = true
    },
    fcTmeishi () {
      this.fc_list = this.fc_list_food
      this.fc_list_show = true
    },
    fcTzhineng () {
      this.fc_list = this.fc_list_intsort
      this.fc_list_show = true
    },
    fcChoList (mes) {
      if (this.fc_list === this.fc_list_where) {
        this.fc_choose.where = mes
      } else if (this.fc_list === this.fc_list_food) {
        this.fc_choose.delicacy = mes
      } else if (this.fc_list === this.fc_list_intsort) {
        this.fc_choose.intsort = mes
      }
      this.fc_list_show = false
      this.$http.post(this.fcUrl, this.fc_choose).then(response => {
        this.scdata = response.scdata
      }, response => {

      })
    }
  },
  created () {
    this.$store.commit('UPDATE_EATLEFT', true)
    this.$http.post(this.fcUrl, this.fc_choose).then(response => {
      this.scdata = response.scdata
    }, response => {
    })
  }
}
</script>

<style>
.fc{
  background: #f0edf0;
  height: 100%;
}
.fc-top{
  position: fixed;
  top: 6.8%;
  height:2.5rem;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-around;
  z-index: 7;
}
.fc-t-meishi,.fc-t-where,.fc-t-zhineng{
  line-height: 2.5rem;
  display: inline-block;
}
.fc-t-where{

}
.fc-sc{
  position: relative;
  top: 3rem;
}
.fc-wh-ul{
  position: absolute;
  top: 2.5rem;
  width: 100%;
  padding-bottom: 1rem;
  border-top: 1px solid gainsboro;
  background: #fff;
  box-shadow: 0 0 0 999px rgba(0,0,0,.7);
  z-index: 6;
}
.fc-wh-ul>li{
  height: 2.5rem;
  padding: 0 1rem;
  border-bottom: 1px solid gainsboro;
  margin: 0 1.8rem;
  line-height: 3rem;
}
.fc-wh-ul>li:first-child{
  color: red;
  border-bottom: 1px solid red;
}
</style>
