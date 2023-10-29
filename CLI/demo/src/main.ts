import { NestFactory } from '@nestjs/core';
console.log('ss');
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false, //不d打开logger
  });
  //开启版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  console.log(session);
  // app.use(
  //   session({
  //     secret: '签名',
  //     name: 'cookie名字',
  //     rolling: true,
  //     cookie: { httpOnly: true, maxAge: 999999 },
  //   }),
  // );
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/cy', //配置访问前缀  http://localhost:3000/cy/1697945317382.png
  });
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
  await app.listen(3000);
}
bootstrap();
