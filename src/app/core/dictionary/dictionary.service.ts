import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { WlSqliteService } from '../sqlite/sqlite.service';
import { WlSqliteObject } from '../sqlite/types';
import { WordList } from './types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(
    private api: ApiService,
    private http: HttpClient,
    private sqlite: WlSqliteService
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
   * Load words into runtime memory.
   */
  public loadAllWords(): Promise<void> {
    return this.api.get('allwords')
      .toPromise()
      .then((data: string[]) => {
        this._dictionary = new Set(Object.keys(data));
      });
  }

  /**
   * Load all words from sqlite db into runtime memory.
   */
  public loadAllWordsLocal(): Promise<void>{
    return this.sqlite.executeSQL({
      procName: 'Words__Read_All'
    })
    .then((data: string[]) => {
      this._dictionary = new Set(Object.keys(data));
    });
  }

  /**
   * Save words into local db.
   */
  public saveAllWords(): Promise<void> {
    let queries: WlSqliteObject[] = [];

    for(const word of this._dictionary) {
      queries.push({
        procName: 'Words__Create',
        params: {
          word: word
        }
      });
    }

    return this.sqlite.sqlBatch(queries);
  }

  /**
   * Generate the list of letter strings.
   */
  public loadLetterList(): Promise<void> {
    return this.api.get('letterlist')
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
