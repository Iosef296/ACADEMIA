import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { WeeklyChallenge } from './weekly-challenge.entity';
import { WeeklyChallengeAttempt } from './weekly-challenge-attempt.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(WeeklyChallenge) private challengesRepo: Repository<WeeklyChallenge>,
    @InjectRepository(WeeklyChallengeAttempt) private attemptsRepo: Repository<WeeklyChallengeAttempt>,
  ) {}

  async findActive(): Promise<WeeklyChallenge[]> {
    const today = new Date();
    return this.challengesRepo.find({
      where: {
        start_date: LessThanOrEqual(today),
        end_date: MoreThanOrEqual(today),
      },
      relations: ['topic'],
    });
  }

  async findOne(id: string): Promise<WeeklyChallenge> {
    const challenge = await this.challengesRepo.findOne({ where: { id }, relations: ['topic'] });
    if (!challenge) throw new NotFoundException('Desafío no encontrado');
    return challenge;
  }

  async submit(challengeId: string, userId: string, score: number): Promise<WeeklyChallengeAttempt> {
    const challenge = await this.findOne(challengeId);
    const attempt = this.attemptsRepo.create({
      challenge,
      user: { id: userId },
      score,
    });
    return this.attemptsRepo.save(attempt);
  }

  async create(data: {
    topicId: string;
    description: string;
    exercise_ids: string[];
    start_date: Date;
    end_date: Date;
    reward_xp?: number;
  }): Promise<WeeklyChallenge> {
    const challenge = this.challengesRepo.create({
      topic: { id: data.topicId },
      description: data.description,
      exercise_ids: data.exercise_ids,
      start_date: data.start_date,
      end_date: data.end_date,
      reward_xp: data.reward_xp ?? 50,
    });
    return this.challengesRepo.save(challenge);
  }
}
