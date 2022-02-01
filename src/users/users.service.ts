import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { CreateuserDto, UpdateuserDto } from './create-user.dto';
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

  async getSingleUser(userId: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException();
    }
    return new UserEntity(user);
  }

  async update(userId: string, updateuserDto: UpdateuserDto) {
    const user = await this.getSingleUser(userId);
    let { password } = updateuserDto;
    const { name, login } = updateuserDto;

    if (password) {
      password = this.hashPassword(password);
    }
    let updatedUser = Object.assign(user, { password, name, login });
    updatedUser = await this.userRepository.save(updatedUser);

    return new UserEntity(updatedUser);
  }

  async del(userId: string) {
    const user = await this.getSingleUser(userId);
    if (user) {
      await this.userRepository.delete({
        id: userId,
      });
    }
  }
}
