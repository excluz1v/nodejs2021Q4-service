import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async createFile(file) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, file.originalname), file.buffer);
      return file.originalname;
    } catch (error) {
      console.log(error);
      // throw new HttpException(
      //   'ошибка при записи файла',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }
}
