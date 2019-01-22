import { Component, OnInit } from '@angular/core';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';

import { UserScore } from './types';

@Component({
  selector: 'app-score-history',
  templateUrl: './score-history.page.html',
  styleUrls: ['./score-history.page.scss'],
})
export class ScoreHistoryPage implements OnInit {
  constructor(
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
   * Hydrate scores.
   */
  private hydrateScores(): Promise<void> {
    return this.sqlite.executeSQL({
      procName: 'Score__Read_All',
    }).then(res => {
      this.userScores = res;
    });
  }

}
