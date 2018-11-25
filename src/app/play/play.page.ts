import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  constructor(
    private navCtrl: NavController
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {
  }

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.navCtrl.navigateBack('/home');
  }
}
