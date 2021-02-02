<template>
  <div class="login">
    <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="login"
    >
      <div class="md-toolbar-section-start" v-if="$route.name!='detail'">
        <img src="../../assets/images/logo.png"/>
        <span class="md-title">启泰传感</span>
      </div>
      <a-tabs default-active-key="1"
              :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
      >
        <a-tab-pane key="1" tab="账号密码登陆">
          <a-form-item>
            <a-input placeholder="请输入账号" v-model="form.account">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
                placeholder="请输入密码"
                v-model="form.password"
                @enter="login"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
          <div>
            <a-button type="primary" block @click="login">登录</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机号登陆">
          <a-form-item>
            <!--            <a-input size="large" type="text" placeholder="请输入手机号"-->
            <!--                     v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '111'}], validateTrigger: 'change'}]">-->
            <!--              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
            <!--            </a-input>-->
            <a-input placeholder="请输入手机号" v-model="form.phone"
                     :rule="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'}], validateTrigger: 'change'}]">
              <a-icon type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <!--              <a-form-item>-->
              <!--                <a-input size="large" type="text" placeholder="输入验证码"-->
              <!--                         v-decorator="['captcha', {rules: [{ required: true, message: '22' }], validateTrigger: 'blur'}]">-->
              <!--                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
              <!--                </a-input>-->
              <!--              </a-form-item>-->
            </a-col>
            <a-col class="gutter-row" :span="8">
              <!--              <a-button-->
              <!--                  class="getCaptcha"-->
              <!--                  tabindex="-1"-->
              <!--                  :disabled="state.smsSendBtn"-->
              <!--                  @click.stop.prevent="getCaptcha"-->
              <!--                  v-text="!state.smsSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"-->
              <!--              ></a-button>-->
              <a-button type="primary" block @click="login">登录</a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<script>
import {Button, message} from 'ant-design-vue';

export default {
  data() {
    return {
      form: {
        phone: '',
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
}
</style>