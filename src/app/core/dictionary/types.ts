/**
 * Format of word list JSON object.
 */
export interface WordList {
  [key: string]: [];
}

/**
 * Format of letter list and word objects when
 * returned from server.
 */
export interface LetterList {
  [key: string]: string;
}

/**
 * Word with server id.
 */
export interface WlWord {
  serverId: number,
  word: string
}
