import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WLHttpParams } from './types';

@Injectable({
  providedIn: 'root',
})
export class WlApiService {
  constructor( private http: HttpClient) {}

  /**
   * Base URL for api calls.
   */
  public baseUrl: string = 'api/words/';

  /**
   * Get method.
   */
  public get(route: string, params?: WLHttpParams): Observable<any> {
    return this.http.get(this.baseUrl + route, { params: params });
  }

  /**
   * Post method.
   */
  public post(route: string, body: any, params?: WLHttpParams): Observable<any> {
    return this.http.post(this.baseUrl + route, JSON.stringify(body));
  }
}
