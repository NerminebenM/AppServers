import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/SettingsService';


interface Settings {
  language: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  fontSize: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings = {
    language: 'fr', // Default language
    notificationsEnabled: false,
    darkMode: false,
    fontSize: 'medium'
  };

  constructor(private settingsService: SettingsService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadSettings();
    this.translate.use(this.settings.language); // Set initial language
  }

  loadSettings(): void {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
      this.translate.use(this.settings.language); // Use stored language
    }
  }

  updateSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
    this.settingsService.updateSettings(this.settings);
    this.translate.use(this.settings.language); // Update language
  }


}
