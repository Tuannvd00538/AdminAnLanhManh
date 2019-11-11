import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { WINDOW } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(@Inject(WINDOW) private window: Window, 
    private authService: AuthService) { }


  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.window.location.href = '/auth/login';
    }
    return this.authService.isLoggedIn();
  }
}
