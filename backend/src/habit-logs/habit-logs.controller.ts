import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';

@UseGuards(JwtGuard)
@Controller('habits/:habitId/logs')
export class HabitLogsController {
  constructor(private readonly habitLogsService: HabitLogsService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('habitId', ParseIntPipe) habitId: number,
  ) {
    return this.habitLogsService.createForUser(user.userId, habitId);
  }
}
