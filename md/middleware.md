<center><h4>中间件内容</h4></center>

####  生成方式
```js
nest g mi logger    //生成日志中间件
```
#### 使用方式
```js 
//  logger/logger.middleware.ts
import {Injectable,NestMiddleware} from '@nestjs/common'
import {Request,Response,NextFunction} from 'express'

@Injectable()
export class Logger implements NestMiddleware{
    use(req:Request,res:Response,next:nextFunction){
        console.log('执行了')
        //   res.send('拦截')
        next()
    }
}

//  user/user.module.ts
 export class UserModule implements NestModule{
    configure(consumer:MiddlewareConsumer){
        consumer.apply(Logger).forRoutes('user',method:RequestMethod.GET)   //注册并指定路由,其中method配置表示method:RequestMethod.GET，拦截GET请求
    }
 }
```