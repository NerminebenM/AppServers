import { Component, Output, EventEmitter, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
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
  ngOnInit(): void {
  }
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  translatedText = '';

  constructor(public dialog: MatDialog, private translateService: TranslateService, private userService: UserService, private searchService: SearchService, private appRef: ApplicationRef) {
    console.log('SearchService injected:', this.searchService);

  }
  handleLogoClick() {
     console.log('Logo cliqué');
  }
  handleMenuButtonClick() {
    this.toggleMobileNav.emit();
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
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

}
