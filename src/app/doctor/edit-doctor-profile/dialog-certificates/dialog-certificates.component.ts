import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  DialogData2,
  EditDoctorProfileComponent,
} from '../edit-doctor-profile.component';

@Component({
  selector: 'app-dialog-certificates',
  templateUrl: './dialog-certificates.component.html',
  styleUrls: ['./dialog-certificates.component.css'],
})
export class DialogCertificatesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditDoctorProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
