import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { MoodService } from './mood.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MoodType } from './mood.entity';

@Controller('mood')
@UseGuards(JwtAuthGuard)
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Get('today')
  getToday(@Request() req) {
    return this.moodService.getToday(req.user.id);
  }

  @Post()
  register(@Request() req, @Body('mood') mood: MoodType) {
    return this.moodService.register(req.user.id, mood);
  }

  @Get('history')
  getHistory(@Request() req) {
    return this.moodService.getHistory(req.user.id);
  }
}
