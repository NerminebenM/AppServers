import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getTotalServers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/server/count`);
  }

  getServersByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/server/countByStatus?status=${status}`);
  }
}
