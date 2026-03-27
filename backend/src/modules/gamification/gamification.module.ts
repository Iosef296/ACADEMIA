import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './badges/badge.entity';
import { UserBadge } from './badges/user-badge.entity';
import { WeeklyChallenge } from './challenges/weekly-challenge.entity';
import { WeeklyChallengeAttempt } from './challenges/weekly-challenge-attempt.entity';
import { Reward } from './rewards/reward.entity';
import { Ranking } from './ranking.entity';
import { BadgesService } from './badges/badges.service';
import { ChallengesService } from './challenges/challenges.service';
import { RewardsService } from './rewards/rewards.service';
import { GamificationController } from './gamification.controller';
import { StudentProfile } from '../users/entities/student-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, UserBadge, WeeklyChallenge, WeeklyChallengeAttempt, Reward, Ranking, StudentProfile]),
  ],
  providers: [BadgesService, ChallengesService, RewardsService],
  controllers: [GamificationController],
  exports: [BadgesService, RewardsService],
})
export class GamificationModule {}
