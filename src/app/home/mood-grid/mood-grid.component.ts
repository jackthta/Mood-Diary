import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMoodDialogComponent } from 'src/app/modal/edit-mood-modal/edit-mood-dialog/edit-mood-dialog.component';

import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { DateService } from 'src/app/services/date/date.service';
import { MoodService } from 'src/app/services/mood/mood.service';

@Component({
  selector: 'app-mood-grid',
  templateUrl: './mood-grid.component.html',
  styleUrls: ['./mood-grid.component.scss']
})
export class MoodGridComponent implements OnInit {

  constructor(
    public databaseService: DatabaseService,
    public dialog: MatDialog,
    private dateService: DateService,
    private auth: AuthService,
    private moodService: MoodService
  ) { }

  ngOnInit(): void { }

  onEditSelectedMood(mood: any) {
    const modalRef = this.openModal(mood);

    modalRef.afterClosed().subscribe((result) => {

      // Complete edit if user made an edit.
      if (result) {
        const newData = this.moodService.generateMoodObject(result);

        if (this.auth.isAuthenticated()) {
          // Edit in RTDB.
          this.databaseService.editRTDBData(
            this.auth.getUserUID(),
            mood.key,
            newData
          )
            .then(() => this.databaseService.setRTDBData(this.auth.getUserUID())) // Grab new data from RTDB and set into Database Service.
        } else {
          // Edit in local storage.
          this.databaseService.editLocalStorageData(
            mood.key,
            newData
          )

          // Set new data from local storage into Database Service.
          this.databaseService.setLocalStorageData();
        }
      }
    });
  }

  openModal(mood: any) {
    return this.dialog.open(EditMoodDialogComponent, {
      width: '500px',
      height: '500px',
      data: mood
    });
  }

}
