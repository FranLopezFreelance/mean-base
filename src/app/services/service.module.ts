import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageService } from './uploadImage/upload-image.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  HospitalService,
  DoctorService,
  LoginGuard,
  AdminGuard
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    SettingsService,
    SharedService,
    SidebarService,
    UploadImageService,
    ModalUploadService,
    UserService,
    HospitalService,
    DoctorService
  ]
})
export class ServiceModule { }
