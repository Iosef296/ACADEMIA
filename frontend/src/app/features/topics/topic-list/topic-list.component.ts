import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

interface Topic {
  id: number;
  name: string;
  description: string;
  order: number;
  is_locked: boolean;
  children?: Topic[];
}

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  standalone: false,
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];
  loading = false;
  searchQuery = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<Topic[]>('topics').subscribe({
      next: (data) => {
        this.topics = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get filtered(): Topic[] {
    if (!this.searchQuery.trim()) return this.topics;
    const q = this.searchQuery.toLowerCase();
    return this.topics.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
    );
  }
}
