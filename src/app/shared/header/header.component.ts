import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  search(text: string) {
    this.router.navigate(['/search/' + text]);
  }

}
