import {
  Controller,
  Delete,
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
@Controller('habits/:habitId/complete')
export class HabitLogsController {
  constructor(private readonly habitLogsService: HabitLogsService) {}

  @Post()
  complete(
    @CurrentUser() user: AuthenticatedUser,
    @Param('habitId', ParseIntPipe) habitId: number,
  ) {
    return this.habitLogsService.completeForUser(user.userId, habitId);
  }

  @Delete()
  uncomplete(
    @CurrentUser() user: AuthenticatedUser,
    @Param('habitId', ParseIntPipe) habitId: number,
  ) {
    return this.habitLogsService.uncompleteForUser(user.userId, habitId);
  }
}
