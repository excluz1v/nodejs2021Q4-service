import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateuserDto, UpdateuserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateuserDto) {
    const result = await this.userService.createUser(userDto);
    return result;
  }

  @Get()
  async getAll() {
    const result = await this.userService.getAllusers();
    return result;
  }

  @Get(':userId')
  async getSingleUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const result = await this.userService.getSingleUser(userId);
    return result;
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateuserDto,
  ) {
    const result = await this.userService.update(userId, updateUserDto);
    return result;
  }

  @Delete(':userId')
  async del(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.userService.del(userId);
  }
}
