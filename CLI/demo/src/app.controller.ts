import { Controller, Get, Inject, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './aaaException';
import { AaaGuard } from './aaa.guard';

@Controller()
export class AppController {
  constructor(@Inject('ABC') private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
