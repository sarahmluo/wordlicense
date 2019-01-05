import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WordDictionary, WordList } from '../dictionary/types';

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
   * List of letter strings along
   * with sample word list.
   */
  private _wordList: WordList;

  /**
   * Getter for the letter list.
   */
  public get letters(): string[] {
    return this._letters;
  }

  /**
   * Getter for the letter list.
   */
  public get wordList(): WordList {
    return this._wordList;
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

  /**
   * Fetch the list of words for each letter combination.
   */
  public loadWordList(): Promise<void> {
    return this.http.get('../assets/words/wordList.json')
    .toPromise()
    .then((res: WordList) => {
      this._wordList = res;
    });
  }
}
