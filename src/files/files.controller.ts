import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('file')
export class FilesController {
  constructor(private fileService: FilesService) { }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return this.fileService.createFile(file);
  }
}
