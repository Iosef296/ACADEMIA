import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamSessionComponent } from './exam-session/exam-session.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';

const routes: Routes = [
  { path: '', component: ExamListComponent },
  { path: ':id', component: ExamSessionComponent },
  { path: ':examId/results/:attemptId', component: ExamResultsComponent },
];

@NgModule({
  declarations: [ExamListComponent, ExamSessionComponent, ExamResultsComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class ExamModule {}
