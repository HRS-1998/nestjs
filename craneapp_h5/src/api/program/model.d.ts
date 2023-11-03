declare namespace API{
    type ProgramAddParams={
        type:0;
        version:string;
        package_name:string;
        system_type:string;
        equipe_type:string;
        back_type:string;
        component_type:string;
        program_type:string;
        application_car:string;
        annotation:string;
        upload_user:string;
        upload_time:string;
        file:string;
    }

    type ProgramDeleteParams={
        type:1;
        id:string|number
    }
    type ProgramEditParams={
        type:2;
        id:stirng|number;
        annotation:string;
    }
    type ProgramUpdateParams={
        type:3;
        id:string|number;
        version:string;
        package_name:string;
        application_car:string;
        annotation:string;
        upload_user:string;
        upload_time:string;
        file:string;
    }

    type ProgramQueryParams={
        type:4;
        system_type?:string|null;
        equipe_type?:string|null;
        back_type?:string|null;
        component_type?:string|null;
        tonnage?:string;
        program_type?:string|null;
        application_car:string|null;
    }
    type ProgramHistoryQueryParams={
        type:5;
        id:string|number
    }
    type ProgramDownLoadParams={
        type:6;
        id:string|number
    }
    
   
}