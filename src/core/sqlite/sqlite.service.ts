import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { WlSQLiteDB } from './types';

@Injectable({
  providedIn: 'root'
})
export class WlSqliteService {
  constructor(
    private http: HttpClient,
    private sqlite: SQLite
  ) { }

  /**
   * Current active database.
   */
  private db: SQLiteObject;

  /**
   * Create and open a database.
   * 
   * @param config
   */
  public async openDatabase(config: WlSQLiteDB): Promise<SQLiteObject> {
    return this.sqlite.create(config)
      .then((db: SQLiteObject) => {
        this.db = db;
        return db;
      });
  }

  /**
   * Execute inline SQL.
   * 
   * @param proc The SQL proc file, including path.
   * @param params Optional list of parameters.
   */
  public async executeSQL(proc: string, params?: string[]): Promise<any> {
    // Check if SQL was loaded
    if (!proc) {
      throw new Error(`Expected query, but received ${proc}`);
    }
 
    // Load SQL
    const statement: string = await this.loadSQL(proc);
    
    if (params || params.length) {
      // TODO
    }
    else {
      return this.db.executeSql(statement);
    }
  }

  /**
   * Load a proc string from the filesystem.
   * 
   * @param procName Name of proc to load, path included.
   */
  public async loadSQL(procName: string): Promise<string> {
    return this.http.get(procName)
    .toPromise()
    .then(res => res.toString())
    .catch(err => {
      console.log(err);
      return '';
    });
  }
}
