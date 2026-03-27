import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { DifficultyRating } from './entities/student-answer.entity';

@Controller('exams')
@UseGuards(JwtAuthGuard)
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @Get()
  findAll(@Query('topicId') topicId?: string) {
    return this.examsService.findAll(topicId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  create(@Body() body: any, @Request() req) {
    return this.examsService.create(body, req.user);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: any) {
    return this.examsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }

  @Post(':id/start')
  startAttempt(@Param('id') id: string, @Request() req) {
    return this.examsService.startAttempt(id, req.user);
  }

  @Get(':id/attempt/:attemptId')
  getAttempt(@Param('attemptId') attemptId: string) {
    return this.examsService.getAttempt(attemptId);
  }

  @Post(':id/attempt/:attemptId/answer')
  submitAnswer(
    @Param('attemptId') attemptId: string,
    @Body() body: {
      questionId: string;
      content_latex: string;
      hints_used?: number;
      difficulty_rating?: DifficultyRating;
      time_spent?: number;
    },
  ) {
    return this.examsService.submitAnswer(attemptId, body);
  }

  @Post(':id/attempt/:attemptId/ping')
  ping(@Param('attemptId') attemptId: string, @Body('left_screen') leftScreen: boolean) {
    return this.examsService.pingAttempt(attemptId, leftScreen);
  }

  @Post(':id/attempt/:attemptId/submit')
  submitAttempt(@Param('attemptId') attemptId: string) {
    return this.examsService.submitAttempt(attemptId);
  }

  @Get(':id/attempt/:attemptId/result')
  getResult(@Param('attemptId') attemptId: string) {
    return this.examsService.getResult(attemptId);
  }
}
