import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckUpsComponent } from '../check-ups/check-ups.component';
import { PatientService } from 'src/app/_services/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Test } from 'src/app/_Models/test';

@Component({
  templateUrl: './test-dialog.component.html',
  styleUrls: [
    '../check-ups/check-ups.component.css',
    '../check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TestDialogComponent implements OnInit {
  value: any;
  testForm: FormGroup;
  public test: Test;
  today = new Date();
  constructor(
    private formbuilder: FormBuilder,
    public serv: PatientService,
    public dialogRef: MatDialogRef<CheckUpsComponent>
  ) {}

  ngOnInit(): void {
    this.testForm = this.formbuilder.group({
      result: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: ['', Validators.required],
      med: [false, Validators.required],
    });
    this.test = new Test();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changetype(e) {
    this.test.type = e.target.value;
    this.testForm.value.type = e.target.value;
  }

  Add() {
    this.test.result = this.testForm.value.result;
    this.test.medication = this.testForm.value.med;
    this.test.date = new Date(this.testForm.value.date);
    this.serv.addTest(this.test).subscribe((a) => console.log(a));
  }
}
