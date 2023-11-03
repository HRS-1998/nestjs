declare namespace API{
  type UserAdd={
    type:0;
    user_id:number|string;
    user_name:string;
    password:string;
    role:string;
    telphone:string;
    mail:string;
    annotation:string
  }
  type UserEdit={
    type:1;
    id:string|number;
    user_id:number|string;
    user_name:string;
    role:string;
    telphone:string;
    mail:string;
    annotation:string


  }
  type UserReset={
    type:2;
    id:number|string;
    password:string;

  }
  type UserDelete={
    type:3;
    id:number|string

 
  }
  type UserQuery={
    type:4;
    user_id:number|string|undefined;
    role:string|undefined;

  }
}