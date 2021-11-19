import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PatientService } from '../../_services/patient.service';
import { Checkup } from '../../_Models/check-up';
import { domain } from 'process';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { MatDialog } from '@angular/material/dialog';

import { CheckupDialogComponent } from '../checkup-dialog/checkup-dialog.component';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';

export interface DialogData {
  checkup: Checkup;
  flag: boolean;
}
@Component({
  selector: 'app-check-ups',
  templateUrl: './check-ups.component.html',
  styleUrls: ['./check-ups.component.css', './check-ups.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CheckUpsComponent implements OnInit {
  public model: Checkup[];
  public checkup: Checkup;
  public flag: boolean;
  constructor(public serv: PatientService, private dialog: MatDialog) {
    this.model = new Array<Checkup>();
    this.checkup = new Checkup();
  }

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.serv.getCheckups().subscribe((u) => {
      Object.assign(this.model, u);
      for (let i in this.model) {
        if (this.model[i].checkupType == 1)
          this.model[i].checkupTypeName = 'رمد';
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
    });
  }

  edit(x: Checkup) {
    this.checkup = x;
    this.flag = true;
    this.openDialog();
  }
  delete(x) {
    console.log(x);

    this.serv.deleteCheckup(x).subscribe((u) => {
      console.log(u);
      this.model = this.model.filter((item) => item.id !== u.id);
    });
  }

  add() {
    this.flag = false;
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(CheckupDialogComponent, {
      panelClass: ['col-12', 'col-md-6', 'col-sm-12'],

      // width: 'auto',
      // height: 'auto',
      // margin: '0 auto',
      data: { checkup: this.checkup, flag: this.flag },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.ngOnInit();
        // this.model.push(result);
        //  this.PhoneNumber=result;
        // this.doctor.phoneNumber = result;
        // this.serv.updatephone(result).subscribe((a) => console.log(a));
        console.log(this.checkup);
      }
    });
    this.checkup = new Checkup();
  }
  addtest() {
    const dialogRef = this.dialog.open(TestDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.ngOnInit();
        // console.log(this.checkup);
      }
    });
  }
}
