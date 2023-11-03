declare namespace API{
     type AddLogger={
        type:0;
        operate_type:string;
        operate_time:string;
        operator:string;
        operate_info:string;
     }
     type QueryLoggerType={
        type:  1

     }
     type QueryLogger={
        type:2;
        operate_type:string;
        start_time:string;
        end_time:string
     }
     type DownLoadLogger={
        type:3;
        operate_type:string;
        start_time:string;
        end_time:string
     }
}