import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { Checkup } from 'src/app/_Models/check-up';
import { DrProfileComponent } from '../dr-profile/dr-profile.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defaultLongDateFormat } from 'ngx-bootstrap/chronos/locale/locale.class';
@Component({
  templateUrl: './check-ups-info-dialog.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CheckUpsInfoDialogComponent implements OnInit {
  public model: Checkup[];

  constructor(
    public dialogRef: MatDialogRef<DrProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serv: PatientService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    var u = this.data.checkup;
    console.log(u);
    this.model = u;
    for (let i in this.model) {
      if (this.model[i].checkupType == 1) this.model[i].checkupTypeName = 'رمد';
      else if (this.model[i].checkupType == 0)
        this.model[i].checkupTypeName = 'اخرى';
      else if (this.model[i].checkupType == 2)
        this.model[i].checkupTypeName = 'اوعية دموية';
      else if (this.model[i].checkupType == 3)
        this.model[i].checkupTypeName = 'ضغط دم';
      else if (this.model[i].checkupType == 4)
        this.model[i].checkupTypeName = 'كوليسترول';
      else if (this.model[i].checkupType == 5)
        this.model[i].checkupTypeName = 'كشف اسنان';
      if (this.model[i].status == 1) this.model[i].statusName = 'لم يتم بعد';
      else if (this.model[i].status == 2) this.model[i].statusName = 'تم';
    }

    console.log(this.model);
  }
}
