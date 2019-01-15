/**
 * Database format for Sqlite.
 */
export interface WlSQLiteDB {
  name: string,
  location?: string
}

/**
 * Parameter list format
 */
export interface WlSQLiteParameters {
  [key: string]: any
}