import { Component, enableProdMode } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { WlAlertService } from './core/alert/alert.service';
import { WlApiService } from './core/api/api.service';
import { DictionaryService } from './core/dictionary/dictionary.service';
import { WlSqliteService } from './core/sqlite/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private api: WlApiService,
    private dictionary: DictionaryService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private sqlite: WlSqliteService,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController,
    private alert: WlAlertService
  ) {
    this.initializeApp();
  }

 public async initializeApp(): Promise<void> {

    let initialInstall: boolean = false;
    let isOnline: boolean = navigator.onLine;

    if (environment.production) {
      enableProdMode();
      this.api.baseUrl = `https://wordapi20211030215150.azurewebsites.net/${this.api.baseUrl}`;
    } else {
      this.api.baseUrl = `https://192.168.31.186:44309/${this.api.baseUrl}`;
      //this.api.baseUrl = `https://wordapi20211030215150-test.azurewebsites.net/${this.api.baseUrl}`;
      //this.api.baseUrl = `https://wordapi20211030215150.azurewebsites.net/${this.api.baseUrl}`;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Loading Dictionary...',
    })

    await loading.present();

    return this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // open database
      // create tables
      // try to select from api, if no data,
      // then assume fresh install, load data via api

      return this.sqlite.openDatabase({
          name: 'UserScores',
          location: 'default'
      })
      .then(() => {
        // create tables
        return this.sqlite.sqlBatch([
          'Score__Table',
          'Words__Table',
          'Letters__Table',
          'Sync__Table'
        ]);
      })
      .then(() => {
        return this.sqlite.executeSQL({
          procName: 'Words__Check_Data'
        });
      })
      .then((res: any[]) => {
        // populate local db
        if (res.length === 0){
          initialInstall = true;

          if(!isOnline) {
            this.alert.error('No internet');
            throw new Error('Internet connectivity required for first use');
          }

          return this.dictionary.loadAllWords()
          .then(() => {
            return this.dictionary.saveAllWords();
          })
          .then(() => {
            return this.dictionary.loadLetterList();
          })
          .then(() => {
            return this.dictionary.saveLetterList()
          })
          .then(() => {
            return this.sqlite.executeSQL({
              procName: 'Sync__Create',
              params: {
                syncDate: (new Date()).getDate()
              }
            })
          });
        }
      })
      .then(() => {
        if(!initialInstall) {
          return this.dictionary.loadAllWordsLocal()
          .then(() => {
            return this.dictionary.loadLetterListLocal();
          });
        }
      })
      .then(() => {
        loading.dismiss();
        console.log("end of promise chain");
      })
      .catch(err => {
        loading.dismiss();

        this.alert.error('There was an error on app startup. Check your Internet connection and try again');
        console.log('Error on app startup: ' + err.message);
      });
    });
  }
}
