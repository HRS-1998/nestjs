import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import type { WhiteNameList } from './constant';
import type { Router, RouteLocationNormalized } from 'vue-router';
import { Storage } from '@/utils/Storage';
import watermark from '@/utils/waterMaker'
import { useBaseType } from '@/store/modules/typeOptions';
import moment from 'moment';
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const store=useBaseType()
export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, _, next) => {
    debugger
    NProgress.start(); // start progress bar
  next()
  });

  /** 获取路由对应的组件名称 */
  const getComponentName = (route: RouteLocationNormalized) => {
    const comp = route.matched.at(-1)?.components?.default;
    return comp?.name ?? (comp as any)?.type?.name;
  };

  router.afterEach((to, from, failure) => {
   //系统内添加水印
      if (to.path =='/login') {
        // 登录页面去除水印
        watermark.out();
      }else{
        let userName=Storage.get("USER_INFO").account+'-'+moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        watermark.set(userName)
      }
    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }
    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.log(error, '路由错误');//这里进入404
  });
}
