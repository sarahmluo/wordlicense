import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordTimerComponent } from './word-timer/word-timer.component';

@NgModule({
  declarations: [WordTimerComponent],
  imports: [
    CommonModule
  ],
  exports: [WordTimerComponent]
})
export class WordCommonModule { }
