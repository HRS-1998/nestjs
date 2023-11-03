import { logManangement } from '@/api/logger';
import Storage from './Storage';
import moment from 'moment';
function logger(type: string, operate_module: string, info: any) {
    let detailiinfo=getOperateDetail(type,operate_module,info)
  let data;
  data = {
    type: 0,
    operate_type: type,
    operate_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    operate_module: operate_module,
    operator: Storage.get('USER_INFO').name + '_' + Storage.get('USER_INFO').account,
    operate_info: detailiinfo,
  };
 
  let res = logManangement(data);
  return res;
}
/**
 * 程序管理模块
//  新增：info={version:data.version,package:data.package_name,supportCrane:data.application_car}
//  编辑：info={beforeAnnotation,annotation:data.annotation,version, package:packageName,}
//  更新： info={pre:{...preinfo},cur:{...currentinfo}}
 * 用户管理模块


 * 车型管理模块
 */
//修改： info = {  preinfo: [],  curinfo: [],};
function getOperateDetail(type: string, operate_module: string,info:any) {
    let detailinfo=''
  if (operate_module == '程序管理') {
    switch (type) {
      case '新增':
        detailinfo= `新增程序：包名称${info.package},版本号${info.version},适用车型${info.supportCrane}` 
        break;
      case '编辑':
        detailinfo= `编辑：包名称${info.package},版本号${info.version}————备注由 ${info.beforeAnnotation} 更改为 ${info.annotation}` 
        break;
      case '更新':
        detailinfo= `原始信息：包名称${info.pre.files}，版本号：${info.pre.version},适用车型：${info.pre.supportCrane},备注：${info.pre.remarks}  更新信息：
        包名称${info.cur.updateFiles}，版本号：${info.cur.version},适用车型：${info.cur.supportCrane},备注：${info.cur.remarks}`  
        break;
      case '删除':
        for(let i=0;i<info.systemType.length;i++){
           detailinfo+=`删除程序：系统类型${info.systemType[i]}，部件类型${info.partType[i]}，适用车型${info.supportCrane[i]}；`
        }
        break;
      case '导出':
        detailinfo=info
        break;
      case '程序下载':
        detailinfo=`程序下载：包名${info.package},版本${info.version},系统类型${info.system},部件${info.partType},适用车型${info.supportCrane}`
        break;
    }
  } else if (operate_module == '用户管理') {
    switch (type) {
      case '新增':
        detailinfo=`新增用户：账号：${info.account},名称${info.name}`
        break;
      case '密码重置':
        detailinfo=`重置用户密码：账号：${info.account},名称${info.name}`
        break;
      case '删除':
        detailinfo=`删除用户：账号：${info.account},名称${info.name}`
        break;
      case "修改":
        detailinfo=`修改用户${info.account}的${info.desc.join('、')}信息：`
        for(let i=0;i<info.desc.length;i++){
          detailinfo+=`${info.preinfo[i]}修改为${info.curinfo[i]};`
        }
    }
  } else if (operate_module == '车型管理') {
    switch (type) {
      case '新增':
        detailinfo=`新增车型：设备类型${info.deviceType}，吨位${info.tonnage}，车型${info.carType}`
        break;
      case '修改':
        detailinfo=`修改车型${info.craneType}的${info.desc.join('、')}信息：`
        for(let i=0;i<info.desc.length;i++){
          detailinfo+=`${info.preinfo[i]}修改为${info.curinfo[i]};`
        }
        break;
      case '删除':
        detailinfo=`删除车型：系统类型${info.systemType},设备类型${info.deviceType},车型：${info.craneType}`
        break;
      case '导入':
        detailinfo=`导入车型：${info.join('、')}`
        break;
      case '导出':
        detailinfo=info
        break;
    }
  } else {
  }
  console.log(detailinfo)
  return detailinfo
}

export { logger };
