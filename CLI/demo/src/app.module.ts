import { Module } from '@nestjs/common';
//可以理解为路由
import { AppController } from './app.controller';
//服务
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  // providers: [AppService],
  providers: [
    {
      provide: 'ABC',
      useClass: AppService,
    },
  ],
})
export class AppModule {}
