import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from '../topics/entities/topic.entity';

export enum MicroLessonTrigger {
  NO_IDEA = 'no_idea',
  HIGH_ERRORS = 'high_errors',
  NEW_TOPIC = 'new_topic',
}

@Entity('micro_lessons')
export class MicroLesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content_latex: string;

  @Column({ type: 'enum', enum: MicroLessonTrigger })
  trigger: MicroLessonTrigger;
}
