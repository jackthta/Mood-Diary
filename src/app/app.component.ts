import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private databaseService: DatabaseService, private auth: AuthService) { }

  ngOnInit(): void {
    /* firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.auth.setUser(user);
        //this.databaseService.setRTDBData(this.auth.getUserUID());
      } else {
        // If new guest user, create user-mood object in local storage.
        if (!localStorage.getItem('user')) {
          let moodMap = new Map();
          let userMood = { moods: moodMap };

          // Set data in localStorage.
          localStorage.setItem('user', JSON.stringify(userMood));

          // Set data in DatabaseService for rest of components.
          this.databaseService.setData(userMood);
        } else {
          // Pre-existing guest user with a mood history, so populate database service with local storage data.
          this.databaseService.setLocalStorageData();
        }
      }
    }); */

    // If new guest user, create user-mood object in local storage.
    if (!localStorage.getItem('user')) {
      let moodMap = new Map();
      let userMood = { moods: moodMap };

      // Set data in localStorage.
      localStorage.setItem('user', JSON.stringify(userMood));

      // Set data in DatabaseService for rest of components.
      this.databaseService.setData(userMood);
    } else {
      // Pre-existing guest user with a mood history, so populate database service with local storage data.
      this.databaseService.setLocalStorageData();
    }

  }
}
