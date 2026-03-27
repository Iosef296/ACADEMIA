import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './entities/exercise.entity';
import { ExerciseStep } from './entities/exercise-step.entity';
import { ExerciseVariable } from './entities/exercise-variable.entity';
import { ParametricService } from './parametric/parametric.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseStep, ExerciseVariable])],
  providers: [ExercisesService, ParametricService],
  controllers: [ExercisesController],
  exports: [ExercisesService],
})
export class ExercisesModule {}
