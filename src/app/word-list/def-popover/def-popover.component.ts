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

  /**
   * Flag to show definition not found.
   */
  public showEmptyDef: boolean = false;

  constructor( private http: HttpClient ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {
    // Not using api service because this does not use the baseUrl.
    this.http.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + this.word)
    .subscribe((res: WordFullDefinition[]) => {
      if (res && Array.isArray(res) && res.length > 0) {
        this.fullDefinition = res[0];
      }
      else {
        this.showEmptyDef = true;
      }

      this.isLoading = false;
    }, error => {
      this.showEmptyDef = true;
      this.isLoading = false;
    });
  }

}
