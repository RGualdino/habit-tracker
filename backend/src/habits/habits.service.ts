import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForUser(userId: number) {
    return this.prisma.habit.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
