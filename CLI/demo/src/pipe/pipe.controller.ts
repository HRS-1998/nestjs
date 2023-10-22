import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  ParseFloatPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  ParseUUIDPipe,
  ParseEnumPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { PipeService } from './pipe.service';
import { CreatePipeDto } from './dto/create-pipe.dto';
import { UpdatePipeDto } from './dto/update-pipe.dto';
//管道转换
/**
  ValidationPipe,
  ParseIntPipe,
  ParseFloatPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  ParseUUIDPipe,
  ParseEnumPipe,
  DefaultValuePipe
 */

@Controller('pipe')
export class PipeController {
  constructor(private readonly pipeService: PipeService) {}

  @Post()
  create(@Body() createPipeDto: CreatePipeDto) {
    return this.pipeService.create(createPipeDto);
  }

  @Get()
  findAll() {
    return this.pipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(typeof id);
    return this.pipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipeDto: UpdatePipeDto) {
    return this.pipeService.update(+id, updatePipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipeService.remove(+id);
  }
}
