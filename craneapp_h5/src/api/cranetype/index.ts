import { request } from '@/utils/request'
import qs from 'qs'
function craneManage(data: API.CraneAdd|API.CraneDelete|API.CraneDownload|API.CraneEdit|API.CraneQuery|API.CraneQueryAllType|API.CraneUpload) {
    return request({
        url: '/miniProgram/programManage',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: qs.stringify({ data: JSON.stringify(data), type: '/car_management' }),
    })
}
export {
    craneManage
}