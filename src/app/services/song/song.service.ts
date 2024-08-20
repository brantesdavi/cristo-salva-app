import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../../models/Song.interface';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({ providedIn: 'root' })
export class SongService {
  private baseUrl = 'http://localhost:8080/songs';

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {}

  getAllSongs(page: number, size: number, options?: { headers?: { Authorization: string } }): Observable<Song[]> {
    const url = `${this.baseUrl}?page=${page}&size=${size}`;
    return this.http.get<Song[]>(url, options || {}); 
  }

  getSugestions(query: string): Observable<Song[]> {
    const token = this.localStorage.getToken();  // Pegando o token do localStorage
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`  // Adicionando o token no header
    });
    const url = `${this.baseUrl}/suggestions?query=${query}&page=0&size=3`;
    return this.http.get<Song[]>(url, { headers });
  }

  search(query: string, options?: { headers?: { Authorization: string } }): Observable<Song[]>{
    return this.http.get<Song[]>(`${this.baseUrl}/suggestions?query=${query}&page=0&size=3`);
  }

  getById(id: String, options?: { headers?: { Authorization: string } }): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/${id}`, options);
  }
}
