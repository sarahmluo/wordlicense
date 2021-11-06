import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WlAlertComponent } from "./alert/alert/alert.component";

@NgModule({
  imports: [ CommonModule ],
  exports: [ WlAlertComponent ],
  declarations: [ WlAlertComponent ],
  providers: []
})
export class WlCoreModule {}
