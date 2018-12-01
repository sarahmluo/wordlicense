import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.scss']
})
export class LicensePlateComponent implements OnInit {
  constructor() { }

  /**
   * Image div.
   */
  @ViewChild('licensePlate')
  public imageDiv: ElementRef;

  /**
   * Flag indicating if the game has started.
   */
  public hasStarted: boolean = false;

  /**
   * Dynamic css for image div.
   */
  public imageCss: any = {};

  /**
   * On Init.
   */
  public ngOnInit(): void {
  }

  /**
   * Start the game.
   */
  public startGame(): void {
    this.hasStarted = true;
  }

}
