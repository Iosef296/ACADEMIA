import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get()
  getAll(@Request() req) {
    return this.progressService.getAll(req.user.id);
  }

  @Get('errors')
  getErrors(@Request() req) {
    return this.progressService.getErrors(req.user.id);
  }

  @Get('streak')
  getStreak(@Request() req) {
    return this.progressService.getStreak(req.user.id);
  }

  @Get('topics/:topicId')
  getByTopic(@Request() req, @Param('topicId') topicId: string) {
    return this.progressService.getByTopic(req.user.id, topicId);
  }
}
