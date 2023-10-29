import {
  Controller,
  Get,
  Inject,
  UseFilters,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './aaaException';
import { AaaGuard } from './aaa.guard';

@Controller()
export class AppController {
  private logger = new Logger();
  constructor(@Inject('ABC') private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  getHello(): string {
    this.logger.log(`aaa${new Date().getTime()}`, AppController.name);
    this.logger.error('bbb', AppController.name);
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
