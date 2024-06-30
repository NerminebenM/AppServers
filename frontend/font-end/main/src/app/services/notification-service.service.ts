import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}/notifications`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/read/${notificationId}`, {});
  }
}

export interface Notification {
  id: number;
  message: string;
  recipient: string;
  read: boolean;
}