import { Controller, Get, Post, Param, Query, UseGuards, Request } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { ProgressService } from '../progress/progress.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MicroLessonTrigger } from './micro-lesson.entity';

@Controller()
@UseGuards(JwtAuthGuard)
export class RoutinesController {
  constructor(
    private routinesService: RoutinesService,
    private progressService: ProgressService,
  ) {}

  @Get('routines/current')
  getCurrent(@Request() req) {
    return this.routinesService.getCurrent(req.user.id);
  }

  @Post('routines/generate')
  async generate(@Request() req) {
    const progress = await this.progressService.getAll(req.user.id);
    return this.routinesService.generate(req.user.id, progress);
  }

  @Get('micro-lessons/:topicId')
  getMicroLesson(
    @Param('topicId') topicId: string,
    @Query('trigger') trigger: MicroLessonTrigger,
  ) {
    return this.routinesService.getMicroLesson(topicId, trigger ?? MicroLessonTrigger.NO_IDEA);
  }
}
