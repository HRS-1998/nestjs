import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  //post文件上传
  @Post('album')
  @UseInterceptors(FileInterceptor('file')) //处理文件
  upload(@UploadedFile() file) {
    console.log(file, 'file');
    return {
      code: 200,
      message: '文件测试成功！',
    };
  }
  //文件下载 download
  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1697945923305.png');
    res.download(url);
  }

  //流方式
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1697945923305.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=cy`);
    tarStream.pipe(res);
  }
}
