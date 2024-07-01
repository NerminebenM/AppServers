// app.component.ts

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  isNightMode: boolean = false;

  constructor(private translate: TranslateService) {
    // Set the default language (e.g., English)
    translate.setDefaultLang('en');

    // Set the preferred language (e.g., based on user selection or browser language)
    const preferredLanguage = 'en'; // Replace this with the actual logic to determine the preferred language
    translate.use(preferredLanguage);

    // Subscribe to the language change event
    translate.onLangChange.subscribe((event: any) => {
      this.title = event.translations[event.lang]['APPLICATION'];
    });
  }

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    const body = document.getElementsByTagName('body')[0];
    if (this.isNightMode) {
      body.classList.add('night-mode');
    } else {
      body.classList.remove('night-mode');
    }
  }
}
