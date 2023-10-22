<center><h4>@Module内容</h4></center>

##### 单模块导出
```js
@Module(){
  exports:[UserService]   //模块导出共享
}
```

 ##### 全局共享模块
```js
/** 新建config/config.module.ts*/
@Global()
@Module({
    providers:[
        {
            provide:"Config"，
            useValue:{baseUrl:"/api"}
        }
    ],
    exports:[
          {
            provide:"Config"，
            useValue:{baseUrl:"/api"}
        }
    ]

})
export class ConfigModule{
}
```

##### 动态模块

```js
interface Options{
    path:string
}
@Global()
@Module({})
export class ConfigModule{
     static forRoot (options:Options):DynamicModule{
        return {
            module:ConfigModule,
            providers:[
        {
            provide:"Config"，
            useValue:{baseUrl:"/api" +options.path}
        }
    ],
    exports:[
          {
            provide:"Config"，
            useValue:{baseUrl:"/api"}
        }
    ]

        }

     }
}
```
