import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MoodGridGuardService {

  constructor(
    private auth: AuthService,
    private databaseService: DatabaseService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // Grab data from localStorage or RTDB depending on auth.
    if (this.auth.isAuthenticated()) {
      // User is authenticated, grab RTDB data.
      this.databaseService.setRTDBData(this.auth.getUserUID())
        .then(() => {
          // If user hasn't checked in, move to mood-prompt.
          if (!this.userService.hasCheckedIn(this.databaseService.DATA.moods)) {
            this.router.navigateByUrl('home');
          }
        });
    } else {
      // User is a guest, grab local storage data.
      this.databaseService.setLocalStorageData();

      // If user hasn't checked in, move to mood-prompt.
      if (!this.userService.hasCheckedIn(this.databaseService.DATA.moods)) {
        this.router.navigateByUrl('home');
      }
    }

    return true;
  }
}
