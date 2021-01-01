import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  showMoodOnDate(timestamp: string, mood: string) {
    return `Felt ${mood.toLowerCase()} on ${this.formatDate(timestamp)}`;
  }

  formatDate(timestamp: string) {
    const date = new Date(+timestamp);

    let dateString = this.getMonthString(date.getMonth()) + " " + date.getDate().toString() + ", " + date.getFullYear().toString();

    return dateString;
  }

  getMonthString(monthNum: number) {

    switch (monthNum) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }

    return "Error in getMonthString() function";
  }

  getDaysSinceLastCheckedIn(lastCheckIn: number | Date) {
    let today: any = new Date();
    lastCheckIn = new Date(lastCheckIn);
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const lastDayCheckedIn = Date.UTC(lastCheckIn.getFullYear(), lastCheckIn.getMonth(), lastCheckIn.getDate());
    today = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    
    return Math.floor((today - lastDayCheckedIn) / MS_PER_DAY);
  }

  addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days);
    return date;
  }

}
