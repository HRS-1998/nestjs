<template>
  <div class="login">
    <div class="header">
      <img
        src="@/assets/images/logo.png"
        alt=""
        style="height: 22px; width: 88px; margin-left: 2px; margin-top: -2px"
      />
      三一装备程序版本在线管理系统
    </div>
    <div class="content">
      <div class="bg"></div>
      <div class="login_box">
        <div class="login_logo">
          <img src="@/assets/images/favicon.ico" style="width: 42px; height: 43px; margin-right: 1.11vw" />
          登录
        </div>
        <a-form>
          <a-input
            placeholder="请输入您的账号"
            v-model:value="state.formInline.account"
            @pressEnter="handleSubmit"
            autocomplete="username"
          ></a-input>
          <a-input
            type="password"
            placeholder="请输入您的密码"
            v-model:value="state.formInline.password"
            @pressEnter="handleSubmit"
            autocomplete="current-password"
          ></a-input>
          <div class="login_btn" @click="handleSubmit">登录</div>
          <a-checkbox v-model:checked="state.formInline.checked" class="flex flex-start mt-12">内部</a-checkbox>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import Storage from '@/utils/Storage';
import { login, getRsaPublicKey } from '@/api/login';
import { encrypt } from '@/utils/util';

const route = useRoute();
const router = useRouter();
const state = reactive({
  formInline: {
    account: '',
    password: '',
    checked: true,
  },
});
//登录
const handleSubmit = async () => {
  const { account, password, checked } = state.formInline;
  if (account.trim() == '' || password.trim() == '') {
    return message.warning('用户名或密码不能为空！', 0);
  }
  //type  1内部(域账号，CRM账号)，0外部（程序在线外部） 2外部（协议解析）
  message.loading('登录中...', 0);
  getRsaPublicKey({}).then((res) => {
    login({
      password: encrypt(password, res.data),
      username: account,
      type: checked ? 1 : 0,
    })
      .then((res) => {
        debugger;
        message.destroy();
        if (res.code !== 200 || res.data.code == 201) {
          Modal.error({
            title: () => '提示',
            content: () => (res.code == 200 ? res.data.message : res.message),
          });
        } else {
          message.success('登录成功！');
          //这里存储localStorge
          Storage.set('USER_INFO', { account: state.formInline.account, name: res.data.user_name });
          Storage.set('ACCESS_TOKEN', res.data.token);
          Storage.set('ROLE', res.data.role);
          if (res.data.role == '管理人员') {
            Storage.set('ROLETYPE', 0);
          } else if (res.data.role == '研发人员') {
            Storage.set('ROLETYPE', 1);
          } else if (res.data.role == '外部人员') {
            Storage.set('ROLETYPE', 3);
          } else {
            Storage.set('ROLETYPE', 2); //装配人员，服务工程师
          }
          // router.replace((route.query.redirect as string) ?? '/');
          router.replace({
            path: '/program',
            query: {},
          });
        }
      })
      .finally(() => {});
  });
};
</script>
<style lang="less" scoped>
.login {
  background-image: url(@/assets/images/bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  .header {
    background: #f5f7fa;
    height: 6.67vh;
    font-size: 20px;
    color: #1d2129;
    line-height: 6.67vh;
    padding: 0 16px;
    width: 100vw;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .content {
    display: flex;
    margin-top: 3.33vh;
    .bg {
      height: 78vh;
      width: 69.86vw;
      background: url(@/assets/images/bg.png) no-repeat;
      background-size: cover;
      //margin-left: -4.89vw;
    }

    .login_box {
      width: min(35.14vw, 451px);
      height: min(58.56vh, 455px);
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      box-shadow: 0 4px 16px 0 rgba(33, 37, 46, 0.12);
      opacity: 1;
      margin: auto 4.89vw;
      margin-left: -4.89vw;
      overflow: hidden;
      box-sizing: border-box;
      border: none;
      padding: 5.556vh 2.778vw 7.7889vh;

      .login_logo {
        height: min(2.889vh, 55px);
        font-size: 24px;
        font-family: HarmonyOS Sans SC-Medium, HarmonyOS Sans SC;
        font-weight: 500;
        color: #1d2129;
        line-height: min(3.111vh, 55px);
      }
    }
  }
}
.login_btn {
  cursor: pointer;
  margin-top: min(7.889vh, 30px);
  width: min(29.583vw, 100%);
  height: min(7.11vh, 54px);
  background: #2c73eb;
  border-radius: 6px 6px 6px 6px;
  opacity: 1;
  text-align: center;
  color: #fff;
  line-height: min(7.11vh, 54px);
  font-size: 16px;
  font-weight: 500;
}

.ant-input {
  margin-top: min(6.778vh, 30px);
  height: min(7.11vh, 55px);
  border-radius: 6px;
  background: #f7f8fa;
  padding-left: min(1.11vw, 12px);
  box-sizing: border-box;
  border: none;
}

.ant-input-focused,
.ant-input:focus {
  box-shadow: 0 0px 0px #ccc;
}
.ant-input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #f7f8fa inset !important;
}
</style>
