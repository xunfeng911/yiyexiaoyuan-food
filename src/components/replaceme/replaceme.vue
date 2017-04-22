<template>
  <div class="replaceme">
    <div class="rm-choose">
      <div class="rm-ch-where">
        <span @click="showWhereLi">{{rmdata.where}}</span>
        <span @click="showWhereLi" class="iconfont eat_icon-xiangxia rm-ch-xx"></span>
        <ul class="rm-wh-li" v-show='rm_wh_show'>
          <li v-for='li in rm_wh' @click="choWhere(li.list)">{{li.list}}</li>
        </ul>
      </div>
      <div class="rm-ch-food">
        <span @click="showFoodLi">{{rmdata.food}}</span>
        <span @click="showFoodLi" class="iconfont eat_icon-xiangxia rm-ch-xx"></span>
        <ul class="rm-food-li" v-show="rm_food_show">
          <li v-for='li in rm_food' @click="choFood(li.list)">{{li.list}}</li>
        </ul>
      </div>
    </div>
    <div class="rm-ch-btn">
      <span class="rm-btn-neirong" @click="Btn_fly">听天由命</span>
    </div>

    <div v-for="data in hdrmes">
      <shopcard :scdata='data'></shopcard>
    </div>
  </div>
</template>

<script>
import shopcard from '../shopcards/shopcard.vue'

export default {
  name: 'repaceme',
  components: {
    shopcard
  },
  created () {
    this.$store.commit('UPDATE_EATUSER', true)
    this.$store.commit('UPDATE_EATCAMERA', false)
    this.$store.commit('UPDATE_EATLEFT', true)
    this.$store.commit('UPDATE_EATHOME', true)
    this.$store.commit('UPDATE_EATTITLE', false)
  },
  data () {
    return {
      rm_wh_show: false,
      rm_wh: [
        {list: '所有区域'},
        {list: '综合楼'},
        {list: '海棠'},
        {list: '丁香'},
        {list: '竹园'}
      ],
      rm_food_show: false,
      rm_food: [
        {list: '所有美食'},
        {list: '早点'},
        {list: '正餐'},
        {list: '饮品'},
        {list: '其他'}
      ],
      rmUrl: null,
      rmdata: {
        where: '所有区域',
        food: '所有美食'
      },
      hdrmes: [
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
        }
      ]
    }
  },
  methods: {
    showFoodLi () {
      this.rm_food_show = true
      this.rm_wh_show = false
    },
    showWhereLi () {
      this.rm_wh_show = true
      this.rm_food_show = false
    },
    choFood (choose) {
      this.rmdata.food = choose
      this.rm_food_show = false
    },
    choWhere (choose) {
      this.rmdata.where = choose
      this.rm_wh_show = false
    },
    Btn_fly () {
      this.$http.post(this.rmUrl, this.rmdata).then(response => {
        // this.hdrmes = response.hdrmes
      }, response => {
        window.alert('网络错误，稍后再试')
      })
    }
  }
}
</script>

<style>
.rm-choose{
  height: 9rem;
  border-radius: 3rem;
  margin: 2rem .8rem;
  text-align: center;
  background-color: #fff;
}
.rm-ch-where,.rm-ch-food{
  position: relative;
  top: 1.6rem;
  height: 2em;
  line-height: 2rem;
}
.rm-ch-food{
  margin-top: .6rem;
}
.rm-ch-xx{
  position: relative;
  top: .3rem;
  font-size: 1.3rem;
}
.rm-ch-btn{
  position: relative;
  top: -4rem;
  left: 25%;
  width: 50%;
  height: 3rem;
  border-radius: 2rem;
  color: #fff;
  text-align: center;
  line-height: 3rem;
  background: red;
}
.rm-wh-li,.rm-food-li{
  position: relative;
  left: 50%;
  width: 8rem;
  border:  1px solid grey;
  margin-left: -4.5rem;
  text-align: center;
  background-color: #fff;
  z-index: 5;
}
.rm-wh-li>li,.rm-food-li>li{
  width: 80%;
  height: 2.5rem;
  border-bottom: 1px solid grey;
  margin-left: 10%;
  line-height: 2.5rem;
}
.rm-wh-li>li:first-child,.rm-food-li>li:first-child{
  color: red;
  border-bottom: 1px solid red;
}
.rm-wh-li>li:last-child,.rm-food-li>li:last-child{
  border: 0;
}
</style>