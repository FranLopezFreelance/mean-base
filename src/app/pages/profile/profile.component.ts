import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  selectedImage: File;
  tempImage: any;

  constructor(
    public userService: UserService,
    private toastr: ToastrService
  ) {
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
        this.toastr.success('La información se actualizó correctamente', 'Información Actualizada');
      },
      err => {
        console.log(err);
        this.toastr.error('Ese Email ya existe', 'Error');
      });
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

  changeImage() {
    this.userService.changeImage( this.selectedImage, this.user._id);
  }

}
