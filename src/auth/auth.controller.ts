import { Controller, Get, Post, Body, ValidationPipe, UsePipes, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ChangePassword } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RecoveryDto } from './dto/recovery.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,private usersService:UsersService) {}

  @Post('change-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  changePassword(@Body() changePassword: ChangePassword) {
    return this.authService.changePassword(changePassword);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout( @Request() req ){
    
    const user = req.user;
    // Aquí asumimos que `req.user` contiene el payload del JWT, incluido el `sub` (subject)
    await this.authService.logout(user.sub);
    return { message: 'Has cerrado sesión exitosamente.' };
  }

  @Post('recover')
  @UsePipes(new ValidationPipe({ transform: true }))
  recovery(@Body() recoveryDto: RecoveryDto) {
    return this.authService.recovery(recoveryDto.email);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  signup(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
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