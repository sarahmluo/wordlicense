import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { WlAlertComponent } from './alert/alert/alert.component';
import { WlProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [ WlAlertComponent, WlProgressComponent ],
  imports: [ CommonModule, IonicModule ],
  exports: [ WlAlertComponent , WlProgressComponent ],
  providers: []
})
export class WlCoreModule {}
