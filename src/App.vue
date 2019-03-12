<template>
  <div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>
