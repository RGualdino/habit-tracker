import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Prisma } from '../generated/prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email is already registered');
      }

      throw error;
    }
  }

  async login(logindto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: logindto.email,
      },
    });

    if (!user) {
      throw new ConflictException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(
      logindto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
