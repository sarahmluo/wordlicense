import { Component, enableProdMode } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { ApiService } from './core/api/api.service';
import { DictionaryService } from './core/dictionary/dictionary.service';
import { WlSqliteService } from './core/sqlite/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private api: ApiService,
    private dictionary: DictionaryService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private sqlite: WlSqliteService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

 public initializeApp(): void {

  let initialInstall: boolean = false;

  if (environment.production) {
    enableProdMode();
    this.api.baseUrl = `https://safeview-mobile.wentinc.com/${this.api.baseUrl}`;
  } else {
    this.api.baseUrl = `https://192.168.31.185:44309/${this.api.baseUrl}`;
  }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // open database
      // create tables
      // try to select from api, if no data,
      // then assume fresh install, load full api and letter list
      // otherwise, notify of any api updates (future feature)

      this.sqlite.openDatabase({
          name: 'UserScores',
          location: 'default'
      })
      .then(() => {
        // create tables
        return this.sqlite.sqlBatch([
          'Score__Table',
          'Words__Table',
          'Letters__Table'
        ]);
      })
      .then(() => {
        return this.sqlite.executeSQL({
          procName: 'Words__Check_Data'
        });
      })
      .then((res: number) => {
        // populate local db
        if (res === 0){
          initialInstall = true;
          this.dictionary.loadAllWords()
          .then(() => {
            return this.dictionary.saveAllWords();
          })
          .then(() => {
            return this.dictionary.loadLetterList();
          })
          .then(() => {
            return this.dictionary.saveLetterList()
          });
        }
      })
      .then(() => {
        if(!initialInstall) {
          return this.dictionary.loadAllWordsLocal()
          .then(() => {
            this.dictionary.loadLetterListLocal();
          });
        }
      })
      .then(() => {
        console.log("end of promise chain");
      })
      .catch(err => {
        console.log('Error on app startup: ' + err.message);
      });
    });
  }
}
