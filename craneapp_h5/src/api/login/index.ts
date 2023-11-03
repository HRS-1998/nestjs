import { request } from '@/utils/request';
import exp from 'constants';
import qs from 'qs'

/**
 * @description 登录
 * @param {API.LoginParams} data
 * @returns
 */
//登录
 function login(data: API.LoginParams) {
  return request(
    {
      url: '/login_program_version',
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      params: data,
    }
  );
}
// 公钥
function getRsaPublicKey(data) {
  return request({
    url: '/getRsaPublicKey',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    params: data,
  })
}

export{
  login,
  getRsaPublicKey,
}

