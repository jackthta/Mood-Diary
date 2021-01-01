import { Injectable } from '@angular/core';
import 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/database';

import { AuthService } from '../auth/auth.service';
import { MoodService } from '../mood/mood.service';

import { Mood } from '../../interfaces/mood';
import { DateService } from '../date/date.service';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  DATA = null;

  constructor(
    private RTDB: AngularFireDatabase,
    private auth: AuthService,
    private moodService: MoodService,
    private dateService: DateService
  ) { }

  setLocalStorageData() {
    this.DATA = JSON.parse(localStorage.getItem('user'));
  }

  getLocalStorageData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async setRTDBData(uid: string) {
    const res = await this.RTDB.database.ref(uid).once('value');
    this.DATA = res.val();
  }

  getRTDBData(uid: string) {
    return new Promise<any>((resolve, reject) => {
      this.RTDB.database.ref(uid).once('value')
        .then(
          (res) => resolve(res.val()),
          (err) => reject(err)
        );
    });
  }

  getLastCheckedInDate() {
    return +(Object.keys(this.DATA.moods).pop());
  }

  setData(data: any) {
    this.DATA = data;
  }

  editRTDBData(uid: string, date: number, data: Mood) {
    return this.RTDB.database.ref(`${uid}/moods/${date}`)
      .set(data);
  }

  editLocalStorageData(date: number, data: Mood) {
    // Get user object from localStorage.
    let user = JSON.parse(localStorage.getItem('user'));

    // Update date with new data.
    user.moods[date] = data;

    // Update localStorage.
    localStorage.setItem('user', JSON.stringify(user));
  }

  // This function was intentionally made to be re-useable hence the need for grabbing data literally instead of using what's already cached.
  transferLocalStorageDBToRealTimeDB() {
    let moods = this.RTDB.database.ref(`${this.auth.getUserUID()}/moods/`);
    function appendLocalStorageDataToRealTimeDB(data: any) {
      // For every mood entry, append to real time database @ ref 'moods'.
      for (let mood in data.moods) {
        moods.child(mood).set(data.moods[mood]);
      }
    };

    // Grab Local Storage data.
    let LocalStorageData = this.getLocalStorageData();

    // Append Local Storage data into Real Time Database.
    appendLocalStorageDataToRealTimeDB(LocalStorageData);

    //xTODO: Clear user's mood collection instead, so mood-prompt doesn't have to re-make user object.
    // Remove Local Storage data.
    //delete localStorage['user'];

    // Set new data in service.
    moods.once('value').then((snapshot) => this.setData(snapshot.val()));
  }

  fillMissedDaysInRTDB(lastCheckInDate: Date, numDaysSinceLastCheckIn: number) {

    for (let ctr = 1; ctr < numDaysSinceLastCheckIn; ctr++) {
      lastCheckInDate = this.dateService.addDays(lastCheckInDate, 1);

      //xTODO: Create filler placeholder mood to replace 'neutral' to show user that they missed that day.
      this.editRTDBData(
        this.auth.getUserUID(),
        new Date(lastCheckInDate).getTime(),
        this.moodService.generateMoodObject('neutral')
      );
    }
  }

  fillMissedDaysInLocalStorage(lastCheckInDate: Date, numDaysSinceLastCheckIn: number) {

    for (let ctr = 1; ctr < numDaysSinceLastCheckIn; ctr++) {
      lastCheckInDate = this.dateService.addDays(lastCheckInDate, 1);

      //xTODO: Create filler placeholder mood to replace 'neutral' to show user that they missed that day.
      this.editLocalStorageData(
        new Date(lastCheckInDate).getTime(),
        this.moodService.generateMoodObject('neutral')
      );
    }
  }
}

// xTODO: [IDEA] After that, maybe add custom moods? OR MORE MOODS if custom moods are too difficult. Custom moods AKA <input>.
// xTODO: STYLE!
