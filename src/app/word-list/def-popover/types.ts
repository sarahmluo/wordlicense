/**
 * Definition type.
 */
export interface WordFullDefinition {
  word?: string;
  phonetic?: string;
  phonetics?: any[];
  origin?: any[];
  meanings?: WordMeaning[];
  license?: any[];
  sourceUrls: any[];
}

export interface WordMeaning {
  partOfSpeech?: string;
  definitions?: WordDefinition[];
}

export interface WordDefinition {
  definition?: string;
  example?: string;
  synonyms?: any[];
  antonyms?: any[];
}
