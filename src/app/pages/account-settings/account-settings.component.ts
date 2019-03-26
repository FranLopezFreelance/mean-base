import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public Settings: SettingsService ) { }

  ngOnInit() {
    this.setStorageCheck();
  }

  changeColor(url: string, theme: any) {
    this.setCheck(theme);
    this.Settings.applyTheme(url);
  }

  setCheck(theme: any) {
    const elements: any = document.getElementsByClassName('selector');
    for (const ref of elements) {
      ref.classList.remove('working');
    }
    theme.classList.add('working');
  }

  setStorageCheck() {
    const elements: any = document.getElementsByClassName('selector');
    const theme: string = this.Settings.accountSettings.theme;
    for (const ref of elements) {
      if ( ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
