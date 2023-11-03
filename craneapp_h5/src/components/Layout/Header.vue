<template>
  <div class="flex space-between">
    <div>
      <img src="@/assets/images/logo.png" alt="" style="height:22px;width:88px;margin-left:2px;margin-top:-2px" />
      三一装备程序版本在线管理系统
    </div>
    <div class="user_logout"  >
      <div class="user_info">
      <span class="fz-18">{{account }}</span>
      <span class="ml-16 " @click="doLogout">
        <LogoutOutlined /> 退出
      </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal ,type MenuTheme,message } from 'ant-design-vue';
import { nextTick ,createVNode} from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import Storage from "@/utils/Storage"
let router=useRouter(),route=useRoute()
const account=Storage.get('USER_INFO').name
const doLogout=()=>{
  Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: createVNode(ExclamationCircleOutlined),
      centered: true,
      onOk: async () => {
        // keepAliveStore.clear();
        // 移除标签页
        localStorage.clear();
        message.success('成功退出登录');
        await nextTick();
        router.replace({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        });
        // location.reload()
      },
    });
}


</script>

<style scoped lang="less">
.user_logout {
height: 6.67vh;
font-size: 16px;
font-family: HarmonyOS Sans SC-Regular, HarmonyOS Sans SC;
font-weight: 400;
color: #4E5969;
line-height: 6.67vh;
position: relative;
margin-right: 24px;
cursor: pointer;
.user_info{
  display: flex;
  justify-content: space-between;
  width:fit-content;
  line-height: 6.67vh;  
  .user{
    color:black;
    font-weight: 600;
  }
.triggle{
  border: 9px solid transparent;
  border-top: 9px  solid black;
  width: 0;
  height: 0;
  margin-top: calc(3.33vh - 4.5px);
}

}

}
</style>