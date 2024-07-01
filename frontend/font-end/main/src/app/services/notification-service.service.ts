import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  // Function to get auth token
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}/notifications`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/read/${notificationId}`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  sendServerStatusNotification(message: string, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/server?userId=${userId}`, { message }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }}
export interface Notification {
  id: number;
  message: string;
  recipient: string;
  read: boolean;
}
