import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
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
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveInStorage(id: string, token: string, user: User) {
    this.user = user;
    this.token = token;

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Register
  createUser(user: User) {
    const url = URL_SERVICES + 'users';

    return this.http.post( url, user)
      .pipe(
        map( (resp: any) => {
          swal('Usuario Registrado!', user.email, 'success');
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
          this.saveInStorage(resp.id, resp.token, resp.user);
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
          this.saveInStorage(resp.id, resp.token, resp.user);
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

    this.router.navigate(['/login']);
  }

}
