import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise.entity';

export enum VariableType {
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  LIST = 'list',
}

@Entity('exercise_variables')
export class ExerciseVariable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.variables, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: VariableType })
  type: VariableType;

  @Column({ type: 'decimal', nullable: true })
  min: number;

  @Column({ type: 'decimal', nullable: true })
  max: number;

  @Column({ type: 'jsonb', nullable: true })
  allowed_values: any[];

  @Column({ type: 'jsonb', nullable: true })
  conditions: Record<string, any>;
}
