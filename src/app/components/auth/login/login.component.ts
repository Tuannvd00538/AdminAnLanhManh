import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  textError: any = null;

  async login(account: string, password: string) {
    await this.authService.login(account, password);
    this.textError = this.authService.textError;
  }

  ngOnInit() {
  }

}
