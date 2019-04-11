import { Component, OnInit } from '@angular/core';
import { UploadImageService, UserService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  selectedImage: File;
  tempImage: any;

  constructor(
    public uploadImageService: UploadImageService,
    public userService: UserService,
    public modalUploadService: ModalUploadService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  imageSelect(file) {
    if (!file) {
      this.selectedImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0) {
      this.selectedImage = null;
      return;
    }

    this.selectedImage = file;

    const reader = new FileReader();

    const urlTempFile = reader.readAsDataURL(file);

    reader.onloadend = () => this.tempImage = reader.result;
  }

  uploadImage() {
    this.uploadImageService.uploadImage(
      this.selectedImage,
      this.modalUploadService.model,
      this.modalUploadService.id
    ).then( (resp: any) => {
      if (resp.user) {
        if (resp.user._id === this.userService.user._id) {
          this.userService.user.img = resp.user.img;
          this.userService.saveInStorage(resp.user._id, this.userService.token, this.userService.user, this.userService.menu);
        }
      }
      this.modalUploadService.notifacation.emit(resp);
      this.toastr.success('La imágen se actualizó correctamente', 'Imágen Actualizada');
      this.hideModal();
    })
    .catch( err => {
      console.log('Error en la carga');
    });
  }

  hideModal() {
    this.selectedImage = null;
    this.tempImage = null;
    this.modalUploadService.hideModal();
  }

}
