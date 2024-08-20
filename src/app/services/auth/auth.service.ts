import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../models/User.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {  
  private baseUrl = 'http://localhost:8080/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(userLogin: { username: string; password: string} ): Observable<any>{
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const body = JSON.stringify(userLogin);

    return this.http.post(`${this.baseUrl}`, body, { headers })
      .pipe(
        map((res: any) => {
          this.setToken(res.token);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  searchUserByName(name: String): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.baseUrl}/search?name=${name}`, {headers})
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
