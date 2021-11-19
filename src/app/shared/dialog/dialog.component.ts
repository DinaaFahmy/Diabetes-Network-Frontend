import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EditProfileComponent,
  DialogData,
} from '../profile/edit-profile/edit-profile.component';
import { patientEditModel } from 'src/app/_Models/PatienttEditModel';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DialogComponent implements OnInit {
  value: any;
  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(v) {
    var k: string = this.data.value;
    this.data.patient[k] = v;
  }
  ngOnInit(): void {
    var k: string = this.data.value;
    this.value = this.data.patient[k];
  }
}
