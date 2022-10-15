import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload-single-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('There are no file', HttpStatus.BAD_REQUEST);
    }
    return `${process.env.DOMAIN}/${file.filename}`;
  }

  @Post('upload-multi-files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || !files.length) {
      throw new HttpException('There are no file', HttpStatus.BAD_REQUEST);
    }
    return files.map((item) => `${process.env.DOMAIN}/${item.filename}`);
  }
}
