import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateuserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  create(@Body() userDto: CreateuserDto) {
    return this.userService.createUser(userDto);
  }
  @Get()
  getAll() {
    return this.userService.getAllusers();
  }
  @Get(':userId')
  getSingleUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.userService.getSingleUser(userId);
  }
  @Put('userId')
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: 
  )
}
