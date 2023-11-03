import {request} from '@/utils/request'
import qs from 'qs'

//用户管理
function userInfo(data:API.UserInfoParams){
    return request({
        url: '/miniProgram/dataAnalysis',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: qs.stringify({ data: JSON.stringify(data), type: '/data_management_user_info' }),
      })

}


export {
    userInfo
}