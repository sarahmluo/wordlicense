import { Component, Input, OnInit } from '@angular/core';

import { WordTimerFill, WordTimerShape, WordTimerCss } from './types';

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
   * Time remaining in milliseconds.
   */
  public timeRemaining: number;

  /**
   * CSS for the timer.
   */
  public css: WordTimerCss;

  /**
   * On Init.
   */
  ngOnInit() {
    this.timeRemaining = this.startTime;
    this.setCss();
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
    }
  }

}
