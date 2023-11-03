
<template>
  <!-- <transition :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'" mode="out-in" appear>
    <router-view :key="route.path"></router-view>
  </transition> -->
  <router-view v-slot="{ Component }">
    <!-- <transition :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'" mode="out-in" appear> -->
      <!-- <div class="title">{{ store.getBreadcrumbTitle }}</div> -->
      <keep-alive :exclude="['program,logger']">
      <component :is="Component" />
    </keep-alive>
    <!-- </transition> -->
  </router-view>
</template>
          
    

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usebreadcrumbTitle } from '@/store/modules/breadcrumbtabs';
const store = usebreadcrumbTitle()
</script>

<style scoped>
.title {
  height: 1.4em;
  font-size: 20px;
  font-weight: 500;
  color: #1D2129;
  line-height: 1.4;
  margin-bottom: 0.8em;

}
</style>