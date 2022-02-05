import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FilesService {
  async createFile(file) {
    try {
      const filePath = path.resolve(
        __dirname,
        '..',
        'static',
        file.originalname,
      );
      const isExisst = fs
        .stat(filePath)
        .then((r) => true)
        .catch((err) => false);
      if (!isExisst) {
        await fs.appendFile(filePath, file);
      }
      console.log(path.resolve(__dirname, '..', 'static', file.originalname));
      return path.basename(filePath);
    } catch (error) {
      throw new HttpException(
        'ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
