import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DictionaryService } from 'src/app/dictionary.service';
import { LettersService } from 'src/app/letters.service';
import { WordTimerComponent } from 'src/app/word-common/word-timer/word-timer.component';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.scss']
})
export class LicensePlateComponent implements OnInit {
  constructor(
    private dictionary: DictionaryService,
    private letter: LettersService,
    private toast: ToastController
  ) { }

  /**
   * Image div.
   */
  @ViewChild(WordTimerComponent)
  public timer: WordTimerComponent;

  /**
   * Flag indicating if the game has started.
   */
  public hasStarted: boolean = false;

  /**
   * Dynamic css for image div.
   */
  public imageCss: any = {};

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
   * Number of available letter combinations.
   */
  private numLetters: number;

  /**
   * On Init.
   */
  public ngOnInit(): void {
    this.letters = this.letter.letters;
    this.numLetters = this.letters.length;
    this.currentIndex = Math.floor(Math.random() * this.numLetters);
  }

  /**
   * Start the game.
   */
  public startGame(): void {
    this.hasStarted = true;
    this.getNewLicenseDisplay();
  }

  /**
   * Get a new license display.
   */
  public getNewLicenseDisplay(): void {
    this.getNewLetters();
    this.getNewLicenseNumber();
    if (this.timer) {
      this.timer.resetTimer();
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
    if (!regExp.test(this.wordInput.toLowerCase())) {
      const tst: HTMLIonToastElement = await this.toast.create({
        message: 'That word doesn\'t match the given letters!',
        duration: 2000,
        position: 'top'
      });

      return tst.present();
    }

    // check if word is in dictionary.
    if (!this.dictionary.dictionary.has(this.wordInput.toLowerCase())) {
      const tst: HTMLIonToastElement = await this.toast.create({
        message: 'That word is not in the dictionary!',
        duration: 2000,
        position: 'top'
      });
  
      return tst.present();
    }

    // Passed checks update score.

  }

  /**
   * Get a new set of letters.
   */
  private getNewLetters(): void {
    let index: number;

    do {
      index = Math.floor(Math.random() * this.numLetters);
    } while (index === this.currentIndex)

    this.currentIndex = index;
  }

  /**
   * Get a new license number.
   */
  private getNewLicenseNumber(): void {
    let num: number = Math.floor(Math.random() * 1000);
    this.licenseNumber = num <= 99 ? ('00' + num).slice(-3) : num.toString();
  }
}
