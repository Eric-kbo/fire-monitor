<template>
  <div class="bg">
    <!-- vant表单 -->
    <van-form>
      <van-row>
      </van-row>
      <van-row style="margin-top: 15vh">
        <div style="text-align: center">
          <img src="../assets/images/logo.png"/>
        </div>
      </van-row>
      <van-row>
        <div style="text-align: center">
          <van-divider>启泰传感</van-divider>
        </div>
      </van-row>
      <van-row>

      </van-row>
      <van-row>
        <div style="margin: 4px 16px 4px 16px;">
          <van-field
              style="border-radius: 25px;"
              v-model="username"
              name="账号"
              placeholder="账号名"
              :rules="[{ required: true, message: '请填写账号' }]"
          />
        </div>
      </van-row>
      <van-row>
        <div style="margin: 4px 16px 4px 16px;">
          <van-field
              style="border-radius: 25px;"
              v-model="password"
              :type="isPassword"
              name="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' },{pattern: /^\w{3,}$/,message:'密码不少于3位'}]"
          >
            <template #right-icon>
          <span @click="onPassword" style="font-size: 20px;" class="iconfont icon-view">
            <van-icon :name="isText?'closed-eye':'eye-o'" color="#ee0a24"/>
          </span>
            </template>
          </van-field>
        </div>
      </van-row>
      <van-row>
        <div style="margin: 16px;">
          <van-button @click="onSubmit" round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-row>
    </van-form>
  </div>
</template>

<script>
import {
  Form,
  Icon,
  Field,
  Button, Dialog, Row, Col, Cell, Divider,
} from 'vant';

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
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
.bg {
  height: 100vh;
  background-color: white;
  background-image: url("../assets/images/bg02.jpg");
  background-size: 100vw 100vh;
}

.form {
  /*line-height: 10vh;*/
  margin-top: 15vh;
}
</style>