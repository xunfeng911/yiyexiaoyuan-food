<template>
  <div class="sy-modal" v-if="symod.isShow" @click.self="mod_cancel">
    <div class="tri" v-if="showEdit()" v-bind:style="{top:height1+'px'}"></div>
    <div class="edit" v-if="showEdit()" v-bind:style="{top:height1+20+'px'}">
      <div class="modal-comment iconfont eat_icon-comment">
        <span>评论</span>
      </div>
      <div class="modal-share iconfont eat_icon-share">
        <span>分享</span>
      </div>
      <div class="modal-delete iconfont eat_icon-ljt" @click="removeNews">
        <span>删除</span>
      </div>
    </div>
    <div class="mod-body" v-if="isBody">
      <div class="mod-cont">
        <span>{{symod.cont}}</span>
      </div>
      <div class="mod-loading" v-if="symod.loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      </div>
      <div class="mod-btn" v-if="symod.btn">
        <button @click="mod_yes">是</button>
        <button @click="mod_cancel">否</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-modal',
    props: ['symod'],
    data () {
      return {
        modalShow: true,
        height1: 120
      }
    },
    computed: {
      isBody () {
        if (this.symod.isBody === false) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      mod_cancel () {
        this.symod.isShow = false
        this.symod.btn = false
        this.symod.isBody = false
      },
      mod_yes () {
        this.symod.isShow = false
        this.symod.btn = false
        this.symod.isBody = false
        this.$emit('mod_yes')
      },
      showEdit () {
        this.height1 = this.symod.posY
        return this.symod.isEdit
      },
      removeNews () {
        this.symod.isEdit = false
        this.symod.cont = '确认删除这条评价？'
        this.symod.isBody = true
        this.symod.btn = true
      }
    }
  }
</script>

<style type="text/css">
  .sy-modal {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  }

  .mod-body {
    position: relative;
    width: 70%;
    height: 20%;
    border-radius: 10px;
    background: #fff;
  }

  .mod-cont {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
  }

  .mod-loading {
    width: 100%;
    height: 15px;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: .8rem;
    text-align: center;
  }

  .mod-loading span {
  }
  .sy-modal {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  }

  .mod-body {
    position: relative;
    width: 70%;
    height: 20%;
    border-radius: 10px;
    background: #fff;
  }

  .mod-cont {
    width: auto;
    padding: 0 12%;
    margin-top: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  .mod-loading {
    width: 100%;
    height: 15px;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: .8rem;
    text-align: center;
  }

  .mod-loading span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    background: red;
    -webkit-animation: load 1.04s ease infinite;
    animation: load 1.04s ease infinite;
  }

  .mod-loading span:last-child {
    margin-right: 0px;
  }

  @keyframes load {
    0% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: .2;
      transform: scale(.2);
    }
  }

  @-webkit-keyframes load {
    0% {
      opacity: 1;
      -webkit-transform: scale(1.2);
    }
    100% {
      opacity: .2;
      -webkit-transform: scale(.2);
    }
  }

  .mod-loading span:nth-child(1) {
    -webkit-animation-delay: 0.13s;
    animation-delay: 0.13s;
  }

  .mod-loading span:nth-child(2) {
    -webkit-animation-delay: 0.26s;
    animation-delay: 0.26s;
  }

  .mod-loading span:nth-child(3) {
    -webkit-animation-delay: 0.39s;
    animation-delay: 0.39s;
  }

  .mod-loading span:nth-child(4) {
    -webkit-animation-delay: 0.52s;
    animation-delay: 0.52s;
  }

  .mod-loading span:nth-child(5) {
    -webkit-animation-delay: 0.65s;
    animation-delay: 0.65s;
  }

  .mod-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .mod-btn button {
    width: 50%;
    height: 2.5rem;
    padding: 0;
    border: 0;
    border-top: 1px solid red;
    margin: 0;
    font-size: 1rem;
    background: #fff;
  }

  .mod-btn button:nth-child(1) {
    border-right: 1px solid red;
    border-bottom-left-radius: 10px;
  }

  .mod-btn button:nth-child(2) {
    position: absolute;
    right: 0;
    border-bottom-right-radius: 10px;
  }

  .edit {
    position: fixed;
    height: 120px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    top: 10%;
    right: 0;
  }

  .edit > div {
    color: #c43134;
    width: 100%;
    height: 24%;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-left: 4%;
    font-size: 24px;
    border-bottom: 1px solid #c43134;
    opacity: .8;
  }

  .edit > div > span {
    margin-left: 6%;
    font-size: 16px;
    color: #3b3b3b;
  }

  .tri {
    top: 50px;
    right: 42px;
    z-index: 999999;
    position: fixed;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 24px solid #FFFFFF;
  }
</style>
