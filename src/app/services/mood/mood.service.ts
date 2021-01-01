import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor() { }

  generateMoodObject(mood: string) {
    return {
      mood,
      moodColor: this.getMoodColor(mood)
    }
  }

  getMoodColor(mood: string) {
    //xTODO: Change return values to hex values to display actual color for mood-grid.
    switch (mood.toUpperCase()) {
      case "POSITIVE":
        return "GREEN";
      case "NEUTRAL":
        return "GREY";
      case "NEGATIVE":
        return "RED";
    }

    console.log("Error: undefined mood value in mood-prompt component - getMoodColor function");
    return "#000"; // Return black to make it obvious in the grid.
  }
}
