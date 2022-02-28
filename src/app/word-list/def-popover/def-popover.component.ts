import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WordFullDefinition } from './types';

@Component({
  selector: 'app-def-popover',
  templateUrl: './def-popover.component.html',
  styleUrls: ['./def-popover.component.scss'],
})
export class DefPopoverComponent implements OnInit {

  /**
   * Word to retreive definition for.
   */
  public word: string;

  /**
   * Word definition.
   */
  public fullDefinition: WordFullDefinition;

  /**
   * Loading flag.
   */
  public isLoading: boolean = true;

  constructor( private http: HttpClient ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {
    this.http.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + this.word)
    .subscribe((res: WordFullDefinition[]) => {
      this.fullDefinition = res[0];
      this.isLoading = false;
    });
  }

}
