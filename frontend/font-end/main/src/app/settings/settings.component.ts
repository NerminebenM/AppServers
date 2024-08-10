import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Settings, SettingsService } from '../services/SettingsService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(private settingsService: SettingsService, private translate: TranslateService) {
    this.settings = this.settingsService.getCurrentSettings();
  }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(newSettings => {
      this.settings = newSettings;
      this.translate.use(newSettings.language); // Set initial language
    });
  }

  updateSettings(): void {
    this.settingsService.updateSettings(this.settings);
  }
}
