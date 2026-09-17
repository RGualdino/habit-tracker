import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async completeForUser(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    const today = new Date();

    return this.prisma.habitLog.upsert({
      where: {
        habitId_date: {
          habitId,
          date: today,
        },
      },
      create: {
        habitId,
        date: today,
      },
      update: {},
    });
  }

  async uncompleteForUser(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    const today = new Date();

    await this.prisma.habitLog.deleteMany({
      where: {
        habitId,
        date: today,
      },
    });

    return {
      completed: false,
    };
  }
}
