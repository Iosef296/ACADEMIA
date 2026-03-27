import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { Exam } from './entities/exam.entity';
import { ExamAttempt } from './entities/exam-attempt.entity';
import { ExamQuestion } from './entities/exam-question.entity';
import { StudentAnswer } from './entities/student-answer.entity';
import { AdaptiveService } from './adaptive/adaptive.service';
import { ParametricService } from '../exercises/parametric/parametric.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, ExamAttempt, ExamQuestion, StudentAnswer])],
  providers: [ExamsService, AdaptiveService, ParametricService],
  controllers: [ExamsController],
  exports: [ExamsService],
})
export class ExamsModule {}
