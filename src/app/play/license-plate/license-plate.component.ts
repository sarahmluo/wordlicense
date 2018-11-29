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
    this.calculateImageCss();
  }

  /**
   * Calculate dynamic css properties for the license image div.
   */
  private calculateImageCss(): void {
    let minHeight: string;
    let paddingTop: string;
    console.log(this.imageDiv);
    const width: number = window.innerWidth;
    console.log('width: ' + width);
    // todo: move hardcoded values to a service
    const height: number = Math.round((width * 300) / 600);

    this.imageCss = {
      height: height + 'px',
      'font-size': Math.round(height/10) + 'px', 
    }

    console.log(minHeight);
  }

}
