import { request } from "@/utils/request";
import qs  from 'qs'

function logManangement(data:API.AddLogger|API.QueryLogger|API.QueryLoggerType|API.DownLoadLogger){
    return request({
        url: '/miniProgram/programManage',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: qs.stringify({ data: JSON.stringify(data), type: '/log_management' }),
    }) 
}

export{
    logManangement
}