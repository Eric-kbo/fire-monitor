<template>
  <div class="login">
    <form class="login-form">
      <md-field md-inline>
        <label>账号</label>
        <md-input type="text" v-model="form.account"></md-input>
      </md-field>
      <md-field md-inline>
        <label>密码</label>
        <md-input type="password" v-model="form.password" @enter="login"></md-input>
      </md-field>
      <div class="submit-box">
        <md-button class="submit-button" @click="login">Submit</md-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: '',
        password: ''
      }
    };
  },
  created() {
    this.getLocalData();
  },
  methods: {
    getLocalData() {
      let result = JSON.parse(localStorage.getItem('loginData'));
      if (result) {
        this.form = result;
        this.login();
      }
    },
    login() {
      let params = {
        account: this.form.account,
        password: this.form.password,
      };
      this.$chntek.login(params.account, params.password).then(res => {
        localStorage.setItem('loginData', JSON.stringify(params));
        this.goto('home');
      });
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-form {
    min-width: 200px;
    .md-input {
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
    }
  }
  .submit-box {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #ccc;
    padding: 0;
    .md-button {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }
}
</style>