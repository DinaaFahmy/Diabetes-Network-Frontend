import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EditProfileComponent,
  DialogData,
} from '../profile/edit-profile/edit-profile.component';
import { patientEditModel } from 'src/app/_Models/PatienttEditModel';
import { PatientService } from 'src/app/_services/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrugModel } from 'src/app/_Models/Drug-model';
import { DrugSource } from 'src/app/_Models/drug-source';

@Component({
  templateUrl: './drug-dialog.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DrugDialogComponent implements OnInit {
  value: any;
  DrugForm: FormGroup;
  Drugs: DrugSource[];
  d: DrugModel[];
  drug: DrugModel;
  flag: boolean;
  constructor(
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serv: PatientService
  ) {}

  ngOnInit(): void {
    this.flag = this.data.flag;
    if (this.flag) {
      this.drug = this.data.drug;
      console.log('check');
      console.log(this.drug);
    } else this.drug = new DrugModel();

    this.serv.getDrugs().subscribe((a) => {
      this.Drugs = a;
      console.log(a);
    });
    this.DrugForm = this.formbuilder.group({
      dose: [this.drug.dosage, [Validators.required]],
      type: [this.drug.drugId, [Validators.required]],
      note: [this.drug.note],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(v) {}
  changetype(e) {
    this.DrugForm.value.type = e.target.value;
    this.drug.drugId = e.target.value;
    this.drug.drugName = e.target.text;
    console.log(e);
  }
  Add() {
    this.drug.dosage = this.DrugForm.value.dose;
    this.drug.note = this.DrugForm.value.note;
    this.drug.drugName = this.Drugs.find(
      (a) => a.drugId == this.drug.drugId
    ).drugName;
    // this.data.patientprofile.drugs.add(this.drug);

    console.log('data');

    console.log(this.data);

    this.d = this.data.patient.drugs;
    if (!this.flag) this.d.push(this.drug);
  }
}
