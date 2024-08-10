import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private baseUrl = 'http://localhost:8081/notif';
  private unreadNotificationsCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar) {
    this.updateUnreadNotificationsCount();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserNotifications(userId: any): Observable<Notification[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}/notifications`, { headers }).pipe(
      tap(data => console.log('Fetched user notifications:', data)) // Log data
    );
  }

  markAsRead(notificationId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.baseUrl}/notifications/read/${notificationId}`, null, { headers }).pipe(
      tap(() => this.updateUnreadNotificationsCount())
    );
  }

  sendServerStatusNotification(payload: any): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.baseUrl}/notifications/server`, payload, { headers }).pipe(
      tap(() => this.updateUnreadNotificationsCount())
    );
  }
  getUnreadNotifications(userId: number): Observable<Notification[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}/notifications/unread`, { headers }).pipe(
      tap(data => console.log('Fetched unread notifications:', data)) // Log data
    );
  }

  updateUnreadNotificationsCount(): void {
    const userId = this.authService.getUserId(); // Assurez-vous que cette méthode existe
    this.getUnreadNotifications(userId).subscribe(notifications => {
      this.unreadNotificationsCount.next(notifications.length);
    });
  }

  getUnreadNotificationsCount(): Observable<number> {
    return this.unreadNotificationsCount.asObservable();
  }
  createAlert(ipAddress: string, email: string, message: string): Observable<string> {
    const headers = this.getAuthHeaders();
    const payload = { ipAddress, email, message };
    return this.http.post<string>(`${this.baseUrl}/alerts`, payload, { headers });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snack-bar-error']
    });
  }
}


export interface Notification {
  id: number;
  message: string;
  recipient: string;
  read: boolean;
}
