import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(dto: SignupDto) {
    const { firstName, email, password, image } = dto;

    const existing = await User.findOne({ where: { email } });
    if (existing) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName: '',
      email,
      password: hashed,
      image,
    });

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Signup successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        image: user.image,
      },
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      },
    };
  }
}
