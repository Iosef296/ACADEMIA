import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { MoodCheckin } from './mood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoodCheckin])],
  providers: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}
