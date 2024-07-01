import { Component, Output, EventEmitter, Input, ViewEncapsulation, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';
import { ApplicationRef } from '@angular/core';

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
    private searchService: SearchService,
    private translate: TranslateService,
    private appRef: ApplicationRef,
    private renderer: Renderer2 // Injection du Renderer2
  ) {
    console.log('TranslateService injected:', this.translateService);
  }

  ngOnInit(): void {
    this.userService.profilePhoto$.subscribe(photo => {
      this.profilePhotoUrl = photo || '/assets/images/profile/user-1.jpg';
    });

    this.userService.getCurrentUser().subscribe(user => {
      if (user.photo) {
        this.profilePhotoUrl = user.photo;
      }
    });
  }

  handleLogoClick() {
    console.log('Logo cliqué');
  }

  handleMenuButtonClick() {
    this.toggleMobileNav.emit();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  search(keyword: string): any[] {
    const results: any[] = [];

    this.appRef.components.forEach((component) => {
      const componentInstance = component.instance;
      // Vérifiez ici les propriétés pertinentes pour la recherche
      // Par exemple, si vous recherchez dans une propriété `title`
      if (componentInstance.hasOwnProperty('title')) {
        const title = componentInstance['title'];
        // Vérifiez si le titre contient le terme de recherche
        if (title.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({ title: title, component: component });
        }
      }
    });

    return results;
  }
 
  toggleDayNightMode() {
    this.isNightMode = !this.isNightMode;
    console.log('Night mode:', this.isNightMode);
    if (this.isNightMode) {
      this.renderer.addClass(document.body, 'night-mode');
      console.log('Added night-mode class');
    } else {
      this.renderer.removeClass(document.body, 'night-mode');
      console.log('Removed night-mode class');
    }
  }}
