
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      // User is not authenticated, go to login page.
      this.router.navigateByUrl('/login');
      return false;
    } else {
      // User is logged in, go to home.
      this.router.navigateByUrl('/home');
      return true;
    }
  }
}
