import { request } from '@/utils/request';
import qs from 'qs';
//获取 下拉框各类型
function getTypes(data) {
  return request({
    url: '/miniProgram/programManage',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: qs.stringify({ data: JSON.stringify(data), type: '/param_search' }),
  });
}
//程序管理统一接口
function programManage(data: API.ProgramAddParams|API.ProgramDeleteParams|API.ProgramEditParams|API.ProgramQueryParams|API.ProgramHistoryQueryParams|API.ProgramUpdateParams|API.ProgramDownLoadParams) {
  return request({
    url: '/miniProgram/programManage',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: qs.stringify({ data: JSON.stringify(data), type: '/program_management' }),
  });
}
//文件上传
function fileUpload(data){
    return  request({
        url: '/miniProgram/uploadFile',
        method: 'post',
        contentType: 'multipart/form-data;boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq',
        data: data,
    })
}

export { getTypes, programManage,fileUpload };
