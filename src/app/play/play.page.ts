import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LicensePlateComponent } from './license-plate/license-plate.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss']
})
export class PlayPage {
  constructor(
    private navCtrl: NavController
  ) { }

  /**
   * License plate component.
   */
  @ViewChild(LicensePlateComponent)
  public license: LicensePlateComponent;

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.license.stop().then(() => {
      this.navCtrl.navigateBack('/home');
    });
  }
}
