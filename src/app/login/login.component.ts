import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    // Rememberme
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.rememberme = true;
    } else {
      this.email = '';
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '421737697713-kju8osm4q17me8flqkgvn3t3ulffi098.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btn-google'));

    });
  }

  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard');
    });
  }

  ingresar( form: NgForm ) {
    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);
    this.userService.login( user, form.value.rememberme)
    .subscribe(
      resp => {
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

}
