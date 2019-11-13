import { Component, OnInit } from '@angular/core';
import { UrlResolver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users = ['timl', 'timh', 'johan']
  username: String;
  password: String;
  loginError = false;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  login(username, password) {
    if (this.users.indexOf(username) > -1) {
      this.loginError = false;
      this.router.navigate(['/demo'])
    } else {
      this.loginError = true;
    }
  }
}
