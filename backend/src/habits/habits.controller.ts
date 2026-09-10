import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';
import { CreateHabitDto } from './dto/create-habit.dto';

@UseGuards(JwtGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.habitsService.findAllForUser(user.userId);
  }

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createHabitDto: CreateHabitDto,
  ) {
    return this.habitsService.createForUser(user.userId, createHabitDto);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.habitsService.findOneForUser(user.userId, Number(id));
  }
}
