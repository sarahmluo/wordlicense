/**
 * Database format for Sqlite.
 */
export interface WlSQLiteDB {
  name: string;
  location?: string;
}

/**
 * Interface for proc with parameters.
 */
export interface WlSqliteObject {
  query?: string;
  procName?: string;
  params?: WlSQLiteParameters;
}

/**
 * Parameter list format
 */
export interface WlSQLiteParameters {
  [key: string]: any;
}
