import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepo: Repository<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return this.topicsRepo.find({
      where: { parent: IsNull() },
      relations: ['children', 'children.children'],
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Topic> {
    const topic = await this.topicsRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!topic) throw new NotFoundException('Tema no encontrado');
    return topic;
  }

  async create(data: {
    name: string;
    parentId?: string;
    order?: number;
    unlock_condition?: Record<string, any>;
  }): Promise<Topic> {
    const topic = this.topicsRepo.create({
      name: data.name,
      order: data.order ?? 0,
      unlock_condition: data.unlock_condition,
    });

    if (data.parentId) {
      const parent = await this.findOne(data.parentId);
      topic.parent = parent;
    }

    return this.topicsRepo.save(topic);
  }

  async update(id: string, data: {
    name?: string;
    order?: number;
    is_locked?: boolean;
    unlock_condition?: Record<string, any>;
  }): Promise<Topic> {
    const topic = await this.findOne(id);
    Object.assign(topic, data);
    return this.topicsRepo.save(topic);
  }

  async remove(id: string): Promise<void> {
    const topic = await this.findOne(id);
    await this.topicsRepo.remove(topic);
  }
}
