import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { log } from "console"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "110729qq",
    database: "practice",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    connectorPackage:'mysql2',
    extra:{
        authPlugin:'sha256_password'
    }
})
AppDataSource.initialize().then(async ()=>{
    await AppDataSource.manager.save(User,[
          {firstName: 'ccc', lastName: 'ccc', age: 21},
    ])
   let target= await AppDataSource.manager.find(User)
   console.log('====================================');
   console.log(target);
   console.log('====================================');

}).catch(err=>{
    console.log(err)
})
