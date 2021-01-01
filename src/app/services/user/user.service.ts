import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isToday(date: Date) {
    const today = new Date();

    return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
  }

  hasCheckedIn(history: any) {
    // Get last entry from history. It should be the last time user checked in.
    let lastEntry = Array.from(Object.keys(history)).pop();

    return this.isToday(new Date(+lastEntry));
  }
}
