import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  rpp: number = 5;
  page: number = 1;
  pages: number = 0;
  total: number = 0;

  pagination: boolean = true;
  loading: boolean = true;

  constructor(
    public userService: UserService,
    public modalUploadService: ModalUploadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.modalUploadService.notifacation
      .subscribe(resp => this.loadUsers());
  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from)
      .subscribe( (resp: any)  => {
        this.total = resp.total;
        this.users = resp.users;
        this.pages = Math.ceil(this.total / this.rpp);
        this.pagination = true;
        this.loading = false;
      });
  }

  changeFrom(valFrom: number, valPage: number ) {
    const from = this.from + valFrom;

    if (from < 0) {
      return;
    }

    if (from >= this.total) {
      return;
    }

    this.from += valFrom;
    this.page += valPage;
    this.loadUsers();
  }

  searchUser(key: string) {
    if (key.length <= 0) {
      this.loadUsers();
      return;
    }
    this.pagination = false;
    this.loading = true;
    this.userService.searchUsers(key)
      .subscribe( (users: User[])  => {
        this.users = users;
        if (users.length === 0) {
          this.users = null;
        }
        this.loading = false;
      });
  }

  deleteUser(user: User) {
    if (user._id === this.userService.user._id) {
      return;
    }
    this.userService.deleteUser(user._id)
      .subscribe( resp  => {
        this.from = 0;
        this.page = 1;
        this.loadUsers();
        this.toastr.success('El Usuario se eliminó correctamente', 'Usuario Eliminado');
      });
  }

  saveUser(user: User) {
    this.userService.updateUser(user)
      .subscribe( resp => {
        this.toastr.success('El Usuario se actualizó correctamente', 'Usuario Actualizado');
      });
  }

}
