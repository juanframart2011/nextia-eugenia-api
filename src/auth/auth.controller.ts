import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ChangePassword } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RecoveryDto } from './dto/recovery.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,private usersService:UsersService) {}

  @Post('change-password')
  changePassword(@Body() changePassword: ChangePassword) {
    return this.authService.changePassword(changePassword);
  }

  @Get('logout')
  logout() {
    //return this.authService.login(loginDto);
  }

  @Post('recover')
  @UsePipes(new ValidationPipe({ transform: true }))
  recovery(@Body() recoveryDto: RecoveryDto) {
    return this.authService.recovery(recoveryDto.email);
  }
  

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  signup(@Body() recoveryDto: RecoveryDto) {
    return this.authService.recovery(recoveryDto.email);
  }

  @Post('token')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}
