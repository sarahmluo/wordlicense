import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LettersService } from 'src/app/letters.service';
import { WordTimerComponent } from 'src/app/word-common/word-timer/word-timer.component';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.scss']
})
export class LicensePlateComponent implements OnInit {
  constructor(
    private letter: LettersService
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
  public letters: string[] = this.letter.letters;

  /**
   * Index of current letter combination.
   */
  public currentIndex: number;

  /**
   * Random three digit number for license plate display.
   */
  public licenseNumber: number;

  /**
   * Number of available letter combinations.
   */
  private numLetters: number = this.letter.letters.length;

  /**
   * On Init.
   */
  public ngOnInit(): void {
    this.getNewLicenseDisplay();
  }

  /**
   * Start the game.
   */
  public startGame(): void {
    this.hasStarted = true;
  }

  /**
   * Get a new license display.
   */
  public getNewLicenseDisplay(): void {
    this.getNewLetters();
    this.getNewLicenseNumber();
    this.timer.resetTimer();
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
    this.licenseNumber = num <= 99 ? Number(('00' + num).slice(-3)) : num;
  }
}
