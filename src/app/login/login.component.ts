import { Component, OnInit } from '@angular/core';
import { UrlResolver } from '@angular/compiler';
import { Router } from '@angular/router';
import { BackendMockService } from 'app/backend-mock.service';

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

  constructor(
    public mock: BackendMockService, 
    private router: Router) { }

  ngOnInit() {
  }

  login(username, password) {
    if (this.users.indexOf(username) > -1) {
      this.loginError = false;
      this.mock.user = username;
      this.router.navigate(['/demo'])
    } else {
      this.loginError = true;
    }
  }

  start() {
    this.router.navigate(['/demo'])
  }
}
