import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateuserDto, UpdateuserDto } from './create-user.dto';
import User from './user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  hashPassword(pass: string) {
    return bcrypt.hashSync(pass, 10);
  }

  async createUser(dto: CreateuserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: dto.login },
    });
    if (userExists) {
      return userExists;
    }
    const { name, login } = dto;
    let { password } = dto;
    password = this.hashPassword(password);
    const newUser = new User(name, login, password);
    await this.userRepository.save(newUser);
    return User.toResponse(newUser);
  }
  async getAllusers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getSingleUser(userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return User.toResponse(user);
  }

  async update(userId: string, updateUserDto: UpdateuserDto) {
    const user = await this.userRepository.findOne(userId);

    let { password } = updateUserDto;
    const { name, login } = updateUserDto;

    if (password) {
      password = this.hashPassword(password);
    }
    user.name = name || user.name;
    user.login = login || user.login;
    user.password = password || user.password;

    await this.userRepository.save(user);
    return User.toResponse(user);
  }

  async del(userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (user) {
      await this.userRepository.remove(user);
    } else throw new NotFoundException();
  }
}
