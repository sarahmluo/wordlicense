import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private version: AppVersion
  ) { }

  /**
   * App version.
   */
  public appVersion: string;

  /**
   * On Init.
   */
  public ngOnInit(): void {
   // this.hydrateAppVersion(); 
  }

  /**
   * Hydrate app version.
   */
  private async hydrateAppVersion(): Promise<void> {
    this.appVersion = await this.version.getVersionNumber();
  }

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.navCtrl.navigateBack('/home');
  }
}
