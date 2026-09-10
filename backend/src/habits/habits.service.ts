import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';

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

  async createForUser(userId: number, createHabitDto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        title: createHabitDto.title,
        description: createHabitDto.description,
        userId,
      },
    });
  }
}
