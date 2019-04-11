import { Injectable, ErrorHandler } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadImageService } from '../uploadImage/upload-image.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public uploadImageService: UploadImageService,
    private toastr: ToastrService
  ) {
    this.loadFromStorage();
  }

  isLoged() {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadFromStorage()   {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveInStorage(id: string, token: string, user: User, menu: any) {
    this.user = user;
    this.token = token;
    this.menu = menu;

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  // Register
  createUser(user: User) {
    const url = URL_SERVICES + 'users';

    return this.http.post( url, user)
      .pipe(
        map( (resp: any) => {
          this.toastr.success('El Usuario se registró correctamente', 'Usuario Registrado');
          return resp.usuario;
        })
      );
  }

  // Gooogle Login
  loginGoogle( token: string ) {
    const url = URL_SERVICES + 'login/google';
    return this.http.post( url, { token } )
      .pipe(
        map( (resp: any) => {
          this.saveInStorage(resp.id, resp.token, resp.user, resp.menu);
          console.log(resp);
          return true;
        })
      );
  }

  // App Login
  login(user: User, rememberme: boolean = false) {

    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + 'login';

    return this.http.post( url, user)
      .pipe(
        map( (resp: any) => {
          this.saveInStorage(resp.id, resp.token, resp.user, resp.menu);
          return true;
        })
      );
  }

  logOut() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  updateUser(user: User) {
    const url = URL_SERVICES + 'users/' + user._id + '?token=' + this.token;

    return this.http.put( url, user).pipe(
      map( (resp: any) => {
        if (user._id === this.user._id) {
          const userDB: User = resp.user;
          this.saveInStorage(userDB._id, this.token, userDB, this.menu);
        }
        return true;
      })
    );
  }

  changeImage(file: File, id: string) {
    this.uploadImageService.uploadImage(file, 'users', id)
      .then( (resp: any) => {
        this.user.img = resp.user.img;
        this.saveInStorage(resp.id, this.token, resp.user, resp.menu);
        this.toastr.success('La imágen se actualizó correctamente', 'Imágen Actualizada');
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  loadUsers(from: number = 0) {
    const url = URL_SERVICES + 'users?from=' + from;
    return this.http.get(url);
  }

  searchUsers(key: string) {
    const url = URL_SERVICES + 'search/collection/users/' + key;
    return this.http.get(url).pipe(
      map( (resp: any) => resp.users )
    );
  }

  deleteUser(id: string) {
    const url = URL_SERVICES + 'users/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }

}
