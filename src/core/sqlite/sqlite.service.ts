import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { isUndefined } from 'ts-utils';

import { WlSQLiteDB, WlSqliteObject, WlSQLiteParameters } from './types';

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
   * Regex for sqlite parameter
   */
  private paramRegex: RegExp = new RegExp('@\\w+', 'g');

  /**
   * Regex for select query.
   */
  private selectRegex: RegExp = new RegExp('^select', 'i');

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
  public async executeSQL(sqliteObj: WlSqliteObject): Promise<number | void | any[]> {
    const procName = sqliteObj.procName;
    const params = sqliteObj.params;

    // Check if proc name was provided
    if (!procName) {
      throw new Error(`Expected proc name, but received ${procName}`);
    }

    // Load SQL
    let statement: string = window['__sqliteProcs'][procName];
    let paramList: any[] = [];

    console.log('Proc: ' + procName + ' Statement: ' + statement);

    if (params && Object.keys(params).length > 0) {
      // prep parameter list
      paramList = this.prepParams(statement, params);
    } 

    // replace parameter names in proc with question marks
    statement = statement.replace(this.paramRegex, '?').trim();

    // execute statement
    return this.db.executeSql(statement, paramList).then(res => {
      
      let data: any[] | number;

      if (this.selectRegex.test(statement)) {
        data = [];

        for (let i = 0; i < res.rows.length; i++) {
          data.push(res.rows.item(i));
        }
      } else {
        data = res.insertId || 0;
      }

      return data;
    });
  }

  /**
   * Prep the parameter list by matching the named parameters in
   * the statement with the parameters in the JSON object.
   *
   * @param statement SQLite statement
   * @param params Parameter list
   */
  private prepParams(statement: string, params: WlSQLiteParameters): any[] {

    const values: any[] = [];

    // get parameter names from the proc
    const paramNames: string[] = statement.match(this.paramRegex).map(name => name.substring(1));

    // loop through and build parameter array in the right order
    for (const name of paramNames) {
      if (isUndefined(params[name])) {
        throw new Error(`${name} parameter is undefined!`);
      }
      values.push(params[name]);
    }

    return values;
  }
}
