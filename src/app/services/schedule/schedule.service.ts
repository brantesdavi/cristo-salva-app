import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { Schedule } from '../../models/Schedule.Interface';
import { catchError, map, Observable, of } from 'rxjs';
import { error } from 'console';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private baseUrl = 'http://localhost:8080/schadule';
  private tokenKey = 'token';


  constructor(private http: HttpClient, private localStorageService: LocalstorageService) {}
  

  createSchedule(schedule: Schedule): Observable<{ success: boolean; data?: Schedule }>{
    
    const token = this.getToken();
    const userId = this.localStorageService.getUserId()

    if(!token){     
      console.error('Usuário não logado ou ID não encontrado');
      return of(); // Interrompe a requisição se o userId for null

    }
    
    const headers = this.getHeaders(token);
    const scheduleWithUserId = { ...schedule, createdBy: userId };

    return this.http.post<Schedule>(this.baseUrl, scheduleWithUserId, { headers }).pipe(
      map((data) => ({ success: true, data })),  // Se a criação for bem-sucedida, retorna success: true e os dados criados
      catchError((error) => of({ success: false }))  // Se ocorrer um erro, retorna success: false
    );
  }

  listScheduleByUser(page: number, size: number): Observable<Schedule[]> {
  
    const token = this.localStorageService.getToken();
    const userId = this.localStorageService.getUserId();

    if(!token || !userId){    
      console.error('Usuário não logado ou token não encontrado');
      return of([]); // Interrompe a requisição se o userId for null

    }

    const headers = this.getHeaders(token);
  
    return this.http.get<{ content: Schedule[], page: any }>(`${this.baseUrl}/user/${userId}?page=${page}&size=${size}`, { headers }).pipe(
      map((res) => res.content),
      catchError((error) => {
        console.error('Erro ao buscar os agendamentos do usuário', error);
        return of([]);
      })
    );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {      
      return this.localStorageService.getToken()
    } else {
      return null;
    }
  }

  getHeaders(token: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}` 
    })

    return headers
  }
  
    
}
