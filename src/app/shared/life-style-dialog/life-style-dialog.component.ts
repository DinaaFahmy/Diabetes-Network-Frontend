import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { patientEditModel } from 'src/app/_Models/PatienttEditModel';
import { ElementSchemaRegistry } from '@angular/compiler';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './life-style-dialog.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LifeStyleDialogComponent implements OnInit {
  public styles;
  Form: FormGroup;

  patient: patientEditModel;
  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.patient = this.data.patient;
    this.patient.life_style;
  }

  changetype(e) {
    this.patient.life_style = e.target.value;
  }
  Add() {}
}
