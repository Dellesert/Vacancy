import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  
  async signIn(name: string, password: string):  Promise<{ access_token: string }>{
    const user = await this.usersService.findByLogin(name);
    console.log('user', user)
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username');
    }
    const payload = { id: user.id, username: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(name: string, userName: string, password: string): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findByLogin(name);
    if (existingUser) {
        throw new ConflictException('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({ name, userName, password: hashedPassword, isAdmin: false });


    return { access_token: 'your_access_token' };
} 
}
