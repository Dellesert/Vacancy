import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { SetMetadata } from '@nestjs/common';
import { Public } from './public';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const { name, password } = signInDto;
    return this.authService.signIn(name, password);
  }
  
  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const { name, userName, password } = createUserDto;
    const accessToken = await this.authService.signUp(name, userName, password);
    return accessToken;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
