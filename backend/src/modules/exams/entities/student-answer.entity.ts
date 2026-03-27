import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ExamAttempt } from './exam-attempt.entity';
import { ExamQuestion } from './exam-question.entity';

export enum DifficultyRating {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  NO_IDEA = 'no_idea',
}

@Entity('student_answers')
export class StudentAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ExamAttempt, (attempt) => attempt.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attempt_id' })
  attempt: ExamAttempt;

  @ManyToOne(() => ExamQuestion)
  @JoinColumn({ name: 'question_id' })
  question: ExamQuestion;

  @Column({ type: 'text', nullable: true })
  content_latex: string;

  @Column({ nullable: true })
  is_correct: boolean;

  @Column({ default: 0 })
  hints_used: number;

  @Column({ type: 'enum', enum: DifficultyRating, nullable: true })
  difficulty_rating: DifficultyRating;

  @Column({ default: 0 })
  time_spent: number;
}
