import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { environment } from '../environments/environment';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    @Inject(WINDOW) private window: Window
  ) { }

  API_GETME = `${environment.api_url}/api/auth/me`;
  token: any = this.localStorage.getItem('token');
  adminProfile: any = null;

  public getMe: Function = async () => {
    const that = this;
    axios.get(that.API_GETME, { headers: { Authorization: that.token } }).then(function (response) {
      that.adminProfile = response.data.data;
    }).catch(function (error) {
      that.localStorage.clear();
      that.window.location.href = '/auth/login';
      console.log(error);
    });
  }

  ngOnInit() {

    if (this.token == null) {
      // window.location.href = '/auth/login';
    } else {
      this.getMe();
    }

  }
  title = 'AdminAnLanhManh';
  isLogin: any = this.authService.isLoggedIn();

  logout() {
    this.authService.logout();
  }
}
