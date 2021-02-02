<template>
  <div>

    <!-- vant导航栏 -->
    <van-nav-bar style="background-color: #3090EC;">
      <template #title>
        <span style="color: white;">登录</span>
      </template>
    </van-nav-bar>

    <!-- vant表单 -->
    <van-form>
      <van-field
          v-model="username"
          name="账号"
          label="账号"
          placeholder="账号名"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="password"
          :type="isPassword"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' },{pattern: /^\w{3,}$/,message:'密码不少于3位'}]"
      >
        <template #right-icon>
          <span @click="onPassword" style="font-size: 20px;" class="iconfont icon-view">
            <van-icon :name="isText?'closed-eye':'eye-o'" color="#ee0a24"/>
          </span>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button @click="onSubmit" round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  Form,
  Icon,
  Field,
  Button, Dialog,
} from 'vant';

export default {
  components: {
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      username: '',
      password: '',
      isPassword: 'password', //密码的type类型
      isText: true
    };
  },
  methods: {
    onSubmit() { //点击登录
      const params = {
        account: this.username,
        password: this.password
      };

      this.$chntek
          .login(params.account, params.password)
          .then(() => {
            localStorage.setItem('loginData', JSON.stringify(params));
            // 获取数据
            this.$router.push({
              path: '/home'
            })
          })
          .catch(e => {
            Dialog.alert({
              title: '登录失败',
              message: e,
            }).then(() => {
              // on close
            });
          });
    },
    onPassword() { //点击切换密码的type类型
      this.isText = !this.isText
      if (this.isText) {
        this.isPassword = 'password'
      } else {
        this.isPassword = 'text'
      }
    },
  }

};
</script>

<style>
</style>