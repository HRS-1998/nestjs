import 'nprogress/nprogress.css'; // 进度条样式
import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouterGuards } from './router-guards';
import { whiteNameList } from './constant';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
   redirect:'/projectList'
  },
  {
    path: '/projectList',
    name: 'projectList',
    component: () => import('@/views/projectList.vue'),
    meta: {
      title: '项目列表',
    },
    children: [
      {
        path: '/projectDetail',
        name: 'projectDetail',
        component: () => import('@/views/projectDetail.vue'),
        meta: {
          title: '项目详情',
        },
        children:[
          { 
          path: '/projectCharts',
          name: 'projectCharts',
          component: () => import('@/views/projectCharts.vue'),
          meta: {
            title: '数据看板',
          },

          },
          {
            path: '/projectRealTime',
            name: 'projectRealTime',
            component: () => import('@/views/projectRealTime.vue'),
            meta: {
              title: '实时视图',
            },

          },
          {
            path: '/projectAlarm',
            name: 'projectAlarm',
            component: () => import('@/views/projectAlarm.vue'),
            meta: {
              title: '预警统计',
            },
          }
        ]
      }
    ],
  },
];

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export async function setupRouter(app: App) {
  // 创建路由守卫
  createRouterGuards(router, whiteNameList);

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}
export default router;
