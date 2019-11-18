import { Injectable, Inject } from '@angular/core';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, ) { }

  textError: any = null;

  async login(account: string, password: string) {
    const that = this;
    if (password.length == 0 || account.length == 0) {
      that.textError = "All field is require.";
    } else {
      that.textError = null;
      await axios.post(`${environment.api_url}/api/auth/admin/signin`, {
        account: account,
        password: password
      }).then(function (response) {
        that.textError = null;
        that.localStorage.setItem("token", response.data.accessToken);
        that.window.location.href = '/';
        return true;
      }).catch(function (error) {
        console.log(error);
        
        that.textError = error.response.data.message;
      });
    }
    return false;
  }

  logout(): any {
    this.localStorage.removeItem("token");
    this.window.location.href = '/auth/login';
  }

  getToken(): any {
    return this.localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
