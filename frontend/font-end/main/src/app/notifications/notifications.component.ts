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
      this.userId = this.userService.getUserId(); // Obtenez l'ID de l'utilisateur de manière synchrone
      this.loadNotifications();
    } catch (error) {
      console.error('Error while fetching user ID:', error);
      // Gérer l'erreur appropriée ici, par exemple, rediriger vers la page de connexion
    }
  }

  loadNotifications(): void {
    this.notificationService.getUserNotifications(this.userId).subscribe(
      data => {
        this.notifications = data;
      },
      error => {
        console.error('Error fetching notifications:', error);
        // Traitez l'erreur de manière appropriée, par exemple, affichez un message à l'utilisateur
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
        // Traitez l'erreur de manière appropriée
      }
    );
  }
}
