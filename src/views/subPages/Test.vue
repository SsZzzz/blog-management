<template>
  <div id="test">
    <div class="dropdown">
      <button @click="show">test</button>
      <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <div class="dropdown-content" id="d">
        <div>1</div>
        <div>2</div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow:false
    };
  },
  methods: {
    show(){
      document.querySelector('#d').style.display='block'
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-content{
  display: none;
  height:100px;
  div{
    background-color: red;
  }
}
// .dropdown:hover .dropdown-content{
//  display:block;
// }
</style>


