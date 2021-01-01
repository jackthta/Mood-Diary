import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DateService } from 'src/app/services/date/date.service';

import { Moods } from 'src/app/interfaces/mood';

@Component({
  selector: 'app-edit-mood-dialog',
  templateUrl: './edit-mood-dialog.component.html',
  styleUrls: ['./edit-mood-dialog.component.scss']
})
export class EditMoodDialogComponent implements OnInit {

  moods = Moods;
  mood_selected = this.data.value.mood;

  constructor(
    public dialogRef: MatDialogRef<EditMoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dateService: DateService
  ) { }

  ngOnInit(): void { }

  onCancel() {
    this.dialogRef.close();
  }

}
