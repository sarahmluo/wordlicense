import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.location.back();
  }
}
