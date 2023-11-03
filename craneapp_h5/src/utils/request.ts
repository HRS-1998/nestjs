import axios from 'axios';

import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { Storage } from '@/utils/Storage';
import {router} from '@/router/index'
export interface RequestOptions {
  /** 当前接口权限, 不需要鉴权的接口请忽略，  */
  permCode?: string;
  /** 是否直接获取data，而忽略message等 */
  isGetDataDirectly?: boolean;
  /** 请求成功是提示信息 */
  successMsg?: string;
  /** 请求失败是提示信息 */
  errorMsg?: string;
  /** 是否mock数据请求 */
  isMock?: boolean;
}
interface RequestOptionsDefine extends AxiosRequestConfig {
  contentType: string;
  [key: string]: any;
}
interface InternalAxiosRequestConfigDefine extends InternalAxiosRequestConfig {
  contentType: string;
  [key: string]: any;
}

 
// const routes: Array<RouteRecordRaw> = [
//     {
//         path: "/login",
//         name: "login",
//         component: login,
//     }
// ]
 
// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

// const router = useRouter();
// 是否生产环境
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_URL;
const protocol= window.location.protocol;
/** mock请求路径前缀 */
const baseMockUrl = import.meta.env.VITE_APP_MOCK_API;

const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 600000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfigDefine) => {

    const token = Storage.get('ACCESS_TOKEN');
    // const token='_Kd!v0V%-N^_#8*OHo5zz*'
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers['token'] = token;
    }
    //这一步没必要这样，直接使用axios暴露的类型就可以，在请求时使用headers:{'Content-Type':'xxx'}
    if (config.hasOwnProperty('contentType')) {
      config.headers['Content-Type'] = config.contentType;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    if (response.data.code === 501) {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_INFO');
      localStorage.removeItem('ROLE');
      router.replace({
        path: '/login',
        query: {
        },
      });
      return Promise.resolve(response)
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export type Response<T = any> = {
  code: number;
  message: string;
  data: T;
};

export type BaseResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 * @param contentType --request type
 */
export const request = async <T = any>(config: RequestOptionsDefine, options: RequestOptions = {}): Promise<T> => {
  try {
    // const fullUrl = `${(IS_PROD ?  baseApiUrl : baseMockUrl) + config.url}`;
    // protocol.indexOf('s') ? baseApiUrl=baseApiUrl.replace('https','http')
    const fullUrl = baseApiUrl + config.url;
    config.url = fullUrl;
    const res = await service.request(config);
    return Promise.resolve(res?.data ??res)
   
  } catch (error: any) {
    return Promise.reject(error);
  }
};
