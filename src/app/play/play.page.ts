import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  constructor(
    private location: Location
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {
  }

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.location.back();
  }
}
