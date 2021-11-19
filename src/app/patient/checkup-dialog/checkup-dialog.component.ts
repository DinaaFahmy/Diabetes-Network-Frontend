import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckUpsComponent } from '../check-ups/check-ups.component';
import { Checkup } from 'src/app/_Models/check-up';
import { PatientService } from 'src/app/_services/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './checkup-dialog.component.html',
  styleUrls: [
    '../check-ups/check-ups.component.css',
    '../check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CheckupDialogComponent implements OnInit {
  value: any;
  todaydate: any = Date.now();
  date: any;
  checkupForm: FormGroup;
  public checkup: Checkup;
  constructor(
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<CheckUpsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serv: PatientService
  ) {
    this.checkup = this.data.checkup;
    // if (this.data.flag == false) {
    //   document.getElementById('Editbtn').hidden = true;
    //   document.getElementById('Addbtn').hidden = false;
    // } else {
    //   document.getElementById('Addbtn').hidden = true;
    //   document.getElementById('Editbtn').hidden = false;
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  Add() {
    this.assign();

    this.checkup.id = null;
    this.serv.addCheckup(this.checkup).subscribe((u) => console.log(u));
  }
  Update() {
    this.assign();
    this.serv.updateCheckup(this.checkup).subscribe((u) => console.log(u));
  }
  ngOnInit(): void {
    this.checkupForm = this.formbuilder.group({
      note: [this.checkup.notes],
      resultData: [this.checkup.resultData],
      type: [this.checkup.checkupType, [Validators.required]],
      date: [new Date(this.checkup.date), Validators.required],
      status: [this.checkup.status, Validators.required],
    });
    this.date = new Date(this.checkup.date).getTime();
    if (this.checkup.status == 1) this.checkupForm.get('resultData').disable();
  }

  changetype(e) {
    this.checkup.checkupType = e.target.value;
    this.checkupForm.value.checkupType = e.target.value;
    if (this.checkup.checkupType == 1) this.checkup.checkupTypeName = 'رمد';
    else if (this.checkup.checkupType == 0)
      this.checkup.checkupTypeName = 'اخرى';
    else if (this.checkup.checkupType == 2)
      this.checkup.checkupTypeName = 'اوعية دموية';
    else if (this.checkup.checkupType == 3)
      this.checkup.checkupTypeName = 'ضغط دم';
    else if (this.checkup.checkupType == 4)
      this.checkup.checkupTypeName = 'كوليسترول';
    else if (this.checkup.checkupType == 5)
      this.checkup.checkupTypeName = 'كشف اسنان';
  }
  changestatus(e) {
    this.checkup.status = e.target.value;
    this.checkupForm.value.status = e.target.value;
    console.log(this.checkup);
    if (this.checkup.status == 1) {
      this.checkup.statusName = 'لم يتم بعد';
      this.checkupForm.get('resultData').disable();
    } else if (this.checkup.status == 2) {
      this.checkup.statusName = 'تم';
      this.checkupForm.get('resultData').enable();
    }
  }
  get() {
    return this.checkupForm.controls;
  }
  assign() {
    this.checkup.date = this.checkupForm.value.date;
    this.checkup.notes = this.checkupForm.value.note;
    // this.checkup.date=this.checkupForm.value.type
    this.checkup.resultData = this.checkupForm.value.resultData;
    // this.checkup.checkupType = this.checkupForm.value.type;
    if (this.checkup.status == 1) this.checkup.resultData = 'لم يتم بعد';
  }
}
