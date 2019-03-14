<template>
  <div>
    <el-container id="container">
      <el-aside width="auto">
        <el-scrollbar>
          <el-menu
            router
            default-active="/first"
            :collapse="isCollapse"
            class="el-menu-vertical"
            background-color="#495060"
            text-color="#fff"
            active-text-color="#409EFF"
          >
            <el-menu-item index="/first">
              <i class="fa fa-th"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/blog">
              <i class="fa fa-pencil-square-o"></i>
              <span slot="title">博客</span>
            </el-menu-item>
            <!-- <el-menu-item index="/test">
              <i class="fa fa-globe"></i>
              <span slot="title">测试</span>
            </el-menu-item> -->
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header>
          <i :class="rotateIcon" aria-hidden="true" @click="isCollapse=!isCollapse"></i>
          <span id="title">Mendia's blog background management system</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="avator">
                <img src="../assets/img/user.png">
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="exit">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    exit() {
      // sessionStorage.clear();
      this.$router.replace("/login");
    }
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", "fa fa-bars", this.isCollapse ? "rotate-icon" : ""];
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
}
.el-aside {
  background-color: #495060;
}
.el-menu {
  border-right: 0;
  height: 100vh;
  i {
    font-size: 18px;
    margin-right: 15px;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.el-header {
  box-shadow: 0 0 20px rgba(100, 100, 100, 0.3);
  line-height: 60px;
  color: #303133;
  .el-dropdown {
    float: right;
    height: 60px;
    p {
      text-align: center;
    }
    .avator {
      width: 40px;
      height: 40px;
      margin: 10px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .menu-icon {
    transition: all 0.3s;
    cursor: pointer;
    font-size: 18px;
    margin-right: 18px;
  }
  .rotate-icon {
    transform: rotate(90deg);
  }
  #title {
    font-size: 22px;
  }
}
.el-main {
  background-color: rgba(250, 250, 250, 0.3);
  flex-basis: 0%;
}
</style>