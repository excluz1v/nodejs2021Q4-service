import { ForbiddenException, Injectable } from '@nestjs/common';
import User from 'src/users/user.entity';
import { LoginUserDto } from './autu-user.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginUserDto) {
    const { login, password } = loginDto;
    const result = User.login(login, password);
    if (!result) throw new ForbiddenException();
    return result;
  }
}
