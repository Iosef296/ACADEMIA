import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LiveSession } from './live.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LiveService {
  constructor(
    @InjectRepository(LiveSession) private sessionsRepo: Repository<LiveSession>,
    private config: ConfigService,
  ) {}

  async findActive(): Promise<LiveSession[]> {
    return this.sessionsRepo.find({
      where: { is_active: true },
      relations: ['host', 'topic'],
      order: { started_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<LiveSession> {
    const session = await this.sessionsRepo.findOne({
      where: { id },
      relations: ['host', 'topic'],
    });
    if (!session) throw new NotFoundException('Sesión no encontrada');
    return session;
  }

  async create(data: { title: string; topicId: string }, host: User): Promise<LiveSession> {
    // Jitsi genera la sala con un nombre único basado en el id de la sesión
    // La URL apunta al servidor Jitsi self-hosted configurado en .env
    const roomName = `academia-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const jitsiBase = this.config.get<string>('JITSI_URL') ?? 'https://meet.jit.si';
    const room_url = `${jitsiBase}/${roomName}`;

    const session = this.sessionsRepo.create({
      title: data.title,
      host,
      topic: { id: data.topicId },
      room_url,
    });

    return this.sessionsRepo.save(session);
  }

  async end(id: string): Promise<LiveSession> {
    const session = await this.findOne(id);
    session.is_active = false;
    session.ended_at = new Date();
    return this.sessionsRepo.save(session);
  }
}
