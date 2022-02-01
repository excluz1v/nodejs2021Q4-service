import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateuserDto } from './create-user.dto';
import { User, UserEntity } from './user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: Repository<User>) { }

  hashPassword(pass: string) {
    return bcrypt.hasnSync(pass, 10);
  }
  async createUser(dto: CreateuserDto) {
    const { name, login } = dto;
    const password = this.hashPassword(dto.password);
    const user = await this.userRepository.save({ name, login, password });
    return new UserEntity(user);
  }
  async getAllusers() {
    const users = await this.userRepository.find();
    return users.map((user) => new UserEntity(user));
  }
}
