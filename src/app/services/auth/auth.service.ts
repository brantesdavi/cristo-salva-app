import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {  
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(userLogin: { email: string; password: string} ): Observable<any>{

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    const body = JSON.stringify(userLogin);

    return this.http.post(this.baseUrl, body, { headers })
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
