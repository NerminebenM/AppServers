import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// settings.service.ts
export interface Settings {
  language: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  fontSize: string;
}

// SettingsService
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsKey = 'app-settings';
  private settingsSubject: BehaviorSubject<Settings>;
  settings$;

  constructor() {
    const savedSettings = localStorage.getItem(this.settingsKey);
    const initialSettings: Settings = savedSettings ? JSON.parse(savedSettings) : {
      language: 'en',
      notificationsEnabled: false,
      darkMode: false,
      fontSize: 'medium'
    };
    this.settingsSubject = new BehaviorSubject<Settings>(initialSettings);
    this.settings$ = this.settingsSubject.asObservable();
    this.applySettings(initialSettings); // Apply settings when service is instantiated
  }

  updateSettings(settings: Settings) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    this.settingsSubject.next(settings);
    this.applySettings(settings);
  }

  // Method to apply settings
  applySettings(settings: Settings) {
    document.body.classList.remove('small-font-size', 'medium-font-size', 'large-font-size');

    const elements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, a, table, button, mat-button, mat-icon, .mat-mdc-card, .mat-mdc-card-content, .mat-mdc-form-field, .mat-mdc-header-cell, .mat-mdc-button-base, .mdc-button, mat-label'
    );
    elements.forEach(el => {
      el.classList.remove('small-font-size', 'medium-font-size', 'large-font-size');
    });
  }

  // Public getter for current settings
  getCurrentSettings(): Settings {
    return this.settingsSubject.value;
  }
}
