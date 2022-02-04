import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './autu-user.dto';

@Controller('/login')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post()
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }
}
