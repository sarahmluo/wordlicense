import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WordList } from './types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Base URL for api calls.
   */
    public baseUrl: string = 'api/words';

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
  public loadDictionary(): Promise<void> {
    return this.http.get<string[]>(this.baseUrl + '/wordlist')
      .toPromise()
      .then((data: string[]) => {
        this._dictionary = new Set(Object.keys(data));
      });
  }

  /**
   * Generate the list of letter strings.
   */
  public loadLetterList(): Promise<void> {
    return this.http.get<string[]>(this.baseUrl + '/letterlist')
      .toPromise()
      .then((data: string[]) => {
        this._letters = Object.keys(data);
      });
  }

  /**
   * Fetch the list of words for each letter combination.
   * Only used in offline mode.
   */
  public loadWordList(): Promise<void> {
    return this.http.get<WordList>('../assets/words/wordList.json')
      .toPromise()
      .then((data: WordList) => {
        this._wordList = data;
      });
  }
}
