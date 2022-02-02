import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateuserDto, UpdateuserDto } from './create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  hashPassword(pass: string) {
    return bcrypt.hashSync(pass, 10);
  }

  async createUser(dto: CreateuserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: dto.login },
    });
    if (userExists) {
      return User.toResponse(userExists);
    }
    const user = this.userRepository.create(dto);
    await this.userRepository.save(user);
    return User.toResponse(user);
  }
  async getAllusers() {
    const users = await this.userRepository.find();
    const result = users.map((user) => User.toResponse(user));
    return result;
  }

  async getSingleUser(userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  async update(userId: string, updateUserDto: UpdateuserDto) {
    const user = await this.getSingleUser(userId);
    console.log(user);
    if (user) {
      let { password } = updateUserDto;
      const { name, login } = updateUserDto;

      if (password) {
        password = this.hashPassword(password);
      }
      let updatedUser = Object.assign(user, { password, name, login });
      updatedUser = await this.userRepository.save(updatedUser);
      return User.toResponse(updatedUser);
    }
    throw new NotFoundException();
  }

  async del(userId: string) {
    const user = await this.getSingleUser(userId);
    if (user) {
      await this.userRepository.delete(userId);
    } else throw new NotFoundException();
  }
}
