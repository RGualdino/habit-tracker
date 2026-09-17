import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForUser(userId: number) {
    const today = new Date();

    const habits = await this.prisma.habit.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        logs: {
          where: {
            date: today,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return habits.map(({ logs, ...habit }) => ({
      ...habit,
      completedToday: Array.isArray(logs) ? logs.length > 0 : false,
    }));
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

  async findOneForUser(userId: number, habitId: number) {
    const today = new Date();

    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
      include: {
        logs: {
          where: {
            date: today,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    const { logs, ...habitData } = habit;

    return {
      ...habitData,
      completedToday: Array.isArray(logs) ? logs.length > 0 : false,
    };
  }

  async updateForUser(
    userId: number,
    habitId: number,
    updateHabitDto: UpdateHabitDto,
  ) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return this.prisma.habit.update({
      where: {
        id: habit.id,
      },
      data: updateHabitDto,
    });
  }

  async deleteForUser(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return this.prisma.habit.delete({
      where: {
        id: habit.id,
      },
    });
  }
}
