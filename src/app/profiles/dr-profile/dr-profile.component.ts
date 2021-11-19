import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../_models/Posts.model';
import { QuestionModel } from '../../_models/Question.model';
import { QuestionService } from '../../_services/Question.services';
import { PostService } from '../../_services/post.service';
import { CategoriesModel } from '../../_models/Categories.model';
import { ReactionModel } from '../../_models/Reactions.model';
import { ReactionService } from '../../_services/reaction.service';
import { TokenService } from '../../_services/token.service';
import { DoctorService } from 'src/app/_services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { PatientProfileService } from 'src/app/_services/patient-profile.service';
import { CheckUpsInfoDialogComponent } from '../check-ups-info-dialog/check-ups-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TestsDialogInfoComponent } from '../tests-dialog-info/tests-dialog-info.component';
import { ChartsDialogComponent } from '../charts-dialog/charts-dialog.component';
import { MAT_HAMMER_OPTIONS } from '@angular/material/core';

@Component({
  selector: 'app-dr-profile',
  templateUrl: './dr-profile.component.html',
  styleUrls: ['./dr-profile.component.css'],
})
export class DrProfileComponent implements OnInit {
  public id;
  public Chat;
  public user;
  public type;
  public doctor: any;
  public profile: any;
  public cr: [];
  public check: [];
  flag: boolean; //ture doctor //false patient
  follow: boolean; //true follow him //false not follow him
  buttonmsg: string;
  constructor(
    public serv: DoctorService,
    public route: ActivatedRoute,
    public patientserv: PatientProfileService,
    private dialog: MatDialog,
    public token: TokenService
  ) {}
  followrequest() {
    if (this.follow) {
      this.serv.unfollow(this.id).subscribe((a) => console.log(a));
      this.follow = false;
      this.buttonmsg = 'متابعة';
    } else {
      this.serv.follow(this.id).subscribe((a) => console.log(a));
      this.follow = true;
      this.buttonmsg = 'الغاء المتابعة';
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.Chat = 'Chat' + '/' + this.id;
    this.type = this.route.snapshot.paramMap.get('type');
    console.log(this.type);
    this.profile = '';
    if (this.type == 'true') {
      this.serv.iffollowhim(this.id).subscribe((a) => {
        this.follow = a;
        if (a) {
          this.buttonmsg = 'الغاء المتابعة';
        } else {
          this.buttonmsg = 'متابعة';
        }
        console.log(a);
      });
      this.serv.getdocinfoForUser(this.id).subscribe((a) => {
        this.profile = a;
        this.cr = a.certificates;
        console.log(this.cr);

        console.log(a);
      });
    } else if (this.type == 'false') {
      this.patientserv.getpatientprofile(this.id).subscribe((a) => {
        this.profile = a;
        console.log('patient');

        console.log(a);
      });
    }
    document.getElementById('my_p').hidden = false;
    document.getElementById('my_q').hidden = true;
  }
  showMyPosts() {
    document.getElementById('my_p').hidden = false;
    document.getElementById('my_q').hidden = true;
    // document.getElementById('my_ps').hidden = true;
    // document.getElementById('my_pw').hidden = true;
  }
  showMyQuestions() {
    document.getElementById('my_p').hidden = true;
    document.getElementById('my_q').hidden = false;
    // document.getElementById('my_ps').hidden = true;
  }

  checkup() {
    this.patientserv.getpatientcheckups(this.id).subscribe((a) => {
      if (a != null) {
        this.check = a;
        console.log(a);
        const dialogRef = this.dialog.open(CheckUpsInfoDialogComponent, {
          panelClass: ['col-12', 'col-md-6', 'col-sm-12'],

          data: { checkup: this.check },
        });
      }
    });
  }
  tests() {
    const dialogRef = this.dialog.open(TestsDialogInfoComponent, {
      panelClass: ['col-12', 'col-md-6', 'col-sm-12'],

      data: { id: this.id },
    });
  }
  charts() {
    window.location.assign('/charts/' + this.id + '/' + 'false');
  }
}
