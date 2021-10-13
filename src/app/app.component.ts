import { Component, enableProdMode } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';
import { mergeMap } from 'rxjs/operators';

import { DictionaryService } from '../core/dictionary/dictionary.service';
import { environment } from 'src/environments/environment';

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
  if (environment.production) {
    enableProdMode();
    this.dictionary.baseUrl = `https://safeview-mobile.wentinc.com/${this.dictionary.baseUrl}`;
  } else {
    this.dictionary.baseUrl = `https://192.168.31.185:44309/${this.dictionary.baseUrl}`;
  }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // open database
      // create tables
      // try to select from dictionary, if no data,
      // then assume fresh install, load full dictionary and letter list
      // otherwise, notify of any dictionary updates (future feature)

      this.sqlite.openDatabase({
          name: 'UserScores',
          location: 'default'
      })
      .then(() => {
        // create tables
        return this.sqlite.executeSQL({
          procName: 'Score__Table'
        });
      })
      // .then(() => {
      //   return this.sqlite.executeSQL({
      //     procName: 'Dictionary__Check_Data'
      //   });
      // })
      // .then((res: number[]) => {
      //   // populate local db
      //   if (res[0] === 0){

      //   }
     // })
      .then(() => {
        // load Dictionary from server
        return this.dictionary.loadDictionary();
      })
      .then(() => {
        // load letter list from server
        return this.dictionary.loadLetterList();
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
