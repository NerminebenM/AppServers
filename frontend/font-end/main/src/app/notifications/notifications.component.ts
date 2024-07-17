import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Notification, NotificationServiceService } from '../services/notification-service.service';

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

  sendServerDownNotification(): void {
    const payload = {
      message: 'Server is down',
      userId: this.userId,
      serverId: 1 // Remplacez par l'ID réel du serveur concerné
    };

    this.notificationService.sendServerStatusNotification(payload).subscribe(
      () => {
        console.log('Server status notification sent successfully');
        // Vous pouvez mettre à jour les notifications ici si nécessaire
      },
      error => {
        console.error('Error sending server status notification:', error);
      }
    );
  }

  sendWebSocketNotification(): void {
    const notification: Notification = {
      id: 0, // ID à gérer comme nécessaire
      message: 'New WebSocket Notification',
      recipient: 'user2', // Utilisateur cible
      read: false
    };

    this.notificationService.sendWebSocketNotification(notification);
  }

}
