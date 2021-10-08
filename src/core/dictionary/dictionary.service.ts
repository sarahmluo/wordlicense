import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiUrl } from '../environment';
import { WordList } from './types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Internal dictionary object.
   */
  private _dictionary: Set<string>;

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
   * Getter for dictionary.
   */
  public get dictionary(): Set<string> {
    return {...this._dictionary};
  }

  /**
   * Getter for the letter list.
   */
  public get letters(): string[] {
    return {...this._letters};
  }

  /**
   * Getter for the letter list.
   */
  public get wordList(): WordList {
    return {...this._wordList};
  }

  /**
   * Load dictionary into memory.
   */
  public loadDictionary(): void {
    this.http.get<string[]>(apiUrl + '/wordlist')
      .subscribe(
        res => this._dictionary = new Set(Object.keys(res)),
        console.error,
        () => console.log('Dictionary loaded')
      );
  }

  /**
   * Generate the list of letter strings.
   */
  public loadLetterList(): void {
    this.http.get<string[]>(apiUrl + '/letterlist')
    .subscribe(
      res => this._letters = Object.keys(res),
      console.error,
      () => console.log('Letter list loaded')
    );
  }

  /**
   * Fetch the list of words for each letter combination.
   * Only used in offline mode.
   */
  public loadWordList(): void {
    this.http.get<WordList>('../assets/words/wordList.json')
    .subscribe(
      res => this._wordList = res,
      console.error,
      () => console.log('Word list loaded')
    );
  }
}
