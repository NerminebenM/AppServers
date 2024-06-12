/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'APPLICATION';
}
*/
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string;

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
}
