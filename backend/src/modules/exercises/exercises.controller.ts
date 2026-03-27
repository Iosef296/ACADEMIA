import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { Difficulty } from './entities/exercise.entity';

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get()
  findAll(@Query('topicId') topicId?: string, @Query('difficulty') difficulty?: Difficulty) {
    return this.exercisesService.findAll({ topicId, difficulty });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Get(':id/generate')
  generate(@Param('id') id: string) {
    return this.exercisesService.generate(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  create(@Body() body: any, @Request() req) {
    return this.exercisesService.create(body, req.user);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.exercisesService.update(id, body, req.user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.exercisesService.remove(id, req.user);
  }

  // Steps
  @Get(':id/steps')
  getSteps(@Param('id') id: string) {
    return this.exercisesService.getSteps(id);
  }

  @Post(':id/steps')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  addStep(@Param('id') id: string, @Body() body: { content_latex: string; hint?: string; warning?: string; order: number }) {
    return this.exercisesService.addStep(id, body);
  }

  @Put(':id/steps/:stepId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  updateStep(@Param('stepId') stepId: string, @Body() body: any) {
    return this.exercisesService.updateStep(stepId, body);
  }

  @Delete(':id/steps/:stepId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  removeStep(@Param('stepId') stepId: string) {
    return this.exercisesService.removeStep(stepId);
  }

  @Put(':id/steps/reorder')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  reorderSteps(@Param('id') id: string, @Body() body: { order: { id: string; order: number }[] }) {
    return this.exercisesService.reorderSteps(id, body.order);
  }
}
