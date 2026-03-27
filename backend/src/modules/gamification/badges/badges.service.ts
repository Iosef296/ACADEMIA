import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge, BadgeConditionType } from './badge.entity';
import { UserBadge } from './user-badge.entity';
import { StudentProgress } from '../../progress/entities/student-progress.entity';
import { StudentProfile } from '../../users/entities/student-profile.entity';

@Injectable()
export class BadgesService {
  constructor(
    @InjectRepository(Badge) private badgesRepo: Repository<Badge>,
    @InjectRepository(UserBadge) private userBadgesRepo: Repository<UserBadge>,
  ) {}

  async findAll(): Promise<Badge[]> {
    return this.badgesRepo.find();
  }

  async findMine(userId: string): Promise<UserBadge[]> {
    return this.userBadgesRepo.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
  }

  async evaluate(userId: string, progress: StudentProgress[], profile: StudentProfile): Promise<UserBadge[]> {
    const allBadges = await this.findAll();
    const earned = await this.findMine(userId);
    const earnedIds = new Set(earned.map((ub) => ub.badge.id));
    const newBadges: UserBadge[] = [];

    for (const badge of allBadges) {
      if (earnedIds.has(badge.id)) continue;

      const unlocked = this.checkCondition(badge, progress, profile);
      if (unlocked) {
        const userBadge = this.userBadgesRepo.create({
          user: { id: userId },
          badge,
        });
        newBadges.push(await this.userBadgesRepo.save(userBadge));
      }
    }

    return newBadges;
  }

  private checkCondition(badge: Badge, progress: StudentProgress[], profile: StudentProfile): boolean {
    const { condition_type, condition_value } = badge;
    const totalSolved = progress.reduce((s, p) => s + p.exercises_solved, 0);

    switch (condition_type) {
      case BadgeConditionType.EXERCISES_COUNT:
        return totalSolved >= condition_value.count;

      case BadgeConditionType.STREAK:
        return profile.streak_current >= condition_value.days;

      case BadgeConditionType.TOPIC_LEVEL:
        return progress.some((p) => p.level >= condition_value.level);

      case BadgeConditionType.TIME_SPENT:
        const totalTime = progress.reduce((s, p) => s + p.time_spent, 0);
        return totalTime >= condition_value.seconds;

      case BadgeConditionType.NO_ERRORS:
        const totalErrors = progress.reduce((s, p) => s + p.error_count, 0);
        return totalSolved >= condition_value.min_exercises && totalErrors === 0;

      default:
        return false;
    }
  }
}
