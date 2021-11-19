import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { DrProfileComponent } from '../dr-profile/dr-profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './tests-dialog-info.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TestsDialogInfoComponent implements OnInit {
  type1: any;
  type2: any;
  AC: any;
  id: any;
  medication: any;
  constructor(
    public dialogRef: MatDialogRef<DrProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serv: PatientService,
    public route: ActivatedRoute,
    private tokserv: TokenService
  ) {
    this.id = this.data.id;
  }

  ngOnInit(): void {
    if (this.tokserv.getRole() == 'Doctor') {
      this.serv.getTestsfordoc(this.id, 1).subscribe((a) => {
        this.type1 = a;
        console.log(a);
      });
      this.serv.getTestsfordoc(this.id, 2).subscribe((a) => {
        this.type2 = a;
        console.log(a);
      });
      this.serv.getTestsfordoc(this.id, 0).subscribe((a) => {
        this.AC = a;
        console.log(a);
      });
    }
  }
}
