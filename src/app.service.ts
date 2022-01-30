import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    id: number;
  } {
    return {
      id: 1,
    };
  }
}
