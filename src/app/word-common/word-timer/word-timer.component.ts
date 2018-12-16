import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

import { WordTimerCss, WordTimerFill, WordTimerShape } from './types';

@Component({
  selector: 'app-word-timer',
  templateUrl: './word-timer.component.html',
  styleUrls: ['./word-timer.component.scss']
})
export class WordTimerComponent implements OnInit {
  constructor() { }

  /**
   * Display text. Defaults to 'Time.'
   */
  @Input()
  public displayText: string = 'Time';

  /**
   * Color in hex string format. Defaults to black.
   */
  @Input()
  public color: string = '#000';

  /**
   * Shape. 'round' for rounded ends, 'full' for cornered ends.
   * Defaults to 'round'.
   */
  @Input()
  public shape: WordTimerShape = 'round';

  /**
   * Fill. Defaults to 'solid'.
   */
  @Input()
  public fill: WordTimerFill = 'solid';

  /**
   * Start time in milliseconds. Defaults to 5 seconds.
   */
  @Input()
  public startTime: number = 5000;

  /**
   * Event emitted when timer finishes.
   */
  @Output()
  public timesUp: EventEmitter<void> = new EventEmitter();

  /**
   * Time remaining in milliseconds.
   */
  public timeRemaining: number;

  /**
   * Display time.
   */
  public displayTime: string;

  /**
   * CSS for the timer.
   */
  public css: WordTimerCss;

  public timer: any;

  /**
   * On Init.
   */
  ngOnInit() {
    this.setCss();
    this.resetTimer();
  }

  /**
   * Reset the timer.
   */
  public resetTimer() {
    clearTimeout(this.timer);
    this.timeRemaining = this.startTime;
    this.setDisplayTime(this.timeRemaining);
    this.runTimer();
  }

  /**
   * Run the timer.
   */
  private runTimer(): void {
    this.timer = setTimeout(
      () => {
        this.timeRemaining -= 1000;
        this.setDisplayTime(this.timeRemaining);

        if (this.timeRemaining <= 0) {
          this.timesUp.emit();
        } else {
          this.runTimer();
        }
      },
      1000
    );
  }

  /**
   * Initialize timer CSS.
   */
  private setCss(): void {
    // todo: move hard coded values elsewhere
    this.css = {
      'background-color': this.fill === 'solid' ? this.color : '#fff',
      'border': this.fill === 'outline' ? '2px solid ' + this.color : '0px',
      'border-radius': this.shape === 'full' ? '0px' : '50px',
      'color': this.fill === 'solid' ? '#fff' : this.color,
      'display': 'inline-block',
      'padding': '5px 10px'
    };
  }

  /**
   * Set the display time.
   *
   * @param time the time to display.
   */
  private setDisplayTime(time: number): void {
    this.displayTime = moment().startOf('day').milliseconds(time).format('HH:mm:ss');
  }
}
