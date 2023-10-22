import { Module } from '@nestjs/common';
//可以理解为路由
import { AppController } from './app.controller';
//服务
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { PipeModule } from './pipe/pipe.module';

@Module({
  imports: [UserModule, UploadModule, PipeModule],
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
