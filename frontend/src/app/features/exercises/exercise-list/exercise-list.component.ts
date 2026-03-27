import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

interface Exercise {
  id: number;
  title: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  is_parametric: boolean;
  needs_graph: boolean;
  topic: { id: number; name: string };
}

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  standalone: false,
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];
  loading = false;
  searchQuery = '';
  filterDifficulty = '';
  topicId: number | null = null;

  difficultyLabel: Record<string, string> = {
    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  difficultyColor: Record<string, string> = {
    basic: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.topicId = params['topicId'] ? Number(params['topicId']) : null;
      this.load();
    });
  }

  load(): void {
    const query = this.topicId ? `?topicId=${this.topicId}` : '';
    this.api.get<Exercise[]>(`exercises${query}`).subscribe({
      next: (data) => {
        this.exercises = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get filtered(): Exercise[] {
    return this.exercises.filter((e) => {
      const matchSearch =
        !this.searchQuery.trim() ||
        e.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        e.topic?.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchDifficulty =
        !this.filterDifficulty || e.difficulty === this.filterDifficulty;
      return matchSearch && matchDifficulty;
    });
  }
}
