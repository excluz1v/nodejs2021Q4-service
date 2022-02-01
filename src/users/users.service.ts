import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateuserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) { }
  async createUser(dto: CreateuserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
  async getAllusers() {
    const users = await this.userRepository.find();
    return users;
  }
}
