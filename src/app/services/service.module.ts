import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageService } from './uploadImage/upload-image.service';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuard
} from './service.index';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

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
    UploadImageService,
    ModalUploadService
  ]
})
export class ServiceModule { }
