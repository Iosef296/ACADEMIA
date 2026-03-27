import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Reward, RewardType } from './reward.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward) private rewardsRepo: Repository<Reward>,
  ) {}

  async findMine(userId: string): Promise<Reward[]> {
    return this.rewardsRepo.find({ where: { user: { id: userId } } });
  }

  async grant(userId: string, type: RewardType, value: Record<string, any>): Promise<Reward> {
    const reward = this.rewardsRepo.create({ user: { id: userId }, type, value });
    return this.rewardsRepo.save(reward);
  }

  async use(rewardId: string, userId: string): Promise<Reward> {
    const reward = await this.rewardsRepo.findOne({
      where: { id: rewardId, user: { id: userId }, used_at: IsNull() },
    });
    if (!reward) throw new NotFoundException('Recompensa no encontrada o ya usada');
    reward.used_at = new Date();
    return this.rewardsRepo.save(reward);
  }
}
