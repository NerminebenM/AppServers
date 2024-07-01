import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationServiceService, Notification } from '../services/notification-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  userId: number;

  constructor(private notificationService: NotificationServiceService, private userService: UserService) { }

  ngOnInit(): void {
    try {
      this.userId = this.userService.getUserId();
      this.loadNotifications();
    } catch (error) {
      console.error('Error while fetching user ID:', error);
    }
  }

  loadNotifications(): void {
    this.notificationService.getUserNotifications(this.userId).subscribe(
      data => {
        this.notifications = data;
      },
      error => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(
      () => {
        this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
      },
      error => {
        console.error('Error marking notification as read:', error);
      }
    );
  }

  // Méthode pour envoyer une notification d'état de serveur
  sendServerStatusNotification(message: string): void {
    this.notificationService.sendServerStatusNotification(message, this.userId).subscribe(
      () => {
        console.log('Server status notification sent successfully');
      },
      error => {
        console.error('Error sending server status notification:', error);
      }
    );
  }
}
