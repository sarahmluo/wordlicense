import { Component, enableProdMode } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import * as moment from 'moment';
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

  /**
   * Progress message when loading data.
   */
  public progressText: string = "";

  /**
   * Title for progress indicator.
   */
  public progressTitle: string = "";

  /**
   * Value representing loading progress.
   */
  public progressValue: number = 0.0;

  /**
   * Flag indicating whether or not to show
   * the progress indicator.
   */
  public showProgress: boolean = false;

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

    if (environment.production) {
      this.api.baseUrl = `https://wordapi20211030215150.azurewebsites.net/${this.api.baseUrl}`;
    } else {
      //this.api.baseUrl = `https://192.168.31.186:44309/${this.api.baseUrl}`;
      this.api.baseUrl = `https://wordapi20211030215150-test.azurewebsites.net/${this.api.baseUrl}`;
      // this.api.baseUrl = `https://wordapi20211030215150.azurewebsites.net/${this.api.baseUrl}`;
    }

    this.showProgress = true;
    this.progressText = "Initializing...";

    return this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    // open database
    // create tables
    // try to select from local db, if no data,
    // then assume fresh install, load data via api

    this.progressText = "Preparing Database...";
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
        this.progressValue = 0.10;
        // populate local db
        if (res.length === 0){
          initialInstall = true;
          console.log('intial install');
          this.progressText = "Fetching Dictionary...";

          return this.dictionary.loadAllWords()
          .then(() => {
            this.progressText = "Saving Dictionary...";
            this.progressValue = 0.4;
            return this.dictionary.saveAllWords();
          })
          .then(() => {
            this.progressText = "Fetching Letter List...";
            this.progressValue = 0.6;
            return this.dictionary.loadLetterList();
          })
          .then(() => {
            this.progressText = "Saving Letter List...";
            this.progressValue = 0.9;
            return this.dictionary.saveLetterList()
          })
          .then(() => {
            return this.sqlite.executeSQL({
              procName: 'Sync__Create',
              params: {
                syncDate: moment().format()
              }
            })
          });
        }
      })
      .then(() => {
        if(!initialInstall) {
          this.progressText = "Loading Dictionary...";
          return this.dictionary.loadAllWordsLocal()
          .then(() => {
            this.progressText = "Loading Letter List...";
            this.progressValue = 0.50;
            return this.dictionary.loadLetterListLocal();
          });
        }
      })
      .then(() => {
        this.showProgress = false;
        console.log("end of promise chain");
      })
      .catch(err => {
        this.showProgress = false;
        this.alert.error('There was an error on app startup. Check your Internet connection and try again.');
        console.log('Error on app startup: ' + err.message);
      });
    });
  }
}
