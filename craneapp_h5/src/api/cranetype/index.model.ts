declare namespace API{
    type CraneAdd={
        type:0;
        system_type:string;
        equipe_type:string;
        tonnage:string;
        car_type:string;
        area:string;
        annotation:string;
    }
    type CraneEdit={
        type:1;
        id:string|number;
        system_type:string;
        equipe_type:string;
        tonnage:string;
        car_type:string;
        area:string;
        annotation:string;

    }
    type CraneQueryAllType={
        type:2;
    }
    type CraneDelete={
        type:3;
        id:string|number

    }
    type CraneUpload={
        type:4;
        file:File

    }
    type CraneQuery={
        type:5;
        system_type:string;
        equipe_type:string;
        tonnage:string;
        car_type:string;
        area:string;

    }
    type CraneDownload={
        type:6;
        system_type:string;
        equipe_type:string;
        tonnage:string;
        car_type:string;
        area:string;
    }
}