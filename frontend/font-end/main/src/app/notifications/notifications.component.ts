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
  serverAddress: string = ''; // Pour stocker l'adresse du serveur
  alertMessage: string = ''; // Pour stocker le message de l'alerte
  alertEmail: string = ''; // Pour stocker l'email de l'alerte

  // Pour le formulaire d'alerte
  ipAddress: string = '';
  email: string = '';
  message: string = '';
  // Pour les messages d'erreur et de succès
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private notificationService: NotificationServiceService,
    private userService: UserService
  ) { }

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
        console.log('Notifications:', data); // Log data
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
        this.notificationService.updateUnreadNotificationsCount();
      },
      error => {
        console.error('Error marking notification as read:', error);
      }
    );
  }

  sendServerDownNotification(): void {
    if (!this.serverAddress) {
      console.error('Server address is required.');
      return;
    }

    const message = `The server ${this.serverAddress} is down after multiple ping attempts.`;
    const payload = {
      message: message,
      userId: this.userId,
      serverAddress: this.serverAddress
    };

    this.notificationService.sendServerStatusNotification(payload).subscribe(
      () => {
        console.log('Server status notification sent successfully');
        this.loadNotifications();
        this.serverAddress = '';
      },
      error => {
        console.error('Error sending server status notification:', error);
      }
    );
  }

  sendAlert(): void {
    if (!this.ipAddress || !this.email || !this.message) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.notificationService.createAlert(this.ipAddress, this.email, this.message).subscribe(
      response => {
        this.successMessage = 'Alert sent successfully.';
        this.errorMessage = ''; // Clear any previous errors
      },
      error => {
        this.successMessage = ''; // Clear any previous success messages
        console.error('Error details:', error); // Log error details for debugging

        if (error.error) {
          console.error('Error response body:', error.error); // Log the error response body
        }

        if (error.status === 400) {
          // Handle specific HTTP status code
          if (error.error === 'Server not found') {
            this.errorMessage = 'Server not found.';
          } else if (error.error === 'User email not found') {
            this.errorMessage = 'User email not found.';
          } else {
            this.errorMessage = 'Bad request. Please check the input data.';
          }
        } else {
          // Handle other errors
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}
