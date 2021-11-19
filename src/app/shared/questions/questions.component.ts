import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../_services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { AnswerModel } from '../../_Models/answer-model';
import { TokenService } from '../../_services/token.service';
import { QuestionService } from 'src/app/_services/Question.services';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  key: string;
  value: string;
}
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  questions: any;
  myid: number;
  Answer: string;
  Ans: AnswerModel = new AnswerModel();
  filter: string[] = [];
  mention: boolean = false;
  constructor(
    public serv: DoctorService,
    public dialog: MatDialog,
    public tokserv: TokenService,
    public Qserv: QuestionService,
    private toastr: ToastrService
  ) {}

  getdocans(id: number, i: number) {
    this.filter[i] = 'أجابات الاطباء';
    this.Qserv.getDocAns(id).subscribe((a) => {
      console.log(a);
      this.questions[i].answers = a;
    });
  }
  GoTOprofile(type: any, id: number) {
    window.location.assign('./profile/' + id + '/' + type);
  }
  getuserans(id: number, i: number) {
    this.filter[i] = 'أجابات المستخدمين';
    this.Qserv.getUserAns(id).subscribe((a) => {
      console.log(a);
      this.questions[i].answers = a;
    });
  }
  getallanss(id: number, i: number) {
    this.filter[i] = 'جميع الأجابات';
    this.Qserv.getAllAns(id).subscribe((a) => {
      console.log(a);
      this.questions[i].answers = a;
    });
  }
  noans(i: number) {
    this.filter[i] = 'بدون اجابات';
    this.questions[i].answers = [];
  }
  openDialog(id: number, i: number, key: string): void {
    const dialogRef = this.dialog.open(AddAnswerComponent, {
      width: '250px',
      data: { key: key, value: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.Answer = result;
        this.serv.Addanswer(result, id).subscribe((a) => {
          console.log(a);
          if (this.tokserv.isPatient()) {
            this.getuserans(id, i);
          } else this.getdocans(id, i);

          this.questions[i].answers.push({
            answer: a.answer,
            date: a.date,
            userName: this.tokserv.getUserName(),
          });
        });
      }
    });
  }
  ngOnInit(): void {
    this.Qserv.getmyQuestions().subscribe((a) => {
      this.questions = a;
      this.filter = new Array((this.questions as Array<any>).length);
      this.filter.fill('أجابات الاطباء');
      console.log(this.questions);
      console.log(this.filter);
    });
  }
  deleteQuestion(i, questionID) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;

      if (this.myid == this.questions[i].userid) {
        console.log('id ' + a);
        this.serv.Deletequestion(questionID).subscribe((a) => {
          this.questions.splice(i, 1);
          console.log(a);
        });
      } else {
        alert('لا تملك الصلاحية للحذف');
      }
    });
  }
  deleteAnswer(quesindex, ansindex, answer_id) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;

      if (this.myid == this.questions[quesindex].answers[ansindex].userID) {
        console.log('id ' + a);

        this.serv.DeleteAnswer(answer_id).subscribe((a) => {
          this.questions[quesindex].answers.splice(ansindex, 1);
          console.log(a);
        });
      } else {
        alert('لا تملك الصلاحية للحذف');
      }
    });
  }
}
