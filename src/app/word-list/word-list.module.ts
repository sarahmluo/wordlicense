import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DefPopoverComponent } from './def-popover/def-popover.component';
import { WordListPage } from './word-list.page';

const routes: Routes = [
  {
    path: '',
    component: WordListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WordListPage, DefPopoverComponent]
})
export class WordListPageModule {}
