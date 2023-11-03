<template>
    <a-layout class="layout">
      <a-layout-header class="header">
          <Header></Header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider  style="background: #fff" width="220">
          <Sider></Sider>
        </a-layout-sider>
        <a-layout style="padding: 2.22vw;box-sizing:border-box">
          <Breadcrumb></Breadcrumb>
          <a-layout-content
            
          >
            <Content></Content>
            <!-- <router-view></router-view> -->
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
  import Header from '@/components/Layout/Header.vue';
  import Sider from '@/components/Layout/Sider.vue';
  import Breadcrumb from '@/components/Layout/Breadcrumb.vue';
  import Content from '@/components/Layout/Content.vue';
  </script>
  <style lang="less">
  .layout{
    width: 100vw;
    height: 100vh;
  }
  </style>
  