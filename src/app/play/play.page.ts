import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LicensePlateComponent } from './license-plate/license-plate.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss']
})
export class PlayPage implements OnInit {
  constructor(
    private navCtrl: NavController
  ) { }

  /**
   * License plate component.
   */
  @ViewChild(LicensePlateComponent)
  public license: LicensePlateComponent;

  /**
   * On Init.
   */
  public ngOnInit(): void {
  }

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    // clear and timers and request to save score
    this.license.stop();
    this.navCtrl.navigateBack('/home');
  }
}
