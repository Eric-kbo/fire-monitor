<template>
  <div class="login">
    <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="login"
    >
      <md-field md-inline>
        <a-input placeholder="请输入账号" v-model="form.account"/>
      </md-field>
      <md-field md-inline>
        <a-input-password
            placeholder="请输入密码"
            v-model="form.password"
            @enter="login"
        />
      </md-field>
      <div>
        <a-button type="primary" block @click="login">登录</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import {Button, message} from 'ant-design-vue';

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
        password: this.form.password
      };

      this.$chntek
          .login(params.account, params.password)
          .then(res => {
            localStorage.setItem('loginData', JSON.stringify(params));
            this.goto('home');
          })
          .catch(e => alert(e));
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({name});
    }
  }
};
</script>

<style lang='scss' scoped>
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
}
</style>