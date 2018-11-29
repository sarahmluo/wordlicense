import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor() { }

  /**
   * Internal dictionary object.
   */
  private _dictionary: Set<string> = new Set([
    'abdicate',
    'hike',
    'cite',
    'create',
    'kissing',
    'bluffing'
  ]);

  /**
   * Getter for dictionary.
   */
  public get dictionary(): Set<string> {
    return this._dictionary;
  }
}
