import { request } from '@/utils/request'
import qs from 'qs'
function userManage(data: API.UserAdd|API.UserEdit|API.UserDelete|API.UserReset|API.UserQuery) {
    return request({
        url: '/miniProgram/programManage',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: qs.stringify({ data: JSON.stringify(data), type: '/user_management' }),
    })
}
export {
    userManage
}