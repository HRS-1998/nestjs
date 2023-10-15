import { Injectable } from '@nestjs/common';
//业务逻辑
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
