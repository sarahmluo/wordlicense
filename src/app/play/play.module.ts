import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WordCommonModule } from '../word-common/word-common.module';
import { LicensePlateComponent } from './license-plate/license-plate.component';
import { SubmitWordModalComponent } from './license-plate/submit-word-modal/submit-word-modal.component';
import { PlayPage } from './play.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    WordCommonModule
  ],
  declarations: [PlayPage, LicensePlateComponent, SubmitWordModalComponent]
})
export class PlayPageModule {}
