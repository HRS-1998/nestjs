<template>
  <ConfigProvider :locale="zhCN">
    <router-view>
    </router-view>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN'    
import {onMounted} from 'vue'
onMounted(() => {
   //这里加载登录信息
  
})

</script>

<style lang="less"></style>
