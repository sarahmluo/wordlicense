import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { WlApiService } from '../api/api.service';
import { WlSqliteService } from '../sqlite/sqlite.service';
import { WlSqliteObject } from '../sqlite/types';
import { LetterList, WlWord, WordList } from './types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(
    private api: WlApiService,
    private http: HttpClient,
    private sqlite: WlSqliteService
  ) { }

  /**
   * Internal dictionary object.
   */
  private _dictionary: WlWord[];

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
  public get dictionary(): WlWord[] {
    if (this._dictionary) {
      return [...this._dictionary];
    }
    else {
      return [];
    }
  }

  /**
   * Getter for the letter list.
   */
  public get letters(): string[] {
    if(this._letters) {
      return [...this._letters];
    }
    else {
      return [];
    }
  }

  /**
   * Getter for the letter list.
   */
  public get wordList(): WordList {
    return {...this._wordList};
  }

  /**
   * Load words into runtime memory from the server.
   */
  public loadAllWords(): Promise<void> {
    return this.api.get('allwords')
      .toPromise()
      .then((data: WlWord[]) => {
        this._dictionary = Object.values(data);
      });
  }

  /**
   * Load all words from sqlite db into runtime memory.
   */
  public loadAllWordsLocal(): Promise<void>{
    this._dictionary = [];

    return this.sqlite.executeSQL({
      procName: 'Words__Read_All'
    })
    .then((data: WlWord[]) => {
      data.forEach(datum =>
        this._dictionary.push(Object.values(datum)[0])
      );
    });
  }

  /**
   * Save words into local db.
   */
  public saveAllWords(): Promise<void> {
    let queries: WlSqliteObject[] = [];

    this._dictionary.forEach(entry =>
      queries.push({
        procName: 'Words__Create',
        params: {
          serverId: entry.serverId,
          word: entry.word
        }
      })
    );

    return this.sqlite.sqlBatch(queries);
  }

  /**
   * Load the letter list from the server.
   */
  public loadLetterList(): Promise<void> {
    return this.api.get('letterlist')
      .toPromise()
      .then((data: string[]) => {
        this._letters = Object.values(data);
      });
  }

  /**
   * Load letter list locally.
   */
  public loadLetterListLocal(): Promise<void> {
    this._letters = [];

    return this.sqlite.executeSQL({
      procName: 'Letters__Read_All'
    })
    .then((data: LetterList[]) => {
      data.forEach(datum =>
        this._letters.push(Object.values(datum)[0])
      );
    })
  }

  /**
   * Save letter combos to the sqlite db.
   */
  public saveLetterList(): Promise<void> {
    let queries: WlSqliteObject[] = [];

    this._letters.forEach(lettercombo =>
      queries.push({
        procName: 'Letters__Create',
        params: {
          lettercombo: lettercombo
        }
      })
    );

    return this.sqlite.sqlBatch(queries);
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
