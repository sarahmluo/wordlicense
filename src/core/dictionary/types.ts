/**
 * Format of dictionary when read in as JSON
 * from the file system.
 */
export interface WordDictionary {
  [key: string]: 1;
}

/**
 * Format of word list JSON object.
 */
export interface WordList {
  [key: string]: [];
}
