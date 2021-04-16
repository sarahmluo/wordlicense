import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'play', loadChildren: () => import('./play/play.module').then( m => m.PlayPageModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule) },
  { path: 'instructions', loadChildren: () => import('./instructions/instructions.module').then( m => m.InstructionsPageModule) },
  { path: 'word-list', loadChildren: () => import('./word-list/word-list.module').then( m => m.WordListPageModule) },
  { path: 'score-history', loadChildren: () => import('./score-history/score-history.module').then( m => m.ScoreHistoryPageModule) },

  { path: 'home/play', loadChildren: () => import('./play/play.module').then( m => m.PlayPageModule) },
  { path: 'home/about', loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule) },
  { path: 'home/instructions', loadChildren: () => import('./instructions/instructions.module').then( m => m.InstructionsPageModule) },
  { path: 'home/word-list', loadChildren: () => import('./word-list/word-list.module').then( m => m.WordListPageModule) },
  { path: 'home/score-history', loadChildren: () => import('./score-history/score-history.module').then( m => m.ScoreHistoryPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
