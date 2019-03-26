import { Injectable, Inject } from '@angular/core';
import {DOCUMENT as commonDOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  accountSettings: AccountSettings = {
    themeURL: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(commonDOCUMENT) private Document) {
    this.loadSettings();
  }

  saveSettings() {
    // Save Account Settings in Local Storage
    localStorage.setItem('account-settings', JSON.stringify(this.accountSettings));
  }

  loadSettings() {
    // Load Account Settings of Local Storage
    if (localStorage.getItem('account-settings')) {
      this.accountSettings = JSON.parse(localStorage.getItem('account-settings'));
      this.applyTheme(this.accountSettings.theme);
    }
  }

  applyTheme( theme: string) {
    const THEME_URL = `assets/css/colors/${theme}.css`;
    this.Document.getElementById('theme').setAttribute('href', THEME_URL );
    this.accountSettings.themeURL = THEME_URL;
    this.accountSettings.theme = theme;
    this.saveSettings();
  }
}

interface AccountSettings {
  themeURL: string;
  theme: string;
}

