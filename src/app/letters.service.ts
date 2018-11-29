import { Injectable } from '@angular/core';

import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class LettersService {
  constructor(
    private dict: DictionaryService
  ) { }

  /**
   * List of letter strings to be used in the 
   * license plate game.
   */
  private _letters: string[] = [
    'ABD',
    'HIK',
    'CTE',
    'SSI',
    'BFG'
  ];

  /**
   * Getter for the letter list.
   */
  public get letters(): string[] {
    return this._letters;
  }

  /**
   * Generate the list of letter strings.
   */
  public generateLetterList(): void {

  }
}
