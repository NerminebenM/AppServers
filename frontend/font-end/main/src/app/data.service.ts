import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8081'; 
  constructor(private http: HttpClient) { }

  getLogData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
