import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';

import { DictionaryService } from '../core/dictionary/dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private dictionary: DictionaryService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private sqlite: WlSqliteService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

 public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.dictionary.loadDictionary();
      this.dictionary.loadLetterList();
      this.dictionary.loadWordList();

      this.sqlite.openDatabase({
          name: 'UserScores',
          location: 'default'
        });
      })
      .then(() => {
        // create score table
        return this.sqlite.executeSQL({
          procName: 'Score__Table'
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
