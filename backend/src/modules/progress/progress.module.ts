import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { StudentProgress } from './entities/student-progress.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentProgress, StudentProfile])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [ProgressService],
})
export class ProgressModule {}
