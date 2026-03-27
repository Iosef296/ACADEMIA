import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoodCheckin, MoodType } from './mood.entity';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(MoodCheckin) private moodRepo: Repository<MoodCheckin>,
  ) {}

  async getToday(userId: string): Promise<MoodCheckin | null> {
    const today = new Date().toISOString().split('T')[0];
    return this.moodRepo.findOne({ where: { user: { id: userId }, date: today } });
  }

  async register(userId: string, mood: MoodType): Promise<MoodCheckin> {
    const today = new Date().toISOString().split('T')[0];
    const existing = await this.getToday(userId);

    if (existing) {
      existing.mood = mood;
      return this.moodRepo.save(existing);
    }

    const checkin = this.moodRepo.create({ user: { id: userId }, mood, date: today });
    return this.moodRepo.save(checkin);
  }

  async getHistory(userId: string): Promise<MoodCheckin[]> {
    return this.moodRepo.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      take: 30,
    });
  }
}
