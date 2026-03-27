import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningRoutine } from './routine.entity';
import { MicroLesson, MicroLessonTrigger } from './micro-lesson.entity';
import { StudentProgress } from '../progress/entities/student-progress.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(LearningRoutine) private routinesRepo: Repository<LearningRoutine>,
    @InjectRepository(MicroLesson) private microRepo: Repository<MicroLesson>,
  ) {}

  async getCurrent(userId: string): Promise<LearningRoutine | null> {
    const today = new Date().toISOString().split('T')[0];
    return this.routinesRepo
      .createQueryBuilder('r')
      .where('r.user_id = :userId', { userId })
      .andWhere('r.valid_until >= :today', { today })
      .orderBy('r.generated_at', 'DESC')
      .getOne();
  }

  async generate(userId: string, progress: StudentProgress[]): Promise<LearningRoutine> {
    // Ordena por mayor cantidad de errores y menor XP para priorizar temas débiles
    const sorted = [...progress].sort((a, b) => {
      const scoreA = a.error_count * 2 - a.xp;
      const scoreB = b.error_count * 2 - b.xp;
      return scoreB - scoreA;
    });

    const steps = sorted.slice(0, 5).map((p, i) => ({
      order: i + 1,
      topic_id: p.topic.id,
      topic_name: p.topic.name,
      suggested_exercises: 5,
      focus: p.error_count > 3 ? 'reforzar' : p.xp < 50 ? 'iniciar' : 'avanzar',
    }));

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    const routine = this.routinesRepo.create({
      user: { id: userId },
      valid_until: validUntil.toISOString().split('T')[0],
      content: { steps },
    });

    return this.routinesRepo.save(routine);
  }

  async getMicroLesson(topicId: string, trigger: MicroLessonTrigger): Promise<MicroLesson | null> {
    return this.microRepo.findOne({ where: { topic: { id: topicId }, trigger } });
  }
}
