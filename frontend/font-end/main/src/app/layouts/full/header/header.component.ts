import { Component, Output, EventEmitter, Input, ViewEncapsulation, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  homeRoute: string = '/';
  searchQuery: string = '';
  searchResults: any[] = [];
  profilePhotoUrl: string | null = '/assets/images/profile/user-1.jpg';
  isNightMode: boolean = false; // Variable pour suivre l'état du mode nuit
  unreadNotifications: number = 0;
  notifications: any[] = [];
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  showFiller = false;
  translatedText = '';

  constructor(
    public dialog: MatDialog,
    private translateService: TranslateService,
    private userService: UserService,
    private notificationService: NotificationServiceService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userService.profilePhoto$.subscribe(photo => {
      this.profilePhotoUrl = photo || '/assets/images/profile/user-1.jpg';
    });

    this.userService.getCurrentUser().subscribe(user => {
      if (user.photo) {
        this.profilePhotoUrl = user.photo;
      }
      this.loadUnreadNotifications(); // Charger les notifications non lues

      // Écouter les changements du nombre de notifications non lues
      this.notificationService.getUnreadNotificationsCount().subscribe(count => {
        this.unreadNotifications = count;
      });

      this.loadNotifications(); // Charger toutes les notifications
    });
  }

  loadUnreadNotifications(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.notificationService.getUnreadNotifications(user.id).subscribe(
        data => {
          console.log('Notifications non lues:', data);
          this.unreadNotifications = data.length;
        },
        error => {
          console.error('Error fetching unread notifications:', error);
        }
      );
    });
  }

  loadNotifications(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.notificationService.getUserNotifications(user.id).subscribe(
        data => {
          console.log('Toutes les notifications:', data);
          this.notifications = data;
        },
        error => {
          console.error('Error fetching notifications:', error);
        }
      );
    });
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  markAsRead(): void {
    this.notifications = [];
    this.unreadNotifications = 0;
  }

  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
    this.unreadNotifications--;
  }

  handleLogoClick(): void {
    console.log('Logo cliqué');
  }

  handleMenuButtonClick(): void {
    this.toggleMobileNav.emit();
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  toggleDayNightMode(): void {
    this.isNightMode = !this.isNightMode;
    if (this.isNightMode) {
      this.renderer.addClass(document.body, 'night-mode');
    } else {
      this.renderer.removeClass(document.body, 'night-mode');
    }
  }
}
