import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentProgress } from './entities/student-progress.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';

const XP_PER_LEVEL = 100;

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(StudentProgress)
    private progressRepo: Repository<StudentProgress>,
    @InjectRepository(StudentProfile)
    private profilesRepo: Repository<StudentProfile>,
  ) {}

  async getAll(userId: string): Promise<any[]> {
    const records = await this.progressRepo.find({
      where: { user: { id: userId } },
      relations: ['topic'],
    });
    return records.map((r) => ({
      topic_name: r.topic?.name ?? '',
      xp: r.xp,
      level: r.level,
      exercises_solved: r.exercises_solved,
      error_count: r.error_count,
    }));
  }

  async getByTopic(userId: string, topicId: string): Promise<StudentProgress | null> {
    return this.progressRepo.findOne({
      where: { user: { id: userId }, topic: { id: topicId } },
      relations: ['topic'],
    });
  }

  async getErrors(userId: string): Promise<{ topic: any; error_count: number }[]> {
    const all = await this.getAll(userId);
    return all
      .filter((p) => p.error_count > 0)
      .sort((a, b) => b.error_count - a.error_count)
      .map((p) => ({ topic: p.topic, error_count: p.error_count }));
  }

  async recordExercise(userId: string, topicId: string, data: {
    isCorrect: boolean;
    timeSpent: number;
  }): Promise<StudentProgress> {
    let progress = await this.getByTopic(userId, topicId);

    if (!progress) {
      progress = this.progressRepo.create({
        user: { id: userId },
        topic: { id: topicId },
      });
    }

    progress.exercises_solved += 1;
    progress.time_spent += data.timeSpent;

    if (data.isCorrect) {
      progress.xp += 10;
    } else {
      progress.error_count += 1;
      progress.xp += 2;
    }

    progress.level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;

    await this.progressRepo.save(progress);
    await this.updateStreak(userId);

    return progress;
  }

  async updateStreak(userId: string): Promise<void> {
    const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } } });
    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActive = profile.streak_last_active
      ? new Date(profile.streak_last_active).toISOString().split('T')[0]
      : null;

    if (lastActive === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastActive === yesterday) {
      profile.streak_current += 1;
    } else {
      profile.streak_current = 1;
    }

    if (profile.streak_current > profile.streak_max) {
      profile.streak_max = profile.streak_current;
    }

    profile.streak_last_active = new Date();
    await this.profilesRepo.save(profile);
  }

  async getStreak(userId: string): Promise<{ current: number; max: number; last_active: Date | null }> {
    const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } } });
    return {
      current: profile?.streak_current ?? 0,
      max: profile?.streak_max ?? 0,
      last_active: profile?.streak_last_active ?? null,
    };
  }
}
