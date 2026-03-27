import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MathEditorComponent } from '../math-editor/math-editor.component';
import { StepDraft } from '../step-editor/step-editor.component';
import { GraphConfig } from '../graph-editor/graph-editor.component';

interface Topic {
  id: number;
  name: string;
}

interface VariableDraft {
  name: string;
  type: 'integer' | 'decimal' | 'list';
  min: number;
  max: number;
  allowedValues: string;
  conditions: string;
}

@Component({
  selector: 'app-exercise-editor',
  templateUrl: './exercise-editor.component.html',
  standalone: false,
})
export class ExerciseEditorComponent implements OnInit {
  @ViewChild('statementEditor') statementEditor!: MathEditorComponent;

  exerciseId: number | null = null;
  isEdit = false;

  // Form data
  title = '';
  statementLatex = '';
  difficulty = 'basic';
  topicId: number | null = null;
  isParametric = false;
  needsGraph = false;

  steps: StepDraft[] = [];
  variables: VariableDraft[] = [];
  graphConfig: GraphConfig | null = null;

  topics: Topic[] = [];
  loading = false;
  saving = false;
  error = '';
  success = '';

  // Tab
  activeTab = 'content';

  variableTypes: { value: string; label: string }[] = [
    { value: 'integer', label: 'Entero' },
    { value: 'decimal', label: 'Decimal' },
    { value: 'list', label: 'Lista de valores' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.api.get<Topic[]>('topics').subscribe((t) => (this.topics = t));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.exerciseId = Number(id);
      this.isEdit = true;
      this.loadExercise();
    }
  }

  loadExercise(): void {
    this.loading = true;
    this.api.get<any>(`exercises/${this.exerciseId}`).subscribe((ex) => {
      this.title = ex.title;
      this.statementLatex = ex.statement_latex;
      this.difficulty = ex.difficulty;
      this.topicId = ex.topic?.id ?? null;
      this.isParametric = ex.is_parametric;
      this.needsGraph = ex.needs_graph;
      this.loading = false;
    });
    this.api.get<any[]>(`exercises/${this.exerciseId}/steps`).subscribe((steps) => {
      this.steps = steps.map((s) => ({
        order: s.order,
        content_latex: s.content_latex,
        hint: s.hint ?? '',
        warning: s.warning ?? '',
      }));
    });
  }

  onStatementChange(latex: string): void {
    this.statementLatex = latex;
    // Auto-detect graph need
    const lower = latex.toLowerCase();
    if (/f\(x\)|y\s*=|graficar|sen\(|cos\(|tan\(/.test(lower)) {
      this.needsGraph = true;
    }
  }

  addVariable(): void {
    this.variables.push({
      name: `a${this.variables.length + 1}`,
      type: 'integer',
      min: 1,
      max: 10,
      allowedValues: '',
      conditions: '',
    });
  }

  removeVariable(i: number): void {
    this.variables.splice(i, 1);
  }

  onGraphConfig(config: GraphConfig): void {
    this.graphConfig = config;
  }

  save(): void {
    if (!this.title.trim() || !this.topicId) {
      this.error = 'El título y el tema son obligatorios.';
      return;
    }
    this.error = '';
    this.saving = true;

    const payload = {
      title: this.title,
      statement_latex: this.statementLatex,
      difficulty: this.difficulty,
      topicId: this.topicId,
      is_parametric: this.isParametric,
      needs_graph: this.needsGraph,
    };

    const req$ = this.isEdit
      ? this.api.put(`exercises/${this.exerciseId}`, payload)
      : this.api.post('exercises', payload);

    req$.subscribe({
      next: (res: any) => {
        const id = this.exerciseId ?? res.id;

        // Save steps
        if (this.steps.length > 0) {
          this.api.post(`exercises/${id}/steps/bulk`, { steps: this.steps }).subscribe();
        }

        // Save graph config if needed
        if (this.needsGraph && this.graphConfig) {
          this.api.post(`graphs`, { exerciseId: id, config: this.graphConfig }).subscribe();
        }

        this.saving = false;
        this.success = this.isEdit ? 'Ejercicio actualizado.' : 'Ejercicio creado.';
        setTimeout(() => this.router.navigate(['/exercises', id]), 1200);
      },
      error: () => {
        this.saving = false;
        this.error = 'Error al guardar. Intenta de nuevo.';
      },
    });
  }
}
