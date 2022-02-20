import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wl-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class WlProgressComponent implements OnInit {

  @Input()
  public titleText: string;

  @Input()
  public progressText: string;

  @Input()
  public progressValue: number;

  constructor() { }

  /**
   * On Init.
   */
  ngOnInit() {}

}
