import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { PatientService } from 'src/app/_services/patient.service';
import { patientEditModel } from 'src/app/_Models/PatienttEditModel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './passwd-dialog.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PasswdDialogComponent implements OnInit {
  patient: patientEditModel;
  passForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serv: PatientService
  ) {
    this.patient = this.data.patient;
  }

  ngOnInit(): void {
    this.passForm = this.formbuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }
  Add() {
    this.patient.password = this.passForm.value.Password;
    this.patient.newpassword = this.passForm.value.ConfirmPassword;
  }
  IsPassMatch() {
    if (
      this.passForm.value.ConfirmPassword !== '' &&
      this.passForm.value.Password !== ''
    )
      if (
        this.passForm.value.Password !== this.passForm.value.ConfirmPassword
      ) {
        return true;
      }
  }
}
