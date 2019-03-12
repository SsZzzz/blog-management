<template>
  <div id="login">
    <div class="loginDiv">
      <p>blog management</p>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="fa fa-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="fa fa-lock"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm('loginForm')">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {}
    };
  },
  created() {
    for (let label in this.loginForm) {
      this.rules[label] = [
        { required: true, message: "该项为必填项", trigger: "blur" }
      ];
    }
  },
  methods: {
    submitLoginForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.login(this.loginForm).then(res => {
            const { code, message } = res.data;
            if (code === 1) {
              this.$router.push({ name: "first" });
            } else {
              this.$message.error(message);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  background: url(../assets/img/background.jpg) no-repeat;
  background-position: 50%;
  background-size: cover;
  height: 100vh;
  text-align: center;
  position: relative;
  .loginDiv {
    width: 20%;
    position: absolute;
    left: 13%;
    top: 50%;
    transform: translate(0, -60%);
    z-index: 1;
    p {
      font-size: 30px;
      font-weight: 500;
      padding: 0 20px;
    }
    .el-button {
      width: 100%;
    }
  }
  .footer {
    background: url(../assets/img/backgroundFooter.png) no-repeat;
    background-size: cover;
    width: 260px;
    height: 90px;
    position: absolute;
    bottom: 0px;
    left: 0;
  }
}
</style>