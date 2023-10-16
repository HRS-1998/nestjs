import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}
bootstrap();
