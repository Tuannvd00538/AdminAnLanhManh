import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit() {

  }
  title = 'AdminAnLanhManh';
  isLogin: any = this.authService.isLoggedIn();

  logout() {
    this.authService.logout();
  }
}
