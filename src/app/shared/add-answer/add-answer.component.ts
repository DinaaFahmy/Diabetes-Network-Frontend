import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  QuestionsComponent,
  DialogData,
} from '../questions/questions.component';
import { ProfileQuestionsComponent } from 'src/app/profiles/profile-questions/profile-questions.component';
import { MypostsComponent } from '../profile/myposts/myposts.component';

@Component({
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css'],
})
export class AddAnswerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<
      QuestionsComponent,MypostsComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
