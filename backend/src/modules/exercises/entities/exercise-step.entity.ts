import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity('exercise_steps')
export class ExerciseStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.steps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column()
  order: number;

  @Column({ type: 'text' })
  content_latex: string;

  @Column({ type: 'text', nullable: true })
  hint: string;

  @Column({ type: 'text', nullable: true })
  warning: string;
}
