import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { DictionaryService } from 'src/app/core/dictionary/dictionary.service';
import { WlSqliteService } from 'src/app/core/sqlite/sqlite.service';
import { WordTimerComponent } from 'src/app/word-common/word-timer/word-timer.component';

import { largeFontSize, minViewPortWidth, smallFontSize } from './types';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.scss'],
  animations: [ trigger('successAnimation', [
    state('true', style({
      boxShadow: 'none',
      fontWeight: 'normal'
    })),
    transition('* => *', animate('1000ms linear', keyframes([
      style({boxShadow: 'none', fontWeight: 'normal', offset: 0}),
      style({boxShadow: '0 0 20px #091c82', fontWeight: 'bold', offset: 0.25}),
      style({boxShadow: '0 0 20px #091c82', fontWeight: 'bold', offset: 0.5}),
      style({boxShadow: '0 0 20px #091c82', fontWeight: 'bold', offset: 0.75}),
      style({boxShadow: 'none', fontWeight: 'normal', offset: 1})
    ])))
  ])]
})
export class LicensePlateComponent implements AfterViewInit {
  constructor(
    private alertCtrl: AlertController,
    private dictionary: DictionaryService,
    private navCtrl: NavController,
    private sqlite: WlSqliteService,
    private toast: ToastController
  ) { }

  /**
   * License plate image element ref.
   */
  @ViewChild('licenseImage')
  public licenseImage: ElementRef;

  /**
   * Timer component.
   */
  @ViewChild(WordTimerComponent)
  public timer: WordTimerComponent;

  /**
   * Flag indicating if the game has started.
   */
  public hasStarted: boolean = false;

  /**
   * Array of three-letter combinations.
   */
  public letters: string[];

  /**
   * Index of current letter combination.
   */
  public currentIndex: number;

  /**
   * Random three digit number for license plate display.
   */
  public licenseNumber: string;

  /**
   * User word input.
   */
  public wordInput: string;

  /**
   * Number of attempts given to user.
   */
  public attempts: number;

  /**
   * Number of successful submissions.
   */
  public successes: number;

  /**
   * License plate image number.
   */
  public imageNumber: number;

  /**
   * Used in template to determine license plate font size.
   */
  public viewPortWidth: number;

  /**
   * Used in template to determine license plate font size.
   */
  public minViewPortWidth: number = minViewPortWidth;

  /**
   * Used in template to set license plate font size.
   */
  public smallFontSize: number = smallFontSize;

  /**
   * Used in template to set license plate font size.
   */
  public largeFontSize: number = largeFontSize;

  /**
   * Default initials for entering score.
   */
  private defaultInitials: string = 'AAA';

  /**
   * Number of available letter combinations.
   */
  private numLetters: number;

  /**
   * Number of license plate images.
   */
  private numLicensePlates: number = 15;

  /**
   * State flag for animation.
   */
  private hadSuccess: string = 'false';

  /**
   * On Init.
   */
  public ngOnInit(): void {
    this.viewPortWidth = window.innerWidth;
  }

  /**
   * After Init.
   */
  public ngAfterViewInit(): void {
    this.setImageNumber();
  }

  /**
   * Start the game.
   */
  public startGame(): void {
    this.sqlite.executeSQL({
      procName: 'Letters__Read_All'
    }).then((res: any[]) => {
      console.log(res);
    })
    this.hasStarted = true;
    this.letters = this.dictionary.letters;
    this.numLetters = this.letters.length;
    this.attempts = 0;
    this.successes = 0;
    this.currentIndex = Math.floor(Math.random() * this.numLetters);
    this.getNewLicenseDisplay();
  }

  /**
   * Get a new license display.
   */
  public getNewLicenseDisplay(): void {
    //this.hadSuccess = 'false';
    this.getNewLetters();
    this.getNewLicenseNumber();
    if (this.timer) {
      this.timer.resetTimer();
    }
    this.setImageNumber();
  }

  /**
   * Skip the current set of letters.
   */
  public skip(): void {
    this.attempts++;
    this.wordInput = '';
    this.getNewLicenseDisplay();
  }

  /**
   * Stop the game.
   */
  public stop(): Promise<void> {
    if (this.hasStarted) {
      // prompt to save score
      this.timer.stopTimer();
      return this.presentSaveAlert();
    } else {
      return Promise.resolve();
    }
  }

  /**
   * Process word submission.
   */
  public async onWordSubmit(): Promise<any> {
    // check if word satsifies regular expression.
    const letter1: string = this.letters[this.currentIndex][0];
    const letter2: string = this.letters[this.currentIndex][1];
    const letter3: string = this.letters[this.currentIndex][2];

    const regExp: RegExp = new RegExp('^([a-z])*' + letter1 + '([a-z])*' + letter2 + '([a-z])*' + letter3 + '([a-z])*$');
    if (!regExp.test(this.wordInput.trim().toLowerCase())) {
      const tst: HTMLIonToastElement = await this.toast.create({
        message: 'That word doesn\'t match the given letters!',
        duration: 2000,
        position: 'top',
        buttons: [
          {
          text: 'Close',
          role: 'cancel'
          }
        ]
      });

      return tst.present();
    }

    // check if word is in dictionary.
    if (!this.dictionary.dictionary.has(this.wordInput.trim().toLowerCase())) {
      const tst: HTMLIonToastElement = await this.toast.create({
        message: 'That word is not in the dictionary!',
        duration: 2000,
        position: 'top',
        buttons: [
          {
          text: 'Close',
          role: 'cancel'
          }
        ]
      });

      return tst.present();
    }

    // Passed checks update score.
    this.successes++;
    this.attempts++;
    this.wordInput = '';
    this.hadSuccess = this.hadSuccess === 'true' ? 'false' : 'true';
    this.getNewLicenseDisplay();
  }

  /**
   * Determine number of license plate image.
   */
  private setImageNumber(): void {
    this.imageNumber = Math.ceil(Math.random() * this.numLicensePlates);
  }

  /**
   * Logic to create and present an alert controller to save
   * the user's score.
   */
  private async presentSaveAlert(): Promise<void> {
    const saveAlert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Save Score?',
      message: 'Provide your initials to save your score',
      inputs: [
        {
          name: 'initials',
          type: 'text',
          id: 'initials',
          placeholder: this.defaultInitials
        }
      ],
      buttons: [
        {
          text: 'No Thanks',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateBack('/home');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            return this.saveScore(data).then(() => {
              this.reset();
            });
          }
        }
      ]
    });

    await saveAlert.present();
  }

  /**
   * Save a user's score.
   *
   * @param data User input.
   */
  private async saveScore(data: any): Promise<any> {
    const initials: string =
      data.initials ? data.initials.toString().toUpperCase() : this.defaultInitials;

      return this.sqlite.executeSQL({
        procName: 'Score__Create',
        params: {
          Initials: initials.length > 3 ? initials.substring(0,3) : initials,
          Score: this.successes,
          Total: this.attempts,
          ScoreDate: new Date().toISOString()
        }
      }).then(() => {
        return this.alertCtrl.create({
          header: 'Save Confirmation',
          message: 'Save Successful!',
          buttons: ['OK']
        });
      })
      .then(res => {
        return res.present();
      });
  }

  /**
   * Reset runtime variables.
   */
  private reset(): void {
    this.hasStarted = false;
    this.attempts = 0;
    this.successes = 0;
    this.wordInput = '';
    if (this.timer) {
      this.timer.resetTimer();
    }
  }

  /**
   * Get a new set of letters.
   */
  private getNewLetters(): void {
    let index: number;

    do {
      index = Math.floor(Math.random() * this.numLetters);
    } while (index === this.currentIndex);

    this.currentIndex = index;
  }

  /**
   * Get a new license number.
   */
  private getNewLicenseNumber(): void {
    const num: number = Math.floor(Math.random() * 1000);
    this.licenseNumber = num <= 99 ? ('00' + num).slice(-3) : num.toString();
  }
}
