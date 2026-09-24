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

  async getHistoryForUser(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return this.prisma.habitLog.findMany({
      where: {
        habitId,
      },
      orderBy: {
        date: 'desc',
      },
      select: {
        date: true,
      },
    });
  }

  async getStreakForUser(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    const logs = await this.prisma.habitLog.findMany({
      where: {
        habitId,
      },
      orderBy: {
        date: 'desc',
      },
      select: {
        date: true,
      },
    });

    if (logs.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstLogDate = new Date(logs[0].date);
    firstLogDate.setHours(0, 0, 0, 0);

    let currentStreak = 0;

    if (firstLogDate.getTime() === today.getTime()) {
      currentStreak = 1;

      for (let i = 1; i < logs.length; i++) {
        const previousDate = new Date(logs[i - 1].date);
        const currentDate = new Date(logs[i].date);

        previousDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const differenceInDays =
          (previousDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24);

        if (differenceInDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    let longestStreak = 1;
    let streak = 1;

    for (let i = 1; i < logs.length; i++) {
      const previousDate = new Date(logs[i - 1].date);
      const currentDate = new Date(logs[i].date);

      previousDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      const differenceInDays =
        (previousDate.getTime() - currentDate.getTime()) /
        (1000 * 60 * 60 * 24);

      if (differenceInDays === 1) {
        streak++;
        longestStreak = Math.max(longestStreak, streak);
      } else {
        streak = 1;
      }
    }

    return {
      currentStreak,
      longestStreak,
    };
  }
}
