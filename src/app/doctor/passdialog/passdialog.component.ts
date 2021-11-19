import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/_services/doctor.service';
import {
  EditDoctorProfileComponent,
  DialogData,
} from '../edit-doctor-profile/edit-doctor-profile.component';
import { passModel } from 'src/app/_Models/pass.model';

@Component({
  selector: 'app-passdialog',
  templateUrl: './passdialog.component.html',
  styleUrls: ['./passdialog.component.css'],
})
export class PassdialogComponent implements OnInit {
  passForm: FormGroup;
  passtrue: boolean = false;
  passmodel: passModel = new passModel();
  rejex: RegExp;
  errormsg: string;

  constructor(
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDoctorProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serv: DoctorService
  ) {}

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

  Add() {
    this.passmodel.newPassword = this.passForm.value.Password;
    this.serv.changepass(this.passmodel).subscribe((a) => {
      console.log(a);
    });
  }
  checkpass(pass) {
    this.serv.passtrue(pass).subscribe((a) => {
      this.passtrue = a;
      if (a) {
        this.passmodel.oldPassword = pass;
      }
    });
  }

  ispasswordvalid() {
    var pass = this.passForm.value.Password;
    if (pass != '' && pass.length > 5) {
      this.rejex = new RegExp('[a-z]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي حرف صغير واحد علي الاقل';
        console.log(this.errormsg);
        return false;
      }

      this.rejex = new RegExp('[A-Z]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي حرف كبير واحد علي الاقل';
        return false;
      }
      this.rejex = new RegExp('[~!@#&%$^*()_+<>{}]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي حرف مميز واحد علي الاقل';
        return false;
      }
      this.rejex = new RegExp('[0-9]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي رقم واحد علي الاقل';
        return false;
      }
    }
    return true;
  }

  ngOnInit(): void {
    this.passForm = this.formbuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }
}
