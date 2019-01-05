import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

 public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    // Load dictionary and letters
    return this.dictionary.loadDictionary()
      .then(() => {
        return this.dictionary.loadLetterList();
      })
      .then(() => {
        return this.dictionary.loadWordList();
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
}
