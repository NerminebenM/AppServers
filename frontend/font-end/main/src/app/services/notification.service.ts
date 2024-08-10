import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  getUserNotifications(userId: any) {
    throw new Error('Method not implemented.');
  }
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private snackBar: MatSnackBar) {
    this.notifier = notifierService;
  }

  onDefault(message: string): void {
    this.notifier.notify(Type.DEFAULT, message);
  }

  onSuccess(message: string): void {
    this.notifier.notify(Type.SUCCESS, message);
  }

  onInfo(message: string): void {
    this.notifier.notify(Type.INFO, message);
  }

  onWarning(message: string): void {
    this.notifier.notify(Type.WARNING, message);
  }

  onError(message: string): void {
    this.notifier.notify(Type.ERROR, message);
  }
  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snack-bar-error']
    });
  }
}

enum Type {
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
};
