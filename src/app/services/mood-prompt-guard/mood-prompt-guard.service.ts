import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { DateService } from '../date/date.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MoodPromptGuardService {

  constructor(
    private auth: AuthService,
    private databaseService: DatabaseService,
    private userService: UserService,
    private router: Router,
    private dateService: DateService
  ) { }

  canActivate(): boolean {
    // If user has checked in today, route to mood-grid page.
    if (this.auth.isAuthenticated()) {
      this.databaseService.setRTDBData(this.auth.getUserUID())
        .then(() => {
          // If user checked in today, move to mood-grid.
          if (this.userService.hasCheckedIn(this.databaseService.DATA.moods)) {
            this.router.navigateByUrl('mood-grid');
          } else {
            // If user broke streak, fill missed days with placeholders.
            if (this.brokeStreak()) {
              const lastCheckInDate = this.databaseService.getLastCheckedInDate();

              this.databaseService.fillMissedDaysInRTDB(
                new Date(lastCheckInDate),
                this.dateService.getDaysSinceLastCheckedIn(lastCheckInDate)
              )
            }
          }
        });
    } else {
      // User is a guest, grab local storage data.
      this.databaseService.setLocalStorageData();

      // If user checked in today, move to mood-grid.
      if (this.userService.hasCheckedIn(this.databaseService.DATA.moods)) {
        this.router.navigateByUrl('mood-grid');
      } else {
        // If user broke streak, fill missed days with placeholders.
        if (this.brokeStreak()) {
          const lastCheckInDate = this.databaseService.getLastCheckedInDate();

          this.databaseService.fillMissedDaysInLocalStorage(
            new Date(lastCheckInDate),
            this.dateService.getDaysSinceLastCheckedIn(lastCheckInDate)
          )
        }

      }
    }

    return true;
  }

  brokeStreak() {
    return this.dateService.getDaysSinceLastCheckedIn(
      this.databaseService.getLastCheckedInDate()
    ) > 1;
  }

}
