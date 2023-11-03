import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { setupAntd } from './utils/antd';
import { setupRouter } from './router';
import * as Icons from '@ant-design/icons-vue'
import { nextTick } from '@vue/runtime-core';
// import './mock/index.js'

//引入antdv
const app=createApp(App);
setupAntd(app);
setupRouter(app);
app.use(store);
// // 配置全局对象
// app.config.globalProperties.$icons = Icons
// // Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
// for (const key in Icons) { app.component(key, Icons[key]) }
app.mount('#app');

// 必须使用 nextTick，不然会有加载顺序问题，导致绑定失败
nextTick(() => {
// Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
for (const key in Icons) { app.component(key, Icons[key]) }
  })
