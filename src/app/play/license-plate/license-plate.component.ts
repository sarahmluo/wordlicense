import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.scss']
})
export class LicensePlateComponent implements OnInit {
  constructor() { }

  /**
   * Flag indicating if the game has started.
   */
  public hasStarted: boolean = false;

  /**
   * On Init.
   */
  public ngOnInit(): void {
  }

}
