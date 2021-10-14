import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor( private http: HttpClient) {}

  /**
   * Base URL for api calls.
   */
  public baseUrl: string = 'api/words/';

  /**
   * Get method.
   */
  public get(route: string): Observable<any> {
    return this.http.get(this.baseUrl + route);
  }
}
