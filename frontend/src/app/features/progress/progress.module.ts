import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgressOverviewComponent } from './progress-overview/progress-overview.component';
import { BadgesComponent } from './badges/badges.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  { path: '', component: ProgressOverviewComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'ranking', component: RankingComponent },
];

@NgModule({
  declarations: [ProgressOverviewComponent, BadgesComponent, RankingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProgressModule {}
