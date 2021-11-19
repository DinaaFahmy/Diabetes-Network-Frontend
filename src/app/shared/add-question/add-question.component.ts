import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { myDoctorsService } from '../../_services/myDoctors.service';
import { DoctorModel } from '../../_models/Doctor.model';
import { HomeComponent, DialogData } from '../home/home.component';
import { QuestionModel } from 'src/app/_models/Question.model';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  d_arr: DoctorModel[] = [];
  role: string;

  constructor(
    public d_serv: myDoctorsService,
    public tokserv: TokenService,

    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.role = this.tokserv.getRole();
    if (this.role != 'Doctor') {
      this.d_serv.getMyDoctors().subscribe((a) => {
        this.d_arr = a;
        console.log(a);
      });
    } else {
      this.data.id = -1;
    }
  }
  getDoctorID(e) {
    this.data.id = e.value;
  }
}
