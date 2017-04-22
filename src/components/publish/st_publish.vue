<template>
  <div class="sp-publish">
    <div class="sp-starBars">
      <div class="sp-tasteStar">
        <span>味道</span>
        <span class=" sp-startIcon iconfont eat_icon-star" :class="{isRed :s}" v-for="(s,index) in star1"
              @click="starClick1(index)"></span>
      </div>
      <div class="sp-perStar">
        <span>分量</span>
        <span class=" sp-startIcon iconfont eat_icon-star" :class="{isRed :s}" v-for="(s,index) in star2"
              @click="starClick2(index)"></span>
      </div>
    </div>
    <div class="sp-mainCont">
      <textarea name="" cols="30" rows="5" placeholder="一次优质评论能顶五个赞喔！相同内容评价只计算一次。两张图以上才算优质评价"
                maxlength="1000" v-model="message"></textarea>
      <div class="common_upPic">
        <label for="">
          <span class="iconfont eat_icon-camera nb-camera common_upPic_camera"></span>
          <input @change="uploadPic" class="common_upPic_choose" type="file" multiple
                 accept="image/jpeg,image/png,image/gif,image/bmp">
        </label>
      </div>
      <div class="sp-countNum">
        <p>还差{{ (20-message.length)>0 ? (20-message.length):0 }}字为优质评论</p>
      </div>
      <div class="sp-picBox">
        <img :src="i" class="sp-uploadBox  " v-for="i in pics">
      </div>
    </div>
    <div class="sp-chooseHdr">
      <div class="sp-choose">
        <span>选择商家</span>
        <span class="iconfont eat_icon-left" @click="showShop"></span>
        <span>{{shopName}}</span>
      </div>
      <div class="sp-dishName">
        <p>菜名</p>
        <input type="text" placeholder="请填写菜名" maxlength="8">
      </div>
      <div class="sp-cost">
        <p>人均消费</p>
        <input type="number" min="0" max="50" oninput="if(value.length>2)value=value.slice(0,2)" placeholder="人均消费为"/>
      </div>
    </div>
    <div class="subBut">
      <p>确认发布</p>
    </div>
    <div class="pickShop" v-if="isShow">
      <label for="" class="iconfont eat_icon-baichi">
        <input type="text" placeholder="输入店名" v-model="shopName">
      </label>
      <div class="shopItems" v-for="(i,index) in shopResult" @click="pickShop(index)">
        <span>{{i}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import vImg from '../lazyloadimg/lazyimg.vue'
  export default{
    name: 'st_publish',
    components: {
      vImg
    },
    data () {
      return {
        file: null,
        pics: [],
        pics64: [],
        sp_data: {
          url: '1',
          taste: '',
          percent: ''
        },
        message: '',
        star1: [0, 0, 0, 0, 0],
        star2: [0, 0, 0, 0, 0],
        shopName: '',
        shopResult: ['西部大麻花', '大火锅', 'hello', 'hello'],
        isShow: false
      }
    },
    methods: {
      uploadPic (e) {
        if (this.pics.length > 8) {
          return false
        }
        let file = e.target.files[0]
        let fileIn64
        let vm = this
        let reader = new window.FileReader()
        if (!(window.File || window.FileReader || window.FileList || window.Blob)) {
          console.log('换Chrome浏览器啦')
        }
        if (window.createObjectURL !== undefined) {
          vm.pics.push(window.createObjectURL(file))
        } else if (window.URL !== undefined) { // mozilla(firefox)
          vm.pics.push(window.URL.createObjectURL(file))
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          vm.pics.push(window.webkitURL.createObjectURL(file))
        }
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          fileIn64 = e.target.result
          vm.pics64.push(fileIn64)
        }
      },
      starClick1 (index) {
//        let self = e.target
//        console.log(index)
        let vm = this
        for (let i = 0; i <= index; i++) {
          vm.star1.splice(i, 1, 1)
        }
        for (let i = 4; i > index; i--) {
          vm.star1.splice(i, 1, 0)
        }
        this.sp_data.taste = index + 1
      },
      starClick2 (index) {
        let vm = this
        for (let i = 0; i <= index; i++) {
          vm.star2.splice(i, 1, 1)
        }
        for (let i = 4; i > index; i--) {
          vm.star2.splice(i, 1, 0)
        }
        this.sp_data.percent = index + 1
      },
      pickShop (index) {
        this.isShow = !this.isShow
        this.shopName = this.shopResult[index]
      },
      showShop () {
        this.isShow = !this.isShow
      },
      queryShop () {

      }
    },
    watch: {
      shopName: function () {
        console.log('query' + this.shopName)
      }
    }
  }
</script>
<style>
  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .sp-starBars {
    box-sizing: border-box;
    padding-top: 20px;
    height: 120px;
    width: 100%;
    background-color: #fff;
  }

  .sp-tasteStar, .sp-perStar {
    height: 42%;
    width: 100%;
    background-color: #fff;
  }

  .sp-tasteStar {
    margin-top: 10px;
  }

  .sp-perStar {
    margin-top: 20px;
  }

  .sp-tasteStar span:first-child, .sp-perStar span:first-child {
    box-sizing: border-box;
    padding-left: 22%;
    font-size: 16px;
    color: #3b3b3b;
    margin-right: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .sp-startIcon {
    padding-top: 2px;
    font-size: 28px;
    color: #b3b3b3;

  }

  .isRed {
    color: #e03632;
  }

  .sp-mainCont {
    padding-top: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    height: 260px;
    width: 100%;
    background-color: #FFFFFF;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .sp-mainCont textarea {
    width: 100%;
    height: 40%;
    resize: none;
    font-size: 18px;
    border: 1px solid #b3b3b3;
    opacity: .8;
  }

  .sp-picBox {
    float: left;
    margin-bottom: 10px;
  }

  .sp-countNum p {
    float: right;
    margin-right: 0;
    padding-right: 40px;
    opacity: .6;
    margin-top: 10px;
  }

  .sp-uploadBox {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    height: 100px;
    width: 100px;
  }

  .sp-uploadBox img {
    width: 100%;
    height: 100%;
  }

  .sp-chooseHdr {
    float: left;
    height: 160px;
    width: 100%;
    background-color: #f0edf0;
    margin-bottom: 10px;
  }

  .sp-choose, .sp-cost, .sp-dishName {
    float: left;
    box-sizing: border-box;
    width: 100%;
    height: 30%;
    background-color: #FFFFFF;
    margin-top: 10px;
    padding-top: 8px;
    padding-left: 10px;
    padding-right: 40px;
    color: #7e8c8d;
  }

  .sp-choose span:nth-child(2) {
    float: right;
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    font-size: 18px;
    margin-top: 4px;
    margin-right: 0px;
  }

  .sp-choose span:last-child {
    float: right;
    font-size: 18px;
    margin-right: 30%;
    padding-top: 4px;
    font-weight: bold;
  }

  .pickShop {
    display: flex;
    left: 10%;
    top: 66%;
    height: auto;
    width: 80%;
    position: fixed;
    background: #fff;
    border: 1px solid #3b3b3b;
    flex-flow: column nowrap;
    align-items: center;
  }

  .pickShop input {
    height: 28px;
    border: 1px solid;
    width: 70%;
    margin-top: 10px;
    padding-top: 6px;
    margin-left: -30px;
    padding-left: 40px;
    background: transparent;
    font-size: 16px;
    border-radius: 6px;
  }

  .pickShop label {
    width: 90%;
    font-size: 24px;
    color: #3b3b3b;
    opacity: .6;
    margin-left: 14%;
  }

  .shopItems {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    height: 26px;
    width: 80%;
    margin: 10px;
    border: solid #3b3b3b;
    border-width: 0 0 1px 0;
  }

  .shopItems span {
    margin-top: 10px;
  }

  .sp-cost p, .sp-dishName p {
    float: left;
    display: inline;
    margin-right: 20%;
  }

  .sp-cost input, .sp-dishName input {
    float: left;
    height: 60%;
    width: 50%;
    padding-left: 10px;
    font-size: 16px;
    color: #3b3b3b;
    /*border: solid .5px #3b3b3b ;*/
  }

  .sp-cost input {
    margin-left: -30px;
  }

  .subBut {
    float: left;
    margin-left: 26%;
    height: 40px;
    width: 50%;
    background-color: #e03632;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .subBut p {
    padding: 10px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

</style>
