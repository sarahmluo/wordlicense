import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

import { WlApiService } from '../core/api/api.service';
import { LicensePlateComponent } from './license-plate/license-plate.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss']
})
export class PlayPage {
  constructor(
    private api: WlApiService,
    private navCtrl: NavController
  ) { }

  /**
   * License plate component.
   */
  @ViewChild(LicensePlateComponent)
  public license: LicensePlateComponent;

  public showSubmit: boolean = false;

  public showThanks: boolean = false;

  public wordInput: string;

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.license.stop().then(() => {
      this.navCtrl.navigateBack('/home');
    });
  }

  /**
   * Sets the show submit flag when the
   * event is emitted from license plate
   * component.
   *
   * @param event
   */
  public onShowSubmit(event: string): void {
    this.showSubmit = true;
    this.wordInput = event;
  }

  /**
   * Triggered when the user clicks "yes"
   * to submit the word to the dictionary.
   */
  public onSubmitYes(): void {
    this.api.post('submitnew', this.wordInput).subscribe();
    this.showSubmit = false;
    this.showThanks = true;
  }

  /**
   * Triggered when the user clicks "no"
   * to not submit the word to the dictionary.
   */
  public onSubmitNo(): void {
    this.showSubmit = false;
    this.license.wordInput = '';
    this.license.timer.runTimer();
  }

  /**
   * Triggered when the user closes the
   * thank you message.
   */
  public onCloseThanks(): void {
    this.showThanks = false;
    this.license.wordInput = '';
    this.license.timer.runTimer();
  }
}
