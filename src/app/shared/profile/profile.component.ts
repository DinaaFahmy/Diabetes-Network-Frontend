import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../_models/Posts.model';
import { QuestionModel } from '../../_models/Question.model';
import { QuestionService } from '../../_services/Question.services';
import { PostService } from '../../_services/post.service';
import { CategoriesModel } from '../../_models/Categories.model';
import { DoctorModel } from '../../_Models/Doctor.model';
import { ReactionModel } from '../../_models/Reactions.model';
import { CategoryService } from '../../_services/category.service';
import { ReactionService } from '../../_services/reaction.service';
import { myDoctorsService } from '../../_services/myDoctors.service';
import { TokenService } from '../../_services/token.service';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  key: string;
  value: string;
  id: number;
  ctg_name: string;
  react_name: string;
  post_arr: any[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  p: PostModel = new PostModel();
  p_arr: PostModel[] = [];
  ps_arr: PostModel[] = [];
  c: CategoriesModel[] = [];
  r: ReactionModel[] = [];
  q_arr: QuestionModel[] = [];
  ques: QuestionModel = new QuestionModel();

  d: DoctorModel = new DoctorModel();
  d_arr: DoctorModel[] = [];
  dr_id: number;
  follow_id: number;

  userName: string;
  email: string;
  role: string;
  constructor(
    private c_serv: CategoryService,
    private toastr: ToastrService,
    private token: TokenService,
    private r_ser: ReactionService,
    private p_serv: PostService,
    private d_serv: myDoctorsService,
    public dialog: MatDialog,
    public q_serv: QuestionService,
    public acc: AccountService //  private q_serv: QuestionService
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '250px',
      data: { key: 'ادخل سؤال', value: this.ques.Question, id: this.dr_id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.id == -1 || this.role == 'Doctor') {
          this.q_serv.addQuestion(-1, result.value).subscribe((a) => {
            console.log(a);
            this.toastr.success('تم إضافة السؤال');
            this.q_serv.getmyQuestions().subscribe((a) => {
              console.log();

              console.log(a + 'questions');

              this.q_arr = a;
            });

            this.showMyQuestions();
          });
        } else {
          this.q_serv.addQuestion(result.id, result.value).subscribe((a) => {
            console.log(a);
            this.toastr.success('تم إضافة السؤال');
            this.q_serv.getmyQuestions().subscribe((a) => {
              console.log('questions');

              console.log(a);
              this.q_arr = a;
            });
            this.showMyQuestions();
          });
        }
      }
    });
  }

  openDialog_post(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '250px',
      data: {
        key: 'اكتب منشور',
        value: this.p.content,
        ctg_name: this.p.CategoryName,
        react_name: this.p.ReactionName,
        post_arr: this.p_arr,
      },
    });
  }

  ngOnInit(): void {
    this.role = this.token.gettoken().role;
    document.getElementById('my_p').hidden = false;
    document.getElementById('my_q').hidden = true;
    document.getElementById('my_ps').hidden = true;
    document.getElementById('my_pw').hidden = true;
    document.getElementById('my_f').hidden = true;
    document.getElementById('my_dm').hidden = true;
    this.c_serv.getCategory().subscribe((a) => {
      this.c = a;
    });
    this.r_ser.getReactions().subscribe((a) => {
      this.r = a;
    });
    // this.p_serv.getmyPosts().subscribe((a) => {
    // this.p_arr = a;
    // console.log(a);
    // });
    // this.q_serv.getmyQuestions().subscribe((a) => {
    //   this.q_arr = a;
    //   console.log(a);
    // });
    // this.p_serv.getSavedPosts().subscribe((a) => {
    // this.ps_arr = a;
    // console.log(a);
    // });
    this.dr_id = 0;
    this.d_serv.getMyDoctors().subscribe((a) => {
      this.d_arr = a;
      console.log(a);
    });
    this.dr_id = 0;
    // this.d_serv.getMyDoctors().subscribe(a=> {this.d_arr=a; console.log(a)})

    this.userName = this.token.getUserName();
    this.email = this.token.gettoken().email;
    this.role = this.token.gettoken().role;
    console.log(this.userName);
  }
  editp() {
    window.location.assign('./p');
  }
  add() {
    this.p_serv.addPost(this.p).subscribe((a) => {
      console.log(a);
    });
    console.log(this.p);
  }

  showMyPosts() {
    document.getElementById('my_p').hidden = false;
    document.getElementById('my_q').hidden = true;
    document.getElementById('my_ps').hidden = true;
    document.getElementById('my_pw').hidden = true;
    document.getElementById('my_f').hidden = true;
    document.getElementById('my_dm').hidden = true;
  }
  showMyQuestions() {
    document.getElementById('my_p').hidden = true;
    document.getElementById('my_q').hidden = false;
    document.getElementById('my_ps').hidden = true;
    document.getElementById('my_pw').hidden = true;

    document.getElementById('my_dm').hidden = true;
    document.getElementById('my_f').hidden = true;
  }
  showMySavedPosts() {
    document.getElementById('my_p').hidden = true;
    document.getElementById('my_q').hidden = true;
    document.getElementById('my_ps').hidden = false;
    document.getElementById('my_pw').hidden = true;

    document.getElementById('my_dm').hidden = true;
    document.getElementById('my_f').hidden = true;
  }
  myDoctors() {
    document.getElementById('my_p').hidden = true;
    document.getElementById('my_q').hidden = true;
    document.getElementById('my_ps').hidden = true;
    document.getElementById('my_pw').hidden = false;

    document.getElementById('my_dm').hidden = true;
    document.getElementById('my_f').hidden = true;
  }
  showMyFollowers() {
    document.getElementById('my_p').hidden = true;
    document.getElementById('my_q').hidden = true;
    document.getElementById('my_ps').hidden = true;

    document.getElementById('my_dm').hidden = true;
    document.getElementById('my_f').hidden = false;
  }
  mentioned() {
    document.getElementById('my_p').hidden = true;
    document.getElementById('my_q').hidden = true;
    document.getElementById('my_ps').hidden = true;
    document.getElementById('my_pw').hidden = true;

    document.getElementById('my_dm').hidden = false;
    document.getElementById('my_f').hidden = true;
  }
  GoTOprofile(type: any, id: number) {
    // window.location.assign('./profile/' + id + '/' + type);
  }
}
