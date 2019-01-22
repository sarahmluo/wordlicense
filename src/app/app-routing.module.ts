import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'play', loadChildren: './play/play.module#PlayPageModule' },
  { path: 'instructions', loadChildren: './instructions/instructions.module#InstructionsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'word-list', loadChildren: './word-list/word-list.module#WordListPageModule' },
  { path: 'score-history', loadChildren: './score-history/score-history.module#ScoreHistoryPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
