import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WordDictionary } from './types';

@Injectable({
  providedIn: 'root'
})
export class LettersService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * List of letter strings to be used in the
   * license plate game.
   */
  private _letters: string[];

  /**
   * Getter for the letter list.
   */
  public get letters(): string[] {
    return this._letters;
  }

  /**
   * Generate the list of letter strings.
   */
  public loadLetterList(): Promise<void> {
    return this.http.get('../assets/words/letters2.json')
    .toPromise()
    .then((res: WordDictionary) => {
      this._letters = Object.keys(res);
    });
  }
}
