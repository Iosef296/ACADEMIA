import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

interface Step {
  id: number;
  order: number;
  content_latex: string;
  hint?: string;
  warning?: string;
  // runtime state
  revealed: boolean;
  hintShown: boolean;
  userAnswer: string;
  answered: boolean;
  correct: boolean | null;
}

interface Exercise {
  id: number;
  title: string;
  statement_latex: string;
  difficulty: string;
  is_parametric: boolean;
  needs_graph: boolean;
  topic: { id: number; name: string };
}

interface VariableValues {
  [key: string]: number;
}

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  standalone: false,
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {
  exerciseId!: number;
  exercise: Exercise | null = null;
  steps: Step[] = [];
  variableValues: VariableValues = {};
  resolvedStatement = '';

  loading = false;
  allDone = false;
  hintsUsed = 0;
  startTime = Date.now();

  // Difficulty rating
  showRating = false;
  ratingSubmitted = false;
  ratings = [
    { value: 'easy', label: 'Fácil', emoji: '😊' },
    { value: 'medium', label: 'Regular', emoji: '🤔' },
    { value: 'hard', label: 'Difícil', emoji: '😓' },
    { value: 'no_idea', label: 'Sin idea', emoji: '😵' },
  ];

  // Micro-lesson
  showMicroLesson = false;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.exerciseId = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  ngOnDestroy(): void {}

  load(): void {
    this.loading = true;
    Promise.all([
      this.api.get<Exercise>(`exercises/${this.exerciseId}`).toPromise(),
      this.api.get<any[]>(`exercises/${this.exerciseId}/steps`).toPromise(),
    ]).then(([exercise, rawSteps]) => {
      this.exercise = exercise ?? null;

      if (exercise?.is_parametric) {
        this.api
          .get<{ values: VariableValues; statement: string }>(
            `exercises/${this.exerciseId}/generate`
          )
          .subscribe((res) => {
            this.variableValues = res.values;
            this.resolvedStatement = res.statement;
          });
      } else {
        this.resolvedStatement = exercise?.statement_latex ?? '';
      }

      this.steps = (rawSteps ?? []).map((s) => ({
        ...s,
        revealed: false,
        hintShown: false,
        userAnswer: '',
        answered: false,
        correct: null,
      }));

      // Reveal first step automatically
      if (this.steps.length > 0) {
        this.steps[0].revealed = true;
      }

      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  get currentStepIndex(): number {
    return this.steps.findIndex((s) => s.revealed && !s.answered);
  }

  get currentStep(): Step | null {
    const idx = this.currentStepIndex;
    return idx >= 0 ? this.steps[idx] : null;
  }

  showHint(step: Step): void {
    step.hintShown = true;
    this.hintsUsed++;
  }

  confirmStep(step: Step): void {
    step.answered = true;
    step.correct = true; // student confirmed they understood

    const nextIdx = this.steps.indexOf(step) + 1;
    if (nextIdx < this.steps.length) {
      this.steps[nextIdx].revealed = true;
    } else {
      this.allDone = true;
      this.showRating = true;
    }
  }

  submitRating(rating: string): void {
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);

    this.api
      .post('exercises/rate', {
        exerciseId: this.exerciseId,
        rating,
        hintsUsed: this.hintsUsed,
        timeSpent,
      })
      .subscribe((res: any) => {
        this.ratingSubmitted = true;
        this.showRating = false;
        if (res?.triggerMicroLesson) {
          this.showMicroLesson = true;
        }
      });
  }

  restart(): void {
    this.allDone = false;
    this.showRating = false;
    this.ratingSubmitted = false;
    this.showMicroLesson = false;
    this.hintsUsed = 0;
    this.startTime = Date.now();
    this.load();
  }
}
