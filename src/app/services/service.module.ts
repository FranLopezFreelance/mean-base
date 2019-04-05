import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageService } from './uploadImage/upload-image.service';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuard
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard,
    UploadImageService
  ]
})
export class ServiceModule { }
