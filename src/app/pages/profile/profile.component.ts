import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  selectedImage: File;
  tempImage: any;

  constructor(public userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  updateUser(user: User) {
    this.user.name = user.name;

    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user)
      .subscribe( resp => {
        swal('Datos Guardados', 'La infomación se actualizó correctamente', 'success');
      });
  }

  imageSelect(file) {
    if (!file) {
      this.selectedImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0) {
      swal('Sólo Imágenes', 'El archivo no es una imágen', 'error');
      this.selectedImage = null;
      return;
    }

    this.selectedImage = file;

    const reader = new FileReader();

    const urlTempFile = reader.readAsDataURL(file);

    reader.onloadend = () => this.tempImage = reader.result;
  }

  changeImage() {
    this.userService.changeImage( this.selectedImage, this.user._id);
  }

}
