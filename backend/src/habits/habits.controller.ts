import { Controller, Get, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';

@UseGuards(JwtGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.habitsService.findAllForUser(user.userId);
  }
}
