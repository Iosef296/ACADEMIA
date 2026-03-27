import { Injectable } from '@nestjs/common';
import { ExamQuestion } from '../entities/exam-question.entity';
import { StudentAnswer, DifficultyRating } from '../entities/student-answer.entity';
import { Difficulty } from '../../exercises/entities/exercise.entity';

@Injectable()
export class AdaptiveService {
  // Ajusta la dificultad del siguiente ejercicio según el rendimiento actual
  getNextDifficulty(answers: StudentAnswer[]): Difficulty {
    if (answers.length === 0) return Difficulty.BASIC;

    const last3 = answers.slice(-3);
    const correctCount = last3.filter((a) => a.is_correct).length;
    const hasNoIdea = last3.some((a) => a.difficulty_rating === DifficultyRating.NO_IDEA);

    if (hasNoIdea || correctCount === 0) return Difficulty.BASIC;
    if (correctCount === 3) return Difficulty.ADVANCED;
    return Difficulty.INTERMEDIATE;
  }

  // Calcula el score final de un intento
  calculateScore(questions: ExamQuestion[], answers: StudentAnswer[]): number {
    if (questions.length === 0) return 0;

    const correct = answers.filter((a) => a.is_correct).length;
    const base = (correct / questions.length) * 20; // escala 0-20

    // Penalización por pistas usadas
    const hintPenalty = answers.reduce((sum, a) => sum + a.hints_used * 0.1, 0);

    return Math.max(0, parseFloat((base - hintPenalty).toFixed(2)));
  }

  // Determina si activar microlección según la calificación del estudiante
  shouldTriggerMicroLesson(rating: DifficultyRating): boolean {
    return rating === DifficultyRating.NO_IDEA;
  }
}
