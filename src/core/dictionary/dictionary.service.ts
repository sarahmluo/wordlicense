import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

import { WordDictionary, WordList } from './types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(
    private file: File,
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
    return this._dictionary;
  }

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
   * Load dictionary into memory.
   */
  public loadDictionary(): Promise<void> {
    return this.http.get('../assets/words/words.json')
      .toPromise()
      .then((res: WordDictionary) => {
        this._dictionary = new Set(Object.keys(res));
      });

    // as of 12/5/2018, cannot debug File plugin on
    // device bc sourcemaps are not loaded in Ionic 4
    // for Android. So for now, using http as above.
    /* console.log('loading dictinary file');
    return new Promise<void>((resolve, reject) => {
      this.file.checkDir(this.file.applicationStorageDirectory, 'assets')
      .then(() => {
        console.log('checking file...');
        return this.file.checkFile('../assets/', 'words.txt')
      })
      .then(() => {
        console.log('reading file...');
        return this.file.readAsText('../assets/', 'words.txt');
      })
      .then((res: string) => {
        const dict: string[]  = res.split('\n');
        this._dictionary = new Set(dict);
        console.log('Dictionary loaded!');
        console.log(this._dictionary.size);
      })
    }); */
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
