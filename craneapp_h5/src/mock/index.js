import Mock from 'mockjs'
import qs from 'qs'
//登录

Mock.mock('http://127.0.0.1:5173/hzzbPic/programManage/mock_api/login_test','post',()=>{
    return {
        code:200,
        message:'请求成功！',
        data:{
            token:'adfalfaflajf'
        }
    }
})
//----程序管理----
//获取基本信息
Mock.mock('http://127.0.0.1:5173/hzzbPic/programManage/mock_api/getDefineOptions','post',(options)=>{
  let option= qs.parse(options.body)
  let defineTypes={
    systemType:['二代','二代半','三代'],
    devieceType:['大吨位','小吨位-A系列','小吨位-TB系列','小吨位-HD系列'],
    copyType:['常规备份','单台备份'],
    partType:['显示屏','力限器','控制器KF1','控制器KF2','控制器KF3','控制器KF7','下车控制器'],
    programType:['手柄液控','手柄电控'],
    userType:['管理员','研发人员','装配人员','服务工程师'],
} 
let data={}
for(let k of Object.keys(option)){
    if(option[k]==1){
        data[k]=defineTypes[k]
    }
}
    return {
        code:200,
        message:'请求成功！',
        option:data,
        data:data
    }
})
//查询
Mock.mock('http://127.0.0.1:5173/hzzbPic/programManage/mock_api/programQuery','post',(options)=>{
//       {
//     id: 1,
//     index: 1,
//     version: '1.0.0',
//     packageName: '大吨位xxxxx',
//     systemName: '二代',
//     deviceType: 'sss',
//     copyType: 'xxx',
//     partType: 'part',
//     programType: 'da',
//     supportCrane: 'mmmmmmmmmmmmmmmmmmmmmmmmm藏舒伦多夫拉法基阿里发i发',
//     remarks: 'xxxxxxxxx',
//     uploadTime: '2023.08.06-15:22:22',
//     uploadPerson: '张三',
//   },
let data=Mock.mock({"data|1000": [
    {
      "id|+1": 1, //生成id，自增1
      "index|+1":1,
      "version|3":/\d{0,5}\./,
      "packageName": '@cword(3, 5)', //生成姓名(这里生成的是中文名称)
      "shopImg": "@Image('100*40','#c33','#ffffff','商品')", //生成随机图片(大小/背景色/字体颜色/文字信息),打印的是图片地址
      "shopVolume|30-1000": 30, //随机生成30至1000的数字(价格)
      "shopAddress": "@county(true)", //随机生成地址
      "shopDate": "@date('yyyy-MM-dd')", //随机生成yyyy-MM-dd格式的日期
      "shopPhone": /^1(5|3|7|8)[0-9]{9}$/, //随机生成电话号码
      "shopStart|1-5": "★", //随机生成1至5个指定的图形(★)
    },
  ]})
    return {
        code:200,
        message:'请求成功！',
        data:data
    }
})