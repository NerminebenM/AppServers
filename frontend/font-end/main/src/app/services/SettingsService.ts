import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Settings {
  language: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  fontSize: string;
  theme: string;
}

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
      notificationsEnabled: true,
      darkMode: false,
      fontSize: 'medium',
      theme: 'default-theme'
    };
    this.settingsSubject = new BehaviorSubject<Settings>(initialSettings);
    this.settings$ = this.settingsSubject.asObservable();
    this.applySettings(initialSettings);
  }

  updateSettings(settings: Settings): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    this.settingsSubject.next(settings);
    this.applySettings(settings);
  }

  private applySettings(settings: Settings): void {
    document.body.classList.toggle('dark-mode', settings.darkMode);

    // Removing old font size classes
    document.body.classList.remove('small-font-size', 'medium-font-size', 'large-font-size');
    // Adding new font size class
    document.body.classList.add(`${settings.fontSize}-font-size`);

    // Applying theme
    document.body.classList.remove('default-theme', 'dark-theme', 'light-theme');
    document.body.classList.add(settings.theme);
  }

  getCurrentSettings(): Settings {
    return this.settingsSubject.value;
  }
}
