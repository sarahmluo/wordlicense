import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';

import { UserScore } from './types';

@Component({
  selector: 'app-score-history',
  templateUrl: './score-history.page.html',
  styleUrls: ['./score-history.page.scss'],
})
export class ScoreHistoryPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private sqlite: WlSqliteService
  ) { }

  /**
   * Collection of user scores.
   */
  public userScores: UserScore[];

  /**
   * On Init.
   */
  public ngOnInit(): void {
    this.hydrateScores();
  }

  /**
   * Navigate Back to home screen.
   */
  public goBack(): void {
    this.navCtrl.navigateBack('/home');
  }

  /**
   * Hydrate scores.
   */
  private hydrateScores(): Promise<void> {
    return this.sqlite.executeSQL({
      procName: 'Score__Read',
    }).then((res: UserScore[]) => {
      this.userScores = res;
    });
  }
}
