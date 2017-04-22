<template>
	<div>
  <img v-lazy="imgObj" lazy="loading"/>
  </div>
</template>
<script>
  export default {
    name: 'v-img',
    props: {
      imgUrl: {
        type: String
      }
    },
    computed: {
      imgObj () {
        return this.imgUrl
      }
    }
  }
</script>
<style>
@-webkit-keyframes fadeIn {
from {
    opacity: 0;
}
to {
    opacity: 1;
}
}
@keyframes fadeIn {
from {
    opacity: 0;
}
to {
    opacity: 1;
}
}
img[lazy=loaded] {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
img[lazy=loading] {
  /*width: 40px!important;*/
  margin: auto;
}
img[lazy=error] {
  border-radius: 2px;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
v-img img{
	width: 100%;
	height: 100%;
}
</style>