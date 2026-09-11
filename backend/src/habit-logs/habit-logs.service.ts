import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async createForUser(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return this.prisma.habitLog.create({
      data: {
        habitId,
      },
    });
  }
}
