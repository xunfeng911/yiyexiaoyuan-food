<template>
  <div>
    <div class="hdrp-mainCont">
      <textarea name="" id="" cols="30" rows="8" placeholder="说点吧..." maxlength="1000"></textarea>
      <div class="common_upPic">
        <label for="">
          <span class="iconfont eat_icon-camera nb-camera common_upPic_camera"></span>
          <input @change="uploadPic" class="common_upPic_choose" type="file" multiple
                 accept="image/jpeg,image/png,image/gif,image/bmp">
        </label>
      </div>
      <div class="hdr-picBox">
        <img :src="i" class="hdr-uploadBox" v-for="i in pics">
        <input type="text" v-model="doge" hidden>
      </div>
    </div>
    <div class="subBut">
      <p>确认发布</p>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'hdrPublish',
    data () {
      return {
        doge: '',
        picsLength: 0,
        pics: []
      }
    },
    methods: {
      uploadPic (e) {
        console.log(this.pics.length)
        if (this.pics.length > 8) {
          return false
        }
        let file = e.target.files[0]
        if (!(window.File || window.FileReader || window.FileList || window.Blob)) {
          console.log('换Chrome浏览器啦')
        }
        if (window.createObjectURL !== undefined) {
          this.pics[this.picsLength] = window.createObjectURL(this.files[0])
          this.picsLength++
        } else if (window.URL !== undefined) { // mozilla(firefox)
          this.pics[this.picsLength] = window.URL.createObjectURL(file)
          this.picsLength++
//          console.log(this.pics)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          this.pics[this.picsength] = window.webkitURL.createObjectURL(this.files[0])
          this.picsLength++
        }
        this.doge++
      }
    }
  }
</script>
<style>

  .hdrp-mainCont {
    padding-top: 40px;
    padding-bottom: 10px;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
  }

  .hdrp-mainCont textarea {
    width: 100%;
    height: 40%;
    resize: none;
    font-size: 18px;
    border: 1px solid #b3b3b3;
    opacity: .8;
  }

  .common_upPic {
    float: left;
    margin-top: 36px;
    margin-bottom: 10px;
    height: 100px;
    width: 100px;
    background-color: #3b3b3b;
    opacity: .6;
    position: relative;
  }

  .common_upPic_camera {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    text-align: center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    color: #7e8c8d;
    font-size: 50px;
  }

  .common_upPic label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .common_upPic input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 100%;
  }

  .hdr-picBox {
    float: left;
  }

  .hdr-uploadBox {
    float: left;
    margin-top: 34px;
    margin-left: 20px;
    height: 100px;
    width: 100px;
    border: 1px solid #bbbbbb;
  }

  @media screen and (max-width: 380px) {
    .hdr-uploadBox {
      margin-left: 10px;
    }
  }
  @media screen and (max-width: 320px) {
    .hdr-uploadBox {
      margin-left: 10px;
      height: 80px;
      width:80px;
      margin-top: 20px;
    }
    .common_upPic{
      height: 80px;
      width:80px;
      margin-top: 20px;
    }
  }
</style>
