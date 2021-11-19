import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { PatientProfile } from '../../../_models/patient-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { patientEditModel } from 'src/app/_Models/PatienttEditModel';
import { PatientEditProfileService } from 'src/app/_services/patient-edit-profile.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { TestDialogComponent } from 'src/app/patient/test-dialog/test-dialog.component';
import { DrugDialogComponent } from '../../drug-dialog/drug-dialog.component';
import { DrugModel } from 'src/app/_Models/Drug-model';
import { LifeStyleDialogComponent } from '../../life-style-dialog/life-style-dialog.component';
import { PasswdDialogComponent } from '../../passwd-dialog/passwd-dialog.component';
import { PassdialogComponent } from 'src/app/doctor/passdialog/passdialog.component';

export interface DialogData {
  patient: patientEditModel;
  key: string;
  value: string;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss', './edit-profile.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditProfileComponent implements OnInit {
  patientprofile: patientEditModel = new patientEditModel();
  age: number;
  id: number = 47;
  flag: boolean = false;
  flag2: boolean = false;
  style: string;
  checkuptype: string;
  constructor(
    private p: PatientEditProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  EditLifeStyle() {
    this.flag = true;

    const dialogRef = this.dialog.open(LifeStyleDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],

      data: { patient: this.patientprofile },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (this.patientprofile.life_style == 1) this.style = 'معتدل';
      else if (this.patientprofile.life_style == 2) this.style = 'هادى';
      else if (this.patientprofile.life_style == 0) this.style = 'نشيط';
      if (result != undefined) {
        console.log(this.patientprofile);
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
  AddDrug() {
    this.flag = true;

    const dialogRef = this.dialog.open(DrugDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],

      data: { patient: this.patientprofile, flag: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result != undefined) {
        console.log(this.patientprofile);
      }
    });
  }
  DeleteDrug(d: DrugModel) {
    this.flag = true;

    this.patientprofile.drugs = this.patientprofile.drugs.filter(
      (a) => a.drugId != d.drugId
    );
  }
  EditDrug(d: DrugModel) {
    this.flag = true;
    console.log(d);

    const dialogRef = this.dialog.open(DrugDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],

      data: { patient: this.patientprofile, flag: true, drug: d },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result != undefined) {
        console.log(this.patientprofile);
      }
    });
  }
  openDialog(key: string, value: string) {
    this.flag = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: key, key: value, patient: this.patientprofile },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        console.log(this.patientprofile);
      }
    });
  }
  ngOnInit(): void {
    // this.route.snapshot.paramMap.get('id');
    console.log('the id equals ', this.id);
    if (this.id) {
      this.p.GetMyProfile().subscribe((a) => {
        this.patientprofile = a;
        if (a.life_style == 1) this.style = 'معتدل';
        else if (a.life_style == 2) this.style = 'هادى';
        else if (a.life_style == 0) this.style = 'نشيط';

        console.log(this.patientprofile);
        this.CalculateAge();
        console.log(this.age);

        if (this.patientprofile.checkupType == 1) this.checkuptype = 'رمد';
        else if (this.patientprofile.checkupType == 0)
          this.checkuptype = 'اخرى';
        else if (this.patientprofile.checkupType == 2)
          this.checkuptype = 'اوعية دموية';
        else if (this.patientprofile.checkupType == 3)
          this.checkuptype = 'ضغط دم';
        else if (this.patientprofile.checkupType == 4)
          this.checkuptype = 'كوليسترول';
        else if (this.patientprofile.checkupType == 5)
          this.checkuptype = 'كشف اسنان';
      });
    }
  }
  Submit() {
    this.flag = false;
    this.p.UpdateMyProfile(this.patientprofile).subscribe((a) => {
      console.log(a);
    });
    this, this.ngOnInit();
  }
  public CalculateAge(): void {
    {
      var timeDiff = Math.abs(
        Date.now() - new Date(this.patientprofile.birth_date).getTime()
      );
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
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
  //
  @HostListener('window:beforeunload', ['$event'])
  public onPageUnload($event: BeforeUnloadEvent) {
    if (this.flag) {
      $event.returnValue = true;
    }
  }
}
