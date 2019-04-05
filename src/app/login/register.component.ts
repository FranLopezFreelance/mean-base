import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls : ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formModel: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  passValidate(p: string, p2: string) {

    return ( group: FormGroup ) => {

      const pass = group.controls[p].value;
      const pass2 = group.controls[p2].value;

      if (pass === pass2) {
        return null;
      }

      return {
        equal: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.formModel = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl( null, [ Validators.required, Validators.email ]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.passValidate('password', 'password2') });
  }

  registerUser() {
    if ( this.formModel.invalid ) {
      return;
    }
    if ( !this.formModel.value.conditions ) {
      // swal('Importante', 'Debes aceptar los Términos y Condiciones', 'warning');
      return;
    }

    const user = new User(
      this.formModel.value.name,
      this.formModel.value.email,
      this.formModel.value.password
    );

    this.userService.createUser( user )
      .subscribe( resp => this.router.navigate(['/login']));
  }

}
