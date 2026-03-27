import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { LearningRoutine } from './routine.entity';
import { MicroLesson } from './micro-lesson.entity';
import { ProgressModule } from '../progress/progress.module';

@Module({
  imports: [TypeOrmModule.forFeature([LearningRoutine, MicroLesson]), ProgressModule],
  providers: [RoutinesService],
  controllers: [RoutinesController],
})
export class RoutinesModule {}
