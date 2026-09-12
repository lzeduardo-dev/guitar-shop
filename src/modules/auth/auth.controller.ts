import { Controller, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDTO } from './dto/auth.dto.js';
import { LoginDTO } from './dto/register.dto.js';
import { Body, Post, HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }
}
