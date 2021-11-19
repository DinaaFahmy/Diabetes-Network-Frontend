import { Component, OnInit } from '@angular/core';
import { CertificateModel } from '../../_Models/certificate-model';
import { DoctorService } from '../../_services/doctor.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DoctorModel } from 'src/app/_Models/Doctor.model';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { DialogCertificatesComponent } from './dialog-certificates/dialog-certificates.component';
import { passModel } from 'src/app/_Models/pass.model';
import { PassdialogComponent } from '../passdialog/passdialog.component';

export interface DialogData {
  patient: any;
  key: string;
  value: string;
}
export interface DialogData2 {
  Certificate: string;
  University: string;
}
@Component({
  selector: 'app-edit-doctor-profile',
  templateUrl: './edit-doctor-profile.component.html',
  styleUrls: ['./edit-doctor-profile.component.css'],
})
export class EditDoctorProfileComponent implements OnInit {
  doctor: any;
  constructor(public serv: DoctorService, public dialog: MatDialog) {}
  Certificate: CertificateModel = new CertificateModel();
  cr: any;
  displayedColumns: string[] = ['certificate', 'university'];
  openDialog(value, key): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: value, key: key, patient: this.doctor },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        //  this.PhoneNumber=result;
        // this.doctor.phoneNumber = result;
        this.serv
          .updatephone(this.doctor.phoneNumber)
          .subscribe((a) => console.log(a));
        this.serv
          .updateaddress(this.doctor.address)
          .subscribe((a) => console.log(a));
      }
    });
  }
  opendialogpassword() {
    const dialogRef = this.dialog.open(PassdialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],

      data: { Key: '', value: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  openDialog3(): void {
    const dialogRef = this.dialog.open(DialogCertificatesComponent, {
      width: '250px',
      data: {
        Certificate: this.Certificate.Certificate,
        University: this.Certificate.University,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.Certificate.DoctorId = 4;
        this.Certificate.University = result.University;
        this.Certificate.Certificate = result.Certificate;
        this.serv
          .Addcertificate(this.Certificate)
          .subscribe((a) => console.log(a));
        this.cr.push({
          certificate: result.Certificate,
          university: result.University,
        });
        console.log(this.cr);
      }
    });
  }

  ngOnInit(): void {
    this.serv.getdocinfo().subscribe((a) => {
      this.doctor = a;
      console.log(this.doctor);
      this.cr = a.certificates;
    });
  }
}
