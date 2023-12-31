import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
// @Controller({
//   path:"user",
//   version:'1'
// })
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Get()
  // findAll(@Request() req) {
  //   console.log(req);
  //   return {
  //     code: 200,
  //     data: 'get请求成功！',
  //   };
  // }
  @Get()
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.name,
    };
  }
  @Post()
  create(@Body() body) {
    console.log(body);
    return {
      code: 200,
      message: body.name,
    };
  }

  @Get(':id')
  // @HttpCode(500) //控制状态码
  findId(@Param() params, @Headers() headers) {
    console.log(params, headers, '1');
    return {
      code: 200,
    };
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  // @Get()
  // findAll() {
  //   //多个查询
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
