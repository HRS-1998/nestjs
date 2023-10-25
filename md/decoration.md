##### <center> NestJs装饰器</center>
- @Module 声明模块
```js
@Module({
    imports:[],
    controllers:[AppController],
    providers:{AppService}
})
export class AppModule{}

```
- @Controller 声明controller
```js
@Controller()
export class AppController{
    constructor(private readonly  appService: AppService){}
}

```
- @Injectable 声明provider
```js
@Injectable()
export class AppService{
    getHello():string{
        retrun 'Hello World'
    }
}

```
- @Optional声明
   -- 如果注入依赖没有的话，创建对象时会报错，但如果它是可选，可以用@Optional声明，
   这样没有对应的provider也能正常创建这个对象

![](../images/@Optional.png)

- @Global 全局声明

- @Catch(HttpException)  //异常处理
```js
@Catch(HttpException)
export class AaaFilter implements ExceptionFilter{
    catch(exception:HttpException,host:ArgumentsHost){
        const response:Response=host.switchToHttp().getResponse();
        response.status(exception.getStatus().json({
            msg:exception.message
        }))
    }
}
//使用
@Get
@UseFilters(AaaFilter)
getHello():string{
    throw new HttpException('xx',HttpStatus.BAD_REQUEST);
    return this.appService.getHello()
}
```

- @Query  获取？后的参数
- @Param  获取路径参数
- @Body   获取@Post的body部分
- @SetMetadata()  指定metadata  @SetMetadata('role',['root'])
- @Headers 获取某个请求头或全部请求头数据  @Headers('Accept') / @Headers()
- @Ip      获取ip
- @Session 获取session对象
- @HostParam 获取域名部分的参数
- @Req||@Request  request对象
- @Res ||@Response response对象
  ##### <font color='red'>注入@Res,@Next不会返回响应，可以使用res.end()来手动触发，或者通过passthrough告诉Nest</font>
  ```
  //会返回ddd
  @Get('ddd')
  ddd(@Res({passthrough:true}) res:Response){
    return 'ddd'
  }
  //不会返回
  @Get('ddd')
  ddd(@Res() res:Response){
    return 'ddd'
  }
  //会返回ddd
  @Get('ddd')
  ddd(@Res({passthrough:true}) res:Response){
    res.end('ddd') 
  }
  //不会返回
  @Get('ddd')
  ddd(@Next() next:NextFunction){
    next()
    return 'ddd'
  }

  ```
  - @Redirect 重定向url
  - @Render