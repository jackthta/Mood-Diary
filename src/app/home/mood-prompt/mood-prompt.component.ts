import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'firebase/auth';
import * as firebase from 'firebase/app';

import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { UserService } from 'src/app/services/user/user.service';
import { MoodService } from 'src/app/services/mood/mood.service';

import { Moods } from '../../interfaces/mood';

@Component({
  selector: 'app-mood-prompt',
  templateUrl: './mood-prompt.component.html',
  styleUrls: ['./mood-prompt.component.scss']
})
export class MoodPromptComponent implements OnInit {

  moods = Moods;
  mood_selected = null;

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private auth: AuthService,
    private userService: UserService,
    private moodService: MoodService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    const moodData = this.moodService.generateMoodObject(this.mood_selected);

    // Push into either local storage or RTDB depending on auth.
    if (this.auth.isAuthenticated()) {
      // Push into user's mood "Map" in RTDB.
      this.databaseService.editRTDBData(this.auth.getUserUID(), Date.now(), moodData);
    } else {
      // Push into LocalStorage's moods Map.
      this.databaseService.editLocalStorageData(Date.now(), moodData);
    }

    // Traverse router into grid page.
    this.router.navigateByUrl('mood-grid');
  }



}
