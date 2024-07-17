import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private baseUrl = 'http://localhost:8081/api/notif';
  private stompClient: Client;

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8081/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
      }
    });
    this.stompClient.activate();
  }

  getUserNotifications(userId: any): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}/notifications`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/read/${notificationId}`, null);
  }

  sendServerStatusNotification(payload: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/server`, payload);
  }

  sendWebSocketNotification(notification: Notification): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/application',
        body: JSON.stringify(notification),
      });
    }
  }
}

export interface Notification {
  id: number;
  message: string;
  recipient: string;
  read: boolean;
}
